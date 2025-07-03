document.addEventListener('DOMContentLoaded', () => {

    const totalPanoramicImages = 2;
    const totalPortfolioImages = 13;

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

    // --- FINAL, ROBUST PORTFOLIO BUILDER ---
    function buildPortfolio() {
        const grid = document.getElementById('portfolio-grid');
        const loader = document.getElementById('loader');
        if (!grid || !loader || totalPortfolioImages === 0) return;

        // Initialize Masonry on the grid element
        const msnry = new Masonry(grid, {
            itemSelector: '.portfolio-item',
            columnWidth: '.portfolio-item',
            percentPosition: true,
            gutter: 20,
            transitionDuration: '0.4s'
        });

        const portfolioImageNumbers = Array.from({ length: totalPortfolioImages }, (_, i) => totalPortfolioImages - i);
        let currentImageIndex = 0;
        const imagesPerLoad = 6;

        function loadMoreImages() {
            if (currentImageIndex >= portfolioImageNumbers.length) {
                loader.style.display = 'none'; return;
            }
            loader.classList.add('visible');
            
            const fragment = document.createDocumentFragment();
            const itemsToLoad = portfolioImageNumbers.slice(currentImageIndex, currentImageIndex + imagesPerLoad);
            const itemElements = [];

            // Create new elements but don't append to grid yet
            itemsToLoad.forEach((imageNumber) => {
                const item = document.createElement('div');
                item.className = 'portfolio-item';
                item.innerHTML = `<img src="assets/portfolio/${imageNumber}.jpg" alt="Artwork ${imageNumber}">`;
                fragment.appendChild(item);
                itemElements.push(item);
            });
            
            // Append the fragment to the grid
            grid.appendChild(fragment);
            
            // Tell Masonry about the new items
            msnry.appended(itemElements);
            
            // Use imagesLoaded to wait for the new images to load, then re-layout
            imagesLoaded(grid).on('always', () => {
                loader.classList.remove('visible');
                msnry.layout(); // This is the key command to prevent gaps
            });

            currentImageIndex += imagesPerLoad;
            if (currentImageIndex >= portfolioImageNumbers.length) {
                loader.style.display = 'none';
            }
        }
        
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) loadMoreImages();
        }, { rootMargin: "300px" });
        
        observer.observe(loader);
        loadMoreImages();
    }
    
    function initializeEventListeners() {
        const darkModeToggle = document.getElementById('darkModeToggle');
        const body = document.body;
        const contactBtn = document.getElementById('contactBtn');
        const contactModal = document.getElementById('contactModal');
        if(!darkModeToggle || !body || !contactBtn || !contactModal) return;
        const closeModalBtn = contactModal.querySelector('.close-button');
        if (localStorage.getItem('theme') === 'dark') body.classList.add('dark-mode');
        darkModeToggle.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            localStorage.setItem('theme', body.classList.contains('dark-mode') ? 'dark' : 'light');
        });
        contactBtn.addEventListener('click', () => contactModal.classList.add('visible'));
        closeModalBtn.addEventListener('click', () => contactModal.classList.remove('visible'));
        window.addEventListener('click', (event) => {
            if (event.target == contactModal) contactModal.classList.remove('visible');
});
    }

    buildCarousel();
    buildPortfolio();
    initializeEventListeners();
});