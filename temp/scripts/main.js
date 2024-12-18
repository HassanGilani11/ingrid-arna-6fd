"use strict";

/*
 ** Globals
 */

var eById = function eById(x) {
  return document.getElementById(x);
};
var qsAll = function qsAll(x) {
  return document.querySelectorAll(x);
};
var qs = function qs(x) {
  return document.querySelector(x);
};
var ifItExists = function ifItExists(c) {
  return qsAll(c).length > 0;
};
var getHash = function getHash() {
  return window.location.hash;
};
var urlParams = function urlParams() {
  return new URLSearchParams(window.location.search);
};
var emptyArray = function emptyArray(arr) {
  return !Array.isArray(arr) || arr.length === 0;
};
var getParameterByName = function getParameterByName(name) {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
  return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
};
var setCookie = function setCookie(name, value, days) {
  var expires = '';
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
};
var getCookie = function getCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) === " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};
var installMediaQueryWatcher = function installMediaQueryWatcher(mediaQuery, layoutChangedCallback) {
  var mql = window.matchMedia(mediaQuery);
  mql.addListener(function (e) {
    return layoutChangedCallback(e.matches);
  });
  layoutChangedCallback(mql.matches);
};
var scrollToSection = function scrollToSection() {
  qsAll('[data-scroll-to]').forEach(function (element) {
    element.addEventListener('click', function () {
      var target = this.dataset.scrollTo;
      $('html, body').animate({
        scrollTop: $(target).offset().top - 100
      }, 1000);

      // let fsmenu = $('.full-screen-menu');
      var fsmenu = $('.full-screen-menu');

      //fsmenu.hasClass('checked-full-screen-menu');

      //console.log(fsmenu.hasClass('checked-full-screen-menu'));

      if (fsmenu.hasClass('checked-full-screen-menu')) {
        jQuery('.full-screen-menu').removeClass('checked-full-screen-menu');
        jQuery('body').removeClass('overflow-hidden');
      }
    });
  });
};

//console.clear();

gsap.registerPlugin('ScrollTrigger');

/*
** Shortcodes
*/

// Videos

var playEmbeddedVideo = function playEmbeddedVideo() {
  var playEmbeddedVideo = qsAll('.play-embedded-video');
  playEmbeddedVideo.forEach(function (button) {
    button.addEventListener('click', function (e) {
      var embedVideoWrapper = this.parentNode.parentNode.parentNode;
      var thumbnail = embedVideoWrapper.querySelector('.embed-video__thumbnail');
      var animatedPlay = embedVideoWrapper.querySelector('.embed-video__button');
      var iframe = embedVideoWrapper.querySelector('iframe');
      var effect = "\n\t\t\t\topacity:0;\n\t\t\t\tvisibility:hidden;\n\t\t\t\ttransition:all .5s ease;\n\t\t\t";
      thumbnail.style.cssText = effect;
      animatedPlay.style.cssText = effect;
      iframe.src = "".concat(iframe.getAttribute('src'), "?autoplay=1&hd=1&show_title=1&show_byline=1&show_portrait=0&fullscreen=1");
    });
  });
};
var playEmbeddedVideoInModal = function playEmbeddedVideoInModal() {
  var fullscreenNavigationHolder = qs('.fullscreen-navigation-holder');

  /*if (ifItExists('.play-embedded-video-in-modal')) {
  		qsAll('.play-embedded-video-in-modal').forEach(button => {
  			button.addEventListener('click', function () {
  			fullscreenNavigationHolder.classList.add('is-open');
  			let dataUrl = this.getAttribute("data-url");
  			let iframe = fullscreenNavigationHolder.querySelector('.navbar-container iframe');
  			iframe.setAttribute('src',`${dataUrl}?autoplay=1&hd=1&show_title=1&show_byline=1&show_portrait=0&fullscreen=1`);
  		});
  		});
  	}*/

  if (ifItExists('.play-embedded-video-in-modal')) {
    qsAll('.play-embedded-video-in-modal').forEach(function (button) {
      button.parentNode.parentNode.parentNode.addEventListener('click', function () {
        fullscreenNavigationHolder.classList.add('is-open');
        var dataUrl = this.querySelector('.play-embedded-video-in-modal').getAttribute("data-url");
        var iframe = fullscreenNavigationHolder.querySelector('.navbar-container iframe');
        iframe.setAttribute('src', "".concat(dataUrl, "?autoplay=1&hd=1&show_title=1&show_byline=1&show_portrait=0&fullscreen=1"));
      });
    });
  }
  if (ifItExists('.fullscreen-navigation-holder')) {
    qs('#close-modal,.fullscreen-navigation-holder').addEventListener('click', function () {
      fullscreenNavigationHolder.classList.remove('is-open');
      var iframe = fullscreenNavigationHolder.querySelector('.navbar-container iframe');
      var player = new Vimeo.Player(iframe);
      player.pause();
    });
  }
};

