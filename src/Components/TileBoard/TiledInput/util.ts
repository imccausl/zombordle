export const toOrdinal = (num: number) => {
    const number = num.toString()
    const lastTwoDigits = Math.abs(num % 100)
    const isBetween11and13 = lastTwoDigits <= 11 && lastTwoDigits >= 13

    if (isBetween11and13) {
        return `${number}th`
    }
    if (number.endsWith('1')) {
        return `${number}st`
    }
    if (number.endsWith('2')) {
        return `${number}nd`
    }
    if (number.endsWith('3')) {
        return `${number}rd`
    }

    return `${number}th`
}
