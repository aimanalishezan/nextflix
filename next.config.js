module.exports = {
  images: {
    disableStaticImages: false,
  },
  webpack(config) {
    // Add support for importing image files
    config.module.rules.push({
      test: /\.(png|jpg|jpeg|gif|webp|avif|ico|svg)$/i,
      type: 'asset/resource',
    });
    return config;
  },
}