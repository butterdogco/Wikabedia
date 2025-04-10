var currentTheme = "light";
var root = document.querySelector(":root");

function theme(mode) {
  const b = document.body.style;
  
  if (!mode && currentTheme == "light") {
    mode = "dark";
  } else if (!mode && currentTheme == "dark") {
    mode = "light";
  }

  if (mode === "dark") {
    currentTheme = "dark";
    root.style.setProperty('--background1', 'var(--backgrounddark1)');
    root.style.setProperty('--background2', 'var(--backgrounddark2)');
    root.style.setProperty('--background3', 'var(--backgrounddark3)');
    root.style.setProperty('--background4', 'var(--backgrounddark4)');
    root.style.setProperty('--text1', 'var(--textdark1)');
    root.style.setProperty('--text3', 'var(--textdark3)');
    root.style.setProperty('--imagefilter', 'var(--imagefilterdark)');
    root.style.setProperty('--hometopgradient', 'var(--hometopgradientdark)');
    root.style.setProperty('--spinnercolor1', 'var(--spinnercolordark1)');
    
    if (document.getElementById("themeToggle")) {
      const element = document.getElementById("themeToggle");
      element.innerText = element.innerText.replaceAll("dark", "light");
    }
  } else if (mode === "light") {
    currentTheme = "light";
    root.style.setProperty('--background1', 'var(--backgroundlight1)');
    root.style.setProperty('--background2', 'var(--backgroundlight2)');
    root.style.setProperty('--background3', 'var(--backgroundlight3)');
    root.style.setProperty('--background4', 'var(--backgroundlight4)');
    root.style.setProperty('--text1', 'var(--textlight1)');
    root.style.setProperty('--text3', 'var(--textlight3)');
    root.style.setProperty('--imagefilter', 'var(--imagefilterlight)');
    root.style.setProperty('--hometopgradient', 'var(--hometopgradientlight)');
    root.style.setProperty('--spinnercolor1', 'var(--spinnercolorlight1)');
    
    if (document.getElementById("themeToggle")) {
      const element = document.getElementById("themeToggle");
      element.innerText = element.innerText.replaceAll("light", "dark");
    }
  }
  
  localStorage.setItem("theme", currentTheme);
}

if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
  // theme("dark");
}

if (localStorage.getItem("theme")) {
  theme(localStorage.getItem("theme"));
}