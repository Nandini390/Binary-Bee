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
                            return 'Grade : $ {context.raw}%';
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
