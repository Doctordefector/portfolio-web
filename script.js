// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Add this after your existing smooth scrolling code
document.querySelector('.cta-button').addEventListener('click', () => {
    document.getElementById('projects').scrollIntoView({
        behavior: 'smooth'
    });
});

// Reveal animations on scroll
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Select all sections to animate
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'all 0.5s ease-out';
    observer.observe(section);
});

// Theme toggle functionality
const themeToggle = document.getElementById('theme-toggle');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

// Check for saved theme preference or use system preference
const currentTheme = localStorage.getItem('theme') || 
    (prefersDarkScheme.matches ? 'dark' : 'light');

// Set initial theme
document.documentElement.setAttribute('data-theme', currentTheme);

// Toggle theme
themeToggle.addEventListener('click', () => {
    let theme = document.documentElement.getAttribute('data-theme');
    let newTheme = theme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
});

// Listen for system theme changes
prefersDarkScheme.addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
        const newTheme = e.matches ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', newTheme);
    }
});

// Color picker functionality
const colorToggle = document.getElementById('color-toggle');
const colorPanel = document.querySelector('.color-picker-panel');
const primaryColorInput = document.getElementById('primary-color');
const secondaryColorInput = document.getElementById('secondary-color');

// Toggle color picker panel
colorToggle.addEventListener('click', () => {
    colorPanel.classList.toggle('active');
});

// Close panel when clicking outside
document.addEventListener('click', (e) => {
    if (!colorPanel.contains(e.target) && !colorToggle.contains(e.target)) {
        colorPanel.classList.remove('active');
    }
});

// Update colors and save to localStorage
function updateColors(primary, secondary) {
    // Set the main colors
    document.documentElement.style.setProperty('--primary-color', primary);
    document.documentElement.style.setProperty('--secondary-color', secondary);
    
    // Update gradients
    const gradient1 = `linear-gradient(135deg, ${primary} 0%, ${secondary} 100%)`;
    const gradient2 = `linear-gradient(45deg, ${adjustAlpha(primary, 0.1)} 0%, ${adjustAlpha(secondary, 0.1)} 100%)`;
    
    // Add this line to update the hero background gradient
    const bgGradient = `linear-gradient(135deg, ${adjustAlpha(primary, 0.8)} 0%, ${adjustAlpha(secondary, 0.8)} 100%)`;
    
    document.documentElement.style.setProperty('--gradient-1', gradient1);
    document.documentElement.style.setProperty('--gradient-2', gradient2);
    document.documentElement.style.setProperty('--bg-gradient', bgGradient);
    
    // Save to localStorage
    localStorage.setItem('primaryColor', primary);
    localStorage.setItem('secondaryColor', secondary);
}

// Update the adjustAlpha function to return rgba
function adjustAlpha(color, alpha) {
    const r = parseInt(color.substr(1,2), 16);
    const g = parseInt(color.substr(3,2), 16);
    const b = parseInt(color.substr(5,2), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

// Load saved colors
function loadSavedColors() {
    const savedPrimary = localStorage.getItem('primaryColor');
    const savedSecondary = localStorage.getItem('secondaryColor');
    
    if (savedPrimary) {
        primaryColorInput.value = savedPrimary;
        document.documentElement.style.setProperty('--primary-color', savedPrimary);
    }
    
    if (savedSecondary) {
        secondaryColorInput.value = savedSecondary;
        document.documentElement.style.setProperty('--secondary-color', savedSecondary);
    }
    
    if (savedPrimary && savedSecondary) {
        updateColors(savedPrimary, savedSecondary);
    }
}

// Event listeners for color inputs
primaryColorInput.addEventListener('input', (e) => {
    updateColors(e.target.value, document.getElementById('secondary-color').value);
});

secondaryColorInput.addEventListener('input', (e) => {
    updateColors(document.getElementById('primary-color').value, e.target.value);
});

// Load saved colors on page load
loadSavedColors();

// Add these constants at the top with your other constants
const resetColorsButton = document.getElementById('reset-colors');
const DEFAULT_PRIMARY_COLOR = '#950B3B';
const DEFAULT_SECONDARY_COLOR = '#4B50F1';

// Add reset functionality
resetColorsButton.addEventListener('click', () => {
    // Reset to default colors
    primaryColorInput.value = DEFAULT_PRIMARY_COLOR;
    secondaryColorInput.value = DEFAULT_SECONDARY_COLOR;
    
    // Update the colors
    updateColors(DEFAULT_PRIMARY_COLOR, DEFAULT_SECONDARY_COLOR);
    
    // Optional: Add a small animation or feedback
    resetColorsButton.classList.add('clicked');
    setTimeout(() => resetColorsButton.classList.remove('clicked'), 200);
});
