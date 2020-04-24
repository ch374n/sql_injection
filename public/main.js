
window.addEventListener('DOMContentLoaded', () => {
    fetch('/me', {})
    .then(res => res.json())
    .then(response => console.log(JSON.parse(response)))
  
})


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
      
        document.body.innerHTML = signInHTML() 
       
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

