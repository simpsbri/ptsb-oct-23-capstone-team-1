import webpack from 'webpack'
module.exports = {
  // Your webpack configuration options here
  plugins: [
    new webpack.DefinePlugin({
      'process.env.VITE_WEB_ADDRESS': JSON.stringify('https://example.com'),
    }),
  ],
}
