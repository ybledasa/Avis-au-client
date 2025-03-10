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
