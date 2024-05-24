function campaignTemplate() {
    $("body.js__loading") && (setTimeout((function() {
        $("#loading-logo").addClass("fadeout"),
        $(".foreground").removeClass("fadeout")
    }
    ), 250),
    setTimeout((function() {
        $(".hero-image__img-wrapper").removeClass("zoom")
    }
    ), 500),
    setTimeout((function() {
        $(".hero-image__title .swipeEffect").addClass("is-active"),
        $(".hero-image .hero-image__actions a").each((function(e) {
            timeout = 200 * (e + 1),
            setTimeout((function() {
                $(".hero-image .hero-image__actions a:eq(" + e + ")").removeClass("fadeout")
            }
            ), timeout)
        }
        ))
    }
    ), 750),
    setTimeout((function() {
        $("header").removeClass("fadeout"),
        $("header .css-logo").removeClass("loading"),
        $("footer").removeClass("fadeout"),
        $(".background__gradient").removeClass("fadeout")
    }
    ), 1750))
}

function pageFooterPage() {}
function pageFront() {
    $("body.js__loading") && (setTimeout((function() {
        $("#loading-logo").addClass("fadeout"),
        $(".foreground").removeClass("fadeout")
    }
    ), 250),
    setTimeout((function() {
        $(".hero-image__img-wrapper").removeClass("zoom")
    }
    ), 500),
    setTimeout((function() {
        $(".hero-image__title .swipeEffect").addClass("is-active"),
        $(".hero-image .hero-image__actions a").each((function(e) {
            timeout = 200 * (e + 1),
            setTimeout((function() {
                $(".hero-image .hero-image__actions a:eq(" + e + ")").removeClass("fadeout")
            }
            ), timeout)
        }
        ))
    }
    ), 750),
    setTimeout((function() {
        $("header").removeClass("fadeout"),
        $("header .css-logo").removeClass("loading"),
        $("footer").removeClass("fadeout"),
        $(".background__gradient").removeClass("fadeout")
    }
    ), 1750)),
    $(".js__background-change").each((function() {
        var e = $(this).data("colour");
        $(this).find(".js__match-colour").css("background-color", e)
    }
    ));
    var e = .85 * $(window).height()
      , t = .85 * $(window).height()
      , i = "#000"
      , n = ""
      , o = 0
      , s = 1;
    $(".js__background-change").length && (firstSlide = $(".js__background-change").first(),
    i = firstSlide.data("colour"),
    n = $(window).width() < 992 ? firstSlide.data("image-mobile") : firstSlide.data("image"),
    changeBackground(i, n)),
    $(window).scroll((function() {
        var r = getCurrentScroll();
        s = r > o ? 1 : 0,
        r > o ? 0 : 1,
        o = r,
        $(".js__background-change").each((function(o) {
            if (1 == $(this).data("active")) {
                const o = s ? $(this).next() : $(this).prev();
                if (o.length && o.hasClass("js__background-change")) {
                    (s ? o.offset().top - e < r : o.offset().top + t > r) && (i = o.data("colour"),
                    n = $(window).width() < 992 ? o.data("image-mobile") : o.data("image"),
                    $(this).data("colour") == i && $(this).data("image") == n || changeBackground(i, n),
                    $(this).data("active", 0),
                    o.data("active", 1))
                }
            } else
                $(this).removeClass("active")
        }
        ))
    }
    ));
    var r = $(".hero-image").outerHeight() / 3;
    if ($(window).scrollTop() >= r) {
        var a = 99999;
        $(".js__background-change").each((function() {
            $(this).data("active", 0),
            currentDistance = $(this).offset().top - $(window).scrollTop() + $(window).height(),
            currentDistance < a && currentDistance < $(window).height() && currentDistance > 0 && (a = currentDistance,
            newSlide = $(this),
            i = newSlide.data("colour"),
            n = newSlide.data("image"))
        }
        )),
        newSlide.data("active", 1),
        changeBackground(i, n)
    }
}

function scrollBelowSection() {
    $('.js__scroll-below-section').on('click', function(e) {
        e.preventDefault();

        const parent = $(this).closest('.js__scroll-below-section-parent')
        if (!parent) return;

        const target = parent.next();

        if (target) {
            $('html, body').animate({
                scrollTop: target.offset().top
            }, 500, "swing");
        }
    })
}

$(document).ready((function() {
    init()
}
));
var getUrlParameter = function(e) {
    var t, i, n = decodeURIComponent(window.location.search.substring(1)).split("&");
    for (i = 0; i < n.length; i++)
        if ((t = n[i].split("="))[0] === e)
            return void 0 === t[1] || t[1]
}
  , backgroundImage = new Image;function changeBackground(e, t) {
    $(".background .background__image").addClass("fadeout parrallaxlock"),
    setTimeout((function() {
        $(".background .background__colour").css("background-color", e),
        $(".background .background__image").removeClass("parrallaxlock"),
        t > "" && (backgroundImage.src = t,
        backgroundImage.onload = fadeBackgroundIn)
    }
    ), 250)
}

function fadeBackgroundIn() {
    console.log("New background image loaded"),
    $(".background .background__image img").attr("src", backgroundImage.src),
    $(".background .background__image").removeClass("fadeout")
}
function backgroundParallax() {
    $(window).scroll((function() {
        var e = getCurrentScroll() / -15;
        $(".background .background__image").hasClass("parrallaxlock") || $(".background .background__image img").stop().css("transform", "translateY(" + e + "px)")
    }
    ))
}
function contentOut() {
    $(".foreground").addClass("fadeout"),
    $("footer").addClass("fadeout"),
    $(".background__gradient").addClass("fadeout"),
    $("header .css-logo").addClass("loading")
}
function contentIn() {
    $("header .css-logo").removeClass("loading"),
    $(".foreground").removeClass("fadeout"),
    $("footer").removeClass("fadeout"),
    $(".background__gradient").removeClass("fadeout")
}
function getCurrentScroll() {
    return window.pageYOffset || document.documentElement.scrollTop
}