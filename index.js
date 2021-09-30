const billAmount = document.querySelector('#bill-amount');
const cashGiven = document.querySelector('#cash-given');
const cashGivenContainer = document.querySelector('#cash-given-container');
const btnNext = document.querySelector('#btn-next');
const btnCheck = document.querySelector('#btn-check');
const errorMessage = document.querySelector('#error-message');
const totalAmount = document.querySelector('#total-amount');
const numberOfNotes = document.querySelectorAll('.number-of-notes');

const noteDenominations = [2000, 500, 100, 20, 10, 5, 1];

function validateBillAmount() {
    var billAmountValue = Number(billAmount.value);
    if (billAmountValue < 1) {
        clearNoOfNotes();
        showElement(errorMessage);
        hideElement(btnCheck);
        showElement(btnNext);
        hideElement(cashGivenContainer);
        errorMessage.innerText = 'Invalid Bill Amount.';
    } else {
        hideElement(errorMessage);
        hideElement(btnNext);
        showElement(btnCheck)
        showElement(cashGivenContainer);
    }
}


btnNext.addEventListener('click', validateBillAmount);

btnCheck.addEventListener('click', () => {
    clearNoOfNotes();
    validateBillAmount();
    var billAmountValue = Number(billAmount.value);
    var cashGivenValue = Number(cashGiven.value);
    if (!Number.isInteger(cashGivenValue)) {
        errorMessage.innerText = 'Please enter integer value.'

        showElement(errorMessage);
        return;
    }
    if (cashGivenValue < billAmountValue) {
        totalAmount.innerText = '';
        errorMessage.innerText = 'Cash given should not be less than Bill amount.';
        showElement(errorMessage);
    } else {
        hideElement(errorMessage);
        const amountToBeReturned = Math.trunc(cashGivenValue - billAmountValue);
        calculateNotes(amountToBeReturned);
        totalAmount.innerText = amountToBeReturned;
    }
});

const calculateNotes = amountToBeReturned => {
    const length = noteDenominations.length;
    for (let i = 0; i < length; i++) {
        const notes = Math.floor(amountToBeReturned / noteDenominations[i]);
        amountToBeReturned %= noteDenominations[i];
        if (notes > 0) {
            numberOfNotes[i].innerText = notes;
        }
    }
};

const clearNoOfNotes = () => {
    numberOfNotes.forEach(notes => notes.innerText = '');
    totalAmount.innerText = '';
}


const hideElement = element => element.style.display = 'none';
const showElement = element => element.style.display = 'flex';