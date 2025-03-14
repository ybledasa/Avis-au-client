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
