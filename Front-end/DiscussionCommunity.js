document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuButton = document.querySelector('.mobile-menu');
    const navMenu = document.querySelector('nav ul');
    
    if (mobileMenuButton && navMenu) {
      mobileMenuButton.addEventListener('click', function() {
        navMenu.classList.toggle('show');
      });
    }
    
    // Navigation active state
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        navLinks.forEach(navLink => navLink.classList.remove('active'));
        this.classList.add('active');
      });
    });
    
    // Join community button
    const joinButton = document.querySelector('.join-button');
    if (joinButton) {
      joinButton.addEventListener('click', function() {
        alert('Thanks for joining our community! We\'ve sent you a confirmation email.');
        this.textContent = 'Joined';
        this.disabled = true;
        this.style.backgroundColor = '#7A67AA';
      });
    }
    
    // Create discussion button
    const createButton = document.querySelector('.create-discussion');
    if (createButton) {
      createButton.addEventListener('click', function() {
        alert('Create a new discussion topic');
      });
    }
    
    // Discussion items click
    const discussionItems = document.querySelectorAll('.discussion-item');
    discussionItems.forEach(item => {
      item.addEventListener('click', function() {
        const title = this.querySelector('.discussion-title').textContent;
        alert(`Opening discussion: ${title}`);
      });
    });
    
    // Search functionality
    const searchInput = document.querySelector('.search-bar input');
    const searchButton = document.querySelector('.search-bar button');
    
    if (searchButton && searchInput) {
      searchButton.addEventListener('click', function() {
        performSearch();
      });
      
      searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
          performSearch();
        }
      });
      
      function performSearch() {
        const searchTerm = searchInput.value.trim();
        if (searchTerm !== '') {
          alert(`Searching for: ${searchTerm}`);
        }
      }
    }
  
    // Floating bubble interaction (Footer)
    const floatingBubble = document.querySelector('.floating-learning-bubble');
    if (floatingBubble) {
      floatingBubble.addEventListener('click', function() {
        alert('Ready to start learning? Chat with our AI Tutor now!');
      });
    }
    
    // Interactive dropdowns (Navbar)
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
      dropdown.addEventListener('mouseenter', function() {
        const content = this.querySelector('.dropdown-content');
        if (content) content.style.display = 'block';
      });
      
      dropdown.addEventListener('mouseleave', function() {
        const content = this.querySelector('.dropdown-content');
        if (content) content.style.display = 'none';
      });
    });
  });
