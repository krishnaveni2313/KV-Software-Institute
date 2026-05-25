const courses = [
  {
    id: "full-stack-development",
    name: "Full Stack Development",
    description: "Master frontend, backend, databases, APIs, deployment, and real-world product development.",
    duration: "6 Months",
    mode: "Online / Offline",
    fees: "₹45,000",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=900&q=80",
    syllabus: ["HTML, CSS, JavaScript", "React and component architecture", "Node.js and Express APIs", "MongoDB and SQL basics", "Authentication and deployment"],
    trainer: "Senior MERN Stack Trainer with 8+ years experience"
  },
  {
    id: "data-science-ai",
    name: "Data Science & AI",
    description: "Learn Python, data analysis, machine learning, AI tools, dashboards, and model deployment.",
    duration: "6 Months",
    mode: "Online / Offline",
    fees: "₹55,000",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80",
    syllabus: ["Python for data", "Statistics and data cleaning", "Machine learning models", "AI workflows", "Dashboards and deployment"],
    trainer: "Data Science Mentor with analytics and AI project experience"
  },
  {
    id: "python-programming",
    name: "Python Programming",
    description: "Build strong programming fundamentals with Python, automation, APIs, and mini projects.",
    duration: "3 Months",
    mode: "Online / Offline",
    fees: "₹22,000",
    image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&fit=crop&w=900&q=80",
    syllabus: ["Python basics", "Functions and OOP", "File handling", "API usage", "Automation projects"],
    trainer: "Python Trainer focused on beginner-friendly practical learning"
  },
  {
    id: "java-development",
    name: "Java Development",
    description: "Learn core Java, OOP, collections, JDBC, Spring Boot basics, and backend projects.",
    duration: "4 Months",
    mode: "Online / Offline",
    fees: "₹32,000",
    image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=900&q=80",
    syllabus: ["Core Java", "OOP and collections", "JDBC and SQL", "Spring Boot basics", "Backend project"],
    trainer: "Java Backend Trainer with enterprise application experience"
  },
  {
    id: "frontend-development-react",
    name: "Frontend Development (React)",
    description: "Create modern responsive interfaces using HTML, CSS, JavaScript, React, and APIs.",
    duration: "4 Months",
    mode: "Online / Offline",
    fees: "₹30,000",
    image: "https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&w=900&q=80",
    syllabus: ["Responsive web design", "Modern JavaScript", "React components", "API integration", "Portfolio projects"],
    trainer: "Frontend Mentor specializing in React applications"
  },
  {
    id: "ui-ux-design",
    name: "UI/UX Design",
    description: "Design user-friendly apps and websites with research, wireframes, prototypes, and portfolios.",
    duration: "3 Months",
    mode: "Online / Offline",
    fees: "₹28,000",
    image: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=900&q=80",
    syllabus: ["Design thinking", "User research", "Wireframes", "Figma prototypes", "Case study portfolio"],
    trainer: "UI/UX Designer with product design and portfolio coaching experience"
  }
];

const isLoggedIn = () => localStorage.getItem("kvLoggedIn") === "true";

function setupNavigation() {
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");
  const loginStatus = document.getElementById("loginStatus");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => navLinks.classList.toggle("open"));
  }

  if (loginStatus) {
    loginStatus.textContent = isLoggedIn() ? "Dashboard" : "Login";
    loginStatus.href = isLoggedIn() ? "courses.html" : "login.html";
  }
}

function courseCard(course) {
  return `
    <article class="course-card reveal">
      <img src="${course.image}" alt="${course.name}" />
      <div class="course-card-body">
        <h3>${course.name}</h3>
        <p>${course.description}</p>
        <div class="course-meta">
          <span><strong>Duration:</strong> ${course.duration}</span>
          <span><strong>Mode:</strong> ${course.mode}</span>
          <span><strong>Fees:</strong> ${course.fees} - EMI available</span>
        </div>
        <button class="btn btn-primary" data-course="${course.id}">View Details</button>
      </div>
    </article>
  `;
}

function renderCourses() {
  const homeGrid = document.getElementById("homeCourseGrid");
  const courseGrid = document.getElementById("courseGrid");

  if (homeGrid) homeGrid.innerHTML = courses.slice(0, 3).map(courseCard).join("");
  if (courseGrid) courseGrid.innerHTML = courses.map(courseCard).join("");

  document.querySelectorAll("[data-course]").forEach((button) => {
    button.addEventListener("click", () => {
      const id = button.getAttribute("data-course");
      if (!isLoggedIn()) {
        localStorage.setItem("pendingCourse", id);
        window.location.href = "login.html";
        return;
      }
      window.location.href = `course-details.html?course=${id}`;
    });
  });
}

function renderCourseDetails() {
  const container = document.getElementById("courseDetails");
  if (!container) return;

  if (!isLoggedIn()) {
    localStorage.setItem("pendingCourse", new URLSearchParams(location.search).get("course") || courses[0].id);
    window.location.href = "login.html";
    return;
  }

  const id = new URLSearchParams(location.search).get("course") || courses[0].id;
  const course = courses.find((item) => item.id === id) || courses[0];

  container.innerHTML = `
    <div class="detail-card reveal">
      <p class="eyebrow">Course Details</p>
      <h1>${course.name}</h1>
      <p>${course.description}</p>
      <div class="stats">
        <div><strong>${course.duration}</strong><span>Duration</span></div>
        <div><strong>${course.mode}</strong><span>Mode</span></div>
        <div><strong>EMI</strong><span>Available</span></div>
      </div>
      <div class="detail-actions">
        <a class="btn btn-primary" href="contact.html">Enroll Now</a>
        <a class="btn btn-secondary" href="courses.html">Back to Courses</a>
      </div>
    </div>
    <div class="detail-card reveal">
      <h2>Complete Syllabus</h2>
      <ul>${course.syllabus.map((item) => `<li>${item}</li>`).join("")}</ul>
      <h2>Fee Structure</h2>
      <p>Total Fee: <strong>${course.fees}</strong>. EMI options are available for eligible learners.</p>
      <h2>Placement Assistance</h2>
      <p>Resume building, mock interviews, LinkedIn guidance, portfolio review, and hiring partner support.</p>
      <h2>Trainer Information</h2>
      <p>${course.trainer}</p>
      <h2>Schedule</h2>
      <p>Weekday and weekend batches are available. Contact the institute for current batch timings.</p>
    </div>
  `;
}

function setupLogin() {
  const form = document.getElementById("loginForm");
  const logoutButton = document.getElementById("logoutButton");

  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      localStorage.setItem("kvLoggedIn", "true");
      const pendingCourse = localStorage.getItem("pendingCourse");
      localStorage.removeItem("pendingCourse");
      window.location.href = pendingCourse ? `course-details.html?course=${pendingCourse}` : "courses.html";
    });
  }

  if (logoutButton) {
    logoutButton.addEventListener("click", () => {
      localStorage.removeItem("kvLoggedIn");
      alert("Logged out successfully.");
      window.location.href = "index.html";
    });
  }
}

function setupContactForm() {
  const form = document.getElementById("contactForm");
  if (!form) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    alert("Thank you. KV Software Institute will contact you soon.");
    form.reset();
  });
}

function setupRevealAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("visible");
    });
  }, { threshold: 0.12 });

  document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
}

setupNavigation();
renderCourses();
renderCourseDetails();
setupLogin();
setupContactForm();
setupRevealAnimations();
