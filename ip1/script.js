const courses = [
    {
        title: "Google Data Analytics",
        partner: "Google",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Google_Data_Studio_logo.svg/1200px-Google_Data_Studio_logo.svg.png", 
        type: "Professional Certificate",
        rating: 4.8,
        students: "1.5m"
    },
    {
        title: "Python for Everybody",
        partner: "University of Michigan",
        image: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg",
        type: "Specialization",
        rating: 4.8,
        students: "3.2m"
    },
    {
        title: "IBM Data Science",
        partner: "IBM",
        image: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg",
        type: "Professional Certificate",
        rating: 4.6,
        students: "800k"
    },
    {
        title: "Machine Learning",
        partner: "Stanford University",
        image: "https://upload.wikimedia.org/wikipedia/commons/4/4b/Stanford_Cardinal_logo.svg",
        type: "Course",
        rating: 4.9,
        students: "4.8m"
    },
    {
        title: "Meta Front-End Developer",
        partner: "Meta",
        image: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg",
        type: "Professional Certificate",
        rating: 4.7,
        students: "450k"
    },
    {
        title: "Introduction to Psychology",
        partner: "Yale University",
        image: "https://upload.wikimedia.org/wikipedia/commons/0/07/Yale_University_Shield_1.svg",
        type: "Course",
        rating: 4.8,
        students: "950k"
    }
];

// DOM Elements
const courseContainer = document.getElementById('course-container');
const searchInput = document.getElementById('search-input');
const modalOverlay = document.getElementById('modalOverlay');
const loginModal = document.getElementById('loginModal');
const registerModal = document.getElementById('registerModal');
const courseModal = document.getElementById('courseModal');

// User Management - LEARNSPHERE
let users = JSON.parse(localStorage.getItem('learnSphereUsers')) || [];
let currentUser = null;

// Dark Mode Toggle
const darkModeToggle = document.getElementById('darkModeToggle');
darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const icon = darkModeToggle.querySelector('i');
    if (document.body.classList.contains('dark-mode')) {
        icon.className = 'fas fa-sun';
        localStorage.setItem('darkMode', 'true');
    } else {
        icon.className = 'fas fa-moon';
        localStorage.setItem('darkMode', 'false');
    }
});

// Load Dark Mode Preference
if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
    darkModeToggle.querySelector('i').className = 'fas fa-sun';
}

function displayCourses(courseList) {
    courseContainer.innerHTML = '';
    if (courseList.length === 0) {
        courseContainer.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 40px; color: #666;">No courses found.</p>';
        return;
    }
    courseList.forEach(course => {
        const card = document.createElement('div');
        card.classList.add('course-card');
        card.innerHTML = `
            <div class="card-img" style="background-image: url('${course.image}'); background-size: contain; background-repeat: no-repeat; background-color: #f5f5f5;"></div>
            <div class="card-content">
                <div class="partner-name">
                    <div class="partner-icon"></div> <span>${course.partner}</span>
                </div>
                <h3 class="card-title">${course.title}</h3>
                <p class="card-type">${course.type}</p>
                <div class="rating">
                    <i class="fas fa-star"></i> 
                    ${course.rating} 
                    <span>(${course.students} students)</span>
                </div>
            </div>
        `;
        courseContainer.appendChild(card);
    });
}

// Search Functionality
function setupSearch() {
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filtered = courses.filter(course => 
            course.title.toLowerCase().includes(searchTerm) || 
            course.partner.toLowerCase().includes(searchTerm)
        );
        displayCourses(filtered);
    });

    document.getElementById('searchBtn').addEventListener('click', () => {
        const searchTerm = searchInput.value.trim();
        if (searchTerm) {
            const filtered = courses.filter(course => 
                course.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                course.partner.toLowerCase().includes(searchTerm.toLowerCase())
            );
            displayCourses(filtered);
        }
    });
}

// Modal Management
function showModal(modal) {
    modalOverlay.classList.add('active');
    modal.classList.add('active');
}

function hideModal(modal) {
    modalOverlay.classList.remove('active');
    modal.classList.remove('active');
}