// svg animation
// gsap.to("#svg-left path", {
// 	drawSVG: 0,
// 	duration: 4,
// 	yoyo: true,
// 	repeat: -1
// });
// Swiper

var initSwiper = function initSwiper() {
  var sliderCoverflowThumbnails = new Swiper(".block-real-women .slider-testimonials .slider-testimonials-thumbnails", {
    spaceBetween: 10,
    slidesPerView: 6,
    //freeMode: true,
    watchSlidesProgress: true,
    //centeredSlides: true,
    loop: true,
    slideToClickedSlide: true,
    navigation: {
      nextEl: ".slider-custom-arrows .sca-next",
      prevEl: ".slider-custom-arrows .sca-prev"
    },
    breakpoints: {
      100: {
        slidesPerView: 4,
        spaceBetween: 10
      },
      768: {
        slidesPerView: 6,
        spaceBetween: 10
      }
    }
  });
  var sliderCoverflowModal = new Swiper(".block-real-women .slider-testimonials .slider-testimonials__modal", {
    loopedSlides: 6,
    spaceBetween: 10,
    slidesPerView: "auto",
    loop: true,
    speed: 1000,
    nav: true,
    effect: "coverflow",
    draggable: false,
    //grabCursor: false,
    centeredSlides: true,
    allowTouchMove: false,
    coverflowEffect: {
      rotate: 0,
      stretch: 0,
      depth: 200,
      modifier: 1
    },
    /*thumbs: {
                 swiper: sliderTestimonialsThumbnailsThree,
             },*/
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev"
    },
    breakpoints: {
      100: {
        loopedSlides: 4
      },
      768: {
        loopedSlides: 6
      }
    }
  });
  sliderCoverflowModal.controller.control = sliderCoverflowThumbnails;
  sliderCoverflowThumbnails.controller.control = sliderCoverflowModal;

  //sliderCoverflowModal.slideTo(2);

  var sliderTestimonialsThumbnailsThree = new Swiper(".block-with-6-figure .slider-testimonials .slider-testimonials-thumbnails", {
    spaceBetween: 10,
    slidesPerView: 6,
    //freeMode: true,
    watchSlidesProgress: true,
    centeredSlides: true,
    loop: true,
    slideToClickedSlide: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev"
    },
    breakpoints: {
      100: {
        slidesPerView: 5,
        spaceBetween: 10
      },
      768: {
        slidesPerView: 6,
        spaceBetween: 10
      }
    }
  });
  var sliderTestimonialsModalThree = new Swiper(".block-with-6-figure .slider-testimonials .slider-testimonials__modal", {
    loopedSlides: 6,
    spaceBetween: 10,
    slidesPerView: "auto",
    loop: true,
    speed: 1000,
    nav: true,
    effect: "coverflow",
    //grabCursor: true,
    centeredSlides: true,
    allowTouchMove: false,
    coverflowEffect: {
      rotate: 0,
      stretch: 0,
      depth: 200,
      modifier: 1
    },
    /*thumbs: {
                 swiper: sliderTestimonialsThumbnailsThree,
             },*/
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev"
    },
    breakpoints: {
      100: {
        loopedSlides: 5
      },
      768: {
        loopedSlides: 6
      }
    }
  });
  sliderTestimonialsModalThree.controller.control = sliderTestimonialsThumbnailsThree;
  sliderTestimonialsThumbnailsThree.controller.control = sliderTestimonialsModalThree;
  var sliderTestimonialsThumbnailsFour = new Swiper(".block-if-youre-prepared .slider-testimonials .slider-testimonials-thumbnails", {
    spaceBetween: 10,
    slidesPerView: 6,
    //freeMode: true,
    watchSlidesProgress: true,
    centeredSlides: true,
    loop: true,
    slideToClickedSlide: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev"
    },
    breakpoints: {
      100: {
        slidesPerView: 5,
        spaceBetween: 10
      },
      768: {
        slidesPerView: 6,
        spaceBetween: 10
      }
    }
  });
  var sliderTestimonialsModalFour = new Swiper(".block-if-youre-prepared .slider-testimonials .slider-testimonials__modal", {
    loopedSlides: 6,
    spaceBetween: 10,
    slidesPerView: "auto",
    loop: true,
    speed: 1000,
    nav: true,
    effect: "coverflow",
    //grabCursor: true,
    centeredSlides: true,
    allowTouchMove: false,
    coverflowEffect: {
      rotate: 0,
      stretch: 0,
      depth: 200,
      modifier: 1
    },
    /*thumbs: {
                 swiper: sliderTestimonialsThumbnailsFour,
             },*/
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev"
    },
    breakpoints: {
      100: {
        loopedSlides: 5
      },
      768: {
        loopedSlides: 6
      }
    }
  });
  sliderTestimonialsModalFour.controller.control = sliderTestimonialsThumbnailsFour;
  sliderTestimonialsThumbnailsFour.controller.control = sliderTestimonialsModalFour;
  if (ifItExists(".slider-custom-arrows")) {
    var sliderCustomArrows = qsAll(".slider-custom-arrows");
    sliderCustomArrows.forEach(function (element) {
      element.querySelector(".sca-prev").addEventListener("click", function () {
        element.querySelector(".swiper-button-prev").click();
      });
      element.querySelector(".sca-next").addEventListener("click", function () {
        element.querySelector(".swiper-button-next").click();
      });
    });
  }
};

