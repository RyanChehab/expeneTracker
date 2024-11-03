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
        displayTransactions("income")
    }
    else{
        income_sheet.classList.remove('d-none')
        income_sheet.classList.add('d-block')
        // displaying expense as none
        expense_sheet.classList.remove('d-block')
        expense_sheet.classList.add('d-none')
        displayTransactions("income")
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
        displayTransactions("expense")
    }
    else{
        expense_sheet.classList.remove("d-none")
        expense_sheet.classList.add("d-block")
        // displaying income as none
        income_sheet.classList.remove('d-block')
        income_sheet.classList.add('d-none')
        displayTransactions("expense")
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

function injectForm(type){
    const portal_top = document.getElementById('portal_top')
        // if portal_top has a form delete it
        const existsForm = portal_top.querySelector('.IncomeForm')
        if (existsForm){
            portal_top.removeChild(existsForm)
        }
    if(type==="income"){
        let form = document.createElement('div')
        form.classList.add("IncomeForm")
        form.innerHTML = `<form id="transactionForm">
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
    <button class="submit-btn" type="submit">Save</button>
    </div>
</form>`
        portal_top.append(form)

    }
    else{
        let form = document.createElement('div')
        form.classList.add("IncomeForm")
        form.innerHTML = `<form  id="transactionForm">
    <div class="flex align-center gap-2">
        <label for="number">Amount</label>
        <input type="number" name="number" id="amount" placeholder="$" required>
    </div>
    <br>
    <div class="flex align-center gap-3">
        <label for="date" id="date" required>Date</label>
        <input type="date" required>
    </div>  
    <br>
    <div class="flex gap-1">
        <label for="description">Description</label>
        <input type="text" id="description" required>
    </div>
    <div class="submit-div">
    <button class="submit-btn" type="submit">Save</button>
    </div>
</form>`

portal_top.append(form)
document.getElementById('transactionForm').addEventListener('submit',(e)=>{
    e.preventDefault();
})

let amount = document.getElementById('amount').value
let date = document.getElementById('date').value
let description = document.getElementById('description').value

let transaction = {
    type: type,
    amount: amount,
    date:date,
    description:description,
}

// get existing transaction or create a new array
const transactions = JSON.parse(localStorage.getItem('financialTracker'))|| []

// pushing the collected object into the array 
transactions.push(transaction);

// saving in local storage
localStorage.setItem('financialTracker', JSON.stringify(transactions))

    }
}

function displayTransactions(type){
    // const displayArea =document.getElementById('display')
    // displayArea.innerHTML = '';

    // retrieving data
    const transactions = JSON.parse(localStorage.getItem('financialTracker')) || [];

    // filtering transactions based on type
    const filteredTransactions = transactions.filter(transaction => transaction.type === type)

    filteredTransactions.forEach(transaction => {
        const transactionDiv = document.createElement('div')
        transactionDiv.classList.add('transaction',type)
        
        transactionDiv.innerHTML = 
        `<p>Amount: $${transaction.amount}</p>
            <p>Date: ${transaction.date}</p>
            <p>Description: ${transaction.description}</p>`
        
        income_sheet.appendChild(transactionDiv)
    });

} 

function displayTransactions(type){
    // const displayArea =document.getElementById('display')
    // displayArea.innerHTML = '';

    // retrieving data
    const transactions = JSON.parse(localStorage.getItem('financialTracker')) || [];

    // filtering transactions based on type
    const filteredTransactions = transactions.filter(transaction => transaction.type === type)

    filteredTransactions.forEach(transaction => {
        const transactionDiv = document.createElement('div')
        transactionDiv.classList.add('transaction',type)
        
        transactionDiv.innerHTML = `
        <p>Amount: $${transaction.amount}</p>
            <p>Date: ${transaction.date}</p>
            <p>Description: ${transaction.description}</p>
        `
        // income_sheet.appendChild(transactionDiv)
    });

}