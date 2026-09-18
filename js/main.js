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

function applyFilters() {
  const techValue = document.getElementById("tech-select").value;
  const levelValue = document.getElementById("level-select").value;
  const searchValue = document.getElementById("search-input").value.toLowerCase().trim();
  const minPrice = parseInt(document.getElementById("price-min").value);
  const maxPrice = parseInt(document.getElementById("price-max").value);

  const filtered = COURSES_DATA.filter(course => {
    const matchTech = techValue === "all" || course.tech === techValue;
    const matchLevel = levelValue === "all" || course.level === levelValue;
    const matchLang = selectedLang === "all" || course.lang === selectedLang;
    const matchSearch = course.title.toLowerCase().includes(searchValue);
    const matchPrice = course.price >= minPrice && course.price <= maxPrice;

    return matchTech && matchLevel && matchLang && matchSearch && matchPrice;
  });

  renderCourses(filtered);
}

document.addEventListener("DOMContentLoaded", () => {
  setupControls();

  document.getElementById("tech-select").addEventListener("change", applyFilters);
  document.getElementById("level-select").addEventListener("change", applyFilters);
  document.getElementById("search-input").addEventListener("input", applyFilters);

  document.getElementById("clear-btn").addEventListener("click", () => {
    document.getElementById("tech-select").value = "all";
    document.getElementById("level-select").value = "all";
    document.getElementById("search-input").value = "";
    document.getElementById("price-min").value = 0;
    document.getElementById("price-max").value = 300000;
    document.getElementById("price-min-display").textContent = "0";
    document.getElementById("price-max-display").textContent = "300,000";
    selectedLang = "all";
    document.querySelectorAll(".flag-btn").forEach(b => b.classList.remove("active"));
    applyFilters();
  });

  renderCourses(COURSES_DATA);
});