// Questions

var qualifyingQuestion = function qualifyingQuestion() {
  var ycbmIframeSubdomain = function ycbmIframeSubdomain(url) {
    var iframeHtml = "<iframe src=\"".concat(url, "\" id=\"ycbmiframeSUBDOMAIN\" style=\"width:100%;height:100%;border:0px;\" frameborder=\"0\" allowtransparency=\"true\"></iframe>");
    qs('.qualifying-question__iframe').innerHTML = iframeHtml;
    var params = window.location.href.split("?")[1] || false;
    if (params) {
      var iframe = document.getElementById("ycbmiframeSUBDOMAIN");
      iframe.src = "".concat(url, "/?noframe=true&skipHeaderFooter=true&").concat(params);
    }
  };
  var submit = function submit() {
    var form = qs('.qualifying-question__form form');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      this.querySelector('button').disabled = true;
      this.querySelectorAll('input[type=radio]').forEach(function (e) {
        if (e.checked) {
          var dataOption = e.dataset.option;
          if (dataOption != undefined) {
            //let isEqual = ['a','c','e'];

            if (dataOption == 'closer') {
              ycbmIframeSubdomain('https://cdbs-regular-ia.youcanbook.me');
            } else if (dataOption == 'setter') {
              ycbmIframeSubdomain('https://phase1.youcanbook.me');
            } else if (dataOption == 'rejected') {
              ycbmIframeSubdomain('https://iaredirect.youcanbook.me');
            }
          }
        }
      });
    });
  };
  submit();
};

// Coaches

