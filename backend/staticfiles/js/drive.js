// BUTTON ANIMATION

const driveBtn = document.querySelector(".drive-btn");

driveBtn.addEventListener("click", () => {

    driveBtn.innerHTML =
    `<i class="fa-solid fa-check"></i> Notification Enabled`;

    driveBtn.style.background = "#2f6b63";

});