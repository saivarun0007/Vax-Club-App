// BUTTON ANIMATION

const partnerBtn = document.querySelector(".partner-btn");

partnerBtn.addEventListener("click", () => {

    partnerBtn.innerHTML =
    `<i class="fa-solid fa-check"></i> Notification Enabled`;

    partnerBtn.style.background = "#2f6b63";

});