var coaches = function coaches() {
  var coachesList = qsAll('.coaches .coach-list .coach-list__item');
  var coachesExpandList = qs('.coaches-expand');
  var coachesExpand = function coachesExpand(data, opacity, visibility, zIndex) {
    coachesExpandList.style.cssText = "\n            opacity:".concat(opacity, ";\n            visibility:").concat(visibility, ";\n            transition:opacity .3s ease, visibility .3s ease;\n        ");
    coachesExpandList.querySelector("[data-coach-expand=\"".concat(data, "\"]")).style.cssText = "\n            opacity:".concat(opacity, ";\n            z-index:").concat(zIndex, ";\n            transition:opacity .3s ease;\n        ");
  };
  coachesList.forEach(function (coach) {
    coach.addEventListener('click', function () {
      coachesExpand(this.dataset.coach, 1, 'visible', 2);
      document.querySelector('body').classList.add('overflow-hidden');
      setTimeout(function () {
        //$('.coaches-expand').slideDown();
        $('.coaches-expand').animate({
          scrollTop: $('.coaches-expand__item').offset().top * -1
        }, 500);
      }, 300);
    });
  });
  coachesExpandList.querySelectorAll('.coaches-expand__item').forEach(function (coach) {
    coach.querySelector('.back-to-team').addEventListener('click', function () {
      coachesExpand(this.parentElement.parentElement.parentElement.dataset.coachExpand, 0, 'hidden', 1);
      qs('body').classList.remove('overflow-hidden');
    });
  });
};
var videoList = function videoList() {
  var videoList = qs('.video-list');
  var blockWatchVideo = qs('.block-watch-video');
  var paramDay = getParameterByName('day');
  var daySlug = localStorage.getItem('daySlug');
  if (!daySlug) {
    localStorage.setItem('daySlug', paramDay);
  }
  if (getParameterByName('reset')) {
    localStorage.removeItem('daySlug');
    localStorage.setItem('daySlug', paramDay);
    window.location.href = "".concat(window.location.origin, "?day=").concat(paramDay);
  }
  var loadInformation = function loadInformation(index) {
    if (index < daySlug) {
      videoList.querySelectorAll("li")[index].click();
    }
  };
  var assignActiveLink = function assignActiveLink() {
    for (var index = 0; index < daySlug; index++) {
      videoList.querySelectorAll("li")[index].classList.add('link-active');
    }
  };
  var playVideo = function playVideo() {
    videoList.querySelectorAll('li').forEach(function (link, i) {
      link.addEventListener('click', function () {
        var dataTitle = this.dataset.title;
        var dataDescription = this.dataset.description;
        var dataUrl = this.dataset.url;
        var effect = "\n\t\t\t\t\topacity:1;\n\t\t\t\t\tvisibility:visibility;\n\t\t\t\t\ttransition:all .5s ease;\n\t\t\t\t";
        blockWatchVideo.querySelector('.block__group-of-texts h4').textContent = "Day #".concat(i + 1);
        blockWatchVideo.querySelector('.block__group-of-texts span').textContent = dataTitle;
        blockWatchVideo.querySelector('.block__group-of-texts p').textContent = dataDescription;
        blockWatchVideo.querySelector('.embed-video iframe').src = "https://player.vimeo.com/video/".concat(dataUrl);
        blockWatchVideo.querySelector('.embed-video .embed-video__thumbnail picture img').src = "".concat(window.location.origin, "/img/bg_images/thumbnails/video-").concat(i + 1, ".jpg");
        blockWatchVideo.querySelector('.embed-video .embed-video__thumbnail').style.cssText = effect;
        blockWatchVideo.querySelector('.embed-video .embed-video__button').style.cssText = effect;
        history.pushState(null, null, "?day=".concat(i + 1));
      });
    });
  };
  assignActiveLink();
  playVideo();
  loadInformation(paramDay - 1);
};
var slideModules = function slideModules() {
  var slideNavigation = new Swiper(".slide__modules .slide-navigation", {
    spaceBetween: 0,
    slidesPerView: 11,
    //freeMode: true,
    watchSlidesProgress: true,
    grabCursor: true,
    breakpoints: {
      100: {
        slidesPerView: 7
      },
      768: {
        slidesPerView: 9
      },
      1024: {
        slidesPerView: 11
      }
    }
  });
  var expandedModules = new Swiper(".slide__modules .expanded-modules", {
    spaceBetween: 10,
    autoHeight: true,
    observer: true,
    observeParents: true,
    thumbs: {
      swiper: slideNavigation
    },
    navigation: {
      nextEl: ".custom-swiper-button-next",
      prevEl: ".custom-swiper-button-prev"
    }
  });
  expandedModules.on("slideChange", function () {
    //console.log(this);
    $('html, body').animate({
      scrollTop: $('.swiper-expanded-modules').offset().top - $('.header_main_wrapper .header_main.header_main').outerHeight()
    }, 1000);
    startGsap(this);
  });
  var startGsap = function startGsap(data) {
    //console.log(data.realIndex);
    var sGSlide = data.slides.eq(data.activeIndex);
    var sGBanner = sGSlide[0].querySelector(".sm__banner");
    var sGButtonBuyNow = sGSlide[0].querySelector(".sm__button");
    var sGTitle = sGSlide[0].querySelector(".sm__text .t__title");
    var sGDescription = sGSlide[0].querySelector(".sm__text .smt__text");
    var sGModuleValue = sGSlide[0].querySelector(".sm__text .smt__value .t__value");
    var sGModuleNumber = sGSlide[0].querySelector(".sm__text .smt__value .t__module-number");
    var sGTheseInclude = sGSlide[0].querySelector(".smt__these-include") ? sGSlide[0].querySelector(".smt__these-include") : "";
    var tl = gsap.timeline();
    var ModuleValueCount = {
      value: 0
    };

    /* Splitting the text into characters. */
    var splitSGTitle = new SplitText(sGTitle, {
      type: "chars"
    });
    //let splitSGDescription = new SplitText(sGDescription, {charsClass: "class++", type: "words,chars"});

    tl.set(ModuleValueCount, {
      value: 0.0,
      onUpdate: function onUpdate() {
        sGModuleValue.querySelector("span").textContent = ModuleValueCount.value.toFixed(3).replace(".", ",");
      }
    });
    tl.fromTo(sGBanner, 2, {
      scale: 0.9,
      opacity: 0
    }, {
      scale: 1,
      opacity: 1,
      ease: "power2.inOut"
    });

    //tl.from(sGModuleValue,{autoAlpha: 0, x:-50 ,ease:'back.out', duration: .5},1.1);

    tl.to(ModuleValueCount, {
      duration: 1,
      value: sGModuleValue.dataset.value,
      onUpdate: function onUpdate() {
        sGModuleValue.querySelector("span").textContent = ModuleValueCount.value.toFixed(3).replace(".", ",");
      }
    });
    tl.from(sGButtonBuyNow, 1.5, {
      x: -20,
      autoAlpha: 0,
      ease: "power2.out"
    }, 1.7);
    tl.from(splitSGTitle.chars, {
      autoAlpha: 0,
      y: 40,
      ease: "power2.inOut",
      stagger: 0.04
    }, 1);
    tl.from(sGDescription.querySelectorAll("p"), 1.5, {
      y: "+=20",
      autoAlpha: 0,
      stagger: 0.5
    }, 1.2);

    //tl.from(splitSGDescription.chars, { autoAlpha: 0, y:100, ease:'back.out', stagger:0.02, duration: 1},1.2);

    tl.from(sGModuleNumber.querySelector(".tmm__text-module"), {
      autoAlpha: 0,
      y: 100,
      ease: "back.out",
      duration: 1
    }, 0.5);
    tl.from(sGModuleNumber.querySelector(".tmn__number .t__symbol"), {
      autoAlpha: 0,
      x: -50,
      ease: "back.out",
      duration: 0.5
    }, 0.5);
    tl.from(sGModuleNumber.querySelector(".tmn__number .t__number"), {
      autoAlpha: 0,
      rotateY: "360deg",
      ease: "back.out",
      duration: 3
    }, 0.5);

    /* A setInterval function that is looping through the `sGTheseIncludeLi` and
    	`sGTheseIncludeImg` array. */
    if (sGTheseInclude) {
      var sGTheseIncludeLi = sGTheseInclude.querySelectorAll(".smt__ti-list .ticks__pink li");
      var sGTheseIncludeImg = sGTheseInclude.querySelectorAll(".smt__ti-img .animated-image");
      var count = 0,
        time = 2000;
      setInterval(function () {
        sGTheseIncludeLi.forEach(function (li, i) {
          li.style.cssText = "color:#000;font-weight:400;transition:all .5s ease;";
        });
        sGTheseIncludeImg.forEach(function (img, i) {
          img.style.cssText = "display:none;";
        });
        if (count < sGTheseIncludeLi.length) {
          sGTheseIncludeLi[count].style.cssText = "color:#f8028d;font-weight:bold;transition:all .5s ease;";
          sGTheseIncludeImg[count].style.cssText = "display:block;";
          count++;
        } else {
          count = 1;
          sGTheseIncludeLi[0].style.cssText = "color:#f8028d;font-weight:bold;";
          sGTheseIncludeImg[0].style.cssText = "display:block";
        }
      }, time);
    }
  };
};
var customCountdown = function customCountdown() {
  if (ifItExists(".ddio_countdown_wrap")) {
    var dfTimeD = qs(".ddio_countdown_wrap .dfD");
    var dfTimeH = qs(".ddio_countdown_wrap .dfH");
    var dfTimeM = qs(".ddio_countdown_wrap .dfM");
    var dfTimeS = qs(".ddio_countdown_wrap .dfS");
    var cCountdown = qsAll(".custom_countdown");
    cCountdown.forEach(function (el) {
      el.querySelector(".dynamic_div .ddD").textContent = dfTimeD.textContent;
      el.querySelector(".dynamic_div .ddH").textContent = dfTimeH.textContent;
      el.querySelector(".dynamic_div .ddM").textContent = dfTimeM.textContent;
      el.querySelector(".dynamic_div .ddS").textContent = dfTimeS.textContent;
    });
  }
};

