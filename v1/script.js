
// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    // Initialize language switcher
    if (typeof initLanguageSwitcher !== 'undefined') {
        initLanguageSwitcher();
    }
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
            
            navToggle.setAttribute('aria-expanded', !isExpanded);
            navMenu.classList.toggle('active');
            
            // Toggle hamburger animation
            navToggle.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
                navToggle.classList.remove('active');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!navToggle.contains(event.target) && !navMenu.contains(event.target)) {
                navMenu.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
                navToggle.classList.remove('active');
            }
        });
    }
    
    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Form validation and submission
    const consultationForm = document.querySelector('.consultation-form');
    if (consultationForm) {
        consultationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic form validation
            const requiredFields = consultationForm.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.style.borderColor = '#e53e3e';
                    
                    // Add error message if not exists
                    if (!field.parentNode.querySelector('.error-message')) {
                        const errorMessage = document.createElement('span');
                        errorMessage.className = 'error-message';
                        errorMessage.style.color = '#e53e3e';
                        errorMessage.style.fontSize = '0.875rem';
                        errorMessage.textContent = 'This field is required';
                        errorMessage.setAttribute('role', 'alert');
                        field.parentNode.appendChild(errorMessage);
                    }
                } else {
                    field.style.borderColor = '#e2e8f0';
                    
                    // Remove error message if exists
                    const errorMessage = field.parentNode.querySelector('.error-message');
                    if (errorMessage) {
                        errorMessage.remove();
                    }
                }
            });
            
            // Email validation
            const emailField = consultationForm.querySelector('#email');
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            if (emailField && emailField.value && !emailRegex.test(emailField.value)) {
                isValid = false;
                emailField.style.borderColor = '#e53e3e';
                
                if (!emailField.parentNode.querySelector('.error-message')) {
                    const errorMessage = document.createElement('span');
                    errorMessage.className = 'error-message';
                    errorMessage.style.color = '#e53e3e';
                    errorMessage.style.fontSize = '0.875rem';
                    errorMessage.textContent = 'Please enter a valid email address';
                    errorMessage.setAttribute('role', 'alert');
                    emailField.parentNode.appendChild(errorMessage);
                }
            }
            
            if (isValid) {
                // Simulate form submission
                const submitButton = consultationForm.querySelector('button[type="submit"]');
                const originalText = submitButton.textContent;
                
                submitButton.textContent = 'Sending...';
                submitButton.disabled = true;
                
                // Simulate API call
                setTimeout(() => {
                    submitButton.textContent = 'Thank You! We\'ll Contact You Soon';
                    submitButton.style.backgroundColor = '#48bb78';
                    
                    // Show success message
                    const successMessage = document.createElement('div');
                    successMessage.className = 'success-message';
                    successMessage.style.cssText = `
                        background: #f0fff4;
                        border: 1px solid #48bb78;
                        color: #22543d;
                        padding: 1rem;
                        border-radius: 6px;
                        margin-top: 1rem;
                        text-align: center;
                    `;
                    successMessage.textContent = 'Thank you for your interest! We\'ll contact you within 24 hours to schedule your free consultation.';
                    successMessage.setAttribute('role', 'alert');
                    successMessage.setAttribute('aria-live', 'polite');
                    
                    consultationForm.appendChild(successMessage);
                    
                    // Reset form after 3 seconds
                    setTimeout(() => {
                        consultationForm.reset();
                        submitButton.textContent = originalText;
                        submitButton.disabled = false;
                        submitButton.style.backgroundColor = '#2b6cb0';
                        successMessage.remove();
                    }, 5000);
                }, 2000);
            }
        });
        
        // Real-time validation feedback
        const inputs = consultationForm.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                if (this.hasAttribute('required') && !this.value.trim()) {
                    this.style.borderColor = '#e53e3e';
                } else if (this.type === 'email' && this.value) {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(this.value)) {
                        this.style.borderColor = '#e53e3e';
                    } else {
                        this.style.borderColor = '#48bb78';
                    }
                } else if (this.value.trim()) {
                    this.style.borderColor = '#48bb78';
                }
            });
            
            input.addEventListener('focus', function() {
                // Remove error message on focus
                const errorMessage = this.parentNode.querySelector('.error-message');
                if (errorMessage) {
                    errorMessage.remove();
                }
            });
        });
    }
    
    // Add loading animation for service cards
    const serviceCards = document.querySelectorAll('.service-card');
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    serviceCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
});

// Keyboard navigation enhancements
document.addEventListener('keydown', function(e) {
    // Close mobile menu with Escape key
    if (e.key === 'Escape') {
        const navMenu = document.querySelector('.nav-menu');
        const navToggle = document.querySelector('.nav-toggle');
        
        if (navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
            navToggle.classList.remove('active');
            navToggle.focus();
        }
    }
});

// Add focus management for better accessibility
function trapFocus(element) {
    const focusableElements = element.querySelectorAll(
        'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
    );
    
    const firstFocusableElement = focusableElements[0];
    const lastFocusableElement = focusableElements[focusableElements.length - 1];
    
    element.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                if (document.activeElement === firstFocusableElement) {
                    lastFocusableElement.focus();
                    e.preventDefault();
                }
            } else {
                if (document.activeElement === lastFocusableElement) {
                    firstFocusableElement.focus();
                    e.preventDefault();
                }
            }
        }
    });
}

// Initialize focus trapping for modal-like elements
document.addEventListener('DOMContentLoaded', function() {
    const consultationForm = document.querySelector('.consultation-form');
    if (consultationForm) {
        trapFocus(consultationForm);
    }
});
