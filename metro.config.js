const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// React Native Web 지원을 위한 설정
config.resolver.alias = {
  'react-native': 'react-native-web',
  '@emotion/native': '@emotion/styled',
};

config.resolver.platforms = ['web', 'ios', 'android', 'native'];

module.exports = config; 