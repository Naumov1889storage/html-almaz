(function () {
    document.querySelectorAll(".js-callback-btn").forEach(btn => {
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

            let vacancyValue = form.querySelector("input[name=vacancy]");
            if (!(vacancyValue)) {
                vacancyValue = "-"
            }


            if (!isNameValid) inputErrorAnimation(nameInput);
            if (!isPhoneValid) inputErrorAnimation(phoneInput);
            if (!isCheckboxValid) inputErrorAnimation(checkbox_object);

            let isFormValid = isNameValid && isPhoneValid && isCheckboxValid;

            if (isFormValid) {
                postAjax('', {
                    name: nameValue,
                    phone: phoneValue,
                    vacancy: vacancyValue,
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