// Register/Login Functionality - LEARNSPHERE
document.getElementById('registerForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const userId = document.getElementById('regUserId').value;
    const email = document.getElementById('regEmail').value;
    const password = document.getElementById('regPassword').value;

    if (users.find(user => user.userId === userId)) {
        alert('User ID already exists! Please choose another.');
        return;
    }

    const newUser = { userId, email, password };
    users.push(newUser);
    localStorage.setItem('learnSphereUsers', JSON.stringify(users));
    
    alert(`Welcome to LearnSphere, ${userId}! Account created successfully. Please log in.`);
    hideModal(registerModal);
    document.getElementById('registerForm').reset();
});

document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const userId = document.getElementById('userId').value;
    const password = document.getElementById('password').value;

    const user = users.find(u => u.userId === userId && u.password === password);
    if (user) {
        currentUser = user;
        alert(`Welcome back to LearnSphere, ${userId}! Happy learning!`);
        hideModal(loginModal);
        document.querySelector('.login-link').textContent = `Hi, ${userId}`;
        document.querySelector('.login-link').classList.add('logged-in');
        document.getElementById('loginForm').reset();
    } else {
        alert('Invalid User ID or Password!');
    }
});

// Navigation Event Listeners
document.getElementById('joinBtn').addEventListener('click', () => showModal(registerModal));
document.getElementById('loginLink').addEventListener('click', (e) => {
    e.preventDefault();
    if (currentUser) {
        alert(`Already logged in as ${currentUser.userId} on LearnSphere`);
    } else {
        showModal(loginModal);
    }
});

document.querySelectorAll('.hero-join-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        if (currentUser) {
            alert(`Welcome back, ${currentUser.userId}! Start learning on LearnSphere now!`);
        } else {
            showModal(registerModal);
        }
    });
});

document.getElementById('exploreBtn').addEventListener('click', () => {
    alert('Explore Categories on LearnSphere:\n• Data Science\n• Business\n• Computer Science\n• Personal Development\n• Arts & Humanities\n• And 100+ more...');
});

document.getElementById('businessBtn').addEventListener('click', () => {
    alert('LearnSphere for Business\n\n✅ Unlimited access\n✅ Skills dashboards\n✅ Advanced analytics\n✅ Custom learning paths');
});

document.getElementById('degreesLink').addEventListener('click', (e) => {
    e.preventDefault();
    alert('Online Degrees on LearnSphere\n\n• Bachelor\'s & Master\'s\n• Top Universities\n• Flexible schedules\n• Career-focused');
});

document.getElementById('careersLink').addEventListener('click', (e) => {
    e.preventDefault();
    alert('Career Resources on LearnSphere\n\n• Job search tips\n• Resume builder\n• Interview prep\n• Salary insights');
});

// Modal Close Handlers
document.getElementById('closeLogin').addEventListener('click', () => hideModal(loginModal));
document.getElementById('closeRegister').addEventListener('click', () => hideModal(registerModal));
document.getElementById('closeCourse').addEventListener('click', () => hideModal(courseModal));
document.getElementById('modalOverlay').addEventListener('click', () => {
    hideModal(loginModal);
    hideModal(registerModal);
    hideModal(courseModal);
});

document.getElementById('showRegister').addEventListener('click', (e) => {
    e.preventDefault();
    hideModal(loginModal);
    showModal(registerModal);
});

document.getElementById('showLogin').addEventListener('click', (e) => {
    e.preventDefault();
    hideModal(registerModal);
    showModal(loginModal);
});

// Course Details Modal
courseContainer.addEventListener('click', (e) => {
    const card = e.target.closest('.course-card');
    if (card) {
        const title = card.querySelector('.card-title').textContent;
        const partner = card.querySelector('.partner-name span').textContent;
        const rating = card.querySelector('.rating').textContent;
        
        document.getElementById('courseTitle').textContent = title;
        document.getElementById('coursePartner').textContent = partner;
        document.getElementById('courseRating').innerHTML = rating;
        
        showModal(courseModal);
    }
});

document.getElementById('enrollBtn').addEventListener('click', () => {
    if (currentUser) {
        alert(`🎉 Enrolled in course successfully on LearnSphere!\nWelcome ${currentUser.userId} to your learning journey!`);
        hideModal(courseModal);
    } else {
        alert('Please create an account or log in to enroll in courses on LearnSphere!');
        hideModal(courseModal);
        showModal(registerModal);
    }
});

// Footer Links
document.querySelectorAll('footer a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const page = link.getAttribute('data-page') || link.textContent;
        alert(`Navigating to ${page} page on LearnSphere...`);
    });
});

// Initialize
displayCourses(courses);
setupSearch();
