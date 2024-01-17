var currencyRates = {
    "RON": 1,
    "EUR": 5,
    "USD": 4.55,
    "HUF": 0.0131,
    "BWP": 0.3356
};

function convertCurrency(amountToConvert, fromCurrency, toCurrency) {
    var currentRate = currencyRates[fromCurrency];
    var desiredRate = currencyRates[toCurrency];

    var RONAmount = amountToConvert * currentRate;
    var convertedAmount = RONAmount / desiredRate;

    return convertedAmount;
}

function updateResult(result) {
    document.getElementById('result').value = result.toFixed(2); // Display the result in the 'result' input field with two decimal places
}

function convertAndDisplay() {
    let amount = parseFloat(document.getElementById('amount').value);
    let fromCurrency = document.getElementById('fromCurrency').value;
    let toCurrency = document.getElementById('toCurrency').value;

    if (!isNaN(amount) && fromCurrency && toCurrency) {
        let convertedAmount = convertCurrency(amount, fromCurrency, toCurrency);
        updateResult(convertedAmount);
    } else {
        alert("Please enter valid inputs.");
    }
}

function swapCurrencies() {
    let fromCurrency = document.getElementById('fromCurrency').value;
    let toCurrency = document.getElementById('toCurrency').value;

    document.getElementById('fromCurrency').value = toCurrency;
    document.getElementById('toCurrency').value = fromCurrency;
}

// Add event listeners
document.getElementById('convert').addEventListener('click', convertAndDisplay);
document.getElementById('swap').addEventListener('click', swapCurrencies);
