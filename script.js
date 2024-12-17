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
function updateColors() {
    const primaryColor = primaryColorInput.value;
    const secondaryColor = secondaryColorInput.value;
    
    document.documentElement.style.setProperty('--primary-color', primaryColor);
    document.documentElement.style.setProperty('--secondary-color', secondaryColor);
    
    // Update gradients
    const gradient1 = `linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor} 100%)`;
    const gradient2 = `linear-gradient(45deg, ${adjustAlpha(primaryColor, 0.1)} 0%, ${adjustAlpha(secondaryColor, 0.1)} 100%)`;
    
    document.documentElement.style.setProperty('--gradient-1', gradient1);
    document.documentElement.style.setProperty('--gradient-2', gradient2);
    
    // Save to localStorage
    localStorage.setItem('primaryColor', primaryColor);
    localStorage.setItem('secondaryColor', secondaryColor);
}

// Helper function to adjust color opacity
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
        updateColors();
    }
}

// Event listeners for color inputs
primaryColorInput.addEventListener('input', updateColors);
secondaryColorInput.addEventListener('input', updateColors);

// Load saved colors on page load
loadSavedColors();

// Add these constants at the top with your other constants
const resetColorsButton = document.getElementById('reset-colors');
const DEFAULT_PRIMARY_COLOR = '#8A2BE2';
const DEFAULT_SECONDARY_COLOR = '#9400D3';

// Add reset functionality
resetColorsButton.addEventListener('click', () => {
    // Reset to default colors
    primaryColorInput.value = DEFAULT_PRIMARY_COLOR;
    secondaryColorInput.value = DEFAULT_SECONDARY_COLOR;
    
    // Update the colors
    updateColors();
    
    // Optional: Add a small animation or feedback
    resetColorsButton.classList.add('clicked');
    setTimeout(() => resetColorsButton.classList.remove('clicked'), 200);
});
