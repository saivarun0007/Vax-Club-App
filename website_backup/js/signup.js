// BUTTON ANIMATION

const signupBtn = document.querySelector(".signup-btn");

signupBtn.addEventListener("click", () => {

    signupBtn.innerHTML =
    `<i class="fa-solid fa-check"></i> Notification Enabled`;

    signupBtn.style.background = "#2f6b63";

});