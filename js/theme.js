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

  if (useDarkMode === true) {
    root.style.setProperty('--background1', 'var(--backgrounddark1)');
    root.style.setProperty('--background2', 'var(--backgrounddark2)');
    root.style.setProperty('--background3', 'var(--backgrounddark3)');
    root.style.setProperty('--background4', 'var(--backgrounddark4)');
    root.style.setProperty('--text1', 'var(--textdark1)');
    root.style.setProperty('--text2', 'var(--textdark2)');
    root.style.setProperty('--imagefilter', 'var(--imagefilterdark)');
    root.style.setProperty('--hometopgradient', 'var(--hometopgradientdark)');
    root.style.setProperty('--spinnercolor1', 'var(--spinnercolordark1)');
  } else {
    root.style.setProperty('--background1', 'var(--backgroundlight1)');
    root.style.setProperty('--background2', 'var(--backgroundlight2)');
    root.style.setProperty('--background3', 'var(--backgroundlight3)');
    root.style.setProperty('--background4', 'var(--backgroundlight4)');
    root.style.setProperty('--text1', 'var(--textlight1)');
    root.style.setProperty('--text2', 'var(--textlight2)');
    root.style.setProperty('--imagefilter', 'var(--imagefilterlight)');
    root.style.setProperty('--hometopgradient', 'var(--hometopgradientlight)');
    root.style.setProperty('--spinnercolor1', 'var(--spinnercolorlight1)');
  }
  
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
} else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
  updateTheme(true, false);
}

themeToggleElements.forEach(element => element.addEventListener('click', () => updateTheme()));
updateThemeToggleElements();