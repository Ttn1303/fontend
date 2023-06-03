/* eslint @typescript-eslint/no-var-requires: "off" */
const path = require('path')

const buildEslintCommand = filenames =>
  `next lint --fix --file ${filenames
    .map(f => path.relative(process.cwd(), f))
    .join(' --file ')}`

const prettierCommand = filenames => [
  `yarn eslint --fix ${filenames.join(' ')}`,
  `yarn prettier --write ${filenames.join(' ')}`
]

module.exports = {
  '*.{js,jsx,ts,tsx}': [buildEslintCommand, prettierCommand]
}
