// ==========================
// MOBILE MENU TOGGLE
// ==========================
const toggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (toggle && navLinks) {
    toggle.addEventListener("click", (e) => {
        e.stopPropagation();
        const isOpen = navLinks.classList.toggle("active");
        toggle.textContent = isOpen ? "✕" : "☰";
        toggle.setAttribute("aria-expanded", isOpen);
    });

    navLinks.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("active");
            toggle.textContent = "☰";
            toggle.setAttribute("aria-expanded", false);
        });
    });

    document.addEventListener("click", (e) => {
        const navbar = document.querySelector(".navbar");
        if (navbar && !navbar.contains(e.target)) {
            navLinks.classList.remove("active");
            toggle.textContent = "☰";
            toggle.setAttribute("aria-expanded", false);
        }
    });
}

// ==========================
// THEME TOGGLE (DARK MODE)
// ==========================
const toggleBtn = document.getElementById("themeToggle");

const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
    if (toggleBtn) toggleBtn.textContent = "☀️";
} else {
    document.body.classList.remove("dark-mode");
    if (toggleBtn) toggleBtn.textContent = "🌙";
}

if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
        if (document.body.classList.contains("dark-mode")) {
            localStorage.setItem("theme", "dark");
            toggleBtn.textContent = "☀️";
        } else {
            localStorage.setItem("theme", "light");
            toggleBtn.textContent = "🌙";
        }
    });
}

// ==========================
// FORMSPREE CONTACT FORM
// ==========================
const contactForm = document.getElementById("contactForm");
const statusMessage = document.getElementById("formStatus");

if (contactForm) {
    contactForm.addEventListener("submit", async function (e) {
        e.preventDefault();
        const formData = new FormData(contactForm);
        statusMessage.textContent = "Sending your message...";
        statusMessage.style.color = "var(--text-main)";

        fetch(contactForm.action, {
            method: "POST",
            body: formData,
            headers: { "Accept": "application/json" }
        }).then(response => {
            if (response.ok) {
                statusMessage.style.color = "green";
                statusMessage.textContent = "✨ Thanks! Your message was sent successfully.";
                contactForm.reset();
            } else {
                response.json().then(data => {
                    if (Object.hasOwn(data, "errors")) {
                        statusMessage.textContent = data["errors"].map(err => err["message"]).join(", ");
                    } else {
                        statusMessage.textContent = "Oops! There was a problem submitting your form.";
                    }
                });
                statusMessage.style.color = "red";
            }
        }).catch(() => {
            statusMessage.style.color = "red";
            statusMessage.textContent = "Oops! Could not connect to the server. Check your internet.";
        });
    });
}

