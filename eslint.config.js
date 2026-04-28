import pluginVue from 'eslint-plugin-vue'
import vueTsConfig from '@vue/eslint-config-typescript'

export default [
  {
    ignores: ['dist/**', 'node_modules/**'],
  },
  ...pluginVue.configs['flat/recommended'],
  ...vueTsConfig(),
  {
    rules: {
      'vue/multi-word-component-names': 'off',
    },
  },
]
