const banner = document.getElementById("cookie-banner");
const modal = document.getElementById("cookie-modal");
const acceptButton = document.getElementById("cookie-accept");
const rejectButton = document.getElementById("cookie-reject");
const settingsButton = document.getElementById("cookie-settings");
const cancelButton = document.getElementById("cookie-cancel");
const saveButton = document.getElementById("cookie-save");
const analyticsToggle = document.getElementById("cookie-analytics");
const marketingToggle = document.getElementById("cookie-marketing");

const STORAGE_KEY = "cookie-preferences";

const defaultPreferences = {
  analytics: false,
  marketing: false,
  updatedAt: null,
};

const loadPreferences = () => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    return null;
  }
  try {
    return JSON.parse(stored);
  } catch (error) {
    return null;
  }
};

const savePreferences = (preferences) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
};

const applyPreferencesToUI = (preferences) => {
  analyticsToggle.checked = preferences.analytics;
  marketingToggle.checked = preferences.marketing;
};

const showBannerIfNeeded = () => {
  const stored = loadPreferences();
  if (!stored) {
    banner.classList.add("visible");
  }
};

const closeBanner = () => {
  banner.classList.remove("visible");
};

const openModal = () => {
  modal.classList.add("open");
  const stored = loadPreferences() || defaultPreferences;
  applyPreferencesToUI(stored);
};

const closeModal = () => {
  modal.classList.remove("open");
};

acceptButton.addEventListener("click", () => {
  const preferences = {
    analytics: true,
    marketing: true,
    updatedAt: new Date().toISOString(),
  };
  savePreferences(preferences);
  closeBanner();
});

rejectButton.addEventListener("click", () => {
  const preferences = {
    analytics: false,
    marketing: false,
    updatedAt: new Date().toISOString(),
  };
  savePreferences(preferences);
  closeBanner();
});

settingsButton.addEventListener("click", () => {
  openModal();
});

cancelButton.addEventListener("click", () => {
  closeModal();
});

saveButton.addEventListener("click", () => {
  const preferences = {
    analytics: analyticsToggle.checked,
    marketing: marketingToggle.checked,
    updatedAt: new Date().toISOString(),
  };
  savePreferences(preferences);
  closeModal();
  closeBanner();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeModal();
  }
});

showBannerIfNeeded();
