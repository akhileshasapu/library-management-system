
 async function validateForm(event) {

    event.preventDefault();
     
   
    const fullName = document.getElementById('fullName');
    const password = document.getElementById('password');
    
    //sarda..
    // console.log(`...${fullName.value}...`);
   if(password.value.length < 6){
        alert('password should be 5 character atleast')
    }
    
    const email = document.getElementById('email');

    const emailRegex = /^[a-zA-Z]+@gvpcdpgc\.edu\.in$/;
    
    if (!emailRegex.test(email.value)) {
        alert('Please enter a valid Gmail address.');
        return false;
    }
    if(password.value.length < 6 ){
        alert('password should be 8 character atleast')
    }
    
    
    const data = {
        fullname: fullName.value,
      
        password: password.value,
        email: email.value,
      };
     try {
      
      const admin= await fetch("http://localhost:3000/api/admin/register", {
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
      
        if(admin.token){
        
          localStorage.setItem("token", admin.token);
          alert("Registration successful");
          window.location.href = "adminhome.html";
   
          }


     } catch (error) {
      console.log("Error while registering:", error);
      
     }// This returns another Promise
        // })
        // .then((data) => {
        //   localStorage.setItem("token", data.token);
        //   console.log("Registration successful:", data);
        //   // Handle successful registration, e.g., redirect to another page
        // })
        // .catch((error) => {
        //  
          
        // });


    //going to hit the backend through validation info

    // prasad@gvpcdpgc.edu.in
    return true; 
}

