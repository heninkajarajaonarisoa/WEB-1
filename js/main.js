document.addEventListener('DOMContentLoaded', () => {
  const coursesGrid = document.getElementById('courses-grid');
  const coursesCount = document.getElementById('courses-count');

  const techSelect = document.getElementById('tech-select');
  const levelSelect = document.getElementById('level-select');
  const searchInput = document.getElementById('search-input');
  const clearBtn = document.getElementById('clear-btn');
  const flagBtns = document.querySelectorAll('.flag-btn');
  
  const priceMinSlider = document.getElementById('price-min');
  const priceMaxSlider = document.getElementById('price-max');
  const priceMinDisplay = document.getElementById('price-min-display');
  const priceMaxDisplay = document.getElementById('price-max-display');

  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
    });
  }

  let selectedLang = 'all';

  function updateSliderBackground(slider) {
    const val = Number(slider.value);
    const min = Number(slider.min);
    const max = Number(slider.max);
    const percentage = ((val - min) / (max - min)) * 100;
    slider.style.background = `linear-gradient(to right, #c91818 0%, #c91818 ${percentage}%, #d5d5d5 ${percentage}%, #d5d5d5 100%)`;
  }

  function renderCourses(list) {
    coursesGrid.innerHTML = '';
    coursesCount.textContent = list.length;

    if (list.length === 0) {
      coursesGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #888; padding: 2rem;">No courses found.</p>';
      return;
    }

    list.forEach(course => {
      const formattedPrice = new Intl.NumberFormat('en-US').format(course.price);
      const card = document.createElement('div');
      card.className = 'course-card';
      card.innerHTML = `
        <div class="card-image-wrapper">
          <img src="${course.image}" alt="${course.title}">
          <span class="badge-lang-pill">${course.language}</span>
          <span class="badge-tech-pill">${course.technology}</span>
          <span class="badge-level-rect">${course.level}</span>
        </div>
        <div class="card-content">
          <h3 class="card-title">${course.title}</h3>
          <div class="card-price">MGA ${formattedPrice}</div>
          <p class="card-desc">${course.description}</p>
          <div class="card-actions">
            <button class="btn-learn">Learn more</button>
            <button class="btn-add">Add to cart</button>
          </div>
        </div>
      `;
      coursesGrid.appendChild(card);
    });
  }

  function filterCourses() {
    const selectedTech = techSelect.value;
    const selectedLevel = levelSelect.value;
    const currentMin = Number(priceMinSlider.value);
    const currentMax = Number(priceMaxSlider.value);
    const searchKeyword = searchInput.value.toLowerCase().trim();

    const filtered = coursesData.filter(course => {
      const matchLang = selectedLang === 'all' || course.language === selectedLang;
      const matchTech = selectedTech === 'all' || course.technology === selectedTech;
      const matchLevel = selectedLevel === 'all' || course.level === selectedLevel;
      const matchPrice = course.price >= currentMin && course.price <= currentMax;
      const matchSearch = course.title.toLowerCase().includes(searchKeyword) ||
                          course.description.toLowerCase().includes(searchKeyword);

      return matchLang && matchTech && matchLevel && matchPrice && matchSearch;
    });

    renderCourses(filtered);
  }

  flagBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const clickedLang = e.currentTarget.getAttribute('data-lang');

      if (e.currentTarget.classList.contains('active')) {
        e.currentTarget.classList.remove('active');
        selectedLang = 'all';
      } else {
        flagBtns.forEach(b => b.classList.remove('active'));
        e.currentTarget.classList.add('active');
        selectedLang = clickedLang;
      }
      filterCourses();
    });
  });

  techSelect.addEventListener('change', filterCourses);
  levelSelect.addEventListener('change', filterCourses);

  priceMinSlider.addEventListener('input', () => {
    if (Number(priceMinSlider.value) > Number(priceMaxSlider.value)) {
      priceMinSlider.value = priceMaxSlider.value;
    }
    priceMinDisplay.textContent = new Intl.NumberFormat('en-US').format(priceMinSlider.value);
    updateSliderBackground(priceMinSlider);
    filterCourses();
  });

  priceMaxSlider.addEventListener('input', () => {
    if (Number(priceMaxSlider.value) < Number(priceMinSlider.value)) {
      priceMaxSlider.value = priceMinSlider.value;
    }
    priceMaxDisplay.textContent = new Intl.NumberFormat('en-US').format(priceMaxSlider.value);
    updateSliderBackground(priceMaxSlider);
    filterCourses();
  });

  searchInput.addEventListener('input', filterCourses);

  clearBtn.addEventListener('click', () => {
    selectedLang = 'all';
    flagBtns.forEach(b => b.classList.remove('active'));

    techSelect.value = 'all';
    levelSelect.value = 'all';
    
    priceMinSlider.value = 0;
    priceMaxSlider.value = 300000;
    priceMinDisplay.textContent = '0';
    priceMaxDisplay.textContent = '300,000';
    
    searchInput.value = '';

    updateSliderBackground(priceMinSlider);
    updateSliderBackground(priceMaxSlider);
    filterCourses();
  });

  updateSliderBackground(priceMinSlider);
  updateSliderBackground(priceMaxSlider);
  renderCourses(coursesData);
});