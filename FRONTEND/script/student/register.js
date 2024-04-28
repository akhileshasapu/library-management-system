
async function validateForm(event) {
  event.preventDefault();
  const fullName = document.getElementById("fullName");
  const rollNo = document.getElementById("rollNo");
  const password = document.getElementById("password");

  //sarda..
  console.log(`${password.value}..${rollNo.value}..${fullName.value}`);

  const emailInput = document.getElementById("email");
  const emailRegex = /^(?:[1-9][0-8]|[1-9][0-9])\d{8}@gvpcdpgc\.edu\.in$/;

  if (!emailRegex.test(emailInput.value)) {
    alert("Please enter a valid Gmail address.");
    return false;
  } else {


    try {
      const data = {
        fullname: fullName.value,
        rollNo: rollNo.value,
        password: password.value,
        email: emailInput.value,
      };

      
    const datac = await fetch("http://localhost:3000/api/student/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        console.log("Response status:", response.status);
        if(response.status === 400){
          return alert('email or roll no already exists')
        }
        return response.json();
       })

       if(datac.token){
        
       localStorage.setItem("token", datac.token);
       alert("Registration successful");
       window.location.href = "home page1.html";

       }




      
    } catch (error) {
      console.log("Error while registering:", error);
        alert("An error occurred while registering. Please try again later.");
      
    }
    
      // .then((data) => {
      //   console.log("Response data:", data);
       
      //    
        
      // })
      // .catch((error) => {
      //   console.log("Error while registering:", error);
      //   alert("An error occurred while registering. Please try again later.");
      // });
    
  }

  //going to hit the backend through validation info
  // 5211411064@gvpcdpgc.edu.in
  return true;
}