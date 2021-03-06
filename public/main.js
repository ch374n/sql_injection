const BLANKSPACE = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp'


const homepageHTML = (email) => `
  
<nav class="navbar navbar-expand-lg  navbar-dark bg-primary">
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>


  <a class="navbar-brand" href="#">
    <img src="https://png.pngtree.com/svg/20170816/man_1074308.png" width="30" height="30" class="d-inline-block align-top" alt="">
    ${email}
  </a>

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
          <a class="dropdown-item" onclick="logout()" href="#">Logout</a>
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
    <h1 class="display-4">Voila, you just hacked our website!!! &#128561;</h1>
    <hr class="my-4">
    <p class="font-weight-bold">Explanation:</p>
    <p class="lead">After signing  in resulting query will be as follows: </p>
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

    <p class="lead">And thus it will fetch all entries in table and you'll be signed in...</p>
  


    <p class="font-weight-bold">How to prevent SQL Injection Attack ?</p>
    <dl>
      
      <dt>
        1. Use stored procedures or prepared SQL statements
      </dt>
      <dd>
          ${BLANKSPACE} So do not build dynamic SQL. This is the most effective way to prevent SQL injection.
      </dd>
      <dt>
          2. Validate the type and pattern of input
      </dt>
      <dd>
         ${BLANKSPACE}  If you know you're looking for specific data—like an ID, name, or email address—validate any user input based on type, length, or other attributes.
      </dd> 
      <dt>
         3. Escape special characters like quotes
      </dt>
      <dd>
         ${BLANKSPACE}  This approach is a quick and easy way to reduce the chances of SQL injection, but it's not fully effective.
      </dd> 
        
      <dt>
         4. Limit database privileges
      </dt>
      <dd>
         ${BLANKSPACE}  Application accounts that connect to the database should have as few privileges as possible. It's unlikely, for example, that your application will ever have to delete a table. So don't allow it.
      </dd> 
      <dt>
         5. Don't display database error messages to users
      </dt>
      <dd>
         ${BLANKSPACE}  Error messages contain information that could tell hackers a lot of information about your data. Best practice is to give generic database error messages to users, and log detailed errors where developers can access them. Even better, send an alert to the dev team when there’s an error.
      </dd> 
    </dl>
  </div>
</div>


<footer class="footer">
      <div class="container" style="text-align: center; margin-bottom: 20px; color:white;">
        <span class="text-muted" style="color: black !important">@copyright 2020 proximal-mangrove-cacao.glitch.me</span>
      </div>
</footer>


`

const signInHTML = () => `
    
      
  
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



  </div>  
`



window.addEventListener('DOMContentLoaded', () => {
    // document.body.innerHTML = SIGN_IN_HTML 
  
    fetch('/me', {})
    .then(res => {
        
        if(res.status === 404) {
           throw new Error('please sign in ') 
        } else if(res.status === 200) { 
            res.json().then(users => {
                const { email } = users[0] 
                document.body.innerHTML = homepageHTML(email) 
            })
            
        }   
      
    })
    .catch(e => console.log(e))
  
  
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
      
        document.body.innerHTML = homepageHTML()       
    })
    .catch(e => {
        helperTextElement.removeAttribute('hidden')            
     });
}


function logout() {
    
    fetch('/logout', {})
      .then(res => {
          if(res.status === 200) {
              document.body.innerHTML = signInHTML() 
          }
      })
}



const submitButtonElement = document.getElementById('submit') 
const emailInputElement   = document.getElementById('email') 
const passwordInputElement= document.getElementById('password') 
const helperTextElement   = document.getElementById('helper-text') 


submitButtonElement.addEventListener('click', submitForm) 
