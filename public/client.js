// client-side js
// run by the browser each time your view template referencing it is loaded

// console.log("hello world :o");

// const dreams = [];

// // define variables that reference elements on our page
// const dreamsForm = document.forms[0];
// const dreamInput = dreamsForm.elements["dream"];
// const dreamsList = document.getElementById("dreams");
// const clearButton = document.querySelector('#clear-dreams');

// // request the dreams from our app's sqlite database
// fetch("/getDreams", {})
//   .then(res => res.json())
//   .then(response => {
//     response.forEach(row => {
//       appendNewDream(row.dream);
//     });
//   });

// // a helper function that creates a list item for a given dream
// const appendNewDream = dream => {
//   const newListItem = document.createElement("li");
//   newListItem.innerText = dream;
//   dreamsList.appendChild(newListItem);
// };

// // listen for the form to be submitted and add a new dream when it is
// dreamsForm.onsubmit = event => {
//   // stop our form submission from refreshing the page
//   event.preventDefault();

//   const data = { dream: dreamInput.value };

//   fetch("/addDream", {
//     method: "POST",
//     body: JSON.stringify(data),
//     headers: { "Content-Type": "application/json" }
//   })
//     .then(res => res.json())
//     .then(response => {
//       console.log(JSON.stringify(response));
//     });
//   // get dream value and add it to the list
//   dreams.push(dreamInput.value);
//   appendNewDream(dreamInput.value);

//   // reset form
//   dreamInput.value = "";
//   dreamInput.focus();
// };

// clearButton.addEventListener('click', event => {
//   fetch("/clearDreams", {})
//     .then(res => res.json())
//     .then(response => {
//       console.log("cleared dreams");
//     });
//   dreamsList.innerHTML = "";
// });

function submitForm(e) {
   e.preventDefault() 
  
   const email    = emailInputElement.value
   const password = passwordInputElement.value
     
  
   
   const data = { email, password } 
   
     fetch("/login", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" }
    })
    .then(res => {
       
         if(res.status === 404) throw new Error("Incorrect credentials")
         return res.json()  
     })
    .then(response => {
      console.log(JSON.stringify(response));
    })
    .catch(e => {
        helperTextElement.removeAttribute('hidden')            
     });
}

const submitButtonElement = document.getElementById('submit') 
const emailInputElement   = document.getElementById('email') 
const passwordInputElement= document.getElementById('password') 
const helperTextElement   = document.getElementById('helper-text') 

submitButtonElement.addEventListener('click', submitForm) 

