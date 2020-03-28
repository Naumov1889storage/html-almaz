(function () {
    if (Boolean(document.querySelector('.index-page-slider-section'))) {
        let n_of_slides = document.querySelectorAll('.index-page-slider__item').length;

        for (let i = 0; i < n_of_slides; i++) {
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

    if (Boolean(document.querySelector('.js-gallery-slider'))) {
        if (window.innerWidth < 800) {
            tns({
                "container": ".js-gallery-slider",
                "mouseDrag": true,
                "navPosition": "bottom",
                "loop": false,
                "edgePadding": 20,
                "gutter": 10,
                // "items": 2,
                "fixedWidth": 130,
                responsive: {
                    740: {
                        "edgePadding": 20,
                        "fixedWidth": 204
                    },
                    490: {
                        "edgePadding": 20,
                        "fixedWidth": 160,
                        "gutter": 15,
                    },
                    360: {
                        "edgePadding": 20,
                        "fixedWidth": 140,
                        "gutter": 15,
                    },
                }
            });
        }
    }
}());