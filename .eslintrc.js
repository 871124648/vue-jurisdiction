// https://eslint.org/docs/user-guide/configuring

module.exports = {
    root: true,
    parserOptions: {
      parser: 'babel-eslint'
    },
    env: {
      browser: true,
    },
    extends: [
      // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
      // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
      'plugin:vue/essential', 
      // https://github.com/standard/standard/blob/master/docs/RULES-en.md
      'standard'
    ],
    // required to lint *.vue files
    plugins: [
      'vue'
    ],
    // add your custom rules here

    /**
     * 0或’off’：关闭规则。 
     * 1或’warn’：打开规则，并且作为一个警告（并不会导致检查不通过）。
     * 2或’error’：打开规则，并且作为一个错误 (退出码为1，检查不通过)。
     */
    rules: {
      "no-alert": 0,//禁止使用alert confirm prompt
      "no-var": 2,//禁用var，用let和const代替
      "no-const-assign": 2,//禁止修改const声明的变量
      "no-dupe-keys": 2,//在创建对象字面量时不允许键重复 {a:1,a:1}
      "no-duplicate-case": 2,//switch中的case标签不能重复
      "no-empty": 2,//块语句中的内容不能为空
      "no-extra-bind": 2,//禁止不必要的函数绑定
      "no-extra-parens": 2,//禁止非必要的括号
      "no-extra-semi": 2,//禁止多余的冒号
      "no-func-assign": 2,//禁止重复的函数声明
      "no-multiple-empty-lines": [1, {"max": 2}],//空行最多不能超过2行
      "no-redeclare": 2,//禁止重复声明变量
      "no-undef": 2,//不能有未定义的变量
      "comma-spacing": 0,//逗号前后的空格
      "indent": [0, 2],//缩进风格
      "no-tabs":"off",
      "no-unneeded-ternary": 0, ////禁止不必要的嵌套 var isYes = answer === 1 ? true : false;
      'generator-star-spacing': 'off',
      // allow debugger during development
      'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
    }
  }
  