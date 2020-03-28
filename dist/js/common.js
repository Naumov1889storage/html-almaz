(function () {

}());
(function () {
    document.querySelectorAll("form button[type=submit]").forEach(btn => {
        btn.addEventListener("click", function (e) {
            e.preventDefault();

            let form = this.closest("form");

            let checkbox_object = form.querySelector('.checkbox');
            let checkbox_input = form.querySelector('.checkbox__input');
            let isCheckboxValid = validateCheckbox(checkbox_input);
            let nameInput = form.querySelector("input[name=name]");
            let nameValue = nameInput.value;
            let isNameValid = validateName(nameValue);
            let phoneInput = form.querySelector("input[name=phone]");
            let phoneValue = phoneInput.value;
            let isPhoneValid = validatePhone(phoneValue);

            if (!isNameValid) inputErrorAnimation(nameInput);
            if (!isPhoneValid) inputErrorAnimation(phoneInput);
            if (!isCheckboxValid) inputErrorAnimation(checkbox_object);

            let isFormValid = isNameValid && isPhoneValid;

            if (isFormValid) {
                postAjax('email.php', {
                    name: nameValue,
                    phone: phoneValue,
                }, function (data) {
                    // console.log("success", data);
                });
                form.reset();

                popbox.close(form.closest(".popbox"));
                popbox.open("popbox-success")
            }

        });
    });


    function validateName(inputNameValue) {
        let name_format = /^[A-Za-z\u0400-\u04FF\s]+$/;
        return !!inputNameValue.match(name_format);
    }

    function validatePhone(inputPhoneValue) {
        return !!(inputPhoneValue.length === 15);
    }

    function validateCheckbox(input) {
        return input.checked;
    }

    function inputErrorAnimation(input) {
        input.classList.add("bounce");
        setTimeout(function () {
            input.classList.remove("bounce");
        }, 1000);
    }

    function postAjax(url, data, success) {
        let params = typeof data == 'string' ? data : Object.keys(data).map(
            function (k) {
                return encodeURIComponent(k) + '=' + encodeURIComponent(data[k])
            }
        ).join('&');

        let xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
        xhr.open('POST', url);
        xhr.onreadystatechange = function () {
            if (xhr.readyState > 3 && xhr.status === 200) {
                success(xhr.responseText);
            }
        };
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send(params);
        return xhr;
    }

    let popbox = new Popbox();
}());
(function () {
    if (Boolean(document.querySelector('#map-container'))) {
        ymaps.ready(function (e) {
            var myCenter = [48.684308573825604,44.44031949999993];
            var iconSize = [98, 140];
            if (window.innerWidth < 860) {
                var myCenter = [48.684908573825604,44.44431949999993];
                var iconSize = [66, 100];
            }
            var myMap = new ymaps.Map('map-container', {
                    center: myCenter,
                    zoom: 17,
                    //controls: ['zoomControl', 'typeSelector', 'fullscreenControl', 'routeButtonControl']
                    //controls: ['zoomControl', 'typeSelector', 'fullscreenControl', 'routeButtonControl']
                }, {}),

                // Создаём макет содержимого.
                MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
                    '<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
                ),

                myPlacemark = new ymaps.Placemark([48.684308573825604,44.44431949999993], {
                    hintContent: 'АЛМАЗ',
                    balloonContent: 'г.Волгоград ул.Качуевской, 2Д\n'
                }, {
                    // Опции.
                    // Необходимо указать данный тип макета.
                    iconLayout: 'default#image',
                    // Своё изображение иконки метки.
                    iconImageHref: 'img/placemark.png',
                    // Размеры метки.
                    iconImageSize: iconSize,
                    // Смещение левого верхнего угла иконки относительно
                    // её "ножки" (точки привязки).
                    iconImageOffset: [-40, -118]
                }),

                myPlacemarkWithContent = new ymaps.Placemark([48.684308573825604,44.44431949999993], {
                    hintContent: '',
                    balloonContent: '',
                    iconContent: ''
                }, {
                    // Опции.
                    // Необходимо указать данный тип макета.
                    iconLayout: 'default#imageWithContent',
                    // Своё изображение иконки метки.
                    iconImageHref: '',
                    // Размеры метки.
                    iconImageSize: [48, 48],
                    // Смещение левого верхнего угла иконки относительно
                    // её "ножки" (точки привязки).
                    iconImageOffset: [-24, -24],
                    // Смещение слоя с содержимым относительно слоя с картинкой.
                    iconContentOffset: [15, 15],
                    // Макет содержимого.
                    iconContentLayout: MyIconContentLayout
                });

            myMap.geoObjects
                .add(myPlacemark)
                .add(myPlacemarkWithContent);

            // myMap.behaviors.disable('scrollZoom');
            myMap.controls.remove('zoomControl');
            myMap.controls.remove('geolocationControl');
            myMap.controls.remove('searchControl');
            myMap.controls.remove('trafficControl');
            myMap.controls.remove('typeSelector');
            myMap.controls.remove('fullscreenControl');
            myMap.controls.remove('rulerControl');
        });
    }
}());
(function () {
    document.querySelector(".burger").addEventListener("click", function () {
        document.querySelector(".overlay").classList.add("overlay_active");
        document.querySelector(".sidebar").classList.add("sidebar_active");
        document.querySelector(".pusher").classList.add("pusher_active");
    });

    document.querySelector(".overlay").addEventListener("click", function () {
        document.querySelector(".overlay").classList.remove("overlay_active");
        document.querySelector(".pusher").classList.remove("pusher_active");
        document.querySelector(".sidebar").classList.remove("sidebar_active");
    });

    document.querySelectorAll(".js-sidebar-nav-item").forEach( nav_item => {
        nav_item.addEventListener("click", function () {
            document.querySelector(".overlay").classList.remove("overlay_active");
            document.querySelector(".pusher").classList.remove("pusher_active");
            document.querySelector(".sidebar").classList.remove("sidebar_active");
        });
    })
}());
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