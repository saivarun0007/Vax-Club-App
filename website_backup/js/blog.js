/* =========================================
MOBILE MENU
========================================= */
function toggleMenu() {
  document.getElementById("mobileMenu")?.classList.toggle("active");
}

/* =========================================
AUTH UI
========================================= */
function updateAuthUI() {

  const user = JSON.parse(localStorage.getItem("loggedInUser"));

  const desktopAuth = document.getElementById("desktopAuth");
  const floatingAuth = document.getElementById("floatingAuth");

  if (desktopAuth) {

    desktopAuth.innerHTML = user
      ? `
        <button class="logout-btn" onclick="logoutUser()">
          <i class="fa-solid fa-right-from-bracket"></i> Logout
        </button>
      `
      : `
        <a href="login.html" class="login-btn">
          <i class="fa-solid fa-right-to-bracket"></i> Login
        </a>

        <a href="signup.html" class="signup-btn">
          <i class="fa-solid fa-user-plus"></i> Sign Up
        </a>
      `;
  }

  if (floatingAuth) {

    floatingAuth.innerHTML = user
      ? `
        <a href="#" class="fab logout" onclick="logoutUser()">
          <i class="fa-solid fa-right-from-bracket"></i>
        </a>
      `
      : `
        <a href="login.html" class="fab login">
          <i class="fa-solid fa-right-to-bracket"></i>
        </a>

        <a href="signup.html" class="fab signup">
          <i class="fa-solid fa-user-plus"></i>
        </a>
      `;
  }
}

/* =========================================
BLOG ACCESS CONTROL
========================================= */

function updateBlogView() {

  const user = JSON.parse(localStorage.getItem("loggedInUser"));

  const guestView = document.getElementById("guestView");
  const blogsContainer = document.getElementById("blogsContainer");
  const blogGrid = document.getElementById("blogGrid");

  if (user) {

    guestView.style.display = "none";
    blogsContainer.style.display = "block";

    let blogs = JSON.parse(localStorage.getItem("blogPosts")) || [];

    console.log("Blogs Loaded:", blogs);

    if (blogs.length === 0) {

      blogGrid.innerHTML = `
        <div class="empty-state-card">
          <p class="empty-text">No blogs published yet.</p>
        </div>
      `;

      return;
    }

    let html = "";

    [...blogs].reverse().forEach(blog => {

      html += `
      <div class="blog-card">

        <img
        src="https://images.unsplash.com/photo-1584515933487-779824d29309?q=80&w=1200&auto=format&fit=crop"
        class="blog-image">

        <div class="blog-content">

          <div class="blog-category">
            VaxClub
          </div>

          <h3>${blog.title}</h3>

          <p>${blog.content}</p>

          <a href="#" class="read-more">
            Read Article →
          </a>

        </div>

      </div>
      `;
    });

    blogGrid.innerHTML = html;

  } else {

    guestView.style.display = "flex";
    blogsContainer.style.display = "none";
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

  updateAuthUI();

  window.location.href = "blog.html";
}

/* =========================================
LOGOUT
========================================= */

function logoutUser() {

  localStorage.removeItem("loggedInUser");

  alert("Logged out successfully");

  updateAuthUI();
  updateBlogView();
}

/* =========================================
INIT
========================================= */

window.addEventListener("load", () => {

  updateAuthUI();
  updateBlogView();

});

/* =========================================
CHATBOT
========================================= */

const chatbotBtn = document.querySelector(".chatbot");
const chatbotBox = document.getElementById("chatbotBox");
const sendBtn = document.getElementById("sendBtn");
const chatInput = document.getElementById("chatInput");
const chatMessages = document.getElementById("chatMessages");

chatbotBtn?.addEventListener("click", (e) => {

  e.preventDefault();

  chatbotBox.style.display =
    chatbotBox.style.display === "flex"
      ? "none"
      : "flex";
});

sendBtn?.addEventListener("click", sendMessage);

chatInput?.addEventListener("keypress", function (e) {

  if (e.key === "Enter") {
    sendMessage();
  }

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

    reply = "Prices vary by clinic.";

  } else if (userText.toLowerCase().includes("appointment")) {

    reply = "You can book appointments from homepage.";
  }

  setTimeout(() => {

    addMessage("VaxBot", reply);

  }, 500);
}

function addMessage(sender, text) {

  const msg = document.createElement("div");

  msg.style.marginBottom = "8px";

  msg.innerHTML = `<strong>${sender}:</strong> ${text}`;

  chatMessages.appendChild(msg);

  chatMessages.scrollTop =
    chatMessages.scrollHeight;
}
