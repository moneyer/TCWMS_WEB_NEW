// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    // 指定想要使用ECMAScript版本
    'ecmaVersion': 2017,
    // 设置为 "script" (默认) 或 "module"（如果你的代码是 ECMAScript 模块)。
    sourceType: 'module',
    'parser': 'babel-eslint'
  },
  env: {
    // 一个“环境”定义了一组预定义的全局变量
    browser: true,
  },
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'plugin:vue/recommended',
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    'standard'
  ],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  // 定义一组全局变量，true就是不可被再次赋值
  'globals': {
    tcStarter: true,
    AMap: true,
    wx: true,
    WeixinJSBridge: true,
    _hmt: true
  },
  // add your custom rules here
  //"off" 或 0 - 关闭规则
  //"warn" 或 1 - 开启规则，使用警告级别的错误：warn (不会导致程序退出)
  // "error" 或 2 - 开启规则，使用错误级别的错误：error (当被触发的时候，程序会退出)
  // 要查看具体规则可以访问 https://cn.eslint.org/docs/4.0.0/rules/ + 具体规则名
  'rules': {
    // allow paren-less arrow functions 箭头函数 a => a可以省略括号
    'arrow-parens': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    // 在函数括号之前不需要空格
    'space-before-function-paren': 0,
    // 强制使用单引号
    'quotes': ['error', 'single'],
    // 强制不使用分号 ;
    'semi': ['error', 'never'],
    'indent': 0,
    // 一个promise reject的时候应当传入error对象（包含了具体的错误信息），如 new Error('请求失败') // 项目中已关闭
    'prefer-promise-reject-errors': 0,
    // 禁止使用特殊空白符（比如全角空格），除非是出现在字符串、正则表达式或模版字符串中
    'no-irregular-whitespace': [
      'error',
      {
        skipStrings: true,
        skipComments: false,
        skipRegExps: true,
        skipTemplates: true
      }
    ],
    // @fixable 代码块如果在一行内，那么大括号内的首尾必须有空格，比如 function () { alert('Hello') }
    'block-spacing': [
      'error',
      'always'
    ],
    // @fixable 逗号前禁止有空格，逗号后必须要有空格
    'comma-spacing': [
      'error',
      {
        'before': false,
        'after': true
      }
    ],
    'no-console': 1,
    // 禁止条件中的常量表达式 https://cn.eslint.org/docs/4.0.0/rules/no-constant-condition
    'no-constant-condition': 2,
    'no-unreachable': 2,
    'no-duplicate-case': 2,
    'no-empty': 2,
    'no-extra-boolean-cast': 2,
    'no-extra-parens': 0,
    'use-isnan': 2,
    'default-case': 0
  }
}
