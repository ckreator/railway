module.exports = {
	parser: 'babel-eslint',
	parserOptions: {
		ecmaVersion: 7,
		sourceType: 'module',
	},
	env: {
		node: true,
		es6: true,
		jest: true,
		mocha: true
	},
	extends: ['airbnb-base', 'plugin:import/errors', 'plugin:import/warnings'],
	plugins: ['import', 'fp'],
	rules: {
		requireSemicolons: 'off',
		indent: [
			'error',
			'tab',
			{
				SwitchCase: 1,
				VariableDeclarator: 1,
			},
		],
		'padded-blocks': ['error', { classes: 'always' }],
		'import/prefer-default-export': 'off',
		'no-shadow': 'off',
		'no-restricted-syntax': 'off',
		'no-tabs': 'off',
		'no-plusplus': 'off',
		'no-await-in-loop': 'off',
		'no-mixed-operators': 'off',
		'no-console': 'off',
		'no-continue': 'off',
		'guard-for-in': 'off',
		'no-param-reassign': [2, { props: false }],
		semi: ['error', 'never'],
		'func-names': ['error', 'never'],
		'comma-dangle': ['error', 'only-multiline'],
		"no-underscore-dangle": "off",
		"no-use-before-define": "off",
		"max-statements": ["error", 10],
		"max-lines-per-function": ["error", {
			"max": 20,
			"skipBlankLines": true,
			"skipComments": true
		}],
		"max-lines": ["error", 150],
		"max-params": ["error", 4],
		"max-depth": ["error", 3],
		"no-console": 1
	},
}
