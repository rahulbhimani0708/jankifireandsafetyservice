// JANKI FIRE & SAFETY SERVICE - Main JavaScript File

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeAnimations();
    initializeInteractiveComponents();
    initializeForms();
    initializeMaps();
});

// Navigation functionality
function initializeNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = navMenu ? navMenu.querySelectorAll('a') : [];

    // Mobile menu toggle
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
        });
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Animation initialization
function initializeAnimations() {
    // Typewriter effect for hero text
    if (typeof Typed !== 'undefined' && document.querySelector('.hero-typewriter')) {
        new Typed('.hero-typewriter', {
            strings: [
                'Protecting Lives & Property',
                'Fire Safety Excellence',
                '24/7 Emergency Response',
                'Certified Fire Protection'
            ],
            typeSpeed: 50,
            backSpeed: 30,
            backDelay: 2000,
            loop: true,
            showCursor: true,
            cursorChar: '|'
        });
    }

    // Scroll animations
    if (typeof anime !== 'undefined') {
        // Animate elements on scroll
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    
                    anime({
                        targets: element,
                        opacity: [0, 1],
                        translateY: [30, 0],
                        duration: 800,
                        easing: 'easeOutQuart',
                        delay: anime.stagger(100)
                    });
                    
                    observer.unobserve(element);
                }
            });
        }, observerOptions);

        // Observe elements for animation
        document.querySelectorAll('.animate-on-scroll').forEach(el => {
            el.style.opacity = '0';
            observer.observe(el);
        });

        // Counter animations
        document.querySelectorAll('.counter').forEach(counter => {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        animateCounter(counter);
                        observer.unobserve(counter);
                    }
                });
            });
            observer.observe(counter);
        });
    }
}

// Counter animation function
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
    const start = performance.now();

    function updateCounter(currentTime) {
        const elapsed = currentTime - start;
        const progress = Math.min(elapsed / duration, 1);
        const current = Math.floor(progress * target);
        
        element.textContent = current;
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        }
    }
    
    requestAnimationFrame(updateCounter);
}

// Interactive components
function initializeInteractiveComponents() {
    // Product filtering
    initializeProductFiltering();
    
    // Fire safety assessment quiz
    initializeFireAssessmentQuiz();
    
    // Service request form
    initializeServiceRequestForm();
    
    // Image carousels
    initializeImageCarousels();
}

