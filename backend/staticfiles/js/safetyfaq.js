// BUTTON ANIMATION

const safetyBtn = document.querySelector(".safety-btn");

safetyBtn.addEventListener("click", () => {

    safetyBtn.innerHTML =
    `<i class="fa-solid fa-check"></i> Notification Enabled`;

    safetyBtn.style.background = "#2f6b63";

});