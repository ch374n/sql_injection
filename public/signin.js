
const signInHTML  = () => `
  
  
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
