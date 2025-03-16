const { getDefaultConfig } = require('@expo/metro-config');
const { withNxMetro } = require('@nx/expo');

const defaultConfig = getDefaultConfig(__dirname);

// Add additional dependencies to be included in the bundle
defaultConfig.resolver.extraNodeModules = {
  ...defaultConfig.resolver.extraNodeModules,
};

// Add support for importing from libs
defaultConfig.watchFolders = [
  ...defaultConfig.watchFolders || [],
  `${__dirname}/libs`,
];

// Add support for SVG
defaultConfig.transformer.babelTransformerPath = require.resolve('react-native-svg-transformer');
defaultConfig.resolver.assetExts = defaultConfig.resolver.assetExts.filter(ext => ext !== 'svg');
defaultConfig.resolver.sourceExts = [...defaultConfig.resolver.sourceExts, 'svg'];

// Ensure Reanimated plugin is properly handled
defaultConfig.transformer.getTransformOptions = async () => ({
  transform: {
    experimentalImportSupport: false,
    inlineRequires: true,
  },
});

module.exports = withNxMetro(defaultConfig, {
  // Change this to true to see debugging info.
  debug: false,
  // Set this to '/' if your nx workspace has a single project, or if you're using
  // workspace projects, and you want to transpile all projects together.
  projectRoot: '/',
}); 