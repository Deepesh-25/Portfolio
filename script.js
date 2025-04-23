// Mobile menu functions
function hamburg() {
    const navbar = document.querySelector(".dropdown");
    if (!navbar) return;
    navbar.classList.add("active");
    document.querySelector(".hamburg").style.display = "none"; // Hide hamburger
    document.querySelector(".cancel").style.display = "block"; // Show cancel
}

function cancel() {
    const navbar = document.querySelector(".dropdown");
    if (!navbar) return;
    navbar.classList.remove("active");
    document.querySelector(".hamburg").style.display = "block"; // Show hamburger
    document.querySelector(".cancel").style.display = "none"; // Hide cancel
}
// Typewriter effect
const texts = [
    "Developer",
    "Front-End Developer",
    "Web Developer",
];

const speed = 100;
const deletionSpeed = speed / 2;
const nextTextDelay = 1000;
const textElement = document.querySelector(".typing-text");
const cursorElement = document.querySelector(".cursor");

if (!cursorElement) {
    console.warn("Cursor element not found in the DOM.");
}

if (textElement) {
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function typewriter() {
        if (!textElement || !cursorElement) {
            return;
        }
        
        const currentText = texts[textIndex];
        
        if (!isDeleting) {
            // Typing forward
            textElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            
            if (charIndex === currentText.length) {
                isDeleting = true;
                setTimeout(typewriter, nextTextDelay);
            } else {
                setTimeout(typewriter, speed);
            }
        } else {
            // Deleting backward
            textElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            
            if (charIndex === 0) {
                isDeleting = false;
                // Move to next text, wrap around if needed
                textIndex = (textIndex + 1) % texts.length;
                setTimeout(typewriter, speed);
            } else {
                setTimeout(typewriter, deletionSpeed);
            }
        }
    }
    
    // Start the typewriter effect
    typewriter();
}
// Contact Form Functionality
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('.contact-form form');
    
    if (contactForm) {
        // Form submission handler
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate form
            if (validateForm()) {
                // Simulate form submission (replace with actual AJAX call)
                simulateFormSubmission();
            }
        });
        
        // Add input event listeners for real-time validation
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('input', function() {
                validateField(this);
            });
            
            input.addEventListener('blur', function() {
                validateField(this);
            });
        });
    }
    
    // Form validation function
    function validateForm() {
        let isValid = true;
        const inputs = document.querySelectorAll('.contact-form input, .contact-form textarea');
        
        inputs.forEach(input => {
            if (!validateField(input)) {
                isValid = false;
            }
        });
        
        return isValid;
    }
    
    // Field validation function
    function validateField(field) {
        const value = field.value.trim();
        const fieldName = field.getAttribute('name');
        const errorElement = document.getElementById(`${fieldName}-error`) || createErrorElement(field);
        
        // Remove previous error message
        if (errorElement) {
            errorElement.remove();
        }
        
        // Validation rules
        if (field.required && !value) {
            showError(field, 'This field is required');
            return false;
        }
        
        if (field.type === 'email' && value && !isValidEmail(value)) {
            showError(field, 'Please enter a valid email address');
            return false;
        }
        
        // If all validations pass
        field.style.borderBottomColor = '#6c089b';
        return true;
    }
    
    // Show error message
    function showError(field, message) {
        field.style.borderBottomColor = '#ff3860';
        
        const errorElement = document.createElement('div');
        errorElement.id = `${field.getAttribute('name')}-error`;
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        errorElement.style.color = '#ff3860';
        errorElement.style.fontSize = '0.8rem';
        errorElement.style.marginTop = '5px';
        
        field.parentNode.appendChild(errorElement);
    }
    
    // Create error element if it doesn't exist
    function createErrorElement(field) {
        const errorElement = document.createElement('div');
        errorElement.id = `${field.getAttribute('name')}-error`;
        errorElement.className = 'error-message';
        return errorElement;
    }
    
    // Email validation helper
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    // Simulate form submission (replace with actual AJAX call)
    function simulateFormSubmission() {
        const submitBtn = document.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
        
        // Show loading state
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        // Simulate API call delay
        setTimeout(() => {
            // Show success message
            showFormMessage('Message sent successfully!', 'success');
            
            // Reset form
            contactForm.reset();
            
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 1500);
    }
    
    // Show form submission message
    function showFormMessage(message, type) {
        // Remove existing messages
        const existingMessage = document.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        const messageElement = document.createElement('div');
        messageElement.className = `form-message ${type}`;
        messageElement.textContent = message;
        
        // Style the message
        messageElement.style.padding = '15px';
        messageElement.style.marginTop = '20px';
        messageElement.style.borderRadius = '5px';
        messageElement.style.textAlign = 'center';
        messageElement.style.fontWeight = '500';
        
        if (type === 'success') {
            messageElement.style.backgroundColor = 'rgba(40, 167, 69, 0.2)';
            messageElement.style.color = '#28a745';
            messageElement.style.border = '1px solid #28a745';
        } else {
            messageElement.style.backgroundColor = 'rgba(220, 53, 69, 0.2)';
            messageElement.style.color = '#dc3545';
            messageElement.style.border = '1px solid #dc3545';
        }
        
        contactForm.appendChild(messageElement);
        
        // Remove message after 5 seconds
        setTimeout(() => {
            messageElement.remove();
        }, 5000);
    }
});

// For the mobile menu toggle (if not already in your script.js)
function hamburg() {
    document.querySelector('.dropdown').classList.add('active');
}

function cancel() {
    document.querySelector('.dropdown').classList.remove('active');
}

function submitForm() {
    const formData = new FormData(contactForm);
    
    fetch('your-api-endpoint', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        showFormMessage('Message sent successfully!', 'success');
        contactForm.reset();
    })
    .catch(error => {
        showFormMessage('Failed to send message. Please try again.', 'error');
    })
    .finally(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    });
}