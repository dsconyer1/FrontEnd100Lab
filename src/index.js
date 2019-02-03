import './styles.css';

let 
    billAmount = 0;
const tipAmountStored = 'tipAmountStored',
    customTipId = 'tipCustom';
let tipStoredItems = localStorage.getItem(tipAmountStored) ? JSON.parse(localStorage.getItem(tipAmountStored)) : [];
let customTipStored = localStorage.getItem(customTipId) ? localStorage.getItem(customTipId) : 0;

function savedTip() {
    let tipStoredItems = localStorage.getItem(tipAmountStored) ? JSON.parse(localStorage.getItem(tipAmountStored)) : [];
    return (tipStoredItems.length > 0) ? parseInt(tipStoredItems[0]) : 0;
}
function init() {
    // let savedTip = (tipStoredItems.length > 0) ? parseInt(tipStoredItems[0]) : 0;
    let savedTipId = (tipStoredItems.length > 0) ? tipStoredItems[1] : "";
    let customTipInput = document.querySelector("#customTipInput");
    let billInput = document.querySelector("#billInput");

    customTipInput.disabled = true;
    document.querySelectorAll('.btn').forEach((aButton) => {
        if(aButton.id.substr(0,3) ==='tip'){
            aButton.addEventListener('click', processTipPercent);
            if(aButton.id === savedTipId){
                // tipPercent = parseInt(savedTip);
                aButton.disabled = true;
                if(aButton.id === customTipId){ 
                    customTipInput.disabled = false;
                }
            }
            if(aButton.id === customTipId){ 
                aButton.value = customTipStored;
            }
        };
    });

    customTipInput.value = customTipStored;
    billInput.addEventListener('input', validateInput);
    billInput.addEventListener('input', updateOutput);
    billInput.addEventListener('keydown', notAllowE);

    customTipInput.addEventListener('keydown', notAllowE);
    customTipInput.addEventListener('keydown', notAllowMinus);
    customTipInput.addEventListener('input', validateCustomTip);
    customTipInput.addEventListener('input', updateOutput);

    document.querySelectorAll('.form-check-input').forEach((anInput) => {
        anInput.addEventListener('input', updateOutput);
    })
    updateOutput();
}

function processTipPercent(e) {
    // JMG I like how you stored the tip amount as the value in the element. That'd make it easy to update from the HTML. Cool. Good Idea!

    storeTipPercent(parseInt(e.srcElement.value), e.srcElement.id);
    enableTipButtons();
    document.querySelector("#customTipInput").disabled = true;
    e.srcElement.disabled = true;
    if(e.srcElement.id === customTipId){
        document.querySelector("#customTipInput").disabled = false;
    }
    updateOutput();
}

function storeTipPercent(value, id) {
    // tipPercent = value;
    localStorage.setItem(tipAmountStored, JSON.stringify([value,id]));
}

function enableTipButtons() {
    document.querySelectorAll('.btn').forEach((aButton) => {
        if(aButton.id.substr(0,3) ==='tip'){
            aButton.disabled = false;
        };
    });    
}

function validateDecimals(e) {
    let value = e.srcElement.value;
    if((value).length > 0){
        let stringArray = value.split(".");
        if(stringArray.length > 1){
            if(stringArray[1].length > 2){
                let l = value.length - 1;
                e.srcElement.value = value.substring(0,l);
            };
        };
    }
}

function validateInput(e) {
    validateDecimals(e);
    let value = e.srcElement.value;
    let constraints = ['^(?:[0-9]*(?:\.[0-9]{1,2})?|(?:[0-9]+\.))$', 'Value must be in a valid currency form.']
    let constraint = new RegExp(constraints[0], "");

    if (value == "" || constraint.test(value)) {
        e.srcElement.setCustomValidity("");
    }
    else {
        e.srcElement.setCustomValidity(constraints[1]);
    } 
}

export function notAllowE(e) {
    if(e.key === 'e' || e.key === 'E'){e.returnValue = false};
}

function notAllowMinus(e) {
    if(e.key === '-'){e.returnValue = false};
}

function validateCustomTip(e) {
    let value = e.srcElement.value;
    if(value.length > 3){
        e.srcElement.value = value.substring(0,3);
    };
    value = e.srcElement.value;

    let constraints = ['^(?:[0-9]{1,2,3})$', 'Value must be between 0 and 100.']
    let constraint = new RegExp(constraints[0], "");
    // JMG proper use of a regex always gets extra credit in my book.
    if (value == "" || constraint.test(value)) {
        e.srcElement.setCustomValidity("");
    }
    else {
        e.srcElement.setCustomValidity(constraints[1]);
    } 

    // JMG: It looks like you are storing this twice here?
    storeTipPercent(value, customTipId);
    localStorage.setItem(customTipId, value);
    let customTipButton = document.querySelector(customTipId);
    customtTipButton.value = value;
}

function processBillAmount() {
    let billInput = document.getElementById("billInput");

    if(billInput.validity.badInput || billInput.validity.customError || billInput.valueAsNumber < 0){
        billAmount = 0;
        billInput.classList.add('error');  
    } else {
        if(billInput.value =="") {
            billAmount = 0;
        } else { 
            billAmount = billInput.valueAsNumber;
        };
        billInput.classList.remove('error');
    }
}

function numberOfPayees() {
    // let payees = 0;
    // document.querySelectorAll('.form-check-input').forEach((anInput) => {
    //     if (anInput.checked) {   
    //         payees = parseInt(anInput.value);
    //     }
    // })
    // JMG yours was good. I just wanted to show an alternative.
    return [...document.querySelectorAll('.form-check-input')]
        .filter(aInput => aInput.checked)
        .map(a => +a.value)
        .reduce((a,b) => a + b, 0)
}

function updateOutput() {
    processBillAmount();
    let tipPercent = savedTip();
    let tipAmount = billAmount * tipPercent / 100;
    let totalAmount = billAmount + tipAmount;

    document.getElementById("tipPercent").innerHTML = tipPercent;
    document.getElementById("billAmount").innerHTML = `Bill Amount: ${formatCurrency(billAmount)}`;  
    document.getElementById("tipPercentAmount").innerHTML = `Tip Percentage: ${tipPercent}%`;
    document.getElementById("tipAmount").innerHTML = `Amount of tip: ${formatCurrency(tipAmount)}`;

    let payees = numberOfPayees();
    if(payees === 1){
        document.getElementById("totalAmount").innerHTML = `Total to be Paid: ${formatCurrency(totalAmount)}`;
    } else {
        let guestAmount = Math.trunc(totalAmount/payees * 100) / 100;
        let hostAmount = guestAmount + (totalAmount - (guestAmount * payees));
        document.getElementById("totalAmount").innerHTML = `Host pays: ${formatCurrency(hostAmount)}   Each other guest pays: ${formatCurrency(guestAmount)}`;
    }
}

function formatCurrency(value){
    return new Intl.NumberFormat('en-US',{ style: 'currency', currency: 'USD' }).format(value);
}

init();