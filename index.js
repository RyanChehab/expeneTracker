const income = document.getElementById('income');
const expense = document.getElementById('expense');
const income_sheet = document.getElementById("income_sheet");
const expense_sheet = document.getElementById("expense_sheet");
const portal = document.getElementById('portal')
const add_income = document.getElementById('add-income')

// displaying income_sheet
income.addEventListener('click',function(){
    if(income_sheet.classList.contains('d-block')){
        income_sheet.classList.remove('d-block');
        income_sheet.classList.add('d-none')
        // displaying expense as none
        expense_sheet.classList.remove('d-block')
        expense_sheet.classList.add('d-none')
    }
    else{
        income_sheet.classList.remove('d-none')
        income_sheet.classList.add('d-block')
        // displaying expense as none
        expense_sheet.classList.remove('d-block')
        expense_sheet.classList.add('d-none')
    }
})
// displaying  expense_sheet
expense.addEventListener('click',function(){
    if (expense_sheet.classList.contains("d-block")){
        expense_sheet.classList.remove('d-block')
        expense_sheet.classList.add("d-none")

        // displaying income as none
        income_sheet.classList.remove('d-block')
        income_sheet.classList.add('d-none')
    }
    else{
        expense_sheet.classList.remove("d-none")
        expense_sheet.classList.add("d-block")
        // displaying income as none
        income_sheet.classList.remove('d-block')
        income_sheet.classList.add('d-none')
    }
    
})

// close portal
const close_btn = document.getElementById('close_btn')
close_btn.addEventListener('click',function(){
    portal.classList.add('d-none')
    const overlay = document.getElementById('overlay')
    overlay.classList.add('d-none')
})
// add-income btn
add_income.addEventListener('click',function(){
    portal.classList.remove('d-none')
    const overlay = document.getElementById('overlay')
    overlay.classList.remove('d-none')
    const portal_title = document.getElementById('top-title')
    portal_title.innerText = 'Add Income';
     // calling to inject the dynamic form
    injectForm("income")
})

// add-expense btn
const add_expense = document.getElementById('add-expense')
add_expense.addEventListener('click',function(){
    portal.classList.remove('d-none')
    const overlay = document.getElementById('overlay')
    overlay.classList.remove('d-none')
    const portal_title = document.getElementById('top-title')
    portal_title.innerText = 'Add Expense';
    // calling to inject the dynamic form
    injectForm("expense")
})

function injectForm(type) {
    const portal_top = document.getElementById('portal_top');

    // If portal_top has a form, delete it
    const existsForm = portal_top.querySelector('.Form');
    if (existsForm) {
        portal_top.removeChild(existsForm);
    }

    // Create form based on type (income or expense)
    let form = document.createElement('div');
    form.classList.add("Form");
    form.innerHTML = `
        <form id="transactionForm">
            <div class="flex align-center gap-2">
                <label for="number">Amount</label>
                <input type="number" name="number" id="amount" placeholder="$" required>
            </div>
            <br>
            <div class="flex align-center gap-3">
                <label for="date">Date</label>
                <input type="date" id="date" required>
            </div>  
            <br>
            <div class="flex gap-1">
                <label for="description">Description</label>
                <input type="text" id="description" required>
            </div>
            <div class="submit-div">
                <button class="submit-btn" id="saving-btn" type="submit">Save</button>
            </div>
        </form>`;

    portal_top.append(form);

    // stops the default submision and fills localstorage with Data
    document.getElementById('transactionForm').addEventListener('submit', (e) => {
        e.preventDefault();
        
            console.log("wor")
            portal.classList.remove('d-block')
            portal.classList.add('d-none')
            overlay.classList.add('d-none')

        let amount = document.getElementById('amount').value;
        let date = document.getElementById('date').value;
        let description = document.getElementById('description').value;

        let transactionid = Date.now()

        let transaction = {
            id:transactionid,
            type: type,
            amount: amount,
            date: date,
            description: description,
        };

        // Get existing transactions or create a new array
        const transactions = JSON.parse(localStorage.getItem('financialTracker')) || [];

        // Push the new transaction to the array
        transactions.push(transaction);
        console.log(transactions)
        // Save in localStorage
        localStorage.setItem('financialTracker', JSON.stringify(transactions));
        console.log('Saved in localStorage:', transaction);

        injectTransaction(transaction)
    });
}


function injectTransaction(transaction){

    const transactionDiv = document.createElement('div');
    // transactionDiv.classList.add("test", transaction.type);
    // transactionDiv.setAttribute('data-id', transaction.id)

    transactionDiv.innerHTML = 
       `<div class="test">
            <div class="flex space-between m-1">
                <p id="type">${transaction.type}</p>
                <i class="fas fa-minus delete" title="delete transaction"></i>
            </div>
            <hr style="border-color: black;">
        <br>
            <p class="ml-1">Amount:${transaction.amount}</p><br>
            <p class="ml-1">Date:${transaction.date}
            <p class="ml-1 mb-1">Description:${transaction.description}</p>
       </div>`
       
       const sheet = transaction.type === "income" ? income_sheet : expense_sheet;
    sheet.appendChild(transactionDiv);

    // 0delete functionality
    const deleteBtn = transactionDiv.querySelector('.delete');
    deleteBtn.addEventListener('click', () => {
        deleteTransaction(transaction.id, transactionDiv);
    });
}

function displayTransactions(type) {
    // Get transactions from localStorage
    const transactions = JSON.parse(localStorage.getItem('financialTracker')) || [];

    // Filter transactions by type (income or expense)
    const filteredTransactions = transactions.filter(transaction => transaction.type === type);

    // Clear the appropriate sheet before injecting transactions
    const sheet = type === "income" ? income_sheet : expense_sheet;
    sheet.innerHTML = '';

    // Inject each filtered transaction
    filteredTransactions.forEach(transaction => {
        injectTransaction(transaction);
    });
}

window.addEventListener('load', () => {
    displayTransactions("income");
    displayTransactions("expense");
});