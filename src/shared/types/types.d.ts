declare module 'eslint-config-expo/flat';
declare module 'eslint-config-prettier';
declare module 'eslint-plugin-react-compiler';

declare module '*.png' {
  const value: import('react-native').ImageSourcePropType;
  export default value;
}

declare module '*.jpg' {
  const value: import('react-native').ImageSourcePropType;
  export default value;
}
