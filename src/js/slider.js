(function () {
    if (Boolean(document.querySelector('.index-page-slider-section'))) {
        let n_of_slides = document.querySelectorAll('.index-page-slider__item').length;

        for(let i=0; i<n_of_slides; i++) {
            let btn = document.createElement("button");
            document.querySelector('.index-page-slider__dots').appendChild(btn)
        }

        tns({
            "container": ".index-page-slider__item-list",
            "mouseDrag": true,
            "controlsContainer": ".index-page-slider__arrows",
            "navContainer": ".index-page-slider__dots",
        });
    }
}());