/*
when you click the 'Add to cart' button, whatever is written in the input field should be console logged.
*/

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://shoppinglist-b710c-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList")

const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const shoppingListEl = document.getElementById("shopping-list")

addButtonEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value
    // console.log(inputValue)
    push(shoppingListInDB, inputValue)
    
    clearInputFieldEl()   
})

/*
Call the onValue function with
shoppingListInDB as the first argument and
function(snapshot) {} as the second argument
*/

onValue(shoppingListInDB, function(snapshot) {
     // Change the onValue code so that it uses snapshot.exists() to show items when there are items in the database and if there are not displays the text 'No items here... yet'.

    if (snapshot.exists()) {
        // Use Object.values() to convert snapshot.val() from an Object to an Array. Create a variable for this.
        let itemsArray = Object.entries(snapshot.val())

        // console.log(snapshot.val())

        clearShoppingListEl()  
        // console.log(itemsArray) 

        // Write a for loop to iterate on itemsArray and console log each item
        for (let i = 0; i < itemsArray.length; i++) {
            let currentItem = itemsArray[i]

            // Make two let variables:
            // currentItemID and currentItemValue and use currentItem to set both of
            // them equal to the correct values.
            let currentItemID = currentItem[0]
            let currentItemValue = currentItem[1]

            // Use the appendItemToShoppingListEl(itemValue) function inside of the for loop to append item to the shopping list element for each iteration.
            appendItemToShoppingListEl(currentItem)
        }        
    } else {
        shoppingListEl.innerHTML = "No items here... yet" 
    }
   
})

function clearShoppingListEl() {
    shoppingListEl.innerHTML = ""
}

// Clear the input field when button is pressed
function clearInputFieldEl() {
    inputFieldEl.value = ""
}

// Append a new <li> with text content inputValue to the 'shopping-list' <ul>
function appendItemToShoppingListEl(item) {
    // shoppingListEl.innerHTML += `<li>${itemValue}</li>`

    let itemID = item[0]
    let itemValue = item[1]
    
    let newEl = document.createElement("li")
    
    newEl.textContent = itemValue
    
    // Attach an event listener to newEl and make it so you console log the id of the item when it's pressed.
    newEl.addEventListener("click", function() {
        // console.log(itemID)

        // Make a let variable called 'exactLocationOfItemInDB' and set it equal to ref(database, something) where you substitute something with the code that will give you the exact location of the item in question.
        let exactLocationOfItemInDB = ref(database, `shoppingList/${itemID}`)
        
        // Use the remove function to remove the item from the database
        remove(exactLocationOfItemInDB)
    })
    
    shoppingListEl.append(newEl)
}
