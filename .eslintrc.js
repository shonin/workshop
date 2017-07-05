module.exports = {
  "env": {
    "browser": true,
    "commonjs": true,
    "es6": true,
    "jest": true,
    "node": true
  },
  "globals": {
    "jQuery": true,
    "requirejs": true,
    "require": true,
    "$": true,
    "define": true,
    "s": true
  },
  "parserOptions": {
    "ecmaVersion": 6,

    "ecmaFeatures": {
      "generators": true,
      "experimentalObjectRestSpread": true,
      "jsx": true
    },
    "sourceType": "module"
  },
  "plugins": [
    "react"
  ],
  "rules": {
    "indent": ["error", 4, { "SwitchCase": 1 }],
    "linebreak-style": ["error","unix"],
    "quotes": ["error","double"],
    "semi": ["error","always"],
    "curly": "error",
    "dot-notation": "off",
    "eqeqeq": ["error", "allow-null"],
    "no-caller": "error",
    "new-cap": "warn",
    "no-cond-assign": ["error", "always"],
    "no-eq-null": "error",
    "no-undef": "error",
    "no-use-before-define": ["error", "nofunc"],
    "wrap-iife": ["error","any"]
  },
  "target": {
    "src": [
      "*/js/*.js*"
    ]
  }
};
