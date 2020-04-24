
const homePageHTML = `
  
<nav class="navbar navbar-expand-lg  navbar-dark bg-primary">
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">

      <li class="nav-item dropdown">
  
      </li>

    </ul>
  
     <ul class="navbar-nav ">

      <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Settings
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
          <a class="dropdown-item" href="#">Logout</a>
        </div>
      </li>

      <li class="nav-item">
        <button type="button" class="btn btn-outline-warning">Download</button>
      </li>
    </ul>

  </div>
</nav>
<div class="jumbotron jumbotron-fluid">
  <div class="container">
    <h1 class="display-4">Welcome Admin &#128536;</h1>
    
  </div>
</div>
`


const 

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
      
        document.body.innerHTML = HOMEPAGE_HTML 
       
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

