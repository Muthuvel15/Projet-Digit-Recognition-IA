from .views import DigitViewSet
from rest_framework.routers import DefaultRouter


router=DefaultRouter()
router.register(r'digits', DigitViewSet, basename='digit')
urlpatterns=router.urls