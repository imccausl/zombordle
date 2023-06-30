import { type Formatter } from 'style-dictionary'

const createCssVariable = (path: string[]) => {
    return `var(--${path.join('-')})`
}

const formatterFunc: Formatter = ({ dictionary }) => {
    const output = ['const ThemeTokens = {\n']
    dictionary.allTokens.forEach((token) => {
        output.push(`\t${token.name}: '${createCssVariable(token.path)}',\n`)
    })
    output.push('}\n\n')
    output.push('export { ThemeTokens }\n')
    return output.join('')
}

const formatter = {
    name: 'javascript/theme-tokens',
    formatter: formatterFunc,
}

export default formatter
