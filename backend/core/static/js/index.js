/* =========================================
MOBILE MENU
========================================= */
function toggleMenu() {
  document.getElementById("mobileMenu")?.classList.toggle("active");
}

/* =========================================
AUTH UI (SINGLE SOURCE OF TRUTH)
========================================= */
function updateAuthUI() {

  const user = JSON.parse(localStorage.getItem("loggedInUser"));

  const desktopAuth = document.getElementById("desktopAuth");
  const floatingAuth = document.getElementById("floatingAuth");

  /* =========================================
DOCTOR SECTION TOGGLE
========================================= */

function updateDoctorSections() {

  const user = JSON.parse(
    localStorage.getItem("loggedInUser")
  );

  const guestSection =
    document.getElementById("guestDoctorsSection");

  const loggedSection =
    document.getElementById("loggedDoctorsSection");

  if (!guestSection || !loggedSection) return;

  if (user) {

    guestSection.style.display = "none";
    loggedSection.style.display = "block";

  } else {

    guestSection.style.display = "block";
    loggedSection.style.display = "none";

  }
}

  /* ========== DESKTOP NAV ========== */
  if (desktopAuth) {
    desktopAuth.innerHTML = user
      ? `
        <button class="logout-btn" onclick="logoutUser()">
          <i class="fa-solid fa-right-from-bracket"></i> Logout
        </button>
      `
      : `
        <a href="{% url 'login' %}" class="login-btn">
          <i class="fa-solid fa-right-to-bracket"></i> Login
        </a>

        <a href="{% url 'signup' %}" class="signup-btn">
          <i class="fa-solid fa-user-plus"></i> Sign Up
        </a>
      `;
  }

  /* ========== MOBILE FLOATING ========== */
   if (floatingAuth) {
    floatingAuth.innerHTML = user
      ? `
        <a href="#" class="fab logout" onclick="logoutUser()">
          <i class="fa-solid fa-right-from-bracket"></i>
        </a>
      `
      : `
       <a href="{% url 'login' %}" class="fab login">
          <i class="fa-solid fa-right-to-bracket"></i>
        </a>

        <a href="{% url 'signup' %}" class="fab signup">
          <i class="fa-solid fa-user-plus"></i>
        </a>
      `;
  }

  /* UPDATE DOCTOR SECTIONS */
  updateDoctorSections();
}

/* =========================================
DOCTOR SECTION TOGGLE
========================================= */

function updateDoctorSections() {

  const user =
    JSON.parse(localStorage.getItem("loggedInUser"));

  const guestSection =
    document.getElementById("guestDoctorsSection");

  const loggedSection =
    document.getElementById("loggedDoctorsSection");

  if (!guestSection || !loggedSection) return;

  if (user) {

    guestSection.style.display = "none";

    loggedSection.style.display = "block";

    renderDoctorsUser();

  }

  else {

    guestSection.style.display = "block";

    loggedSection.style.display = "none";

  }

}

/* =========================================
LOGIN
========================================= */
function login(event) {

  event.preventDefault();

  const email = document.getElementById("email")?.value.trim().toLowerCase();
  const password = document.getElementById("password")?.value.trim();

  let users = JSON.parse(localStorage.getItem("vaxUsers")) || [];

  const validUser = users.find(u =>
    u.email === email && u.password === password
  );

  if (!validUser) {
    alert("Invalid credentials");
    return;
  }

  localStorage.setItem("loggedInUser", JSON.stringify(validUser));

  alert("Login successful!");

  updateAuthUI(); // 🔥 instant update
  window.location.href = "index.html";
}

/* =========================================
LOGOUT
========================================= */
function logoutUser() {

  localStorage.removeItem("loggedInUser");

  alert("Logged out successfully");

  updateAuthUI(); // 🔥 instant update
}

/* =========================================
INIT
========================================= */
window.addEventListener("load", updateAuthUI);

window.addEventListener("load", updateDoctorSections);

/* =========================================
CHATBOT (SAFE VERSION)
========================================= */

const chatbotBtn = document.querySelector(".chatbot");
const chatbotBox = document.getElementById("chatbotBox");
const sendBtn = document.getElementById("sendBtn");
const chatInput = document.getElementById("chatInput");
const chatMessages = document.getElementById("chatMessages");

