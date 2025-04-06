// Dynamic text animation
const dynamicText = document.querySelector(".dynamic-text");
const phrases = [
    "We help you understand, not just memorize.",
    "Available 24/7 for all your learning needs.",
    "Personalized learning for every student.",
    "Making education accessible to everyone."
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeEffect() {
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
        dynamicText.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
    } else {
        dynamicText.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
    }
    
    if (!isDeleting && charIndex === currentPhrase.length) {
        isDeleting = true;
        typingSpeed = 1500; // Pause at end
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typingSpeed = 500; // Pause before typing next phrase
    }
    
    setTimeout(typeEffect, typingSpeed);
}

// Start the typing effect
setTimeout(typeEffect, 1000);

// Floating bubble interaction
const floatingBubble = document.querySelector('.floating-learning-bubble');
if (floatingBubble) {
    floatingBubble.addEventListener('click', function() {
        alert('Ready to start learning? Chat with our AI Tutor now!');
    });
}

// Interactive dropdowns
const dropdowns = document.querySelectorAll('.dropdown');
dropdowns.forEach(dropdown => {
    dropdown.addEventListener('mouseenter', function() {
        this.querySelector('.dropdown-content').style.display = 'block';
    });
    
    dropdown.addEventListener('mouseleave', function() {
        this.querySelector('.dropdown-content').style.display = 'none';
    });
});
