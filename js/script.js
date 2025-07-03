document.addEventListener('DOMContentLoaded', () => {

    // =========================================================================
    // === DEMO VERSION - USING PLACEHOLDER IMAGES =============================
    // =========================================================================
    // This script uses placeholder URLs to show you the layout.
    // The final version of this file (provided in the instructions) will
    // build the gallery from your actual files.

    const panoramicImageUrls = [
        "https://images.unsplash.com/photo-1599818498305-1a8ab4580879?w=1920&q=80",
        "https://images.unsplash.com/photo-1618281377501-88c2328cbb9a?w=1920&q=80",
        "https://images.unsplash.com/photo-1598647998216-24329a43a7a4?w=1920&q=80"
    ];

    // Different image dimensions to demonstrate the floating grid
    const portfolioImageUrls = [
        "https://images.unsplash.com/photo-1617886903279-c889fdf2a8a1?w=500&h=750&fit=crop&q=80", // Tall
        "https://images.unsplash.com/photo-1518991277626-608f16104746?w=800&h=500&fit=crop&q=80", // Wide
        "https://images.unsplash.com/photo-1580136579312-35a0273935a8?w=500&h=800&fit=crop&q=80", // Tall
        "https://images.unsplash.com/photo-1620248743389-a2a404a39591?w=500&h=500&fit=crop&q=80", // Square
        "https://images.unsplash.com/photo-1605371385478-3a47568582d6?w=500&q=80",
        "https://images.unsplash.com/photo-1569949381669-ecf31ae8e613?w=500&h=600&fit=crop&q=80",
        "https://images.unsplash.com/photo-1598647998216-24329a43a7a4?w=500&q=80",
        "https://images.unsplash.com/photo-1618281377501-88c2328cbb9a?w=800&h=600&fit=crop&q=80", // Wide
        "https://images.unsplash.com/photo-1599691456286-9a1b02b6628b?w=500&h=700&fit=crop&q=80", // Tall
        "https://images.unsplash.com/photo-1558963244-a345b1453b61?w=500&q=80",
    ].reverse(); // .reverse() to simulate newest appearing first

    // =========================================================================
    // === SCRIPT LOGIC (No need to edit below this line) ======================
    // =========================================================================

    // --- Dynamic Hero Carousel Builder ---
    const carouselContainer = document.getElementById('carousel-container');
    if (carouselContainer) {
        panoramicImageUrls.forEach((url, index) => {
            const slide = document.createElement('div');
            slide.className = 'carousel-slide';
            slide.innerHTML = `<img src="${url}" alt="Sculpture detail ${index + 1}" loading="lazy">`;
            carouselContainer.appendChild(slide);
        });
        
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

    // --- Dynamic "Infinite Scroll" Portfolio ---
    const portfolioGrid = document.getElementById('portfolio-grid');
    const loader = document.getElementById('loader');
    const imagesPerLoad = 6;
    let currentImageIndex = 0;

    function loadMoreImages() {
        if (currentImageIndex >= portfolioImageUrls.length) {
            loader.style.display = 'none'; return;
        }
        loader.classList.add('visible');
        setTimeout(() => {
            const fragment = document.createDocumentFragment();
            const imagesToLoad = portfolioImageUrls.slice(currentImageIndex, currentImageIndex + imagesPerLoad);
            imagesToLoad.forEach((url, index) => {
                const item = document.createElement('div');
                item.className = 'portfolio-item';
                item.innerHTML = `<img src="${url}" alt="Artwork" loading="lazy" style="animation-delay: ${index * 100}ms;">`;
                fragment.appendChild(item);
            });
            portfolioGrid.appendChild(fragment);
            currentImageIndex += imagesPerLoad;
            if (currentImageIndex >= portfolioImageUrls.length) {
                loader.style.display = 'none';
            } else {
                loader.classList.remove('visible');
            }
        }, 300);
    }
    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) loadMoreImages();
    }, { rootMargin: "300px" });
    if (loader) observer.observe(loader);
    if (portfolioGrid) loadMoreImages();

    // --- Dark Mode & Modal Logic (Unchanged) ---
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