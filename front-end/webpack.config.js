module.exports = {
  // ... other configurations
  resolve: {
    fallback: {
      "buffer": require.resolve("buffer/"),
      "http": require.resolve("stream-http"),
      "https": require.resolve("https-browserify"),
      "os": require.resolve("os-browserify/browser"),
      "zlib": require.resolve("browserify-zlib"),
      "assert": require.resolve("assert"),
      "path": require.resolve("path-browserify"),
      "url": require.resolve("url"),
      "util": require.resolve("util"),
      "stream": require.resolve("stream-browserify"),
      "fs": false,
      "path": require.resolve("path-browserify")
    }
  }
};