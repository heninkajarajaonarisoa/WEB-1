let selectedLang = "all";

document.addEventListener("DOMContentLoaded", () => {
  console.log("App initialized");
});

function renderCourses(courses) {
  const coursesGrid = document.getElementById("courses-grid");
  const coursesCount = document.getElementById("courses-count");

  coursesGrid.innerHTML = "";
  coursesCount.textContent = courses.length;

  if (courses.length === 0) {
    coursesGrid.innerHTML = `<p class="no-results">Aucun cours trouvé.</p>`;
    return;
  }

  courses.forEach(course => {
    const card = document.createElement("div");
    card.className = "course-card";
    card.innerHTML = `
      <span class="badge">${course.tech}</span>
      <h3>${course.title}</h3>
      <p>Niveau: ${course.level} | Langue: ${course.lang}</p>
      <div class="price">${course.price.toLocaleString()} Ar</div>
    `;
    coursesGrid.appendChild(card);
  });
}