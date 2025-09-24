const getSpendAlert = (amount) => {
    return `Warning! You just spent £${amount}!`
} 

const conciseGetSpendAlert = amount => `Warning! You just spent £${amount}!`

const noParamSpendAlert = () => `Warning! You just spent money!`

const twoParamsGetSpendAlert = (amount, currency) => `Warning! You just spent ${amount} ${currency}!`

console.log(getSpendAlert(150))