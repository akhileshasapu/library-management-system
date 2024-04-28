
function validateForm() {

  const password = document.getElementById('password'); 
  const email = document.getElementById('email');
  const emailRegex = /^[a-zA-Z]+@gvpcdpgc\.edu\.in$/;
  
  if (!emailRegex.test(email.value)) {
      alert('Please enter a valid Gmail address.');
      return false;
  }
  if(password.value.length < 5){
      alert('password should be 5 character atleast')
  }else{
    
    
    const data = {
      password: password.value,
      email: email.value,
    };

    fetch("http://localhost:3000/api/admin/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        localStorage.setItem("token", data.token);
       
       
      })
      .catch((error) => {
        console.log("Error while registering:", error);
        
      });
    alert("login successfully")
    window.location.href = "adminhome.html";
  }
   
  
  
  return true; 
}

