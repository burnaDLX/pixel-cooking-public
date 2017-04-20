 $(document).ready(function() {

    $(window).scroll(function () {

        if ($(this).scrollTop() > 350)
            $('.scrollup-btn').fadeIn();
        else
            $('.scrollup-btn').fadeOut();
    });


    $('.scrollup-btn').click(function () {

        $("html, body").animate({scrollTop: 0}, 500);
        return false;
    });

 });


