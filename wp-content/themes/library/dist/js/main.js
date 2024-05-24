/*! jQuery v3.2.1 | (c) JS Foundation and other contributors | jquery.org/license */
function pageAboutUs() {
    $(window).scroll((function() {
        var e = amountscrolled();
        $(".illustrated-map").stop().css("background-position", "50% " + (e - 15) + "%"),
        $(this).scrollTop() > 600 && $(".about-arrow").css("opacity", 0)
    }
    )),
    $(window).scrollTop() > 600 && $(".about-arrow").css("opacity", 0)
}
function pageBook() {
    function e(e) {
        $(".book__input .ls__input-wrapper").removeClass("geo-loading"),
        $("#js__book-search-input").val(e.coords.latitude + "," + e.coords.longitude),
        phoToGoSearch()
    }
    function t() {
        console.log("Geo location failed/timed out"),
        $(".book__input .ls__input-wrapper").removeClass("geo-loading"),
        alert("Geolocation search unavailable, please use the manual search")
    }
    function i() {
        $(".all-locations-container").removeClass("is-active");
        var e = $("#js__book-search-input").val()
          , t = $("main").data("site-url") + "/wp-content/themes/pho-2018/library/php/location-search.php";
        $(".book__input .ls__input-wrapper").addClass("loading"),
        e > "" && !currentlySearching && (currentlySearching = !0,
        $.ajax({
            url: t,
            type: "GET",
            dataType: "json",
            data: "search=" + e,
            success: function(e) {
                if (e.locations && e.locations.length > 0) {
                    window.dataLayer = window.dataLayer || [],
                    window.dataLayer.push({
                        event: "bookSearch"
                    }),
                    $(".book").removeClass("is-active"),
                    $(".book-results").removeClass("inactive"),
                    $(".book, .all-locations-container").addClass("inactive"),
                    $(".book__input .ls__input-wrapper").removeClass("loading");
                    var t = $(".search-results");
                    $(".booking-modal");
                    t.html("");
                    $.each(e.locations, (function(i) {
                        if (liClass = 0 == i ? "active" : "",
                        e.locations[i].reservations_url > "")
                            canBook = "<p class='can-book yes'><img src='" + $("main").data("site-url") + "/wp-content/themes/pho-2018/library/images/green-tick.png' alt='Green Tick Image' /> We take reservations</p>",
                            bookButton = '<a class="button" target="_blank" href="' + e.locations[i].reservations_url + '">Book Now</a>';
                        else if (e.locations[i].reservations > "") {
                            $('.data-book-widget[data-location-id="' + e.locations[i].id + '"]').length,
                            canBook = "<p class='can-book yes'><img src='" + $("main").data("site-url") + "/wp-content/themes/pho-2018/library/images/green-tick.png' alt='Green Tick Image' /> We take reservations</p>",
                            bookButton = '<a class="button" href="/locations/' + this.title.replace(/\s+/g, "-").toLowerCase() + '">Book Now</a>'
                        } else
                            canBook = "<p class='can-book no'></p>",
                            bookButton = "";
                        t.append('<li data-address="' + this.address.replace(/(<([^>]+)>)/gi, " ") + '" data-lat="' + this.lat + '" data-long="' + this.long + '" class="' + liClass + '"> <p>' + this.title + "</p> <span>" + this.distance + ' miles</span> <a class="ajax__ignore" href="' + this.url + '"">MORE INFO</a> <div class="extra-info">' + canBook + '<div class="book-actions"><a href="/menus" class="button dead-link">View Menu</a>' + bookButton + '</div><div class="row contact-details"><div class="col-6">' + this.leftCol + '</div><div class="col-6">' + this.rightCol + "</div></div></div></li>")
                    }
                    ));
                    var i = $(".remodal-overlay")
                      , n = $("[data-remodal-id=modal-book]");
                    $(".modal-opener-book").click((function() {
                        console.log("modal opener clicked"),
                        n.addClass("is-active"),
                        $(".data-book-widget.is-active").removeClass("is-active"),
                        $(".data-book-widget--" + $(this).data("target-location")).addClass("is-active"),
                        i.addClass("is-active"),
                        n.parent(".remodal-wrapper").show()
                    }
                    )),
                    $(".remodal-overlay").click((function() {
                        i.removeClass("is-active")
                    }
                    )),
                    $(".js__results-map").addClass("loading");
                    const o = "https://www.google.co.uk/maps/search/Pho, " + e.locations[0].address.replace(/(<([^>]+)>)/gi, " ");
                    $(".js__results-map a").attr("href", o),
                    setTimeout((function() {
                        $(".js__results-map").removeClass("loading")
                    }
                    ), 750),
                    currentlySearching = !1
                } else
                    $(".book__input .ls__input-wrapper .search-error p").text("Search address not recognised, please try alternative"),
                    $(".book__input .ls__input-wrapper").removeClass("loading"),
                    $(".book__input .ls__input-wrapper").addClass("error"),
                    currentlySearching = !1
            },
            error: function(e, t, i) {
                $(".book__input .ls__input-wrapper .search-error p").text("An error occured, please try refreshing the page!"),
                $(".book__input .ls__input-wrapper").removeClass("loading"),
                $(".book__input .ls__input-wrapper").addClass("error"),
                currentlySearching = !1,
                console.log("Client side ajax failed")
            }
        }))
    }
    $(".ls__view-all").click((function() {
        $(".grey-background").hide(),
        $(".book__wrapper").addClass("no-max-height"),
        $(".all-locations-container").addClass("is-active"),
        $(".location-search").addClass("is-active"),
        $(".all-locations-container").removeClass("inactive"),
        $("html, body").animate({
            scrollTop: $(".location-search").offset().top + 275
        }, 500, "swing")
    }
    )),
    $("#js__location-geolocation").on("click touch", (function() {
        if ($(".book__input .ls__input-wrapper").addClass("geo-loading"),
        navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(e, t, {
                enableHighAccuracy: !0,
                timeout: 2500,
                maximumAge: 0
            })
        } else
            t()
    }
    )),
    $("body").on("keypress", (function(e) {
        13 == e.which && $(".js__book-search-submit").length && i()
    }
    )),
    $("body").on("click", ".js__book-search-submit", (function(e) {
        i()
    }
    )),
    $(".search-results").on("click", "li", (function(e) {
        addingPin || $(this).hasClass("active") || ($(".search-results li").removeClass("active"),
        $(this).addClass("active"),
        $(".js__results-map").addClass("loading"),
        $(".js__results-map a").attr("href", $(this).data("address")),
        setTimeout((function() {
            addingPin = !1,
            $(".js__results-map").removeClass("loading")
        }
        ), 750))
    }
    ))
}
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
function pageCareers() {
    $(".js-featured-jobs-slider").slick({
        arrows: !0,
        infinite: !0,
        slidesToShow: 1,
        centerMode: !0,
        autoplay: !0,
        variableWidth: !0
    })
}
function pageContact() {
    $(".js__contact-select").click((function() {
        $(this).addClass("selected")
    }
    )),
    $("#js__contact-form").submit((function(e) {
        e.preventDefault();
        const t = $("#js__contact-form");
        grecaptcha.ready((function() {
            grecaptcha.execute("6LctaCgaAAAAADYB53BAofBKsilG94zU6PYIMghi", {
                action: "contact_form_submit"
            }).then((function(e) {
                t.prepend('<input type="hidden" name="token" value="' + e + '">'),
                t.prepend('<input type="hidden" name="action" value="contact_form_submit">'),
                t.addClass("loading"),
                $.ajax({
                    url: t.attr("action"),
                    type: "POST",
                    dataType: "HTML",
                    data: t.serializeArray(),
                    success: function(e) {
                        "success" == e ? (t.removeClass("loading").addClass("success"),
                        $(".form-inner").html('<div class="form-text mt-4"><p class="form-feedback">Message submitted succesfully! </p></div>')) : (t.removeClass("loading").addClass("error"),
                        $(".form-inner").html('<div class="form-text mt-4"><p class="form-feedback">Error with submitting form, please refresh the page and try again </p></div>'))
                    },
                    error: function(e, i, n) {
                        t.removeClass("loading").addClass("error"),
                        $(".form-inner").html('<div class="form-text mt-4"><p class="form-feedback">Error with submitting form, please refresh the page and try again </p></div>')
                    }
                })
            }
            ))
        }
        ))
    }
    ))
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
function pageJanCampaign() {
    $(".js-students-carousel").slick({
        arrows: !0,
        dots: !1,
        infinite: !0,
        slidesToShow: 1,
        centerMode: !1
    });
    var e = $(".january-campaign-carousel .__box--image").height() / 2;
    $(".january-campaign-carousel button").css("top", e),
    $(window).resize((function() {
        var e = $(".january-campaign-carousel .__box--image").height() / 2;
        $(".january-campaign-carousel button").css("top", e)
    }
    ))
}
function pageJingleBowls() {
    if ($(".jb-slider__slider").length) {
        function e(e=0) {
            if ($(window).innerWidth() >= 992) {
                const t = e + 1;
                $(".jb-slider__slider .slick-slide").removeClass("is-middle-slide"),
                $(`.jb-slider__slider .slick-slide[data-slick-index="${t}"]`).addClass("is-middle-slide")
            }
        }
        $(".jb-slider__slider").on("init", (function(t, i, n, o) {
            e(0)
        }
        )),
        $(".jb-slider__slider").on("beforeChange", (function(t, i, n, o) {
            e(o)
        }
        )),
        $(".jb-slider__slider").slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: !1,
            dots: !1,
            mobileFirst: !0,
            responsive: [{
                breakpoint: 768,
                settings: {
                    slidesToShow: 2
                }
            }, {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 3
                }
            }]
        }),
        $(".jb-slider__arrow--next").on("click", (function(e) {
            e.preventDefault(),
            $(".jb-slider__slider").slick("slickNext")
        }
        )),
        $(".jb-slider__arrow--prev").on("click", (function(e) {
            e.preventDefault(),
            $(".jb-slider__slider").slick("slickPrev")
        }
        ))
    }
}
function pageLocationsSearch() {
    function e(e) {
        $(".location-search__input .ls__input-wrapper").removeClass("geo-loading"),
        $("#js__location-search-input").val(e.coords.latitude + "," + e.coords.longitude),
        i()
    }
    function t() {
        console.log("Geo location failed/timed out"),
        $(".location-search__input .ls__input-wrapper").removeClass("geo-loading"),
        alert("Geolocation search unavailable, please use the manual search")
    }
    function i() {
        var e = $("#js__location-search-input").val()
          , t = $("main").data("site-url") + "/wp-content/themes/pho-2018/library/php/location-search.php";
        $(".location-search__input .ls__input-wrapper").removeClass("error"),
        $(".location-search__input .ls__input-wrapper").addClass("loading"),
        e > "" && !currentlySearching && (currentlySearching = !0,
        "soho" == e && (e = "pho soho"),
        $.ajax({
            url: t,
            type: "GET",
            dataType: "json",
            data: "search=" + e,
            success: function(e) {
                if (e.locations && e.locations.length > 0) {
                    console.log(e.from),
                    $(".location-search__input .ls__input-wrapper").removeClass("loading"),
                    $(".all-locations-container").removeClass("is-active"),
                    $(".location-search,.location-search-results").toggleClass("active"),
                    $(".location-search,.location-search-results").toggleClass("inactive");
                    $(".location-search.active") ? $(".location-search__wrapper").height($(".location-search-results .results-list").outerHeight() + 400) : $(".location-search__wrapper").height($(".location-search__box").outerHeight() + 400);
                    var t = $(".search-results");
                    t.html(""),
                    $.each(e.locations, (function(e) {
                        liClass = 0 == e ? "active" : "",
                        t.append('<li data-address="' + this.address.replace(/(<([^>]+)>)/gi, " ") + '" data-lat="' + this.lat + '" data-long="' + this.long + '" class="' + liClass + '"> <p>' + this.title + "</p> <span>" + this.distance + ' miles</span> <a class="ajax__ignore" href="' + this.url + '"">MORE INFO</a> </li>')
                    }
                    )),
                    $(".js__results-map").addClass("loading"),
                    googleSearchHref = "https://www.google.co.uk/maps/search/Pho, " + e.locations[0].address.replace(/(<([^>]+)>)/gi, " "),
                    $(".js__results-map a").attr("href", googleSearchHref),
                    setTimeout((function() {
                        $(".js__results-map").removeClass("loading")
                    }
                    ), 750),
                    currentlySearching = !1
                } else
                    $(".location-search__input .ls__input-wrapper .search-error p").text("Search address not recognised, please try alternative"),
                    $(".location-search__input .ls__input-wrapper").removeClass("loading"),
                    $(".location-search__input .ls__input-wrapper").addClass("error"),
                    currentlySearching = !1
            },
            error: function(e, t, i) {
                $(".location-search__input .ls__input-wrapper .search-error p").text("An error occured, please try refreshing the page!"),
                $(".location-search__input .ls__input-wrapper").removeClass("loading"),
                $(".location-search__input .ls__input-wrapper").addClass("error"),
                currentlySearching = !1,
                console.log("Client side ajax failed")
            }
        }))
    }
    $(".ls__view-all").click((function() {
        $(".grey-background").hide(),
        $(".location-search__wrapper").addClass("no-max-height"),
        $(".all-locations-container").addClass("is-active"),
        $(".location-search").addClass("is-active"),
        $("html, body").animate({
            scrollTop: $(".location-search").offset().top + 275
        }, 500, "swing")
    }
    )),
    $("body").on("keypress", (function(e) {
        13 == e.which && $(".location-search__input").length && i()
    }
    )),
    $("#js__location-geolocation").on("click touch", (function() {
        if ($(".location-search__input .ls__input-wrapper").addClass("geo-loading"),
        navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(e, t, {
                enableHighAccuracy: !0,
                timeout: 2500,
                maximumAge: 0
            })
        } else
            t()
    }
    )),
    $("body").on("click", ".js__search-submit", (function(e) {
        i()
    }
    )),
    $(".search-results").on("click", "li", (function(e) {
        addingPin || $(this).hasClass("active") || (addingPin = !0,
        $(".search-results li").removeClass("active"),
        $(this).addClass("active"),
        $(".js__results-map").addClass("loading"),
        $(".js__results-map a").attr("href", $(this).data("address")),
        setTimeout((function() {
            addingPin = !1,
            $(".js__results-map").removeClass("loading")
        }
        ), 750))
    }
    ))
}
function pageLocationSingle() {
    if ($(".remodal--message").length) {
        var e = $(".remodal-overlay")
          , t = $(".remodal--message");
        setTimeout((function() {
            e.addClass("is-active"),
            t.addClass("is-active"),
            t.parent(".remodal-wrapper").removeClass("remodal-is-closed").show()
        }
        ), 2e3),
        $(".remodal-overlay").click((function() {
            e.removeClass("is-active"),
            t.removeClass("is-active")
        }
        ))
    }
    if ($(".remodal--newsletter").length && !$(".remodal--message").length) {
        e = $(".remodal-overlay");
        var i = $(".remodal--newsletter");
        setTimeout((function() {
            e.addClass("is-active"),
            i.addClass("is-active"),
            i.parent(".remodal-wrapper").removeClass("remodal-is-closed").show()
        }
        ), 2e3),
        $(".remodal-overlay").click((function() {
            e.removeClass("is-active"),
            i.removeClass("is-active")
        }
        ))
    }
    $("#popup__mailing-list__submit").click((function(e) {
        e.preventDefault();
        var t = $("#popup__mailing-list__privacy:checked").length > 0
          , i = $("#popup__mailing-list__email").val()
          , n = $("#popup_unitID").val()
          , o = $("#popup_groupID").val();
        !1 === t ? $("#popup__mailing-list__form .error").css("display", "inline-block") : $("#popup__mailing-list__form .error").css("display", "none"),
        "" == i ? $("#popup__mailing-list__email").addClass("error-input") : $("#popup__mailing-list__email").removeClass("error-input"),
        !0 === t && "" != i && ($("#popup__mailing-list__email").removeClass("error-input"),
        $("#popup__mailing-list__form .error").css("display", "none"),
        $.ajax({
            type: "post",
            url: "/wp-admin/admin-ajax.php",
            data: {
                action: "airship_create_contact",
                email_address: i,
                unitID: n,
                groupID: o
            },
            success: function(e) {
                console.log(e),
                $("#popup__mailing-list__form .signup__input").html('<p style="text-align:center">Thank you for signing up</p>')
            },
            error: function(e) {
                console.log(e)
            }
        }))
    }
    ))
}
function pageMenus() {
    $(".menu-items__info-icon").click((function() {
        $(".menu-items__row.active").removeClass("active"),
        $(this).parent().toggleClass("active")
    }
    )),
    $(".filter-box").click((function() {
        $(this).toggleClass("active"),
        filterMenuItems()
    }
    )),
    $(window).width() > 950 ? $(".menus-display__filter-dropdown").hover((function() {
        $(".menus-display__filter-dropdown").addClass("active")
    }
    ), (function() {
        $(".menus-display__filter-dropdown").removeClass("active")
    }
    )) : $(".menus-display__filter-dropdown").click((function() {
        $(this).toggleClass("active")
    }
    )),
    $(".allergen-ingredient").click((function() {
        $(this).toggleClass("active"),
        filterMenuItems()
    }
    )),
    $(".js__menu-change").click((function(e) {
        e.preventDefault(),
        $(".menus-display").addClass("loading"),
        $(".js__menu-change.active").removeClass("active"),
        newMenu = $(this).data("menu"),
        loadNewMenu(newMenu)
    }
    )),
    $(".mobile-nav select").change((function() {
        $(".menus-display").addClass("loading"),
        newMenu = $(".mobile-nav select").val(),
        newMenu = newMenu.split("=").pop(),
        loadNewMenu(newMenu)
    }
    ));
    var e = getUrlParameter("pm");
    e > "" && ($(".menus-display").addClass("loading"),
    $(".js__menu-change.active").removeClass("active"),
    loadNewMenu($('.js__menu-change[data-menu-slug="' + e + '"]').data("menu")))
}
function loadNewMenu(e) {
    var t = $(".menu-items").data("url")
      , i = $(".menu-items").data("menus-page")
      , n = $(".menu-items").data("page-id")
      , o = $('.js__menu-change[data-menu="' + e + '"]').data("menu-slug");
    $.ajax({
        url: t,
        type: "GET",
        dataType: "json",
        data: "menu=" + e + "&pageID=" + n,
        success: function(t) {
            $(".menu-items").html(t.menu_items),
            $(".menus-display__description .white-background p").html(t.menu_title),
            $(".menus-display__description p.menu-description").html(t.menu_description),
            $(".menus-display__description img").attr("src", t.menu_image),
            filterMenuItems();
            var n = i + "?pm=" + o;
            window.history.pushState(null, null, n),
            $("main.menus-page").attr("id", "current-menu__" + e),
            $('.js__menu-change[data-menu="' + e + '"]').addClass("active"),
            $(".menus-display").removeClass("loading")
        },
        error: function(e, t, i) {
            console.log("Client side ajax failed")
        }
    })
}
function filterMenuItems() {
    currentFilters = [],
    $(".filter-box.active").each((function() {
        currentFilters.push($(this).data("select-cat"))
    }
    )),
    currentAllergens = [],
    $(".allergen-ingredient.active").each((function() {
        currentAllergens.push($(this).data("ingredient"))
    }
    )),
    filtersArrayLength = currentFilters.length,
    allergensArrayLength = currentAllergens.length,
    filtersArrayLength > 0 || allergensArrayLength ? (itemCats = "",
    itemAllergens = "",
    $(".menu-items__wrapper").each((function() {
        if (itemCats = $(this).data("food-cats"),
        itemAllergens = $(this).data("ingredients"),
        matchedCat = 0,
        excludedAllergen = 0,
        itemCats > "")
            for (var e = 0; e < filtersArrayLength; e++)
                itemCats.indexOf(currentFilters[e]) >= 0 && (matchedCat += 1);
        if (itemAllergens > "")
            for (e = 0; e < allergensArrayLength; e++)
                itemAllergens.indexOf(currentAllergens[e]) >= 0 && (excludedAllergen += 1);
        $(this).removeClass("inFilter"),
        $(this).removeClass("outFilter"),
        matchedCat == filtersArrayLength ? $(this).addClass("inFilter") : $(this).addClass("outFilter"),
        excludedAllergen > 0 && ($(this).removeClass("inFilter"),
        $(this).addClass("outFilter"))
    }
    ))) : $(".menu-items__wrapper").each((function() {
        $(this).removeClass("inFilter"),
        $(this).removeClass("outFilter")
    }
    ))
}
function siteNav() {
    var e = $(".remodal-overlay")
      , t = $("[data-remodal-id=modal-1]")
      , i = $("[data-remodal-id=modal-2]")
      , n = $("[data-remodal-id=modal-3]")
      , o = $("[data-remodal-id=modal-4]")
      , s = $("[data-remodal-id=modal-5]")
      , r = $("[data-remodal-id=modal-6]")
      , a = $("[data-remodal-id=modal-book]");
    $(".modal-opener-1").click((function() {
        t.addClass("is-active"),
        e.addClass("is-active")
    }
    )),
    $(".modal-opener-2").click((function() {
        i.addClass("is-active"),
        e.addClass("is-active")
    }
    )),
    $(".modal-opener-3").click((function() {
        n.addClass("is-active"),
        e.addClass("is-active")
    }
    )),
    $(".modal-opener-4").click((function() {
        o.addClass("is-active"),
        e.addClass("is-active")
    }
    )),
    $(".modal-opener-5").click((function() {
        s.addClass("is-active"),
        e.addClass("is-active")
    }
    )),
    $(".modal-opener-6").click((function() {
        r.addClass("is-active"),
        e.addClass("is-active")
    }
    )),
    $(".modal-opener-book").click((function() {
        a.addClass("is-active"),
        e.addClass("is-active"),
        a.parent(".remodal-wrapper").show()
    }
    )),
    $(".remodal-overlay").click((function() {
        t.removeClass("is-active"),
        i.removeClass("is-active"),
        n.removeClass("is-active"),
        o.removeClass("is-active"),
        s.removeClass("is-active"),
        r.removeClass("is-active"),
        a.removeClass("is-active"),
        a.parent(".remodal-wrapper").hide(),
        e.removeClass("is-active")
    }
    )),
    $(".js__init-width").each((function() {
        $(this).css({
            width: $(this).width()
        }),
        $(this).css({
            height: $(this).height()
        })
    }
    )),
    $("header").addClass("fixed"),
    $(".js__open-nav").click((function() {
        navChanging || (navChanging = !0,
        navState ? (contentOut(),
        $("header").addClass("nav-hidden-a"),
        $("body").addClass("no-scroll"),
        navPopup = $("#nav-popup"),
        prevColour = $(".background .background__colour").css("background-color"),
        prevImage = $(".background .background__image").css("background-image").replace("url(", "").replace(")", "").replace(/\"/gi, ""),
        navPopup.data("prevcolour", prevColour),
        navPopup.data("previmage", prevImage),
        changeBackground(navPopup.data("colour"), navPopup.data("image")),
        setTimeout((function() {
            $("header").addClass("navopen navfade"),
            navState = !1,
            navChanging = !1
        }
        ), 500)) : ($("header").removeClass("navfade"),
        navPopup = $("#nav-popup"),
        changeBackground(navPopup.data("prevcolour"), navPopup.data("previmage")),
        navState = !0,
        setTimeout((function() {
            contentIn(),
            $("body").removeClass("no-scroll"),
            $("header").removeClass("navopen"),
            $("header").removeClass("nav-hidden-a"),
            navChanging = !1
        }
        ), 350)))
    }
    ))
}
function pageNutrition2023() {
    let e = document.querySelectorAll(".js__nutrition-fact-popup")
      , t = document.querySelectorAll(".js__trigger-nutrition-fact-popup")
      , i = document.querySelectorAll(".js__trigger-nutrition-close-fact-popup")
      , n = document.querySelector(".js__nutrition-fact-popup-background");
    function o() {
        e.forEach((e=>{
            e.classList.remove("active"),
            n.classList.remove("active")
        }
        ))
    }
    t.forEach((e=>{
        e.addEventListener("click", (e=>{
            e.preventDefault;
            let t = e.target.dataset.fact;
            t && (o(),
            n.classList.add("active"),
            document.querySelector('.js__nutrition-fact-popup[data-fact="' + t + '"').classList.add("active"))
        }
        ))
    }
    )),
    i.forEach((e=>{
        e.addEventListener("click", (e=>{
            o()
        }
        ))
    }
    )),
    document.querySelector(".js__nutrition-smooth-scroll").addEventListener("click", (e=>{
        e.preventDefault,
        $("html, body").animate({
            scrollTop: $(".nutrition__content").offset().top
        }, 500, "swing")
    }
    ))
}
function pageNutritionHome() {}
function pageNutritionSingle() {
    $(".nutrition-single-slider").slick({
        arrows: !1,
        dots: !1,
        infinite: !0,
        slidesToShow: 4,
        responsive: [{
            breakpoint: 1280,
            settings: {
                slidesToShow: 3
            }
        }, {
            breakpoint: 1e3,
            settings: {
                slidesToShow: 2
            }
        }, {
            breakpoint: 600,
            settings: {
                slidesToShow: 1
            }
        }]
    })
}
function pagePhoToGo() {
    function e(e) {
        $(".photogo__input .ls__input-wrapper").removeClass("geo-loading"),
        $("#js__ptg-search-input").val(e.coords.latitude + "," + e.coords.longitude),
        n()
    }
    function t() {
        console.log("Geo location failed/timed out"),
        $(".photogo__input .ls__input-wrapper").removeClass("geo-loading"),
        alert("Geolocation search unavailable, please use the manual search")
    }
    $(".ls__view-all").click((function() {
        $(".grey-background").hide(),
        $(".photogo__wrapper").addClass("no-max-height"),
        $(".all-locations-container").addClass("is-active"),
        $(".photogo").addClass("is-active"),
        $("html, body").animate({
            scrollTop: $(".photogo").offset().top + 275
        }, 500, "swing")
    }
    )),
    $("#js__location-geolocation").on("click touch", (function() {
        if ($(".photogo__input .ls__input-wrapper").addClass("geo-loading"),
        navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(e, t, {
                enableHighAccuracy: !0,
                timeout: 2500,
                maximumAge: 0
            })
        } else
            t()
    }
    ));
    var i = getUrlParameter("search");
    function n() {
        $(".all-locations-container").removeClass("is-active");
        var e = $("#js__ptg-search-input").val()
          , t = $("main").data("site-url") + "/wp-content/themes/pho-2018/library/php/location-search.php";
        $(".photogo__input .ls__input-wrapper").addClass("loading"),
        e > "" && !currentlySearching && (currentlySearching = !0,
        $.ajax({
            url: t,
            type: "GET",
            dataType: "json",
            data: "search=" + e,
            success: function(e) {
                if (e.locations && e.locations.length > 0) {
                    window.dataLayer = window.dataLayer || [],
                    window.dataLayer.push({
                        event: "photogoSearch"
                    }),
                    $(".photogo,.photogo-results").toggleClass("active"),
                    $(".photogo,.photogo-results").toggleClass("inactive"),
                    $(".photogo__input .ls__input-wrapper").removeClass("loading");
                    $(".photogo.active") ? $(".photogo__wrapper").height($(".photogo-results .results-list").outerHeight() + 500) : $(".photogo__wrapper").height($(".photogo").outerHeight() + 500);
                    var t = $(".search-results");
                    t.html(""),
                    $.each(e.locations, (function(e) {
                        liClass = 0 == e ? "active" : "",
                        this.collectionMenu > "" ? collectionMenuHTML = '<a href="' + this.collectionMenu + '" class="ajax__ignore contact-detail-ctas button" target="_blank">Collection Menu</a>' : collectionMenuHTML = "",
                        this.deliverooLink > "" ? deliverooHTML = '<a href="' + this.deliverooLink + '" class="ajax__ignore contact-detail-ctas button" target="_blank">Order on Deliveroo</a>' : deliverooHTML = "",
                        t.append('<li data-address="' + this.address.replace(/(<([^>]+)>)/gi, " ") + '" data-lat="' + this.lat + '" data-long="' + this.long + '" class="' + liClass + '"> <p>' + this.title + "</p> <span>" + this.distance + ' miles</span> <a href="' + this.url + '">MORE INFO</a> <div class="extra-info"><div class="book-actions">' + collectionMenuHTML + " " + deliverooHTML + '</div><div class="row contact-details"><div class="col-6">' + this.leftCol + '</div><div class="col-6">' + this.rightCol + "</div></div></div></li>")
                    }
                    )),
                    $("#js__ptg-search-map").addClass("loading"),
                    googleSearchHref = "https://www.google.co.uk/maps/search/Pho, " + e.locations[0].address.replace(/(<([^>]+)>)/gi, " "),
                    $("#js__ptg-search-map a").attr("href", googleSearchHref),
                    setTimeout((function() {
                        $("#js__ptg-search-map").removeClass("loading")
                    }
                    ), 750),
                    currentlySearching = !1
                } else
                    $(".photogo__input .ls__input-wrapper .search-error p").text("Search address not recognised, please try alternative"),
                    $(".photogo__input .ls__input-wrapper").removeClass("loading"),
                    $(".photogo__input .ls__input-wrapper").addClass("error"),
                    currentlySearching = !1
            },
            error: function(e, t, i) {
                $(".photogo__input .ls__input-wrapper .search-error p").text("An error occured, please try refreshing the page!"),
                $(".photogo__input .ls__input-wrapper").removeClass("loading"),
                $(".photogo__input .ls__input-wrapper").addClass("error"),
                currentlySearching = !1,
                console.log("Client side ajax failed")
            }
        }))
    }
    i > "" && ($("#js__ptg-search-input").val(i),
    n()),
    $("body").on("keypress", (function(e) {
        13 == e.which && $(".js__ptg-search-submit").length && n()
    }
    )),
    $("body").on("click", ".js__ptg-search-submit", (function(e) {
        n()
    }
    )),
    $(".search-results").on("click", "li", (function(e) {
        addingPin || $(this).hasClass("active") || ($(".search-results li").removeClass("active"),
        $(this).addClass("active"),
        $("#js__ptg-search-map").addClass("loading"),
        $("#js__ptg-search-map a").attr("href", $(this).data("address")),
        setTimeout((function() {
            addingPin = !1,
            $("#js__ptg-search-map").removeClass("loading")
        }
        ), 750))
    }
    ))
}
function scrollBelowSection() {
    $(".js__scroll-below-section").on("click", (function(e) {
        e.preventDefault();
        const t = $(this).closest(".js__scroll-below-section-parent");
        if (!t)
            return;
        const i = t.next();
        i && $("html, body").animate({
            scrollTop: i.offset().top
        }, 500, "swing")
    }
    ))
}
function pageSingle() {}
function pageStudents() {
    $(".cards-section__grid").masonry({
        columnWidth: ".grid-sizer",
        gutter: ".gutter-sizer",
        itemSelector: ".students__card",
        percentPosition: !0
    });
    if ($(".js__students-slider").length) {
        $(".js__students-slider").slick({
            autoplay: !1,
            autoplaySpeed: 3500,
            dots: !1,
            arrows: !0,
            slidesToShow: 1,
            fade: !0,
            nextArrow: "<div class='slick-arrow slick-next' style='background-image: url(/wp-content/themes/pho-2018/library/images/students/next-arrow.svg);'></div>",
            prevArrow: "<div class='slick-arrow slick-prev' style='background-image: url(/wp-content/themes/pho-2018/library/images/students/prev-arrow.svg);'></div>"
        })
    }
    $(document).on("lity:close", (function(e, t) {
        $(".video-modal__video").each((function() {
            $(this).get(0).pause()
        }
        ))
    }
    )),
    $(".video-modal__video").one("click", (function(e) {
        $(this).get(0).play()
    }
    ))
}
function pageSummerLanding() {
    $(".js-summer-landing-slider").slick({
        arrows: !1,
        dots: !1,
        infinite: !0,
        slidesToShow: 3,
        centerMode: !0,
        autoplay: !0,
        responsive: [{
            breakpoint: 960,
            settings: {
                slidesToShow: 2
            }
        }, {
            breakpoint: 700,
            settings: {
                slidesToShow: 1
            }
        }]
    }),
    $(".js-summer-landing-slider--mob").slick({
        arrows: !1,
        dots: !1,
        infinite: !0,
        slidesToShow: 1,
        autoplay: !0
    })
}
function pageTeamsRoles() {
    $(".js-success-stories-slider").slick({
        arrows: !0,
        infinite: !0,
        slidesToShow: 1,
        autoplay: !0,
        variableWidth: !0
    })
}
function pageVacancies() {
    function e() {
        var e = $(".apply-now-popup").height()
          , t = ($(".apply-now-popup").width(),
        ($(window).height() - e) / 2 - 50);
        $(".close-popup").css("top", t + "px")
    }
    function t() {
        $(".vacancy .open-popup, .vacancy-inner .open-popup").click((function() {
            $(".popup-overlay").addClass("active");
            var t = $(this).attr("data-job-id");
            $("#job_id").val(t);
            var i = $(this).attr("data-vacancy-id");
            $.ajax({
                type: "post",
                url: "/wp-admin/admin-ajax.php",
                data: {
                    action: "vacancy_title",
                    vacancy_id: i
                },
                success: function(t) {
                    $("#popup-job-title").html(t),
                    e()
                }
            })
        }
        )),
        $(".apply-now-popup .close-popup").click((function() {
            $(".popup-overlay").removeClass("active")
        }
        )),
        $(".apply-now-popup-success .close-popup, .apply-now-popup-success #back-to-vacancies").click((function() {
            $(".popup-overlay").removeClass("active"),
            $(".apply-now-popup").show(),
            $(".apply-now-popup-success").hide()
        }
        )),
        $("#remove-experience").bind("click", (function(e) {
            e.stopImmediatePropagation();
            var t = parseInt($(this).attr("data-count"));
            if (0 !== t) {
                $('#work-experience-container [data-count="' + t + '"]').remove();
                var i = t - 1;
                $(this).attr("data-count", i),
                $("#add-experience").attr("data-count", i)
            }
        }
        )),
        $("#add-experience").bind("click", (function(e) {
            e.stopImmediatePropagation();
            var t = parseInt($(this).attr("data-count")) + 1;
            $(this).attr("data-count", t),
            $("#remove-experience").attr("data-count", t);
            var i = [];
            for (let e = 0; e < 50; e++) {
                var n = (new Date).getFullYear() - e;
                i += '<option value="' + n + '">' + n + "</option>"
            }
            $("#work-experience-container").append('<div class="row" data-count="' + t + '">                <div class="col-lg-6">                    <label>Employer Name<span>*</span></label>                    <input id="employer_name" name="employer_name[]" type="text" placeholder="Type your employer name...">                </div>                <div class="col-lg-6">                    <label>Job Title<span>*</span></label>                    <input id="job_title" name="job_title[]" type="text" placeholder="Type your job title...">                </div>                <div class="col-lg-12">                    <label>Start Date<span>*</span></label>                    <div class="row">                        <div class="col-lg-6">                            <select required id="start_date_month" name="start_date_month[]">                                <option value="">Please Select</option>                                <option value="1">January</option>                                <option value="2">February</option>                                <option value="3">March</option>                                <option value="4">April</option>                                <option value="5">May</option>                                <option value="6">June</option>                                <option value="7">July</option>                                <option value="8">August</option>                                <option value="9">September</option>                                <option value="10">October</option>                                <option value="11">November</option>                                <option value="12">December</option>                            </select>                        </div>                        <div class="col-lg-6">                            <select required id="start_date_year" name="start_date_year[]">                                <option value="">Please Select</option>                                ' + i + '                            </select>                        </div>                    </div>                </div>                <div class="end-date-row required col-lg-12">                    <label>End Date<span>*</span></label>                    <div class="row">                        <div class="col-lg-6">                            <select required id="end_date_month" name="end_date_month[]">                                <option value="">Please Select</option>                                <option value="1">January</option>                                <option value="2">February</option>                                <option value="3">March</option>                                <option value="4">April</option>                                <option value="5">May</option>                                <option value="6">June</option>                                <option value="7">July</option>                                <option value="8">August</option>                                <option value="9">September</option>                                <option value="10">October</option>                                <option value="11">November</option>                                <option value="12">December</option>                            </select>                        </div>                        <div class="col-lg-6">                            <select required id="end_date_year" name="end_date_year[]">                                <option value="">Please Select</option>                                ' + i + '                            </select>                        </div>                    </div>                </div>                <div class="checkbox-holder | col-lg-12 d-flex align-items-center">                    <input type="checkbox" id="is_present_job" name="is_present_job[]">                    <label>I currently work here</label>                </div>            </div>'),
            $(".checkbox-holder input").on("change", (function() {
                this.checked ? ($(this).parents(".row").find(".end-date-row label span").hide(),
                $(this).parents(".row").find(".end-date-row").removeClass("required")) : ($(this).parents(".row").find(".end-date-row label span").show(),
                $(this).parents(".row").find(".end-date-row").addClass("required"))
            }
            ))
        }
        )),
        $("#submit-application").bind("click", (function(e) {
            e.stopImmediatePropagation();
            var t = !1
              , i = $(".apply-now-popup #first_name").val();
            "" == i ? ($("#first_name").addClass("error"),
            t = !0) : $("#first_name").removeClass("error");
            var n = $(".apply-now-popup #last_name").val();
            "" == n ? ($("#last_name").addClass("error"),
            t = !0) : $("#last_name").removeClass("error");
            var o = $(".apply-now-popup #email_address").val();
            "" == o ? ($("#email_address").addClass("error"),
            t = !0) : /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(o) ? $("#email_address").removeClass("error") : ($("#email_address").addClass("error"),
            t = !0);
            var s = $(".apply-now-popup #telephone_number").val();
            "" == s ? ($("#telephone_number").addClass("error"),
            t = !0) : $("#telephone_number").removeClass("error"),
            "" == $(".apply-now-popup #file").val() ? ($("#file").addClass("error"),
            t = !0) : $("#file").removeClass("error");
            var r = $(".apply-now-popup #job_id").val()
              , a = $("input[name='employer_name[]']").map((function() {
                if ("" != $(this).val())
                    return $(this).removeClass("error"),
                    $(this).val();
                $(this).addClass("error"),
                t = !0
            }
            )).get()
              , l = $("input[name='job_title[]']").map((function() {
                if ("" != $(this).val())
                    return $(this).removeClass("error"),
                    $(this).val();
                $(this).addClass("error"),
                t = !0
            }
            )).get()
              , c = $("select[name='start_date_month[]']").map((function() {
                if ("" != $(this).val())
                    return $(this).removeClass("error"),
                    $(this).val();
                $(this).addClass("error"),
                t = !0
            }
            )).get()
              , d = $("select[name='start_date_year[]']").map((function() {
                if ("" != $(this).val())
                    return $(this).removeClass("error"),
                    $(this).val();
                $(this).addClass("error"),
                t = !0
            }
            )).get()
              , u = $("select[name='end_date_month[]']").map((function() {
                if ("" != $(this).val() || !$(this).parents(".end-date-row").hasClass("required"))
                    return $(this).removeClass("error"),
                    $(this).val();
                $(this).addClass("error"),
                t = !0
            }
            )).get()
              , p = $("select[name='end_date_year[]']").map((function() {
                if ("" != $(this).val() || !$(this).parents(".end-date-row").hasClass("required"))
                    return $(this).removeClass("error"),
                    $(this).val();
                $(this).addClass("error"),
                t = !0
            }
            )).get()
              , h = $("input[name='is_present_job[]']").map((function() {
                return $(this).is(":checked")
            }
            )).get();
            if (!0 === t)
                return !1;
            var f = new FormData;
            f.append("action", "harri_application"),
            f.append("first_name", i),
            f.append("last_name", n),
            f.append("email_address", o),
            f.append("telephone_number", s),
            f.append("job_id", r),
            f.append("employer_name", a),
            f.append("job_title", l),
            f.append("start_date_month", c),
            f.append("start_date_year", d),
            f.append("end_date_month", u),
            f.append("end_date_year", p),
            f.append("is_present_job", h),
            f.append("file", $("#file")[0].files[0]),
            $.ajax({
                type: "post",
                url: "/wp-admin/admin-ajax.php",
                data: f,
                contentType: !1,
                processData: !1,
                success: function(e) {
                    "Success" == JSON.parse(e).status && ($(".apply-now-popup").hide(),
                    $(".apply-now-popup-success").show(),
                    $("#add-experience").attr("data-count", 0),
                    $("#remove-experience").attr("data-count", 0),
                    $("#work-experience-container").empty(),
                    $(".apply-now-popup input").val(""))
                },
                error: function(e) {
                    console.log(e)
                }
            })
        }
        ))
    }
    $(window).on("resize", (function() {
        e()
    }
    )),
    t(),
    $((function() {
        $("#location-filter").selectric(),
        $("#department-filter").selectric(),
        $("#job-type-filter").selectric()
    }
    )),
    $(".vacancy-list__filter select").on("change", (function() {
        $(".vacancy-list__vacancies #load-more").attr("data-offset", 10);
        var e = $("#location-filter").val()
          , i = $("#department-filter").val()
          , n = $("#job-type-filter").val()
          , o = $(".js-ajax-vacancy-list");
        $.ajax({
            type: "post",
            url: "/wp-admin/admin-ajax.php",
            data: {
                action: "load_more_total",
                location: e,
                department: i,
                job_type: n
            },
            success: function(e) {
                parseInt(e) > 10 ? ($(".vacancy-list__vacancies #load-more").attr("data-total", parseInt(e)),
                $(".vacancy-list__vacancies #load-more").show()) : $(".vacancy-list__vacancies #load-more").hide()
            }
        }),
        $.ajax({
            type: "post",
            url: "/wp-admin/admin-ajax.php",
            data: {
                action: "vacancy_filter",
                location: e,
                department: i,
                job_type: n
            },
            success: function(e) {
                o.html(e),
                t()
            }
        })
    }
    )),
    $(".vacancy-list__filter #reset-filter").click((function() {
        $(".vacancy-list__vacancies #load-more").attr("data-offset", 10),
        $("#location-filter").val("all").change().selectric("refresh"),
        $("#department-filter").val("all").change().selectric("refresh"),
        $("#job-type-filter").val("all").change().selectric("refresh");
        var e = $(".js-ajax-vacancy-list");
        $.ajax({
            type: "post",
            url: "/wp-admin/admin-ajax.php",
            data: {
                action: "load_more_total",
                location: "all",
                department: "all",
                job_type: "all"
            },
            success: function(e) {
                parseInt(e) > 10 ? ($(".vacancy-list__vacancies #load-more").attr("data-total", parseInt(e)),
                $(".vacancy-list__vacancies #load-more").show()) : $(".vacancy-list__vacancies #load-more").hide()
            }
        }),
        $.ajax({
            type: "post",
            url: "/wp-admin/admin-ajax.php",
            data: {
                action: "vacancy_filter",
                location: "all",
                department: "all",
                job_type: "all"
            },
            success: function(i) {
                e.html(i),
                t()
            }
        })
    }
    )),
    $(".vacancy-list__vacancies #load-more").click((function() {
        var e = $("#location-filter").val()
          , i = $("#department-filter").val()
          , n = $("#job-type-filter").val()
          , o = $(".js-ajax-vacancy-list")
          , s = parseInt($(this).attr("data-offset"))
          , r = parseInt($(this).attr("data-total"))
          , a = parseInt(s) + 10;
        $(this).attr("data-offset", a),
        a > r && $(this).hide(),
        $.ajax({
            type: "post",
            url: "/wp-admin/admin-ajax.php",
            data: {
                action: "vacancy_load_more",
                location: e,
                department: i,
                job_type: n,
                offset: s
            },
            success: function(e) {
                o.append(e),
                t()
            },
            error: function(e) {
                console.log(e)
            }
        })
    }
    ))
}
function pageWhatThePho() {}
function ajaxify() {
    $("body").on("click", "a", (function(e) {
        var t = $("main").data("site-url") + pathname;
        if (window.history.pushState({
            html: $("html").html(),
            pageTitle: document.title
        }, "", t),
        "#" == e.target)
            e.preventDefault();
        else if ($(this).hasClass("ajax__ignore"))
            ;
        else if (e.target.href.indexOf("bda.bookatable.com") > -1)
            ;
        else if (e.target.href.indexOf("careers.phocafe.co.uk") > -1)
            ;
        else if (e.target.href.indexOf("/locations/") > -1)
            ;
        else if (e.target.href.indexOf("/book/") > -1)
            ;
        else if (e.target.href.indexOf("phocafe.co.uk") > -1) {
            e.preventDefault();
            t = $(this)[0].pathname;
            contentOut(),
            ajaxLoadPage(t)
        }
    }
    ))
}
function ajaxLoadPage(e) {
    var t = $("main").data("site-url") + e;
    window.history.pushState({
        html: $("html").html(),
        pageTitle: document.title
    }, "", t),
    ga("set", "page", e),
    ga("send", "pageview");
    var i = getUnixTimestamp();
    console.log("Currently the time is: " + i);
    showLoadingScreen(),
    $.ajax({
        url: t,
        type: "GET",
        dataType: "json",
        data: {
            ajax: !0
        },
        success: function(t) {
            var n = +new Date - i;
            console.log(n),
            addToPageCache(t, e, i),
            loadPageContent(t),
            setTimeout(hideLoadingScreen, 250)
        },
        error: function(e, t, i) {
            console.log("Ajax Request failed"),
            console.log(i)
        }
    })
}
function loadPageContent(e) {
    $("main").empty(),
    $("main").append(e.pageHTML),
    $("main").attr("class", e.pageTemplate),
    $("main").data("template", e.pageTemplate),
    $("body").attr("class", e.pageBodyClass),
    $("header").removeClass("navfade"),
    navState = !0,
    setTimeout((function() {
        hideLoadingScreen()
    }
    ), 250),
    setTimeout((function() {
        contentIn(),
        $("body").removeClass("no-scroll"),
        $("header").removeClass("navopen"),
        $("header").removeClass("nav-hidden-a"),
        navChanging = !1
    }
    ), 500),
    changeBackground(e.pageColour, e.pageImage.url);
    var t = $(e).filter("title").text();
    document.title = t,
    window.scrollTo(0, 0),
    init()
}
function addToPageCache(e, t, i) {
    var n = {};
    n.content = e,
    n.timestamp = i,
    localStorage.setItem(t, JSON.stringify(n)),
    console.log("URL " + t + " cached")
}
function checkPageCache(e, t) {
    console.log("Fetching " + e);
    var i = localStorage.getItem(e);
    if (null != i) {
        var n = JSON.parse(i);
        if (t - n.timestamp < 1800)
            return console.log("Loaded from cache - page cached at " + n.timestamp),
            n.content;
        console.log("Cached item out of date")
    } else
        console.log("Page not in the cache");
    return null
}
function getUnixTimestamp() {
    return Math.floor(Date.now() / 1e3)
}
function showLoadingScreen() {
    $("#loading-logo").addClass("fadeout"),
    $("body").addClass("js__loading")
}
function hideLoadingScreen() {
    $("#loading-logo").addClass("fadeout"),
    $("body").addClass("js__loading"),
    setTimeout((function() {
        $(".swipeEffect").addClass("is-active")
    }
    ), 300)
}
!function(e, t) {
    "use strict";
    "object" == typeof module && "object" == typeof module.exports ? module.exports = e.document ? t(e, !0) : function(e) {
        if (!e.document)
            throw new Error("jQuery requires a window with a document");
        return t(e)
    }
    : t(e)
}("undefined" != typeof window ? window : this, (function(e, t) {
    "use strict";
    var i = []
      , n = e.document
      , o = Object.getPrototypeOf
      , s = i.slice
      , r = i.concat
      , a = i.push
      , l = i.indexOf
      , c = {}
      , d = c.toString
      , u = c.hasOwnProperty
      , p = u.toString
      , h = p.call(Object)
      , f = {};
    function m(e, t) {
        var i = (t = t || n).createElement("script");
        i.text = e,
        t.head.appendChild(i).parentNode.removeChild(i)
    }
    var g = "3.2.1"
      , v = function(e, t) {
        return new v.fn.init(e,t)
    }
      , y = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g
      , b = /^-ms-/
      , w = /-([a-z])/g
      , $ = function(e, t) {
        return t.toUpperCase()
    };
    function _(e) {
        var t = !!e && "length"in e && e.length
          , i = v.type(e);
        return "function" !== i && !v.isWindow(e) && ("array" === i || 0 === t || "number" == typeof t && t > 0 && t - 1 in e)
    }
    v.fn = v.prototype = {
        jquery: g,
        constructor: v,
        length: 0,
        toArray: function() {
            return s.call(this)
        },
        get: function(e) {
            return null == e ? s.call(this) : e < 0 ? this[e + this.length] : this[e]
        },
        pushStack: function(e) {
            var t = v.merge(this.constructor(), e);
            return t.prevObject = this,
            t
        },
        each: function(e) {
            return v.each(this, e)
        },
        map: function(e) {
            return this.pushStack(v.map(this, (function(t, i) {
                return e.call(t, i, t)
            }
            )))
        },
        slice: function() {
            return this.pushStack(s.apply(this, arguments))
        },
        first: function() {
            return this.eq(0)
        },
        last: function() {
            return this.eq(-1)
        },
        eq: function(e) {
            var t = this.length
              , i = +e + (e < 0 ? t : 0);
            return this.pushStack(i >= 0 && i < t ? [this[i]] : [])
        },
        end: function() {
            return this.prevObject || this.constructor()
        },
        push: a,
        sort: i.sort,
        splice: i.splice
    },
    v.extend = v.fn.extend = function() {
        var e, t, i, n, o, s, r = arguments[0] || {}, a = 1, l = arguments.length, c = !1;
        for ("boolean" == typeof r && (c = r,
        r = arguments[a] || {},
        a++),
        "object" == typeof r || v.isFunction(r) || (r = {}),
        a === l && (r = this,
        a--); a < l; a++)
            if (null != (e = arguments[a]))
                for (t in e)
                    i = r[t],
                    r !== (n = e[t]) && (c && n && (v.isPlainObject(n) || (o = Array.isArray(n))) ? (o ? (o = !1,
                    s = i && Array.isArray(i) ? i : []) : s = i && v.isPlainObject(i) ? i : {},
                    r[t] = v.extend(c, s, n)) : void 0 !== n && (r[t] = n));
        return r
    }
    ,
    v.extend({
        expando: "jQuery" + (g + Math.random()).replace(/\D/g, ""),
        isReady: !0,
        error: function(e) {
            throw new Error(e)
        },
        noop: function() {},
        isFunction: function(e) {
            return "function" === v.type(e)
        },
        isWindow: function(e) {
            return null != e && e === e.window
        },
        isNumeric: function(e) {
            var t = v.type(e);
            return ("number" === t || "string" === t) && !isNaN(e - parseFloat(e))
        },
        isPlainObject: function(e) {
            var t, i;
            return !(!e || "[object Object]" !== d.call(e) || (t = o(e)) && (i = u.call(t, "constructor") && t.constructor,
            "function" != typeof i || p.call(i) !== h))
        },
        isEmptyObject: function(e) {
            var t;
            for (t in e)
                return !1;
            return !0
        },
        type: function(e) {
            return null == e ? e + "" : "object" == typeof e || "function" == typeof e ? c[d.call(e)] || "object" : typeof e
        },
        globalEval: function(e) {
            m(e)
        },
        camelCase: function(e) {
            return e.replace(b, "ms-").replace(w, $)
        },
        each: function(e, t) {
            var i, n = 0;
            if (_(e))
                for (i = e.length; n < i && !1 !== t.call(e[n], n, e[n]); n++)
                    ;
            else
                for (n in e)
                    if (!1 === t.call(e[n], n, e[n]))
                        break;
            return e
        },
        trim: function(e) {
            return null == e ? "" : (e + "").replace(y, "")
        },
        makeArray: function(e, t) {
            var i = t || [];
            return null != e && (_(Object(e)) ? v.merge(i, "string" == typeof e ? [e] : e) : a.call(i, e)),
            i
        },
        inArray: function(e, t, i) {
            return null == t ? -1 : l.call(t, e, i)
        },
        merge: function(e, t) {
            for (var i = +t.length, n = 0, o = e.length; n < i; n++)
                e[o++] = t[n];
            return e.length = o,
            e
        },
        grep: function(e, t, i) {
            for (var n = [], o = 0, s = e.length, r = !i; o < s; o++)
                !t(e[o], o) !== r && n.push(e[o]);
            return n
        },
        map: function(e, t, i) {
            var n, o, s = 0, a = [];
            if (_(e))
                for (n = e.length; s < n; s++)
                    null != (o = t(e[s], s, i)) && a.push(o);
            else
                for (s in e)
                    null != (o = t(e[s], s, i)) && a.push(o);
            return r.apply([], a)
        },
        guid: 1,
        proxy: function(e, t) {
            var i, n, o;
            if ("string" == typeof t && (i = e[t],
            t = e,
            e = i),
            v.isFunction(e))
                return n = s.call(arguments, 2),
                o = function() {
                    return e.apply(t || this, n.concat(s.call(arguments)))
                }
                ,
                o.guid = e.guid = e.guid || v.guid++,
                o
        },
        now: Date.now,
        support: f
    }),
    "function" == typeof Symbol && (v.fn[Symbol.iterator] = i[Symbol.iterator]),
    v.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), (function(e, t) {
        c["[object " + t + "]"] = t.toLowerCase()
    }
    ));
    var C = function(e) {
        var t, i, n, o, s, r, a, l, c, d, u, p, h, f, m, g, v, y, b, w = "sizzle" + 1 * new Date, $ = e.document, _ = 0, C = 0, x = re(), k = re(), T = re(), S = function(e, t) {
            return e === t && (u = !0),
            0
        }, E = {}.hasOwnProperty, j = [], A = j.pop, O = j.push, I = j.push, L = j.slice, D = function(e, t) {
            for (var i = 0, n = e.length; i < n; i++)
                if (e[i] === t)
                    return i;
            return -1
        }, N = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped", P = "[\\x20\\t\\r\\n\\f]", M = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+", H = "\\[" + P + "*(" + M + ")(?:" + P + "*([*^$|!~]?=)" + P + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + M + "))|)" + P + "*\\]", z = ":(" + M + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + H + ")*)|.*)\\)|)", W = new RegExp(P + "+","g"), q = new RegExp("^" + P + "+|((?:^|[^\\\\])(?:\\\\.)*)" + P + "+$","g"), F = new RegExp("^" + P + "*," + P + "*"), R = new RegExp("^" + P + "*([>+~]|" + P + ")" + P + "*"), B = new RegExp("=" + P + "*([^\\]'\"]*?)" + P + "*\\]","g"), U = new RegExp(z), G = new RegExp("^" + M + "$"), Y = {
            ID: new RegExp("^#(" + M + ")"),
            CLASS: new RegExp("^\\.(" + M + ")"),
            TAG: new RegExp("^(" + M + "|[*])"),
            ATTR: new RegExp("^" + H),
            PSEUDO: new RegExp("^" + z),
            CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + P + "*(even|odd|(([+-]|)(\\d*)n|)" + P + "*(?:([+-]|)" + P + "*(\\d+)|))" + P + "*\\)|)","i"),
            bool: new RegExp("^(?:" + N + ")$","i"),
            needsContext: new RegExp("^" + P + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + P + "*((?:-\\d)?\\d*)" + P + "*\\)|)(?=[^-]|$)","i")
        }, V = /^(?:input|select|textarea|button)$/i, X = /^h\d$/i, Q = /^[^{]+\{\s*\[native \w/, J = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/, K = /[+~]/, Z = new RegExp("\\\\([\\da-f]{1,6}" + P + "?|(" + P + ")|.)","ig"), ee = function(e, t, i) {
            var n = "0x" + t - 65536;
            return n != n || i ? t : n < 0 ? String.fromCharCode(n + 65536) : String.fromCharCode(n >> 10 | 55296, 1023 & n | 56320)
        }, te = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g, ie = function(e, t) {
            return t ? "\0" === e ? "�" : e.slice(0, -1) + "\\" + e.charCodeAt(e.length - 1).toString(16) + " " : "\\" + e
        }, ne = function() {
            p()
        }, oe = ye((function(e) {
            return !0 === e.disabled && ("form"in e || "label"in e)
        }
        ), {
            dir: "parentNode",
            next: "legend"
        });
        try {
            I.apply(j = L.call($.childNodes), $.childNodes),
            j[$.childNodes.length].nodeType
        } catch (e) {
            I = {
                apply: j.length ? function(e, t) {
                    O.apply(e, L.call(t))
                }
                : function(e, t) {
                    for (var i = e.length, n = 0; e[i++] = t[n++]; )
                        ;
                    e.length = i - 1
                }
            }
        }
        function se(e, t, n, o) {
            var s, a, c, d, u, f, v, y = t && t.ownerDocument, _ = t ? t.nodeType : 9;
            if (n = n || [],
            "string" != typeof e || !e || 1 !== _ && 9 !== _ && 11 !== _)
                return n;
            if (!o && ((t ? t.ownerDocument || t : $) !== h && p(t),
            t = t || h,
            m)) {
                if (11 !== _ && (u = J.exec(e)))
                    if (s = u[1]) {
                        if (9 === _) {
                            if (!(c = t.getElementById(s)))
                                return n;
                            if (c.id === s)
                                return n.push(c),
                                n
                        } else if (y && (c = y.getElementById(s)) && b(t, c) && c.id === s)
                            return n.push(c),
                            n
                    } else {
                        if (u[2])
                            return I.apply(n, t.getElementsByTagName(e)),
                            n;
                        if ((s = u[3]) && i.getElementsByClassName && t.getElementsByClassName)
                            return I.apply(n, t.getElementsByClassName(s)),
                            n
                    }
                if (i.qsa && !T[e + " "] && (!g || !g.test(e))) {
                    if (1 !== _)
                        y = t,
                        v = e;
                    else if ("object" !== t.nodeName.toLowerCase()) {
                        for ((d = t.getAttribute("id")) ? d = d.replace(te, ie) : t.setAttribute("id", d = w),
                        a = (f = r(e)).length; a--; )
                            f[a] = "#" + d + " " + ve(f[a]);
                        v = f.join(","),
                        y = K.test(e) && me(t.parentNode) || t
                    }
                    if (v)
                        try {
                            return I.apply(n, y.querySelectorAll(v)),
                            n
                        } catch (e) {} finally {
                            d === w && t.removeAttribute("id")
                        }
                }
            }
            return l(e.replace(q, "$1"), t, n, o)
        }
        function re() {
            var e = [];
            return function t(i, o) {
                return e.push(i + " ") > n.cacheLength && delete t[e.shift()],
                t[i + " "] = o
            }
        }
        function ae(e) {
            return e[w] = !0,
            e
        }
        function le(e) {
            var t = h.createElement("fieldset");
            try {
                return !!e(t)
            } catch (e) {
                return !1
            } finally {
                t.parentNode && t.parentNode.removeChild(t),
                t = null
            }
        }
        function ce(e, t) {
            for (var i = e.split("|"), o = i.length; o--; )
                n.attrHandle[i[o]] = t
        }
        function de(e, t) {
            var i = t && e
              , n = i && 1 === e.nodeType && 1 === t.nodeType && e.sourceIndex - t.sourceIndex;
            if (n)
                return n;
            if (i)
                for (; i = i.nextSibling; )
                    if (i === t)
                        return -1;
            return e ? 1 : -1
        }
        function ue(e) {
            return function(t) {
                return "input" === t.nodeName.toLowerCase() && t.type === e
            }
        }
        function pe(e) {
            return function(t) {
                var i = t.nodeName.toLowerCase();
                return ("input" === i || "button" === i) && t.type === e
            }
        }
        function he(e) {
            return function(t) {
                return "form"in t ? t.parentNode && !1 === t.disabled ? "label"in t ? "label"in t.parentNode ? t.parentNode.disabled === e : t.disabled === e : t.isDisabled === e || t.isDisabled !== !e && oe(t) === e : t.disabled === e : "label"in t && t.disabled === e
            }
        }
        function fe(e) {
            return ae((function(t) {
                return t = +t,
                ae((function(i, n) {
                    for (var o, s = e([], i.length, t), r = s.length; r--; )
                        i[o = s[r]] && (i[o] = !(n[o] = i[o]))
                }
                ))
            }
            ))
        }
        function me(e) {
            return e && void 0 !== e.getElementsByTagName && e
        }
        for (t in i = se.support = {},
        s = se.isXML = function(e) {
            var t = e && (e.ownerDocument || e).documentElement;
            return !!t && "HTML" !== t.nodeName
        }
        ,
        p = se.setDocument = function(e) {
            var t, o, r = e ? e.ownerDocument || e : $;
            return r !== h && 9 === r.nodeType && r.documentElement ? (f = (h = r).documentElement,
            m = !s(h),
            $ !== h && (o = h.defaultView) && o.top !== o && (o.addEventListener ? o.addEventListener("unload", ne, !1) : o.attachEvent && o.attachEvent("onunload", ne)),
            i.attributes = le((function(e) {
                return e.className = "i",
                !e.getAttribute("className")
            }
            )),
            i.getElementsByTagName = le((function(e) {
                return e.appendChild(h.createComment("")),
                !e.getElementsByTagName("*").length
            }
            )),
            i.getElementsByClassName = Q.test(h.getElementsByClassName),
            i.getById = le((function(e) {
                return f.appendChild(e).id = w,
                !h.getElementsByName || !h.getElementsByName(w).length
            }
            )),
            i.getById ? (n.filter.ID = function(e) {
                var t = e.replace(Z, ee);
                return function(e) {
                    return e.getAttribute("id") === t
                }
            }
            ,
            n.find.ID = function(e, t) {
                if (void 0 !== t.getElementById && m) {
                    var i = t.getElementById(e);
                    return i ? [i] : []
                }
            }
            ) : (n.filter.ID = function(e) {
                var t = e.replace(Z, ee);
                return function(e) {
                    var i = void 0 !== e.getAttributeNode && e.getAttributeNode("id");
                    return i && i.value === t
                }
            }
            ,
            n.find.ID = function(e, t) {
                if (void 0 !== t.getElementById && m) {
                    var i, n, o, s = t.getElementById(e);
                    if (s) {
                        if ((i = s.getAttributeNode("id")) && i.value === e)
                            return [s];
                        for (o = t.getElementsByName(e),
                        n = 0; s = o[n++]; )
                            if ((i = s.getAttributeNode("id")) && i.value === e)
                                return [s]
                    }
                    return []
                }
            }
            ),
            n.find.TAG = i.getElementsByTagName ? function(e, t) {
                return void 0 !== t.getElementsByTagName ? t.getElementsByTagName(e) : i.qsa ? t.querySelectorAll(e) : void 0
            }
            : function(e, t) {
                var i, n = [], o = 0, s = t.getElementsByTagName(e);
                if ("*" === e) {
                    for (; i = s[o++]; )
                        1 === i.nodeType && n.push(i);
                    return n
                }
                return s
            }
            ,
            n.find.CLASS = i.getElementsByClassName && function(e, t) {
                if (void 0 !== t.getElementsByClassName && m)
                    return t.getElementsByClassName(e)
            }
            ,
            v = [],
            g = [],
            (i.qsa = Q.test(h.querySelectorAll)) && (le((function(e) {
                f.appendChild(e).innerHTML = "<a id='" + w + "'></a><select id='" + w + "-\r\\' msallowcapture=''><option selected=''></option></select>",
                e.querySelectorAll("[msallowcapture^='']").length && g.push("[*^$]=" + P + "*(?:''|\"\")"),
                e.querySelectorAll("[selected]").length || g.push("\\[" + P + "*(?:value|" + N + ")"),
                e.querySelectorAll("[id~=" + w + "-]").length || g.push("~="),
                e.querySelectorAll(":checked").length || g.push(":checked"),
                e.querySelectorAll("a#" + w + "+*").length || g.push(".#.+[+~]")
            }
            )),
            le((function(e) {
                e.innerHTML = "<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";
                var t = h.createElement("input");
                t.setAttribute("type", "hidden"),
                e.appendChild(t).setAttribute("name", "D"),
                e.querySelectorAll("[name=d]").length && g.push("name" + P + "*[*^$|!~]?="),
                2 !== e.querySelectorAll(":enabled").length && g.push(":enabled", ":disabled"),
                f.appendChild(e).disabled = !0,
                2 !== e.querySelectorAll(":disabled").length && g.push(":enabled", ":disabled"),
                e.querySelectorAll("*,:x"),
                g.push(",.*:")
            }
            ))),
            (i.matchesSelector = Q.test(y = f.matches || f.webkitMatchesSelector || f.mozMatchesSelector || f.oMatchesSelector || f.msMatchesSelector)) && le((function(e) {
                i.disconnectedMatch = y.call(e, "*"),
                y.call(e, "[s!='']:x"),
                v.push("!=", z)
            }
            )),
            g = g.length && new RegExp(g.join("|")),
            v = v.length && new RegExp(v.join("|")),
            t = Q.test(f.compareDocumentPosition),
            b = t || Q.test(f.contains) ? function(e, t) {
                var i = 9 === e.nodeType ? e.documentElement : e
                  , n = t && t.parentNode;
                return e === n || !(!n || 1 !== n.nodeType || !(i.contains ? i.contains(n) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(n)))
            }
            : function(e, t) {
                if (t)
                    for (; t = t.parentNode; )
                        if (t === e)
                            return !0;
                return !1
            }
            ,
            S = t ? function(e, t) {
                if (e === t)
                    return u = !0,
                    0;
                var n = !e.compareDocumentPosition - !t.compareDocumentPosition;
                return n || (1 & (n = (e.ownerDocument || e) === (t.ownerDocument || t) ? e.compareDocumentPosition(t) : 1) || !i.sortDetached && t.compareDocumentPosition(e) === n ? e === h || e.ownerDocument === $ && b($, e) ? -1 : t === h || t.ownerDocument === $ && b($, t) ? 1 : d ? D(d, e) - D(d, t) : 0 : 4 & n ? -1 : 1)
            }
            : function(e, t) {
                if (e === t)
                    return u = !0,
                    0;
                var i, n = 0, o = e.parentNode, s = t.parentNode, r = [e], a = [t];
                if (!o || !s)
                    return e === h ? -1 : t === h ? 1 : o ? -1 : s ? 1 : d ? D(d, e) - D(d, t) : 0;
                if (o === s)
                    return de(e, t);
                for (i = e; i = i.parentNode; )
                    r.unshift(i);
                for (i = t; i = i.parentNode; )
                    a.unshift(i);
                for (; r[n] === a[n]; )
                    n++;
                return n ? de(r[n], a[n]) : r[n] === $ ? -1 : a[n] === $ ? 1 : 0
            }
            ,
            h) : h
        }
        ,
        se.matches = function(e, t) {
            return se(e, null, null, t)
        }
        ,
        se.matchesSelector = function(e, t) {
            if ((e.ownerDocument || e) !== h && p(e),
            t = t.replace(B, "='$1']"),
            i.matchesSelector && m && !T[t + " "] && (!v || !v.test(t)) && (!g || !g.test(t)))
                try {
                    var n = y.call(e, t);
                    if (n || i.disconnectedMatch || e.document && 11 !== e.document.nodeType)
                        return n
                } catch (e) {}
            return se(t, h, null, [e]).length > 0
        }
        ,
        se.contains = function(e, t) {
            return (e.ownerDocument || e) !== h && p(e),
            b(e, t)
        }
        ,
        se.attr = function(e, t) {
            (e.ownerDocument || e) !== h && p(e);
            var o = n.attrHandle[t.toLowerCase()]
              , s = o && E.call(n.attrHandle, t.toLowerCase()) ? o(e, t, !m) : void 0;
            return void 0 !== s ? s : i.attributes || !m ? e.getAttribute(t) : (s = e.getAttributeNode(t)) && s.specified ? s.value : null
        }
        ,
        se.escape = function(e) {
            return (e + "").replace(te, ie)
        }
        ,
        se.error = function(e) {
            throw new Error("Syntax error, unrecognized expression: " + e)
        }
        ,
        se.uniqueSort = function(e) {
            var t, n = [], o = 0, s = 0;
            if (u = !i.detectDuplicates,
            d = !i.sortStable && e.slice(0),
            e.sort(S),
            u) {
                for (; t = e[s++]; )
                    t === e[s] && (o = n.push(s));
                for (; o--; )
                    e.splice(n[o], 1)
            }
            return d = null,
            e
        }
        ,
        o = se.getText = function(e) {
            var t, i = "", n = 0, s = e.nodeType;
            if (s) {
                if (1 === s || 9 === s || 11 === s) {
                    if ("string" == typeof e.textContent)
                        return e.textContent;
                    for (e = e.firstChild; e; e = e.nextSibling)
                        i += o(e)
                } else if (3 === s || 4 === s)
                    return e.nodeValue
            } else
                for (; t = e[n++]; )
                    i += o(t);
            return i
        }
        ,
        n = se.selectors = {
            cacheLength: 50,
            createPseudo: ae,
            match: Y,
            attrHandle: {},
            find: {},
            relative: {
                ">": {
                    dir: "parentNode",
                    first: !0
                },
                " ": {
                    dir: "parentNode"
                },
                "+": {
                    dir: "previousSibling",
                    first: !0
                },
                "~": {
                    dir: "previousSibling"
                }
            },
            preFilter: {
                ATTR: function(e) {
                    return e[1] = e[1].replace(Z, ee),
                    e[3] = (e[3] || e[4] || e[5] || "").replace(Z, ee),
                    "~=" === e[2] && (e[3] = " " + e[3] + " "),
                    e.slice(0, 4)
                },
                CHILD: function(e) {
                    return e[1] = e[1].toLowerCase(),
                    "nth" === e[1].slice(0, 3) ? (e[3] || se.error(e[0]),
                    e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * ("even" === e[3] || "odd" === e[3])),
                    e[5] = +(e[7] + e[8] || "odd" === e[3])) : e[3] && se.error(e[0]),
                    e
                },
                PSEUDO: function(e) {
                    var t, i = !e[6] && e[2];
                    return Y.CHILD.test(e[0]) ? null : (e[3] ? e[2] = e[4] || e[5] || "" : i && U.test(i) && (t = r(i, !0)) && (t = i.indexOf(")", i.length - t) - i.length) && (e[0] = e[0].slice(0, t),
                    e[2] = i.slice(0, t)),
                    e.slice(0, 3))
                }
            },
            filter: {
                TAG: function(e) {
                    var t = e.replace(Z, ee).toLowerCase();
                    return "*" === e ? function() {
                        return !0
                    }
                    : function(e) {
                        return e.nodeName && e.nodeName.toLowerCase() === t
                    }
                },
                CLASS: function(e) {
                    var t = x[e + " "];
                    return t || (t = new RegExp("(^|" + P + ")" + e + "(" + P + "|$)")) && x(e, (function(e) {
                        return t.test("string" == typeof e.className && e.className || void 0 !== e.getAttribute && e.getAttribute("class") || "")
                    }
                    ))
                },
                ATTR: function(e, t, i) {
                    return function(n) {
                        var o = se.attr(n, e);
                        return null == o ? "!=" === t : !t || (o += "",
                        "=" === t ? o === i : "!=" === t ? o !== i : "^=" === t ? i && 0 === o.indexOf(i) : "*=" === t ? i && o.indexOf(i) > -1 : "$=" === t ? i && o.slice(-i.length) === i : "~=" === t ? (" " + o.replace(W, " ") + " ").indexOf(i) > -1 : "|=" === t && (o === i || o.slice(0, i.length + 1) === i + "-"))
                    }
                },
                CHILD: function(e, t, i, n, o) {
                    var s = "nth" !== e.slice(0, 3)
                      , r = "last" !== e.slice(-4)
                      , a = "of-type" === t;
                    return 1 === n && 0 === o ? function(e) {
                        return !!e.parentNode
                    }
                    : function(t, i, l) {
                        var c, d, u, p, h, f, m = s !== r ? "nextSibling" : "previousSibling", g = t.parentNode, v = a && t.nodeName.toLowerCase(), y = !l && !a, b = !1;
                        if (g) {
                            if (s) {
                                for (; m; ) {
                                    for (p = t; p = p[m]; )
                                        if (a ? p.nodeName.toLowerCase() === v : 1 === p.nodeType)
                                            return !1;
                                    f = m = "only" === e && !f && "nextSibling"
                                }
                                return !0
                            }
                            if (f = [r ? g.firstChild : g.lastChild],
                            r && y) {
                                for (b = (h = (c = (d = (u = (p = g)[w] || (p[w] = {}))[p.uniqueID] || (u[p.uniqueID] = {}))[e] || [])[0] === _ && c[1]) && c[2],
                                p = h && g.childNodes[h]; p = ++h && p && p[m] || (b = h = 0) || f.pop(); )
                                    if (1 === p.nodeType && ++b && p === t) {
                                        d[e] = [_, h, b];
                                        break
                                    }
                            } else if (y && (b = h = (c = (d = (u = (p = t)[w] || (p[w] = {}))[p.uniqueID] || (u[p.uniqueID] = {}))[e] || [])[0] === _ && c[1]),
                            !1 === b)
                                for (; (p = ++h && p && p[m] || (b = h = 0) || f.pop()) && ((a ? p.nodeName.toLowerCase() !== v : 1 !== p.nodeType) || !++b || (y && ((d = (u = p[w] || (p[w] = {}))[p.uniqueID] || (u[p.uniqueID] = {}))[e] = [_, b]),
                                p !== t)); )
                                    ;
                            return (b -= o) === n || b % n == 0 && b / n >= 0
                        }
                    }
                },
                PSEUDO: function(e, t) {
                    var i, o = n.pseudos[e] || n.setFilters[e.toLowerCase()] || se.error("unsupported pseudo: " + e);
                    return o[w] ? o(t) : o.length > 1 ? (i = [e, e, "", t],
                    n.setFilters.hasOwnProperty(e.toLowerCase()) ? ae((function(e, i) {
                        for (var n, s = o(e, t), r = s.length; r--; )
                            e[n = D(e, s[r])] = !(i[n] = s[r])
                    }
                    )) : function(e) {
                        return o(e, 0, i)
                    }
                    ) : o
                }
            },
            pseudos: {
                not: ae((function(e) {
                    var t = []
                      , i = []
                      , n = a(e.replace(q, "$1"));
                    return n[w] ? ae((function(e, t, i, o) {
                        for (var s, r = n(e, null, o, []), a = e.length; a--; )
                            (s = r[a]) && (e[a] = !(t[a] = s))
                    }
                    )) : function(e, o, s) {
                        return t[0] = e,
                        n(t, null, s, i),
                        t[0] = null,
                        !i.pop()
                    }
                }
                )),
                has: ae((function(e) {
                    return function(t) {
                        return se(e, t).length > 0
                    }
                }
                )),
                contains: ae((function(e) {
                    return e = e.replace(Z, ee),
                    function(t) {
                        return (t.textContent || t.innerText || o(t)).indexOf(e) > -1
                    }
                }
                )),
                lang: ae((function(e) {
                    return G.test(e || "") || se.error("unsupported lang: " + e),
                    e = e.replace(Z, ee).toLowerCase(),
                    function(t) {
                        var i;
                        do {
                            if (i = m ? t.lang : t.getAttribute("xml:lang") || t.getAttribute("lang"))
                                return (i = i.toLowerCase()) === e || 0 === i.indexOf(e + "-")
                        } while ((t = t.parentNode) && 1 === t.nodeType);
                        return !1
                    }
                }
                )),
                target: function(t) {
                    var i = e.location && e.location.hash;
                    return i && i.slice(1) === t.id
                },
                root: function(e) {
                    return e === f
                },
                focus: function(e) {
                    return e === h.activeElement && (!h.hasFocus || h.hasFocus()) && !!(e.type || e.href || ~e.tabIndex)
                },
                enabled: he(!1),
                disabled: he(!0),
                checked: function(e) {
                    var t = e.nodeName.toLowerCase();
                    return "input" === t && !!e.checked || "option" === t && !!e.selected
                },
                selected: function(e) {
                    return e.parentNode && e.parentNode.selectedIndex,
                    !0 === e.selected
                },
                empty: function(e) {
                    for (e = e.firstChild; e; e = e.nextSibling)
                        if (e.nodeType < 6)
                            return !1;
                    return !0
                },
                parent: function(e) {
                    return !n.pseudos.empty(e)
                },
                header: function(e) {
                    return X.test(e.nodeName)
                },
                input: function(e) {
                    return V.test(e.nodeName)
                },
                button: function(e) {
                    var t = e.nodeName.toLowerCase();
                    return "input" === t && "button" === e.type || "button" === t
                },
                text: function(e) {
                    var t;
                    return "input" === e.nodeName.toLowerCase() && "text" === e.type && (null == (t = e.getAttribute("type")) || "text" === t.toLowerCase())
                },
                first: fe((function() {
                    return [0]
                }
                )),
                last: fe((function(e, t) {
                    return [t - 1]
                }
                )),
                eq: fe((function(e, t, i) {
                    return [i < 0 ? i + t : i]
                }
                )),
                even: fe((function(e, t) {
                    for (var i = 0; i < t; i += 2)
                        e.push(i);
                    return e
                }
                )),
                odd: fe((function(e, t) {
                    for (var i = 1; i < t; i += 2)
                        e.push(i);
                    return e
                }
                )),
                lt: fe((function(e, t, i) {
                    for (var n = i < 0 ? i + t : i; --n >= 0; )
                        e.push(n);
                    return e
                }
                )),
                gt: fe((function(e, t, i) {
                    for (var n = i < 0 ? i + t : i; ++n < t; )
                        e.push(n);
                    return e
                }
                ))
            }
        },
        n.pseudos.nth = n.pseudos.eq,
        {
            radio: !0,
            checkbox: !0,
            file: !0,
            password: !0,
            image: !0
        })
            n.pseudos[t] = ue(t);
        for (t in {
            submit: !0,
            reset: !0
        })
            n.pseudos[t] = pe(t);
        function ge() {}
        function ve(e) {
            for (var t = 0, i = e.length, n = ""; t < i; t++)
                n += e[t].value;
            return n
        }
        function ye(e, t, i) {
            var n = t.dir
              , o = t.next
              , s = o || n
              , r = i && "parentNode" === s
              , a = C++;
            return t.first ? function(t, i, o) {
                for (; t = t[n]; )
                    if (1 === t.nodeType || r)
                        return e(t, i, o);
                return !1
            }
            : function(t, i, l) {
                var c, d, u, p = [_, a];
                if (l) {
                    for (; t = t[n]; )
                        if ((1 === t.nodeType || r) && e(t, i, l))
                            return !0
                } else
                    for (; t = t[n]; )
                        if (1 === t.nodeType || r)
                            if (d = (u = t[w] || (t[w] = {}))[t.uniqueID] || (u[t.uniqueID] = {}),
                            o && o === t.nodeName.toLowerCase())
                                t = t[n] || t;
                            else {
                                if ((c = d[s]) && c[0] === _ && c[1] === a)
                                    return p[2] = c[2];
                                if (d[s] = p,
                                p[2] = e(t, i, l))
                                    return !0
                            }
                return !1
            }
        }
        function be(e) {
            return e.length > 1 ? function(t, i, n) {
                for (var o = e.length; o--; )
                    if (!e[o](t, i, n))
                        return !1;
                return !0
            }
            : e[0]
        }
        function we(e, t, i, n, o) {
            for (var s, r = [], a = 0, l = e.length, c = null != t; a < l; a++)
                (s = e[a]) && (i && !i(s, n, o) || (r.push(s),
                c && t.push(a)));
            return r
        }
        function $e(e, t, i, n, o, s) {
            return n && !n[w] && (n = $e(n)),
            o && !o[w] && (o = $e(o, s)),
            ae((function(s, r, a, l) {
                var c, d, u, p = [], h = [], f = r.length, m = s || function(e, t, i) {
                    for (var n = 0, o = t.length; n < o; n++)
                        se(e, t[n], i);
                    return i
                }(t || "*", a.nodeType ? [a] : a, []), g = !e || !s && t ? m : we(m, p, e, a, l), v = i ? o || (s ? e : f || n) ? [] : r : g;
                if (i && i(g, v, a, l),
                n)
                    for (c = we(v, h),
                    n(c, [], a, l),
                    d = c.length; d--; )
                        (u = c[d]) && (v[h[d]] = !(g[h[d]] = u));
                if (s) {
                    if (o || e) {
                        if (o) {
                            for (c = [],
                            d = v.length; d--; )
                                (u = v[d]) && c.push(g[d] = u);
                            o(null, v = [], c, l)
                        }
                        for (d = v.length; d--; )
                            (u = v[d]) && (c = o ? D(s, u) : p[d]) > -1 && (s[c] = !(r[c] = u))
                    }
                } else
                    v = we(v === r ? v.splice(f, v.length) : v),
                    o ? o(null, r, v, l) : I.apply(r, v)
            }
            ))
        }
        function _e(e) {
            for (var t, i, o, s = e.length, r = n.relative[e[0].type], a = r || n.relative[" "], l = r ? 1 : 0, d = ye((function(e) {
                return e === t
            }
            ), a, !0), u = ye((function(e) {
                return D(t, e) > -1
            }
            ), a, !0), p = [function(e, i, n) {
                var o = !r && (n || i !== c) || ((t = i).nodeType ? d(e, i, n) : u(e, i, n));
                return t = null,
                o
            }
            ]; l < s; l++)
                if (i = n.relative[e[l].type])
                    p = [ye(be(p), i)];
                else {
                    if ((i = n.filter[e[l].type].apply(null, e[l].matches))[w]) {
                        for (o = ++l; o < s && !n.relative[e[o].type]; o++)
                            ;
                        return $e(l > 1 && be(p), l > 1 && ve(e.slice(0, l - 1).concat({
                            value: " " === e[l - 2].type ? "*" : ""
                        })).replace(q, "$1"), i, l < o && _e(e.slice(l, o)), o < s && _e(e = e.slice(o)), o < s && ve(e))
                    }
                    p.push(i)
                }
            return be(p)
        }
        function Ce(e, t) {
            var i = t.length > 0
              , o = e.length > 0
              , s = function(s, r, a, l, d) {
                var u, f, g, v = 0, y = "0", b = s && [], w = [], $ = c, C = s || o && n.find.TAG("*", d), x = _ += null == $ ? 1 : Math.random() || .1, k = C.length;
                for (d && (c = r === h || r || d); y !== k && null != (u = C[y]); y++) {
                    if (o && u) {
                        for (f = 0,
                        r || u.ownerDocument === h || (p(u),
                        a = !m); g = e[f++]; )
                            if (g(u, r || h, a)) {
                                l.push(u);
                                break
                            }
                        d && (_ = x)
                    }
                    i && ((u = !g && u) && v--,
                    s && b.push(u))
                }
                if (v += y,
                i && y !== v) {
                    for (f = 0; g = t[f++]; )
                        g(b, w, r, a);
                    if (s) {
                        if (v > 0)
                            for (; y--; )
                                b[y] || w[y] || (w[y] = A.call(l));
                        w = we(w)
                    }
                    I.apply(l, w),
                    d && !s && w.length > 0 && v + t.length > 1 && se.uniqueSort(l)
                }
                return d && (_ = x,
                c = $),
                b
            };
            return i ? ae(s) : s
        }
        return ge.prototype = n.filters = n.pseudos,
        n.setFilters = new ge,
        r = se.tokenize = function(e, t) {
            var i, o, s, r, a, l, c, d = k[e + " "];
            if (d)
                return t ? 0 : d.slice(0);
            for (a = e,
            l = [],
            c = n.preFilter; a; ) {
                for (r in i && !(o = F.exec(a)) || (o && (a = a.slice(o[0].length) || a),
                l.push(s = [])),
                i = !1,
                (o = R.exec(a)) && (i = o.shift(),
                s.push({
                    value: i,
                    type: o[0].replace(q, " ")
                }),
                a = a.slice(i.length)),
                n.filter)
                    !(o = Y[r].exec(a)) || c[r] && !(o = c[r](o)) || (i = o.shift(),
                    s.push({
                        value: i,
                        type: r,
                        matches: o
                    }),
                    a = a.slice(i.length));
                if (!i)
                    break
            }
            return t ? a.length : a ? se.error(e) : k(e, l).slice(0)
        }
        ,
        a = se.compile = function(e, t) {
            var i, n = [], o = [], s = T[e + " "];
            if (!s) {
                for (t || (t = r(e)),
                i = t.length; i--; )
                    (s = _e(t[i]))[w] ? n.push(s) : o.push(s);
                (s = T(e, Ce(o, n))).selector = e
            }
            return s
        }
        ,
        l = se.select = function(e, t, i, o) {
            var s, l, c, d, u, p = "function" == typeof e && e, h = !o && r(e = p.selector || e);
            if (i = i || [],
            1 === h.length) {
                if ((l = h[0] = h[0].slice(0)).length > 2 && "ID" === (c = l[0]).type && 9 === t.nodeType && m && n.relative[l[1].type]) {
                    if (!(t = (n.find.ID(c.matches[0].replace(Z, ee), t) || [])[0]))
                        return i;
                    p && (t = t.parentNode),
                    e = e.slice(l.shift().value.length)
                }
                for (s = Y.needsContext.test(e) ? 0 : l.length; s-- && (c = l[s],
                !n.relative[d = c.type]); )
                    if ((u = n.find[d]) && (o = u(c.matches[0].replace(Z, ee), K.test(l[0].type) && me(t.parentNode) || t))) {
                        if (l.splice(s, 1),
                        !(e = o.length && ve(l)))
                            return I.apply(i, o),
                            i;
                        break
                    }
            }
            return (p || a(e, h))(o, t, !m, i, !t || K.test(e) && me(t.parentNode) || t),
            i
        }
        ,
        i.sortStable = w.split("").sort(S).join("") === w,
        i.detectDuplicates = !!u,
        p(),
        i.sortDetached = le((function(e) {
            return 1 & e.compareDocumentPosition(h.createElement("fieldset"))
        }
        )),
        le((function(e) {
            return e.innerHTML = "<a href='#'></a>",
            "#" === e.firstChild.getAttribute("href")
        }
        )) || ce("type|href|height|width", (function(e, t, i) {
            if (!i)
                return e.getAttribute(t, "type" === t.toLowerCase() ? 1 : 2)
        }
        )),
        i.attributes && le((function(e) {
            return e.innerHTML = "<input/>",
            e.firstChild.setAttribute("value", ""),
            "" === e.firstChild.getAttribute("value")
        }
        )) || ce("value", (function(e, t, i) {
            if (!i && "input" === e.nodeName.toLowerCase())
                return e.defaultValue
        }
        )),
        le((function(e) {
            return null == e.getAttribute("disabled")
        }
        )) || ce(N, (function(e, t, i) {
            var n;
            if (!i)
                return !0 === e[t] ? t.toLowerCase() : (n = e.getAttributeNode(t)) && n.specified ? n.value : null
        }
        )),
        se
    }(e);
    v.find = C,
    v.expr = C.selectors,
    v.expr[":"] = v.expr.pseudos,
    v.uniqueSort = v.unique = C.uniqueSort,
    v.text = C.getText,
    v.isXMLDoc = C.isXML,
    v.contains = C.contains,
    v.escapeSelector = C.escape;
    var x = function(e, t, i) {
        for (var n = [], o = void 0 !== i; (e = e[t]) && 9 !== e.nodeType; )
            if (1 === e.nodeType) {
                if (o && v(e).is(i))
                    break;
                n.push(e)
            }
        return n
    }
      , k = function(e, t) {
        for (var i = []; e; e = e.nextSibling)
            1 === e.nodeType && e !== t && i.push(e);
        return i
    }
      , T = v.expr.match.needsContext;
    function S(e, t) {
        return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase()
    }
    var E = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i
      , j = /^.[^:#\[\.,]*$/;
    function A(e, t, i) {
        return v.isFunction(t) ? v.grep(e, (function(e, n) {
            return !!t.call(e, n, e) !== i
        }
        )) : t.nodeType ? v.grep(e, (function(e) {
            return e === t !== i
        }
        )) : "string" != typeof t ? v.grep(e, (function(e) {
            return l.call(t, e) > -1 !== i
        }
        )) : j.test(t) ? v.filter(t, e, i) : (t = v.filter(t, e),
        v.grep(e, (function(e) {
            return l.call(t, e) > -1 !== i && 1 === e.nodeType
        }
        )))
    }
    v.filter = function(e, t, i) {
        var n = t[0];
        return i && (e = ":not(" + e + ")"),
        1 === t.length && 1 === n.nodeType ? v.find.matchesSelector(n, e) ? [n] : [] : v.find.matches(e, v.grep(t, (function(e) {
            return 1 === e.nodeType
        }
        )))
    }
    ,
    v.fn.extend({
        find: function(e) {
            var t, i, n = this.length, o = this;
            if ("string" != typeof e)
                return this.pushStack(v(e).filter((function() {
                    for (t = 0; t < n; t++)
                        if (v.contains(o[t], this))
                            return !0
                }
                )));
            for (i = this.pushStack([]),
            t = 0; t < n; t++)
                v.find(e, o[t], i);
            return n > 1 ? v.uniqueSort(i) : i
        },
        filter: function(e) {
            return this.pushStack(A(this, e || [], !1))
        },
        not: function(e) {
            return this.pushStack(A(this, e || [], !0))
        },
        is: function(e) {
            return !!A(this, "string" == typeof e && T.test(e) ? v(e) : e || [], !1).length
        }
    });
    var O, I = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/, L = v.fn.init = function(e, t, i) {
        var o, s;
        if (!e)
            return this;
        if (i = i || O,
        "string" == typeof e) {
            if (!(o = "<" === e[0] && ">" === e[e.length - 1] && e.length >= 3 ? [null, e, null] : I.exec(e)) || !o[1] && t)
                return !t || t.jquery ? (t || i).find(e) : this.constructor(t).find(e);
            if (o[1]) {
                if (t = t instanceof v ? t[0] : t,
                v.merge(this, v.parseHTML(o[1], t && t.nodeType ? t.ownerDocument || t : n, !0)),
                E.test(o[1]) && v.isPlainObject(t))
                    for (o in t)
                        v.isFunction(this[o]) ? this[o](t[o]) : this.attr(o, t[o]);
                return this
            }
            return (s = n.getElementById(o[2])) && (this[0] = s,
            this.length = 1),
            this
        }
        return e.nodeType ? (this[0] = e,
        this.length = 1,
        this) : v.isFunction(e) ? void 0 !== i.ready ? i.ready(e) : e(v) : v.makeArray(e, this)
    }
    ;
    L.prototype = v.fn,
    O = v(n);
    var D = /^(?:parents|prev(?:Until|All))/
      , N = {
        children: !0,
        contents: !0,
        next: !0,
        prev: !0
    };
    function P(e, t) {
        for (; (e = e[t]) && 1 !== e.nodeType; )
            ;
        return e
    }
    v.fn.extend({
        has: function(e) {
            var t = v(e, this)
              , i = t.length;
            return this.filter((function() {
                for (var e = 0; e < i; e++)
                    if (v.contains(this, t[e]))
                        return !0
            }
            ))
        },
        closest: function(e, t) {
            var i, n = 0, o = this.length, s = [], r = "string" != typeof e && v(e);
            if (!T.test(e))
                for (; n < o; n++)
                    for (i = this[n]; i && i !== t; i = i.parentNode)
                        if (i.nodeType < 11 && (r ? r.index(i) > -1 : 1 === i.nodeType && v.find.matchesSelector(i, e))) {
                            s.push(i);
                            break
                        }
            return this.pushStack(s.length > 1 ? v.uniqueSort(s) : s)
        },
        index: function(e) {
            return e ? "string" == typeof e ? l.call(v(e), this[0]) : l.call(this, e.jquery ? e[0] : e) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
        },
        add: function(e, t) {
            return this.pushStack(v.uniqueSort(v.merge(this.get(), v(e, t))))
        },
        addBack: function(e) {
            return this.add(null == e ? this.prevObject : this.prevObject.filter(e))
        }
    }),
    v.each({
        parent: function(e) {
            var t = e.parentNode;
            return t && 11 !== t.nodeType ? t : null
        },
        parents: function(e) {
            return x(e, "parentNode")
        },
        parentsUntil: function(e, t, i) {
            return x(e, "parentNode", i)
        },
        next: function(e) {
            return P(e, "nextSibling")
        },
        prev: function(e) {
            return P(e, "previousSibling")
        },
        nextAll: function(e) {
            return x(e, "nextSibling")
        },
        prevAll: function(e) {
            return x(e, "previousSibling")
        },
        nextUntil: function(e, t, i) {
            return x(e, "nextSibling", i)
        },
        prevUntil: function(e, t, i) {
            return x(e, "previousSibling", i)
        },
        siblings: function(e) {
            return k((e.parentNode || {}).firstChild, e)
        },
        children: function(e) {
            return k(e.firstChild)
        },
        contents: function(e) {
            return S(e, "iframe") ? e.contentDocument : (S(e, "template") && (e = e.content || e),
            v.merge([], e.childNodes))
        }
    }, (function(e, t) {
        v.fn[e] = function(i, n) {
            var o = v.map(this, t, i);
            return "Until" !== e.slice(-5) && (n = i),
            n && "string" == typeof n && (o = v.filter(n, o)),
            this.length > 1 && (N[e] || v.uniqueSort(o),
            D.test(e) && o.reverse()),
            this.pushStack(o)
        }
    }
    ));
    var M = /[^\x20\t\r\n\f]+/g;
    function H(e) {
        return e
    }
    function z(e) {
        throw e
    }
    function W(e, t, i, n) {
        var o;
        try {
            e && v.isFunction(o = e.promise) ? o.call(e).done(t).fail(i) : e && v.isFunction(o = e.then) ? o.call(e, t, i) : t.apply(void 0, [e].slice(n))
        } catch (e) {
            i.apply(void 0, [e])
        }
    }
    v.Callbacks = function(e) {
        e = "string" == typeof e ? function(e) {
            var t = {};
            return v.each(e.match(M) || [], (function(e, i) {
                t[i] = !0
            }
            )),
            t
        }(e) : v.extend({}, e);
        var t, i, n, o, s = [], r = [], a = -1, l = function() {
            for (o = o || e.once,
            n = t = !0; r.length; a = -1)
                for (i = r.shift(); ++a < s.length; )
                    !1 === s[a].apply(i[0], i[1]) && e.stopOnFalse && (a = s.length,
                    i = !1);
            e.memory || (i = !1),
            t = !1,
            o && (s = i ? [] : "")
        }, c = {
            add: function() {
                return s && (i && !t && (a = s.length - 1,
                r.push(i)),
                function t(i) {
                    v.each(i, (function(i, n) {
                        v.isFunction(n) ? e.unique && c.has(n) || s.push(n) : n && n.length && "string" !== v.type(n) && t(n)
                    }
                    ))
                }(arguments),
                i && !t && l()),
                this
            },
            remove: function() {
                return v.each(arguments, (function(e, t) {
                    for (var i; (i = v.inArray(t, s, i)) > -1; )
                        s.splice(i, 1),
                        i <= a && a--
                }
                )),
                this
            },
            has: function(e) {
                return e ? v.inArray(e, s) > -1 : s.length > 0
            },
            empty: function() {
                return s && (s = []),
                this
            },
            disable: function() {
                return o = r = [],
                s = i = "",
                this
            },
            disabled: function() {
                return !s
            },
            lock: function() {
                return o = r = [],
                i || t || (s = i = ""),
                this
            },
            locked: function() {
                return !!o
            },
            fireWith: function(e, i) {
                return o || (i = [e, (i = i || []).slice ? i.slice() : i],
                r.push(i),
                t || l()),
                this
            },
            fire: function() {
                return c.fireWith(this, arguments),
                this
            },
            fired: function() {
                return !!n
            }
        };
        return c
    }
    ,
    v.extend({
        Deferred: function(t) {
            var i = [["notify", "progress", v.Callbacks("memory"), v.Callbacks("memory"), 2], ["resolve", "done", v.Callbacks("once memory"), v.Callbacks("once memory"), 0, "resolved"], ["reject", "fail", v.Callbacks("once memory"), v.Callbacks("once memory"), 1, "rejected"]]
              , n = "pending"
              , o = {
                state: function() {
                    return n
                },
                always: function() {
                    return s.done(arguments).fail(arguments),
                    this
                },
                catch: function(e) {
                    return o.then(null, e)
                },
                pipe: function() {
                    var e = arguments;
                    return v.Deferred((function(t) {
                        v.each(i, (function(i, n) {
                            var o = v.isFunction(e[n[4]]) && e[n[4]];
                            s[n[1]]((function() {
                                var e = o && o.apply(this, arguments);
                                e && v.isFunction(e.promise) ? e.promise().progress(t.notify).done(t.resolve).fail(t.reject) : t[n[0] + "With"](this, o ? [e] : arguments)
                            }
                            ))
                        }
                        )),
                        e = null
                    }
                    )).promise()
                },
                then: function(t, n, o) {
                    var s = 0;
                    function r(t, i, n, o) {
                        return function() {
                            var a = this
                              , l = arguments
                              , c = function() {
                                var e, c;
                                if (!(t < s)) {
                                    if ((e = n.apply(a, l)) === i.promise())
                                        throw new TypeError("Thenable self-resolution");
                                    c = e && ("object" == typeof e || "function" == typeof e) && e.then,
                                    v.isFunction(c) ? o ? c.call(e, r(s, i, H, o), r(s, i, z, o)) : (s++,
                                    c.call(e, r(s, i, H, o), r(s, i, z, o), r(s, i, H, i.notifyWith))) : (n !== H && (a = void 0,
                                    l = [e]),
                                    (o || i.resolveWith)(a, l))
                                }
                            }
                              , d = o ? c : function() {
                                try {
                                    c()
                                } catch (e) {
                                    v.Deferred.exceptionHook && v.Deferred.exceptionHook(e, d.stackTrace),
                                    t + 1 >= s && (n !== z && (a = void 0,
                                    l = [e]),
                                    i.rejectWith(a, l))
                                }
                            }
                            ;
                            t ? d() : (v.Deferred.getStackHook && (d.stackTrace = v.Deferred.getStackHook()),
                            e.setTimeout(d))
                        }
                    }
                    return v.Deferred((function(e) {
                        i[0][3].add(r(0, e, v.isFunction(o) ? o : H, e.notifyWith)),
                        i[1][3].add(r(0, e, v.isFunction(t) ? t : H)),
                        i[2][3].add(r(0, e, v.isFunction(n) ? n : z))
                    }
                    )).promise()
                },
                promise: function(e) {
                    return null != e ? v.extend(e, o) : o
                }
            }
              , s = {};
            return v.each(i, (function(e, t) {
                var r = t[2]
                  , a = t[5];
                o[t[1]] = r.add,
                a && r.add((function() {
                    n = a
                }
                ), i[3 - e][2].disable, i[0][2].lock),
                r.add(t[3].fire),
                s[t[0]] = function() {
                    return s[t[0] + "With"](this === s ? void 0 : this, arguments),
                    this
                }
                ,
                s[t[0] + "With"] = r.fireWith
            }
            )),
            o.promise(s),
            t && t.call(s, s),
            s
        },
        when: function(e) {
            var t = arguments.length
              , i = t
              , n = Array(i)
              , o = s.call(arguments)
              , r = v.Deferred()
              , a = function(e) {
                return function(i) {
                    n[e] = this,
                    o[e] = arguments.length > 1 ? s.call(arguments) : i,
                    --t || r.resolveWith(n, o)
                }
            };
            if (t <= 1 && (W(e, r.done(a(i)).resolve, r.reject, !t),
            "pending" === r.state() || v.isFunction(o[i] && o[i].then)))
                return r.then();
            for (; i--; )
                W(o[i], a(i), r.reject);
            return r.promise()
        }
    });
    var q = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;
    v.Deferred.exceptionHook = function(t, i) {
        e.console && e.console.warn && t && q.test(t.name) && e.console.warn("jQuery.Deferred exception: " + t.message, t.stack, i)
    }
    ,
    v.readyException = function(t) {
        e.setTimeout((function() {
            throw t
        }
        ))
    }
    ;
    var F = v.Deferred();
    function R() {
        n.removeEventListener("DOMContentLoaded", R),
        e.removeEventListener("load", R),
        v.ready()
    }
    v.fn.ready = function(e) {
        return F.then(e).catch((function(e) {
            v.readyException(e)
        }
        )),
        this
    }
    ,
    v.extend({
        isReady: !1,
        readyWait: 1,
        ready: function(e) {
            (!0 === e ? --v.readyWait : v.isReady) || (v.isReady = !0,
            !0 !== e && --v.readyWait > 0 || F.resolveWith(n, [v]))
        }
    }),
    v.ready.then = F.then,
    "complete" === n.readyState || "loading" !== n.readyState && !n.documentElement.doScroll ? e.setTimeout(v.ready) : (n.addEventListener("DOMContentLoaded", R),
    e.addEventListener("load", R));
    var B = function(e, t, i, n, o, s, r) {
        var a = 0
          , l = e.length
          , c = null == i;
        if ("object" === v.type(i))
            for (a in o = !0,
            i)
                B(e, t, a, i[a], !0, s, r);
        else if (void 0 !== n && (o = !0,
        v.isFunction(n) || (r = !0),
        c && (r ? (t.call(e, n),
        t = null) : (c = t,
        t = function(e, t, i) {
            return c.call(v(e), i)
        }
        )),
        t))
            for (; a < l; a++)
                t(e[a], i, r ? n : n.call(e[a], a, t(e[a], i)));
        return o ? e : c ? t.call(e) : l ? t(e[0], i) : s
    }
      , U = function(e) {
        return 1 === e.nodeType || 9 === e.nodeType || !+e.nodeType
    };
    function G() {
        this.expando = v.expando + G.uid++
    }
    G.uid = 1,
    G.prototype = {
        cache: function(e) {
            var t = e[this.expando];
            return t || (t = {},
            U(e) && (e.nodeType ? e[this.expando] = t : Object.defineProperty(e, this.expando, {
                value: t,
                configurable: !0
            }))),
            t
        },
        set: function(e, t, i) {
            var n, o = this.cache(e);
            if ("string" == typeof t)
                o[v.camelCase(t)] = i;
            else
                for (n in t)
                    o[v.camelCase(n)] = t[n];
            return o
        },
        get: function(e, t) {
            return void 0 === t ? this.cache(e) : e[this.expando] && e[this.expando][v.camelCase(t)]
        },
        access: function(e, t, i) {
            return void 0 === t || t && "string" == typeof t && void 0 === i ? this.get(e, t) : (this.set(e, t, i),
            void 0 !== i ? i : t)
        },
        remove: function(e, t) {
            var i, n = e[this.expando];
            if (void 0 !== n) {
                if (void 0 !== t) {
                    Array.isArray(t) ? t = t.map(v.camelCase) : t = (t = v.camelCase(t))in n ? [t] : t.match(M) || [],
                    i = t.length;
                    for (; i--; )
                        delete n[t[i]]
                }
                (void 0 === t || v.isEmptyObject(n)) && (e.nodeType ? e[this.expando] = void 0 : delete e[this.expando])
            }
        },
        hasData: function(e) {
            var t = e[this.expando];
            return void 0 !== t && !v.isEmptyObject(t)
        }
    };
    var Y = new G
      , V = new G
      , X = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/
      , Q = /[A-Z]/g;
    function J(e, t, i) {
        var n;
        if (void 0 === i && 1 === e.nodeType)
            if (n = "data-" + t.replace(Q, "-$&").toLowerCase(),
            "string" == typeof (i = e.getAttribute(n))) {
                try {
                    i = function(e) {
                        return "true" === e || "false" !== e && ("null" === e ? null : e === +e + "" ? +e : X.test(e) ? JSON.parse(e) : e)
                    }(i)
                } catch (e) {}
                V.set(e, t, i)
            } else
                i = void 0;
        return i
    }
    v.extend({
        hasData: function(e) {
            return V.hasData(e) || Y.hasData(e)
        },
        data: function(e, t, i) {
            return V.access(e, t, i)
        },
        removeData: function(e, t) {
            V.remove(e, t)
        },
        _data: function(e, t, i) {
            return Y.access(e, t, i)
        },
        _removeData: function(e, t) {
            Y.remove(e, t)
        }
    }),
    v.fn.extend({
        data: function(e, t) {
            var i, n, o, s = this[0], r = s && s.attributes;
            if (void 0 === e) {
                if (this.length && (o = V.get(s),
                1 === s.nodeType && !Y.get(s, "hasDataAttrs"))) {
                    for (i = r.length; i--; )
                        r[i] && (0 === (n = r[i].name).indexOf("data-") && (n = v.camelCase(n.slice(5)),
                        J(s, n, o[n])));
                    Y.set(s, "hasDataAttrs", !0)
                }
                return o
            }
            return "object" == typeof e ? this.each((function() {
                V.set(this, e)
            }
            )) : B(this, (function(t) {
                var i;
                if (s && void 0 === t) {
                    if (void 0 !== (i = V.get(s, e)))
                        return i;
                    if (void 0 !== (i = J(s, e)))
                        return i
                } else
                    this.each((function() {
                        V.set(this, e, t)
                    }
                    ))
            }
            ), null, t, arguments.length > 1, null, !0)
        },
        removeData: function(e) {
            return this.each((function() {
                V.remove(this, e)
            }
            ))
        }
    }),
    v.extend({
        queue: function(e, t, i) {
            var n;
            if (e)
                return t = (t || "fx") + "queue",
                n = Y.get(e, t),
                i && (!n || Array.isArray(i) ? n = Y.access(e, t, v.makeArray(i)) : n.push(i)),
                n || []
        },
        dequeue: function(e, t) {
            t = t || "fx";
            var i = v.queue(e, t)
              , n = i.length
              , o = i.shift()
              , s = v._queueHooks(e, t);
            "inprogress" === o && (o = i.shift(),
            n--),
            o && ("fx" === t && i.unshift("inprogress"),
            delete s.stop,
            o.call(e, (function() {
                v.dequeue(e, t)
            }
            ), s)),
            !n && s && s.empty.fire()
        },
        _queueHooks: function(e, t) {
            var i = t + "queueHooks";
            return Y.get(e, i) || Y.access(e, i, {
                empty: v.Callbacks("once memory").add((function() {
                    Y.remove(e, [t + "queue", i])
                }
                ))
            })
        }
    }),
    v.fn.extend({
        queue: function(e, t) {
            var i = 2;
            return "string" != typeof e && (t = e,
            e = "fx",
            i--),
            arguments.length < i ? v.queue(this[0], e) : void 0 === t ? this : this.each((function() {
                var i = v.queue(this, e, t);
                v._queueHooks(this, e),
                "fx" === e && "inprogress" !== i[0] && v.dequeue(this, e)
            }
            ))
        },
        dequeue: function(e) {
            return this.each((function() {
                v.dequeue(this, e)
            }
            ))
        },
        clearQueue: function(e) {
            return this.queue(e || "fx", [])
        },
        promise: function(e, t) {
            var i, n = 1, o = v.Deferred(), s = this, r = this.length, a = function() {
                --n || o.resolveWith(s, [s])
            };
            for ("string" != typeof e && (t = e,
            e = void 0),
            e = e || "fx"; r--; )
                (i = Y.get(s[r], e + "queueHooks")) && i.empty && (n++,
                i.empty.add(a));
            return a(),
            o.promise(t)
        }
    });
    var K = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source
      , Z = new RegExp("^(?:([+-])=|)(" + K + ")([a-z%]*)$","i")
      , ee = ["Top", "Right", "Bottom", "Left"]
      , te = function(e, t) {
        return "none" === (e = t || e).style.display || "" === e.style.display && v.contains(e.ownerDocument, e) && "none" === v.css(e, "display")
    }
      , ie = function(e, t, i, n) {
        var o, s, r = {};
        for (s in t)
            r[s] = e.style[s],
            e.style[s] = t[s];
        for (s in o = i.apply(e, n || []),
        t)
            e.style[s] = r[s];
        return o
    };
    function ne(e, t, i, n) {
        var o, s = 1, r = 20, a = n ? function() {
            return n.cur()
        }
        : function() {
            return v.css(e, t, "")
        }
        , l = a(), c = i && i[3] || (v.cssNumber[t] ? "" : "px"), d = (v.cssNumber[t] || "px" !== c && +l) && Z.exec(v.css(e, t));
        if (d && d[3] !== c) {
            c = c || d[3],
            i = i || [],
            d = +l || 1;
            do {
                d /= s = s || ".5",
                v.style(e, t, d + c)
            } while (s !== (s = a() / l) && 1 !== s && --r)
        }
        return i && (d = +d || +l || 0,
        o = i[1] ? d + (i[1] + 1) * i[2] : +i[2],
        n && (n.unit = c,
        n.start = d,
        n.end = o)),
        o
    }
    var oe = {};
    function se(e) {
        var t, i = e.ownerDocument, n = e.nodeName, o = oe[n];
        return o || (t = i.body.appendChild(i.createElement(n)),
        o = v.css(t, "display"),
        t.parentNode.removeChild(t),
        "none" === o && (o = "block"),
        oe[n] = o,
        o)
    }
    function re(e, t) {
        for (var i, n, o = [], s = 0, r = e.length; s < r; s++)
            (n = e[s]).style && (i = n.style.display,
            t ? ("none" === i && (o[s] = Y.get(n, "display") || null,
            o[s] || (n.style.display = "")),
            "" === n.style.display && te(n) && (o[s] = se(n))) : "none" !== i && (o[s] = "none",
            Y.set(n, "display", i)));
        for (s = 0; s < r; s++)
            null != o[s] && (e[s].style.display = o[s]);
        return e
    }
    v.fn.extend({
        show: function() {
            return re(this, !0)
        },
        hide: function() {
            return re(this)
        },
        toggle: function(e) {
            return "boolean" == typeof e ? e ? this.show() : this.hide() : this.each((function() {
                te(this) ? v(this).show() : v(this).hide()
            }
            ))
        }
    });
    var ae = /^(?:checkbox|radio)$/i
      , le = /<([a-z][^\/\0>\x20\t\r\n\f]+)/i
      , ce = /^$|\/(?:java|ecma)script/i
      , de = {
        option: [1, "<select multiple='multiple'>", "</select>"],
        thead: [1, "<table>", "</table>"],
        col: [2, "<table><colgroup>", "</colgroup></table>"],
        tr: [2, "<table><tbody>", "</tbody></table>"],
        td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
        _default: [0, "", ""]
    };
    function ue(e, t) {
        var i;
        return i = void 0 !== e.getElementsByTagName ? e.getElementsByTagName(t || "*") : void 0 !== e.querySelectorAll ? e.querySelectorAll(t || "*") : [],
        void 0 === t || t && S(e, t) ? v.merge([e], i) : i
    }
    function pe(e, t) {
        for (var i = 0, n = e.length; i < n; i++)
            Y.set(e[i], "globalEval", !t || Y.get(t[i], "globalEval"))
    }
    de.optgroup = de.option,
    de.tbody = de.tfoot = de.colgroup = de.caption = de.thead,
    de.th = de.td;
    var he = /<|&#?\w+;/;
    function fe(e, t, i, n, o) {
        for (var s, r, a, l, c, d, u = t.createDocumentFragment(), p = [], h = 0, f = e.length; h < f; h++)
            if ((s = e[h]) || 0 === s)
                if ("object" === v.type(s))
                    v.merge(p, s.nodeType ? [s] : s);
                else if (he.test(s)) {
                    for (r = r || u.appendChild(t.createElement("div")),
                    a = (le.exec(s) || ["", ""])[1].toLowerCase(),
                    l = de[a] || de._default,
                    r.innerHTML = l[1] + v.htmlPrefilter(s) + l[2],
                    d = l[0]; d--; )
                        r = r.lastChild;
                    v.merge(p, r.childNodes),
                    (r = u.firstChild).textContent = ""
                } else
                    p.push(t.createTextNode(s));
        for (u.textContent = "",
        h = 0; s = p[h++]; )
            if (n && v.inArray(s, n) > -1)
                o && o.push(s);
            else if (c = v.contains(s.ownerDocument, s),
            r = ue(u.appendChild(s), "script"),
            c && pe(r),
            i)
                for (d = 0; s = r[d++]; )
                    ce.test(s.type || "") && i.push(s);
        return u
    }
    !function() {
        var e = n.createDocumentFragment().appendChild(n.createElement("div"))
          , t = n.createElement("input");
        t.setAttribute("type", "radio"),
        t.setAttribute("checked", "checked"),
        t.setAttribute("name", "t"),
        e.appendChild(t),
        f.checkClone = e.cloneNode(!0).cloneNode(!0).lastChild.checked,
        e.innerHTML = "<textarea>x</textarea>",
        f.noCloneChecked = !!e.cloneNode(!0).lastChild.defaultValue
    }();
    var me = n.documentElement
      , ge = /^key/
      , ve = /^(?:mouse|pointer|contextmenu|drag|drop)|click/
      , ye = /^([^.]*)(?:\.(.+)|)/;
    function be() {
        return !0
    }
    function we() {
        return !1
    }
    function $e() {
        try {
            return n.activeElement
        } catch (e) {}
    }
    function _e(e, t, i, n, o, s) {
        var r, a;
        if ("object" == typeof t) {
            for (a in "string" != typeof i && (n = n || i,
            i = void 0),
            t)
                _e(e, a, i, n, t[a], s);
            return e
        }
        if (null == n && null == o ? (o = i,
        n = i = void 0) : null == o && ("string" == typeof i ? (o = n,
        n = void 0) : (o = n,
        n = i,
        i = void 0)),
        !1 === o)
            o = we;
        else if (!o)
            return e;
        return 1 === s && (r = o,
        o = function(e) {
            return v().off(e),
            r.apply(this, arguments)
        }
        ,
        o.guid = r.guid || (r.guid = v.guid++)),
        e.each((function() {
            v.event.add(this, t, o, n, i)
        }
        ))
    }
    v.event = {
        global: {},
        add: function(e, t, i, n, o) {
            var s, r, a, l, c, d, u, p, h, f, m, g = Y.get(e);
            if (g)
                for (i.handler && (i = (s = i).handler,
                o = s.selector),
                o && v.find.matchesSelector(me, o),
                i.guid || (i.guid = v.guid++),
                (l = g.events) || (l = g.events = {}),
                (r = g.handle) || (r = g.handle = function(t) {
                    return void 0 !== v && v.event.triggered !== t.type ? v.event.dispatch.apply(e, arguments) : void 0
                }
                ),
                c = (t = (t || "").match(M) || [""]).length; c--; )
                    h = m = (a = ye.exec(t[c]) || [])[1],
                    f = (a[2] || "").split(".").sort(),
                    h && (u = v.event.special[h] || {},
                    h = (o ? u.delegateType : u.bindType) || h,
                    u = v.event.special[h] || {},
                    d = v.extend({
                        type: h,
                        origType: m,
                        data: n,
                        handler: i,
                        guid: i.guid,
                        selector: o,
                        needsContext: o && v.expr.match.needsContext.test(o),
                        namespace: f.join(".")
                    }, s),
                    (p = l[h]) || ((p = l[h] = []).delegateCount = 0,
                    u.setup && !1 !== u.setup.call(e, n, f, r) || e.addEventListener && e.addEventListener(h, r)),
                    u.add && (u.add.call(e, d),
                    d.handler.guid || (d.handler.guid = i.guid)),
                    o ? p.splice(p.delegateCount++, 0, d) : p.push(d),
                    v.event.global[h] = !0)
        },
        remove: function(e, t, i, n, o) {
            var s, r, a, l, c, d, u, p, h, f, m, g = Y.hasData(e) && Y.get(e);
            if (g && (l = g.events)) {
                for (c = (t = (t || "").match(M) || [""]).length; c--; )
                    if (h = m = (a = ye.exec(t[c]) || [])[1],
                    f = (a[2] || "").split(".").sort(),
                    h) {
                        for (u = v.event.special[h] || {},
                        p = l[h = (n ? u.delegateType : u.bindType) || h] || [],
                        a = a[2] && new RegExp("(^|\\.)" + f.join("\\.(?:.*\\.|)") + "(\\.|$)"),
                        r = s = p.length; s--; )
                            d = p[s],
                            !o && m !== d.origType || i && i.guid !== d.guid || a && !a.test(d.namespace) || n && n !== d.selector && ("**" !== n || !d.selector) || (p.splice(s, 1),
                            d.selector && p.delegateCount--,
                            u.remove && u.remove.call(e, d));
                        r && !p.length && (u.teardown && !1 !== u.teardown.call(e, f, g.handle) || v.removeEvent(e, h, g.handle),
                        delete l[h])
                    } else
                        for (h in l)
                            v.event.remove(e, h + t[c], i, n, !0);
                v.isEmptyObject(l) && Y.remove(e, "handle events")
            }
        },
        dispatch: function(e) {
            var t, i, n, o, s, r, a = v.event.fix(e), l = new Array(arguments.length), c = (Y.get(this, "events") || {})[a.type] || [], d = v.event.special[a.type] || {};
            for (l[0] = a,
            t = 1; t < arguments.length; t++)
                l[t] = arguments[t];
            if (a.delegateTarget = this,
            !d.preDispatch || !1 !== d.preDispatch.call(this, a)) {
                for (r = v.event.handlers.call(this, a, c),
                t = 0; (o = r[t++]) && !a.isPropagationStopped(); )
                    for (a.currentTarget = o.elem,
                    i = 0; (s = o.handlers[i++]) && !a.isImmediatePropagationStopped(); )
                        a.rnamespace && !a.rnamespace.test(s.namespace) || (a.handleObj = s,
                        a.data = s.data,
                        void 0 !== (n = ((v.event.special[s.origType] || {}).handle || s.handler).apply(o.elem, l)) && !1 === (a.result = n) && (a.preventDefault(),
                        a.stopPropagation()));
                return d.postDispatch && d.postDispatch.call(this, a),
                a.result
            }
        },
        handlers: function(e, t) {
            var i, n, o, s, r, a = [], l = t.delegateCount, c = e.target;
            if (l && c.nodeType && !("click" === e.type && e.button >= 1))
                for (; c !== this; c = c.parentNode || this)
                    if (1 === c.nodeType && ("click" !== e.type || !0 !== c.disabled)) {
                        for (s = [],
                        r = {},
                        i = 0; i < l; i++)
                            void 0 === r[o = (n = t[i]).selector + " "] && (r[o] = n.needsContext ? v(o, this).index(c) > -1 : v.find(o, this, null, [c]).length),
                            r[o] && s.push(n);
                        s.length && a.push({
                            elem: c,
                            handlers: s
                        })
                    }
            return c = this,
            l < t.length && a.push({
                elem: c,
                handlers: t.slice(l)
            }),
            a
        },
        addProp: function(e, t) {
            Object.defineProperty(v.Event.prototype, e, {
                enumerable: !0,
                configurable: !0,
                get: v.isFunction(t) ? function() {
                    if (this.originalEvent)
                        return t(this.originalEvent)
                }
                : function() {
                    if (this.originalEvent)
                        return this.originalEvent[e]
                }
                ,
                set: function(t) {
                    Object.defineProperty(this, e, {
                        enumerable: !0,
                        configurable: !0,
                        writable: !0,
                        value: t
                    })
                }
            })
        },
        fix: function(e) {
            return e[v.expando] ? e : new v.Event(e)
        },
        special: {
            load: {
                noBubble: !0
            },
            focus: {
                trigger: function() {
                    if (this !== $e() && this.focus)
                        return this.focus(),
                        !1
                },
                delegateType: "focusin"
            },
            blur: {
                trigger: function() {
                    if (this === $e() && this.blur)
                        return this.blur(),
                        !1
                },
                delegateType: "focusout"
            },
            click: {
                trigger: function() {
                    if ("checkbox" === this.type && this.click && S(this, "input"))
                        return this.click(),
                        !1
                },
                _default: function(e) {
                    return S(e.target, "a")
                }
            },
            beforeunload: {
                postDispatch: function(e) {
                    void 0 !== e.result && e.originalEvent && (e.originalEvent.returnValue = e.result)
                }
            }
        }
    },
    v.removeEvent = function(e, t, i) {
        e.removeEventListener && e.removeEventListener(t, i)
    }
    ,
    v.Event = function(e, t) {
        return this instanceof v.Event ? (e && e.type ? (this.originalEvent = e,
        this.type = e.type,
        this.isDefaultPrevented = e.defaultPrevented || void 0 === e.defaultPrevented && !1 === e.returnValue ? be : we,
        this.target = e.target && 3 === e.target.nodeType ? e.target.parentNode : e.target,
        this.currentTarget = e.currentTarget,
        this.relatedTarget = e.relatedTarget) : this.type = e,
        t && v.extend(this, t),
        this.timeStamp = e && e.timeStamp || v.now(),
        void (this[v.expando] = !0)) : new v.Event(e,t)
    }
    ,
    v.Event.prototype = {
        constructor: v.Event,
        isDefaultPrevented: we,
        isPropagationStopped: we,
        isImmediatePropagationStopped: we,
        isSimulated: !1,
        preventDefault: function() {
            var e = this.originalEvent;
            this.isDefaultPrevented = be,
            e && !this.isSimulated && e.preventDefault()
        },
        stopPropagation: function() {
            var e = this.originalEvent;
            this.isPropagationStopped = be,
            e && !this.isSimulated && e.stopPropagation()
        },
        stopImmediatePropagation: function() {
            var e = this.originalEvent;
            this.isImmediatePropagationStopped = be,
            e && !this.isSimulated && e.stopImmediatePropagation(),
            this.stopPropagation()
        }
    },
    v.each({
        altKey: !0,
        bubbles: !0,
        cancelable: !0,
        changedTouches: !0,
        ctrlKey: !0,
        detail: !0,
        eventPhase: !0,
        metaKey: !0,
        pageX: !0,
        pageY: !0,
        shiftKey: !0,
        view: !0,
        char: !0,
        charCode: !0,
        key: !0,
        keyCode: !0,
        button: !0,
        buttons: !0,
        clientX: !0,
        clientY: !0,
        offsetX: !0,
        offsetY: !0,
        pointerId: !0,
        pointerType: !0,
        screenX: !0,
        screenY: !0,
        targetTouches: !0,
        toElement: !0,
        touches: !0,
        which: function(e) {
            var t = e.button;
            return null == e.which && ge.test(e.type) ? null != e.charCode ? e.charCode : e.keyCode : !e.which && void 0 !== t && ve.test(e.type) ? 1 & t ? 1 : 2 & t ? 3 : 4 & t ? 2 : 0 : e.which
        }
    }, v.event.addProp),
    v.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout",
        pointerenter: "pointerover",
        pointerleave: "pointerout"
    }, (function(e, t) {
        v.event.special[e] = {
            delegateType: t,
            bindType: t,
            handle: function(e) {
                var i, n = e.relatedTarget, o = e.handleObj;
                return n && (n === this || v.contains(this, n)) || (e.type = o.origType,
                i = o.handler.apply(this, arguments),
                e.type = t),
                i
            }
        }
    }
    )),
    v.fn.extend({
        on: function(e, t, i, n) {
            return _e(this, e, t, i, n)
        },
        one: function(e, t, i, n) {
            return _e(this, e, t, i, n, 1)
        },
        off: function(e, t, i) {
            var n, o;
            if (e && e.preventDefault && e.handleObj)
                return n = e.handleObj,
                v(e.delegateTarget).off(n.namespace ? n.origType + "." + n.namespace : n.origType, n.selector, n.handler),
                this;
            if ("object" == typeof e) {
                for (o in e)
                    this.off(o, t, e[o]);
                return this
            }
            return !1 !== t && "function" != typeof t || (i = t,
            t = void 0),
            !1 === i && (i = we),
            this.each((function() {
                v.event.remove(this, e, i, t)
            }
            ))
        }
    });
    var Ce = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi
      , xe = /<script|<style|<link/i
      , ke = /checked\s*(?:[^=]|=\s*.checked.)/i
      , Te = /^true\/(.*)/
      , Se = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;
    function Ee(e, t) {
        return S(e, "table") && S(11 !== t.nodeType ? t : t.firstChild, "tr") && v(">tbody", e)[0] || e
    }
    function je(e) {
        return e.type = (null !== e.getAttribute("type")) + "/" + e.type,
        e
    }
    function Ae(e) {
        var t = Te.exec(e.type);
        return t ? e.type = t[1] : e.removeAttribute("type"),
        e
    }
    function Oe(e, t) {
        var i, n, o, s, r, a, l, c;
        if (1 === t.nodeType) {
            if (Y.hasData(e) && (s = Y.access(e),
            r = Y.set(t, s),
            c = s.events))
                for (o in delete r.handle,
                r.events = {},
                c)
                    for (i = 0,
                    n = c[o].length; i < n; i++)
                        v.event.add(t, o, c[o][i]);
            V.hasData(e) && (a = V.access(e),
            l = v.extend({}, a),
            V.set(t, l))
        }
    }
    function Ie(e, t) {
        var i = t.nodeName.toLowerCase();
        "input" === i && ae.test(e.type) ? t.checked = e.checked : "input" !== i && "textarea" !== i || (t.defaultValue = e.defaultValue)
    }
    function Le(e, t, i, n) {
        t = r.apply([], t);
        var o, s, a, l, c, d, u = 0, p = e.length, h = p - 1, g = t[0], y = v.isFunction(g);
        if (y || p > 1 && "string" == typeof g && !f.checkClone && ke.test(g))
            return e.each((function(o) {
                var s = e.eq(o);
                y && (t[0] = g.call(this, o, s.html())),
                Le(s, t, i, n)
            }
            ));
        if (p && (s = (o = fe(t, e[0].ownerDocument, !1, e, n)).firstChild,
        1 === o.childNodes.length && (o = s),
        s || n)) {
            for (l = (a = v.map(ue(o, "script"), je)).length; u < p; u++)
                c = o,
                u !== h && (c = v.clone(c, !0, !0),
                l && v.merge(a, ue(c, "script"))),
                i.call(e[u], c, u);
            if (l)
                for (d = a[a.length - 1].ownerDocument,
                v.map(a, Ae),
                u = 0; u < l; u++)
                    c = a[u],
                    ce.test(c.type || "") && !Y.access(c, "globalEval") && v.contains(d, c) && (c.src ? v._evalUrl && v._evalUrl(c.src) : m(c.textContent.replace(Se, ""), d))
        }
        return e
    }
    function De(e, t, i) {
        for (var n, o = t ? v.filter(t, e) : e, s = 0; null != (n = o[s]); s++)
            i || 1 !== n.nodeType || v.cleanData(ue(n)),
            n.parentNode && (i && v.contains(n.ownerDocument, n) && pe(ue(n, "script")),
            n.parentNode.removeChild(n));
        return e
    }
    v.extend({
        htmlPrefilter: function(e) {
            return e.replace(Ce, "<$1></$2>")
        },
        clone: function(e, t, i) {
            var n, o, s, r, a = e.cloneNode(!0), l = v.contains(e.ownerDocument, e);
            if (!(f.noCloneChecked || 1 !== e.nodeType && 11 !== e.nodeType || v.isXMLDoc(e)))
                for (r = ue(a),
                n = 0,
                o = (s = ue(e)).length; n < o; n++)
                    Ie(s[n], r[n]);
            if (t)
                if (i)
                    for (s = s || ue(e),
                    r = r || ue(a),
                    n = 0,
                    o = s.length; n < o; n++)
                        Oe(s[n], r[n]);
                else
                    Oe(e, a);
            return (r = ue(a, "script")).length > 0 && pe(r, !l && ue(e, "script")),
            a
        },
        cleanData: function(e) {
            for (var t, i, n, o = v.event.special, s = 0; void 0 !== (i = e[s]); s++)
                if (U(i)) {
                    if (t = i[Y.expando]) {
                        if (t.events)
                            for (n in t.events)
                                o[n] ? v.event.remove(i, n) : v.removeEvent(i, n, t.handle);
                        i[Y.expando] = void 0
                    }
                    i[V.expando] && (i[V.expando] = void 0)
                }
        }
    }),
    v.fn.extend({
        detach: function(e) {
            return De(this, e, !0)
        },
        remove: function(e) {
            return De(this, e)
        },
        text: function(e) {
            return B(this, (function(e) {
                return void 0 === e ? v.text(this) : this.empty().each((function() {
                    1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || (this.textContent = e)
                }
                ))
            }
            ), null, e, arguments.length)
        },
        append: function() {
            return Le(this, arguments, (function(e) {
                1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || Ee(this, e).appendChild(e)
            }
            ))
        },
        prepend: function() {
            return Le(this, arguments, (function(e) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var t = Ee(this, e);
                    t.insertBefore(e, t.firstChild)
                }
            }
            ))
        },
        before: function() {
            return Le(this, arguments, (function(e) {
                this.parentNode && this.parentNode.insertBefore(e, this)
            }
            ))
        },
        after: function() {
            return Le(this, arguments, (function(e) {
                this.parentNode && this.parentNode.insertBefore(e, this.nextSibling)
            }
            ))
        },
        empty: function() {
            for (var e, t = 0; null != (e = this[t]); t++)
                1 === e.nodeType && (v.cleanData(ue(e, !1)),
                e.textContent = "");
            return this
        },
        clone: function(e, t) {
            return e = null != e && e,
            t = null == t ? e : t,
            this.map((function() {
                return v.clone(this, e, t)
            }
            ))
        },
        html: function(e) {
            return B(this, (function(e) {
                var t = this[0] || {}
                  , i = 0
                  , n = this.length;
                if (void 0 === e && 1 === t.nodeType)
                    return t.innerHTML;
                if ("string" == typeof e && !xe.test(e) && !de[(le.exec(e) || ["", ""])[1].toLowerCase()]) {
                    e = v.htmlPrefilter(e);
                    try {
                        for (; i < n; i++)
                            1 === (t = this[i] || {}).nodeType && (v.cleanData(ue(t, !1)),
                            t.innerHTML = e);
                        t = 0
                    } catch (e) {}
                }
                t && this.empty().append(e)
            }
            ), null, e, arguments.length)
        },
        replaceWith: function() {
            var e = [];
            return Le(this, arguments, (function(t) {
                var i = this.parentNode;
                v.inArray(this, e) < 0 && (v.cleanData(ue(this)),
                i && i.replaceChild(t, this))
            }
            ), e)
        }
    }),
    v.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, (function(e, t) {
        v.fn[e] = function(e) {
            for (var i, n = [], o = v(e), s = o.length - 1, r = 0; r <= s; r++)
                i = r === s ? this : this.clone(!0),
                v(o[r])[t](i),
                a.apply(n, i.get());
            return this.pushStack(n)
        }
    }
    ));
    var Ne = /^margin/
      , Pe = new RegExp("^(" + K + ")(?!px)[a-z%]+$","i")
      , Me = function(t) {
        var i = t.ownerDocument.defaultView;
        return i && i.opener || (i = e),
        i.getComputedStyle(t)
    };
    function He(e, t, i) {
        var n, o, s, r, a = e.style;
        return (i = i || Me(e)) && ("" !== (r = i.getPropertyValue(t) || i[t]) || v.contains(e.ownerDocument, e) || (r = v.style(e, t)),
        !f.pixelMarginRight() && Pe.test(r) && Ne.test(t) && (n = a.width,
        o = a.minWidth,
        s = a.maxWidth,
        a.minWidth = a.maxWidth = a.width = r,
        r = i.width,
        a.width = n,
        a.minWidth = o,
        a.maxWidth = s)),
        void 0 !== r ? r + "" : r
    }
    function ze(e, t) {
        return {
            get: function() {
                return e() ? void delete this.get : (this.get = t).apply(this, arguments)
            }
        }
    }
    !function() {
        function t() {
            if (l) {
                l.style.cssText = "box-sizing:border-box;position:relative;display:block;margin:auto;border:1px;padding:1px;top:1%;width:50%",
                l.innerHTML = "",
                me.appendChild(a);
                var t = e.getComputedStyle(l);
                i = "1%" !== t.top,
                r = "2px" === t.marginLeft,
                o = "4px" === t.width,
                l.style.marginRight = "50%",
                s = "4px" === t.marginRight,
                me.removeChild(a),
                l = null
            }
        }
        var i, o, s, r, a = n.createElement("div"), l = n.createElement("div");
        l.style && (l.style.backgroundClip = "content-box",
        l.cloneNode(!0).style.backgroundClip = "",
        f.clearCloneStyle = "content-box" === l.style.backgroundClip,
        a.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;padding:0;margin-top:1px;position:absolute",
        a.appendChild(l),
        v.extend(f, {
            pixelPosition: function() {
                return t(),
                i
            },
            boxSizingReliable: function() {
                return t(),
                o
            },
            pixelMarginRight: function() {
                return t(),
                s
            },
            reliableMarginLeft: function() {
                return t(),
                r
            }
        }))
    }();
    var We = /^(none|table(?!-c[ea]).+)/
      , qe = /^--/
      , Fe = {
        position: "absolute",
        visibility: "hidden",
        display: "block"
    }
      , Re = {
        letterSpacing: "0",
        fontWeight: "400"
    }
      , Be = ["Webkit", "Moz", "ms"]
      , Ue = n.createElement("div").style;
    function Ge(e) {
        var t = v.cssProps[e];
        return t || (t = v.cssProps[e] = function(e) {
            if (e in Ue)
                return e;
            for (var t = e[0].toUpperCase() + e.slice(1), i = Be.length; i--; )
                if ((e = Be[i] + t)in Ue)
                    return e
        }(e) || e),
        t
    }
    function Ye(e, t, i) {
        var n = Z.exec(t);
        return n ? Math.max(0, n[2] - (i || 0)) + (n[3] || "px") : t
    }
    function Ve(e, t, i, n, o) {
        var s, r = 0;
        for (s = i === (n ? "border" : "content") ? 4 : "width" === t ? 1 : 0; s < 4; s += 2)
            "margin" === i && (r += v.css(e, i + ee[s], !0, o)),
            n ? ("content" === i && (r -= v.css(e, "padding" + ee[s], !0, o)),
            "margin" !== i && (r -= v.css(e, "border" + ee[s] + "Width", !0, o))) : (r += v.css(e, "padding" + ee[s], !0, o),
            "padding" !== i && (r += v.css(e, "border" + ee[s] + "Width", !0, o)));
        return r
    }
    function Xe(e, t, i) {
        var n, o = Me(e), s = He(e, t, o), r = "border-box" === v.css(e, "boxSizing", !1, o);
        return Pe.test(s) ? s : (n = r && (f.boxSizingReliable() || s === e.style[t]),
        "auto" === s && (s = e["offset" + t[0].toUpperCase() + t.slice(1)]),
        (s = parseFloat(s) || 0) + Ve(e, t, i || (r ? "border" : "content"), n, o) + "px")
    }
    function Qe(e, t, i, n, o) {
        return new Qe.prototype.init(e,t,i,n,o)
    }
    v.extend({
        cssHooks: {
            opacity: {
                get: function(e, t) {
                    if (t) {
                        var i = He(e, "opacity");
                        return "" === i ? "1" : i
                    }
                }
            }
        },
        cssNumber: {
            animationIterationCount: !0,
            columnCount: !0,
            fillOpacity: !0,
            flexGrow: !0,
            flexShrink: !0,
            fontWeight: !0,
            lineHeight: !0,
            opacity: !0,
            order: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0
        },
        cssProps: {
            float: "cssFloat"
        },
        style: function(e, t, i, n) {
            if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
                var o, s, r, a = v.camelCase(t), l = qe.test(t), c = e.style;
                return l || (t = Ge(a)),
                r = v.cssHooks[t] || v.cssHooks[a],
                void 0 === i ? r && "get"in r && void 0 !== (o = r.get(e, !1, n)) ? o : c[t] : ("string" === (s = typeof i) && (o = Z.exec(i)) && o[1] && (i = ne(e, t, o),
                s = "number"),
                void (null != i && i == i && ("number" === s && (i += o && o[3] || (v.cssNumber[a] ? "" : "px")),
                f.clearCloneStyle || "" !== i || 0 !== t.indexOf("background") || (c[t] = "inherit"),
                r && "set"in r && void 0 === (i = r.set(e, i, n)) || (l ? c.setProperty(t, i) : c[t] = i))))
            }
        },
        css: function(e, t, i, n) {
            var o, s, r, a = v.camelCase(t);
            return qe.test(t) || (t = Ge(a)),
            (r = v.cssHooks[t] || v.cssHooks[a]) && "get"in r && (o = r.get(e, !0, i)),
            void 0 === o && (o = He(e, t, n)),
            "normal" === o && t in Re && (o = Re[t]),
            "" === i || i ? (s = parseFloat(o),
            !0 === i || isFinite(s) ? s || 0 : o) : o
        }
    }),
    v.each(["height", "width"], (function(e, t) {
        v.cssHooks[t] = {
            get: function(e, i, n) {
                if (i)
                    return !We.test(v.css(e, "display")) || e.getClientRects().length && e.getBoundingClientRect().width ? Xe(e, t, n) : ie(e, Fe, (function() {
                        return Xe(e, t, n)
                    }
                    ))
            },
            set: function(e, i, n) {
                var o, s = n && Me(e), r = n && Ve(e, t, n, "border-box" === v.css(e, "boxSizing", !1, s), s);
                return r && (o = Z.exec(i)) && "px" !== (o[3] || "px") && (e.style[t] = i,
                i = v.css(e, t)),
                Ye(0, i, r)
            }
        }
    }
    )),
    v.cssHooks.marginLeft = ze(f.reliableMarginLeft, (function(e, t) {
        if (t)
            return (parseFloat(He(e, "marginLeft")) || e.getBoundingClientRect().left - ie(e, {
                marginLeft: 0
            }, (function() {
                return e.getBoundingClientRect().left
            }
            ))) + "px"
    }
    )),
    v.each({
        margin: "",
        padding: "",
        border: "Width"
    }, (function(e, t) {
        v.cssHooks[e + t] = {
            expand: function(i) {
                for (var n = 0, o = {}, s = "string" == typeof i ? i.split(" ") : [i]; n < 4; n++)
                    o[e + ee[n] + t] = s[n] || s[n - 2] || s[0];
                return o
            }
        },
        Ne.test(e) || (v.cssHooks[e + t].set = Ye)
    }
    )),
    v.fn.extend({
        css: function(e, t) {
            return B(this, (function(e, t, i) {
                var n, o, s = {}, r = 0;
                if (Array.isArray(t)) {
                    for (n = Me(e),
                    o = t.length; r < o; r++)
                        s[t[r]] = v.css(e, t[r], !1, n);
                    return s
                }
                return void 0 !== i ? v.style(e, t, i) : v.css(e, t)
            }
            ), e, t, arguments.length > 1)
        }
    }),
    v.Tween = Qe,
    Qe.prototype = {
        constructor: Qe,
        init: function(e, t, i, n, o, s) {
            this.elem = e,
            this.prop = i,
            this.easing = o || v.easing._default,
            this.options = t,
            this.start = this.now = this.cur(),
            this.end = n,
            this.unit = s || (v.cssNumber[i] ? "" : "px")
        },
        cur: function() {
            var e = Qe.propHooks[this.prop];
            return e && e.get ? e.get(this) : Qe.propHooks._default.get(this)
        },
        run: function(e) {
            var t, i = Qe.propHooks[this.prop];
            return this.options.duration ? this.pos = t = v.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : this.pos = t = e,
            this.now = (this.end - this.start) * t + this.start,
            this.options.step && this.options.step.call(this.elem, this.now, this),
            i && i.set ? i.set(this) : Qe.propHooks._default.set(this),
            this
        }
    },
    Qe.prototype.init.prototype = Qe.prototype,
    Qe.propHooks = {
        _default: {
            get: function(e) {
                var t;
                return 1 !== e.elem.nodeType || null != e.elem[e.prop] && null == e.elem.style[e.prop] ? e.elem[e.prop] : (t = v.css(e.elem, e.prop, "")) && "auto" !== t ? t : 0
            },
            set: function(e) {
                v.fx.step[e.prop] ? v.fx.step[e.prop](e) : 1 !== e.elem.nodeType || null == e.elem.style[v.cssProps[e.prop]] && !v.cssHooks[e.prop] ? e.elem[e.prop] = e.now : v.style(e.elem, e.prop, e.now + e.unit)
            }
        }
    },
    Qe.propHooks.scrollTop = Qe.propHooks.scrollLeft = {
        set: function(e) {
            e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now)
        }
    },
    v.easing = {
        linear: function(e) {
            return e
        },
        swing: function(e) {
            return .5 - Math.cos(e * Math.PI) / 2
        },
        _default: "swing"
    },
    v.fx = Qe.prototype.init,
    v.fx.step = {};
    var Je, Ke, Ze = /^(?:toggle|show|hide)$/, et = /queueHooks$/;
    function tt() {
        Ke && (!1 === n.hidden && e.requestAnimationFrame ? e.requestAnimationFrame(tt) : e.setTimeout(tt, v.fx.interval),
        v.fx.tick())
    }
    function it() {
        return e.setTimeout((function() {
            Je = void 0
        }
        )),
        Je = v.now()
    }
    function nt(e, t) {
        var i, n = 0, o = {
            height: e
        };
        for (t = t ? 1 : 0; n < 4; n += 2 - t)
            o["margin" + (i = ee[n])] = o["padding" + i] = e;
        return t && (o.opacity = o.width = e),
        o
    }
    function ot(e, t, i) {
        for (var n, o = (st.tweeners[t] || []).concat(st.tweeners["*"]), s = 0, r = o.length; s < r; s++)
            if (n = o[s].call(i, t, e))
                return n
    }
    function st(e, t, i) {
        var n, o, s = 0, r = st.prefilters.length, a = v.Deferred().always((function() {
            delete l.elem
        }
        )), l = function() {
            if (o)
                return !1;
            for (var t = Je || it(), i = Math.max(0, c.startTime + c.duration - t), n = 1 - (i / c.duration || 0), s = 0, r = c.tweens.length; s < r; s++)
                c.tweens[s].run(n);
            return a.notifyWith(e, [c, n, i]),
            n < 1 && r ? i : (r || a.notifyWith(e, [c, 1, 0]),
            a.resolveWith(e, [c]),
            !1)
        }, c = a.promise({
            elem: e,
            props: v.extend({}, t),
            opts: v.extend(!0, {
                specialEasing: {},
                easing: v.easing._default
            }, i),
            originalProperties: t,
            originalOptions: i,
            startTime: Je || it(),
            duration: i.duration,
            tweens: [],
            createTween: function(t, i) {
                var n = v.Tween(e, c.opts, t, i, c.opts.specialEasing[t] || c.opts.easing);
                return c.tweens.push(n),
                n
            },
            stop: function(t) {
                var i = 0
                  , n = t ? c.tweens.length : 0;
                if (o)
                    return this;
                for (o = !0; i < n; i++)
                    c.tweens[i].run(1);
                return t ? (a.notifyWith(e, [c, 1, 0]),
                a.resolveWith(e, [c, t])) : a.rejectWith(e, [c, t]),
                this
            }
        }), d = c.props;
        for (function(e, t) {
            var i, n, o, s, r;
            for (i in e)
                if (o = t[n = v.camelCase(i)],
                s = e[i],
                Array.isArray(s) && (o = s[1],
                s = e[i] = s[0]),
                i !== n && (e[n] = s,
                delete e[i]),
                (r = v.cssHooks[n]) && "expand"in r)
                    for (i in s = r.expand(s),
                    delete e[n],
                    s)
                        i in e || (e[i] = s[i],
                        t[i] = o);
                else
                    t[n] = o
        }(d, c.opts.specialEasing); s < r; s++)
            if (n = st.prefilters[s].call(c, e, d, c.opts))
                return v.isFunction(n.stop) && (v._queueHooks(c.elem, c.opts.queue).stop = v.proxy(n.stop, n)),
                n;
        return v.map(d, ot, c),
        v.isFunction(c.opts.start) && c.opts.start.call(e, c),
        c.progress(c.opts.progress).done(c.opts.done, c.opts.complete).fail(c.opts.fail).always(c.opts.always),
        v.fx.timer(v.extend(l, {
            elem: e,
            anim: c,
            queue: c.opts.queue
        })),
        c
    }
    v.Animation = v.extend(st, {
        tweeners: {
            "*": [function(e, t) {
                var i = this.createTween(e, t);
                return ne(i.elem, e, Z.exec(t), i),
                i
            }
            ]
        },
        tweener: function(e, t) {
            v.isFunction(e) ? (t = e,
            e = ["*"]) : e = e.match(M);
            for (var i, n = 0, o = e.length; n < o; n++)
                i = e[n],
                st.tweeners[i] = st.tweeners[i] || [],
                st.tweeners[i].unshift(t)
        },
        prefilters: [function(e, t, i) {
            var n, o, s, r, a, l, c, d, u = "width"in t || "height"in t, p = this, h = {}, f = e.style, m = e.nodeType && te(e), g = Y.get(e, "fxshow");
            for (n in i.queue || (null == (r = v._queueHooks(e, "fx")).unqueued && (r.unqueued = 0,
            a = r.empty.fire,
            r.empty.fire = function() {
                r.unqueued || a()
            }
            ),
            r.unqueued++,
            p.always((function() {
                p.always((function() {
                    r.unqueued--,
                    v.queue(e, "fx").length || r.empty.fire()
                }
                ))
            }
            ))),
            t)
                if (o = t[n],
                Ze.test(o)) {
                    if (delete t[n],
                    s = s || "toggle" === o,
                    o === (m ? "hide" : "show")) {
                        if ("show" !== o || !g || void 0 === g[n])
                            continue;
                        m = !0
                    }
                    h[n] = g && g[n] || v.style(e, n)
                }
            if ((l = !v.isEmptyObject(t)) || !v.isEmptyObject(h))
                for (n in u && 1 === e.nodeType && (i.overflow = [f.overflow, f.overflowX, f.overflowY],
                null == (c = g && g.display) && (c = Y.get(e, "display")),
                "none" === (d = v.css(e, "display")) && (c ? d = c : (re([e], !0),
                c = e.style.display || c,
                d = v.css(e, "display"),
                re([e]))),
                ("inline" === d || "inline-block" === d && null != c) && "none" === v.css(e, "float") && (l || (p.done((function() {
                    f.display = c
                }
                )),
                null == c && (d = f.display,
                c = "none" === d ? "" : d)),
                f.display = "inline-block")),
                i.overflow && (f.overflow = "hidden",
                p.always((function() {
                    f.overflow = i.overflow[0],
                    f.overflowX = i.overflow[1],
                    f.overflowY = i.overflow[2]
                }
                ))),
                l = !1,
                h)
                    l || (g ? "hidden"in g && (m = g.hidden) : g = Y.access(e, "fxshow", {
                        display: c
                    }),
                    s && (g.hidden = !m),
                    m && re([e], !0),
                    p.done((function() {
                        for (n in m || re([e]),
                        Y.remove(e, "fxshow"),
                        h)
                            v.style(e, n, h[n])
                    }
                    ))),
                    l = ot(m ? g[n] : 0, n, p),
                    n in g || (g[n] = l.start,
                    m && (l.end = l.start,
                    l.start = 0))
        }
        ],
        prefilter: function(e, t) {
            t ? st.prefilters.unshift(e) : st.prefilters.push(e)
        }
    }),
    v.speed = function(e, t, i) {
        var n = e && "object" == typeof e ? v.extend({}, e) : {
            complete: i || !i && t || v.isFunction(e) && e,
            duration: e,
            easing: i && t || t && !v.isFunction(t) && t
        };
        return v.fx.off ? n.duration = 0 : "number" != typeof n.duration && (n.duration in v.fx.speeds ? n.duration = v.fx.speeds[n.duration] : n.duration = v.fx.speeds._default),
        null != n.queue && !0 !== n.queue || (n.queue = "fx"),
        n.old = n.complete,
        n.complete = function() {
            v.isFunction(n.old) && n.old.call(this),
            n.queue && v.dequeue(this, n.queue)
        }
        ,
        n
    }
    ,
    v.fn.extend({
        fadeTo: function(e, t, i, n) {
            return this.filter(te).css("opacity", 0).show().end().animate({
                opacity: t
            }, e, i, n)
        },
        animate: function(e, t, i, n) {
            var o = v.isEmptyObject(e)
              , s = v.speed(t, i, n)
              , r = function() {
                var t = st(this, v.extend({}, e), s);
                (o || Y.get(this, "finish")) && t.stop(!0)
            };
            return r.finish = r,
            o || !1 === s.queue ? this.each(r) : this.queue(s.queue, r)
        },
        stop: function(e, t, i) {
            var n = function(e) {
                var t = e.stop;
                delete e.stop,
                t(i)
            };
            return "string" != typeof e && (i = t,
            t = e,
            e = void 0),
            t && !1 !== e && this.queue(e || "fx", []),
            this.each((function() {
                var t = !0
                  , o = null != e && e + "queueHooks"
                  , s = v.timers
                  , r = Y.get(this);
                if (o)
                    r[o] && r[o].stop && n(r[o]);
                else
                    for (o in r)
                        r[o] && r[o].stop && et.test(o) && n(r[o]);
                for (o = s.length; o--; )
                    s[o].elem !== this || null != e && s[o].queue !== e || (s[o].anim.stop(i),
                    t = !1,
                    s.splice(o, 1));
                !t && i || v.dequeue(this, e)
            }
            ))
        },
        finish: function(e) {
            return !1 !== e && (e = e || "fx"),
            this.each((function() {
                var t, i = Y.get(this), n = i[e + "queue"], o = i[e + "queueHooks"], s = v.timers, r = n ? n.length : 0;
                for (i.finish = !0,
                v.queue(this, e, []),
                o && o.stop && o.stop.call(this, !0),
                t = s.length; t--; )
                    s[t].elem === this && s[t].queue === e && (s[t].anim.stop(!0),
                    s.splice(t, 1));
                for (t = 0; t < r; t++)
                    n[t] && n[t].finish && n[t].finish.call(this);
                delete i.finish
            }
            ))
        }
    }),
    v.each(["toggle", "show", "hide"], (function(e, t) {
        var i = v.fn[t];
        v.fn[t] = function(e, n, o) {
            return null == e || "boolean" == typeof e ? i.apply(this, arguments) : this.animate(nt(t, !0), e, n, o)
        }
    }
    )),
    v.each({
        slideDown: nt("show"),
        slideUp: nt("hide"),
        slideToggle: nt("toggle"),
        fadeIn: {
            opacity: "show"
        },
        fadeOut: {
            opacity: "hide"
        },
        fadeToggle: {
            opacity: "toggle"
        }
    }, (function(e, t) {
        v.fn[e] = function(e, i, n) {
            return this.animate(t, e, i, n)
        }
    }
    )),
    v.timers = [],
    v.fx.tick = function() {
        var e, t = 0, i = v.timers;
        for (Je = v.now(); t < i.length; t++)
            (e = i[t])() || i[t] !== e || i.splice(t--, 1);
        i.length || v.fx.stop(),
        Je = void 0
    }
    ,
    v.fx.timer = function(e) {
        v.timers.push(e),
        v.fx.start()
    }
    ,
    v.fx.interval = 13,
    v.fx.start = function() {
        Ke || (Ke = !0,
        tt())
    }
    ,
    v.fx.stop = function() {
        Ke = null
    }
    ,
    v.fx.speeds = {
        slow: 600,
        fast: 200,
        _default: 400
    },
    v.fn.delay = function(t, i) {
        return t = v.fx && v.fx.speeds[t] || t,
        i = i || "fx",
        this.queue(i, (function(i, n) {
            var o = e.setTimeout(i, t);
            n.stop = function() {
                e.clearTimeout(o)
            }
        }
        ))
    }
    ,
    function() {
        var e = n.createElement("input")
          , t = n.createElement("select").appendChild(n.createElement("option"));
        e.type = "checkbox",
        f.checkOn = "" !== e.value,
        f.optSelected = t.selected,
        (e = n.createElement("input")).value = "t",
        e.type = "radio",
        f.radioValue = "t" === e.value
    }();
    var rt, at = v.expr.attrHandle;
    v.fn.extend({
        attr: function(e, t) {
            return B(this, v.attr, e, t, arguments.length > 1)
        },
        removeAttr: function(e) {
            return this.each((function() {
                v.removeAttr(this, e)
            }
            ))
        }
    }),
    v.extend({
        attr: function(e, t, i) {
            var n, o, s = e.nodeType;
            if (3 !== s && 8 !== s && 2 !== s)
                return void 0 === e.getAttribute ? v.prop(e, t, i) : (1 === s && v.isXMLDoc(e) || (o = v.attrHooks[t.toLowerCase()] || (v.expr.match.bool.test(t) ? rt : void 0)),
                void 0 !== i ? null === i ? void v.removeAttr(e, t) : o && "set"in o && void 0 !== (n = o.set(e, i, t)) ? n : (e.setAttribute(t, i + ""),
                i) : o && "get"in o && null !== (n = o.get(e, t)) ? n : null == (n = v.find.attr(e, t)) ? void 0 : n)
        },
        attrHooks: {
            type: {
                set: function(e, t) {
                    if (!f.radioValue && "radio" === t && S(e, "input")) {
                        var i = e.value;
                        return e.setAttribute("type", t),
                        i && (e.value = i),
                        t
                    }
                }
            }
        },
        removeAttr: function(e, t) {
            var i, n = 0, o = t && t.match(M);
            if (o && 1 === e.nodeType)
                for (; i = o[n++]; )
                    e.removeAttribute(i)
        }
    }),
    rt = {
        set: function(e, t, i) {
            return !1 === t ? v.removeAttr(e, i) : e.setAttribute(i, i),
            i
        }
    },
    v.each(v.expr.match.bool.source.match(/\w+/g), (function(e, t) {
        var i = at[t] || v.find.attr;
        at[t] = function(e, t, n) {
            var o, s, r = t.toLowerCase();
            return n || (s = at[r],
            at[r] = o,
            o = null != i(e, t, n) ? r : null,
            at[r] = s),
            o
        }
    }
    ));
    var lt = /^(?:input|select|textarea|button)$/i
      , ct = /^(?:a|area)$/i;
    function dt(e) {
        return (e.match(M) || []).join(" ")
    }
    function ut(e) {
        return e.getAttribute && e.getAttribute("class") || ""
    }
    v.fn.extend({
        prop: function(e, t) {
            return B(this, v.prop, e, t, arguments.length > 1)
        },
        removeProp: function(e) {
            return this.each((function() {
                delete this[v.propFix[e] || e]
            }
            ))
        }
    }),
    v.extend({
        prop: function(e, t, i) {
            var n, o, s = e.nodeType;
            if (3 !== s && 8 !== s && 2 !== s)
                return 1 === s && v.isXMLDoc(e) || (t = v.propFix[t] || t,
                o = v.propHooks[t]),
                void 0 !== i ? o && "set"in o && void 0 !== (n = o.set(e, i, t)) ? n : e[t] = i : o && "get"in o && null !== (n = o.get(e, t)) ? n : e[t]
        },
        propHooks: {
            tabIndex: {
                get: function(e) {
                    var t = v.find.attr(e, "tabindex");
                    return t ? parseInt(t, 10) : lt.test(e.nodeName) || ct.test(e.nodeName) && e.href ? 0 : -1
                }
            }
        },
        propFix: {
            for: "htmlFor",
            class: "className"
        }
    }),
    f.optSelected || (v.propHooks.selected = {
        get: function(e) {
            var t = e.parentNode;
            return t && t.parentNode && t.parentNode.selectedIndex,
            null
        },
        set: function(e) {
            var t = e.parentNode;
            t && (t.selectedIndex,
            t.parentNode && t.parentNode.selectedIndex)
        }
    }),
    v.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], (function() {
        v.propFix[this.toLowerCase()] = this
    }
    )),
    v.fn.extend({
        addClass: function(e) {
            var t, i, n, o, s, r, a, l = 0;
            if (v.isFunction(e))
                return this.each((function(t) {
                    v(this).addClass(e.call(this, t, ut(this)))
                }
                ));
            if ("string" == typeof e && e)
                for (t = e.match(M) || []; i = this[l++]; )
                    if (o = ut(i),
                    n = 1 === i.nodeType && " " + dt(o) + " ") {
                        for (r = 0; s = t[r++]; )
                            n.indexOf(" " + s + " ") < 0 && (n += s + " ");
                        o !== (a = dt(n)) && i.setAttribute("class", a)
                    }
            return this
        },
        removeClass: function(e) {
            var t, i, n, o, s, r, a, l = 0;
            if (v.isFunction(e))
                return this.each((function(t) {
                    v(this).removeClass(e.call(this, t, ut(this)))
                }
                ));
            if (!arguments.length)
                return this.attr("class", "");
            if ("string" == typeof e && e)
                for (t = e.match(M) || []; i = this[l++]; )
                    if (o = ut(i),
                    n = 1 === i.nodeType && " " + dt(o) + " ") {
                        for (r = 0; s = t[r++]; )
                            for (; n.indexOf(" " + s + " ") > -1; )
                                n = n.replace(" " + s + " ", " ");
                        o !== (a = dt(n)) && i.setAttribute("class", a)
                    }
            return this
        },
        toggleClass: function(e, t) {
            var i = typeof e;
            return "boolean" == typeof t && "string" === i ? t ? this.addClass(e) : this.removeClass(e) : v.isFunction(e) ? this.each((function(i) {
                v(this).toggleClass(e.call(this, i, ut(this), t), t)
            }
            )) : this.each((function() {
                var t, n, o, s;
                if ("string" === i)
                    for (n = 0,
                    o = v(this),
                    s = e.match(M) || []; t = s[n++]; )
                        o.hasClass(t) ? o.removeClass(t) : o.addClass(t);
                else
                    void 0 !== e && "boolean" !== i || ((t = ut(this)) && Y.set(this, "__className__", t),
                    this.setAttribute && this.setAttribute("class", t || !1 === e ? "" : Y.get(this, "__className__") || ""))
            }
            ))
        },
        hasClass: function(e) {
            var t, i, n = 0;
            for (t = " " + e + " "; i = this[n++]; )
                if (1 === i.nodeType && (" " + dt(ut(i)) + " ").indexOf(t) > -1)
                    return !0;
            return !1
        }
    });
    var pt = /\r/g;
    v.fn.extend({
        val: function(e) {
            var t, i, n, o = this[0];
            return arguments.length ? (n = v.isFunction(e),
            this.each((function(i) {
                var o;
                1 === this.nodeType && (null == (o = n ? e.call(this, i, v(this).val()) : e) ? o = "" : "number" == typeof o ? o += "" : Array.isArray(o) && (o = v.map(o, (function(e) {
                    return null == e ? "" : e + ""
                }
                ))),
                (t = v.valHooks[this.type] || v.valHooks[this.nodeName.toLowerCase()]) && "set"in t && void 0 !== t.set(this, o, "value") || (this.value = o))
            }
            ))) : o ? (t = v.valHooks[o.type] || v.valHooks[o.nodeName.toLowerCase()]) && "get"in t && void 0 !== (i = t.get(o, "value")) ? i : "string" == typeof (i = o.value) ? i.replace(pt, "") : null == i ? "" : i : void 0
        }
    }),
    v.extend({
        valHooks: {
            option: {
                get: function(e) {
                    var t = v.find.attr(e, "value");
                    return null != t ? t : dt(v.text(e))
                }
            },
            select: {
                get: function(e) {
                    var t, i, n, o = e.options, s = e.selectedIndex, r = "select-one" === e.type, a = r ? null : [], l = r ? s + 1 : o.length;
                    for (n = s < 0 ? l : r ? s : 0; n < l; n++)
                        if (((i = o[n]).selected || n === s) && !i.disabled && (!i.parentNode.disabled || !S(i.parentNode, "optgroup"))) {
                            if (t = v(i).val(),
                            r)
                                return t;
                            a.push(t)
                        }
                    return a
                },
                set: function(e, t) {
                    for (var i, n, o = e.options, s = v.makeArray(t), r = o.length; r--; )
                        ((n = o[r]).selected = v.inArray(v.valHooks.option.get(n), s) > -1) && (i = !0);
                    return i || (e.selectedIndex = -1),
                    s
                }
            }
        }
    }),
    v.each(["radio", "checkbox"], (function() {
        v.valHooks[this] = {
            set: function(e, t) {
                if (Array.isArray(t))
                    return e.checked = v.inArray(v(e).val(), t) > -1
            }
        },
        f.checkOn || (v.valHooks[this].get = function(e) {
            return null === e.getAttribute("value") ? "on" : e.value
        }
        )
    }
    ));
    var ht = /^(?:focusinfocus|focusoutblur)$/;
    v.extend(v.event, {
        trigger: function(t, i, o, s) {
            var r, a, l, c, d, p, h, f = [o || n], m = u.call(t, "type") ? t.type : t, g = u.call(t, "namespace") ? t.namespace.split(".") : [];
            if (a = l = o = o || n,
            3 !== o.nodeType && 8 !== o.nodeType && !ht.test(m + v.event.triggered) && (m.indexOf(".") > -1 && (g = m.split("."),
            m = g.shift(),
            g.sort()),
            d = m.indexOf(":") < 0 && "on" + m,
            (t = t[v.expando] ? t : new v.Event(m,"object" == typeof t && t)).isTrigger = s ? 2 : 3,
            t.namespace = g.join("."),
            t.rnamespace = t.namespace ? new RegExp("(^|\\.)" + g.join("\\.(?:.*\\.|)") + "(\\.|$)") : null,
            t.result = void 0,
            t.target || (t.target = o),
            i = null == i ? [t] : v.makeArray(i, [t]),
            h = v.event.special[m] || {},
            s || !h.trigger || !1 !== h.trigger.apply(o, i))) {
                if (!s && !h.noBubble && !v.isWindow(o)) {
                    for (c = h.delegateType || m,
                    ht.test(c + m) || (a = a.parentNode); a; a = a.parentNode)
                        f.push(a),
                        l = a;
                    l === (o.ownerDocument || n) && f.push(l.defaultView || l.parentWindow || e)
                }
                for (r = 0; (a = f[r++]) && !t.isPropagationStopped(); )
                    t.type = r > 1 ? c : h.bindType || m,
                    (p = (Y.get(a, "events") || {})[t.type] && Y.get(a, "handle")) && p.apply(a, i),
                    (p = d && a[d]) && p.apply && U(a) && (t.result = p.apply(a, i),
                    !1 === t.result && t.preventDefault());
                return t.type = m,
                s || t.isDefaultPrevented() || h._default && !1 !== h._default.apply(f.pop(), i) || !U(o) || d && v.isFunction(o[m]) && !v.isWindow(o) && ((l = o[d]) && (o[d] = null),
                v.event.triggered = m,
                o[m](),
                v.event.triggered = void 0,
                l && (o[d] = l)),
                t.result
            }
        },
        simulate: function(e, t, i) {
            var n = v.extend(new v.Event, i, {
                type: e,
                isSimulated: !0
            });
            v.event.trigger(n, null, t)
        }
    }),
    v.fn.extend({
        trigger: function(e, t) {
            return this.each((function() {
                v.event.trigger(e, t, this)
            }
            ))
        },
        triggerHandler: function(e, t) {
            var i = this[0];
            if (i)
                return v.event.trigger(e, t, i, !0)
        }
    }),
    v.each("blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "), (function(e, t) {
        v.fn[t] = function(e, i) {
            return arguments.length > 0 ? this.on(t, null, e, i) : this.trigger(t)
        }
    }
    )),
    v.fn.extend({
        hover: function(e, t) {
            return this.mouseenter(e).mouseleave(t || e)
        }
    }),
    f.focusin = "onfocusin"in e,
    f.focusin || v.each({
        focus: "focusin",
        blur: "focusout"
    }, (function(e, t) {
        var i = function(e) {
            v.event.simulate(t, e.target, v.event.fix(e))
        };
        v.event.special[t] = {
            setup: function() {
                var n = this.ownerDocument || this
                  , o = Y.access(n, t);
                o || n.addEventListener(e, i, !0),
                Y.access(n, t, (o || 0) + 1)
            },
            teardown: function() {
                var n = this.ownerDocument || this
                  , o = Y.access(n, t) - 1;
                o ? Y.access(n, t, o) : (n.removeEventListener(e, i, !0),
                Y.remove(n, t))
            }
        }
    }
    ));
    var ft = e.location
      , mt = v.now()
      , gt = /\?/;
    v.parseXML = function(t) {
        var i;
        if (!t || "string" != typeof t)
            return null;
        try {
            i = (new e.DOMParser).parseFromString(t, "text/xml")
        } catch (e) {
            i = void 0
        }
        return i && !i.getElementsByTagName("parsererror").length || v.error("Invalid XML: " + t),
        i
    }
    ;
    var vt = /\[\]$/
      , yt = /\r?\n/g
      , bt = /^(?:submit|button|image|reset|file)$/i
      , wt = /^(?:input|select|textarea|keygen)/i;
    function $t(e, t, i, n) {
        var o;
        if (Array.isArray(t))
            v.each(t, (function(t, o) {
                i || vt.test(e) ? n(e, o) : $t(e + "[" + ("object" == typeof o && null != o ? t : "") + "]", o, i, n)
            }
            ));
        else if (i || "object" !== v.type(t))
            n(e, t);
        else
            for (o in t)
                $t(e + "[" + o + "]", t[o], i, n)
    }
    v.param = function(e, t) {
        var i, n = [], o = function(e, t) {
            var i = v.isFunction(t) ? t() : t;
            n[n.length] = encodeURIComponent(e) + "=" + encodeURIComponent(null == i ? "" : i)
        };
        if (Array.isArray(e) || e.jquery && !v.isPlainObject(e))
            v.each(e, (function() {
                o(this.name, this.value)
            }
            ));
        else
            for (i in e)
                $t(i, e[i], t, o);
        return n.join("&")
    }
    ,
    v.fn.extend({
        serialize: function() {
            return v.param(this.serializeArray())
        },
        serializeArray: function() {
            return this.map((function() {
                var e = v.prop(this, "elements");
                return e ? v.makeArray(e) : this
            }
            )).filter((function() {
                var e = this.type;
                return this.name && !v(this).is(":disabled") && wt.test(this.nodeName) && !bt.test(e) && (this.checked || !ae.test(e))
            }
            )).map((function(e, t) {
                var i = v(this).val();
                return null == i ? null : Array.isArray(i) ? v.map(i, (function(e) {
                    return {
                        name: t.name,
                        value: e.replace(yt, "\r\n")
                    }
                }
                )) : {
                    name: t.name,
                    value: i.replace(yt, "\r\n")
                }
            }
            )).get()
        }
    });
    var _t = /%20/g
      , Ct = /#.*$/
      , xt = /([?&])_=[^&]*/
      , kt = /^(.*?):[ \t]*([^\r\n]*)$/gm
      , Tt = /^(?:GET|HEAD)$/
      , St = /^\/\//
      , Et = {}
      , jt = {}
      , At = "*/".concat("*")
      , Ot = n.createElement("a");
    function It(e) {
        return function(t, i) {
            "string" != typeof t && (i = t,
            t = "*");
            var n, o = 0, s = t.toLowerCase().match(M) || [];
            if (v.isFunction(i))
                for (; n = s[o++]; )
                    "+" === n[0] ? (n = n.slice(1) || "*",
                    (e[n] = e[n] || []).unshift(i)) : (e[n] = e[n] || []).push(i)
        }
    }
    function Lt(e, t, i, n) {
        var o = {}
          , s = e === jt;
        function r(a) {
            var l;
            return o[a] = !0,
            v.each(e[a] || [], (function(e, a) {
                var c = a(t, i, n);
                return "string" != typeof c || s || o[c] ? s ? !(l = c) : void 0 : (t.dataTypes.unshift(c),
                r(c),
                !1)
            }
            )),
            l
        }
        return r(t.dataTypes[0]) || !o["*"] && r("*")
    }
    function Dt(e, t) {
        var i, n, o = v.ajaxSettings.flatOptions || {};
        for (i in t)
            void 0 !== t[i] && ((o[i] ? e : n || (n = {}))[i] = t[i]);
        return n && v.extend(!0, e, n),
        e
    }
    Ot.href = ft.href,
    v.extend({
        active: 0,
        lastModified: {},
        etag: {},
        ajaxSettings: {
            url: ft.href,
            type: "GET",
            isLocal: /^(?:about|app|app-storage|.+-extension|file|res|widget):$/.test(ft.protocol),
            global: !0,
            processData: !0,
            async: !0,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            accepts: {
                "*": At,
                text: "text/plain",
                html: "text/html",
                xml: "application/xml, text/xml",
                json: "application/json, text/javascript"
            },
            contents: {
                xml: /\bxml\b/,
                html: /\bhtml/,
                json: /\bjson\b/
            },
            responseFields: {
                xml: "responseXML",
                text: "responseText",
                json: "responseJSON"
            },
            converters: {
                "* text": String,
                "text html": !0,
                "text json": JSON.parse,
                "text xml": v.parseXML
            },
            flatOptions: {
                url: !0,
                context: !0
            }
        },
        ajaxSetup: function(e, t) {
            return t ? Dt(Dt(e, v.ajaxSettings), t) : Dt(v.ajaxSettings, e)
        },
        ajaxPrefilter: It(Et),
        ajaxTransport: It(jt),
        ajax: function(t, i) {
            "object" == typeof t && (i = t,
            t = void 0),
            i = i || {};
            var o, s, r, a, l, c, d, u, p, h, f = v.ajaxSetup({}, i), m = f.context || f, g = f.context && (m.nodeType || m.jquery) ? v(m) : v.event, y = v.Deferred(), b = v.Callbacks("once memory"), w = f.statusCode || {}, $ = {}, _ = {}, C = "canceled", x = {
                readyState: 0,
                getResponseHeader: function(e) {
                    var t;
                    if (d) {
                        if (!a)
                            for (a = {}; t = kt.exec(r); )
                                a[t[1].toLowerCase()] = t[2];
                        t = a[e.toLowerCase()]
                    }
                    return null == t ? null : t
                },
                getAllResponseHeaders: function() {
                    return d ? r : null
                },
                setRequestHeader: function(e, t) {
                    return null == d && (e = _[e.toLowerCase()] = _[e.toLowerCase()] || e,
                    $[e] = t),
                    this
                },
                overrideMimeType: function(e) {
                    return null == d && (f.mimeType = e),
                    this
                },
                statusCode: function(e) {
                    var t;
                    if (e)
                        if (d)
                            x.always(e[x.status]);
                        else
                            for (t in e)
                                w[t] = [w[t], e[t]];
                    return this
                },
                abort: function(e) {
                    var t = e || C;
                    return o && o.abort(t),
                    k(0, t),
                    this
                }
            };
            if (y.promise(x),
            f.url = ((t || f.url || ft.href) + "").replace(St, ft.protocol + "//"),
            f.type = i.method || i.type || f.method || f.type,
            f.dataTypes = (f.dataType || "*").toLowerCase().match(M) || [""],
            null == f.crossDomain) {
                c = n.createElement("a");
                try {
                    c.href = f.url,
                    c.href = c.href,
                    f.crossDomain = Ot.protocol + "//" + Ot.host != c.protocol + "//" + c.host
                } catch (e) {
                    f.crossDomain = !0
                }
            }
            if (f.data && f.processData && "string" != typeof f.data && (f.data = v.param(f.data, f.traditional)),
            Lt(Et, f, i, x),
            d)
                return x;
            for (p in (u = v.event && f.global) && 0 == v.active++ && v.event.trigger("ajaxStart"),
            f.type = f.type.toUpperCase(),
            f.hasContent = !Tt.test(f.type),
            s = f.url.replace(Ct, ""),
            f.hasContent ? f.data && f.processData && 0 === (f.contentType || "").indexOf("application/x-www-form-urlencoded") && (f.data = f.data.replace(_t, "+")) : (h = f.url.slice(s.length),
            f.data && (s += (gt.test(s) ? "&" : "?") + f.data,
            delete f.data),
            !1 === f.cache && (s = s.replace(xt, "$1"),
            h = (gt.test(s) ? "&" : "?") + "_=" + mt++ + h),
            f.url = s + h),
            f.ifModified && (v.lastModified[s] && x.setRequestHeader("If-Modified-Since", v.lastModified[s]),
            v.etag[s] && x.setRequestHeader("If-None-Match", v.etag[s])),
            (f.data && f.hasContent && !1 !== f.contentType || i.contentType) && x.setRequestHeader("Content-Type", f.contentType),
            x.setRequestHeader("Accept", f.dataTypes[0] && f.accepts[f.dataTypes[0]] ? f.accepts[f.dataTypes[0]] + ("*" !== f.dataTypes[0] ? ", " + At + "; q=0.01" : "") : f.accepts["*"]),
            f.headers)
                x.setRequestHeader(p, f.headers[p]);
            if (f.beforeSend && (!1 === f.beforeSend.call(m, x, f) || d))
                return x.abort();
            if (C = "abort",
            b.add(f.complete),
            x.done(f.success),
            x.fail(f.error),
            o = Lt(jt, f, i, x)) {
                if (x.readyState = 1,
                u && g.trigger("ajaxSend", [x, f]),
                d)
                    return x;
                f.async && f.timeout > 0 && (l = e.setTimeout((function() {
                    x.abort("timeout")
                }
                ), f.timeout));
                try {
                    d = !1,
                    o.send($, k)
                } catch (e) {
                    if (d)
                        throw e;
                    k(-1, e)
                }
            } else
                k(-1, "No Transport");
            function k(t, i, n, a) {
                var c, p, h, $, _, C = i;
                d || (d = !0,
                l && e.clearTimeout(l),
                o = void 0,
                r = a || "",
                x.readyState = t > 0 ? 4 : 0,
                c = t >= 200 && t < 300 || 304 === t,
                n && ($ = function(e, t, i) {
                    for (var n, o, s, r, a = e.contents, l = e.dataTypes; "*" === l[0]; )
                        l.shift(),
                        void 0 === n && (n = e.mimeType || t.getResponseHeader("Content-Type"));
                    if (n)
                        for (o in a)
                            if (a[o] && a[o].test(n)) {
                                l.unshift(o);
                                break
                            }
                    if (l[0]in i)
                        s = l[0];
                    else {
                        for (o in i) {
                            if (!l[0] || e.converters[o + " " + l[0]]) {
                                s = o;
                                break
                            }
                            r || (r = o)
                        }
                        s = s || r
                    }
                    if (s)
                        return s !== l[0] && l.unshift(s),
                        i[s]
                }(f, x, n)),
                $ = function(e, t, i, n) {
                    var o, s, r, a, l, c = {}, d = e.dataTypes.slice();
                    if (d[1])
                        for (r in e.converters)
                            c[r.toLowerCase()] = e.converters[r];
                    for (s = d.shift(); s; )
                        if (e.responseFields[s] && (i[e.responseFields[s]] = t),
                        !l && n && e.dataFilter && (t = e.dataFilter(t, e.dataType)),
                        l = s,
                        s = d.shift())
                            if ("*" === s)
                                s = l;
                            else if ("*" !== l && l !== s) {
                                if (!(r = c[l + " " + s] || c["* " + s]))
                                    for (o in c)
                                        if ((a = o.split(" "))[1] === s && (r = c[l + " " + a[0]] || c["* " + a[0]])) {
                                            !0 === r ? r = c[o] : !0 !== c[o] && (s = a[0],
                                            d.unshift(a[1]));
                                            break
                                        }
                                if (!0 !== r)
                                    if (r && e.throws)
                                        t = r(t);
                                    else
                                        try {
                                            t = r(t)
                                        } catch (e) {
                                            return {
                                                state: "parsererror",
                                                error: r ? e : "No conversion from " + l + " to " + s
                                            }
                                        }
                            }
                    return {
                        state: "success",
                        data: t
                    }
                }(f, $, x, c),
                c ? (f.ifModified && ((_ = x.getResponseHeader("Last-Modified")) && (v.lastModified[s] = _),
                (_ = x.getResponseHeader("etag")) && (v.etag[s] = _)),
                204 === t || "HEAD" === f.type ? C = "nocontent" : 304 === t ? C = "notmodified" : (C = $.state,
                p = $.data,
                c = !(h = $.error))) : (h = C,
                !t && C || (C = "error",
                t < 0 && (t = 0))),
                x.status = t,
                x.statusText = (i || C) + "",
                c ? y.resolveWith(m, [p, C, x]) : y.rejectWith(m, [x, C, h]),
                x.statusCode(w),
                w = void 0,
                u && g.trigger(c ? "ajaxSuccess" : "ajaxError", [x, f, c ? p : h]),
                b.fireWith(m, [x, C]),
                u && (g.trigger("ajaxComplete", [x, f]),
                --v.active || v.event.trigger("ajaxStop")))
            }
            return x
        },
        getJSON: function(e, t, i) {
            return v.get(e, t, i, "json")
        },
        getScript: function(e, t) {
            return v.get(e, void 0, t, "script")
        }
    }),
    v.each(["get", "post"], (function(e, t) {
        v[t] = function(e, i, n, o) {
            return v.isFunction(i) && (o = o || n,
            n = i,
            i = void 0),
            v.ajax(v.extend({
                url: e,
                type: t,
                dataType: o,
                data: i,
                success: n
            }, v.isPlainObject(e) && e))
        }
    }
    )),
    v._evalUrl = function(e) {
        return v.ajax({
            url: e,
            type: "GET",
            dataType: "script",
            cache: !0,
            async: !1,
            global: !1,
            throws: !0
        })
    }
    ,
    v.fn.extend({
        wrapAll: function(e) {
            var t;
            return this[0] && (v.isFunction(e) && (e = e.call(this[0])),
            t = v(e, this[0].ownerDocument).eq(0).clone(!0),
            this[0].parentNode && t.insertBefore(this[0]),
            t.map((function() {
                for (var e = this; e.firstElementChild; )
                    e = e.firstElementChild;
                return e
            }
            )).append(this)),
            this
        },
        wrapInner: function(e) {
            return v.isFunction(e) ? this.each((function(t) {
                v(this).wrapInner(e.call(this, t))
            }
            )) : this.each((function() {
                var t = v(this)
                  , i = t.contents();
                i.length ? i.wrapAll(e) : t.append(e)
            }
            ))
        },
        wrap: function(e) {
            var t = v.isFunction(e);
            return this.each((function(i) {
                v(this).wrapAll(t ? e.call(this, i) : e)
            }
            ))
        },
        unwrap: function(e) {
            return this.parent(e).not("body").each((function() {
                v(this).replaceWith(this.childNodes)
            }
            )),
            this
        }
    }),
    v.expr.pseudos.hidden = function(e) {
        return !v.expr.pseudos.visible(e)
    }
    ,
    v.expr.pseudos.visible = function(e) {
        return !!(e.offsetWidth || e.offsetHeight || e.getClientRects().length)
    }
    ,
    v.ajaxSettings.xhr = function() {
        try {
            return new e.XMLHttpRequest
        } catch (e) {}
    }
    ;
    var Nt = {
        0: 200,
        1223: 204
    }
      , Pt = v.ajaxSettings.xhr();
    f.cors = !!Pt && "withCredentials"in Pt,
    f.ajax = Pt = !!Pt,
    v.ajaxTransport((function(t) {
        var i, n;
        if (f.cors || Pt && !t.crossDomain)
            return {
                send: function(o, s) {
                    var r, a = t.xhr();
                    if (a.open(t.type, t.url, t.async, t.username, t.password),
                    t.xhrFields)
                        for (r in t.xhrFields)
                            a[r] = t.xhrFields[r];
                    for (r in t.mimeType && a.overrideMimeType && a.overrideMimeType(t.mimeType),
                    t.crossDomain || o["X-Requested-With"] || (o["X-Requested-With"] = "XMLHttpRequest"),
                    o)
                        a.setRequestHeader(r, o[r]);
                    i = function(e) {
                        return function() {
                            i && (i = n = a.onload = a.onerror = a.onabort = a.onreadystatechange = null,
                            "abort" === e ? a.abort() : "error" === e ? "number" != typeof a.status ? s(0, "error") : s(a.status, a.statusText) : s(Nt[a.status] || a.status, a.statusText, "text" !== (a.responseType || "text") || "string" != typeof a.responseText ? {
                                binary: a.response
                            } : {
                                text: a.responseText
                            }, a.getAllResponseHeaders()))
                        }
                    }
                    ,
                    a.onload = i(),
                    n = a.onerror = i("error"),
                    void 0 !== a.onabort ? a.onabort = n : a.onreadystatechange = function() {
                        4 === a.readyState && e.setTimeout((function() {
                            i && n()
                        }
                        ))
                    }
                    ,
                    i = i("abort");
                    try {
                        a.send(t.hasContent && t.data || null)
                    } catch (e) {
                        if (i)
                            throw e
                    }
                },
                abort: function() {
                    i && i()
                }
            }
    }
    )),
    v.ajaxPrefilter((function(e) {
        e.crossDomain && (e.contents.script = !1)
    }
    )),
    v.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /\b(?:java|ecma)script\b/
        },
        converters: {
            "text script": function(e) {
                return v.globalEval(e),
                e
            }
        }
    }),
    v.ajaxPrefilter("script", (function(e) {
        void 0 === e.cache && (e.cache = !1),
        e.crossDomain && (e.type = "GET")
    }
    )),
    v.ajaxTransport("script", (function(e) {
        var t, i;
        if (e.crossDomain)
            return {
                send: function(o, s) {
                    t = v("<script>").prop({
                        charset: e.scriptCharset,
                        src: e.url
                    }).on("load error", i = function(e) {
                        t.remove(),
                        i = null,
                        e && s("error" === e.type ? 404 : 200, e.type)
                    }
                    ),
                    n.head.appendChild(t[0])
                },
                abort: function() {
                    i && i()
                }
            }
    }
    ));
    var Mt = []
      , Ht = /(=)\?(?=&|$)|\?\?/;
    v.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function() {
            var e = Mt.pop() || v.expando + "_" + mt++;
            return this[e] = !0,
            e
        }
    }),
    v.ajaxPrefilter("json jsonp", (function(t, i, n) {
        var o, s, r, a = !1 !== t.jsonp && (Ht.test(t.url) ? "url" : "string" == typeof t.data && 0 === (t.contentType || "").indexOf("application/x-www-form-urlencoded") && Ht.test(t.data) && "data");
        if (a || "jsonp" === t.dataTypes[0])
            return o = t.jsonpCallback = v.isFunction(t.jsonpCallback) ? t.jsonpCallback() : t.jsonpCallback,
            a ? t[a] = t[a].replace(Ht, "$1" + o) : !1 !== t.jsonp && (t.url += (gt.test(t.url) ? "&" : "?") + t.jsonp + "=" + o),
            t.converters["script json"] = function() {
                return r || v.error(o + " was not called"),
                r[0]
            }
            ,
            t.dataTypes[0] = "json",
            s = e[o],
            e[o] = function() {
                r = arguments
            }
            ,
            n.always((function() {
                void 0 === s ? v(e).removeProp(o) : e[o] = s,
                t[o] && (t.jsonpCallback = i.jsonpCallback,
                Mt.push(o)),
                r && v.isFunction(s) && s(r[0]),
                r = s = void 0
            }
            )),
            "script"
    }
    )),
    f.createHTMLDocument = function() {
        var e = n.implementation.createHTMLDocument("").body;
        return e.innerHTML = "<form></form><form></form>",
        2 === e.childNodes.length
    }(),
    v.parseHTML = function(e, t, i) {
        return "string" != typeof e ? [] : ("boolean" == typeof t && (i = t,
        t = !1),
        t || (f.createHTMLDocument ? ((o = (t = n.implementation.createHTMLDocument("")).createElement("base")).href = n.location.href,
        t.head.appendChild(o)) : t = n),
        r = !i && [],
        (s = E.exec(e)) ? [t.createElement(s[1])] : (s = fe([e], t, r),
        r && r.length && v(r).remove(),
        v.merge([], s.childNodes)));
        var o, s, r
    }
    ,
    v.fn.load = function(e, t, i) {
        var n, o, s, r = this, a = e.indexOf(" ");
        return a > -1 && (n = dt(e.slice(a)),
        e = e.slice(0, a)),
        v.isFunction(t) ? (i = t,
        t = void 0) : t && "object" == typeof t && (o = "POST"),
        r.length > 0 && v.ajax({
            url: e,
            type: o || "GET",
            dataType: "html",
            data: t
        }).done((function(e) {
            s = arguments,
            r.html(n ? v("<div>").append(v.parseHTML(e)).find(n) : e)
        }
        )).always(i && function(e, t) {
            r.each((function() {
                i.apply(this, s || [e.responseText, t, e])
            }
            ))
        }
        ),
        this
    }
    ,
    v.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], (function(e, t) {
        v.fn[t] = function(e) {
            return this.on(t, e)
        }
    }
    )),
    v.expr.pseudos.animated = function(e) {
        return v.grep(v.timers, (function(t) {
            return e === t.elem
        }
        )).length
    }
    ,
    v.offset = {
        setOffset: function(e, t, i) {
            var n, o, s, r, a, l, c = v.css(e, "position"), d = v(e), u = {};
            "static" === c && (e.style.position = "relative"),
            a = d.offset(),
            s = v.css(e, "top"),
            l = v.css(e, "left"),
            ("absolute" === c || "fixed" === c) && (s + l).indexOf("auto") > -1 ? (r = (n = d.position()).top,
            o = n.left) : (r = parseFloat(s) || 0,
            o = parseFloat(l) || 0),
            v.isFunction(t) && (t = t.call(e, i, v.extend({}, a))),
            null != t.top && (u.top = t.top - a.top + r),
            null != t.left && (u.left = t.left - a.left + o),
            "using"in t ? t.using.call(e, u) : d.css(u)
        }
    },
    v.fn.extend({
        offset: function(e) {
            if (arguments.length)
                return void 0 === e ? this : this.each((function(t) {
                    v.offset.setOffset(this, e, t)
                }
                ));
            var t, i, n, o, s = this[0];
            return s ? s.getClientRects().length ? (n = s.getBoundingClientRect(),
            i = (t = s.ownerDocument).documentElement,
            o = t.defaultView,
            {
                top: n.top + o.pageYOffset - i.clientTop,
                left: n.left + o.pageXOffset - i.clientLeft
            }) : {
                top: 0,
                left: 0
            } : void 0
        },
        position: function() {
            if (this[0]) {
                var e, t, i = this[0], n = {
                    top: 0,
                    left: 0
                };
                return "fixed" === v.css(i, "position") ? t = i.getBoundingClientRect() : (e = this.offsetParent(),
                t = this.offset(),
                S(e[0], "html") || (n = e.offset()),
                n = {
                    top: n.top + v.css(e[0], "borderTopWidth", !0),
                    left: n.left + v.css(e[0], "borderLeftWidth", !0)
                }),
                {
                    top: t.top - n.top - v.css(i, "marginTop", !0),
                    left: t.left - n.left - v.css(i, "marginLeft", !0)
                }
            }
        },
        offsetParent: function() {
            return this.map((function() {
                for (var e = this.offsetParent; e && "static" === v.css(e, "position"); )
                    e = e.offsetParent;
                return e || me
            }
            ))
        }
    }),
    v.each({
        scrollLeft: "pageXOffset",
        scrollTop: "pageYOffset"
    }, (function(e, t) {
        var i = "pageYOffset" === t;
        v.fn[e] = function(n) {
            return B(this, (function(e, n, o) {
                var s;
                return v.isWindow(e) ? s = e : 9 === e.nodeType && (s = e.defaultView),
                void 0 === o ? s ? s[t] : e[n] : void (s ? s.scrollTo(i ? s.pageXOffset : o, i ? o : s.pageYOffset) : e[n] = o)
            }
            ), e, n, arguments.length)
        }
    }
    )),
    v.each(["top", "left"], (function(e, t) {
        v.cssHooks[t] = ze(f.pixelPosition, (function(e, i) {
            if (i)
                return i = He(e, t),
                Pe.test(i) ? v(e).position()[t] + "px" : i
        }
        ))
    }
    )),
    v.each({
        Height: "height",
        Width: "width"
    }, (function(e, t) {
        v.each({
            padding: "inner" + e,
            content: t,
            "": "outer" + e
        }, (function(i, n) {
            v.fn[n] = function(o, s) {
                var r = arguments.length && (i || "boolean" != typeof o)
                  , a = i || (!0 === o || !0 === s ? "margin" : "border");
                return B(this, (function(t, i, o) {
                    var s;
                    return v.isWindow(t) ? 0 === n.indexOf("outer") ? t["inner" + e] : t.document.documentElement["client" + e] : 9 === t.nodeType ? (s = t.documentElement,
                    Math.max(t.body["scroll" + e], s["scroll" + e], t.body["offset" + e], s["offset" + e], s["client" + e])) : void 0 === o ? v.css(t, i, a) : v.style(t, i, o, a)
                }
                ), t, r ? o : void 0, r)
            }
        }
        ))
    }
    )),
    v.fn.extend({
        bind: function(e, t, i) {
            return this.on(e, null, t, i)
        },
        unbind: function(e, t) {
            return this.off(e, null, t)
        },
        delegate: function(e, t, i, n) {
            return this.on(t, e, i, n)
        },
        undelegate: function(e, t, i) {
            return 1 === arguments.length ? this.off(e, "**") : this.off(t, e || "**", i)
        }
    }),
    v.holdReady = function(e) {
        e ? v.readyWait++ : v.ready(!0)
    }
    ,
    v.isArray = Array.isArray,
    v.parseJSON = JSON.parse,
    v.nodeName = S,
    "function" == typeof define && define.amd && define("jquery", [], (function() {
        return v
    }
    ));
    var zt = e.jQuery
      , Wt = e.$;
    return v.noConflict = function(t) {
        return e.$ === v && (e.$ = Wt),
        t && e.jQuery === v && (e.jQuery = zt),
        v
    }
    ,
    t || (e.jQuery = e.$ = v),
    v
}
)),
function(e) {
    function t(t) {
        var i = (t || "").split(/ /)
          , n = {
            center: "50%",
            left: "0%",
            right: "100%",
            top: "0%",
            bottom: "100%"
        }
          , o = function(e) {
            var t = (n[i[e]] || i[e] || "50%").match(/^([+-]=)?([+-]?\d+(\.\d*)?)(.*)$/);
            i[e] = [t[1], parseFloat(t[2]), t[4] || "px"]
        };
        return 1 == i.length && e.inArray(i[0], ["top", "bottom"]) > -1 && (i[1] = i[0],
        i[0] = "50%"),
        o(0),
        o(1),
        i
    }
    function i(i) {
        i.set || function(i) {
            i.start = t(e(i.elem).css("backgroundPosition")),
            i.end = t(i.end);
            for (var n = 0; n < i.end.length; n++)
                i.end[n][0] && (i.end[n][1] = i.start[n][1] + ("-=" == i.end[n][0] ? -1 : 1) * i.end[n][1]);
            i.set = !0
        }(i),
        e(i.elem).css("background-position", i.pos * (i.end[0][1] - i.start[0][1]) + i.start[0][1] + i.end[0][2] + " " + (i.pos * (i.end[1][1] - i.start[1][1]) + i.start[1][1] + i.end[1][2]))
    }
    !!e.Tween ? e.Tween.propHooks.backgroundPosition = {
        get: function(i) {
            return t(e(i.elem).css(i.prop))
        },
        set: i
    } : e.fx.step.backgroundPosition = i
}(jQuery),
function(e) {
    "function" == typeof define && define.amd ? define(["jquery"], e) : "object" == typeof module && module.exports ? module.exports = function(t, i) {
        return void 0 === i && (i = "undefined" != typeof window ? require("jquery") : require("jquery")(t)),
        e(i),
        i
    }
    : e(jQuery)
}((function(e) {
    "use strict";
    var t = e(document)
      , i = e(window)
      , n = "selectric"
      , o = ".sl"
      , s = ["a", "e", "i", "o", "u", "n", "c", "y"]
      , r = [/[\xE0-\xE5]/g, /[\xE8-\xEB]/g, /[\xEC-\xEF]/g, /[\xF2-\xF6]/g, /[\xF9-\xFC]/g, /[\xF1]/g, /[\xE7]/g, /[\xFD-\xFF]/g]
      , a = function(t, i) {
        var n = this;
        n.element = t,
        n.$element = e(t),
        n.state = {
            multiple: !!n.$element.attr("multiple"),
            enabled: !1,
            opened: !1,
            currValue: -1,
            selectedIdx: -1,
            highlightedIdx: -1
        },
        n.eventTriggers = {
            open: n.open,
            close: n.close,
            destroy: n.destroy,
            refresh: n.refresh,
            init: n.init
        },
        n.init(i)
    };
    a.prototype = {
        utils: {
            isMobile: function() {
                return /android|ip(hone|od|ad)/i.test(navigator.userAgent)
            },
            escapeRegExp: function(e) {
                return e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
            },
            replaceDiacritics: function(e) {
                for (var t = r.length; t--; )
                    e = e.toLowerCase().replace(r[t], s[t]);
                return e
            },
            format: function(e) {
                var t = arguments;
                return ("" + e).replace(/\{(?:(\d+)|(\w+))\}/g, (function(e, i, n) {
                    return n && t[1] ? t[1][n] : t[i]
                }
                ))
            },
            nextEnabledItem: function(e, t) {
                for (; e[t = (t + 1) % e.length].disabled; )
                    ;
                return t
            },
            previousEnabledItem: function(e, t) {
                for (; e[t = (t > 0 ? t : e.length) - 1].disabled; )
                    ;
                return t
            },
            toDash: function(e) {
                return e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase()
            },
            triggerCallback: function(t, i) {
                var o = i.element
                  , s = i.options["on" + t]
                  , r = [o].concat([].slice.call(arguments).slice(1));
                e.isFunction(s) && s.apply(o, r),
                e(o).trigger(n + "-" + this.toDash(t), r)
            },
            arrayToClassname: function(t) {
                var i = e.grep(t, (function(e) {
                    return !!e
                }
                ));
                return e.trim(i.join(" "))
            }
        },
        init: function(t) {
            var i = this;
            if (i.options = e.extend(!0, {}, e.fn[n].defaults, i.options, t),
            i.utils.triggerCallback("BeforeInit", i),
            i.destroy(!0),
            i.options.disableOnMobile && i.utils.isMobile())
                i.disableOnMobile = !0;
            else {
                i.classes = i.getClassNames();
                var o = e("<input/>", {
                    class: i.classes.input,
                    readonly: i.utils.isMobile()
                })
                  , s = e("<div/>", {
                    class: i.classes.items,
                    tabindex: -1
                })
                  , r = e("<div/>", {
                    class: i.classes.scroll
                })
                  , a = e("<div/>", {
                    class: i.classes.prefix,
                    html: i.options.arrowButtonMarkup
                })
                  , l = e("<span/>", {
                    class: "label"
                })
                  , c = i.$element.wrap("<div/>").parent().append(a.prepend(l), s, o)
                  , d = e("<div/>", {
                    class: i.classes.hideselect
                });
                i.elements = {
                    input: o,
                    items: s,
                    itemsScroll: r,
                    wrapper: a,
                    label: l,
                    outerWrapper: c
                },
                i.options.nativeOnMobile && i.utils.isMobile() && (i.elements.input = void 0,
                d.addClass(i.classes.prefix + "-is-native"),
                i.$element.on("change", (function() {
                    i.refresh()
                }
                ))),
                i.$element.on(i.eventTriggers).wrap(d),
                i.originalTabindex = i.$element.prop("tabindex"),
                i.$element.prop("tabindex", -1),
                i.populate(),
                i.activate(),
                i.utils.triggerCallback("Init", i)
            }
        },
        activate: function() {
            var e = this
              , t = e.elements.items.closest(":visible").children(":hidden").addClass(e.classes.tempshow)
              , i = e.$element.width();
            t.removeClass(e.classes.tempshow),
            e.utils.triggerCallback("BeforeActivate", e),
            e.elements.outerWrapper.prop("class", e.utils.arrayToClassname([e.classes.wrapper, e.$element.prop("class").replace(/\S+/g, e.classes.prefix + "-$&"), e.options.responsive ? e.classes.responsive : ""])),
            e.options.inheritOriginalWidth && i > 0 && e.elements.outerWrapper.width(i),
            e.unbindEvents(),
            e.$element.prop("disabled") ? (e.elements.outerWrapper.addClass(e.classes.disabled),
            e.elements.input && e.elements.input.prop("disabled", !0)) : (e.state.enabled = !0,
            e.elements.outerWrapper.removeClass(e.classes.disabled),
            e.$li = e.elements.items.removeAttr("style").find("li"),
            e.bindEvents()),
            e.utils.triggerCallback("Activate", e)
        },
        getClassNames: function() {
            var t = this
              , i = t.options.customClass
              , n = {};
            return e.each("Input Items Open Disabled TempShow HideSelect Wrapper Focus Hover Responsive Above Below Scroll Group GroupLabel".split(" "), (function(e, o) {
                var s = i.prefix + o;
                n[o.toLowerCase()] = i.camelCase ? s : t.utils.toDash(s)
            }
            )),
            n.prefix = i.prefix,
            n
        },
        setLabel: function() {
            var t = this
              , i = t.options.labelBuilder;
            if (t.state.multiple) {
                var n = e.isArray(t.state.currValue) ? t.state.currValue : [t.state.currValue];
                n = 0 === n.length ? [0] : n;
                var o = e.map(n, (function(i) {
                    return e.grep(t.lookupItems, (function(e) {
                        return e.index === i
                    }
                    ))[0]
                }
                ));
                o = e.grep(o, (function(t) {
                    return o.length > 1 || 0 === o.length ? "" !== e.trim(t.value) : t
                }
                )),
                o = e.map(o, (function(n) {
                    return e.isFunction(i) ? i(n) : t.utils.format(i, n)
                }
                )),
                t.options.multiple.maxLabelEntries && (o.length >= t.options.multiple.maxLabelEntries + 1 ? (o = o.slice(0, t.options.multiple.maxLabelEntries)).push(e.isFunction(i) ? i({
                    text: "..."
                }) : t.utils.format(i, {
                    text: "..."
                })) : o.slice(o.length - 1)),
                t.elements.label.html(o.join(t.options.multiple.separator))
            } else {
                var s = t.lookupItems[t.state.currValue];
                t.elements.label.html(e.isFunction(i) ? i(s) : t.utils.format(i, s))
            }
        },
        populate: function() {
            var t = this
              , i = t.$element.children()
              , n = t.$element.find("option")
              , o = n.filter(":selected")
              , s = n.index(o)
              , r = 0
              , a = t.state.multiple ? [] : 0;
            o.length > 1 && t.state.multiple && (s = [],
            o.each((function() {
                s.push(e(this).index())
            }
            ))),
            t.state.currValue = ~s ? s : a,
            t.state.selectedIdx = t.state.currValue,
            t.state.highlightedIdx = t.state.currValue,
            t.items = [],
            t.lookupItems = [],
            i.length && (i.each((function(i) {
                var n = e(this);
                if (n.is("optgroup")) {
                    var o = {
                        element: n,
                        label: n.prop("label"),
                        groupDisabled: n.prop("disabled"),
                        items: []
                    };
                    n.children().each((function(i) {
                        var n = e(this);
                        o.items[i] = t.getItemData(r, n, o.groupDisabled || n.prop("disabled")),
                        t.lookupItems[r] = o.items[i],
                        r++
                    }
                    )),
                    t.items[i] = o
                } else
                    t.items[i] = t.getItemData(r, n, n.prop("disabled")),
                    t.lookupItems[r] = t.items[i],
                    r++
            }
            )),
            t.setLabel(),
            t.elements.items.append(t.elements.itemsScroll.html(t.getItemsMarkup(t.items))))
        },
        getItemData: function(t, i, n) {
            return {
                index: t,
                element: i,
                value: i.val(),
                className: i.prop("class"),
                text: i.html(),
                slug: e.trim(this.utils.replaceDiacritics(i.html())),
                alt: i.attr("data-alt"),
                selected: i.prop("selected"),
                disabled: n
            }
        },
        getItemsMarkup: function(t) {
            var i = this
              , n = "<ul>";
            return e.isFunction(i.options.listBuilder) && i.options.listBuilder && (t = i.options.listBuilder(t)),
            e.each(t, (function(t, o) {
                void 0 !== o.label ? (n += i.utils.format('<ul class="{1}"><li class="{2}">{3}</li>', i.utils.arrayToClassname([i.classes.group, o.groupDisabled ? "disabled" : "", o.element.prop("class")]), i.classes.grouplabel, o.element.prop("label")),
                e.each(o.items, (function(e, t) {
                    n += i.getItemMarkup(t.index, t)
                }
                )),
                n += "</ul>") : n += i.getItemMarkup(o.index, o)
            }
            )),
            n + "</ul>"
        },
        getItemMarkup: function(t, i) {
            var n = this
              , o = n.options.optionsItemBuilder
              , s = {
                value: i.value,
                text: i.text,
                slug: i.slug,
                index: i.index
            };
            return n.utils.format('<li data-index="{1}" class="{2}">{3}</li>', t, n.utils.arrayToClassname([i.className, t === n.items.length - 1 ? "last" : "", i.disabled ? "disabled" : "", i.selected ? "selected" : ""]), e.isFunction(o) ? n.utils.format(o(i, this.$element, t), i) : n.utils.format(o, s))
        },
        unbindEvents: function() {
            var e = this;
            e.elements.wrapper.add(e.$element).add(e.elements.outerWrapper).add(e.elements.input).off(o)
        },
        bindEvents: function() {
            var t = this;
            t.elements.outerWrapper.on("mouseenter.sl mouseleave" + o, (function(i) {
                e(this).toggleClass(t.classes.hover, "mouseenter" === i.type),
                t.options.openOnHover && (clearTimeout(t.closeTimer),
                "mouseleave" === i.type ? t.closeTimer = setTimeout(e.proxy(t.close, t), t.options.hoverIntentTimeout) : t.open())
            }
            )),
            t.elements.wrapper.on("click" + o, (function(e) {
                t.state.opened ? t.close() : t.open(e)
            }
            )),
            t.options.nativeOnMobile && t.utils.isMobile() || (t.$element.on("focus" + o, (function() {
                t.elements.input.focus()
            }
            )),
            t.elements.input.prop({
                tabindex: t.originalTabindex,
                disabled: !1
            }).on("keydown" + o, e.proxy(t.handleKeys, t)).on("focusin" + o, (function(e) {
                t.elements.outerWrapper.addClass(t.classes.focus),
                t.elements.input.one("blur", (function() {
                    t.elements.input.blur()
                }
                )),
                t.options.openOnFocus && !t.state.opened && t.open(e)
            }
            )).on("focusout" + o, (function() {
                t.elements.outerWrapper.removeClass(t.classes.focus)
            }
            )).on("input propertychange", (function() {
                var i = t.elements.input.val()
                  , n = new RegExp("^" + t.utils.escapeRegExp(i),"i");
                clearTimeout(t.resetStr),
                t.resetStr = setTimeout((function() {
                    t.elements.input.val("")
                }
                ), t.options.keySearchTimeout),
                i.length && e.each(t.items, (function(e, i) {
                    if (!i.disabled) {
                        if (n.test(i.text) || n.test(i.slug))
                            return t.highlight(e),
                            !1;
                        if (i.alt)
                            for (var o = i.alt.split("|"), s = 0; s < o.length && o[s]; s++)
                                if (n.test(o[s].trim()))
                                    return t.highlight(e),
                                    !1
                    }
                }
                ))
            }
            ))),
            t.$li.on({
                mousedown: function(e) {
                    e.preventDefault(),
                    e.stopPropagation()
                },
                click: function() {
                    return t.select(e(this).data("index")),
                    !1
                }
            })
        },
        handleKeys: function(t) {
            var i = this
              , n = t.which
              , o = i.options.keys
              , s = e.inArray(n, o.previous) > -1
              , r = e.inArray(n, o.next) > -1
              , a = e.inArray(n, o.select) > -1
              , l = e.inArray(n, o.open) > -1
              , c = i.state.highlightedIdx
              , d = s && 0 === c || r && c + 1 === i.items.length
              , u = 0;
            if (13 !== n && 32 !== n || t.preventDefault(),
            s || r) {
                if (!i.options.allowWrap && d)
                    return;
                s && (u = i.utils.previousEnabledItem(i.lookupItems, c)),
                r && (u = i.utils.nextEnabledItem(i.lookupItems, c)),
                i.highlight(u)
            }
            if (a && i.state.opened)
                return i.select(c),
                void (i.state.multiple && i.options.multiple.keepMenuOpen || i.close());
            l && !i.state.opened && i.open()
        },
        refresh: function() {
            var e = this;
            e.populate(),
            e.activate(),
            e.utils.triggerCallback("Refresh", e)
        },
        setOptionsDimensions: function() {
            var e = this
              , t = e.elements.items.closest(":visible").children(":hidden").addClass(e.classes.tempshow)
              , i = e.options.maxHeight
              , n = e.elements.items.outerWidth()
              , o = e.elements.wrapper.outerWidth() - (n - e.elements.items.width());
            !e.options.expandToItemText || o > n ? e.finalWidth = o : (e.elements.items.css("overflow", "scroll"),
            e.elements.outerWrapper.width(9e4),
            e.finalWidth = e.elements.items.width(),
            e.elements.items.css("overflow", ""),
            e.elements.outerWrapper.width("")),
            e.elements.items.width(e.finalWidth).height() > i && e.elements.items.height(i),
            t.removeClass(e.classes.tempshow)
        },
        isInViewport: function() {
            var e = this;
            if (!0 === e.options.forceRenderAbove)
                e.elements.outerWrapper.addClass(e.classes.above);
            else if (!0 === e.options.forceRenderBelow)
                e.elements.outerWrapper.addClass(e.classes.below);
            else {
                var t = i.scrollTop()
                  , n = i.height()
                  , o = e.elements.outerWrapper.offset().top
                  , s = o + e.elements.outerWrapper.outerHeight() + e.itemsHeight <= t + n
                  , r = o - e.itemsHeight > t
                  , a = !s && r
                  , l = !a;
                e.elements.outerWrapper.toggleClass(e.classes.above, a),
                e.elements.outerWrapper.toggleClass(e.classes.below, l)
            }
        },
        detectItemVisibility: function(t) {
            var i = this
              , n = i.$li.filter("[data-index]");
            i.state.multiple && (t = e.isArray(t) && 0 === t.length ? 0 : t,
            t = e.isArray(t) ? Math.min.apply(Math, t) : t);
            var o = n.eq(t).outerHeight()
              , s = n[t].offsetTop
              , r = i.elements.itemsScroll.scrollTop()
              , a = s + 2 * o;
            i.elements.itemsScroll.scrollTop(a > r + i.itemsHeight ? a - i.itemsHeight : s - o < r ? s - o : r)
        },
        open: function(i) {
            var s = this;
            if (s.options.nativeOnMobile && s.utils.isMobile())
                return !1;
            s.utils.triggerCallback("BeforeOpen", s),
            i && (i.preventDefault(),
            s.options.stopPropagation && i.stopPropagation()),
            s.state.enabled && (s.setOptionsDimensions(),
            e("." + s.classes.hideselect, "." + s.classes.open).children()[n]("close"),
            s.state.opened = !0,
            s.itemsHeight = s.elements.items.outerHeight(),
            s.itemsInnerHeight = s.elements.items.height(),
            s.elements.outerWrapper.addClass(s.classes.open),
            s.elements.input.val(""),
            i && "focusin" !== i.type && s.elements.input.focus(),
            setTimeout((function() {
                t.on("click" + o, e.proxy(s.close, s)).on("scroll" + o, e.proxy(s.isInViewport, s))
            }
            ), 1),
            s.isInViewport(),
            s.options.preventWindowScroll && t.on("mousewheel.sl DOMMouseScroll" + o, "." + s.classes.scroll, (function(t) {
                var i = t.originalEvent
                  , n = e(this).scrollTop()
                  , o = 0;
                "detail"in i && (o = -1 * i.detail),
                "wheelDelta"in i && (o = i.wheelDelta),
                "wheelDeltaY"in i && (o = i.wheelDeltaY),
                "deltaY"in i && (o = -1 * i.deltaY),
                (n === this.scrollHeight - s.itemsInnerHeight && o < 0 || 0 === n && o > 0) && t.preventDefault()
            }
            )),
            s.detectItemVisibility(s.state.selectedIdx),
            s.highlight(s.state.multiple ? -1 : s.state.selectedIdx),
            s.utils.triggerCallback("Open", s))
        },
        close: function() {
            var e = this;
            e.utils.triggerCallback("BeforeClose", e),
            t.off(o),
            e.elements.outerWrapper.removeClass(e.classes.open),
            e.state.opened = !1,
            e.utils.triggerCallback("Close", e)
        },
        change: function() {
            var t = this;
            t.utils.triggerCallback("BeforeChange", t),
            t.state.multiple ? (e.each(t.lookupItems, (function(e) {
                t.lookupItems[e].selected = !1,
                t.$element.find("option").prop("selected", !1)
            }
            )),
            e.each(t.state.selectedIdx, (function(e, i) {
                t.lookupItems[i].selected = !0,
                t.$element.find("option").eq(i).prop("selected", !0)
            }
            )),
            t.state.currValue = t.state.selectedIdx,
            t.setLabel(),
            t.utils.triggerCallback("Change", t)) : t.state.currValue !== t.state.selectedIdx && (t.$element.prop("selectedIndex", t.state.currValue = t.state.selectedIdx).data("value", t.lookupItems[t.state.selectedIdx].text),
            t.setLabel(),
            t.utils.triggerCallback("Change", t))
        },
        highlight: function(e) {
            var t = this
              , i = t.$li.filter("[data-index]").removeClass("highlighted");
            t.utils.triggerCallback("BeforeHighlight", t),
            void 0 === e || -1 === e || t.lookupItems[e].disabled || (i.eq(t.state.highlightedIdx = e).addClass("highlighted"),
            t.detectItemVisibility(e),
            t.utils.triggerCallback("Highlight", t))
        },
        select: function(t) {
            var i = this
              , n = i.$li.filter("[data-index]");
            if (i.utils.triggerCallback("BeforeSelect", i, t),
            void 0 !== t && -1 !== t && !i.lookupItems[t].disabled) {
                if (i.state.multiple) {
                    i.state.selectedIdx = e.isArray(i.state.selectedIdx) ? i.state.selectedIdx : [i.state.selectedIdx];
                    var o = e.inArray(t, i.state.selectedIdx);
                    -1 !== o ? i.state.selectedIdx.splice(o, 1) : i.state.selectedIdx.push(t),
                    n.removeClass("selected").filter((function(t) {
                        return -1 !== e.inArray(t, i.state.selectedIdx)
                    }
                    )).addClass("selected")
                } else
                    n.removeClass("selected").eq(i.state.selectedIdx = t).addClass("selected");
                i.state.multiple && i.options.multiple.keepMenuOpen || i.close(),
                i.change(),
                i.utils.triggerCallback("Select", i, t)
            }
        },
        destroy: function(e) {
            var t = this;
            t.state && t.state.enabled && (t.elements.items.add(t.elements.wrapper).add(t.elements.input).remove(),
            e || t.$element.removeData(n).removeData("value"),
            t.$element.prop("tabindex", t.originalTabindex).off(o).off(t.eventTriggers).unwrap().unwrap(),
            t.state.enabled = !1)
        }
    },
    e.fn[n] = function(t) {
        return this.each((function() {
            var i = e.data(this, n);
            i && !i.disableOnMobile ? "string" == typeof t && i[t] ? i[t]() : i.init(t) : e.data(this, n, new a(this,t))
        }
        ))
    }
    ,
    e.fn[n].defaults = {
        onChange: function(t) {
            e(t).change()
        },
        maxHeight: 300,
        keySearchTimeout: 500,
        arrowButtonMarkup: '<b class="button">&#x25be;</b>',
        disableOnMobile: !1,
        nativeOnMobile: !0,
        openOnFocus: !0,
        openOnHover: !1,
        hoverIntentTimeout: 500,
        expandToItemText: !1,
        responsive: !1,
        preventWindowScroll: !0,
        inheritOriginalWidth: !1,
        allowWrap: !0,
        forceRenderAbove: !1,
        forceRenderBelow: !1,
        stopPropagation: !0,
        optionsItemBuilder: "{text}",
        labelBuilder: "{text}",
        listBuilder: !1,
        keys: {
            previous: [37, 38],
            next: [39, 40],
            select: [9, 13, 27],
            open: [13, 32, 37, 38, 39, 40],
            close: [9, 27]
        },
        customClass: {
            prefix: n,
            camelCase: !1
        },
        multiple: {
            separator: ", ",
            keepMenuOpen: !0,
            maxLabelEntries: !1
        }
    }
}
)),
function(e, t) {
    "function" == typeof define && define.amd ? define(["jquery"], (function(i) {
        return t(e, i)
    }
    )) : "object" == typeof module && "object" == typeof module.exports ? module.exports = t(e, require("jquery")) : e.lity = t(e, e.jQuery || e.Zepto)
}("undefined" != typeof window ? window : this, (function(e, t) {
    "use strict";
    var i = e.document
      , n = t(e)
      , o = t.Deferred
      , s = t("html")
      , r = []
      , a = "aria-hidden"
      , l = "lity-" + a
      , c = 'a[href],area[href],input:not([disabled]),select:not([disabled]),textarea:not([disabled]),button:not([disabled]),iframe,object,embed,[contenteditable],[tabindex]:not([tabindex^="-"])'
      , d = {
        esc: !0,
        handler: null,
        handlers: {
            image: _,
            inline: function(e, i) {
                var n, o, s;
                try {
                    n = t(e)
                } catch (e) {
                    return !1
                }
                if (!n.length)
                    return !1;
                return o = t('<i style="display:none !important"/>'),
                s = n.hasClass("lity-hide"),
                i.element().one("lity:remove", (function() {
                    o.before(n).remove(),
                    s && !n.closest(".lity-content").length && n.addClass("lity-hide")
                }
                )),
                n.removeClass("lity-hide").after(o)
            },
            youtube: function(e) {
                var i = p.exec(e);
                if (!i)
                    return !1;
                return C($(e, w("https://www.youtube" + (i[2] || "") + ".com/embed/" + i[4], t.extend({
                    autoplay: 1
                }, b(i[5] || "")))))
            },
            vimeo: function(e) {
                var i = h.exec(e);
                if (!i)
                    return !1;
                return C($(e, w("https://player.vimeo.com/video/" + i[3], t.extend({
                    autoplay: 1
                }, b(i[4] || "")))))
            },
            googlemaps: function(e) {
                var t = f.exec(e);
                if (!t)
                    return !1;
                return C($(e, w("https://www.google." + t[3] + "/maps?" + t[6], {
                    output: t[6].indexOf("layer=c") > 0 ? "svembed" : "embed"
                })))
            },
            facebookvideo: function(e) {
                var i = m.exec(e);
                if (!i)
                    return !1;
                0 !== e.indexOf("http") && (e = "https:" + e);
                return C($(e, w("https://www.facebook.com/plugins/video.php?href=" + e, t.extend({
                    autoplay: 1
                }, b(i[4] || "")))))
            },
            iframe: C
        },
        template: '<div class="lity" role="dialog" aria-label="Dialog Window (Press escape to close)" tabindex="-1"><div class="lity-wrap" data-lity-close role="document"><div class="lity-loader" aria-hidden="true">Loading...</div><div class="lity-container"><div class="lity-content"></div><button class="lity-close" type="button" aria-label="Close (Press escape to close)" data-lity-close>&times;</button></div></div></div>'
    }
      , u = /(^data:image\/)|(\.(png|jpe?g|gif|svg|webp|bmp|ico|tiff?)(\?\S*)?$)/i
      , p = /(youtube(-nocookie)?\.com|youtu\.be)\/(watch\?v=|v\/|u\/|embed\/?)?([\w-]{11})(.*)?/i
      , h = /(vimeo(pro)?.com)\/(?:[^\d]+)?(\d+)\??(.*)?$/
      , f = /((maps|www)\.)?google\.([^\/\?]+)\/?((maps\/?)?\?)(.*)/i
      , m = /(facebook\.com)\/([a-z0-9_-]*)\/videos\/([0-9]*)(.*)?$/i
      , g = function() {
        var e = i.createElement("div")
          , t = {
            WebkitTransition: "webkitTransitionEnd",
            MozTransition: "transitionend",
            OTransition: "oTransitionEnd otransitionend",
            transition: "transitionend"
        };
        for (var n in t)
            if (void 0 !== e.style[n])
                return t[n];
        return !1
    }();
    function v(e) {
        var t = o();
        return g && e.length ? (e.one(g, t.resolve),
        setTimeout(t.resolve, 500)) : t.resolve(),
        t.promise()
    }
    function y(e, i, n) {
        if (1 === arguments.length)
            return t.extend({}, e);
        if ("string" == typeof i) {
            if (void 0 === n)
                return void 0 === e[i] ? null : e[i];
            e[i] = n
        } else
            t.extend(e, i);
        return this
    }
    function b(e) {
        for (var t, i = decodeURI(e.split("#")[0]).split("&"), n = {}, o = 0, s = i.length; o < s; o++)
            i[o] && (n[(t = i[o].split("="))[0]] = t[1]);
        return n
    }
    function w(e, i) {
        return e + (e.indexOf("?") > -1 ? "&" : "?") + t.param(i)
    }
    function $(e, t) {
        var i = e.indexOf("#");
        return -1 === i ? t : (i > 0 && (e = e.substr(i)),
        t + e)
    }
    function _(e, i) {
        var n = i.opener() && i.opener().data("lity-desc") || "Image with no description"
          , s = t('<img src="' + e + '" alt="' + n + '"/>')
          , r = o()
          , a = function() {
            var e;
            r.reject((e = "Failed loading image",
            t('<span class="lity-error"/>').append(e)))
        };
        return s.on("load", (function() {
            if (0 === this.naturalWidth)
                return a();
            r.resolve(s)
        }
        )).on("error", a),
        r.promise()
    }
    function C(e) {
        return '<div class="lity-iframe-container"><iframe frameborder="0" allowfullscreen allow="autoplay; fullscreen" src="' + e + '"/></div>'
    }
    function x() {
        return i.documentElement.clientHeight ? i.documentElement.clientHeight : Math.round(n.height())
    }
    function k(e) {
        var t = S();
        t && (27 === e.keyCode && t.options("esc") && t.close(),
        9 === e.keyCode && function(e, t) {
            var n = t.element().find(c)
              , o = n.index(i.activeElement);
            e.shiftKey && o <= 0 ? (n.get(n.length - 1).focus(),
            e.preventDefault()) : e.shiftKey || o !== n.length - 1 || (n.get(0).focus(),
            e.preventDefault())
        }(e, t))
    }
    function T() {
        t.each(r, (function(e, t) {
            t.resize()
        }
        ))
    }
    function S() {
        return 0 === r.length ? null : r[0]
    }
    function E(e, c, u, p) {
        var h, f, m, g, b = this, w = !1, $ = !1;
        c = t.extend({}, d, c),
        f = t(c.template),
        b.element = function() {
            return f
        }
        ,
        b.opener = function() {
            return u
        }
        ,
        b.options = t.proxy(y, b, c),
        b.handlers = t.proxy(y, b, c.handlers),
        b.resize = function() {
            w && !$ && m.css("max-height", x() + "px").trigger("lity:resize", [b])
        }
        ,
        b.close = function() {
            if (w && !$) {
                var e;
                $ = !0,
                (e = b).element().attr(a, "true"),
                1 === r.length && (s.removeClass("lity-active"),
                n.off({
                    resize: T,
                    keydown: k
                })),
                ((r = t.grep(r, (function(t) {
                    return e !== t
                }
                ))).length ? r[0].element() : t(".lity-hidden")).removeClass("lity-hidden").each((function() {
                    var e = t(this)
                      , i = e.data(l);
                    i ? e.attr(a, i) : e.removeAttr(a),
                    e.removeData(l)
                }
                ));
                var c = o();
                if (p && (i.activeElement === f[0] || t.contains(f[0], i.activeElement)))
                    try {
                        p.focus()
                    } catch (e) {}
                return m.trigger("lity:close", [b]),
                f.removeClass("lity-opened").addClass("lity-closed"),
                v(m.add(f)).always((function() {
                    m.trigger("lity:remove", [b]),
                    f.remove(),
                    f = void 0,
                    c.resolve()
                }
                )),
                c.promise()
            }
        }
        ,
        h = function(e, i, n, o) {
            var s, r = "inline", a = t.extend({}, n);
            return o && a[o] ? (s = a[o](e, i),
            r = o) : (t.each(["inline", "iframe"], (function(e, t) {
                delete a[t],
                a[t] = n[t]
            }
            )),
            t.each(a, (function(t, n) {
                return !n || !(!n.test || n.test(e, i)) || (!1 !== (s = n(e, i)) ? (r = t,
                !1) : void 0)
            }
            ))),
            {
                handler: r,
                content: s || ""
            }
        }(e, b, c.handlers, c.handler),
        f.attr(a, "false").addClass("lity-loading lity-opened lity-" + h.handler).appendTo("body").focus().on("click", "[data-lity-close]", (function(e) {
            t(e.target).is("[data-lity-close]") && b.close()
        }
        )).trigger("lity:open", [b]),
        g = b,
        1 === r.unshift(g) && (s.addClass("lity-active"),
        n.on({
            resize: T,
            keydown: k
        })),
        t("body > *").not(g.element()).addClass("lity-hidden").each((function() {
            var e = t(this);
            void 0 === e.data(l) && e.data(l, e.attr(a) || null)
        }
        )).attr(a, "true"),
        t.when(h.content).always((function(e) {
            m = t(e).css("max-height", x() + "px"),
            f.find(".lity-loader").each((function() {
                var e = t(this);
                v(e).always((function() {
                    e.remove()
                }
                ))
            }
            )),
            f.removeClass("lity-loading").find(".lity-content").empty().append(m),
            w = !0,
            m.trigger("lity:ready", [b])
        }
        ))
    }
    function j(e, n, o) {
        e.preventDefault ? (e.preventDefault(),
        e = (o = t(this)).data("lity-target") || o.attr("href") || o.attr("src")) : o = t(o);
        var s = new E(e,t.extend({}, o.data("lity-options") || o.data("lity"), n),o,i.activeElement);
        if (!e.preventDefault)
            return s
    }
    return _.test = function(e) {
        return u.test(e)
    }
    ,
    j.version = "@VERSION",
    j.options = t.proxy(y, j, d),
    j.handlers = t.proxy(y, j, d.handlers),
    j.current = S,
    t(i).on("click.lity", "[data-lity]", j),
    j
}
)),
function(e, t) {
    "function" == typeof define && define.amd ? define("jquery-bridget/jquery-bridget", ["jquery"], (function(i) {
        return t(e, i)
    }
    )) : "object" == typeof module && module.exports ? module.exports = t(e, require("jquery")) : e.jQueryBridget = t(e, e.jQuery)
}(window, (function(e, t) {
    "use strict";
    function i(i, s, a) {
        (a = a || t || e.jQuery) && (s.prototype.option || (s.prototype.option = function(e) {
            a.isPlainObject(e) && (this.options = a.extend(!0, this.options, e))
        }
        ),
        a.fn[i] = function(e) {
            return "string" == typeof e ? function(e, t, n) {
                var o, s = "$()." + i + '("' + t + '")';
                return e.each((function(e, l) {
                    var c = a.data(l, i);
                    if (c) {
                        var d = c[t];
                        if (d && "_" != t.charAt(0)) {
                            var u = d.apply(c, n);
                            o = void 0 === o ? u : o
                        } else
                            r(s + " is not a valid method")
                    } else
                        r(i + " not initialized. Cannot call methods, i.e. " + s)
                }
                )),
                void 0 !== o ? o : e
            }(this, e, o.call(arguments, 1)) : (function(e, t) {
                e.each((function(e, n) {
                    var o = a.data(n, i);
                    o ? (o.option(t),
                    o._init()) : (o = new s(n,t),
                    a.data(n, i, o))
                }
                ))
            }(this, e),
            this)
        }
        ,
        n(a))
    }
    function n(e) {
        !e || e && e.bridget || (e.bridget = i)
    }
    var o = Array.prototype.slice
      , s = e.console
      , r = void 0 === s ? function() {}
    : function(e) {
        s.error(e)
    }
    ;
    return n(t || e.jQuery),
    i
}
)),
function(e, t) {
    "function" == typeof define && define.amd ? define("ev-emitter/ev-emitter", t) : "object" == typeof module && module.exports ? module.exports = t() : e.EvEmitter = t()
}("undefined" != typeof window ? window : this, (function() {
    function e() {}
    var t = e.prototype;
    return t.on = function(e, t) {
        if (e && t) {
            var i = this._events = this._events || {}
              , n = i[e] = i[e] || [];
            return -1 == n.indexOf(t) && n.push(t),
            this
        }
    }
    ,
    t.once = function(e, t) {
        if (e && t) {
            this.on(e, t);
            var i = this._onceEvents = this._onceEvents || {};
            return (i[e] = i[e] || {})[t] = !0,
            this
        }
    }
    ,
    t.off = function(e, t) {
        var i = this._events && this._events[e];
        if (i && i.length) {
            var n = i.indexOf(t);
            return -1 != n && i.splice(n, 1),
            this
        }
    }
    ,
    t.emitEvent = function(e, t) {
        var i = this._events && this._events[e];
        if (i && i.length) {
            i = i.slice(0),
            t = t || [];
            for (var n = this._onceEvents && this._onceEvents[e], o = 0; o < i.length; o++) {
                var s = i[o];
                n && n[s] && (this.off(e, s),
                delete n[s]),
                s.apply(this, t)
            }
            return this
        }
    }
    ,
    t.allOff = function() {
        delete this._events,
        delete this._onceEvents
    }
    ,
    e
}
)),
function(e, t) {
    "function" == typeof define && define.amd ? define("get-size/get-size", t) : "object" == typeof module && module.exports ? module.exports = t() : e.getSize = t()
}(window, (function() {
    "use strict";
    function e(e) {
        var t = parseFloat(e);
        return -1 == e.indexOf("%") && !isNaN(t) && t
    }
    function t(e) {
        var t = getComputedStyle(e);
        return t || s("Style returned " + t + ". Are you running this code in a hidden iframe on Firefox? See https://bit.ly/getsizebug1"),
        t
    }
    function i() {
        if (!l) {
            l = !0;
            var i = document.createElement("div");
            i.style.width = "200px",
            i.style.padding = "1px 2px 3px 4px",
            i.style.borderStyle = "solid",
            i.style.borderWidth = "1px 2px 3px 4px",
            i.style.boxSizing = "border-box";
            var s = document.body || document.documentElement;
            s.appendChild(i);
            var r = t(i);
            o = 200 == Math.round(e(r.width)),
            n.isBoxSizeOuter = o,
            s.removeChild(i)
        }
    }
    function n(n) {
        if (i(),
        "string" == typeof n && (n = document.querySelector(n)),
        n && "object" == typeof n && n.nodeType) {
            var s = t(n);
            if ("none" == s.display)
                return function() {
                    for (var e = {
                        width: 0,
                        height: 0,
                        innerWidth: 0,
                        innerHeight: 0,
                        outerWidth: 0,
                        outerHeight: 0
                    }, t = 0; a > t; t++)
                        e[r[t]] = 0;
                    return e
                }();
            var l = {};
            l.width = n.offsetWidth,
            l.height = n.offsetHeight;
            for (var c = l.isBorderBox = "border-box" == s.boxSizing, d = 0; a > d; d++) {
                var u = r[d]
                  , p = s[u]
                  , h = parseFloat(p);
                l[u] = isNaN(h) ? 0 : h
            }
            var f = l.paddingLeft + l.paddingRight
              , m = l.paddingTop + l.paddingBottom
              , g = l.marginLeft + l.marginRight
              , v = l.marginTop + l.marginBottom
              , y = l.borderLeftWidth + l.borderRightWidth
              , b = l.borderTopWidth + l.borderBottomWidth
              , w = c && o
              , $ = e(s.width);
            !1 !== $ && (l.width = $ + (w ? 0 : f + y));
            var _ = e(s.height);
            return !1 !== _ && (l.height = _ + (w ? 0 : m + b)),
            l.innerWidth = l.width - (f + y),
            l.innerHeight = l.height - (m + b),
            l.outerWidth = l.width + g,
            l.outerHeight = l.height + v,
            l
        }
    }
    var o, s = "undefined" == typeof console ? function() {}
    : function(e) {
        console.error(e)
    }
    , r = ["paddingLeft", "paddingRight", "paddingTop", "paddingBottom", "marginLeft", "marginRight", "marginTop", "marginBottom", "borderLeftWidth", "borderRightWidth", "borderTopWidth", "borderBottomWidth"], a = r.length, l = !1;
    return n
}
)),
function(e, t) {
    "use strict";
    "function" == typeof define && define.amd ? define("desandro-matches-selector/matches-selector", t) : "object" == typeof module && module.exports ? module.exports = t() : e.matchesSelector = t()
}(window, (function() {
    "use strict";
    var e = function() {
        var e = window.Element.prototype;
        if (e.matches)
            return "matches";
        if (e.matchesSelector)
            return "matchesSelector";
        for (var t = ["webkit", "moz", "ms", "o"], i = 0; i < t.length; i++) {
            var n = t[i] + "MatchesSelector";
            if (e[n])
                return n
        }
    }();
    return function(t, i) {
        return t[e](i)
    }
}
)),
function(e, t) {
    "function" == typeof define && define.amd ? define("fizzy-ui-utils/utils", ["desandro-matches-selector/matches-selector"], (function(i) {
        return t(e, i)
    }
    )) : "object" == typeof module && module.exports ? module.exports = t(e, require("desandro-matches-selector")) : e.fizzyUIUtils = t(e, e.matchesSelector)
}(window, (function(e, t) {
    var i = {
        extend: function(e, t) {
            for (var i in t)
                e[i] = t[i];
            return e
        },
        modulo: function(e, t) {
            return (e % t + t) % t
        }
    }
      , n = Array.prototype.slice;
    i.makeArray = function(e) {
        return Array.isArray(e) ? e : null == e ? [] : "object" == typeof e && "number" == typeof e.length ? n.call(e) : [e]
    }
    ,
    i.removeFrom = function(e, t) {
        var i = e.indexOf(t);
        -1 != i && e.splice(i, 1)
    }
    ,
    i.getParent = function(e, i) {
        for (; e.parentNode && e != document.body; )
            if (e = e.parentNode,
            t(e, i))
                return e
    }
    ,
    i.getQueryElement = function(e) {
        return "string" == typeof e ? document.querySelector(e) : e
    }
    ,
    i.handleEvent = function(e) {
        var t = "on" + e.type;
        this[t] && this[t](e)
    }
    ,
    i.filterFindElements = function(e, n) {
        e = i.makeArray(e);
        var o = [];
        return e.forEach((function(e) {
            if (e instanceof HTMLElement) {
                if (!n)
                    return void o.push(e);
                t(e, n) && o.push(e);
                for (var i = e.querySelectorAll(n), s = 0; s < i.length; s++)
                    o.push(i[s])
            }
        }
        )),
        o
    }
    ,
    i.debounceMethod = function(e, t, i) {
        i = i || 100;
        var n = e.prototype[t]
          , o = t + "Timeout";
        e.prototype[t] = function() {
            var e = this[o];
            clearTimeout(e);
            var t = arguments
              , s = this;
            this[o] = setTimeout((function() {
                n.apply(s, t),
                delete s[o]
            }
            ), i)
        }
    }
    ,
    i.docReady = function(e) {
        var t = document.readyState;
        "complete" == t || "interactive" == t ? setTimeout(e) : document.addEventListener("DOMContentLoaded", e)
    }
    ,
    i.toDashed = function(e) {
        return e.replace(/(.)([A-Z])/g, (function(e, t, i) {
            return t + "-" + i
        }
        )).toLowerCase()
    }
    ;
    var o = e.console;
    return i.htmlInit = function(t, n) {
        i.docReady((function() {
            var s = i.toDashed(n)
              , r = "data-" + s
              , a = document.querySelectorAll("[" + r + "]")
              , l = document.querySelectorAll(".js-" + s)
              , c = i.makeArray(a).concat(i.makeArray(l))
              , d = r + "-options"
              , u = e.jQuery;
            c.forEach((function(e) {
                var i, s = e.getAttribute(r) || e.getAttribute(d);
                try {
                    i = s && JSON.parse(s)
                } catch (t) {
                    return void (o && o.error("Error parsing " + r + " on " + e.className + ": " + t))
                }
                var a = new t(e,i);
                u && u.data(e, n, a)
            }
            ))
        }
        ))
    }
    ,
    i
}
)),
function(e, t) {
    "function" == typeof define && define.amd ? define("outlayer/item", ["ev-emitter/ev-emitter", "get-size/get-size"], t) : "object" == typeof module && module.exports ? module.exports = t(require("ev-emitter"), require("get-size")) : (e.Outlayer = {},
    e.Outlayer.Item = t(e.EvEmitter, e.getSize))
}(window, (function(e, t) {
    "use strict";
    function i(e, t) {
        e && (this.element = e,
        this.layout = t,
        this.position = {
            x: 0,
            y: 0
        },
        this._create())
    }
    var n = document.documentElement.style
      , o = "string" == typeof n.transition ? "transition" : "WebkitTransition"
      , s = "string" == typeof n.transform ? "transform" : "WebkitTransform"
      , r = {
        WebkitTransition: "webkitTransitionEnd",
        transition: "transitionend"
    }[o]
      , a = {
        transform: s,
        transition: o,
        transitionDuration: o + "Duration",
        transitionProperty: o + "Property",
        transitionDelay: o + "Delay"
    }
      , l = i.prototype = Object.create(e.prototype);
    l.constructor = i,
    l._create = function() {
        this._transn = {
            ingProperties: {},
            clean: {},
            onEnd: {}
        },
        this.css({
            position: "absolute"
        })
    }
    ,
    l.handleEvent = function(e) {
        var t = "on" + e.type;
        this[t] && this[t](e)
    }
    ,
    l.getSize = function() {
        this.size = t(this.element)
    }
    ,
    l.css = function(e) {
        var t = this.element.style;
        for (var i in e) {
            t[a[i] || i] = e[i]
        }
    }
    ,
    l.getPosition = function() {
        var e = getComputedStyle(this.element)
          , t = this.layout._getOption("originLeft")
          , i = this.layout._getOption("originTop")
          , n = e[t ? "left" : "right"]
          , o = e[i ? "top" : "bottom"]
          , s = parseFloat(n)
          , r = parseFloat(o)
          , a = this.layout.size;
        -1 != n.indexOf("%") && (s = s / 100 * a.width),
        -1 != o.indexOf("%") && (r = r / 100 * a.height),
        s = isNaN(s) ? 0 : s,
        r = isNaN(r) ? 0 : r,
        s -= t ? a.paddingLeft : a.paddingRight,
        r -= i ? a.paddingTop : a.paddingBottom,
        this.position.x = s,
        this.position.y = r
    }
    ,
    l.layoutPosition = function() {
        var e = this.layout.size
          , t = {}
          , i = this.layout._getOption("originLeft")
          , n = this.layout._getOption("originTop")
          , o = i ? "paddingLeft" : "paddingRight"
          , s = i ? "left" : "right"
          , r = i ? "right" : "left"
          , a = this.position.x + e[o];
        t[s] = this.getXValue(a),
        t[r] = "";
        var l = n ? "paddingTop" : "paddingBottom"
          , c = n ? "top" : "bottom"
          , d = n ? "bottom" : "top"
          , u = this.position.y + e[l];
        t[c] = this.getYValue(u),
        t[d] = "",
        this.css(t),
        this.emitEvent("layout", [this])
    }
    ,
    l.getXValue = function(e) {
        var t = this.layout._getOption("horizontal");
        return this.layout.options.percentPosition && !t ? e / this.layout.size.width * 100 + "%" : e + "px"
    }
    ,
    l.getYValue = function(e) {
        var t = this.layout._getOption("horizontal");
        return this.layout.options.percentPosition && t ? e / this.layout.size.height * 100 + "%" : e + "px"
    }
    ,
    l._transitionTo = function(e, t) {
        this.getPosition();
        var i = this.position.x
          , n = this.position.y
          , o = e == this.position.x && t == this.position.y;
        if (this.setPosition(e, t),
        !o || this.isTransitioning) {
            var s = e - i
              , r = t - n
              , a = {};
            a.transform = this.getTranslate(s, r),
            this.transition({
                to: a,
                onTransitionEnd: {
                    transform: this.layoutPosition
                },
                isCleaning: !0
            })
        } else
            this.layoutPosition()
    }
    ,
    l.getTranslate = function(e, t) {
        return "translate3d(" + (e = this.layout._getOption("originLeft") ? e : -e) + "px, " + (t = this.layout._getOption("originTop") ? t : -t) + "px, 0)"
    }
    ,
    l.goTo = function(e, t) {
        this.setPosition(e, t),
        this.layoutPosition()
    }
    ,
    l.moveTo = l._transitionTo,
    l.setPosition = function(e, t) {
        this.position.x = parseFloat(e),
        this.position.y = parseFloat(t)
    }
    ,
    l._nonTransition = function(e) {
        for (var t in this.css(e.to),
        e.isCleaning && this._removeStyles(e.to),
        e.onTransitionEnd)
            e.onTransitionEnd[t].call(this)
    }
    ,
    l.transition = function(e) {
        if (parseFloat(this.layout.options.transitionDuration)) {
            var t = this._transn;
            for (var i in e.onTransitionEnd)
                t.onEnd[i] = e.onTransitionEnd[i];
            for (i in e.to)
                t.ingProperties[i] = !0,
                e.isCleaning && (t.clean[i] = !0);
            if (e.from) {
                this.css(e.from);
                this.element.offsetHeight;
                null
            }
            this.enableTransition(e.to),
            this.css(e.to),
            this.isTransitioning = !0
        } else
            this._nonTransition(e)
    }
    ;
    var c = "opacity," + function(e) {
        return e.replace(/([A-Z])/g, (function(e) {
            return "-" + e.toLowerCase()
        }
        ))
    }(s);
    l.enableTransition = function() {
        if (!this.isTransitioning) {
            var e = this.layout.options.transitionDuration;
            e = "number" == typeof e ? e + "ms" : e,
            this.css({
                transitionProperty: c,
                transitionDuration: e,
                transitionDelay: this.staggerDelay || 0
            }),
            this.element.addEventListener(r, this, !1)
        }
    }
    ,
    l.onwebkitTransitionEnd = function(e) {
        this.ontransitionend(e)
    }
    ,
    l.onotransitionend = function(e) {
        this.ontransitionend(e)
    }
    ;
    var d = {
        "-webkit-transform": "transform"
    };
    l.ontransitionend = function(e) {
        if (e.target === this.element) {
            var t = this._transn
              , i = d[e.propertyName] || e.propertyName;
            if (delete t.ingProperties[i],
            function(e) {
                for (var t in e)
                    return !1;
                return !0
            }(t.ingProperties) && this.disableTransition(),
            i in t.clean && (this.element.style[e.propertyName] = "",
            delete t.clean[i]),
            i in t.onEnd)
                t.onEnd[i].call(this),
                delete t.onEnd[i];
            this.emitEvent("transitionEnd", [this])
        }
    }
    ,
    l.disableTransition = function() {
        this.removeTransitionStyles(),
        this.element.removeEventListener(r, this, !1),
        this.isTransitioning = !1
    }
    ,
    l._removeStyles = function(e) {
        var t = {};
        for (var i in e)
            t[i] = "";
        this.css(t)
    }
    ;
    var u = {
        transitionProperty: "",
        transitionDuration: "",
        transitionDelay: ""
    };
    return l.removeTransitionStyles = function() {
        this.css(u)
    }
    ,
    l.stagger = function(e) {
        e = isNaN(e) ? 0 : e,
        this.staggerDelay = e + "ms"
    }
    ,
    l.removeElem = function() {
        this.element.parentNode.removeChild(this.element),
        this.css({
            display: ""
        }),
        this.emitEvent("remove", [this])
    }
    ,
    l.remove = function() {
        return o && parseFloat(this.layout.options.transitionDuration) ? (this.once("transitionEnd", (function() {
            this.removeElem()
        }
        )),
        void this.hide()) : void this.removeElem()
    }
    ,
    l.reveal = function() {
        delete this.isHidden,
        this.css({
            display: ""
        });
        var e = this.layout.options
          , t = {};
        t[this.getHideRevealTransitionEndProperty("visibleStyle")] = this.onRevealTransitionEnd,
        this.transition({
            from: e.hiddenStyle,
            to: e.visibleStyle,
            isCleaning: !0,
            onTransitionEnd: t
        })
    }
    ,
    l.onRevealTransitionEnd = function() {
        this.isHidden || this.emitEvent("reveal")
    }
    ,
    l.getHideRevealTransitionEndProperty = function(e) {
        var t = this.layout.options[e];
        if (t.opacity)
            return "opacity";
        for (var i in t)
            return i
    }
    ,
    l.hide = function() {
        this.isHidden = !0,
        this.css({
            display: ""
        });
        var e = this.layout.options
          , t = {};
        t[this.getHideRevealTransitionEndProperty("hiddenStyle")] = this.onHideTransitionEnd,
        this.transition({
            from: e.visibleStyle,
            to: e.hiddenStyle,
            isCleaning: !0,
            onTransitionEnd: t
        })
    }
    ,
    l.onHideTransitionEnd = function() {
        this.isHidden && (this.css({
            display: "none"
        }),
        this.emitEvent("hide"))
    }
    ,
    l.destroy = function() {
        this.css({
            position: "",
            left: "",
            right: "",
            top: "",
            bottom: "",
            transition: "",
            transform: ""
        })
    }
    ,
    i
}
)),
function(e, t) {
    "use strict";
    "function" == typeof define && define.amd ? define("outlayer/outlayer", ["ev-emitter/ev-emitter", "get-size/get-size", "fizzy-ui-utils/utils", "./item"], (function(i, n, o, s) {
        return t(e, i, n, o, s)
    }
    )) : "object" == typeof module && module.exports ? module.exports = t(e, require("ev-emitter"), require("get-size"), require("fizzy-ui-utils"), require("./item")) : e.Outlayer = t(e, e.EvEmitter, e.getSize, e.fizzyUIUtils, e.Outlayer.Item)
}(window, (function(e, t, i, n, o) {
    "use strict";
    function s(e, t) {
        var i = n.getQueryElement(e);
        if (i) {
            this.element = i,
            l && (this.$element = l(this.element)),
            this.options = n.extend({}, this.constructor.defaults),
            this.option(t);
            var o = ++d;
            this.element.outlayerGUID = o,
            u[o] = this,
            this._create(),
            this._getOption("initLayout") && this.layout()
        } else
            a && a.error("Bad element for " + this.constructor.namespace + ": " + (i || e))
    }
    function r(e) {
        function t() {
            e.apply(this, arguments)
        }
        return t.prototype = Object.create(e.prototype),
        t.prototype.constructor = t,
        t
    }
    var a = e.console
      , l = e.jQuery
      , c = function() {}
      , d = 0
      , u = {};
    s.namespace = "outlayer",
    s.Item = o,
    s.defaults = {
        containerStyle: {
            position: "relative"
        },
        initLayout: !0,
        originLeft: !0,
        originTop: !0,
        resize: !0,
        resizeContainer: !0,
        transitionDuration: "0.4s",
        hiddenStyle: {
            opacity: 0,
            transform: "scale(0.001)"
        },
        visibleStyle: {
            opacity: 1,
            transform: "scale(1)"
        }
    };
    var p = s.prototype;
    n.extend(p, t.prototype),
    p.option = function(e) {
        n.extend(this.options, e)
    }
    ,
    p._getOption = function(e) {
        var t = this.constructor.compatOptions[e];
        return t && void 0 !== this.options[t] ? this.options[t] : this.options[e]
    }
    ,
    s.compatOptions = {
        initLayout: "isInitLayout",
        horizontal: "isHorizontal",
        layoutInstant: "isLayoutInstant",
        originLeft: "isOriginLeft",
        originTop: "isOriginTop",
        resize: "isResizeBound",
        resizeContainer: "isResizingContainer"
    },
    p._create = function() {
        this.reloadItems(),
        this.stamps = [],
        this.stamp(this.options.stamp),
        n.extend(this.element.style, this.options.containerStyle),
        this._getOption("resize") && this.bindResize()
    }
    ,
    p.reloadItems = function() {
        this.items = this._itemize(this.element.children)
    }
    ,
    p._itemize = function(e) {
        for (var t = this._filterFindItemElements(e), i = this.constructor.Item, n = [], o = 0; o < t.length; o++) {
            var s = new i(t[o],this);
            n.push(s)
        }
        return n
    }
    ,
    p._filterFindItemElements = function(e) {
        return n.filterFindElements(e, this.options.itemSelector)
    }
    ,
    p.getItemElements = function() {
        return this.items.map((function(e) {
            return e.element
        }
        ))
    }
    ,
    p.layout = function() {
        this._resetLayout(),
        this._manageStamps();
        var e = this._getOption("layoutInstant")
          , t = void 0 !== e ? e : !this._isLayoutInited;
        this.layoutItems(this.items, t),
        this._isLayoutInited = !0
    }
    ,
    p._init = p.layout,
    p._resetLayout = function() {
        this.getSize()
    }
    ,
    p.getSize = function() {
        this.size = i(this.element)
    }
    ,
    p._getMeasurement = function(e, t) {
        var n, o = this.options[e];
        o ? ("string" == typeof o ? n = this.element.querySelector(o) : o instanceof HTMLElement && (n = o),
        this[e] = n ? i(n)[t] : o) : this[e] = 0
    }
    ,
    p.layoutItems = function(e, t) {
        e = this._getItemsForLayout(e),
        this._layoutItems(e, t),
        this._postLayout()
    }
    ,
    p._getItemsForLayout = function(e) {
        return e.filter((function(e) {
            return !e.isIgnored
        }
        ))
    }
    ,
    p._layoutItems = function(e, t) {
        if (this._emitCompleteOnItems("layout", e),
        e && e.length) {
            var i = [];
            e.forEach((function(e) {
                var n = this._getItemLayoutPosition(e);
                n.item = e,
                n.isInstant = t || e.isLayoutInstant,
                i.push(n)
            }
            ), this),
            this._processLayoutQueue(i)
        }
    }
    ,
    p._getItemLayoutPosition = function() {
        return {
            x: 0,
            y: 0
        }
    }
    ,
    p._processLayoutQueue = function(e) {
        this.updateStagger(),
        e.forEach((function(e, t) {
            this._positionItem(e.item, e.x, e.y, e.isInstant, t)
        }
        ), this)
    }
    ,
    p.updateStagger = function() {
        var e = this.options.stagger;
        return null == e ? void (this.stagger = 0) : (this.stagger = function(e) {
            if ("number" == typeof e)
                return e;
            var t = e.match(/(^\d*\.?\d*)(\w*)/)
              , i = t && t[1]
              , n = t && t[2];
            return i.length ? (i = parseFloat(i)) * (h[n] || 1) : 0
        }(e),
        this.stagger)
    }
    ,
    p._positionItem = function(e, t, i, n, o) {
        n ? e.goTo(t, i) : (e.stagger(o * this.stagger),
        e.moveTo(t, i))
    }
    ,
    p._postLayout = function() {
        this.resizeContainer()
    }
    ,
    p.resizeContainer = function() {
        if (this._getOption("resizeContainer")) {
            var e = this._getContainerSize();
            e && (this._setContainerMeasure(e.width, !0),
            this._setContainerMeasure(e.height, !1))
        }
    }
    ,
    p._getContainerSize = c,
    p._setContainerMeasure = function(e, t) {
        if (void 0 !== e) {
            var i = this.size;
            i.isBorderBox && (e += t ? i.paddingLeft + i.paddingRight + i.borderLeftWidth + i.borderRightWidth : i.paddingBottom + i.paddingTop + i.borderTopWidth + i.borderBottomWidth),
            e = Math.max(e, 0),
            this.element.style[t ? "width" : "height"] = e + "px"
        }
    }
    ,
    p._emitCompleteOnItems = function(e, t) {
        function i() {
            o.dispatchEvent(e + "Complete", null, [t])
        }
        function n() {
            ++r == s && i()
        }
        var o = this
          , s = t.length;
        if (t && s) {
            var r = 0;
            t.forEach((function(t) {
                t.once(e, n)
            }
            ))
        } else
            i()
    }
    ,
    p.dispatchEvent = function(e, t, i) {
        var n = t ? [t].concat(i) : i;
        if (this.emitEvent(e, n),
        l)
            if (this.$element = this.$element || l(this.element),
            t) {
                var o = l.Event(t);
                o.type = e,
                this.$element.trigger(o, i)
            } else
                this.$element.trigger(e, i)
    }
    ,
    p.ignore = function(e) {
        var t = this.getItem(e);
        t && (t.isIgnored = !0)
    }
    ,
    p.unignore = function(e) {
        var t = this.getItem(e);
        t && delete t.isIgnored
    }
    ,
    p.stamp = function(e) {
        (e = this._find(e)) && (this.stamps = this.stamps.concat(e),
        e.forEach(this.ignore, this))
    }
    ,
    p.unstamp = function(e) {
        (e = this._find(e)) && e.forEach((function(e) {
            n.removeFrom(this.stamps, e),
            this.unignore(e)
        }
        ), this)
    }
    ,
    p._find = function(e) {
        return e ? ("string" == typeof e && (e = this.element.querySelectorAll(e)),
        e = n.makeArray(e)) : void 0
    }
    ,
    p._manageStamps = function() {
        this.stamps && this.stamps.length && (this._getBoundingRect(),
        this.stamps.forEach(this._manageStamp, this))
    }
    ,
    p._getBoundingRect = function() {
        var e = this.element.getBoundingClientRect()
          , t = this.size;
        this._boundingRect = {
            left: e.left + t.paddingLeft + t.borderLeftWidth,
            top: e.top + t.paddingTop + t.borderTopWidth,
            right: e.right - (t.paddingRight + t.borderRightWidth),
            bottom: e.bottom - (t.paddingBottom + t.borderBottomWidth)
        }
    }
    ,
    p._manageStamp = c,
    p._getElementOffset = function(e) {
        var t = e.getBoundingClientRect()
          , n = this._boundingRect
          , o = i(e);
        return {
            left: t.left - n.left - o.marginLeft,
            top: t.top - n.top - o.marginTop,
            right: n.right - t.right - o.marginRight,
            bottom: n.bottom - t.bottom - o.marginBottom
        }
    }
    ,
    p.handleEvent = n.handleEvent,
    p.bindResize = function() {
        e.addEventListener("resize", this),
        this.isResizeBound = !0
    }
    ,
    p.unbindResize = function() {
        e.removeEventListener("resize", this),
        this.isResizeBound = !1
    }
    ,
    p.onresize = function() {
        this.resize()
    }
    ,
    n.debounceMethod(s, "onresize", 100),
    p.resize = function() {
        this.isResizeBound && this.needsResizeLayout() && this.layout()
    }
    ,
    p.needsResizeLayout = function() {
        var e = i(this.element);
        return this.size && e && e.innerWidth !== this.size.innerWidth
    }
    ,
    p.addItems = function(e) {
        var t = this._itemize(e);
        return t.length && (this.items = this.items.concat(t)),
        t
    }
    ,
    p.appended = function(e) {
        var t = this.addItems(e);
        t.length && (this.layoutItems(t, !0),
        this.reveal(t))
    }
    ,
    p.prepended = function(e) {
        var t = this._itemize(e);
        if (t.length) {
            var i = this.items.slice(0);
            this.items = t.concat(i),
            this._resetLayout(),
            this._manageStamps(),
            this.layoutItems(t, !0),
            this.reveal(t),
            this.layoutItems(i)
        }
    }
    ,
    p.reveal = function(e) {
        if (this._emitCompleteOnItems("reveal", e),
        e && e.length) {
            var t = this.updateStagger();
            e.forEach((function(e, i) {
                e.stagger(i * t),
                e.reveal()
            }
            ))
        }
    }
    ,
    p.hide = function(e) {
        if (this._emitCompleteOnItems("hide", e),
        e && e.length) {
            var t = this.updateStagger();
            e.forEach((function(e, i) {
                e.stagger(i * t),
                e.hide()
            }
            ))
        }
    }
    ,
    p.revealItemElements = function(e) {
        var t = this.getItems(e);
        this.reveal(t)
    }
    ,
    p.hideItemElements = function(e) {
        var t = this.getItems(e);
        this.hide(t)
    }
    ,
    p.getItem = function(e) {
        for (var t = 0; t < this.items.length; t++) {
            var i = this.items[t];
            if (i.element == e)
                return i
        }
    }
    ,
    p.getItems = function(e) {
        e = n.makeArray(e);
        var t = [];
        return e.forEach((function(e) {
            var i = this.getItem(e);
            i && t.push(i)
        }
        ), this),
        t
    }
    ,
    p.remove = function(e) {
        var t = this.getItems(e);
        this._emitCompleteOnItems("remove", t),
        t && t.length && t.forEach((function(e) {
            e.remove(),
            n.removeFrom(this.items, e)
        }
        ), this)
    }
    ,
    p.destroy = function() {
        var e = this.element.style;
        e.height = "",
        e.position = "",
        e.width = "",
        this.items.forEach((function(e) {
            e.destroy()
        }
        )),
        this.unbindResize();
        var t = this.element.outlayerGUID;
        delete u[t],
        delete this.element.outlayerGUID,
        l && l.removeData(this.element, this.constructor.namespace)
    }
    ,
    s.data = function(e) {
        var t = (e = n.getQueryElement(e)) && e.outlayerGUID;
        return t && u[t]
    }
    ,
    s.create = function(e, t) {
        var i = r(s);
        return i.defaults = n.extend({}, s.defaults),
        n.extend(i.defaults, t),
        i.compatOptions = n.extend({}, s.compatOptions),
        i.namespace = e,
        i.data = s.data,
        i.Item = r(o),
        n.htmlInit(i, e),
        l && l.bridget && l.bridget(e, i),
        i
    }
    ;
    var h = {
        ms: 1,
        s: 1e3
    };
    return s.Item = o,
    s
}
)),
function(e, t) {
    "function" == typeof define && define.amd ? define(["outlayer/outlayer", "get-size/get-size"], t) : "object" == typeof module && module.exports ? module.exports = t(require("outlayer"), require("get-size")) : e.Masonry = t(e.Outlayer, e.getSize)
}(window, (function(e, t) {
    var i = e.create("masonry");
    i.compatOptions.fitWidth = "isFitWidth";
    var n = i.prototype;
    return n._resetLayout = function() {
        this.getSize(),
        this._getMeasurement("columnWidth", "outerWidth"),
        this._getMeasurement("gutter", "outerWidth"),
        this.measureColumns(),
        this.colYs = [];
        for (var e = 0; e < this.cols; e++)
            this.colYs.push(0);
        this.maxY = 0,
        this.horizontalColIndex = 0
    }
    ,
    n.measureColumns = function() {
        if (this.getContainerWidth(),
        !this.columnWidth) {
            var e = this.items[0]
              , i = e && e.element;
            this.columnWidth = i && t(i).outerWidth || this.containerWidth
        }
        var n = this.columnWidth += this.gutter
          , o = this.containerWidth + this.gutter
          , s = o / n
          , r = n - o % n;
        s = Math[r && 1 > r ? "round" : "floor"](s),
        this.cols = Math.max(s, 1)
    }
    ,
    n.getContainerWidth = function() {
        var e = this._getOption("fitWidth") ? this.element.parentNode : this.element
          , i = t(e);
        this.containerWidth = i && i.innerWidth
    }
    ,
    n._getItemLayoutPosition = function(e) {
        e.getSize();
        var t = e.size.outerWidth % this.columnWidth
          , i = Math[t && 1 > t ? "round" : "ceil"](e.size.outerWidth / this.columnWidth);
        i = Math.min(i, this.cols);
        for (var n = this[this.options.horizontalOrder ? "_getHorizontalColPosition" : "_getTopColPosition"](i, e), o = {
            x: this.columnWidth * n.col,
            y: n.y
        }, s = n.y + e.size.outerHeight, r = i + n.col, a = n.col; r > a; a++)
            this.colYs[a] = s;
        return o
    }
    ,
    n._getTopColPosition = function(e) {
        var t = this._getTopColGroup(e)
          , i = Math.min.apply(Math, t);
        return {
            col: t.indexOf(i),
            y: i
        }
    }
    ,
    n._getTopColGroup = function(e) {
        if (2 > e)
            return this.colYs;
        for (var t = [], i = this.cols + 1 - e, n = 0; i > n; n++)
            t[n] = this._getColGroupY(n, e);
        return t
    }
    ,
    n._getColGroupY = function(e, t) {
        if (2 > t)
            return this.colYs[e];
        var i = this.colYs.slice(e, e + t);
        return Math.max.apply(Math, i)
    }
    ,
    n._getHorizontalColPosition = function(e, t) {
        var i = this.horizontalColIndex % this.cols;
        i = e > 1 && i + e > this.cols ? 0 : i;
        var n = t.size.outerWidth && t.size.outerHeight;
        return this.horizontalColIndex = n ? i + e : this.horizontalColIndex,
        {
            col: i,
            y: this._getColGroupY(i, e)
        }
    }
    ,
    n._manageStamp = function(e) {
        var i = t(e)
          , n = this._getElementOffset(e)
          , o = this._getOption("originLeft") ? n.left : n.right
          , s = o + i.outerWidth
          , r = Math.floor(o / this.columnWidth);
        r = Math.max(0, r);
        var a = Math.floor(s / this.columnWidth);
        a -= s % this.columnWidth ? 0 : 1,
        a = Math.min(this.cols - 1, a);
        for (var l = (this._getOption("originTop") ? n.top : n.bottom) + i.outerHeight, c = r; a >= c; c++)
            this.colYs[c] = Math.max(l, this.colYs[c])
    }
    ,
    n._getContainerSize = function() {
        this.maxY = Math.max.apply(Math, this.colYs);
        var e = {
            height: this.maxY
        };
        return this._getOption("fitWidth") && (e.width = this._getContainerFitWidth()),
        e
    }
    ,
    n._getContainerFitWidth = function() {
        for (var e = 0, t = this.cols; --t && 0 === this.colYs[t]; )
            e++;
        return (this.cols - e) * this.columnWidth - this.gutter
    }
    ,
    n.needsResizeLayout = function() {
        var e = this.containerWidth;
        return this.getContainerWidth(),
        e != this.containerWidth
    }
    ,
    i
}
)),
function(e, t) {
    "function" == typeof define && define.amd ? define(["jquery"], (function(i) {
        return t(e, i)
    }
    )) : "object" == typeof exports ? t(e, require("jquery")) : t(e, e.jQuery || e.Zepto)
}(this, (function(e, t) {
    "use strict";
    function i(e) {
        if (w && "none" === e.css("animation-name") && "none" === e.css("-webkit-animation-name") && "none" === e.css("-moz-animation-name") && "none" === e.css("-o-animation-name") && "none" === e.css("-ms-animation-name"))
            return 0;
        var t, i, n, o, s = e.css("animation-duration") || e.css("-webkit-animation-duration") || e.css("-moz-animation-duration") || e.css("-o-animation-duration") || e.css("-ms-animation-duration") || "0s", r = e.css("animation-delay") || e.css("-webkit-animation-delay") || e.css("-moz-animation-delay") || e.css("-o-animation-delay") || e.css("-ms-animation-delay") || "0s", a = e.css("animation-iteration-count") || e.css("-webkit-animation-iteration-count") || e.css("-moz-animation-iteration-count") || e.css("-o-animation-iteration-count") || e.css("-ms-animation-iteration-count") || "1";
        for (s = s.split(", "),
        r = r.split(", "),
        a = a.split(", "),
        o = 0,
        i = s.length,
        t = Number.NEGATIVE_INFINITY; o < i; o++)
            (n = parseFloat(s[o]) * parseInt(a[o], 10) + parseFloat(r[o])) > t && (t = n);
        return t
    }
    function n() {
        if (t(document).height() <= t(window).height())
            return 0;
        var e, i, n = document.createElement("div"), o = document.createElement("div");
        return n.style.visibility = "hidden",
        n.style.width = "100px",
        document.body.appendChild(n),
        e = n.offsetWidth,
        n.style.overflow = "scroll",
        o.style.width = "100%",
        n.appendChild(o),
        i = o.offsetWidth,
        n.parentNode.removeChild(n),
        e - i
    }
    function o() {
        if (!$) {
            var e, i, o = t("html"), s = l("is-locked");
            o.hasClass(s) && (i = t(document.body),
            e = parseInt(i.css("padding-right"), 10) - n(),
            i.css("padding-right", e + "px"),
            o.removeClass(s))
        }
    }
    function s(e, t, i, n) {
        var o = l("is", t)
          , s = [l("is", y.CLOSING), l("is", y.OPENING), l("is", y.CLOSED), l("is", y.OPENED)].join(" ");
        e.$bg.removeClass(s).addClass(o),
        e.$overlay.removeClass(s).addClass(o),
        e.$wrapper.removeClass(s).addClass(o),
        e.$modal.removeClass(s).addClass(o),
        e.state = t,
        !i && e.$modal.trigger({
            type: t,
            reason: n
        }, [{
            reason: n
        }])
    }
    function r(e, n, o) {
        var s = 0
          , r = function(e) {
            e.target === this && s++
        }
          , a = function(e) {
            e.target === this && 0 == --s && (t.each(["$bg", "$overlay", "$wrapper", "$modal"], (function(e, t) {
                o[t].off(m + " " + g)
            }
            )),
            n())
        };
        t.each(["$bg", "$overlay", "$wrapper", "$modal"], (function(e, t) {
            o[t].on(m, r).on(g, a)
        }
        )),
        e(),
        0 === i(o.$bg) && 0 === i(o.$overlay) && 0 === i(o.$wrapper) && 0 === i(o.$modal) && (t.each(["$bg", "$overlay", "$wrapper", "$modal"], (function(e, t) {
            o[t].off(m + " " + g)
        }
        )),
        n())
    }
    function a(e) {
        e.state !== y.CLOSED && (t.each(["$bg", "$overlay", "$wrapper", "$modal"], (function(t, i) {
            e[i].off(m + " " + g)
        }
        )),
        e.$bg.removeClass(e.settings.modifier),
        e.$overlay.removeClass(e.settings.modifier).hide(),
        e.$wrapper.hide(),
        o(),
        s(e, y.CLOSED, !0))
    }
    function l() {
        for (var e = f, t = 0; t < arguments.length; ++t)
            e += "-" + arguments[t];
        return e
    }
    function c() {
        var e, i, n = location.hash.replace("#", "");
        if (n) {
            try {
                i = t('[data-remodal-id="' + n + '"]')
            } catch (e) {}
            i && i.length && ((e = t[h].lookup[i.data(h)]) && e.settings.hashTracking && e.open())
        } else
            u && u.state === y.OPENED && u.settings.hashTracking && u.close()
    }
    function d(e, i) {
        var n = t(document.body)
          , o = this;
        o.settings = t.extend({}, v, i),
        o.index = t[h].lookup.push(o) - 1,
        o.state = y.CLOSED,
        o.$overlay = t("." + l("overlay")),
        null !== o.settings.appendTo && o.settings.appendTo.length && (n = t(o.settings.appendTo)),
        o.$overlay.length || (o.$overlay = t("<div>").addClass(l("overlay") + " " + l("is", y.CLOSED)).hide(),
        n.append(o.$overlay)),
        o.$bg = t("." + l("bg")).addClass(l("is", y.CLOSED)),
        o.$modal = e.addClass(f + " " + l("is-initialized") + " " + o.settings.modifier + " " + l("is", y.CLOSED)).attr("tabindex", "-1"),
        o.$wrapper = t("<div>").addClass(l("wrapper") + " " + o.settings.modifier + " " + l("is", y.CLOSED)).hide().append(o.$modal),
        n.append(o.$wrapper),
        o.$wrapper.on("click." + f, '[data-remodal-action="close"]', (function(e) {
            e.preventDefault(),
            o.close()
        }
        )),
        o.$wrapper.on("click." + f, '[data-remodal-action="cancel"]', (function(e) {
            e.preventDefault(),
            o.$modal.trigger(b.CANCELLATION),
            o.settings.closeOnCancel && o.close(b.CANCELLATION)
        }
        )),
        o.$wrapper.on("click." + f, '[data-remodal-action="confirm"]', (function(e) {
            e.preventDefault(),
            o.$modal.trigger(b.CONFIRMATION),
            o.settings.closeOnConfirm && o.close(b.CONFIRMATION)
        }
        )),
        o.$wrapper.on("click." + f, (function(e) {
            t(e.target).hasClass(l("wrapper")) && o.settings.closeOnOutsideClick && o.close()
        }
        ))
    }
    var u, p, h = "remodal", f = e.REMODAL_GLOBALS && e.REMODAL_GLOBALS.NAMESPACE || h, m = t.map(["animationstart", "webkitAnimationStart", "MSAnimationStart", "oAnimationStart"], (function(e) {
        return e + "." + f
    }
    )).join(" "), g = t.map(["animationend", "webkitAnimationEnd", "MSAnimationEnd", "oAnimationEnd"], (function(e) {
        return e + "." + f
    }
    )).join(" "), v = t.extend({
        hashTracking: !0,
        closeOnConfirm: !0,
        closeOnCancel: !0,
        closeOnEscape: !0,
        closeOnOutsideClick: !0,
        modifier: "",
        appendTo: null
    }, e.REMODAL_GLOBALS && e.REMODAL_GLOBALS.DEFAULTS), y = {
        CLOSING: "closing",
        CLOSED: "closed",
        OPENING: "opening",
        OPENED: "opened"
    }, b = {
        CONFIRMATION: "confirmation",
        CANCELLATION: "cancellation"
    }, w = function() {
        var e = document.createElement("div").style;
        return void 0 !== e.animationName || void 0 !== e.WebkitAnimationName || void 0 !== e.MozAnimationName || void 0 !== e.msAnimationName || void 0 !== e.OAnimationName
    }(), $ = /iPad|iPhone|iPod/.test(navigator.platform);
    d.prototype.open = function() {
        var e, i = this;
        i.state !== y.OPENING && i.state !== y.CLOSING && ((e = i.$modal.attr("data-remodal-id")) && i.settings.hashTracking && (p = t(window).scrollTop(),
        location.hash = e),
        u && u !== i && a(u),
        u = i,
        function() {
            if (!$) {
                var e, i, o = t("html"), s = l("is-locked");
                o.hasClass(s) || (i = t(document.body),
                e = parseInt(i.css("padding-right"), 10) + n(),
                i.css("padding-right", e + "px"),
                o.addClass(s))
            }
        }(),
        i.$bg.addClass(i.settings.modifier),
        i.$overlay.addClass(i.settings.modifier).show(),
        i.$wrapper.show().scrollTop(0),
        i.$modal.focus(),
        r((function() {
            s(i, y.OPENING)
        }
        ), (function() {
            s(i, y.OPENED)
        }
        ), i))
    }
    ,
    d.prototype.close = function(e) {
        var i = this;
        i.state !== y.OPENING && i.state !== y.CLOSING && i.state !== y.CLOSED && (i.settings.hashTracking && i.$modal.attr("data-remodal-id") === location.hash.substr(1) && (location.hash = "",
        t(window).scrollTop(p)),
        r((function() {
            s(i, y.CLOSING, !1, e)
        }
        ), (function() {
            i.$bg.removeClass(i.settings.modifier),
            i.$overlay.removeClass(i.settings.modifier).hide(),
            i.$wrapper.hide(),
            o(),
            s(i, y.CLOSED, !1, e)
        }
        ), i))
    }
    ,
    d.prototype.getState = function() {
        return this.state
    }
    ,
    d.prototype.destroy = function() {
        var e = t[h].lookup;
        a(this),
        this.$wrapper.remove(),
        delete e[this.index],
        0 === t.grep(e, (function(e) {
            return !!e
        }
        )).length && (this.$overlay.remove(),
        this.$bg.removeClass(l("is", y.CLOSING) + " " + l("is", y.OPENING) + " " + l("is", y.CLOSED) + " " + l("is", y.OPENED)))
    }
    ,
    t[h] = {
        lookup: []
    },
    t.fn[h] = function(e) {
        var i, n;
        return this.each((function(o, s) {
            null == (n = t(s)).data(h) ? (i = new d(n,e),
            n.data(h, i.index),
            i.settings.hashTracking && n.attr("data-remodal-id") === location.hash.substr(1) && i.open()) : i = t[h].lookup[n.data(h)]
        }
        )),
        i
    }
    ,
    t(document).ready((function() {
        t(document).on("click", "[data-remodal-target]", (function(e) {
            e.preventDefault();
            var i = e.currentTarget.getAttribute("data-remodal-target")
              , n = t('[data-remodal-id="' + i + '"]');
            t[h].lookup[n.data(h)].open()
        }
        )),
        t(document).find("." + f).each((function(e, i) {
            var n = t(i)
              , o = n.data("remodal-options");
            o ? ("string" == typeof o || o instanceof String) && (o = function(e) {
                var t, i, n, o, s = {};
                for (o = 0,
                i = (t = (e = e.replace(/\s*:\s*/g, ":").replace(/\s*,\s*/g, ",")).split(",")).length; o < i; o++)
                    t[o] = t[o].split(":"),
                    ("string" == typeof (n = t[o][1]) || n instanceof String) && (n = "true" === n || "false" !== n && n),
                    ("string" == typeof n || n instanceof String) && (n = isNaN(n) ? n : +n),
                    s[t[o][0]] = n;
                return s
            }(o)) : o = {},
            n[h](o)
        }
        )),
        t(document).on("keydown." + f, (function(e) {
            u && u.settings.closeOnEscape && u.state === y.OPENED && 27 === e.keyCode && u.close()
        }
        )),
        t(window).on("hashchange." + f, c)
    }
    ))
}
)),
function(e) {
    "use strict";
    "function" == typeof define && define.amd ? define(["jquery"], e) : "undefined" != typeof exports ? module.exports = e(require("jquery")) : e(jQuery)
}((function(e) {
    "use strict";
    var t, i = window.Slick || {};
    t = 0,
    (i = function(i, n) {
        var o, s = this;
        s.defaults = {
            accessibility: !0,
            adaptiveHeight: !1,
            appendArrows: e(i),
            appendDots: e(i),
            arrows: !0,
            asNavFor: null,
            prevArrow: '<button type="button" data-role="none" class="slick-prev" aria-label="Previous" tabindex="0" role="button">Previous</button>',
            nextArrow: '<button type="button" data-role="none" class="slick-next" aria-label="Next" tabindex="0" role="button">Next</button>',
            autoplay: !1,
            autoplaySpeed: 3e3,
            centerMode: !1,
            centerPadding: "50px",
            cssEase: "ease",
            customPaging: function(t, i) {
                return e('<button type="button" data-role="none" role="button" tabindex="0" />').text(i + 1)
            },
            dots: !1,
            dotsClass: "slick-dots",
            draggable: !0,
            easing: "linear",
            edgeFriction: .35,
            fade: !1,
            focusOnSelect: !1,
            infinite: !0,
            initialSlide: 0,
            lazyLoad: "ondemand",
            mobileFirst: !1,
            pauseOnHover: !0,
            pauseOnFocus: !0,
            pauseOnDotsHover: !1,
            respondTo: "window",
            responsive: null,
            rows: 1,
            rtl: !1,
            slide: "",
            slidesPerRow: 1,
            slidesToShow: 1,
            slidesToScroll: 1,
            speed: 500,
            swipe: !0,
            swipeToSlide: !1,
            touchMove: !0,
            touchThreshold: 5,
            useCSS: !0,
            useTransform: !0,
            variableWidth: !1,
            vertical: !1,
            verticalSwiping: !1,
            waitForAnimate: !0,
            zIndex: 1e3
        },
        s.initials = {
            animating: !1,
            dragging: !1,
            autoPlayTimer: null,
            currentDirection: 0,
            currentLeft: null,
            currentSlide: 0,
            direction: 1,
            $dots: null,
            listWidth: null,
            listHeight: null,
            loadIndex: 0,
            $nextArrow: null,
            $prevArrow: null,
            slideCount: null,
            slideWidth: null,
            $slideTrack: null,
            $slides: null,
            sliding: !1,
            slideOffset: 0,
            swipeLeft: null,
            $list: null,
            touchObject: {},
            transformsEnabled: !1,
            unslicked: !1
        },
        e.extend(s, s.initials),
        s.activeBreakpoint = null,
        s.animType = null,
        s.animProp = null,
        s.breakpoints = [],
        s.breakpointSettings = [],
        s.cssTransitions = !1,
        s.focussed = !1,
        s.interrupted = !1,
        s.hidden = "hidden",
        s.paused = !0,
        s.positionProp = null,
        s.respondTo = null,
        s.rowCount = 1,
        s.shouldClick = !0,
        s.$slider = e(i),
        s.$slidesCache = null,
        s.transformType = null,
        s.transitionType = null,
        s.visibilityChange = "visibilitychange",
        s.windowWidth = 0,
        s.windowTimer = null,
        o = e(i).data("slick") || {},
        s.options = e.extend({}, s.defaults, n, o),
        s.currentSlide = s.options.initialSlide,
        s.originalSettings = s.options,
        void 0 !== document.mozHidden ? (s.hidden = "mozHidden",
        s.visibilityChange = "mozvisibilitychange") : void 0 !== document.webkitHidden && (s.hidden = "webkitHidden",
        s.visibilityChange = "webkitvisibilitychange"),
        s.autoPlay = e.proxy(s.autoPlay, s),
        s.autoPlayClear = e.proxy(s.autoPlayClear, s),
        s.autoPlayIterator = e.proxy(s.autoPlayIterator, s),
        s.changeSlide = e.proxy(s.changeSlide, s),
        s.clickHandler = e.proxy(s.clickHandler, s),
        s.selectHandler = e.proxy(s.selectHandler, s),
        s.setPosition = e.proxy(s.setPosition, s),
        s.swipeHandler = e.proxy(s.swipeHandler, s),
        s.dragHandler = e.proxy(s.dragHandler, s),
        s.keyHandler = e.proxy(s.keyHandler, s),
        s.instanceUid = t++,
        s.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/,
        s.registerBreakpoints(),
        s.init(!0)
    }
    ).prototype.activateADA = function() {
        this.$slideTrack.find(".slick-active").attr({
            "aria-hidden": "false"
        }).find("a, input, button, select").attr({
            tabindex: "0"
        })
    }
    ,
    i.prototype.addSlide = i.prototype.slickAdd = function(t, i, n) {
        var o = this;
        if ("boolean" == typeof i)
            n = i,
            i = null;
        else if (i < 0 || i >= o.slideCount)
            return !1;
        o.unload(),
        "number" == typeof i ? 0 === i && 0 === o.$slides.length ? e(t).appendTo(o.$slideTrack) : n ? e(t).insertBefore(o.$slides.eq(i)) : e(t).insertAfter(o.$slides.eq(i)) : !0 === n ? e(t).prependTo(o.$slideTrack) : e(t).appendTo(o.$slideTrack),
        o.$slides = o.$slideTrack.children(this.options.slide),
        o.$slideTrack.children(this.options.slide).detach(),
        o.$slideTrack.append(o.$slides),
        o.$slides.each((function(t, i) {
            e(i).attr("data-slick-index", t)
        }
        )),
        o.$slidesCache = o.$slides,
        o.reinit()
    }
    ,
    i.prototype.animateHeight = function() {
        var e = this;
        if (1 === e.options.slidesToShow && !0 === e.options.adaptiveHeight && !1 === e.options.vertical) {
            var t = e.$slides.eq(e.currentSlide).outerHeight(!0);
            e.$list.animate({
                height: t
            }, e.options.speed)
        }
    }
    ,
    i.prototype.animateSlide = function(t, i) {
        var n = {}
          , o = this;
        o.animateHeight(),
        !0 === o.options.rtl && !1 === o.options.vertical && (t = -t),
        !1 === o.transformsEnabled ? !1 === o.options.vertical ? o.$slideTrack.animate({
            left: t
        }, o.options.speed, o.options.easing, i) : o.$slideTrack.animate({
            top: t
        }, o.options.speed, o.options.easing, i) : !1 === o.cssTransitions ? (!0 === o.options.rtl && (o.currentLeft = -o.currentLeft),
        e({
            animStart: o.currentLeft
        }).animate({
            animStart: t
        }, {
            duration: o.options.speed,
            easing: o.options.easing,
            step: function(e) {
                e = Math.ceil(e),
                !1 === o.options.vertical ? (n[o.animType] = "translate(" + e + "px, 0px)",
                o.$slideTrack.css(n)) : (n[o.animType] = "translate(0px," + e + "px)",
                o.$slideTrack.css(n))
            },
            complete: function() {
                i && i.call()
            }
        })) : (o.applyTransition(),
        t = Math.ceil(t),
        !1 === o.options.vertical ? n[o.animType] = "translate3d(" + t + "px, 0px, 0px)" : n[o.animType] = "translate3d(0px," + t + "px, 0px)",
        o.$slideTrack.css(n),
        i && setTimeout((function() {
            o.disableTransition(),
            i.call()
        }
        ), o.options.speed))
    }
    ,
    i.prototype.getNavTarget = function() {
        var t = this.options.asNavFor;
        return t && null !== t && (t = e(t).not(this.$slider)),
        t
    }
    ,
    i.prototype.asNavFor = function(t) {
        var i = this.getNavTarget();
        null !== i && "object" == typeof i && i.each((function() {
            var i = e(this).slick("getSlick");
            i.unslicked || i.slideHandler(t, !0)
        }
        ))
    }
    ,
    i.prototype.applyTransition = function(e) {
        var t = this
          , i = {};
        !1 === t.options.fade ? i[t.transitionType] = t.transformType + " " + t.options.speed + "ms " + t.options.cssEase : i[t.transitionType] = "opacity " + t.options.speed + "ms " + t.options.cssEase,
        !1 === t.options.fade ? t.$slideTrack.css(i) : t.$slides.eq(e).css(i)
    }
    ,
    i.prototype.autoPlay = function() {
        var e = this;
        e.autoPlayClear(),
        e.slideCount > e.options.slidesToShow && (e.autoPlayTimer = setInterval(e.autoPlayIterator, e.options.autoplaySpeed))
    }
    ,
    i.prototype.autoPlayClear = function() {
        this.autoPlayTimer && clearInterval(this.autoPlayTimer)
    }
    ,
    i.prototype.autoPlayIterator = function() {
        var e = this
          , t = e.currentSlide + e.options.slidesToScroll;
        e.paused || e.interrupted || e.focussed || (!1 === e.options.infinite && (1 === e.direction && e.currentSlide + 1 === e.slideCount - 1 ? e.direction = 0 : 0 === e.direction && (t = e.currentSlide - e.options.slidesToScroll,
        e.currentSlide - 1 == 0 && (e.direction = 1))),
        e.slideHandler(t))
    }
    ,
    i.prototype.buildArrows = function() {
        var t = this;
        !0 === t.options.arrows && (t.$prevArrow = e(t.options.prevArrow).addClass("slick-arrow"),
        t.$nextArrow = e(t.options.nextArrow).addClass("slick-arrow"),
        t.slideCount > t.options.slidesToShow ? (t.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"),
        t.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"),
        t.htmlExpr.test(t.options.prevArrow) && t.$prevArrow.prependTo(t.options.appendArrows),
        t.htmlExpr.test(t.options.nextArrow) && t.$nextArrow.appendTo(t.options.appendArrows),
        !0 !== t.options.infinite && t.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true")) : t.$prevArrow.add(t.$nextArrow).addClass("slick-hidden").attr({
            "aria-disabled": "true",
            tabindex: "-1"
        }))
    }
    ,
    i.prototype.buildDots = function() {
        var t, i, n = this;
        if (!0 === n.options.dots && n.slideCount > n.options.slidesToShow) {
            for (n.$slider.addClass("slick-dotted"),
            i = e("<ul />").addClass(n.options.dotsClass),
            t = 0; t <= n.getDotCount(); t += 1)
                i.append(e("<li />").append(n.options.customPaging.call(this, n, t)));
            n.$dots = i.appendTo(n.options.appendDots),
            n.$dots.find("li").first().addClass("slick-active").attr("aria-hidden", "false")
        }
    }
    ,
    i.prototype.buildOut = function() {
        var t = this;
        t.$slides = t.$slider.children(t.options.slide + ":not(.slick-cloned)").addClass("slick-slide"),
        t.slideCount = t.$slides.length,
        t.$slides.each((function(t, i) {
            e(i).attr("data-slick-index", t).data("originalStyling", e(i).attr("style") || "")
        }
        )),
        t.$slider.addClass("slick-slider"),
        t.$slideTrack = 0 === t.slideCount ? e('<div class="slick-track"/>').appendTo(t.$slider) : t.$slides.wrapAll('<div class="slick-track"/>').parent(),
        t.$list = t.$slideTrack.wrap('<div aria-live="polite" class="slick-list"/>').parent(),
        t.$slideTrack.css("opacity", 0),
        !0 !== t.options.centerMode && !0 !== t.options.swipeToSlide || (t.options.slidesToScroll = 1),
        e("img[data-lazy]", t.$slider).not("[src]").addClass("slick-loading"),
        t.setupInfinite(),
        t.buildArrows(),
        t.buildDots(),
        t.updateDots(),
        t.setSlideClasses("number" == typeof t.currentSlide ? t.currentSlide : 0),
        !0 === t.options.draggable && t.$list.addClass("draggable")
    }
    ,
    i.prototype.buildRows = function() {
        var e, t, i, n, o, s, r, a = this;
        if (n = document.createDocumentFragment(),
        s = a.$slider.children(),
        a.options.rows > 1) {
            for (r = a.options.slidesPerRow * a.options.rows,
            o = Math.ceil(s.length / r),
            e = 0; e < o; e++) {
                var l = document.createElement("div");
                for (t = 0; t < a.options.rows; t++) {
                    var c = document.createElement("div");
                    for (i = 0; i < a.options.slidesPerRow; i++) {
                        var d = e * r + (t * a.options.slidesPerRow + i);
                        s.get(d) && c.appendChild(s.get(d))
                    }
                    l.appendChild(c)
                }
                n.appendChild(l)
            }
            a.$slider.empty().append(n),
            a.$slider.children().children().children().css({
                width: 100 / a.options.slidesPerRow + "%",
                display: "inline-block"
            })
        }
    }
    ,
    i.prototype.checkResponsive = function(t, i) {
        var n, o, s, r = this, a = !1, l = r.$slider.width(), c = window.innerWidth || e(window).width();
        if ("window" === r.respondTo ? s = c : "slider" === r.respondTo ? s = l : "min" === r.respondTo && (s = Math.min(c, l)),
        r.options.responsive && r.options.responsive.length && null !== r.options.responsive) {
            for (n in o = null,
            r.breakpoints)
                r.breakpoints.hasOwnProperty(n) && (!1 === r.originalSettings.mobileFirst ? s < r.breakpoints[n] && (o = r.breakpoints[n]) : s > r.breakpoints[n] && (o = r.breakpoints[n]));
            null !== o ? null !== r.activeBreakpoint ? (o !== r.activeBreakpoint || i) && (r.activeBreakpoint = o,
            "unslick" === r.breakpointSettings[o] ? r.unslick(o) : (r.options = e.extend({}, r.originalSettings, r.breakpointSettings[o]),
            !0 === t && (r.currentSlide = r.options.initialSlide),
            r.refresh(t)),
            a = o) : (r.activeBreakpoint = o,
            "unslick" === r.breakpointSettings[o] ? r.unslick(o) : (r.options = e.extend({}, r.originalSettings, r.breakpointSettings[o]),
            !0 === t && (r.currentSlide = r.options.initialSlide),
            r.refresh(t)),
            a = o) : null !== r.activeBreakpoint && (r.activeBreakpoint = null,
            r.options = r.originalSettings,
            !0 === t && (r.currentSlide = r.options.initialSlide),
            r.refresh(t),
            a = o),
            t || !1 === a || r.$slider.trigger("breakpoint", [r, a])
        }
    }
    ,
    i.prototype.changeSlide = function(t, i) {
        var n, o, s = this, r = e(t.currentTarget);
        switch (r.is("a") && t.preventDefault(),
        r.is("li") || (r = r.closest("li")),
        n = s.slideCount % s.options.slidesToScroll != 0 ? 0 : (s.slideCount - s.currentSlide) % s.options.slidesToScroll,
        t.data.message) {
        case "previous":
            o = 0 === n ? s.options.slidesToScroll : s.options.slidesToShow - n,
            s.slideCount > s.options.slidesToShow && s.slideHandler(s.currentSlide - o, !1, i);
            break;
        case "next":
            o = 0 === n ? s.options.slidesToScroll : n,
            s.slideCount > s.options.slidesToShow && s.slideHandler(s.currentSlide + o, !1, i);
            break;
        case "index":
            var a = 0 === t.data.index ? 0 : t.data.index || r.index() * s.options.slidesToScroll;
            s.slideHandler(s.checkNavigable(a), !1, i),
            r.children().trigger("focus");
            break;
        default:
            return
        }
    }
    ,
    i.prototype.checkNavigable = function(e) {
        var t, i;
        if (i = 0,
        e > (t = this.getNavigableIndexes())[t.length - 1])
            e = t[t.length - 1];
        else
            for (var n in t) {
                if (e < t[n]) {
                    e = i;
                    break
                }
                i = t[n]
            }
        return e
    }
    ,
    i.prototype.cleanUpEvents = function() {
        var t = this;
        t.options.dots && null !== t.$dots && e("li", t.$dots).off("click.slick", t.changeSlide).off("mouseenter.slick", e.proxy(t.interrupt, t, !0)).off("mouseleave.slick", e.proxy(t.interrupt, t, !1)),
        t.$slider.off("focus.slick blur.slick"),
        !0 === t.options.arrows && t.slideCount > t.options.slidesToShow && (t.$prevArrow && t.$prevArrow.off("click.slick", t.changeSlide),
        t.$nextArrow && t.$nextArrow.off("click.slick", t.changeSlide)),
        t.$list.off("touchstart.slick mousedown.slick", t.swipeHandler),
        t.$list.off("touchmove.slick mousemove.slick", t.swipeHandler),
        t.$list.off("touchend.slick mouseup.slick", t.swipeHandler),
        t.$list.off("touchcancel.slick mouseleave.slick", t.swipeHandler),
        t.$list.off("click.slick", t.clickHandler),
        e(document).off(t.visibilityChange, t.visibility),
        t.cleanUpSlideEvents(),
        !0 === t.options.accessibility && t.$list.off("keydown.slick", t.keyHandler),
        !0 === t.options.focusOnSelect && e(t.$slideTrack).children().off("click.slick", t.selectHandler),
        e(window).off("orientationchange.slick.slick-" + t.instanceUid, t.orientationChange),
        e(window).off("resize.slick.slick-" + t.instanceUid, t.resize),
        e("[draggable!=true]", t.$slideTrack).off("dragstart", t.preventDefault),
        e(window).off("load.slick.slick-" + t.instanceUid, t.setPosition),
        e(document).off("ready.slick.slick-" + t.instanceUid, t.setPosition)
    }
    ,
    i.prototype.cleanUpSlideEvents = function() {
        var t = this;
        t.$list.off("mouseenter.slick", e.proxy(t.interrupt, t, !0)),
        t.$list.off("mouseleave.slick", e.proxy(t.interrupt, t, !1))
    }
    ,
    i.prototype.cleanUpRows = function() {
        var e, t = this;
        t.options.rows > 1 && ((e = t.$slides.children().children()).removeAttr("style"),
        t.$slider.empty().append(e))
    }
    ,
    i.prototype.clickHandler = function(e) {
        !1 === this.shouldClick && (e.stopImmediatePropagation(),
        e.stopPropagation(),
        e.preventDefault())
    }
    ,
    i.prototype.destroy = function(t) {
        var i = this;
        i.autoPlayClear(),
        i.touchObject = {},
        i.cleanUpEvents(),
        e(".slick-cloned", i.$slider).detach(),
        i.$dots && i.$dots.remove(),
        i.$prevArrow && i.$prevArrow.length && (i.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""),
        i.htmlExpr.test(i.options.prevArrow) && i.$prevArrow.remove()),
        i.$nextArrow && i.$nextArrow.length && (i.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""),
        i.htmlExpr.test(i.options.nextArrow) && i.$nextArrow.remove()),
        i.$slides && (i.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each((function() {
            e(this).attr("style", e(this).data("originalStyling"))
        }
        )),
        i.$slideTrack.children(this.options.slide).detach(),
        i.$slideTrack.detach(),
        i.$list.detach(),
        i.$slider.append(i.$slides)),
        i.cleanUpRows(),
        i.$slider.removeClass("slick-slider"),
        i.$slider.removeClass("slick-initialized"),
        i.$slider.removeClass("slick-dotted"),
        i.unslicked = !0,
        t || i.$slider.trigger("destroy", [i])
    }
    ,
    i.prototype.disableTransition = function(e) {
        var t = this
          , i = {};
        i[t.transitionType] = "",
        !1 === t.options.fade ? t.$slideTrack.css(i) : t.$slides.eq(e).css(i)
    }
    ,
    i.prototype.fadeSlide = function(e, t) {
        var i = this;
        !1 === i.cssTransitions ? (i.$slides.eq(e).css({
            zIndex: i.options.zIndex
        }),
        i.$slides.eq(e).animate({
            opacity: 1
        }, i.options.speed, i.options.easing, t)) : (i.applyTransition(e),
        i.$slides.eq(e).css({
            opacity: 1,
            zIndex: i.options.zIndex
        }),
        t && setTimeout((function() {
            i.disableTransition(e),
            t.call()
        }
        ), i.options.speed))
    }
    ,
    i.prototype.fadeSlideOut = function(e) {
        var t = this;
        !1 === t.cssTransitions ? t.$slides.eq(e).animate({
            opacity: 0,
            zIndex: t.options.zIndex - 2
        }, t.options.speed, t.options.easing) : (t.applyTransition(e),
        t.$slides.eq(e).css({
            opacity: 0,
            zIndex: t.options.zIndex - 2
        }))
    }
    ,
    i.prototype.filterSlides = i.prototype.slickFilter = function(e) {
        var t = this;
        null !== e && (t.$slidesCache = t.$slides,
        t.unload(),
        t.$slideTrack.children(this.options.slide).detach(),
        t.$slidesCache.filter(e).appendTo(t.$slideTrack),
        t.reinit())
    }
    ,
    i.prototype.focusHandler = function() {
        var t = this;
        t.$slider.off("focus.slick blur.slick").on("focus.slick blur.slick", "*:not(.slick-arrow)", (function(i) {
            i.stopImmediatePropagation();
            var n = e(this);
            setTimeout((function() {
                t.options.pauseOnFocus && (t.focussed = n.is(":focus"),
                t.autoPlay())
            }
            ), 0)
        }
        ))
    }
    ,
    i.prototype.getCurrent = i.prototype.slickCurrentSlide = function() {
        return this.currentSlide
    }
    ,
    i.prototype.getDotCount = function() {
        var e = this
          , t = 0
          , i = 0
          , n = 0;
        if (!0 === e.options.infinite)
            for (; t < e.slideCount; )
                ++n,
                t = i + e.options.slidesToScroll,
                i += e.options.slidesToScroll <= e.options.slidesToShow ? e.options.slidesToScroll : e.options.slidesToShow;
        else if (!0 === e.options.centerMode)
            n = e.slideCount;
        else if (e.options.asNavFor)
            for (; t < e.slideCount; )
                ++n,
                t = i + e.options.slidesToScroll,
                i += e.options.slidesToScroll <= e.options.slidesToShow ? e.options.slidesToScroll : e.options.slidesToShow;
        else
            n = 1 + Math.ceil((e.slideCount - e.options.slidesToShow) / e.options.slidesToScroll);
        return n - 1
    }
    ,
    i.prototype.getLeft = function(e) {
        var t, i, n, o = this, s = 0;
        return o.slideOffset = 0,
        i = o.$slides.first().outerHeight(!0),
        !0 === o.options.infinite ? (o.slideCount > o.options.slidesToShow && (o.slideOffset = o.slideWidth * o.options.slidesToShow * -1,
        s = i * o.options.slidesToShow * -1),
        o.slideCount % o.options.slidesToScroll != 0 && e + o.options.slidesToScroll > o.slideCount && o.slideCount > o.options.slidesToShow && (e > o.slideCount ? (o.slideOffset = (o.options.slidesToShow - (e - o.slideCount)) * o.slideWidth * -1,
        s = (o.options.slidesToShow - (e - o.slideCount)) * i * -1) : (o.slideOffset = o.slideCount % o.options.slidesToScroll * o.slideWidth * -1,
        s = o.slideCount % o.options.slidesToScroll * i * -1))) : e + o.options.slidesToShow > o.slideCount && (o.slideOffset = (e + o.options.slidesToShow - o.slideCount) * o.slideWidth,
        s = (e + o.options.slidesToShow - o.slideCount) * i),
        o.slideCount <= o.options.slidesToShow && (o.slideOffset = 0,
        s = 0),
        !0 === o.options.centerMode && !0 === o.options.infinite ? o.slideOffset += o.slideWidth * Math.floor(o.options.slidesToShow / 2) - o.slideWidth : !0 === o.options.centerMode && (o.slideOffset = 0,
        o.slideOffset += o.slideWidth * Math.floor(o.options.slidesToShow / 2)),
        t = !1 === o.options.vertical ? e * o.slideWidth * -1 + o.slideOffset : e * i * -1 + s,
        !0 === o.options.variableWidth && (n = o.slideCount <= o.options.slidesToShow || !1 === o.options.infinite ? o.$slideTrack.children(".slick-slide").eq(e) : o.$slideTrack.children(".slick-slide").eq(e + o.options.slidesToShow),
        t = !0 === o.options.rtl ? n[0] ? -1 * (o.$slideTrack.width() - n[0].offsetLeft - n.width()) : 0 : n[0] ? -1 * n[0].offsetLeft : 0,
        !0 === o.options.centerMode && (n = o.slideCount <= o.options.slidesToShow || !1 === o.options.infinite ? o.$slideTrack.children(".slick-slide").eq(e) : o.$slideTrack.children(".slick-slide").eq(e + o.options.slidesToShow + 1),
        t = !0 === o.options.rtl ? n[0] ? -1 * (o.$slideTrack.width() - n[0].offsetLeft - n.width()) : 0 : n[0] ? -1 * n[0].offsetLeft : 0,
        t += (o.$list.width() - n.outerWidth()) / 2)),
        t
    }
    ,
    i.prototype.getOption = i.prototype.slickGetOption = function(e) {
        return this.options[e]
    }
    ,
    i.prototype.getNavigableIndexes = function() {
        var e, t = this, i = 0, n = 0, o = [];
        for (!1 === t.options.infinite ? e = t.slideCount : (i = -1 * t.options.slidesToScroll,
        n = -1 * t.options.slidesToScroll,
        e = 2 * t.slideCount); i < e; )
            o.push(i),
            i = n + t.options.slidesToScroll,
            n += t.options.slidesToScroll <= t.options.slidesToShow ? t.options.slidesToScroll : t.options.slidesToShow;
        return o
    }
    ,
    i.prototype.getSlick = function() {
        return this
    }
    ,
    i.prototype.getSlideCount = function() {
        var t, i, n = this;
        return i = !0 === n.options.centerMode ? n.slideWidth * Math.floor(n.options.slidesToShow / 2) : 0,
        !0 === n.options.swipeToSlide ? (n.$slideTrack.find(".slick-slide").each((function(o, s) {
            if (s.offsetLeft - i + e(s).outerWidth() / 2 > -1 * n.swipeLeft)
                return t = s,
                !1
        }
        )),
        Math.abs(e(t).attr("data-slick-index") - n.currentSlide) || 1) : n.options.slidesToScroll
    }
    ,
    i.prototype.goTo = i.prototype.slickGoTo = function(e, t) {
        this.changeSlide({
            data: {
                message: "index",
                index: parseInt(e)
            }
        }, t)
    }
    ,
    i.prototype.init = function(t) {
        var i = this;
        e(i.$slider).hasClass("slick-initialized") || (e(i.$slider).addClass("slick-initialized"),
        i.buildRows(),
        i.buildOut(),
        i.setProps(),
        i.startLoad(),
        i.loadSlider(),
        i.initializeEvents(),
        i.updateArrows(),
        i.updateDots(),
        i.checkResponsive(!0),
        i.focusHandler()),
        t && i.$slider.trigger("init", [i]),
        !0 === i.options.accessibility && i.initADA(),
        i.options.autoplay && (i.paused = !1,
        i.autoPlay())
    }
    ,
    i.prototype.initADA = function() {
        var t = this;
        t.$slides.add(t.$slideTrack.find(".slick-cloned")).attr({
            "aria-hidden": "true",
            tabindex: "-1"
        }).find("a, input, button, select").attr({
            tabindex: "-1"
        }),
        t.$slideTrack.attr("role", "listbox"),
        t.$slides.not(t.$slideTrack.find(".slick-cloned")).each((function(i) {
            e(this).attr({
                role: "option",
                "aria-describedby": "slick-slide" + t.instanceUid + i
            })
        }
        )),
        null !== t.$dots && t.$dots.attr("role", "tablist").find("li").each((function(i) {
            e(this).attr({
                role: "presentation",
                "aria-selected": "false",
                "aria-controls": "navigation" + t.instanceUid + i,
                id: "slick-slide" + t.instanceUid + i
            })
        }
        )).first().attr("aria-selected", "true").end().find("button").attr("role", "button").end().closest("div").attr("role", "toolbar"),
        t.activateADA()
    }
    ,
    i.prototype.initArrowEvents = function() {
        var e = this;
        !0 === e.options.arrows && e.slideCount > e.options.slidesToShow && (e.$prevArrow.off("click.slick").on("click.slick", {
            message: "previous"
        }, e.changeSlide),
        e.$nextArrow.off("click.slick").on("click.slick", {
            message: "next"
        }, e.changeSlide))
    }
    ,
    i.prototype.initDotEvents = function() {
        var t = this;
        !0 === t.options.dots && t.slideCount > t.options.slidesToShow && e("li", t.$dots).on("click.slick", {
            message: "index"
        }, t.changeSlide),
        !0 === t.options.dots && !0 === t.options.pauseOnDotsHover && e("li", t.$dots).on("mouseenter.slick", e.proxy(t.interrupt, t, !0)).on("mouseleave.slick", e.proxy(t.interrupt, t, !1))
    }
    ,
    i.prototype.initSlideEvents = function() {
        var t = this;
        t.options.pauseOnHover && (t.$list.on("mouseenter.slick", e.proxy(t.interrupt, t, !0)),
        t.$list.on("mouseleave.slick", e.proxy(t.interrupt, t, !1)))
    }
    ,
    i.prototype.initializeEvents = function() {
        var t = this;
        t.initArrowEvents(),
        t.initDotEvents(),
        t.initSlideEvents(),
        t.$list.on("touchstart.slick mousedown.slick", {
            action: "start"
        }, t.swipeHandler),
        t.$list.on("touchmove.slick mousemove.slick", {
            action: "move"
        }, t.swipeHandler),
        t.$list.on("touchend.slick mouseup.slick", {
            action: "end"
        }, t.swipeHandler),
        t.$list.on("touchcancel.slick mouseleave.slick", {
            action: "end"
        }, t.swipeHandler),
        t.$list.on("click.slick", t.clickHandler),
        e(document).on(t.visibilityChange, e.proxy(t.visibility, t)),
        !0 === t.options.accessibility && t.$list.on("keydown.slick", t.keyHandler),
        !0 === t.options.focusOnSelect && e(t.$slideTrack).children().on("click.slick", t.selectHandler),
        e(window).on("orientationchange.slick.slick-" + t.instanceUid, e.proxy(t.orientationChange, t)),
        e(window).on("resize.slick.slick-" + t.instanceUid, e.proxy(t.resize, t)),
        e("[draggable!=true]", t.$slideTrack).on("dragstart", t.preventDefault),
        e(window).on("load.slick.slick-" + t.instanceUid, t.setPosition),
        e(document).on("ready.slick.slick-" + t.instanceUid, t.setPosition)
    }
    ,
    i.prototype.initUI = function() {
        var e = this;
        !0 === e.options.arrows && e.slideCount > e.options.slidesToShow && (e.$prevArrow.show(),
        e.$nextArrow.show()),
        !0 === e.options.dots && e.slideCount > e.options.slidesToShow && e.$dots.show()
    }
    ,
    i.prototype.keyHandler = function(e) {
        var t = this;
        e.target.tagName.match("TEXTAREA|INPUT|SELECT") || (37 === e.keyCode && !0 === t.options.accessibility ? t.changeSlide({
            data: {
                message: !0 === t.options.rtl ? "next" : "previous"
            }
        }) : 39 === e.keyCode && !0 === t.options.accessibility && t.changeSlide({
            data: {
                message: !0 === t.options.rtl ? "previous" : "next"
            }
        }))
    }
    ,
    i.prototype.lazyLoad = function() {
        var t, i, n = this;
        function o(t) {
            e("img[data-lazy]", t).each((function() {
                var t = e(this)
                  , i = e(this).attr("data-lazy")
                  , o = document.createElement("img");
                o.onload = function() {
                    t.animate({
                        opacity: 0
                    }, 100, (function() {
                        t.attr("src", i).animate({
                            opacity: 1
                        }, 200, (function() {
                            t.removeAttr("data-lazy").removeClass("slick-loading")
                        }
                        )),
                        n.$slider.trigger("lazyLoaded", [n, t, i])
                    }
                    ))
                }
                ,
                o.onerror = function() {
                    t.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"),
                    n.$slider.trigger("lazyLoadError", [n, t, i])
                }
                ,
                o.src = i
            }
            ))
        }
        !0 === n.options.centerMode ? !0 === n.options.infinite ? i = (t = n.currentSlide + (n.options.slidesToShow / 2 + 1)) + n.options.slidesToShow + 2 : (t = Math.max(0, n.currentSlide - (n.options.slidesToShow / 2 + 1)),
        i = n.options.slidesToShow / 2 + 1 + 2 + n.currentSlide) : (t = n.options.infinite ? n.options.slidesToShow + n.currentSlide : n.currentSlide,
        i = Math.ceil(t + n.options.slidesToShow),
        !0 === n.options.fade && (t > 0 && t--,
        i <= n.slideCount && i++)),
        o(n.$slider.find(".slick-slide").slice(t, i)),
        n.slideCount <= n.options.slidesToShow ? o(n.$slider.find(".slick-slide")) : n.currentSlide >= n.slideCount - n.options.slidesToShow ? o(n.$slider.find(".slick-cloned").slice(0, n.options.slidesToShow)) : 0 === n.currentSlide && o(n.$slider.find(".slick-cloned").slice(-1 * n.options.slidesToShow))
    }
    ,
    i.prototype.loadSlider = function() {
        var e = this;
        e.setPosition(),
        e.$slideTrack.css({
            opacity: 1
        }),
        e.$slider.removeClass("slick-loading"),
        e.initUI(),
        "progressive" === e.options.lazyLoad && e.progressiveLazyLoad()
    }
    ,
    i.prototype.next = i.prototype.slickNext = function() {
        this.changeSlide({
            data: {
                message: "next"
            }
        })
    }
    ,
    i.prototype.orientationChange = function() {
        this.checkResponsive(),
        this.setPosition()
    }
    ,
    i.prototype.pause = i.prototype.slickPause = function() {
        this.autoPlayClear(),
        this.paused = !0
    }
    ,
    i.prototype.play = i.prototype.slickPlay = function() {
        var e = this;
        e.autoPlay(),
        e.options.autoplay = !0,
        e.paused = !1,
        e.focussed = !1,
        e.interrupted = !1
    }
    ,
    i.prototype.postSlide = function(e) {
        var t = this;
        t.unslicked || (t.$slider.trigger("afterChange", [t, e]),
        t.animating = !1,
        t.setPosition(),
        t.swipeLeft = null,
        t.options.autoplay && t.autoPlay(),
        !0 === t.options.accessibility && t.initADA())
    }
    ,
    i.prototype.prev = i.prototype.slickPrev = function() {
        this.changeSlide({
            data: {
                message: "previous"
            }
        })
    }
    ,
    i.prototype.preventDefault = function(e) {
        e.preventDefault()
    }
    ,
    i.prototype.progressiveLazyLoad = function(t) {
        t = t || 1;
        var i, n, o, s = this, r = e("img[data-lazy]", s.$slider);
        r.length ? (i = r.first(),
        n = i.attr("data-lazy"),
        (o = document.createElement("img")).onload = function() {
            i.attr("src", n).removeAttr("data-lazy").removeClass("slick-loading"),
            !0 === s.options.adaptiveHeight && s.setPosition(),
            s.$slider.trigger("lazyLoaded", [s, i, n]),
            s.progressiveLazyLoad()
        }
        ,
        o.onerror = function() {
            t < 3 ? setTimeout((function() {
                s.progressiveLazyLoad(t + 1)
            }
            ), 500) : (i.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"),
            s.$slider.trigger("lazyLoadError", [s, i, n]),
            s.progressiveLazyLoad())
        }
        ,
        o.src = n) : s.$slider.trigger("allImagesLoaded", [s])
    }
    ,
    i.prototype.refresh = function(t) {
        var i, n, o = this;
        n = o.slideCount - o.options.slidesToShow,
        !o.options.infinite && o.currentSlide > n && (o.currentSlide = n),
        o.slideCount <= o.options.slidesToShow && (o.currentSlide = 0),
        i = o.currentSlide,
        o.destroy(!0),
        e.extend(o, o.initials, {
            currentSlide: i
        }),
        o.init(),
        t || o.changeSlide({
            data: {
                message: "index",
                index: i
            }
        }, !1)
    }
    ,
    i.prototype.registerBreakpoints = function() {
        var t, i, n, o = this, s = o.options.responsive || null;
        if ("array" === e.type(s) && s.length) {
            for (t in o.respondTo = o.options.respondTo || "window",
            s)
                if (n = o.breakpoints.length - 1,
                i = s[t].breakpoint,
                s.hasOwnProperty(t)) {
                    for (; n >= 0; )
                        o.breakpoints[n] && o.breakpoints[n] === i && o.breakpoints.splice(n, 1),
                        n--;
                    o.breakpoints.push(i),
                    o.breakpointSettings[i] = s[t].settings
                }
            o.breakpoints.sort((function(e, t) {
                return o.options.mobileFirst ? e - t : t - e
            }
            ))
        }
    }
    ,
    i.prototype.reinit = function() {
        var t = this;
        t.$slides = t.$slideTrack.children(t.options.slide).addClass("slick-slide"),
        t.slideCount = t.$slides.length,
        t.currentSlide >= t.slideCount && 0 !== t.currentSlide && (t.currentSlide = t.currentSlide - t.options.slidesToScroll),
        t.slideCount <= t.options.slidesToShow && (t.currentSlide = 0),
        t.registerBreakpoints(),
        t.setProps(),
        t.setupInfinite(),
        t.buildArrows(),
        t.updateArrows(),
        t.initArrowEvents(),
        t.buildDots(),
        t.updateDots(),
        t.initDotEvents(),
        t.cleanUpSlideEvents(),
        t.initSlideEvents(),
        t.checkResponsive(!1, !0),
        !0 === t.options.focusOnSelect && e(t.$slideTrack).children().on("click.slick", t.selectHandler),
        t.setSlideClasses("number" == typeof t.currentSlide ? t.currentSlide : 0),
        t.setPosition(),
        t.focusHandler(),
        t.paused = !t.options.autoplay,
        t.autoPlay(),
        t.$slider.trigger("reInit", [t])
    }
    ,
    i.prototype.resize = function() {
        var t = this;
        e(window).width() !== t.windowWidth && (clearTimeout(t.windowDelay),
        t.windowDelay = window.setTimeout((function() {
            t.windowWidth = e(window).width(),
            t.checkResponsive(),
            t.unslicked || t.setPosition()
        }
        ), 50))
    }
    ,
    i.prototype.removeSlide = i.prototype.slickRemove = function(e, t, i) {
        var n = this;
        if (e = "boolean" == typeof e ? !0 === (t = e) ? 0 : n.slideCount - 1 : !0 === t ? --e : e,
        n.slideCount < 1 || e < 0 || e > n.slideCount - 1)
            return !1;
        n.unload(),
        !0 === i ? n.$slideTrack.children().remove() : n.$slideTrack.children(this.options.slide).eq(e).remove(),
        n.$slides = n.$slideTrack.children(this.options.slide),
        n.$slideTrack.children(this.options.slide).detach(),
        n.$slideTrack.append(n.$slides),
        n.$slidesCache = n.$slides,
        n.reinit()
    }
    ,
    i.prototype.setCSS = function(e) {
        var t, i, n = this, o = {};
        !0 === n.options.rtl && (e = -e),
        t = "left" == n.positionProp ? Math.ceil(e) + "px" : "0px",
        i = "top" == n.positionProp ? Math.ceil(e) + "px" : "0px",
        o[n.positionProp] = e,
        !1 === n.transformsEnabled ? n.$slideTrack.css(o) : (o = {},
        !1 === n.cssTransitions ? (o[n.animType] = "translate(" + t + ", " + i + ")",
        n.$slideTrack.css(o)) : (o[n.animType] = "translate3d(" + t + ", " + i + ", 0px)",
        n.$slideTrack.css(o)))
    }
    ,
    i.prototype.setDimensions = function() {
        var e = this;
        !1 === e.options.vertical ? !0 === e.options.centerMode && e.$list.css({
            padding: "0px " + e.options.centerPadding
        }) : (e.$list.height(e.$slides.first().outerHeight(!0) * e.options.slidesToShow),
        !0 === e.options.centerMode && e.$list.css({
            padding: e.options.centerPadding + " 0px"
        })),
        e.listWidth = e.$list.width(),
        e.listHeight = e.$list.height(),
        !1 === e.options.vertical && !1 === e.options.variableWidth ? (e.slideWidth = Math.ceil(e.listWidth / e.options.slidesToShow),
        e.$slideTrack.width(Math.ceil(e.slideWidth * e.$slideTrack.children(".slick-slide").length))) : !0 === e.options.variableWidth ? e.$slideTrack.width(5e3 * e.slideCount) : (e.slideWidth = Math.ceil(e.listWidth),
        e.$slideTrack.height(Math.ceil(e.$slides.first().outerHeight(!0) * e.$slideTrack.children(".slick-slide").length)));
        var t = e.$slides.first().outerWidth(!0) - e.$slides.first().width();
        !1 === e.options.variableWidth && e.$slideTrack.children(".slick-slide").width(e.slideWidth - t)
    }
    ,
    i.prototype.setFade = function() {
        var t, i = this;
        i.$slides.each((function(n, o) {
            t = i.slideWidth * n * -1,
            !0 === i.options.rtl ? e(o).css({
                position: "relative",
                right: t,
                top: 0,
                zIndex: i.options.zIndex - 2,
                opacity: 0
            }) : e(o).css({
                position: "relative",
                left: t,
                top: 0,
                zIndex: i.options.zIndex - 2,
                opacity: 0
            })
        }
        )),
        i.$slides.eq(i.currentSlide).css({
            zIndex: i.options.zIndex - 1,
            opacity: 1
        })
    }
    ,
    i.prototype.setHeight = function() {
        var e = this;
        if (1 === e.options.slidesToShow && !0 === e.options.adaptiveHeight && !1 === e.options.vertical) {
            var t = e.$slides.eq(e.currentSlide).outerHeight(!0);
            e.$list.css("height", t)
        }
    }
    ,
    i.prototype.setOption = i.prototype.slickSetOption = function() {
        var t, i, n, o, s, r = this, a = !1;
        if ("object" === e.type(arguments[0]) ? (n = arguments[0],
        a = arguments[1],
        s = "multiple") : "string" === e.type(arguments[0]) && (n = arguments[0],
        o = arguments[1],
        a = arguments[2],
        "responsive" === arguments[0] && "array" === e.type(arguments[1]) ? s = "responsive" : void 0 !== arguments[1] && (s = "single")),
        "single" === s)
            r.options[n] = o;
        else if ("multiple" === s)
            e.each(n, (function(e, t) {
                r.options[e] = t
            }
            ));
        else if ("responsive" === s)
            for (i in o)
                if ("array" !== e.type(r.options.responsive))
                    r.options.responsive = [o[i]];
                else {
                    for (t = r.options.responsive.length - 1; t >= 0; )
                        r.options.responsive[t].breakpoint === o[i].breakpoint && r.options.responsive.splice(t, 1),
                        t--;
                    r.options.responsive.push(o[i])
                }
        a && (r.unload(),
        r.reinit())
    }
    ,
    i.prototype.setPosition = function() {
        var e = this;
        e.setDimensions(),
        e.setHeight(),
        !1 === e.options.fade ? e.setCSS(e.getLeft(e.currentSlide)) : e.setFade(),
        e.$slider.trigger("setPosition", [e])
    }
    ,
    i.prototype.setProps = function() {
        var e = this
          , t = document.body.style;
        e.positionProp = !0 === e.options.vertical ? "top" : "left",
        "top" === e.positionProp ? e.$slider.addClass("slick-vertical") : e.$slider.removeClass("slick-vertical"),
        void 0 === t.WebkitTransition && void 0 === t.MozTransition && void 0 === t.msTransition || !0 === e.options.useCSS && (e.cssTransitions = !0),
        e.options.fade && ("number" == typeof e.options.zIndex ? e.options.zIndex < 3 && (e.options.zIndex = 3) : e.options.zIndex = e.defaults.zIndex),
        void 0 !== t.OTransform && (e.animType = "OTransform",
        e.transformType = "-o-transform",
        e.transitionType = "OTransition",
        void 0 === t.perspectiveProperty && void 0 === t.webkitPerspective && (e.animType = !1)),
        void 0 !== t.MozTransform && (e.animType = "MozTransform",
        e.transformType = "-moz-transform",
        e.transitionType = "MozTransition",
        void 0 === t.perspectiveProperty && void 0 === t.MozPerspective && (e.animType = !1)),
        void 0 !== t.webkitTransform && (e.animType = "webkitTransform",
        e.transformType = "-webkit-transform",
        e.transitionType = "webkitTransition",
        void 0 === t.perspectiveProperty && void 0 === t.webkitPerspective && (e.animType = !1)),
        void 0 !== t.msTransform && (e.animType = "msTransform",
        e.transformType = "-ms-transform",
        e.transitionType = "msTransition",
        void 0 === t.msTransform && (e.animType = !1)),
        void 0 !== t.transform && !1 !== e.animType && (e.animType = "transform",
        e.transformType = "transform",
        e.transitionType = "transition"),
        e.transformsEnabled = e.options.useTransform && null !== e.animType && !1 !== e.animType
    }
    ,
    i.prototype.setSlideClasses = function(e) {
        var t, i, n, o, s = this;
        i = s.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden", "true"),
        s.$slides.eq(e).addClass("slick-current"),
        !0 === s.options.centerMode ? (t = Math.floor(s.options.slidesToShow / 2),
        !0 === s.options.infinite && (e >= t && e <= s.slideCount - 1 - t ? s.$slides.slice(e - t, e + t + 1).addClass("slick-active").attr("aria-hidden", "false") : (n = s.options.slidesToShow + e,
        i.slice(n - t + 1, n + t + 2).addClass("slick-active").attr("aria-hidden", "false")),
        0 === e ? i.eq(i.length - 1 - s.options.slidesToShow).addClass("slick-center") : e === s.slideCount - 1 && i.eq(s.options.slidesToShow).addClass("slick-center")),
        s.$slides.eq(e).addClass("slick-center")) : e >= 0 && e <= s.slideCount - s.options.slidesToShow ? s.$slides.slice(e, e + s.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false") : i.length <= s.options.slidesToShow ? i.addClass("slick-active").attr("aria-hidden", "false") : (o = s.slideCount % s.options.slidesToShow,
        n = !0 === s.options.infinite ? s.options.slidesToShow + e : e,
        s.options.slidesToShow == s.options.slidesToScroll && s.slideCount - e < s.options.slidesToShow ? i.slice(n - (s.options.slidesToShow - o), n + o).addClass("slick-active").attr("aria-hidden", "false") : i.slice(n, n + s.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false")),
        "ondemand" === s.options.lazyLoad && s.lazyLoad()
    }
    ,
    i.prototype.setupInfinite = function() {
        var t, i, n, o = this;
        if (!0 === o.options.fade && (o.options.centerMode = !1),
        !0 === o.options.infinite && !1 === o.options.fade && (i = null,
        o.slideCount > o.options.slidesToShow)) {
            for (n = !0 === o.options.centerMode ? o.options.slidesToShow + 1 : o.options.slidesToShow,
            t = o.slideCount; t > o.slideCount - n; t -= 1)
                i = t - 1,
                e(o.$slides[i]).clone(!0).attr("id", "").attr("data-slick-index", i - o.slideCount).prependTo(o.$slideTrack).addClass("slick-cloned");
            for (t = 0; t < n; t += 1)
                i = t,
                e(o.$slides[i]).clone(!0).attr("id", "").attr("data-slick-index", i + o.slideCount).appendTo(o.$slideTrack).addClass("slick-cloned");
            o.$slideTrack.find(".slick-cloned").find("[id]").each((function() {
                e(this).attr("id", "")
            }
            ))
        }
    }
    ,
    i.prototype.interrupt = function(e) {
        e || this.autoPlay(),
        this.interrupted = e
    }
    ,
    i.prototype.selectHandler = function(t) {
        var i = this
          , n = e(t.target).is(".slick-slide") ? e(t.target) : e(t.target).parents(".slick-slide")
          , o = parseInt(n.attr("data-slick-index"));
        if (o || (o = 0),
        i.slideCount <= i.options.slidesToShow)
            return i.setSlideClasses(o),
            void i.asNavFor(o);
        i.slideHandler(o)
    }
    ,
    i.prototype.slideHandler = function(e, t, i) {
        var n, o, s, r, a, l, c = this;
        if (t = t || !1,
        (!0 !== c.animating || !0 !== c.options.waitForAnimate) && !(!0 === c.options.fade && c.currentSlide === e || c.slideCount <= c.options.slidesToShow))
            if (!1 === t && c.asNavFor(e),
            n = e,
            a = c.getLeft(n),
            r = c.getLeft(c.currentSlide),
            c.currentLeft = null === c.swipeLeft ? r : c.swipeLeft,
            !1 === c.options.infinite && !1 === c.options.centerMode && (e < 0 || e > c.getDotCount() * c.options.slidesToScroll))
                !1 === c.options.fade && (n = c.currentSlide,
                !0 !== i ? c.animateSlide(r, (function() {
                    c.postSlide(n)
                }
                )) : c.postSlide(n));
            else if (!1 === c.options.infinite && !0 === c.options.centerMode && (e < 0 || e > c.slideCount - c.options.slidesToScroll))
                !1 === c.options.fade && (n = c.currentSlide,
                !0 !== i ? c.animateSlide(r, (function() {
                    c.postSlide(n)
                }
                )) : c.postSlide(n));
            else {
                if (c.options.autoplay && clearInterval(c.autoPlayTimer),
                o = n < 0 ? c.slideCount % c.options.slidesToScroll != 0 ? c.slideCount - c.slideCount % c.options.slidesToScroll : c.slideCount + n : n >= c.slideCount ? c.slideCount % c.options.slidesToScroll != 0 ? 0 : n - c.slideCount : n,
                c.animating = !0,
                c.$slider.trigger("beforeChange", [c, c.currentSlide, o]),
                s = c.currentSlide,
                c.currentSlide = o,
                c.setSlideClasses(c.currentSlide),
                c.options.asNavFor && (l = (l = c.getNavTarget()).slick("getSlick")).slideCount <= l.options.slidesToShow && l.setSlideClasses(c.currentSlide),
                c.updateDots(),
                c.updateArrows(),
                !0 === c.options.fade)
                    return !0 !== i ? (c.fadeSlideOut(s),
                    c.fadeSlide(o, (function() {
                        c.postSlide(o)
                    }
                    ))) : c.postSlide(o),
                    void c.animateHeight();
                !0 !== i ? c.animateSlide(a, (function() {
                    c.postSlide(o)
                }
                )) : c.postSlide(o)
            }
    }
    ,
    i.prototype.startLoad = function() {
        var e = this;
        !0 === e.options.arrows && e.slideCount > e.options.slidesToShow && (e.$prevArrow.hide(),
        e.$nextArrow.hide()),
        !0 === e.options.dots && e.slideCount > e.options.slidesToShow && e.$dots.hide(),
        e.$slider.addClass("slick-loading")
    }
    ,
    i.prototype.swipeDirection = function() {
        var e, t, i, n, o = this;
        return e = o.touchObject.startX - o.touchObject.curX,
        t = o.touchObject.startY - o.touchObject.curY,
        i = Math.atan2(t, e),
        (n = Math.round(180 * i / Math.PI)) < 0 && (n = 360 - Math.abs(n)),
        n <= 45 && n >= 0 || n <= 360 && n >= 315 ? !1 === o.options.rtl ? "left" : "right" : n >= 135 && n <= 225 ? !1 === o.options.rtl ? "right" : "left" : !0 === o.options.verticalSwiping ? n >= 35 && n <= 135 ? "down" : "up" : "vertical"
    }
    ,
    i.prototype.swipeEnd = function(e) {
        var t, i, n = this;
        if (n.dragging = !1,
        n.interrupted = !1,
        n.shouldClick = !(n.touchObject.swipeLength > 10),
        void 0 === n.touchObject.curX)
            return !1;
        if (!0 === n.touchObject.edgeHit && n.$slider.trigger("edge", [n, n.swipeDirection()]),
        n.touchObject.swipeLength >= n.touchObject.minSwipe) {
            switch (i = n.swipeDirection()) {
            case "left":
            case "down":
                t = n.options.swipeToSlide ? n.checkNavigable(n.currentSlide + n.getSlideCount()) : n.currentSlide + n.getSlideCount(),
                n.currentDirection = 0;
                break;
            case "right":
            case "up":
                t = n.options.swipeToSlide ? n.checkNavigable(n.currentSlide - n.getSlideCount()) : n.currentSlide - n.getSlideCount(),
                n.currentDirection = 1
            }
            "vertical" != i && (n.slideHandler(t),
            n.touchObject = {},
            n.$slider.trigger("swipe", [n, i]))
        } else
            n.touchObject.startX !== n.touchObject.curX && (n.slideHandler(n.currentSlide),
            n.touchObject = {})
    }
    ,
    i.prototype.swipeHandler = function(e) {
        var t = this;
        if (!(!1 === t.options.swipe || "ontouchend"in document && !1 === t.options.swipe || !1 === t.options.draggable && -1 !== e.type.indexOf("mouse")))
            switch (t.touchObject.fingerCount = e.originalEvent && void 0 !== e.originalEvent.touches ? e.originalEvent.touches.length : 1,
            t.touchObject.minSwipe = t.listWidth / t.options.touchThreshold,
            !0 === t.options.verticalSwiping && (t.touchObject.minSwipe = t.listHeight / t.options.touchThreshold),
            e.data.action) {
            case "start":
                t.swipeStart(e);
                break;
            case "move":
                t.swipeMove(e);
                break;
            case "end":
                t.swipeEnd(e)
            }
    }
    ,
    i.prototype.swipeMove = function(e) {
        var t, i, n, o, s, r = this;
        return s = void 0 !== e.originalEvent ? e.originalEvent.touches : null,
        !(!r.dragging || s && 1 !== s.length) && (t = r.getLeft(r.currentSlide),
        r.touchObject.curX = void 0 !== s ? s[0].pageX : e.clientX,
        r.touchObject.curY = void 0 !== s ? s[0].pageY : e.clientY,
        r.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(r.touchObject.curX - r.touchObject.startX, 2))),
        !0 === r.options.verticalSwiping && (r.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(r.touchObject.curY - r.touchObject.startY, 2)))),
        "vertical" !== (i = r.swipeDirection()) ? (void 0 !== e.originalEvent && r.touchObject.swipeLength > 4 && e.preventDefault(),
        o = (!1 === r.options.rtl ? 1 : -1) * (r.touchObject.curX > r.touchObject.startX ? 1 : -1),
        !0 === r.options.verticalSwiping && (o = r.touchObject.curY > r.touchObject.startY ? 1 : -1),
        n = r.touchObject.swipeLength,
        r.touchObject.edgeHit = !1,
        !1 === r.options.infinite && (0 === r.currentSlide && "right" === i || r.currentSlide >= r.getDotCount() && "left" === i) && (n = r.touchObject.swipeLength * r.options.edgeFriction,
        r.touchObject.edgeHit = !0),
        !1 === r.options.vertical ? r.swipeLeft = t + n * o : r.swipeLeft = t + n * (r.$list.height() / r.listWidth) * o,
        !0 === r.options.verticalSwiping && (r.swipeLeft = t + n * o),
        !0 !== r.options.fade && !1 !== r.options.touchMove && (!0 === r.animating ? (r.swipeLeft = null,
        !1) : void r.setCSS(r.swipeLeft))) : void 0)
    }
    ,
    i.prototype.swipeStart = function(e) {
        var t, i = this;
        if (i.interrupted = !0,
        1 !== i.touchObject.fingerCount || i.slideCount <= i.options.slidesToShow)
            return i.touchObject = {},
            !1;
        void 0 !== e.originalEvent && void 0 !== e.originalEvent.touches && (t = e.originalEvent.touches[0]),
        i.touchObject.startX = i.touchObject.curX = void 0 !== t ? t.pageX : e.clientX,
        i.touchObject.startY = i.touchObject.curY = void 0 !== t ? t.pageY : e.clientY,
        i.dragging = !0
    }
    ,
    i.prototype.unfilterSlides = i.prototype.slickUnfilter = function() {
        var e = this;
        null !== e.$slidesCache && (e.unload(),
        e.$slideTrack.children(this.options.slide).detach(),
        e.$slidesCache.appendTo(e.$slideTrack),
        e.reinit())
    }
    ,
    i.prototype.unload = function() {
        var t = this;
        e(".slick-cloned", t.$slider).remove(),
        t.$dots && t.$dots.remove(),
        t.$prevArrow && t.htmlExpr.test(t.options.prevArrow) && t.$prevArrow.remove(),
        t.$nextArrow && t.htmlExpr.test(t.options.nextArrow) && t.$nextArrow.remove(),
        t.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden", "true").css("width", "")
    }
    ,
    i.prototype.unslick = function(e) {
        var t = this;
        t.$slider.trigger("unslick", [t, e]),
        t.destroy()
    }
    ,
    i.prototype.updateArrows = function() {
        var e = this;
        Math.floor(e.options.slidesToShow / 2),
        !0 === e.options.arrows && e.slideCount > e.options.slidesToShow && !e.options.infinite && (e.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false"),
        e.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false"),
        0 === e.currentSlide ? (e.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true"),
        e.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : (e.currentSlide >= e.slideCount - e.options.slidesToShow && !1 === e.options.centerMode || e.currentSlide >= e.slideCount - 1 && !0 === e.options.centerMode) && (e.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"),
        e.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")))
    }
    ,
    i.prototype.updateDots = function() {
        var e = this;
        null !== e.$dots && (e.$dots.find("li").removeClass("slick-active").attr("aria-hidden", "true"),
        e.$dots.find("li").eq(Math.floor(e.currentSlide / e.options.slidesToScroll)).addClass("slick-active").attr("aria-hidden", "false"))
    }
    ,
    i.prototype.visibility = function() {
        var e = this;
        e.options.autoplay && (document[e.hidden] ? e.interrupted = !0 : e.interrupted = !1)
    }
    ,
    e.fn.slick = function() {
        var e, t, n = this, o = arguments[0], s = Array.prototype.slice.call(arguments, 1), r = n.length;
        for (e = 0; e < r; e++)
            if ("object" == typeof o || void 0 === o ? n[e].slick = new i(n[e],o) : t = n[e].slick[o].apply(n[e].slick, s),
            void 0 !== t)
                return t;
        return n
    }
}
)),
/*! WOW - v1.1.2 - 2015-04-07
* Copyright (c) 2015 Matthieu Aussaguel; Licensed MIT */
function() {
    var e, t, i, n, o, s = function(e, t) {
        return function() {
            return e.apply(t, arguments)
        }
    }, r = [].indexOf || function(e) {
        for (var t = 0, i = this.length; i > t; t++)
            if (t in this && this[t] === e)
                return t;
        return -1
    }
    ;
    t = function() {
        function e() {}
        return e.prototype.extend = function(e, t) {
            var i, n;
            for (i in t)
                n = t[i],
                null == e[i] && (e[i] = n);
            return e
        }
        ,
        e.prototype.isMobile = function(e) {
            return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(e)
        }
        ,
        e.prototype.createEvent = function(e, t, i, n) {
            var o;
            return null == t && (t = !1),
            null == i && (i = !1),
            null == n && (n = null),
            null != document.createEvent ? (o = document.createEvent("CustomEvent")).initCustomEvent(e, t, i, n) : null != document.createEventObject ? (o = document.createEventObject()).eventType = e : o.eventName = e,
            o
        }
        ,
        e.prototype.emitEvent = function(e, t) {
            return null != e.dispatchEvent ? e.dispatchEvent(t) : t in (null != e) ? e[t]() : "on" + t in (null != e) ? e["on" + t]() : void 0
        }
        ,
        e.prototype.addEvent = function(e, t, i) {
            return null != e.addEventListener ? e.addEventListener(t, i, !1) : null != e.attachEvent ? e.attachEvent("on" + t, i) : e[t] = i
        }
        ,
        e.prototype.removeEvent = function(e, t, i) {
            return null != e.removeEventListener ? e.removeEventListener(t, i, !1) : null != e.detachEvent ? e.detachEvent("on" + t, i) : delete e[t]
        }
        ,
        e.prototype.innerHeight = function() {
            return "innerHeight"in window ? window.innerHeight : document.documentElement.clientHeight
        }
        ,
        e
    }(),
    i = this.WeakMap || this.MozWeakMap || (i = function() {
        function e() {
            this.keys = [],
            this.values = []
        }
        return e.prototype.get = function(e) {
            var t, i, n, o;
            for (t = i = 0,
            n = (o = this.keys).length; n > i; t = ++i)
                if (o[t] === e)
                    return this.values[t]
        }
        ,
        e.prototype.set = function(e, t) {
            var i, n, o, s;
            for (i = n = 0,
            o = (s = this.keys).length; o > n; i = ++n)
                if (s[i] === e)
                    return void (this.values[i] = t);
            return this.keys.push(e),
            this.values.push(t)
        }
        ,
        e
    }()),
    e = this.MutationObserver || this.WebkitMutationObserver || this.MozMutationObserver || (e = function() {
        function e() {
            "undefined" != typeof console && null !== console && console.warn("MutationObserver is not supported by your browser."),
            "undefined" != typeof console && null !== console && console.warn("WOW.js cannot detect dom mutations, please call .sync() after loading new content.")
        }
        return e.notSupported = !0,
        e.prototype.observe = function() {}
        ,
        e
    }()),
    n = this.getComputedStyle || function(e) {
        return this.getPropertyValue = function(t) {
            var i;
            return "float" === t && (t = "styleFloat"),
            o.test(t) && t.replace(o, (function(e, t) {
                return t.toUpperCase()
            }
            )),
            (null != (i = e.currentStyle) ? i[t] : void 0) || null
        }
        ,
        this
    }
    ,
    o = /(\-([a-z]){1})/g,
    this.WOW = function() {
        function o(e) {
            null == e && (e = {}),
            this.scrollCallback = s(this.scrollCallback, this),
            this.scrollHandler = s(this.scrollHandler, this),
            this.resetAnimation = s(this.resetAnimation, this),
            this.start = s(this.start, this),
            this.scrolled = !0,
            this.config = this.util().extend(e, this.defaults),
            this.animationNameCache = new i,
            this.wowEvent = this.util().createEvent(this.config.boxClass)
        }
        return o.prototype.defaults = {
            boxClass: "wow",
            animateClass: "animated",
            offset: 0,
            mobile: !0,
            live: !0,
            callback: null
        },
        o.prototype.init = function() {
            var e;
            return this.element = window.document.documentElement,
            "interactive" === (e = document.readyState) || "complete" === e ? this.start() : this.util().addEvent(document, "DOMContentLoaded", this.start),
            this.finished = []
        }
        ,
        o.prototype.start = function() {
            var t, i, n, o;
            if (this.stopped = !1,
            this.boxes = function() {
                var e, i, n, o;
                for (o = [],
                e = 0,
                i = (n = this.element.querySelectorAll("." + this.config.boxClass)).length; i > e; e++)
                    t = n[e],
                    o.push(t);
                return o
            }
            .call(this),
            this.all = function() {
                var e, i, n, o;
                for (o = [],
                e = 0,
                i = (n = this.boxes).length; i > e; e++)
                    t = n[e],
                    o.push(t);
                return o
            }
            .call(this),
            this.boxes.length)
                if (this.disabled())
                    this.resetStyle();
                else
                    for (i = 0,
                    n = (o = this.boxes).length; n > i; i++)
                        t = o[i],
                        this.applyStyle(t, !0);
            return this.disabled() || (this.util().addEvent(window, "scroll", this.scrollHandler),
            this.util().addEvent(window, "resize", this.scrollHandler),
            this.interval = setInterval(this.scrollCallback, 50)),
            this.config.live ? new e(function(e) {
                return function(t) {
                    var i, n, o, s, r;
                    for (r = [],
                    i = 0,
                    n = t.length; n > i; i++)
                        s = t[i],
                        r.push(function() {
                            var e, t, i, n;
                            for (n = [],
                            e = 0,
                            t = (i = s.addedNodes || []).length; t > e; e++)
                                o = i[e],
                                n.push(this.doSync(o));
                            return n
                        }
                        .call(e));
                    return r
                }
            }(this)).observe(document.body, {
                childList: !0,
                subtree: !0
            }) : void 0
        }
        ,
        o.prototype.stop = function() {
            return this.stopped = !0,
            this.util().removeEvent(window, "scroll", this.scrollHandler),
            this.util().removeEvent(window, "resize", this.scrollHandler),
            null != this.interval ? clearInterval(this.interval) : void 0
        }
        ,
        o.prototype.sync = function() {
            return e.notSupported ? this.doSync(this.element) : void 0
        }
        ,
        o.prototype.doSync = function(e) {
            var t, i, n, o, s;
            if (null == e && (e = this.element),
            1 === e.nodeType) {
                for (s = [],
                i = 0,
                n = (o = (e = e.parentNode || e).querySelectorAll("." + this.config.boxClass)).length; n > i; i++)
                    t = o[i],
                    r.call(this.all, t) < 0 ? (this.boxes.push(t),
                    this.all.push(t),
                    this.stopped || this.disabled() ? this.resetStyle() : this.applyStyle(t, !0),
                    s.push(this.scrolled = !0)) : s.push(void 0);
                return s
            }
        }
        ,
        o.prototype.show = function(e) {
            return this.applyStyle(e),
            e.className = e.className + " " + this.config.animateClass,
            null != this.config.callback && this.config.callback(e),
            this.util().emitEvent(e, this.wowEvent),
            this.util().addEvent(e, "animationend", this.resetAnimation),
            this.util().addEvent(e, "oanimationend", this.resetAnimation),
            this.util().addEvent(e, "webkitAnimationEnd", this.resetAnimation),
            this.util().addEvent(e, "MSAnimationEnd", this.resetAnimation),
            e
        }
        ,
        o.prototype.applyStyle = function(e, t) {
            var i, n, o;
            return n = e.getAttribute("data-wow-duration"),
            i = e.getAttribute("data-wow-delay"),
            o = e.getAttribute("data-wow-iteration"),
            this.animate(function(s) {
                return function() {
                    return s.customStyle(e, t, n, i, o)
                }
            }(this))
        }
        ,
        o.prototype.animate = "requestAnimationFrame"in window ? function(e) {
            return window.requestAnimationFrame(e)
        }
        : function(e) {
            return e()
        }
        ,
        o.prototype.resetStyle = function() {
            var e, t, i, n, o;
            for (o = [],
            t = 0,
            i = (n = this.boxes).length; i > t; t++)
                e = n[t],
                o.push(e.style.visibility = "visible");
            return o
        }
        ,
        o.prototype.resetAnimation = function(e) {
            var t;
            return e.type.toLowerCase().indexOf("animationend") >= 0 ? (t = e.target || e.srcElement).className = t.className.replace(this.config.animateClass, "").trim() : void 0
        }
        ,
        o.prototype.customStyle = function(e, t, i, n, o) {
            return t && this.cacheAnimationName(e),
            e.style.visibility = t ? "hidden" : "visible",
            i && this.vendorSet(e.style, {
                animationDuration: i
            }),
            n && this.vendorSet(e.style, {
                animationDelay: n
            }),
            o && this.vendorSet(e.style, {
                animationIterationCount: o
            }),
            this.vendorSet(e.style, {
                animationName: t ? "none" : this.cachedAnimationName(e)
            }),
            e
        }
        ,
        o.prototype.vendors = ["moz", "webkit"],
        o.prototype.vendorSet = function(e, t) {
            var i, n, o, s;
            for (i in n = [],
            t)
                o = t[i],
                e["" + i] = o,
                n.push(function() {
                    var t, n, r, a;
                    for (a = [],
                    t = 0,
                    n = (r = this.vendors).length; n > t; t++)
                        s = r[t],
                        a.push(e["" + s + i.charAt(0).toUpperCase() + i.substr(1)] = o);
                    return a
                }
                .call(this));
            return n
        }
        ,
        o.prototype.vendorCSS = function(e, t) {
            var i, o, s, r, a, l;
            for (r = (a = n(e)).getPropertyCSSValue(t),
            i = 0,
            o = (s = this.vendors).length; o > i; i++)
                l = s[i],
                r = r || a.getPropertyCSSValue("-" + l + "-" + t);
            return r
        }
        ,
        o.prototype.animationName = function(e) {
            var t;
            try {
                t = this.vendorCSS(e, "animation-name").cssText
            } catch (i) {
                t = n(e).getPropertyValue("animation-name")
            }
            return "none" === t ? "" : t
        }
        ,
        o.prototype.cacheAnimationName = function(e) {
            return this.animationNameCache.set(e, this.animationName(e))
        }
        ,
        o.prototype.cachedAnimationName = function(e) {
            return this.animationNameCache.get(e)
        }
        ,
        o.prototype.scrollHandler = function() {
            return this.scrolled = !0
        }
        ,
        o.prototype.scrollCallback = function() {
            var e;
            return !this.scrolled || (this.scrolled = !1,
            this.boxes = function() {
                var t, i, n, o;
                for (o = [],
                t = 0,
                i = (n = this.boxes).length; i > t; t++)
                    (e = n[t]) && (this.isVisible(e) ? this.show(e) : o.push(e));
                return o
            }
            .call(this),
            this.boxes.length || this.config.live) ? void 0 : this.stop()
        }
        ,
        o.prototype.offsetTop = function(e) {
            for (var t; void 0 === e.offsetTop; )
                e = e.parentNode;
            for (t = e.offsetTop; e = e.offsetParent; )
                t += e.offsetTop;
            return t
        }
        ,
        o.prototype.isVisible = function(e) {
            var t, i, n, o, s;
            return i = e.getAttribute("data-wow-offset") || this.config.offset,
            o = (s = window.pageYOffset) + Math.min(this.element.clientHeight, this.util().innerHeight()) - i,
            t = (n = this.offsetTop(e)) + e.clientHeight,
            o >= n && t >= s
        }
        ,
        o.prototype.util = function() {
            return null != this._util ? this._util : this._util = new t
        }
        ,
        o.prototype.disabled = function() {
            return !this.config.mobile && this.util().isMobile(navigator.userAgent)
        }
        ,
        o
    }()
}
.call(this),
ajaxify(),
window.onpopstate = function(e) {
    var t = window.location.pathname;
    e.state ? ajaxLoadPage(t) : ajaxLoadPage("/")
}
;
var navState = !0
  , navChanging = !1
  , markers = []
  , maps = []
  , addingPin = !1
  , currentlySearching = !1;
function init() {
    new WOW({
        mobile: !1
    }).init(),
    $("#footer__mailing-list__submit").click((function(e) {
        e.preventDefault();
        var t = $("#footer__mailing-list__privacy:checked").length > 0
          , i = $("#footer__mailing-list__email").val()
          , n = $("#unitID").val()
          , o = $("#groupID").val();
        !1 === t ? $("#footer__mailing-list__form .error").css("display", "inline-block") : $("#footer__mailing-list__form .error").css("display", "none"),
        "" == i ? $("#footer__mailing-list__email").addClass("error-input") : $("#footer__mailing-list__email").removeClass("error-input"),
        !0 === t && "" != i && ($("#footer__mailing-list__email").removeClass("error-input"),
        $("#footer__mailing-list__form .error").css("display", "none"),
        $.ajax({
            type: "post",
            url: "/wp-admin/admin-ajax.php",
            data: {
                action: "airship_create_contact",
                email_address: i,
                unitID: n,
                groupID: o
            },
            success: function(e) {
                $(".newsletter .signup__input").html("<p>Thank you for signing up</p>")
            },
            error: function(e) {
                console.log(e)
            }
        }))
    }
    )),
    $("#footer__mailing-list__dob").change((function() {
        $(this).removeClass("empty"),
        console.log("change")
    }
    )),
    $("#footer__mailing-list__submit_v2").click((function(e) {
        e.preventDefault();
        var t = $(".newsletter-v2 #footer__mailing-list__privacy:checked").length > 0
          , i = $(".newsletter-v2 #footer__mailing-list__first-name").val()
          , n = $(".newsletter-v2 #footer__mailing-list__last-name").val()
          , o = $(".newsletter-v2 #footer__mailing-list__email").val()
          , s = $(".newsletter-v2 #footer__mailing-list__dob").val()
          , r = $(".newsletter-v2 #footer__mailing-list__phone-number").val()
          , a = $("#unitID").val()
          , l = $("#groupID").val();
        !1 === t ? $(".newsletter-v2 #footer__mailing-list__form .error").css("display", "inline-block") : $(".newsletter-v2 #footer__mailing-list__form .error").css("display", "none"),
        "" == i ? $(".newsletter-v2 #footer__mailing-list__first-name").addClass("error-input") : $(".newsletter-v2 #footer__mailing-list__first-name").removeClass("error-input"),
        "" == n ? $(".newsletter-v2 #footer__mailing-list__last-name").addClass("error-input") : $(".newsletter-v2 #footer__mailing-list__last-name").removeClass("error-input"),
        "" == o ? $(".newsletter-v2 #footer__mailing-list__email").addClass("error-input") : $(".newsletter-v2 #footer__mailing-list__email").removeClass("error-input"),
        "" == r ? $(".newsletter-v2 #footer__mailing-list__phone-number").addClass("error-input") : $(".newsletter-v2 #footer__mailing-list__phone-number").removeClass("error-input"),
        !0 === t && "" != i && "" != n && "" != o && "" != r && ($(".newsletter-v2 #footer__mailing-list__first-name").removeClass("error-input"),
        $(".newsletter-v2 #footer__mailing-list__last-name").removeClass("error-input"),
        $(".newsletter-v2 #footer__mailing-list__email").removeClass("error-input"),
        $(".newsletter-v2 #footer__mailing-list__phone-number").removeClass("error-input"),
        $(".newsletter-v2 #footer__mailing-list__form .error").css("display", "none"),
        $.ajax({
            type: "post",
            url: "/wp-admin/admin-ajax.php",
            data: {
                action: "airship_create_contact",
                first_name: i,
                last_name: n,
                phone_number: r,
                email_address: o,
                dob: s,
                unitID: a,
                groupID: l
            },
            success: function(e) {
                console.log(e),
                $(".newsletter-v2 form").html('<h3 class="thank-you">Thank you for signing up</h3>')
            },
            error: function(e) {
                console.log(e)
            }
        }))
    }
    )),
    $("#restaurant__airship-mailing-list__submit").click((function(e) {
        e.preventDefault();
        var t = $("#restaurant__mailing-list__name").val()
          , i = $("#restaurant__mailing-list__email").val()
          , n = $("#unitID").val()
          , o = $("#groupID").val()
          , s = $("#restaurant__mailing-list__privacy:checked").length > 0;
        return !1 === s ? $(".error--restaurant-newsletter").css("display", "inline-block") : $(".error--restaurant-newsletter").css("display", "none"),
        "" == t ? $("#restaurant__mailing-list__name").addClass("error-input") : $("#restaurant__mailing-list__name").removeClass("error-input"),
        "" == i ? $("#restaurant__mailing-list__email").addClass("error-input") : $("#restaurant__mailing-list__email").removeClass("error-input"),
        !0 === s && "" != i && "" != t && ($("#restaurant__mailing-list__name").removeClass("error-input"),
        $("#restaurant__mailing-list__email").removeClass("error-input"),
        $("#restaurant__mailing-list__location").removeClass("error-input"),
        $(".error--restaurant-newsletter").css("display", "none"),
        $.ajax({
            type: "post",
            url: "/wp-admin/admin-ajax.php",
            data: {
                action: "airship_create_contact",
                first_name: t,
                email_address: i,
                unitID: n,
                groupID: o
            },
            success: function(e) {
                $(".lnewsletter__inner").html("<h3>Thank you for signing up</h3>")
            },
            error: function(e) {
                console.log(e)
            }
        })),
        !1
    }
    )),
    $("#restaurant__mailing-list__form").submit((function(e) {
        var t = $("#restaurant__mailing-list__privacy:checked").length > 0
          , i = $("#restaurant__mailing-list__name").val()
          , n = $("#restaurant__mailing-list__email").val()
          , o = "";
        if ($("#restaurant__mailing-list__group-id").length && (o = $("#restaurant__mailing-list__group-id").val()),
        console.log(o),
        $("#restaurant__mailing-list__form").hasClass("location-required")) {
            var s = $("#restaurant__mailing-list__location").val();
            null == s ? $("#restaurant__mailing-list__location").addClass("error-input") : $("#restaurant__mailing-list__location").removeClass("error-input")
        }
        if (!1 === t ? $(".error--restaurant-newsletter").css("display", "inline-block") : $(".error--restaurant-newsletter").css("display", "none"),
        "" == i ? $("#restaurant__mailing-list__name").addClass("error-input") : $("#restaurant__mailing-list__name").removeClass("error-input"),
        "" == n ? $("#restaurant__mailing-list__email").addClass("error-input") : $("#restaurant__mailing-list__email").removeClass("error-input"),
        !0 === t && "" != n && "" != i) {
            if (!$("#restaurant__mailing-list__form").hasClass("location-required"))
                return $("#restaurant__mailing-list__name").removeClass("error-input"),
                $("#restaurant__mailing-list__email").removeClass("error-input"),
                $(".error--restaurant-newsletter").css("display", "none"),
                !0;
            s && ($("#restaurant__mailing-list__name").removeClass("error-input"),
            $("#restaurant__mailing-list__email").removeClass("error-input"),
            $("#restaurant__mailing-list__location").removeClass("error-input"),
            $(".error--restaurant-newsletter").css("display", "none"),
            function(e, t, i, n) {
                $(".js-lead-gen-messages .message").hide();
                var o = {
                    action: "mailchimp_lead_gen_form",
                    email: t,
                    name: e
                };
                "" != n && null != n && (o.group = n),
                "" != i && null != i && (o.location = i),
                $.ajax({
                    type: "POST",
                    url: script_vars.ajaxUrl,
                    data: o,
                    success: function(e) {
                        e = JSON.parse(e),
                        console.log(e),
                        $(".js-lead-gen-messages").find("." + e.message).show()
                    }
                })
            }(i, n, s, o))
        }
        return !1
    }
    )),
    $(window).scrollTop() > 100 && ($(".text-logo").addClass("is-hidden"),
    $(".logo a").addClass("text-hidden")),
    $(window).scroll((function() {
        $(this).scrollTop() > 100 ? ($(".text-logo").addClass("is-hidden"),
        $(".logo a").addClass("text-hidden")) : ($(".text-logo").removeClass("is-hidden"),
        $(".logo a").removeClass("text-hidden"))
    }
    )),
    siteNav(),
    backgroundParallax(),
    "front-page" == $("main").data("template") ? pageFront() : $("body.js__loading") && (setTimeout((function() {
        $("#loading-logo").addClass("fadeout")
    }
    ), 250),
    setTimeout((function() {
        contentIn(),
        $("header").removeClass("fadeout"),
        $("body").removeClass("js__loading"),
        setTimeout((function() {
            $(".swipeEffect").addClass("is-active")
        }
        ), 300)
    }
    ), 500)),
    "about-us" == $("main").data("template") && pageAboutUs(),
    "book" == $("main").data("template") && pageBook(),
    "contact" == $("main").data("template") && pageContact(),
    "locations-search" == $("main").data("template") && pageLocationsSearch(),
    "pho-to-go" == $("main").data("template") && pagePhoToGo(),
    "single-location__inner" == $("main").data("template") && pageLocationSingle(),
    "menus-page" != $("main").data("template") && "single-menu__inner" != $("main").data("template") || pageMenus(),
    "nutrition-single" == $("main").data("template") && pageNutritionSingle(),
    "nutrition-2023" == $("main").data("template") && pageNutrition2023(),
    "summer-landing-page" == $("main").data("template") && pageSummerLanding(),
    "students-page" == $("main").data("template") && pageStudents(),
    "january-campaign-page" == $("main").data("template") && pageJanCampaign(),
    "campaign-template" == $("main").data("template") && campaignTemplate(),
    "careers-content-v2" == $("main").data("template") && (pageLocationsSearch(),
    pageCareers()),
    "team-roles" == $("main").data("template") && pageTeamsRoles(),
    "vacancies" == $("main").data("template") && pageVacancies(),
    "single-vacancy__inner" == $("main").data("template") && pageVacancies(),
    "jingle-bowls" == $("main").data("template") && pageJingleBowls();
    var e = $(".content-slider .content-slider__button-prev div")
      , t = $(".content-slider .content-slider__button-next div");
    $(".content-slider .content-slider__button-prev div").on("click", (function() {
        $(".content-slider__text .slick-prev").click()
    }
    )),
    $(".content-slider .content-slider__button-next div").on("click", (function() {
        $(".content-slider__text .slick-next").click()
    }
    )),
    $(".content-slider__images").slick({
        nextArrow: t,
        prevArrow: e,
        swipe: !1
    }),
    $(".content-slider__text").slick({
        swipe: !1
    }),
    $(window).width() < 800 && ($(".four-block-cta__container").removeClass("col"),
    $(".four-block-cta__container").slick({
        nextArrow: $(".four-block-cta .content-slider__button-next"),
        prevArrow: $(".four-block-cta .content-slider__button-prev"),
        swipe: !1
    })),
    scrollBelowSection()
}
function amountscrolled() {
    var e = $(window).height()
      , t = $(document).height();
    return $(window).scrollTop() / (t - e) * 100
}
function onYouTubeIframeAPIReady() {
    var e, t = $(".student__hero").height(), i = document.getElementById("nav-video").dataset.video;
    e = new YT.Player("nav-video",{
        videoId: i,
        width: 560,
        height: 316,
        playerVars: {
            autoplay: 1,
            controls: 0,
            showinfo: 0,
            modestbranding: 1,
            loop: 1,
            fs: 0,
            cc_load_policy: 0,
            iv_load_policy: 3,
            disablekb: 1,
            enablejsapi: 1
        },
        events: {
            onReady: function(e) {
                e.target.mute()
            },
            onStateChange: function(t) {
                t.data === YT.PlayerState.ENDED && e.playVideo()
            }
        }
    }),
    new YT.Player("hero__video",{
        videoId: $("#hero__video").data("url"),
        width: 1.2 * t * 16 / 9,
        height: 1.2 * t,
        playerVars: {
            autoplay: 1,
            controls: 0,
            showinfo: 0,
            modestbranding: 1,
            playlist: $("#hero__video").data("url"),
            loop: 1,
            fs: 0,
            cc_load_policy: 0,
            iv_load_policy: 3,
            autohide: 0
        },
        events: {
            onReady: function(e) {
                e.target.mute(),
                e.target.playVideo()
            }
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
  , backgroundImage = new Image;
function changeBackground(e, t) {
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
        var e = getCurrentScroll()   / -15;
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
//# sourceMappingURL=main.min.js.map
