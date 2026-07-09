 // Lightbox functionality
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.querySelector('.lightbox');
    const lightboxImg = document.querySelector('.lightbox-content img');
    const closeBtn = document.querySelector('.lightbox-close');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    let currentIndex = 0;

    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            currentIndex = index;
            updateLightboxImage();
            lightbox.style.display = 'block';
        });
    });

    function updateLightboxImage() {
        const imgSrc = galleryItems[currentIndex].querySelector('img').src;
        lightboxImg.src = imgSrc;
    }

    closeBtn.addEventListener('click', () => {
        lightbox.style.display = 'none';
    });

    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
        updateLightboxImage();
    });

    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % galleryItems.length;
        updateLightboxImage();
    });

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.style.display = 'none';
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (lightbox.style.display === 'block') {
            if (e.key === 'ArrowLeft') prevBtn.click();
            if (e.key === 'ArrowRight') nextBtn.click();
            if (e.key === 'Escape') closeBtn.click();
        }
    });
    let currentStep = 1;

        function updateProgress() {
            const progressBar = document.querySelector('.progress-bar');
            progressBar.style.width = `${(currentStep-1)/2*100}%`;
        }

        function validateStep(step) {
            let isValid = true;
            const currentFormStep = document.querySelector(`[data-step="${step}"]`);

            // Validate required fields
            currentFormStep.querySelectorAll('input, select, textarea').forEach(input => {
                if (input.required && !input.value.trim()) {
                    isValid = false;
                    input.parentElement.querySelector('.error-message').style.display = 'block';
                    input.classList.add('error');
                } else {
                    input.parentElement.querySelector('.error-message').style.display = 'none';
                    input.classList.remove('error');
                }
            });

            return isValid;
        }

        function nextStep(step) {
            if (!validateStep(currentStep)) return;
            
            document.querySelector(`[data-step="${currentStep}"]`).classList.remove('active');
            currentStep = step;
            document.querySelector(`[data-step="${currentStep}"]`).classList.add('active');
            updateProgress();
        }

        function prevStep() {
            document.querySelector(`[data-step="${currentStep}"]`).classList.remove('active');
            currentStep--;
            document.querySelector(`[data-step="${currentStep}"]`).classList.add('active');
            updateProgress();
        }

        document.getElementById('feedbackForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simulate submission
            document.querySelectorAll('.form-step').forEach(step => step.style.display = 'none');
            document.querySelector('.success-message').classList.add('active');
            this.reset();
            currentStep = 1;
            updateProgress();
        });
     AOS.init({
            duration: 1000,
            once: true,
            offset: 100,
            easing: 'ease-in-out'
        });