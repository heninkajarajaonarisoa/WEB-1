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

function setupControls() {
  const flagBtns = document.querySelectorAll(".flag-btn");
  const priceMin = document.getElementById("price-min");
  const priceMax = document.getElementById("price-max");
  const priceMinDisplay = document.getElementById("price-min-display");
  const priceMaxDisplay = document.getElementById("price-max-display");

  flagBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const lang = btn.getAttribute("data-lang");
      if (selectedLang === lang) {
        selectedLang = "all";
        btn.classList.remove("active");
      } else {
        flagBtns.forEach(b => b.classList.remove("active"));
        selectedLang = lang;
        btn.classList.add("active");
      }
      applyFilters();
    });
  });

  priceMin.addEventListener("input", () => {
    if (parseInt(priceMin.value) > parseInt(priceMax.value)) priceMin.value = priceMax.value;
    priceMinDisplay.textContent = parseInt(priceMin.value).toLocaleString();
    applyFilters();
  });

  priceMax.addEventListener("input", () => {
    if (parseInt(priceMax.value) < parseInt(priceMin.value)) priceMax.value = priceMin.value;
    priceMaxDisplay.textContent = parseInt(priceMax.value).toLocaleString();
    applyFilters();
  });
}