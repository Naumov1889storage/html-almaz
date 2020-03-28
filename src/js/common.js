(function () {
    document.querySelectorAll(".vacancy__btn").forEach(item => {
        item.addEventListener("click", e => {
            let vacancy_name = item.closest(".vacancy").querySelector(".vacancy__title").innerHTML.toLowerCase();

            document.querySelector(".vacancy-form-placeholder-text").innerHTML = vacancy_name;
            document.querySelector(".vacancy-form-placeholder-input").value = vacancy_name;
        })
    })
}());