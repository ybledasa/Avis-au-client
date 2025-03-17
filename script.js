document.addEventListener("DOMContentLoaded", function () {
  function handleRatingClick(ratingId, inputId) {
      const stars = document.querySelectorAll(`#${ratingId} span`);
      const input = document.getElementById(inputId);

      stars.forEach(star => {
          star.addEventListener("click", function () {
              let value = this.getAttribute("data-value");
              input.value = value;
              stars.forEach(s => s.classList.remove("active"));
              for (let i = 0; i < value; i++) {
                  stars[i].classList.add("active");
              }
          });

          star.addEventListener("mouseover", function () {
              stars.forEach(s => s.classList.remove("hover"));
              for (let i = 0; i < this.getAttribute("data-value"); i++) {
                  stars[i].classList.add("hover");
              }
          });

          star.addEventListener("mouseout", function () {
              stars.forEach(s => s.classList.remove("hover"));
          });
      });
  }

  handleRatingClick("rating1", "accueil_value");
  handleRatingClick("rating2", "ecoute_value");
});

document.addEventListener("DOMContentLoaded", function () {
  const fadeInElements = document.querySelectorAll(".fade-in");

  function checkVisibility() {
      fadeInElements.forEach(element => {
          const rect = element.getBoundingClientRect();
          if (rect.top < window.innerHeight * 0.9 && !element.classList.contains("visible")) {
              element.classList.add("visible");
          }
      });
  }

  window.addEventListener("scroll", checkVisibility);
  checkVisibility();
});

function animateNumbers(element, start, end, duration) {
  let range = end - start;
  let current = start;
  let increment = range / (duration / 30);
  
  let timer = setInterval(() => {
      current += increment;
      if (current >= end) {
          clearInterval(timer);
          current = end;
      }
      element.innerText = Math.floor(current);
  }, 30);
}

document.addEventListener("DOMContentLoaded", function () {
  const avisCounter = document.querySelector("#avis-count");
  const satisfactionCounter = document.querySelector("#satisfaction-rate");
  const recommendationCounter = document.querySelector("#recommendation-rate");

  animateNumbers(avisCounter, 10000, 15000, 2000);
  animateNumbers(satisfactionCounter, 70, 85, 2000);
  animateNumbers(recommendationCounter, 30, 50, 2000);
});
