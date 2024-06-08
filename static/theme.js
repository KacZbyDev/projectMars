// theme.js

// Funkcja ustawiająca temat
function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
}

// Funkcja sprawdzająca, czy jest zapisany temat w LocalStorage
function loadTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
    }
}

// Załaduj temat przy starcie strony
document.addEventListener('DOMContentLoaded', loadTheme);

// Funkcja obsługująca zmianę motywu z dropdowna
document.addEventListener('DOMContentLoaded', () => {
    const themeControllers = document.querySelectorAll('.theme-controller');
    themeControllers.forEach(controller => {
        controller.addEventListener('change', (event) => {
            setTheme(event.target.value);
        });
    });
});