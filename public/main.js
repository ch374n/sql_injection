
const HOMEPAGE_HTML = `
  
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
    <hr class="my-4">
    <p class="font-weight-bold">Explanation:</p>
    <p class="lead">After signing in resulting query will be as follows: </p>
    <img src="https://cdn.glitch.com/a2fc744e-afd5-4822-82f8-c8df2af166aa%2Fcarbon.png?v=1587733186126" class="img-fluid" alt="Responsive image">
    <hr class="my-4">

    <p class="font-weight-bold">Here:</p>
    <ul>

      <li>
          somerandomemail.com ends with a double quote which completes the string quote
      </li>
      <li>
          OR 1 = 1 is a condition that will always be true and
      </li>
      <li>
          -- " AND … is a SQL comment that eliminates the password part.
      </li>
    </ul>
  </div>
</div>





`





const SIGN_IN_HTML  =  `
  
  
    <div class="mx-auto" style="width: 70vw;">
  

  <div class="wrapper fadeInDown">
    <div id="formContent">
      <!-- Tabs Titles -->

      <!-- Icon -->
      <div class="fadeIn first">
        <img src="https://citizenmed.files.wordpress.com/2011/08/user-icon1.jpg" id="icon" alt="User Icon" />
      </div>

      <!-- Login Form -->
      <form>
        <input type="email" id="email" class="fadeIn second" name="login" placeholder="email" required>
        <input type="password" id="password" class="fadeIn third" name="login" placeholder="password" required>
        <p style="
            color: red;

        "  hidden="true" id="helper-text">
           incorrect username or password
        </p>
        <input id="submit" type="submit" class="fadeIn fourth" value="Log In">
      </form>
    </div>
  </div>
  <div class="jumbotron">
    <h1 class="display-4">SQL Injection Example</h1>
    <p class="lead">Use following credentials: .</p>
    <p class="text-monospace">Email: somerandomemail.com" OR 1=1 --</p>
    <p class="text-monospace">Password: somepassword</p>
    <hr class="my-4">
    <p class="lead">Resulting query will be as follows: </p>
    <img src="https://cdn.glitch.com/a2fc744e-afd5-4822-82f8-c8df2af166aa%2Fcarbon.png?v=1587733186126" class="img-fluid" alt="Responsive image">
    <hr class="my-4">

    <p class="font-weight-bold">Here:</p>
    <ul>

      <li>
          somerandomemail.com ends with a double quote which completes the string quote
      </li>
      <li>
          OR 1 = 1 is a condition that will always be true and
      </li>
      <li>
          -- " AND … is a SQL comment that eliminates the password part.
      </li>
    </ul>


  </div>
  </div>
`

window.addEventListener('DOMContentLoaded', () => {
    // document.body.innerHTML = SIGN_IN_HTML 
  
    fetch('/me', {})
    .then(res => {
        res.json()

    })
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