// Gsap

var animationsWithGsap = function animationsWithGsap() {
  var stepByStepTimeline = function stepByStepTimeline() {
    var stepByStepTimeline = gsap.utils.toArray('.step-by-step-timeline .sbst__wrapper .sbst__item');
    stepByStepTimeline.forEach(function (element) {
      var dataEffectValue = element.dataset.effectValue;
      gsap.from(element, {
        x: dataEffectValue,
        opacity: 0,
        duration: 1.5,
        ease: "sine.inOut",
        //ease: "power1.inOut",
        scrollTrigger: {
          trigger: element,
          start: 'top 40%',
          end: '+=100% 100%',
          scrub: 2
        }
      });
    });
  };
  stepByStepTimeline();
  var faqsAccordion = function faqsAccordion() {
    var groups = gsap.utils.toArray('.faqs__group');
    var menus = gsap.utils.toArray('.faqs__menu');
    var menuToggles = groups.map(faqsCreateAnimation);
    menus.forEach(function (menu) {
      menu.addEventListener("click", function () {
        return toggleMenu(menu);
      });
    });
    function toggleMenu(clickedMenu) {
      menuToggles.forEach(function (toggleFn) {
        return toggleFn(clickedMenu);
      });
    }
    function faqsCreateAnimation(element) {
      var menu = element.querySelector('.faqs__menu');
      var box = element.querySelector('.faqs__content');
      var faqsArrowBottom = element.querySelector('.img__arrow-bottom');
      var faqsArrowRight = element.querySelector('.img__arrow-right');
      gsap.set(box, {
        height: "auto"
      });
      var animation = gsap.timeline().from(box, {
        height: 0,
        duration: 0.5,
        ease: "power1.inOut"
      }).from(faqsArrowBottom, {
        duration: .1,
        autoAlpha: 0,
        ease: 'power1.inOut'
      }, 0).to(faqsArrowRight, {
        duration: .1,
        autoAlpha: 0,
        ease: 'power1.inOut'
      }, 0).reverse();
      return function (clickedMenu) {
        if (clickedMenu === menu) {
          animation.reversed(!animation.reversed());
        } else {
          animation.reverse();
        }
      };
    }
  };
  faqsAccordion();
};
var slideContact = function slideContact() {
  var slideContact = qs('.slide-contact'),
    openSlideContact = qsAll('.open-slide-contact'),
    closeSlideContact = slideContact.querySelector('.slide-contact__close'),
    fsmenu = $('.full-screen-menu');
  openSlideContact.forEach(function (element) {
    element.addEventListener('click', function () {
      slideContact.style.cssText = "\n\t\t\t\ttransform: translateX(0);\n\t\t\t\ttransition: transform .5s ease-in-out,\n\t\t\t\t-webkit-transform .5s ease-in-out\n\t\t\t";
      if (fsmenu.hasClass('checked-full-screen-menu')) {
        jQuery('.full-screen-menu').removeClass('checked-full-screen-menu');
        jQuery('body').removeClass('overflow-hidden');
      }
    });
  });
  closeSlideContact.addEventListener('click', function () {
    slideContact.style.cssText = "\n\t\t\ttransform: translateX(100%);\n\t\t\ttransition: transform .5s ease-in-out,\n\t\t\t-webkit-transform .5s ease-in-out\n\t\t";
    if (fsmenu.hasClass('checked-full-screen-menu')) {
      jQuery('.full-screen-menu').removeClass('checked-full-screen-menu');
      jQuery('body').removeClass('overflow-hidden');
    }
  });
};

