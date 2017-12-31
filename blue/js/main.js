jQuery( document ).ready(function( $ ) {
    function closeOverlay() {
        $('.overlay').animate({
            top : '-=300',
            opacity : 0
        }, 400, function() {
            $('#overlay-shade').fadeOut(300);
            $(this).css('display','none');
        });
    }

    function openOverlay(olEl) {
        $oLay = $(olEl);

        if ($('#overlay-shade').length == 0)
            $('body').prepend('<div id="overlay-shade"></div>');

        $('#overlay-shade').fadeTo(300, 0.6, function() {
            var leftPos = ($(window).width() - $oLay.width()) / 2;
            var topPos = ($(window).height() - $oLay.height()) / 2;

            $oLay
                .css({
                    display : 'block',
                    opacity : 0,
                    top: 0
                })
                .animate({
                    top: topPos+'px',
                    opacity : 1
                }, 600);
        });
    }

    $(window).resize(function() {
        if ($(window).width() > "480") $("menu").show();
    });

    $('#overlay-shade, .overlay a').on('click', function(e) {
        closeOverlay();
        if ($(this).attr('href') == '#') e.preventDefault();
    });

    $('#btn-donate').on('click', function(e) {
        openOverlay('#overlay-donations');
        e.preventDefault();
    });

    $(document).click(function(event) {
        if(!$(event.target).closest('#overlay-donations').length) {
            if($('#overlay-donations').is(":visible")) {
                closeOverlay();
            }
        }
    })
});
// C

