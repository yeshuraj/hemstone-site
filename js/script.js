document.addEventListener('DOMContentLoaded', () => {

    // =========================================================================
    // === 1. MANAGE YOUR PORTFOLIO IMAGES HERE ================================
    // =========================================================================
    // To add a new image:
    //   1. Add the image file to the `assets/portfolio/` folder.
    //   2. Add the filename to the TOP of this list, inside the quotes.
    // The newest images at the top will appear first on the website.

    const portfolioImages = [
        "sculpture-new-1.jpg", // Example for a new image you just added
        "sculpture-new-2.jpg",
        "artwork-tall.jpg",
        "artwork-wide.jpg",
        "sculpture-detail.png",
        "metal-work.jpg",
        "clay-figure.jpg",
        "stone-bust.jpg",
        "abstract-form.webp",
        "gallery-shot-1.jpg",
        "gallery-shot-2.jpg",
        "workshop-photo.jpg",
        "bronze-statue.jpg",
        "marble-piece.jpg",
        "wood-carving.jpg",
        "installation-view.jpg"
    ];

    // =========================================================================
    // === 2. SCRIPT LOGIC (No need to edit below this line) ===================
    // =========================================================================

    // --- Portfolio Infinite Scroll ---
    const portfolioGrid = document.getElementById('portfolio-grid');
    const loader = document.getElementById('loader');
    const imagesPerLoad = 6; // How many images to load at a time
    let currentImageIndex = 0;

    function loadMoreImages() {
        if (currentImageIndex >= portfolioImages.length) {
            loader.style.display = 'none'; // All images loaded
            return;
        }

        loader.classList.add('visible');

        // Use a short timeout to ensure the loader is visible before loading
        setTimeout(() => {
            const fragment = document.createDocumentFragment();
            const imagesToLoad = portfolioImages.slice(currentImageIndex, currentImageIndex + imagesPerLoad);

            imagesToLoad.forEach(imageName => {
                const item = document.createElement('div');
                item.className = 'portfolio-item';

                const img = document.createElement('img');
                img.src = `assets/portfolio/${imageName}`;
                img.alt = `Artwork by Hemant Joshi: ${imageName.split('.')[0]}`; // Creates alt text like "Artwork: sculpture-new-1"
                img.loading = 'lazy'; // Important for performance

                item.appendChild(img);
                fragment.appendChild(item);
            });

            portfolioGrid.appendChild(fragment);
            currentImageIndex += imagesPerLoad;
            
            // If we've loaded all images, hide the loader for good
            if (currentImageIndex >= portfolioImages.length) {
                loader.style.display = 'none';
            } else {
                 loader.classList.remove('visible');
            }

        }, 300); // 0.3 second delay
    }

    // Use Intersection Observer to detect when the loader is in view
    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            loadMoreImages();
        }
    }, { rootMargin: "200px" }); // Load images when user is 200px away from the bottom

    if (loader) {
        observer.observe(loader);
    }

    // Initial load
    loadMoreImages();

    // --- Dark Mode Toggle ---
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;

    if (localStorage.getItem('theme') === 'dark') {
        body.classList.add('dark-mode');
    }

    darkModeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        localStorage.setItem('theme', body.classList.contains('dark-mode') ? 'dark' : 'light');
    });

    // --- Contact Modal ---
    const contactBtn = document.getElementById('contactBtn');
    const contactModal = document.getElementById('contactModal');
    const closeModalBtn = contactModal.querySelector('.close-button');

    contactBtn.addEventListener('click', () => contactModal.classList.add('visible'));
    closeModalBtn.addEventListener('click', () => contactModal.classList.remove('visible'));
    window.addEventListener('click', (event) => {
        if (event.target == contactModal) {
            contactModal.classList.remove('visible');
        }
    });

    // --- Hero Carousel ---
    const carouselContainer = document.querySelector('.carousel-container');
    if (carouselContainer) {
        let currentIndex = 0;
        const slides = carouselContainer.querySelectorAll('.carousel-slide');
        const totalSlides = slides.length;
        if (totalSlides > 1) {
            setInterval(() => {
                currentIndex = (currentIndex + 1) % totalSlides;
                carouselContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
            }, 5000);
        }
    }
});