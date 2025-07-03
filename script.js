document.addEventListener('DOMContentLoaded', function() {

    // --- YOUR EXISTING SMOOTH SCROLL SCRIPT (MODIFIED) ---
    // This now selects all anchor links that start with '#' EXCEPT for the one with the id 'contact-btn'.
    document.querySelectorAll('a[href^="#"]:not(#contact-btn)').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetElement = document.querySelector(this.getAttribute('href'));
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- NEW POP-UP MODAL SCRIPT ---
    const modal = document.getElementById('contact-modal');
    const contactBtn = document.getElementById('contact-btn');
    const closeBtn = document.querySelector('.close-btn');

    // Check if all modal elements exist before adding listeners
    if (modal && contactBtn && closeBtn) {
        // Function to open the modal
        function openModal() {
            modal.style.display = 'flex';
        }

        // Function to close the modal
        function closeModal() {
            modal.style.display = 'none';
        }

        // When the user clicks the "Contact" button, open the modal
        contactBtn.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent the link from trying to navigate
            openModal();
        });

        // When the user clicks on the <span> (x), close the modal
        closeBtn.addEventListener('click', closeModal);

        // When the user clicks anywhere outside of the modal content, close it
        window.addEventListener('click', function(event) {
            if (event.target == modal) {
                closeModal();
            }
        });

        // Optional: Close the modal if the user presses the "Escape" key
        window.addEventListener('keydown', function(event) {
            if (event.key === 'Escape') {
                closeModal();
            }
        });
    }

});
