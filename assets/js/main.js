// Mobile nav toggle
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".nav__toggle");
  const links = document.querySelector(".nav__links");
  if (toggle && links) {
    toggle.addEventListener("click", () => links.classList.toggle("is-open"));
  }

  // Contact form (Web3Forms) — replace YOUR_ACCESS_KEY in the HTML form's hidden input
  const form = document.querySelector("form.contact");
  if (!form) return;
  const status = form.querySelector(".form-status");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    status.className = "form-status";
    status.textContent = "Sending…";
    status.style.display = "block";
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(form),
      });
      const data = await res.json();
      if (data.success) {
        status.className = "form-status is-success";
        status.textContent = "Thank you. Look forward to connecting soon!";
        form.reset();
      } else {
        status.className = "form-status is-error";
        status.textContent = data.message || "Something went wrong. Please email chris@pathwaycoaching.org.";
      }
    } catch {
      status.className = "form-status is-error";
      status.textContent = "Network error. Please email chris@pathwaycoaching.org.";
    }
  });
});
