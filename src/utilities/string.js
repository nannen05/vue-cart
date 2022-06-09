import numeral from "numeral"

let formatMoney = (number) => {
    return numeral(number / 100).format("$0,0.00")
}

export { formatMoney }