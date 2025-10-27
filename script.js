console.log('Code is running:')
import { menuArray } from "./data.js";

const menuEl = document.querySelector('.menu')
const orderItemEl = document.querySelector('.ordered-items')
const totalEl = document.querySelector('.total')
const paymentModalEl = document.querySelector('.payment-modal')
const orderTotalEl = document.querySelector('.order-total')
const yourOrderTitleEl = document.querySelector('#your-order-title')
const completeOrderBtnEl = document.querySelector('#complete-order')
const confirmationMessageEl = document.querySelector('.confirmation-message')
const inputNameEl = document.getElementById('name-on-card')
let receiptArr = []
let totalAmount = 0
let orderCompleted = false

document.addEventListener('click', function(e){
    if (e.target.classList.contains('plus-button') && orderCompleted === false){
        completeOrderBtnEl.style.display = 'grid'
    addToOrder(e.target.id)
    }

    else if(e.target.classList.contains('x-icon') && orderCompleted === false){
        removeFromOrder(e.target)
    }
    else if (e.target.id === 'complete-order' && orderCompleted === false){
        paymentModalEl.style.display = 'grid'
    }
})

document.querySelector('form').addEventListener('submit', function(e){
        e.preventDefault()
        
        confirmationMessageEl.innerHTML =`
        <h2>Thanks <span class="green-text">${inputNameEl.value}</span>, your order is on the way!</h2>`
        paymentModalEl.style.display = 'none'
        // orderTotalEl.style.display = 'none'
        // yourOrderTitleEl.style.display = 'none'
        confirmationMessageEl.style.display = 'grid'
        confirmationMessageEl.scrollIntoView({
            behavior: 'smooth'
        })
        orderCompleted = true
    })



menuArray.forEach(function(food){
    menuEl.innerHTML += `
    <div class="menu-item">
            <div class="left-side">
                <div class="food-img-container">
                    <img class="food-img" src="${food.image}" alt="" />
                </div>
                <div class="food-info">
                    <h3>${food.name}</h3>
                    <p class="menu-description">${food.ingredients.join(', ')}</p>
                    <p class="menu-price">$${food.price.toFixed(2)}</p>
                </div>
            </div>
            <button id="${food.id}" class="plus-button">+</button>
</div>
    `
})


// ------------------------


function addToOrder(clickedId){

const idResult = menuArray.find(function(searchedItem){
    return searchedItem.id === Number(clickedId)
})
 
    totalAmount += idResult.price
    receiptArr.push(idResult)
    render(idResult)
    renderTotal()
}



    function removeFromOrder(target){
        console.log('Running remove')
      
        // const removedArray = receiptArr.filter(element =>{
        //     return element.id != target.dataset.foodId
        // })

        const index = receiptArr.findIndex((item) => item.id === Number(target.dataset.foodId))
        if(index !== -1){receiptArr.splice(index, 1)}

        const removedArray = receiptArr

        const newPricesArr = removedArray.map((item)=>item.price) 
        const reducedTotal = newPricesArr.reduce((acc, curr) => acc + curr, 0)            
        
        
       
        if(newPricesArr.length === 0){
            totalAmount = 0
            renderTotal()
        } 
        else {
            totalAmount = reducedTotal
        }


        receiptArr = removedArray
        orderItemEl.innerHTML = ''

        removedArray.map(function(reRenderedItem){
        render(reRenderedItem)
        renderTotal()
        })
}



function render(idResult){

    orderItemEl.innerHTML += `
        <div class="order-item">
            <div class="order-item-left-side">
                <p class="item-name">${idResult.name}</p>
                <button data-food-id='${idResult.id}' class="x-icon">x</button>
            </div>
            <p class="item-price">$${idResult.price.toFixed(2)}</p>
        </div>
    ` 
        }

function renderTotal(){
                   totalEl.innerHTML = `
            <p class="item-name">Total</p>
            <p>$${totalAmount.toFixed(2)}</p>
        `
}

 







