const pageThemeRadioButtons = document.querySelectorAll('input[name="theme"]');
let darkMode = document.querySelector("#dark");
let lightMode = document.querySelector("#light");

pageThemeRadioButtons.forEach((radio) => {
  radio.addEventListener("change", (event) => {
    const selectedTheme = event.target.id; // Grabs "dark" or "light"

    document.documentElement.setAttribute("data-theme", selectedTheme);
    localStorage.setItem("data-theme", selectedTheme);
  });
});

const savedTheme = localStorage.getItem("data-theme");

// The added else block should check the condition and only set darkMode to checked if the condition matches the current window state else it flips light mode to check which the css already use which radio button is checked to determine the position of the button and the colour of the background
if (savedTheme) {
  savedTheme === "light"
    ? (lightMode.checked = true)
    : (darkMode.checked = true);
  document.documentElement.setAttribute("data-theme", savedTheme);
} else {
  window.matchMedia("(prefers-color-scheme: dark)").matches
    ? (darkMode.checked = true)
    : (lightMode.checked = true);
}
console.log(window.matchMedia("(prefers-color-scheme: dark)").matches);
