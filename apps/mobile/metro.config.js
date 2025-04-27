const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const path = require('path');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const config = {
  watchFolders: [
    path.resolve(__dirname, '../../node_modules'),  // 👈 watch root node_modules
  ],
  resolver: {
    nodeModulesPaths: [
      path.resolve(__dirname, '../../node_modules'), // 👈 resolve modules from root
    ],
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
