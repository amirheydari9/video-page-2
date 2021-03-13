$(document).ready(function () {

    maudio({
        obj: 'audio',
        fastStep: 10
    });

    $('.main-slider-carousel').owlCarousel({
        items: 1,
        loop: true,
        nav: true,
        rtl: true,
        center: true,
        mouseDrag: true,
        autoplay: true,
        autoplayTimeout: 10000,
        autoplaySpeed: 1000,
        autoplayHoverPause: true,
        dots: true,
        smartSpeed: 1000,
    });

    $('.owl-first').owlCarousel({
        loop: true,
        navText: ['<', '>'],
        margin: 70,
        nav: false,
        rtl: true,
        center: true,
        mouseDrag: true,
        autoplay: true,
        autoplayTimeout: 2000,
        autoplayHoverPause: true,
        dots: false,
        responsive: {
            0: {
                items: 1,
                dots: false,
            },
            500: {
                items: 2,
            },
            765: {
                items: 3,
            },
            1000: {
                items: 4,
            }
        }
    });

    $('.owl-second').owlCarousel({
        loop: false,
        margin: 20,
        nav: false,
        rtl: true,
        center: false,
        mouseDrag: true,
        autoplay: true,
        autoplayTimeout: 2000,
        autoplayHoverPause: true,
        dots: false,
        responsive: {
            0: {
                items: 1,
            },
            576: {
                items: 2,
            },
            765: {
                items: 3,
            },
            1000: {
                items: 4,
            }
        }
    });

    $('.dropdown-menu').on('click', function (e) {
        e.stopPropagation();
    });

    $('#modalCart').on('hidden.bs.modal', function () {

        $('.bottom_navigation_menu').removeClass('nav__link__active')
    });

    $('.bottom_navigation_search').on('click', function () {

        $(this).toggleClass('nav__link__active');

        $('#search-box').toggleClass('d-none');

        $('#search-box').toggleClass('d-flex');

        if ($('#search-box').hasClass('d-flex')) {

            $('html,body').animate({scrollTop: 0}, 2000);

            $('#search-box input').focus();

            $('.searchbox-icon').click();
        }

    });

    $('.bottom_navigation_menu').on('click', function () {

        $(this).toggleClass('nav__link__active');

    });

    $('.scrollTop').click(function () {

        $(this).css('border-radius', '0 20px 20px 0');

        $(this).toggleClass('nav__link__active');

        $('html,body').animate({scrollTop: 0}, 800);

        setTimeout(() => {
            $(this).removeClass('nav__link__active');

        }, 800)
    });

    window.addEventListener('scroll', function () {
        if ($(window).scrollTop() + $(window).height() > $(document).height() - 1) {
            if ($(window).width() <= 991) {
                $('.bottom_nav ').css('bottom', '0');
                $('footer').css('margin-bottom', '55px')
            }
        }
    });

    $(window).resize(function () {
        if ($(window).width() > 992) {
            $('footer').css('margin-bottom', '0');
            $('#modalCart').modal('hide');
            $('body').removeClass('modal-open');
            $('.modal-backdrop').remove();
        }
    });

    const images = document.querySelectorAll("[data-src]");

    function preLoadImage(img) {
        const src = img.getAttribute("data-src");
        if (!src) {
            return;
        }
        img.src = src;
    }

    const imgOptions = {
        threshold: 0,
        rootMargin: "0px"
    };

    const imgObserver = new IntersectionObserver((entries, imgObserver) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                preLoadImage(entry.target);
                imgObserver.unobserve(entry.target);
            }
        })
    }, imgOptions);

    images.forEach(image => {
        imgObserver.observe(image);
    })


    $('.padcast .item').click(function () {

        $('.padcast .item').removeClass('active');
        $('.padcast .item .audio-container').addClass('d-none');
        $('.padcast .item .audio-container').removeClass('d-flex');

        $('.padcast .item').find('.fa-remove').addClass('d-none');
        $('.padcast .item').find('.fa-remove').removeClass('d-flex');


        const audioNum = $(this).data('audio');

        switch (audioNum) {

            case 0:
                $('.padcast .item .audio-container .maudio audio').get(1).pause();
                $('.padcast .item .audio-container .maudio audio').get(2).pause();
                break;

            case 1:
                $('.padcast .item .audio-container .maudio audio').get(0).pause();
                $('.padcast .item .audio-container .maudio audio').get(2).pause();

                break;
            case 2:
                $('.padcast .item .audio-container .maudio audio').get(1).pause();
                $('.padcast .item .audio-container .maudio audio').get(0).pause();
                break;
        }

        $(this).addClass('active');

        $(this).find('.audio-container').removeClass('d-none');
        $(this).find('.audio-container').addClass('d-flex');

        $(this).find('.fa-remove').removeClass('d-none');
        $(this).find('.fa-remove').addClass('d-flex');

    });

    $('.padcast .item .fa-remove').click(function (e) {

        e.stopPropagation();
        e.preventDefault();

        $('.padcast .item.active').find('.audio-container').removeClass('d-flex');
        $('.padcast .item.active').find('.audio-container').addClass('d-none');
        $('.padcast .item.active').removeClass('active');

        const audioNum = $(this).parents('.item').data('audio');

        switch (audioNum) {

            case 0:
                $('.padcast .item .audio-container .maudio audio').get(0).pause();
                break;

            case 1:
                $('.padcast .item .audio-container .maudio audio').get(1).pause();

                break;
            case 2:
                $('.padcast .item .audio-container .maudio audio').get(2).pause();
                break;
        }

        $(this).addClass('d-none');
        $(this).removeClass('d-flex');

    })

    $.ajax({
        type: "GET",
        url: "https://kodoumo.ir/wp-json/wp/v2/get_reviews/",
        dataType: "json",
        async: true,
        success: function (result, status, xhr) {

            movieString = '';
            serialString = '';
            animationString = '';
            tvString = '';
            bookString = '';
            articleString = '';
            gameString = '';

            $.each(result.movies, function (index, value) {

                movieString += `
                                <a href="${value.permalink}" target="_blank">
                                    <div class="col-lg-2 col-sm-4 col-6 mb-3 px-sm-2 px-1 ku-post-card-container">
                                         <div class="card border-0 border-radius-10">
                                             <div class="card-img-top">
                                                                                    <div class="px-0 w-100 post-image">
                                                                                        <img src="${value.image}" class="img-fluid border-0 border-radius-10 w-100 h-100"/>
                                                                                    </div>
                                                                                </div>
                                             <div class="card-body p-2">
                                                                                     <a class="mb-2 d-block text-truncate" href="${value.permalink}" target="_blank">${value.title}</a>
                                                                                    <div class="d-flex flex-row flex-wrap align-items-center justify-content-between w-100 post-info-detail">
                                                                                        <div class="d-flex flex-row align-items-center justify-content-center py-0 px-1 border-radius-10 ku-logo">
                                                                                            <span class="ml-1 ku-age">+ ${value.age}</span>
                                                                                            <img src="img/MiniKoodooMuLogo.png" class="img-fluid" width="20" height="20">
                                                                                        </div>
                                                                                        <div class="px-0">
                                                                                            <div class="movie-${index + 1}" data-rating="${value['rate']}"></div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                             <div class="ku-post-card-cover shadow">
                                                                                    <div class="card-body p-2">
                                                                                        <div class="d-flex flex-column justify-content-between">
                                                                                            <a class="mb-2 d-block" href="${value.permalink}" target="_blank">${value.title}</a>
                                                                                            <div class="d-flex flex-row flex-wrap align-items-center justify-content-between w-100">
                                                                                                <div class="d-flex flex-row align-items-center justify-content-center py-0 px-1 border-radius-10 ku-logo">
                                                                                                    <span class="ml-1 ku-age">+ ${value.age}</span>
                                                                                                    <img src="img/MiniKoodooMuLogo.png" class="img-fluid" width="20" height="20">
                                                                                                </div>
                                                                                                <div class="px-0">
                                                                                                    <div class="movie-${index + 1}" data-rating="${value['rate']}"></div>
                                                                                                </div>
                                                                                            </div>
                                                                                            <p class="font-12 my-3">${value['short-description']}</p>
                                                                                            <div class="d-flex text-white justify-content-center align-items-center border-radius-10 p-2 ku-in">
                                                                                                <a href="${value.permalink}" target="_blank" class="font-12 font-weight-bold d-inline-block w-100 text-center">بررسی کامل در کدومو</a>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                         </div>
                                    </div>
                                </a>`;
            }, 'json');

            $.each(result.serials, function (index, value) {

                serialString += `
                                <a href="${value.permalink}" target="_blank">
                                    <div class="col-lg-2 col-sm-4 col-6 mb-3 px-sm-2 px-1 ku-post-card-container">
                                            <div class="card border-0 border-radius-10">
                                                <div class="card-img-top">
                                                    <div class="px-0 w-100 post-image">
                                                        <img src="${value.image}" class="img-fluid border-0 border-radius-10 w-100 h-100"/>
                                                    </div>
                                                </div>
                                                <div class="card-body p-2">
                                                     <a class="mb-2 d-block text-truncate" href="${value.permalink}" target="_blank">${value.title}</a>
                                                    <div class="d-flex flex-row flex-wrap align-items-center justify-content-between w-100 post-info-detail">
                                                        <div class="d-flex flex-row align-items-center justify-content-center py-0 px-1 border-radius-10 ku-logo">
                                                            <span class="ml-1 ku-age">+ ${value.age}</span>
                                                            <img src="img/MiniKoodooMuLogo.png" class="img-fluid" width="20" height="20">
                                                        </div>
                                                        <div class="px-0">
                                                            <div class="movie-${index + 1}" data-rating="${value['rate']}"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="ku-post-card-cover shadow">
                                                    <div class="card-body p-2">
                                                        <div class="d-flex flex-column justify-content-between">
                                                            <a class="mb-2 d-block" href="${value.permalink}" target="_blank">${value.title}</a>
                                                            <div class="d-flex flex-row flex-wrap align-items-center justify-content-between w-100">
                                                                <div class="d-flex flex-row align-items-center justify-content-center py-0 px-1 border-radius-10 ku-logo">
                                                                    <span class="ml-1 ku-age">+ ${value.age}</span>
                                                                    <img src="img/MiniKoodooMuLogo.png" class="img-fluid" width="20" height="20">
                                                                </div>
                                                                <div class="px-0">
                                                                    <div class="serial-${index + 1}" data-rating="${value['rate']}"></div>
                                                                </div>
                                                            </div>
                                                            <p class="font-12 my-3">${value['short-description']}</p>
                                                            <div class="d-flex text-white justify-content-center align-items-center border-radius-10 p-2 ku-in">
                                                                <a href="${value.permalink}" target="_blank" class="font-12 font-weight-bold d-inline-block w-100 text-center">بررسی کامل در کدومو</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                </a>`;
            }, 'json');

            $.each(result['animations'], function (index, value) {

                animationString += `
                                <a href="${value.permalink}" target="_blank">
                                    <div class="col-lg-2 col-sm-4 col-6 mb-3 px-sm-2 px-1 ku-post-card-container">
                                            <div class="card border-0 border-radius-10">
                                                <div class="card-img-top">
                                                    <div class="px-0 w-100 post-image">
                                                        <img src="${value.image}" class="img-fluid border-0 border-radius-10 w-100 h-100"/>
                                                    </div>
                                                </div>
                                                <div class="card-body p-2">
                                                     <a class="mb-2 d-block text-truncate" href="${value.permalink}" target="_blank">${value.title}</a>
                                                    <div class="d-flex flex-row flex-wrap align-items-center justify-content-between w-100 post-info-detail">
                                                        <div class="d-flex flex-row align-items-center justify-content-center py-0 px-1 border-radius-10 ku-logo">
                                                            <span class="ml-1 ku-age">+ ${value.age}</span>
                                                            <img src="img/MiniKoodooMuLogo.png" class="img-fluid" width="20" height="20">
                                                        </div>
                                                        <div class="px-0">
                                                            <div class="tv-${index + 1}" data-rating="${value['rate']}"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="ku-post-card-cover shadow">
                                                    <div class="card-body p-2">
                                                        <div class="d-flex flex-column justify-content-between">
                                                            <a class="mb-2 d-block" href="${value.permalink}" target="_blank">${value.title}</a>
                                                            <div class="d-flex flex-row flex-wrap align-items-center justify-content-between w-100">
                                                                <div class="d-flex flex-row align-items-center justify-content-center py-0 px-1 border-radius-10 ku-logo">
                                                                    <span class="ml-1 ku-age">+ ${value.age}</span>
                                                                    <img src="img/MiniKoodooMuLogo.png" class="img-fluid" width="20" height="20">
                                                                </div>
                                                                <div class="px-0">
                                                                    <div class="animation-${index + 1}" data-rating="${value['rate']}"></div>
                                                                </div>
                                                            </div>
                                                            <p class="font-12 my-3">${value['short-description']}</p>
                                                            <div class="d-flex text-white justify-content-center align-items-center border-radius-10 p-2 ku-in">
                                                                <a href="${value.permalink}" target="_blank" class="font-12 font-weight-bold d-inline-block w-100 text-center">بررسی کامل در کدومو</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                 </a>`;
            }, 'json');

            $.each(result['tv-shows'], function (index, value) {

                tvString += `
                               <a href="${value.permalink}" target="_blank">
                                 <div class="col-lg-2 col-sm-4 col-6 mb-3 px-sm-2 px-1 ku-post-card-container">
                                            <div class="card border-0 border-radius-10">
                                                <div class="card-img-top">
                                                    <div class="px-0 w-100 post-image">
                                                        <img src="${value.image}" class="img-fluid border-0 border-radius-10 w-100 h-100"/>
                                                    </div>
                                                </div>
                                                <div class="card-body p-2">
                                                     <a class="mb-2 d-block text-truncate" href="${value.permalink}" target="_blank">${value.title}</a>
                                                    <div class="d-flex flex-row flex-wrap align-items-center justify-content-between w-100 post-info-detail">
                                                        <div class="d-flex flex-row align-items-center justify-content-center py-0 px-1 border-radius-10 ku-logo">
                                                            <span class="ml-1 ku-age">+ ${value.age}</span>
                                                            <img src="img/MiniKoodooMuLogo.png" class="img-fluid" width="20" height="20">
                                                        </div>
                                                        <div class="px-0">
                                                            <div class="tv-${index + 1}" data-rating="${value['rate']}"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="ku-post-card-cover shadow">
                                                    <div class="card-body p-2">
                                                        <div class="d-flex flex-column justify-content-between">
                                                            <a class="mb-2 d-block" href="${value.permalink}" target="_blank">${value.title}</a>
                                                            <div class="d-flex flex-row flex-wrap align-items-center justify-content-between w-100">
                                                                <div class="d-flex flex-row align-items-center justify-content-center py-0 px-1 border-radius-10 ku-logo">
                                                                    <span class="ml-1 ku-age">+ ${value.age}</span>
                                                                    <img src="img/MiniKoodooMuLogo.png" class="img-fluid" width="20" height="20">
                                                                </div>
                                                                <div class="px-0">
                                                                    <div class="tv-${index + 1}" data-rating="${value['rate']}"></div>
                                                                </div>
                                                            </div>
                                                            <p class="font-12 my-3">${value['short-description']}</p>
                                                            <div class="d-flex text-white justify-content-center align-items-center border-radius-10 p-2 ku-in">
                                                                <a href="${value.permalink}" target="_blank" class="font-12 font-weight-bold d-inline-block w-100 text-center">بررسی کامل در کدومو</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                               </a>`;
            }, 'json');

            $.each(result.books, function (index, value) {

                bookString += `
                               <a href="${value.permalink}" target="_blank">
                                  <div class="col-lg-2 col-sm-4 col-6 mb-3 px-sm-2 px-1 ku-post-card-container">
                                            <div class="card border-0 border-radius-10">
                                                <div class="card-img-top">
                                                    <div class="px-0 w-100 post-image">
                                                        <img src="${value.image}" class="img-fluid border-0 border-radius-10 w-100 h-100"/>
                                                    </div>
                                                </div>
                                                <div class="card-body p-2">
                                                     <a class="mb-2 d-block text-truncate" href="${value.permalink}" target="_blank">${value.title}</a>
                                                    <div class="d-flex flex-row flex-wrap align-items-center justify-content-between w-100 post-info-detail">
                                                        <div class="d-flex flex-row align-items-center justify-content-center py-0 px-1 border-radius-10 ku-logo">
                                                            <span class="ml-1 ku-age">+ ${value.age}</span>
                                                            <img src="img/MiniKoodooMuLogo.png" class="img-fluid" width="20" height="20">
                                                        </div>
                                                        <div class="px-0">
                                                            <div class="book-${index + 1}" data-rating="${value['rate']}"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="ku-post-card-cover shadow">
                                                    <div class="card-body p-2">
                                                        <div class="d-flex flex-column justify-content-between">
                                                            <a class="mb-2 d-block" href="${value.permalink}" target="_blank">${value.title}</a>
                                                            <div class="d-flex flex-row flex-wrap align-items-center justify-content-between w-100">
                                                                <div class="d-flex flex-row align-items-center justify-content-center py-0 px-1 border-radius-10 ku-logo">
                                                                    <span class="ml-1 ku-age">+ ${value.age}</span>
                                                                    <img src="img/MiniKoodooMuLogo.png" class="img-fluid" width="20" height="20">
                                                                </div>
                                                                <div class="px-0">
                                                                    <div class="book-${index + 1}" data-rating="${value['rate']}"></div>
                                                                </div>
                                                            </div>
                                                            <p class="font-12 my-3">${value['short-description']}</p>
                                                            <div class="d-flex text-white justify-content-center align-items-center border-radius-10 p-2 ku-in">
                                                                <a href="${value.permalink}" target="_blank" class="font-12 font-weight-bold d-inline-block w-100 text-center">بررسی کامل در کدومو</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                </a>`;
            }, 'json');

            $.each(result.games, function (index, value) {

                gameString += `
                               <a href="${value.permalink}" target="_blank">
                                  <div class="col-lg-2 col-sm-4 col-6 mb-3 px-sm-2 px-1 ku-post-card-container">
                                            <div class="card border-0 border-radius-10">
                                                <div class="card-img-top">
                                                    <div class="px-0 w-100 post-image">
                                                        <img src="${value.image}" class="img-fluid border-0 border-radius-10 w-100 h-100"/>
                                                    </div>
                                                </div>
                                                <div class="card-body p-2">
                                                     <a class="mb-2 d-block text-truncate" href="${value.permalink}" target="_blank">${value.title}</a>
                                                    <div class="d-flex flex-row flex-wrap align-items-center justify-content-between w-100 post-info-detail">
                                                        <div class="d-flex flex-row align-items-center justify-content-center py-0 px-1 border-radius-10 ku-logo">
                                                            <span class="ml-1 ku-age">+ ${value.age}</span>
                                                            <img src="img/MiniKoodooMuLogo.png" class="img-fluid" width="20" height="20">
                                                        </div>
                                                        <div class="px-0">
                                                            <div class="game-${index + 1}" data-rating="${value['rate']}"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="ku-post-card-cover shadow">
                                                    <div class="card-body p-2">
                                                        <div class="d-flex flex-column justify-content-between">
                                                            <a class="mb-2 d-block" href="${value.permalink}" target="_blank">${value.title}</a>
                                                            <div class="d-flex flex-row flex-wrap align-items-center justify-content-between w-100">
                                                                <div class="d-flex flex-row align-items-center justify-content-center py-0 px-1 border-radius-10 ku-logo">
                                                                    <span class="ml-1 ku-age">+ ${value.age}</span>
                                                                    <img src="img/MiniKoodooMuLogo.png" class="img-fluid" width="20" height="20">
                                                                </div>
                                                                <div class="px-0">
                                                                    <div class="game-${index + 1}" data-rating="${value['rate']}"></div>
                                                                </div>
                                                            </div>
                                                            <p class="font-12 my-3">${value['short-description']}</p>
                                                            <div class="d-flex text-white justify-content-center align-items-center border-radius-10 p-2 ku-in">
                                                                <a href="${value.permalink}" target="_blank" class="font-12 font-weight-bold d-inline-block w-100 text-center">بررسی کامل در کدومو</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                               </a>`;
            }, 'json');

            $('#film').html(`<div class="d-flex flex-row flex-wrap w-100 align-items-stretch justify-content-start">${movieString}</div>`);

            $('#serial').html(`<div class="d-flex flex-row flex-wrap w-100 align-items-stretch justify-content-start">${serialString}</div>`);

            $('#animation').html(`<div class="d-flex flex-row flex-wrap w-100 align-items-stretch justify-content-start">${animationString}</div>`);

            $('#tv').html(`<div class="d-flex flex-row flex-wrap w-100 align-items-stretch justify-content-start">${tvString}</div>`);

            $('#book').html(`<div class="d-flex flex-row flex-wrap w-100 align-items-stretch justify-content-start">${bookString}</div>`);

            $('#game').html(`<div class="d-flex flex-row flex-wrap w-100 align-items-stretch justify-content-start">${gameString}</div>`);

            var childControl = `
                        <div class="col-lg-2 col-sm-4 col-6 mb-3 ku-post-card-container ku-child-container px-sm-2 px-1">
                            <div class="card border-0 border-radius-10">
                                <div class="px-0 w-100 border-radius-10 d-flex flex-column justify-content-between px-3 py-2 top">
                                    <span class="text-center account">عضویت</span>
                                    <p class="text-center child-age">فرزند شما چند سال داره</p>
                                    <div class="d-flex flex-row justify-content-center align-items-center text-white font-weight-bold">
                                        <span class="mdi mdi-plus-box-outline font-25"></span>
                                        <p class="font-40 mx-3 your-child-age">${chAge}</p>
                                        <span class="mdi mdi-minus-box-outline font-25"></span>
                                    </div>
                                    <p class="text-center text-white font-12">فیلم،بازی و محتوای مناسب با سن فرزند خودببینید</p>
                                    <div class="d-flex text-white justify-content-center align-items-center border-radius-10 p-2 w-100 mt-3 mt-sm-1 start">
                                        <span class="font-12 font-weight-bold d-inline w-100 start-children-age text-center">شروع کنید</span>
                                    </div>
                                </div>
                                <div class="card-body p-2 my-2 text-center cursor-pointer">
                                    <a href="https://kodoumo.ir/" target="_blank" class="d-inline-block w-100 h-100">کدومو رو بیشتر بشناسید</a>
                                </div>
                            </div>
                        </div>`;

            $('.ku-tab-content > div').append(childControl);

            const options = {
                totalStars: 5,
                emptyColor: 'lightgray',
                activeColor: '#218555',
                strokeWidth: 0,
                useGradient: false,
                readOnly: true,
                starSize: 13,
            };

            $('.movie-1').starRating(options);

            $('.movie-2').starRating(options);

            $('.movie-3').starRating(options);

            $('.movie-4').starRating(options);

            $('.movie-5').starRating(options);

            $('.serial-1').starRating(options);

            $('.serial-2').starRating(options);

            $('.serial-3').starRating(options);

            $('.serial-4').starRating(options);

            $('.serial-5').starRating(options);

            $('.animation-1').starRating(options);

            $('.animation-2').starRating(options);

            $('.animation-3').starRating(options);

            $('.animation-4').starRating(options);

            $('.animation-5').starRating(options);

            $('.tv-1').starRating(options);

            $('.tv-2').starRating(options);

            $('.tv-3').starRating(options);

            $('.tv-4').starRating(options);

            $('.tv-5').starRating(options);

            $('.book-1').starRating(options);

            $('.book-2').starRating(options);

            $('.book-3').starRating(options);

            $('.book-4').starRating(options);

            $('.book-5').starRating(options);

            $('.game-1').starRating(options);

            $('.game-2').starRating(options);

            $('.game-3').starRating(options);

            $('.game-4').starRating(options);

            $('.game-5').starRating(options);

        }, error: function (xhr, status, error) {
            alert("Result: " + status + " " + error + " " + xhr.status + " " + xhr.statusText)
        }
    });

    $('.calendar').click(function (e) {

        if ($(window).width() < 576) {

            window.open('https://google.com', '_blank')
        }
        e.stopPropagation();
    });

    $('.weather').click(function (e) {

        if ($(window).width() < 576) {

            window.open('https://google.com', '_blank')
        }
        e.stopPropagation();
    });

    $('.calendar').hover(function (e) {

        if ($(window).width() >= 576) {
            $(this).find('.dropdown-menu').stop(true, true).delay(200).fadeIn(500);
        }
        e.preventDefault();
    }, function () {
        $(this).find('.dropdown-menu').stop(true, true).delay(200).fadeOut(500);
    });

    $('.weather').hover(function (e) {

        if ($(window).width() >= 576) {
            $(this).find('.dropdown-menu').stop(true, true).delay(200).fadeIn(500);
        }
        e.preventDefault();
    }, function () {

        $(this).find('.dropdown-menu').stop(true, true).delay(200).fadeOut(500);
    });

    $('.owl-first .item-container').hover(function () {

        const color = $(this).find('.hidden-layer').css('background-color');

        $(this).find('.card').css('background-color', color);

    }, function () {

        $(this).find('.card').css('background-color', 'white');
    });

    $('.fa-play-circle').click(function () {

        $('video').get(0).play();

        $('.ckin__player.default.ckin__overlay').addClass('is-playing');

        $('.fa-play-circle').addClass('d-none');
        $('.fa-play-circle').removeClass('d-inline-block');

        $('.fa-pause-circle').addClass('d-inline-block');
        $('.fa-pause-circle').removeClass('d-none');
    });

    $('.fa-pause-circle').click(function () {

        $('video').get(0).pause();

        $('.ckin__player.default.ckin__overlay.is-playing').removeClass('is-playing');

        $('.fa-play-circle').addClass('d-inline-block');
        $('.fa-play-circle').removeClass('d-none');

        $('.fa-pause-circle').addClass('d-none');
        $('.fa-pause-circle').removeClass('d-inline-block');
    });

    $('video').on('play', function () {

        $('.fa-play-circle').addClass('d-none');
        $('.fa-play-circle').removeClass('d-inline-block');

        $('.fa-pause-circle').addClass('d-inline-block');
        $('.fa-pause-circle').removeClass('d-none');

    });

    $('video').on('pause', function () {

        $('.fa-play-circle').addClass('d-inline-block');
        $('.fa-play-circle').removeClass('d-none');

        $('.fa-pause-circle').addClass('d-none');
        $('.fa-pause-circle').removeClass('d-inline-block');
    });

    var chAge = 6;

    $('.ku-tab-content').on('click', '.ku-child-container .mdi-minus-box-outline', function () {

        var age = parseInt($(this).parents('.ku-child-container').find('.your-child-age').text());

        if (age > 2 && age <= 18) {

            age--;

            $('.ku-post-card-container').find('.your-child-age').text(age);

        } else {

            e.preventDefault();
        }
    });

    $('.ku-tab-content').on('click', '.ku-child-container .mdi-plus-box-outline', function () {

        var age = parseInt($(this).parents('.ku-child-container').find('.your-child-age').text());

        if (age >= 2 && age < 18) {

            age++;

            $('.ku-post-card-container').find('.your-child-age').text(age);

        } else {

            e.preventDefault();
        }
    });

    $('.ku-tab-content').on('click', '.ku-child-container .start-children-age', function () {

        var age = $('.ku-post-card-container').find('.your-child-age').text();

        let uniAge = 0;

        if (age.length === 6) {
            uniAge = age.substring(0, 1);
        }
        if (age.length === 12) {
            uniAge = age.substring(0, 2);
        }

        window.open('https://kodoumo.ir/item_age_category/' + uniAge, '_blank');
    });

    $.ajax({
        type: "GET",
        url: "https://porsan.ir/api/v1/Tebyan/Vitrin",
        dataType: "json",
        async: true,
        success: function (result, status, xhr) {

            porsanString = '';

            porsanArr = [...result.latest, ...result.top];

            $.each(porsanArr, function (index, value) {

                porsanString += `
                                                <div class="col-lg-6 d-flex flex-column p-1 justify-content-between">
                                                    <div class="porsan-tab-item p-2 h-100">
                                                        <div class="d-flex flex-row align-items-center justify-content-between">
                                                            <div class="d-flex flex-row justify-content-start align-items-stretch flex-grow-1">
                                                                <div class="d-flex align-items-center justify-content-center p-1 circle-number">
                                                                    <img src="${value['user']['profileImageUrl']}">
                                                                </div>
<!--                                                                <i class="mdi mdi-plus-circle plus shadow d-flex align-items-center"></i>-->
                                                                <div class="d-flex flex-column justify-content-around align-items-start mr-2 font-weight-bold">
                                                                    <span class="font-12">${value['user']['fullName']}</span>
                                                                    <span class="font-12 my-problem">مشکل منم هست</span>
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <span class="d-flex align-items-center justify-content-center p-2 ml-3 arrow-container">
                                                                    <a href="${value['porsan_url']}" target="_blank">
                                                                    <i class="mdi mdi-arrow-left d-flex justify-content-center align-items-center"></i>
                                                                    </a>
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div class="mt-4 text-justify px-3 font-weight-bold summary">
                                                            <p>${value['question']}</p>
                                                        </div>
                                                    </div>
                                                </div>
                `;

            }, 'json');

            $('.porsan-container > div').html(`${porsanString}`);

        }, error: function (xhr, status, error) {
            alert("Result: " + status + " " + error + " " + xhr.status + " " + xhr.statusText)
        }
    });

    var tabChange = function () {

        var tabs = $(".tebyan-services-tab > li");

        var active = tabs.filter(".active").removeClass("active");

        var next = active.next("li").length
            ? active.next("li")
            : tabs.filter(":first-child")

        next.addClass("active").find('a').tab("show")

    };

    var tabCycle = setInterval(tabChange, 5000);

    $(function () {
        $('.tebyan-services-tab .nav-item').click(function (tab) {
            if (tab.target.children.length > 0 && tab.target.children[0].getAttribute('href')) {
                clearInterval(tabCycle);
                var tabName = tab.target.children[0].getAttribute('href');
                $('.tebyan-services-tab').find(' a[href="' + tabName + '"]').tab('show');
                $('.tebyan-services-tab .nav-item').removeClass('active');
                $(this).addClass('active');
                tabCycle = setInterval(tabChange, 5000);
            }
        });
    });

    $(function () {
        $(".tebyan-services-tab a").click(function (e) {
            e.preventDefault();
            $(".tebyan-services-tab .active").removeClass("active");
            clearInterval(tabCycle);
            $(this).tab("show");
            $(this).parent().addClass("active");
            tabCycle = setInterval(tabChange, 5000);
        });
    });

    var kudumoTabChange = function () {

        var tabs = $(".koodoomu-tab > li");

        var active = tabs.filter(".active").removeClass("active");

        var next = active.next("li").length
            ? active.next("li")
            : tabs.filter(":first-child")

        next.addClass("active").find('a').tab("show")

    };

    var kudumoTabCycle = setInterval(kudumoTabChange, 5000);

    $(function () {
        $('.koodoomu-tab li').click(function (tab) {
            if (tab.target.children.length > 0 && tab.target.children[0].getAttribute('href')) {
                clearInterval(kudumoTabCycle);
                var tabName = tab.target.children[0].getAttribute('href');
                $('.koodoomu-tab').find(' a[href="' + tabName + '"]').tab('show');
                $('.koodoomu-tab li').removeClass('active');
                $(this).addClass('active');
                kudumoTabCycle = setInterval(kudumoTabChange, 5000);
            }
        });
    });

    $(function () {
        $(".koodoomu-tab a").click(function (e) {
            e.preventDefault();
            clearInterval(kudumoTabCycle);
            $(".koodoomu-tab li.active").removeClass("active");
            $(this).tab("show");
            $(this).parent().addClass("active");
            kudumoTabCycle = setInterval(kudumoTabChange, 5000);
        });
    });


    $('.ku-tab-content-container > div').hover(function () {
        clearInterval(kudumoTabCycle);
    }, function () {
        kudumoTabCycle = setInterval(kudumoTabChange, 5000);
    })

    $('.services-tab-content > div').hover(function () {
        clearInterval(tabCycle);
    }, function () {
        tabCycle = setInterval(tabChange, 5000);
    });


    $.ajax({
        type: "GET",
        url: "https://api.ipify.org?format=json",
        dataType: "json",
        async: true,
        success: function (result, status, xhr) {
            $.ajax({
                type: "GET",
                url: `https://tebyansmart.com/api/weather-ip.php?ip=${result.ip}`,
                dataType: "json",
                async: true,
                success: function (data, status, xhr) {
                    let weekdays = '';
                    $('.my-location').append(`<span class="font-weight-bold font-18">${data.city}</span>`);
                    $('.today-temp-desc').text(`امروز ${data.list[0].dayName} وضعیت هوا ${data.list[0].description} است`);
                    $('.today-temp-logo').append(`<img src="${data.list[0].icon}" class="img-fluid" width="90" height="90">`);
                    $(`<span class="font-weight-bold main-color font-40">${Math.ceil(data.list[0]['temp'])}</span>`).insertBefore('.degree-sign');
                    $('.umbrella').parent().parent().append(`<span class="font-12">% ${data.list[0].humidity}</span>`);
                    $('.wind').parent().parent().append(`<span class="font-12">${data.list[0]['wind-speed']}<span>km/h</span></span>`);
                    $.each(data.list, function (index, value) {
                        weekdays += `
                                             <div class="col-2 p-1 week-day-wrapper">
                                                <div class="d-flex flex-column align-items-center justify-content-center">
                                                    <span class="week-day">${value.dayName}</span>
                                                    <span class="my-2"><img src="${value.icon}" width="30" height="30"></span>
                                                    <div class="d-flex flex-row">
                                                        <span>&deg;</span>
                                                        <span class="degree">${Math.ceil(value.temp_max)}</span>
                                                        <span>-</span>
                                                        <span>&deg;</span>
                                                        <span class="degree">${Math.ceil(value.temp_min)}</span>
                                                    </div>
                                                </div>
                                            </div>`;
                    });
                    $('.weekdays-container').html(weekdays);
                }, error: function (xhr, status, error) {
                    alert("Result: " + status + " " + error + " " + xhr.status + " " + xhr.statusText)
                }
            })
        }, error: function (xhr, status, error) {
            alert("Result: " + status + " " + error + " " + xhr.status + " " + xhr.statusText)
        }
    });

    $.ajax({
        type: "GET",
        url: "https://tebyansmart.com/api/events.php",
        dataType: "json",
        async: true,
        success: function (result, status, xhr) {
            const events = [...result.events.hijri, ...result.events.shamsi];
            if (events && events.length > 0) {
                $('.event-title').text(events[0]);
                if (events.length > 1) {
                    setInterval(() => {
                        const index = Math.floor(Math.random() * events.length - 1) + 1;
                        const event = events[index];
                        $('.event-title').text(event);
                    }, 300000)
                }
            }
        }, error: function (xhr, status, error) {
            alert("Result: " + status + " " + error + " " + xhr.status + " " + xhr.statusText)
        }
    });
});