// Product filtering functionality
function initializeProductFiltering() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');
    const searchInput = document.querySelector('.product-search');

    // Category filtering
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter products
            productCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    card.style.display = 'block';
                    anime({
                        targets: card,
                        opacity: [0, 1],
                        scale: [0.8, 1],
                        duration: 400,
                        easing: 'easeOutQuart'
                    });
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Search functionality
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            
            productCards.forEach(card => {
                const productName = card.querySelector('.product-name').textContent.toLowerCase();
                const productDesc = card.querySelector('.product-description').textContent.toLowerCase();
                
                if (productName.includes(searchTerm) || productDesc.includes(searchTerm)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }
}

// Fire safety assessment quiz
function initializeFireAssessmentQuiz() {
    const quizContainer = document.querySelector('.fire-assessment-quiz');
    if (!quizContainer) return;

    const questions = [
        {
            question: "What type of building do you need fire safety for?",
            options: ["Commercial Office", "Industrial Facility", "Residential Building", "Retail Store", "Restaurant", "Warehouse"]
        },
        {
            question: "What is the approximate size of your facility?",
            options: ["Under 5,000 sq ft", "5,000-15,000 sq ft", "15,000-50,000 sq ft", "Over 50,000 sq ft"]
        },
        {
            question: "How many employees/occupants are typically in the building?",
            options: ["1-10 people", "11-50 people", "51-200 people", "201-500 people", "Over 500 people"]
        },
        {
            question: "What type of fire safety equipment do you currently have?",
            options: ["None", "Basic extinguishers only", "Extinguishers and alarms", "Full system installed", "Unsure"]
        },
        {
            question: "What are your primary fire safety concerns?",
            options: ["Electrical equipment", "Cooking/kitchen areas", "Flammable materials", "Server rooms/IT equipment", "General safety compliance"]
        },
        {
            question: "When was your last fire safety inspection?",
            options: ["Within the last year", "1-3 years ago", "Over 3 years ago", "Never", "Unsure"]
        },
        {
            question: "Do you need emergency response planning?",
            options: ["Yes, comprehensive plan needed", "Yes, basic evacuation plan", "Update existing plan", "No current need"]
        },
        {
            question: "What is your timeline for implementation?",
            options: ["Immediate (emergency)", "Within 1 month", "1-3 months", "3-6 months", "Planning phase"]
        }
    ];

    let currentQuestion = 0;
    let answers = {};

    function renderQuestion() {
        const question = questions[currentQuestion];
        const progress = ((currentQuestion + 1) / questions.length) * 100;
        
        quizContainer.innerHTML = `
            <div class="quiz-progress">
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${progress}%"></div>
                </div>
                <span class="progress-text">Question ${currentQuestion + 1} of ${questions.length}</span>
            </div>
            
            <div class="quiz-question">
                <h3>${question.question}</h3>
                <div class="quiz-options">
                    ${question.options.map((option, index) => `
                        <button class="quiz-option" data-value="${option}">
                            ${option}
                        </button>
                    `).join('')}
                </div>
            </div>
            
            <div class="quiz-navigation">
                ${currentQuestion > 0 ? '<button class="quiz-btn prev-btn">Previous</button>' : ''}
                <button class="quiz-btn next-btn" disabled>Next</button>
            </div>
        `;

        // Add event listeners
        const options = quizContainer.querySelectorAll('.quiz-option');
        const nextBtn = quizContainer.querySelector('.next-btn');
        const prevBtn = quizContainer.querySelector('.prev-btn');

        options.forEach(option => {
            option.addEventListener('click', function() {
                options.forEach(opt => opt.classList.remove('selected'));
                this.classList.add('selected');
                answers[currentQuestion] = this.getAttribute('data-value');
                nextBtn.disabled = false;
            });
        });

        if (nextBtn) {
            nextBtn.addEventListener('click', function() {
                if (currentQuestion < questions.length - 1) {
                    currentQuestion++;
                    renderQuestion();
                } else {
                    showQuizResults();
                }
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', function() {
                if (currentQuestion > 0) {
                    currentQuestion--;
                    renderQuestion();
                }
            });
        }
    }

    function showQuizResults() {
        const recommendations = generateRecommendations(answers);
        
        quizContainer.innerHTML = `
            <div class="quiz-results">
                <h3>Your Personalized Fire Safety Recommendations</h3>
                <div class="recommendations">
                    ${recommendations.map(rec => `
                        <div class="recommendation-item">
                            <h4>${rec.title}</h4>
                            <p>${rec.description}</p>
                            <div class="recommendation-products">
                                ${rec.products.map(product => `
                                    <span class="product-tag">${product}</span>
                                `).join('')}
                            </div>
                        </div>
                    `).join('')}
                </div>
                
                <div class="contact-form">
                    <h4>Get Your Free Consultation</h4>
                    <form class="quiz-contact-form">
                        <input type="text" placeholder="Your Name" required>
                        <input type="email" placeholder="Email Address" required>
                        <input type="tel" placeholder="Phone Number" required>
                        <input type="text" placeholder="Company Name">
                        <textarea placeholder="Additional Information (Optional)"></textarea>
                        <button type="submit">Request Free Consultation</button>
                    </form>
                </div>
            </div>
        `;

        // Add form submission handler
        const contactForm = quizContainer.querySelector('.quiz-contact-form');
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleQuizSubmission(this, answers, recommendations);
        });
    }

    function generateRecommendations(answers) {
        const recommendations = [];
        
        // Basic recommendations based on answers
        if (answers[0] === 'Commercial Office') {
            recommendations.push({
                title: 'Commercial Fire Safety Package',
                description: 'Comprehensive fire safety solution for office environments including ABC fire extinguishers, smoke detection systems, and emergency lighting.',
                products: ['ABC Fire Extinguishers', 'Smoke Detectors', 'Emergency Lighting', 'Fire Alarm Panel']
            });
        }
        
        if (answers[3] === 'None' || answers[3] === 'Unsure') {
            recommendations.push({
                title: 'Fire Safety Assessment & Installation',
                description: 'Complete fire safety evaluation and equipment installation to meet local fire codes and regulations.',
                products: ['Fire Extinguishers', 'Fire Alarm System', 'Emergency Exits', 'Safety Signage']
            });
        }
        
        if (answers[4] === 'Server rooms/IT equipment') {
            recommendations.push({
                title: 'Clean Agent Fire Suppression',
                description: 'Specialized fire suppression system for protecting sensitive electronic equipment without water damage.',
                products: ['FM-200 System', 'CO2 Extinguishers', 'Early Warning Detection']
            });
        }
        
        if (answers[5] === 'Over 3 years ago' || answers[5] === 'Never') {
            recommendations.push({
                title: 'Fire Safety Inspection & Maintenance',
                description: 'Comprehensive inspection of existing systems and ongoing maintenance program to ensure compliance.',
                products: ['Annual Inspection', 'Maintenance Contract', 'Compliance Audit']
            });
        }

        return recommendations;
    }

    // Start the quiz
    renderQuestion();
}

