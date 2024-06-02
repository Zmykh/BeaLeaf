module.exports = function override(config, env) {
    // Настройте полифилы
    config.resolve.fallback = {
      "http": require.resolve("stream-http"),
      "https": require.resolve("https-browserify"),
      "stream": require.resolve("stream-browserify"),
      "zlib": require.resolve("browserify-zlib"),
    };
    
    return config;
  };