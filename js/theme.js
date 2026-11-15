const root = document.querySelector(":root");
const themeStorageKey = 'theme';
const themeToggleElements = document.querySelectorAll(".themeToggle");
const legacyThemeValues = ['dark', 'light'];
let darkModeActive = false;

function updateThemeToggleElements() {
  themeToggleElements.forEach(element => element.innerText = darkModeActive ? 'light mode ☀️' : 'dark mode 🤤');
}

function updateTheme(useDarkMode=!darkModeActive, save=true) {  
  darkModeActive = useDarkMode;

  metaColorSchemeElement.content = darkModeActive ? 'dark' : 'light';
  
  updateThemeToggleElements();

  if (save === true) localStorage.setItem(themeStorageKey, darkModeActive);
}

const savedTheme = localStorage.getItem(themeStorageKey);
if (savedTheme !== null && savedTheme.trim() !== '') {
  if (legacyThemeValues.some(v => v === savedTheme)) {
    updateTheme(savedTheme === 'dark', false);
  } else {
    updateTheme(savedTheme === 'true', false);
  }
}/* else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
  updateTheme(true, false);
}*/

themeToggleElements.forEach(element => element.addEventListener('click', () => updateTheme()));
updateThemeToggleElements();