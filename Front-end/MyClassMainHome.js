// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Navigation functionality
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove active class from all items
            navItems.forEach(nav => nav.classList.remove('active'));
            
            // Add active class to clicked item
            this.classList.add('active');
            
            // Scroll to the target section
            const targetId = this.getAttribute('data-target');
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 30,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Create Performance Chart
    const ctx = document.getElementById('performanceChart').getContext('2d');
    const performanceChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['January', 'February', 'March', 'April', 'May', 'June'],
            datasets: [{
                label: 'Overall Average',
                data: [72, 75, 78, 80, 82, 84],
                borderColor: '#8e44ad',
                backgroundColor: 'rgba(142, 68, 173, 0.1)',
                fill: true,
                tension: 0.4,
                pointBackgroundColor: '#8e44ad',
                pointRadius: 5,
                pointHoverRadius: 7
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Performance Trend (6 Months)',
                    font: {
                        size: 16,
                        family: "'Poppins', sans-serif"
                    }
                },
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    titleColor: '#333',
                    bodyColor: '#666',
                    bodyFont: {
                        family: "'Poppins', sans-serif"
                    },
                    borderColor: '#8e44ad',
                    borderWidth: 1,
                    displayColors: false,
                    callbacks: {
                        label: function(context) {
                            return `Grade: ${context.raw}%`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    min: 60,
                    max: 100,
                    ticks: {
                        font: {
                            family: "'Poppins', sans-serif"
                        }
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    }
                },
                x: {
                    ticks: {
                        font: {
                            family: "'Poppins', sans-serif"
                        }
                    },
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
    
    // Generate Attendance Calendar
    generateAttendanceCalendar();
});

// Function to generate the attendance calendar
function generateAttendanceCalendar() {
    const attendanceContainer = document.getElementById('attendanceCalendar');
    const months = ['January', 'February', 'March', 'April'];
    const dayNames = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    
    // Sample attendance data (simplified for demonstration)
    const attendanceData = {
        'January': {
            startDay: 6, // Saturday
            totalDays: 31,
            present: [2, 3, 4, 5, 6, 9, 10, 11, 12, 13, 16, 17, 18, 19, 20, 23, 24, 25, 26, 27, 30, 31],
            absent: [10],
            partial: [17, 24],
            holiday: [1]
        },
        'February': {
            startDay: 2, // Tuesday
            totalDays: 28,
            present: [1, 2, 3, 6, 7, 8, 9, 10, 13, 14, 15, 16, 17, 20, 21, 22, 23, 24, 27, 28],
            absent: [7, 21],
            partial: [14],
            holiday: []
        },
        'March': {
            startDay: 2, // Tuesday
            totalDays: 31,
            present: [1, 2, 3, 6, 7, 8, 9, 10, 13, 14, 15, 16, 17, 20, 21, 22, 23, 24, 27, 28, 29, 30, 31],
            absent: [],
            partial: [13, 27],
            holiday: []
        },
        'April': {
            startDay: 5, // Friday
            totalDays: 30,
            present: [3, 4, 5, 6, 7, 10, 11, 12, 13, 14, 17, 18, 19, 20, 21, 24, 25, 26, 27, 28],
            absent: [],
            partial: [],
            holiday: [1]
        }
    };

    months.forEach(month => {
        // Create month container
        const monthContainer = document.createElement('div');
        monthContainer.className = 'month-container';
        
        // Add month header
        const monthHeader = document.createElement('div');
        monthHeader.className = 'month-header';
        monthHeader.textContent = month;
        monthContainer.appendChild(monthHeader);
        
        // Create days container
        const daysContainer = document.createElement('div');
        daysContainer.className = 'month-days';
        
        // Add day names (S M T W T F S)
        dayNames.forEach(day => {
            const dayNameEl = document.createElement('div');
            dayNameEl.className = 'day-name';
            dayNameEl.textContent = day;
            daysContainer.appendChild(dayNameEl);
        });
        
        // Add empty cells for days before the month starts
        for (let i = 0; i < attendanceData[month].startDay; i++) {
            const emptyDay = document.createElement('div');
            emptyDay.className = 'day empty';
            daysContainer.appendChild(emptyDay);
        }
        
        // Add days of the month
        for (let day = 1; day <= attendanceData[month].totalDays; day++) {
            const dayEl = document.createElement('div');
            dayEl.className = 'day';
            dayEl.textContent = day;
            
            // Apply attendance status styles
            if (attendanceData[month].present.includes(day)) {
                dayEl.classList.add('present');
            } else if (attendanceData[month].absent.includes(day)) {
                dayEl.classList.add('absent');
            } else if (attendanceData[month].partial.includes(day)) {
                dayEl.classList.add('partial');
            } else if (attendanceData[month].holiday.includes(day)) {
                dayEl.classList.add('holiday');
            }
            
            // Mark Sundays
            const dayOfWeek = (attendanceData[month].startDay + day - 1) % 7;
            if (dayOfWeek === 0) {
                dayEl.classList.add('sunday');
            }
            
            daysContainer.appendChild(dayEl);
        }
        
        monthContainer.appendChild(daysContainer);
        attendanceContainer.appendChild(monthContainer);
    });
}

// Subject data with teachers
const subjects = [
    {
        id: 1,
        name: "Computer Science",
        teacher: "Dr. Sarah Johnson",
        icon: "fas fa-laptop-code",
        progress: 75,
        completed: 18,
        total: 24,
        color: "#5b6ad0"
    },
    {
        id: 2,
        name: "Mathematics",
        teacher: "Prof. David Wilson",
        icon: "fas fa-square-root-alt",
        progress: 60,
        completed: 18,
        total: 30,
        color: "#00acc1"
    },
    {
        id: 3,
        name: "Physics",
        teacher: "Dr. Robert Chen",
        icon: "fas fa-atom",
        progress: 45,
        completed: 10,
        total: 22,
        color: "#f9a825"
    },
    {
        id: 4,
        name: "Biology",
        teacher: "Dr. Emily Nguyen",
        icon: "fas fa-dna",
        progress: 30,
        completed: 6,
        total: 20,
        color: "#43a047"
    },
    {
        id: 5,
        name: "Chemistry",
        teacher: "Prof. Michael Patel",
        icon: "fas fa-flask",
        progress: 20,
        completed: 4,
        total: 18,
        color: "#e53935"
    },
    {
        id: 6,
        name: "History",
        teacher: "Dr. Elizabeth Taylor",
        icon: "fas fa-landmark",
        progress: 50,
        completed: 8,
        total: 15,
        color: "#8e24aa"
    }
];

// DOM Elements 
const subjectsGrid = document.getElementById('subjectsGrid');
const doubtModal = document.getElementById('doubtModal');
const modalSubject = document.getElementById('modalSubject');
const teacherName = document.getElementById('teacherName');
const closeModalBtn = document.querySelector('.close-modal');
const cancelBtn = document.querySelector('.cancel-btn');
const submitBtn = document.querySelector('.submit-btn');

// Render subject cards
function renderSubjects() {
    subjectsGrid.innerHTML = '';
    
    subjects.forEach(subject => {
        const subjectCard = document.createElement('div');
        subjectCard.className = 'subject-card';
        
        subjectCard.innerHTML = `
            <div class="subject-header">
                <div class="subject-icon">
                    <i class="${subject.icon}"></i>
                </div>
                <div class="subject-title">
                    <h3>${subject.name}</h3>
                    <div class="subject-teacher">
                        <i class="fas fa-user-tie"></i> ${subject.teacher}
                    </div>
                </div>
            </div>
            <div class="subject-progress">
                <div class="progress-stats">
                    <div class="progress-percentage">${subject.progress}% Complete</div>
                    <div class="progress-details">${subject.completed}/${subject.total} lessons</div>
                </div>
                <div class="progress-bar">
                    <div class="progress-value" style="width: ${subject.progress}%; background-color: ${subject.color}"></div>
                </div>
            </div>
            <div class="subject-options">
                <div class="options-grid">
                    <div class="option-item">
                        <div class="option-icon lectures">
                            <i class="fas fa-video"></i>
                        </div>
                        <div class="option-text">Video Lectures</div>
                    </div>
                    <div class="option-item">
                        <div class="option-icon notes">
                            <i class="fas fa-sticky-note"></i>
                        </div>
                        <div class="option-text">Notes</div>
                    </div>
                    <div class="option-item">
                        <div class="option-icon material">
                            <i class="fas fa-book-open"></i>
                        </div>
                        <div class="option-text">Study Material</div>
                    </div>
                    <div class="option-item">
                        <div class="option-icon tests">
                            <i class="fas fa-chart-bar"></i>
                        </div>
                        <div class="option-text">Test Analysis</div>
                    </div>
                    <div class="option-item">
                        <div class="option-icon submission">
                            <i class="fas fa-upload"></i>
                        </div>
                        <div class="option-text">Submissions</div>
                    </div>
                    <div class="option-item ask-doubt" data-subject="${subject.name}" data-teacher="${subject.teacher}">
                        <div class="option-icon doubt">
                            <i class="fas fa-question-circle"></i>
                        </div>
                        <div class="option-text">Ask Doubt</div>
                    </div>
                </div>
            </div>
        `;
        
        subjectsGrid.appendChild(subjectCard);
    });
    
    // Add event listeners to Ask Doubt buttons
    document.querySelectorAll('.ask-doubt').forEach(btn => {
        btn.addEventListener('click', function() {
            const subjectName = this.getAttribute('data-subject');
            const teacherNameValue = this.getAttribute('data-teacher');
            openDoubtModal(subjectName, teacherNameValue);
        });
    });
    
    // Add event listeners to all option items
    document.querySelectorAll('.option-item').forEach(item => {
        if (!item.classList.contains('ask-doubt')) {
            item.addEventListener('click', function() {
                const optionType = this.querySelector('.option-text').textContent.trim();
                const subjectCard = this.closest('.subject-card');
                const subjectName = subjectCard.querySelector('.subject-title h3').textContent;
                
                // Handle different option clicks
                handleOptionClick(optionType, subjectName);
            });
        }
    });
}

// Open the doubt modal with subject and teacher information
function openDoubtModal(subjectName, teacherNameValue) {
    modalSubject.textContent = subjectName;
    teacherName.textContent = teacherNameValue;
    doubtModal.style.display = 'flex';
    
    // Clear any previous input
    document.getElementById('doubtText').value = '';
}

// Close the doubt modal
function closeDoubtModal() {
    doubtModal.style.display = 'none';
}

// Handle other option item clicks
function handleOptionClick(optionType, subjectName) {
    // Find the subject object
    const subject = subjects.find(s => s.name === subjectName);
    
    if (!subject) return;
    
    switch(optionType) {
        case 'Video Lectures':
            console.log(`Opening video lectures for ${subjectName}`);
            // Implement redirect to video lectures page
            alert(`Navigating to ${subjectName} video lectures`);
            break;
        case 'Notes':
            console.log(`Opening notes for ${subjectName}`);
            // Implement redirect to notes page
            alert(`Navigating to ${subjectName} notes`);
            break;
        case 'Study Material':
            console.log(`Opening study material for ${subjectName}`);
            // Implement redirect to study material page
            alert(`Navigating to ${subjectName} study material`);
            break;
        case 'Test Analysis':
            console.log(`Opening test analysis for ${subjectName}`);
            // Implement redirect to test analysis page
            alert(`Navigating to ${subjectName} test analysis`);
            break;
        case 'Submissions':
            console.log(`Opening submissions for ${subjectName}`);
            // Implement redirect to submissions page
            alert(`Navigating to ${subjectName} submissions`);
            break;
        default:
            console.log(`Unknown option: ${optionType}`);
    }
}

// Submit doubt
function submitDoubt(event) {
    event.preventDefault();
    
    const subject = modalSubject.textContent;
    const teacher = teacherName.textContent;
    const doubtText = document.getElementById('doubtText').value.trim();
    
    if (!doubtText) {
        alert("Please enter your doubt before submitting.");
        return;
    }
    
    console.log('Doubt submitted:', {
        subject,
        teacher,
        doubt: doubtText
    });
    
    // Here you would typically send this data to a server
    // For now, we'll just show a confirmation
    alert(`Your doubt for ${subject} has been submitted to ${teacher}.`);
    
    // Close the modal
    closeDoubtModal();
}

// Event listeners for modal
closeModalBtn.addEventListener('click', closeDoubtModal);
cancelBtn.addEventListener('click', closeDoubtModal);
submitBtn.addEventListener('click', submitDoubt);

// Close modal if clicked outside
window.addEventListener('click', (event) => {
    if (event.target === doubtModal) {
        closeDoubtModal();
    }
});

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    renderSubjects();
});

// Initial render
renderSubjects();

document.addEventListener("DOMContentLoaded", () => {
    // Floating bubble interaction (Footer)
    const floatingBubble = document.querySelector('.floating-learning-bubble');
    if (floatingBubble) {
        floatingBubble.addEventListener('click', function () {
            alert('Ready to start learning? Chat with our AI Tutor now!');
        });
    }

    // Interactive dropdowns (Navbar)
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
        dropdown.addEventListener('mouseenter', function () {
            const content = this.querySelector('.dropdown-content');
            if (content) content.style.display = 'block';
        });

        dropdown.addEventListener('mouseleave', function () {
            const content = this.querySelector('.dropdown-content');
            if (content) content.style.display = 'none';
        });
    });
});
