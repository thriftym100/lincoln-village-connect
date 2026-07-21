const form = document.querySelector("#wifi-form");
const email = document.querySelector("#email");
const terms = document.querySelector("#terms");
const button = document.querySelector("#connect-button");
const buttonLabel = button.querySelector(".button-label");
const emailError = document.querySelector("#email-error");
const termsError = document.querySelector("#terms-error");
const status = document.querySelector("#form-status");
const modal = document.querySelector("#success-modal");
const closeModal = document.querySelector("#close-modal");

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

function clearMessages() {
  emailError.textContent = "";
  termsError.textContent = "";
  status.textContent = "";
  status.className = "form-status";
}

function showModal() {
  modal.hidden = false;
  closeModal.focus();
}

function hideModal() {
  modal.hidden = true;
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
  buttonLabel.textContent = "Connecting…";

  // Demonstration only.
  // The next phase will POST to a secure Cloudflare Pages Function
  // and then authorize the guest through UniFi.
  await new Promise((resolve) => setTimeout(resolve, 900));

  status.textContent = "Form validated successfully.";
  status.classList.add("success");
  button.disabled = false;
  buttonLabel.textContent = "Connect to Free Wi-Fi";
  showModal();
});

closeModal.addEventListener("click", hideModal);

modal.addEventListener("click", (event) => {
  if (event.target === modal) {
    hideModal();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !modal.hidden) {
    hideModal();
  }
});
