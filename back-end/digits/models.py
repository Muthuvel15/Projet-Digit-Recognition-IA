from django.db import models
from django.conf import settings
from PIL import Image
from tensorflow.keras.preprocessing.image import img_to_array
from tensorflow.keras.models import load_model
import cv2
import numpy as np
import os
from mongoengine import Document, ImageField, StringField, DateTimeField
from datetime import datetime

# Charger le modèle une seule fois au démarrage pour éviter de le recharger à chaque prédiction
MODEL_PATH = os.path.join(settings.BASE_DIR, 'CNN_model.h5')
model = load_model(MODEL_PATH)




class Digit(models.Model):
    images = models.ImageField(upload_to='images')
    result = models.CharField(max_length=2, blank=True)
    confidence = models.FloatField(default=0.0)  
    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)
    user_correction = models.IntegerField(null=True, blank=True)
    def __str__(self):
        return str(self.id)

    def save(self, *args, **kwargs):
        try:
            # Ouvrir, traiter et préparer l'image pour la prédiction
            with Image.open(self.images) as img:
                img_array = img_to_array(img)
                dim = (28, 28)
                new_img = cv2.cvtColor(img_array, cv2.COLOR_BGR2GRAY)
                resized = cv2.resize(new_img, dim, interpolation=cv2.INTER_AREA)
                ready = np.expand_dims(np.expand_dims(resized, axis=2), axis=0)
                
                # Prédire l'image avec le modèle chargé
                predictions = model.predict(ready)
                print("Raw predictions:", predictions[0])
                pred = np.argmax(predictions)
                self.result = str(pred)
                self.confidence = float(predictions[0][pred] * 100)  # Store the confidence
                print(f'Classified as {pred} with confidence {self.confidence:.2f}%')
        except Exception as e:
            print('Failed to classify:', e)
            self.result = 'Failed to classify'
        
        # Appeler la méthode save() de la superclasse pour sauvegarder l'objet dans la base de données
        super().save(*args, **kwargs)
