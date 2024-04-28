
async function validateForm(event) {
  event.preventDefault();

    const password = document.getElementById('password'); 
    const email = document.getElementById('email');
    const emailRegex = /^(?:[1-9][0-8]|[1-9][0-9])\d{8}@gvpcdpgc\.edu\.in$/;
    
    
    if (!emailRegex.test(email.value)) {
        alert('Please enter a valid Gmail address.');
        return false;
    }
    if(password.value.length < 6 ){
        alert('password should be 8 character atleast')
    }else{ 

     
      const data = {
     
      password: password.value,
      email: email.value,
    };
    console.log(data)


    try {
      const response = await fetch("http://localhost:3000/api/student/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
    
      if (!response.ok) {
        // Handle the case where the response status is not OK (e.g., 400 or 500 status code)
        alert('Invalid credentials');
        return;
      }
    
      const datac = await response.json(); // Parse response body as JSON
    
      if (!datac || !datac.token) {
        // Handle the case where the response JSON data or token is missing
        alert('Login failed. Please try again later.');
        return;
      }
    
      localStorage.setItem("token", datac.token);
      alert("Login successful.");
      window.location.href = "home page1.html";
    } catch (error) {
      // Handle errors from fetch request or parsing JSON response
      console.error("Error while login:", error);
      alert("Error during login. Please try again later.");
    }
    


      // .then((data) => {
      //   
      //  
      //   // Handle successful registration, e.g., redirect to another page
      // })
      // .catch((error) => {
      //   
      // });
    }
     
    
    //going to hit the backend through validation info
    return true; 
  }
  
  