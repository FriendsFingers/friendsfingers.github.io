(function($) {
    "use strict"; // Start of use strict

    // Smooth scrolling using jQuery easing
    $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html, body').animate({
                    scrollTop: (target.offset().top - 48)
                }, 600);
                return false;
            }
        }
    });

    // Closes responsive menu when a scroll trigger link is clicked
    $('.js-scroll-trigger').click(function() {
        $('.navbar-collapse').collapse('hide');
    });

    // Activate scrollspy to add active class to navbar items on scroll
    // $('body').scrollspy({
    //     target: '#mainNav',
    //     offset: 54
    // });

    // Collapse Navbar
    var navbarCollapse = function() {
        if ($("#mainNav").offset().top > 100) {
            $("#mainNav").addClass("navbar-shrink");
        } else {
            $("#mainNav").removeClass("navbar-shrink");
        }
    };
    // Collapse now if page is not at top
    navbarCollapse();
    // Collapse the navbar when page is scrolled
    $(window).scroll(navbarCollapse);

    if (page === 'bounty-program') {
        const web3Util = (typeof web3 !== 'undefined') ? web3 :new Web3();

        Vue.use(VeeValidate);

        new Vue({
            el: '#bounty-program',
            data: {
                address_error: false,
                copied: false,
                wallet: '',
                email: '',
                telegram: '',
                postlink: ''
            },
            methods: {
                subscribeBounty: function () {
                    this.address_error = (this.wallet !== '' && !web3Util.isAddress(this.wallet));

                    if (this.address_error) {
                        return;
                    }

                    this.$validator.validateAll().then(function (result) {

                        if (result) {
                            $('#mc-embedded-subscribe-form').submit();
                        } else {
                            console.log("some errors");
                        }
                    });
                },
                copyLink: function () {
                    if (this.wallet !== '' && !this.address_error) {
                        document.querySelector("#mce-LINK").select();
                        try {
                            this.copied = document.execCommand("copy");
                        } catch (err) {
                            this.copied = false;
                        }
                    }
                }
            },
            computed: {
                generateLink: function () {
                    this.address_error = (this.wallet !== '' && !web3Util.isAddress(this.wallet));
                    return (this.wallet === '' || this.address_error) ? '' : "https://www.friendsfingers.com/?utm_campaign=bounty&utm_source=" + this.wallet;
                }
            }
        });
    }

})(jQuery); // End of use strict
