let totalAmount = document.getElementById("total-amount");
let userAmount = document.getElementById("user-amount");
const checkAmountButton = document.getElementById("check-amount");
const totalAmountButton = document.getElementById("total-amount-button");
const productTitle = document.getElementById("product-title");
const errorMessage = document.getElementById("budget-error");
const productTitleError = document.getElementById("product-cost-error");
const amount = document.getElementById("amount");
const expenditureValue = document.getElementById("expenditure-value");
const balanceValue = document.getElementById("balance-amount"); // corrected here
let tempAmount = 0;

totalAmountButton.addEventListener("click", () => { // corrected here
    tempAmount = totalAmount.value;
    if (tempAmount === "" || tempAmount < 0) {
        errorMessage.classList.remove("hide");
    } else {
        errorMessage.classList.add("hide");
        amount.innerHTML = tempAmount;
        balanceValue.innerText = tempAmount - expenditureValue.innerText; // corrected here
        totalAmount.value = 0;
    }
});

const diableButtons = (bool) => { // make sure this matches usage
    let editButtons = document.getElementsByClassName("edit");
    Array.from(editButtons).forEach((element) => {
        element.disabled = bool;
    });
};

const modifyElement = (element, edit = false) => {
    let parentDiv = element.parentElement;
    let currentBalance = balanceValue.innerText;
    let currentExpence = expenditureValue.innerText;
    let parentAmount = parentDiv.querySelector(".amount").innerText;
    if (edit) {
        let parentText = parentDiv.querySelector(".product").innerText;
        productTitle.value = parentText;
        userAmount.value = parentAmount;
        diableButtons(true); // corrected here
    }
    balanceValue.innerText = parseInt(currentBalance) + parseInt(parentAmount);
    expenditureValue.innerText = parseInt(currentExpence) - parseInt(parentAmount); // corrected logic
    parentDiv.remove(); // correct the logic if you're removing the element
};

const listCreator = (expenseName, expenseValue) => {
    let subListContent = document.createElement("div");
    subListContent.classList.add("sublist-content", "flex-space");
    list.appendChild(subListContent);
    subListContent.innerHTML = `<p class="product">${expenseName}</p><p class="amount">${expenseValue}</p>`; // corrected here
    let editButton = document.createElement("button");
    editButton.classList.add("fa-slid", "fa-pen-to-square", "edit");
    editButton.style.fontSize = "1.2em";
    editButton.addEventListener("click", () => { // corrected here
        modifyElement(editButton, true);
    });
    let deleteButton = document.createElement("button");
    deleteButton.classList.add("fa-solid", "fa-trash-can", "delete");
    deleteButton.style.fontSize = "1.2em";
    deleteButton.addEventListener("click", () => { // corrected here
        modifyElement(deleteButton);
    });
    subListContent.appendChild(editButton);
    subListContent.appendChild(deleteButton);
    document.getElementById("list").appendChild(subListContent);
};

checkAmountButton.addEventListener("click", () => {
    if (!userAmount.value || !productTitle.value) {
        productTitleError.classList.remove("hide");
        return false;
    }
    diableButtons(false); // corrected usage
    let expenditure = parseInt(userAmount.value);
    let sum = parseInt(expenditureValue.innerText) + expenditure;
    expenditureValue.innerText = sum;
    const totalBalance = tempAmount - sum;
    balanceValue.innerText = totalBalance;
    listCreator(productTitle.value, userAmount.value);
    productTitle.value = "";
    userAmount.value = "";
});
