// PASTE THIS ENTIRE CORRECTED CODE BLOCK INTO JS/SCRIPT.JS

document.addEventListener('DOMContentLoaded', () => {

    // =========================================================================
    // === 1. YOUR LIVE CONTENT CONFIGURATION ==================================
    // =========================================================================
    const totalPanoramicImages = 2;
    const totalPortfolioImages = 13;

    // =========================================================================
    // === 2. ROBUST SCRIPT LOGIC (FIXED) ======================================
    // =========================================================================

    // --- Dynamic Hero Carousel Builder ---
    function buildCarousel() {
        const carouselContainer = document.getElementById('carousel-container');
        if (!carouselContainer || totalPanoramicImages === 0) return;

        for (let i = 1; i <= totalPanoramicImages; i++) {
            const slide = document.createElement('div');
            slide.className = 'carousel-slide';
            slide.innerHTML = `<img src="assets/panoramic/${i}.jpg" alt="Sculpture detail ${i}" loading="lazy">`;
            carouselContainer.appendChild(slide);
        }
        
        if (totalPanoramicImages > 1) {
            let currentIndex = 0;
            setInterval(() => {
                currentIndex = (currentIndex + 1) % totalPanoramicImages;
                carouselContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
            }, 5000);
        }
    }

    // --- Dynamic Portfolio Builder ---
    function buildPortfolio() {
        const portfolioGrid = document.getElementById('portfolio-grid');
        const loader = document.getElementById('loader');
        if (!portfolioGrid || !loader || totalPortfolioImages === 0) return;

        const portfolioImageNumbers = Array.from({ length: totalPortfolioImages }, (_, i) => totalPortfolioImages - i);
        let currentImageIndex = 0;
        const imagesPerLoad = 6;

        function loadMoreImages() {
            if (currentImageIndex >= portfolioImageNumbers.length) {
                loader.style.display = 'none'; return;
            }
            loader.classList.add('visible');
            setTimeout(() => {
                const fragment = document.createDocumentFragment();
                const imagesToLoad = portfolioImageNumbers.slice(currentImageIndex, currentImageIndex + imagesPerLoad);
                imagesToLoad.forEach((imageNumber, index) => {
                    const item = document.createElement('div');
                    item.className = 'portfolio-item';
                    item.innerHTML = `<img src="assets/portfolio/${imageNumber}.jpg" alt="Artwork ${imageNumber}" loading="lazy" style="animation-delay: ${index * 100}ms;">`;
                    fragment.appendChild(item);
                });
                portfolioGrid.appendChild(fragment);
                currentImageIndex += imagesPerLoad;
                loader.classList.remove('visible');
                if (currentImageIndex >= portfolioImageNumbers.length) {
                    loader.style.display = 'none';
                }
            }, 300);
        }
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) loadMoreImages();
        }, { rootMargin: "300px" });
        observer.observe(loader);
        loadMoreImages();
    }
    
    // --- Attach All Event Listeners ---
    function initializeEventListeners() {
        const darkModeToggle = document.getElementById('darkModeToggle');
        const body = document.body;
        const contactBtn = document.getElementById('contactBtn');
        const contactModal = document.getElementById('contactModal');
        
        if(!darkModeToggle || !body || !contactBtn || !contactModal) {
            console.error("A required element for event listeners was not found.");
            return;
        }

        const closeModalBtn = contactModal.querySelector('.close-button');

        // Dark Mode Logic
        if (localStorage.getItem('theme') === 'dark') {
            body.classList.add('dark-mode');
        }
        darkModeToggle.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            localStorage.setItem('theme', body.classList.contains('dark-mode') ? 'dark' : 'light');
        });

        // Contact Modal Logic
        contactBtn.addEventListener('click', () => {
            contactModal.classList.add('visible');
        });
        closeModalBtn.addEventListener('click', () => {
            contactModal.classList.remove('visible');
        });
        window.addEventListener('click', (event) => {
            if (event.target == contactModal) {
                contactModal.classList.remove('visible');
            }
        });
    }

    // --- Run Everything ---
    buildCarousel();
    buildPortfolio();
    initializeEventListeners();
});