/* Toggle chatbot safely */
chatbotBtn?.addEventListener("click", (e) => {
  e.preventDefault();
  chatbotBox.style.display =
    chatbotBox.style.display === "flex" ? "none" : "flex";
});

/* Send message */
sendBtn?.addEventListener("click", sendMessage);

chatInput?.addEventListener("keypress", function (e) {
  if (e.key === "Enter") sendMessage();
});

function sendMessage() {

  const userText = chatInput.value.trim();
  if (!userText) return;

  addMessage("You", userText);
  chatInput.value = "";

  let reply = "I’m here to help!";

  if (userText.toLowerCase().includes("vaccine")) {
    reply = "Vaccines help your body fight diseases safely.";
  } else if (userText.toLowerCase().includes("price")) {
    reply = "Prices vary by clinic. Use Find Clinics.";
  } else if (userText.toLowerCase().includes("appointment")) {
    reply = "You can book appointments from homepage.";
  }

  setTimeout(() => addMessage("VaxBot", reply), 500);
}

function addMessage(sender, text) {

  const msg = document.createElement("div");
  msg.style.marginBottom = "8px";
  msg.innerHTML = `<strong>${sender}:</strong> ${text}`;

  chatMessages.appendChild(msg);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}


/* =========================================
LOAD HOME DRIVES
========================================= */

function loadHomeDrives(){

  const container =
    document.querySelector(".upcoming-container");

  if(!container) return;

  const drives =
    JSON.parse(localStorage.getItem("vaxDrives"))
    || [];

  /* EMPTY */

  if(drives.length === 0){

    container.innerHTML = `

      <div class="upcoming-header">

        <div class="upcoming-header-left">

          <small>THIS WEEKEND & BEYOND</small>

          <h2>Upcoming Drives</h2>

        </div>

      </div>

      <p class="upcoming-footer-text">
        Drives will appear here once added by our admin team.
      </p>

    `;

    return;
  }

  container.innerHTML = `

    <div class="upcoming-header">

      <div class="upcoming-header-left">

        <small>THIS WEEKEND & BEYOND</small>

        <h2>Upcoming Drives</h2>

      </div>

    </div>

  `;

  drives.slice().reverse().forEach(drive => {

    container.innerHTML += `

      <div class="home-drive-card">

        <h3>${drive.name}</h3>

        <p>${drive.location}</p>

        <div class="home-drive-meta">

          <span>📅 ${drive.date}</span>

          <span>⏰ ${drive.time}</span>

        </div>

        <!-- PRACTITIONERS -->
        <div class="home-drive-section">

          <h4>Practitioners</h4>

          <div class="home-pill-wrap">

            ${drive.practitioners.map(p => `
              <span class="home-pill">
                ${p}
              </span>
            `).join("")}

          </div>

        </div>

        <!-- VACCINES -->
        <div class="home-drive-section">

          <h4>Vaccines Offered</h4>

          <div class="home-pill-wrap">

            ${drive.vaccines.map(v => `
              <span class="home-pill vaccine">
                ${v}
              </span>
            `).join("")}

          </div>

        </div>

      </div>

    `;

  });

}

window.addEventListener(
  "load",
  loadHomeDrives
);

/* =========================================
LOAD DOCTORS
========================================= */

function renderDoctorsUser(){

  const container =
    document.getElementById("doctorContainer");

  if(!container) return;

  const doctors =
    JSON.parse(localStorage.getItem("vaxDoctors"))
    || [];

  if(!doctors.length){

    container.innerHTML =
    "<p>No doctors available</p>";

    return;
  }

  container.innerHTML = "";

  doctors.slice().reverse().forEach(doc => {

    container.innerHTML += `

      <div class="doctor-card">

          <div class="image-wrapper">

              <img
                src="${
                  doc.image ||
                  'https://via.placeholder.com/300'
                }"
                alt="${doc.name}"
              >

          </div>

          <div class="card-body">

              <span class="role-tag">
                ${doc.role}
              </span>

              <h3>${doc.name}</h3>

              <p class="qualifications">
                ${doc.qualification}
              </p>

              <p class="specialty">
                ${doc.bio || ""}
              </p>

              <div class="exp-badge">
                ${doc.experience}+ yrs experience
              </div>

          </div>

      </div>

    `;

  });

}



function toggleMenu() {

    document
    .getElementById("mobileMenu")
    .classList
    .toggle("active");

}