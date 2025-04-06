document.addEventListener('DOMContentLoaded', function() {
    // Get all the necessary elements
    const initialSelection = document.getElementById('initialSelection');
    const loginBtn = document.getElementById('loginBtn');
    const signupBtn = document.getElementById('signupBtn');
    const loginInitial = document.getElementById('loginInitial');
    const signupSelection = document.getElementById('signupSelection');
    const teacherSignupBtn = document.getElementById('teacherSignupBtn');
    const studentSignupBtn = document.getElementById('studentSignupBtn');
    const teacherSignupForm = document.getElementById('teacherSignupForm');
    const studentSignupForm = document.getElementById('studentSignupForm');
    const backToInitial1 = document.getElementById('backToInitial1');
    const backToInitial2 = document.getElementById('backToInitial2');
    const backToSignupBtns = document.querySelectorAll('.backToSignup');
    
    // Basic login form
    const basicLoginForm = document.getElementById('basicLoginForm');
    // Teacher and student forms
    const teacherForm = document.getElementById('teacherForm');
    const studentForm = document.getElementById('studentForm');
    // Google login button
    const googleLoginBtn = document.querySelector('.google-login');
  
    // Initial selection buttons
    loginBtn.addEventListener('click', function() {
      initialSelection.style.display = 'none';
      loginInitial.style.display = 'block';
    });
  
    signupBtn.addEventListener('click', function() {
      initialSelection.style.display = 'none';
      signupSelection.style.display = 'block';
    });
  
    // Back buttons
    backToInitial1.addEventListener('click', function() {
      loginInitial.style.display = 'none';
      initialSelection.style.display = 'block';
    });
  
    backToInitial2.addEventListener('click', function() {
      signupSelection.style.display = 'none';
      initialSelection.style.display = 'block';
    });
  
    // Teacher and student signup options
    teacherSignupBtn.addEventListener('click', function() {
      signupSelection.style.display = 'none';
      teacherSignupForm.style.display = 'block';
    });
  
    studentSignupBtn.addEventListener('click', function() {
      signupSelection.style.display = 'none';
      studentSignupForm.style.display = 'block';
    });
  
    // Back buttons from signup forms
    backToSignupBtns.forEach(function(btn) {
      btn.addEventListener('click', function() {
        teacherSignupForm.style.display = 'none';
        studentSignupForm.style.display = 'none';
        signupSelection.style.display = 'block';
      });
    });
  
    // Handle login form submission
    basicLoginForm.addEventListener('submit', function(e) {
      e.preventDefault();
      // Here you would normally validate login credentials
      // For now, just redirect to home page
      window.location.href = 'home.html'; // Change this to your home page file name
    });
  
    // Handle teacher signup form submission
    teacherForm.addEventListener('submit', function(e) {
      e.preventDefault();
      // Here you would normally process the signup
      // For now, just redirect to home page
      window.location.href = 'home.html'; // Change this to your home page file name
    });
  
    // Handle student signup form submission
    studentForm.addEventListener('submit', function(e) {
      e.preventDefault();
      // Here you would normally process the signup
      // For now, just redirect to home page
      window.location.href = 'home.html'; // Change this to your home page file name
    });
  
    // Google login button
    googleLoginBtn.addEventListener('click', function() {
      // Here you would normally handle Google OAuth
      // For now, just redirect to home page
      window.location.href = 'home.html'; // Change this to your home page file name
    });
  });