// Service request form
function initializeServiceRequestForm() {
    const form = document.querySelector('.service-request-form');
    if (!form) return;

    const steps = form.querySelectorAll('.form-step');
    const nextBtns = form.querySelectorAll('.next-step');
    const prevBtns = form.querySelectorAll('.prev-step');
    let currentStep = 0;

    function showStep(stepIndex) {
        steps.forEach((step, index) => {
            step.classList.toggle('active', index === stepIndex);
        });

        // Update progress bar
        const progress = ((stepIndex + 1) / steps.length) * 100;
        const progressBar = form.querySelector('.form-progress-fill');
        if (progressBar) {
            progressBar.style.width = progress + '%';
        }
    }

    nextBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            if (validateStep(currentStep)) {
                currentStep++;
                if (currentStep < steps.length) {
                    showStep(currentStep);
                }
            }
        });
    });

    prevBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            currentStep--;
            if (currentStep >= 0) {
                showStep(currentStep);
            }
        });
    });

    function validateStep(stepIndex) {
        const currentStepElement = steps[stepIndex];
        const requiredFields = currentStepElement.querySelectorAll('[required]');
        let isValid = true;

        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                field.classList.add('error');
                isValid = false;
            } else {
                field.classList.remove('error');
            }
        });

        return isValid;
    }

    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        handleServiceRequestSubmission(this);
    });

    // Initialize first step
    showStep(0);
}

// Image carousels
function initializeImageCarousels() {
    if (typeof Splide !== 'undefined') {
        const carousels = document.querySelectorAll('.splide');
        carousels.forEach(carousel => {
            new Splide(carousel, {
                type: 'loop',
                perPage: 3,
                perMove: 1,
                gap: '1rem',
                autoplay: true,
                interval: 3000,
                breakpoints: {
                    768: {
                        perPage: 1
                    },
                    1024: {
                        perPage: 2
                    }
                }
            }).mount();
        });
    }
}

// Form handling
function initializeForms() {
    // General form submissions
    document.querySelectorAll('form').forEach(form => {
        if (!form.classList.contains('service-request-form') && 
            !form.classList.contains('quiz-contact-form')) {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                handleGeneralFormSubmission(this);
            });
        }
    });
}

// Map initialization
function initializeMaps() {
    const mapContainer = document.querySelector('#service-area-map');
    if (!mapContainer || typeof L === 'undefined') return;

    const map = L.map('service-area-map').setView([28.6139, 77.2090], 10);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Service area markers
    const serviceAreas = [
        { name: 'Gujarat', lat: 22.309425, lng: 72.136230, responseTime: '15-30 minutes' },
        { name: 'Noida', lat: 28.5355, lng: 77.3910, responseTime: '20-35 minutes' },
        { name: 'Gurgaon', lat: 28.4595, lng: 77.0266, responseTime: '25-40 minutes' },
        { name: 'Faridabad', lat: 28.4089, lng: 77.3178, responseTime: '30-45 minutes' },
        { name: 'Ghaziabad', lat: 28.6692, lng: 77.4538, responseTime: '25-40 minutes' }
    ];

    serviceAreas.forEach(area => {
        const marker = L.marker([area.lat, area.lng]).addTo(map);
        marker.bindPopup(`
            <div class="map-popup">
                <h4>${area.name}</h4>
                <p>Response Time: ${area.responseTime}</p>
                <p>24/7 Emergency Service Available</p>
                <button onclick="contactServiceArea('${area.name}')">Contact Us</button>
            </div>
        `);
    });
}

// Form submission handlers
function handleQuizSubmission(form, answers, recommendations) {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    // Show success message
    showNotification('Thank you! We will contact you within 24 hours with your personalized fire safety plan.', 'success');
    
    // Reset form
    form.reset();
}

function handleServiceRequestSubmission(form) {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    // Show success message
    showNotification('Service request submitted successfully! We will contact you within 2 hours.', 'success');
    
    // Reset form
    form.reset();
    
    // Reset to first step
    const steps = form.querySelectorAll('.form-step');
    steps.forEach((step, index) => {
        step.classList.toggle('active', index === 0);
    });
}

function handleGeneralFormSubmission(form) {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    // Show success message
    showNotification('Thank you for your message! We will get back to you soon.', 'success');
    
    // Reset form
    form.reset();
}

// Utility functions
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animate in
    anime({
        targets: notification,
        translateY: [-100, 0],
        opacity: [0, 1],
        duration: 400,
        easing: 'easeOutQuart'
    });
    
    // Remove after 5 seconds
    setTimeout(() => {
        anime({
            targets: notification,
            translateY: [0, -100],
            opacity: [1, 0],
            duration: 400,
            easing: 'easeInQuart',
            complete: () => {
                notification.remove();
            }
        });
    }, 5000);
}

function contactServiceArea(areaName) {
    showNotification(`Contacting service area: ${areaName}. Redirecting to contact form...`, 'info');
    setTimeout(() => {
        window.location.href = 'contact.html';
    }, 2000);
}

// Emergency contact functionality
function initializeEmergencyContact() {
    const emergencyBtn = document.querySelector('.emergency-contact-btn');
    if (emergencyBtn) {
        emergencyBtn.addEventListener('click', function() {
            if (confirm('This will call our 24/7 emergency hotline. Continue?')) {
                window.location.href = 'tel:+918140852040';
            }
        });
    }
}

// Initialize emergency contact on all pages
initializeEmergencyContact();