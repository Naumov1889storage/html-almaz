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