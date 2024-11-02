const income = document.getElementById('income');
const expense = document.getElementById('expense');
const income_sheet = document.getElementById("income_sheet");
const expense_sheet = document.getElementById("expense_sheet");
const portal = document.getElementById('portal')

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
// add-income
const add_income = document.getElementById('add-income')
add_income.addEventListener('click',function(){
    
})

// add-expense
const add_expense = document.getElementById('add-expense')
add_expense.addEventListener('click',function(){
    console.log("ok")
})


const add_btn = document.getElementById('')
document.addEventListener('click',function(event){
    if(!portal.contains(event.target)){

        event.stopPropagation();
    }
})