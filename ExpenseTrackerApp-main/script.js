// let expenses = [];
// let totalAmount = 0;

// const categorySelect = document.getElementById('category-select');
// const amountInput = document.getElementById('amount-input');
// const dateInput = document.getElementById('date-input');
// const addBtn = document.getElementById('add-btn');
// const expensesTableBody = document.getElementById('expnese-table-body');
// const totalAmountCell = document.getElementById('total-amount');

// addBtn.addEventListener('click', function() {
//     const category = categorySelect.value;
//     const amount = Number(amountInput.value);
//     const date = dateInput.value;

//     if (category === '') {
//         alert('Please select a category');
//         return;
//     }
//     if (isNaN(amount) || amount <=0 ) {
//         alert('Please enter a valid amoun')
//         return;
//     }
//     if(date === '') {
//         alert('Please select a date')
//         return;
//     }
//     expenses.push({category, amount, date});

//     totalAmount += amount;
//     totalAmountCell.textContent = totalAmount;

//     const newRow = expensesTableBody.insertRow();

//     const categoryCell = newRow.insertCell();
//     const amountCell = newRow.insertCell();
//     const dateCell = newRow.insertCell();
//     const deleteCell = newRow.insertCell();
//     const deleteBtn = document.createElement('button');

//     deleteBtn.textContent = 'Delete';
//     deleteBtn.classList.add('delete-btn');
//     deleteBtn.addEventListener('click', function() {
//         expenses.splice(expenses.indexOf(expense), 1);

//         totalAmount -= expense.amount;
//         totalAmountCell.textContent = totalAmount;

//         expensesTableBody.removeChild(newRow);
//     });

//     const expense = expenses[expenses.length - 1];
//     categoryCell.textContent = expense.category;
//     amountCell.textContent = expense.amount;
//     dateCell.textContent = expense.date;
//     deleteCell.appendChild(deleteBtn);

// });

// for (const expense of expenses) {
//     totalAmount += expense.amount;
//     totalAmountCell.textContent = totalAmount;

//     const newRow = expensesTableBody.inserRow();
//     const categoryCell = newRow.insertCell();
//     const amountCell = newRow.insertCell();
//     const dateCell = newRow.insertCell();
//     const deleteCell = newRow.insertCell();
//     const deleteBtn = document.createElement('button');
//     deleteBtn.textContent = 'Delete';
//     deleteBtn.classList.add('delete-btn');
//     deleteBtn.addEventListener('click', function() {
//         expenses.splice(expenses.indexOf(expense), 1);

//         totalAmount -= expense.amount;
//         totalAmountCell.textContent = totalAmount;

//         expensesTableBody.removeChild(newRow);
//     });
//     categoryCell.textContent = expense.category;
//     amountCell.textContent = expense.amount;
//     dateCell.textContent = expense.date;
//     deleteCell.appendChild(deleteBtn);
// }

let expenses = [];
let totalAmount = 0;

const categorySelect = document.getElementById('category-select');
const amountInput = document.getElementById('amount-input');
const dateInput = document.getElementById('date-input');
const addBtn = document.getElementById('add-btn');
const expensesTableBody = document.getElementById('expnese-table-body');
const totalAmountCell = document.getElementById('total-amount');
const searchBar = document.getElementById('search-bar');
const categorySummary = document.getElementById('category-summary');
const exportBtn = document.getElementById('export-btn');

// Function to update total amount
function updateTotalAmount() {
    totalAmountCell.textContent = totalAmount.toFixed(2);
}

// Function to update category summary
function updateCategorySummary() {
    const summary = {};
    for (const expense of expenses) {
        if (!summary[expense.category]) {
            summary[expense.category] = 0;
        }
        summary[expense.category] += expense.amount;
    }

    categorySummary.innerHTML = '';
    for (const category in summary) {
        const li = document.createElement('li');
        li.textContent = `${category}: $${summary[category].toFixed(2)}`;
        categorySummary.appendChild(li);
    }
}

// Function to render expenses
function renderExpenses() {
    expensesTableBody.innerHTML = '';
    for (const expense of expenses) {
        const newRow = expensesTableBody.insertRow();

        const categoryCell = newRow.insertCell();
        const amountCell = newRow.insertCell();
        const dateCell = newRow.insertCell();
        const deleteCell = newRow.insertCell();
        const deleteBtn = document.createElement('button');

        deleteBtn.textContent = 'Delete';
        deleteBtn.classList.add('delete-btn');
        deleteBtn.addEventListener('click', function() {
            expenses.splice(expenses.indexOf(expense), 1);

            totalAmount -= expense.amount;
            updateTotalAmount();
            updateCategorySummary();

            expensesTableBody.removeChild(newRow);
        });

        categoryCell.textContent = expense.category;
        amountCell.textContent = expense.amount.toFixed(2);
        dateCell.textContent = expense.date;
        deleteCell.appendChild(deleteBtn);
    }
}

// Add button event listener
addBtn.addEventListener('click', function() {
    const category = categorySelect.value;
    const amount = Number(amountInput.value);
    const date = dateInput.value;

    if (category === '') {
        alert('Please select a category');
        return;
    }
    if (isNaN(amount) || amount <= 0) {
        alert('Please enter a valid amount');
        return;
    }
    if (date === '') {
        alert('Please select a date');
        return;
    }

    const newExpense = { category, amount, date };
    expenses.push(newExpense);

    totalAmount += amount;
    updateTotalAmount();
    updateCategorySummary();

    renderExpenses();

    // Clear input fields
    amountInput.value = '';
    dateInput.value = '';
});

// Search bar event listener
searchBar.addEventListener('input', function() {
    const searchText = searchBar.value.toLowerCase();
    const filteredExpenses = expenses.filter(expense => 
        expense.category.toLowerCase().includes(searchText)
    );

    expensesTableBody.innerHTML = '';
    for (const expense of filteredExpenses) {
        const newRow = expensesTableBody.insertRow();

        const categoryCell = newRow.insertCell();
        const amountCell = newRow.insertCell();
        const dateCell = newRow.insertCell();
        const deleteCell = newRow.insertCell();
        const deleteBtn = document.createElement('button');

        deleteBtn.textContent = 'Delete';
        deleteBtn.classList.add('delete-btn');
        deleteBtn.addEventListener('click', function() {
            expenses.splice(expenses.indexOf(expense), 1);

            totalAmount -= expense.amount;
            updateTotalAmount();
            updateCategorySummary();

            expensesTableBody.removeChild(newRow);
        });

        categoryCell.textContent = expense.category;
        amountCell.textContent = expense.amount.toFixed(2);
        dateCell.textContent = expense.date;
        deleteCell.appendChild(deleteBtn);
    }
});

// Export to CSV function
exportBtn.addEventListener('click', function() {
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Category,Amount,Date\n";

    expenses.forEach(expense => {
        csvContent += `${expense.category},${expense.amount},${expense.date}\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "expenses.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});

// Initial rendering
updateTotalAmount();
updateCategorySummary();
renderExpenses();
