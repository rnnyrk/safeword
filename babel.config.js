module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo', '@babel/typescript'],
    plugins: [
      'expo-router/babel',
      'babel-plugin-styled-components',
      'react-native-reanimated/plugin',
    ],
  };
};
