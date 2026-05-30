// BUTTON ANIMATION

const virtualBtn = document.querySelector(".virtual-btn");

virtualBtn.addEventListener("click", () => {

    virtualBtn.innerHTML =
    `<i class="fa-solid fa-check"></i> Notification Enabled`;

    virtualBtn.style.background = "#2f6b63";

});