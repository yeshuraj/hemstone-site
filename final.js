// PASTE THIS FINAL CODE INTO JS/SCRIPT.JS WHEN READY

document.addEventListener('DOMContentLoaded', () => {

    // =========================================================================
    // === 1. MANAGE YOUR CONTENT HERE =========================================
    // =========================================================================
    // Update these numbers to match the total count of images in your folders.
    // The image files MUST be named `1.jpg`, `2.jpg`, etc.

    const totalPanoramicImages = 3;  // e.g., You have 3 images in assets/panoramic/
    const totalPortfolioImages = 16; // e.g., You have 16 images in assets/portfolio/

    // =========================================================================
    // === 2. SCRIPT LOGIC (No need to edit below this line) ===================
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

    // --- Dynamic "Infinite Scroll" Portfolio ---
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

    // --- Initialize everything ---
    buildCarousel();
    buildPortfolio();

    // --- Dark Mode & Modal Logic ---
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;
    if (localStorage.getItem('theme') === 'dark') body.classList.add('dark-mode');
    darkModeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        localStorage.setItem('theme', body.classList.contains('dark-mode') ? 'dark' : 'light');
    });
    const contactBtn = document.getElementById('contactBtn');
    const contactModal = document.getElementById('contactModal');
    const closeModalBtn = contactModal.querySelector('.close-button');
    contactBtn.addEventListener('click', () => contactModal.classList.add('visible'));
    closeModalBtn.addEventListener('click', () => contactModal.classList.remove('visible'));
    window.addEventListener('click', (event) => {
        if (event.target == contactModal) contactModal.classList.remove('visible');
    });
});