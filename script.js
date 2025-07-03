document.addEventListener('DOMContentLoaded', () => {

    // --- Theme Toggling Functionality ---
    const themeToggle = document.getElementById('theme-toggle');

    // Function to apply the saved theme on page load
    const applyTheme = () => {
        const savedTheme = localStorage.getItem('theme');
        
        // Check for saved theme in localStorage. If none, check OS preference.
        if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
    };

    // Add click event listener to the toggle button
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        
        // Save the user's preference to localStorage
        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.setItem('theme', 'light');
        }
    });

    // Apply the theme when the page loads
    applyTheme();


    // --- Apple-like "Fade on Scroll" Animation ---
    const revealElements = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    revealElements.forEach(el => {
        observer.observe(el);
    });

});