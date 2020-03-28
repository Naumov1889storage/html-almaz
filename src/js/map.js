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