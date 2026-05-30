// LOGIN FORM

const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", function(e){

    e.preventDefault();

    const loginBtn = document.querySelector(".login-btn");

    loginBtn.innerHTML =
    `<i class="fa-solid fa-check"></i> Login Successful`;

    loginBtn.style.background = "#2f6b63";

});