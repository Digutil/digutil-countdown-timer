exports.config = {
  namespace: 'du-countdown-timer',
  generateDistribution: true,
  bundles: [
    { components: ['du-countdown-timer'] }
  ]
};

exports.devServer = {
  root: 'www',
  watchGlob: '**/**'
}
