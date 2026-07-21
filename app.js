const form = document.querySelector("#wifi-form");
const email = document.querySelector("#email");
const terms = document.querySelector("#terms");
const button = document.querySelector("#connect-button");
const emailError = document.querySelector("#email-error");
const termsError = document.querySelector("#terms-error");
const status = document.querySelector("#form-status");

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

function clearMessages() {
  emailError.textContent = "";
  termsError.textContent = "";
  status.textContent = "";
  status.className = "form-status";
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  clearMessages();

  let valid = true;

  if (!isValidEmail(email.value)) {
    emailError.textContent = "Enter a valid email address.";
    valid = false;
  }

  if (!terms.checked) {
    termsError.textContent = "You must accept the Wi-Fi terms before connecting.";
    valid = false;
  }

  if (!valid) {
    status.textContent = "Please correct the highlighted items.";
    status.classList.add("error");
    return;
  }

  button.disabled = true;
  button.querySelector("span:last-child").textContent = "Connecting…";

  // Version 1 demo behavior.
  // In the next phase, this will POST securely to a Cloudflare Pages Function
  // that adds consenting guests to Mailchimp and authorizes the device in UniFi.
  await new Promise((resolve) => setTimeout(resolve, 900));

  status.textContent = "Portal form is working. UniFi authorization will be connected in the next phase.";
  status.classList.add("success");

  button.disabled = false;
  button.querySelector("span:last-child").textContent = "Connect to Free Wi-Fi";
});
