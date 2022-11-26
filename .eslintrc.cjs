/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  globals: {
    defineProps: 'readonly',
    defineEmits: 'readonly',
    defineExpose: 'readonly',
    withDefaults: 'readonly',
    process: 'readonly',
    __dirname: 'readonly'
  },
  extends: [
    'eslint:recommended',
    'plugin:json/recommended',
    'plugin:markdown/recommended'
  ],
  overrides: [
    {
      files: ['*.js', '*.jsx'],
      rules: {
        'no-underscore-dangle': 'off'
      }
    }
  ],
}
