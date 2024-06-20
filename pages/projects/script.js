/* function convertCurrency(amountToConvert, fromCurrency, toCurrency) {
    var currentRate = currencyRates[fromCurrency];
    var desiredRate = currencyRates[toCurrency];

    var RONAmount = amountToConvert * currentRate;
    var convertedAmount = RONAmount / desiredRate;

    return convertedAmount;
} */


/* function convertAndDisplay() {
    let amount = parseFloat(document.getElementById('amount').value);
    let fromCurrency = document.getElementById('fromCurrency').value;
    let toCurrency = document.getElementById('toCurrency').value;

    if (!isNaN(amount) && fromCurrency && toCurrency) {
        let convertedAmount = convertCurrency(amount, fromCurrency, toCurrency);
        updateResult(convertedAmount);
    } else {
        alert("Please enter valid inputs.");
    }
} */


// Function to load and parse BNR XML for currency rates
function loadCurrencyRates() {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            console.log(xhr.responseXML);
            parseCurrencyRates(xhr.responseXML);
            handleCurrencyRates(parseCurrencyRates(xhr.responseXML));
        }
    };
    xhr.open("GET", "https://www.bnr.ro/nbrfxrates.xml", true);
    xhr.send();
}

function handleCurrencyRates(document) {
    convertCurrency(amountToConvert, fromCurrency, toCurrency, currencyRates);
}

// Function to parse BNR XML and populate currency rates
function parseCurrencyRates(xml) {
    var currencyRates = {};
    var rates = xml.querySelectorAll("Rate");
    for (var i = 0; i < rates.length; i++) {
        var currencyCode = rates[i].getAttribute("currency");
        var rate = parseFloat(rates[i].textContent);
        currencyRates[currencyCode] = rate;
    }

    // Manually add RON with a rate of 1 to ensure it's in the list
    currencyRates["RON"] = 1;
    //console.log(currencyRates);


    // Populate dropdowns with available currencies
    populateCurrencyDropdowns(currencyRates);
}

// Function to populate currency dropdowns
function populateCurrencyDropdowns(currencyRates) {
    var fromCurrencyDropdown = document.getElementById('fromCurrency');
    var toCurrencyDropdown = document.getElementById('toCurrency');

    for (var currencyCode in currencyRates) {
        var option = document.createElement('option');
        option.value = currencyCode;
        option.text = currencyCode;
        fromCurrencyDropdown.add(option.cloneNode(true));
        toCurrencyDropdown.add(option);
    }
}

// Call the function to load currency rates
loadCurrencyRates();

// Function to convert currency
function convertCurrency(amountToConvert, fromCurrency, toCurrency, currencyRates) {
    // Check if the currencies exist in the BNR XML
    //console.log(currencyRates);
    if (currencyRates[fromCurrency] && currencyRates[toCurrency]) {
        var currentRate = currencyRates[fromCurrency];
        var desiredRate = currencyRates[toCurrency];

        // Check special cases for HUF, JPY, and KRW
        if (fromCurrency === 'HUF' || fromCurrency === 'JPY' || fromCurrency === 'KRW') {
            amountToConvert *= 100;
        }
        if (toCurrency === 'HUF' || toCurrency === 'JPY' || toCurrency === 'KRW') {
            amountToConvert /= 100;
        }

        var RONAmount = amountToConvert / currentRate; // Convert to RON
        var convertedAmount = RONAmount * desiredRate; // Convert to the desired currency

        return convertedAmount;
        
    } else {
        // If the currencies are not in BNR XML, use the existing approach
        console.log("Currencies not found in BNR XML. Using manual conversion.");
        return convertCurrencyManually(amountToConvert, fromCurrency, toCurrency);
    }
}

// Function for manual currency conversion (if not in BNR XML)
function convertCurrencyManually(amountToConvert, fromCurrency, toCurrency, currencyRates) {
    var currentRate = currencyRates[fromCurrency];
    var desiredRate = currencyRates[toCurrency];

    var RONAmount = amountToConvert * currentRate;
    var convertedAmount = RONAmount / desiredRate;

    return convertedAmount;
}


function updateResult(result) {
    document.getElementById('result').value = result.toFixed(2);
}

// Modify the existing convertAndDisplay function
function convertAndDisplay(currencyRates) {
    let amount = parseFloat(document.getElementById('amount').value);
    let fromCurrency = document.getElementById('fromCurrency').value;
    let toCurrency = document.getElementById('toCurrency').value;
    let convertedAmount = 0;

    // Check if the currency is available in BNR XML
    if (currencyRates[fromCurrency] !== undefined && currencyRates[toCurrency] !== undefined) {
        // Use BNR conversion rates
        convertedAmount = convertCurrency(amount, fromCurrency, toCurrency);
        updateResult(convertedAmount);
    } else {
        // Use existing manual conversion rates
        if (!isNaN(amount) && fromCurrency && toCurrency) {
            convertedAmount = convertCurrency(amount, fromCurrency, toCurrency);
            updateResult(convertedAmount);
        } else {
            alert("Please enter valid inputs.");
        }
    }
}

function swapCurrencies() {
    let fromCurrency = document.getElementById('fromCurrency').value;
    let toCurrency = document.getElementById('toCurrency').value;

    document.getElementById('fromCurrency').value = toCurrency;
    document.getElementById('toCurrency').value = fromCurrency;

    let amount = document.getElementById('amount').value;
    let result = document.getElementById('result').value;

    document.getElementById('result').value = amount;
    document.getElementById('amount').value = result;
}


// Add event listeners
document.addEventListener('DOMContentLoaded', loadCurrencyRates);
document.getElementById('convert').addEventListener('click', convertAndDisplay);
document.getElementById('swapCurrencies').addEventListener('click', swapCurrencies);