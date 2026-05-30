// BUTTON ANIMATION

const vaccineBtn = document.querySelector(".vaccine-btn");

vaccineBtn.addEventListener("click", () => {

    vaccineBtn.innerHTML =
    `<i class="fa-solid fa-check"></i> Notification Enabled`;

    vaccineBtn.style.background = "#2f6b63";

});