/*
** Pages
*/

/*
** Jquery usage
*/

var jQueryUsage = function jQueryUsage() {};

/*
** Execute functions
*/

var initPages = function initPages() {
  if (ifItExists('')) {

    // Page specific code here
  }
};
var initShortcodesLoad = function initShortcodesLoad() {
  if (ifItExists('[data-scroll-to]')) {
    scrollToSection();
    ;
  }
  if (ifItExists('.play-embedded-video')) {
    playEmbeddedVideo();
  }
  if (ifItExists('.fullscreen-navigation-holder')) {
    playEmbeddedVideoInModal();
  }
  if (ifItExists('.qualifying-question')) {
    qualifyingQuestion();
  }
  if (ifItExists('.coaches')) {
    coaches();
  }
};
var initShortcodesDOMContentLoaded = function initShortcodesDOMContentLoaded() {
  if (ifItExists('.rotation-1turn,.rotation-reverse')) {
    setTimeout(function () {
      qsAll(".rotation-1turn,.rotation-reverse").forEach(function (element) {
        element.style.display = "table";
      });
    }, 1000);
  }
  if (ifItExists('.swiper')) {
    initSwiper();
  }
  if (ifItExists('.video-list')) {
    videoList();
  }
  if (ifItExists('.block-modules')) {
    slideModules();
  }
  animationsWithGsap();
  setTimeout(function () {
    setInterval(function () {
      customCountdown();
    }, 1000);
  }, 5000);
  if (ifItExists('.open-slide-contact')) {
    slideContact();
  }
};
window.addEventListener('load', function (event) {
  console.log('page is fully loaded');
  initShortcodesLoad();
  jQueryUsage();
  //initPages();
});

