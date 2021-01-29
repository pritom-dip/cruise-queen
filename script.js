// get price over quantity with prefix of Id
function getPriceOverQuantity(idPrefix) {
    const quantity = getInputValue(idPrefix + "Class-quatity");
    const price = getInnerTextValue(idPrefix + "Class-price");
    return total = quantity * price;
}

// Get Input Value by id
function getInputValue(id) {
    const getClass = document.getElementById(id);
    return parseInt(getClass.value);
}

// Get InnerText by id
function getInnerTextValue(id) {
    const getPrice = document.getElementById(id);
    return parseInt(getPrice.innerText);
}

// display value to user by id
function displayValueToUser(id, value) {
    const searchId = document.getElementById(id);
    searchId.innerText = value;
}

// Increament or decreament and calculate total, tax, grand Total
function handleClass(idPrefix, isIncrease) {
    const inputAmount = getInputValue(idPrefix + "Class-quatity");
    let inputNewCount = 0;
    if (isIncrease) {
        inputNewCount = inputAmount + 1;
    }
    if (isIncrease == false && inputAmount > 0) {
        inputNewCount = inputAmount - 1;
    }
    const inputPreviousValue = document.getElementById(idPrefix + "Class-quatity");
    inputPreviousValue.value = inputNewCount;

    // call calculateTotal function to calculate total, tax, grand Total
    calculateAndDisplayTotal();
}

// calculate two number by either adding or multiply. if true add or multiply
function handleAllCalcuation(firstPrice, secondPrice, isAdding) {
    let total = 0;
    if (isAdding) {
        total = firstPrice + secondPrice;
    } else {
        total = firstPrice * secondPrice;
    }
    return total;
}

// calculate total, tax and grandtotal and display to user
function calculateAndDisplayTotal() {
    const firstClassTotal = getPriceOverQuantity("first");
    const economyClassTotal = getPriceOverQuantity("economy");

    // calculate total and display
    const subTotalPrice = handleAllCalcuation(firstClassTotal, economyClassTotal, true);
    displayValueToUser("subtotal", subTotalPrice);

    // calculate tax and display
    const taxTotal = handleAllCalcuation(subTotalPrice, 0.1, false);
    displayValueToUser("tax", taxTotal);

    // calculate grandTotal and display
    const grandTotal = handleAllCalcuation(subTotalPrice, taxTotal, true);
    displayValueToUser("grand-total", grandTotal);
}

// View invoice to user
function showInvoiceToUser() {
    const firstClassTotalQuantity = getInputValue("firstClass-quatity");
    const economyClassTotalQuantity = getInputValue("economyClass-quatity");
    const firstClassTotalPrice = getPriceOverQuantity("first");
    const economyClassTotalPrice = getPriceOverQuantity("economy");

    displayValueToUser("invoice-firstClass-quantity", firstClassTotalQuantity);
    displayValueToUser("invoice-economyClass-quantity", economyClassTotalQuantity);
    displayValueToUser("invoice-firstClass-price", firstClassTotalPrice);
    displayValueToUser("invoice-economyClass-price", economyClassTotalPrice);

    const invoiceSubTotalPrice = handleAllCalcuation(firstClassTotalPrice, economyClassTotalPrice, true);
    const invoiceTaxTotal = parseInt(handleAllCalcuation(invoiceSubTotalPrice, 0.1, false));
    const invoiceGrandTotal = handleAllCalcuation(invoiceSubTotalPrice, invoiceTaxTotal, true);

    displayValueToUser("invoice-subtotal", invoiceSubTotalPrice);
    displayValueToUser("invoice-tax", invoiceTaxTotal);
    displayValueToUser("invoice-grand-total", invoiceGrandTotal);
}

// Clear all previously selected Value
function clearAllValue() {
    disPlayInputValueToUser("firstClass-quatity", 0);
    disPlayInputValueToUser("economyClass-quatity", 0);
}

// Set input tag value By Id
function disPlayInputValueToUser(id, setValue) {
    const inputId = document.getElementById(id);
    inputId.value = setValue;
    displayValueToUser("subtotal", 0);
    displayValueToUser("tax", 0);
    displayValueToUser("grand-total", 0);
}