document.addEventListener('DOMContentLoaded', function (event) {
  console.log('page is fully loaded');
  initShortcodesDOMContentLoaded();
});
$('.more_list').marquee({
  duration: 20000,
  duplicated: true
});
var modalTestimonialsVideos = function modalTestimonialsVideos(modal) {
  if (ifItExists(modal.buttonClass)) {
    qsAll(modal.buttonClass).forEach(function (el) {
      el.addEventListener("click", function () {
        qs(".fullscreen-navigation-holder").classList.add("is-open");
        var dataUrl = this.getAttribute("data-url");
        var iframe = qs(".fullscreen-navigation-holder .navbar-container iframe");
        iframe.setAttribute("src", dataUrl + "?autoplay=1&hd=1&show_title=1&show_byline=1&show_portrait=0");
      });
    });
  }
};
modalTestimonialsVideos({
  buttonClass: ".result_section .result_list .result_box .stm__t-body"
});
modalTestimonialsVideos({
  buttonClass: ".banner_arna .video-image"
});

//header
var navbar = document.querySelector('.header_main_wrapper');
var sticky = navbar.offsetTop;
var navbarScroll = function navbarScroll() {
  if (window.pageYOffset >= sticky) {
    navbar.classList.add('sticky');
  } else {
    navbar.classList.remove('sticky');
  }
};
window.onscroll = navbarScroll;

// Full screen menu

jQuery(document).on('click', '#burger-open', function () {
  jQuery('.full-screen-menu').addClass('checked-full-screen-menu');
  jQuery('body').addClass('overflow-hidden');
});
jQuery(document).on('click', '.close_menu', function () {
  jQuery('.full-screen-menu').removeClass('checked-full-screen-menu');
  jQuery('body').removeClass('overflow-hidden');
});

// Floating menu button

installMediaQueryWatcher("(min-width: 768px)", function (matches) {
  if (matches) {
    // animation script
    jQuery(document).ready(function () {
      setTimeout(function () {
        var $animation_elements = $('.animatable');
        var $window = $(window);
        function scrollAnimation() {
          var window_height = $window.height();
          var window_top_position = $window.scrollTop();
          var window_bottom_position = window_top_position + window_height;
          jQuery.each($animation_elements, function () {
            var $element = $(this);
            var element_height = $element.outerHeight();
            var element_top_position = $element.offset().top;
            var element_bottom_position = element_top_position + element_height;
            if (element_bottom_position >= window_top_position && element_top_position <= window_bottom_position) {
              $element.addClass('animated');
            }
          });
        }
        $window.on('scroll resize', scrollAnimation);
        $window.trigger('scroll');
        var _has = window.location.hash.slice(1);
        if (_has) {
          jQuery('html, body').animate({
            scrollTop: jQuery('.' + _has).offset().top - 10
          }, 500);
        }
      }, 500);
    });
  }
});