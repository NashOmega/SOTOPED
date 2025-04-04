/* =====================================
Template Name: 	Mediplus.
Author Name: Naimur Rahman
Website: http://wpthemesgrid.com/
Description: Mediplus - Doctor HTML Template.
Version:	1.1
========================================*/
/*=======================================
[Start Activation Code]
=========================================
* Sticky Header JS
* Search JS
* Mobile Menu JS
* Hero Slider JS
* Testimonial Slider JS
* Portfolio Slider JS
* Clients Slider JS
* Single Portfolio Slider JS
* Accordion JS
* Nice Select JS
* Date Picker JS
* Counter Up JS
* Checkbox JS
* Right Bar JS
* Video Popup JS
* Wow JS
* Scroll Up JS
* Animate Scroll JS
* Stellar JS
* Google Maps JS
* Preloader JS
=========================================
[End Activation Code]
=========================================*/
(function ($) {
  "use strict";
  $(document).on("ready", function () {
    jQuery(window).on("scroll", function () {
      if ($(this).scrollTop() > 200) {
        $("#header .header-inner").addClass("sticky");
      } else {
        $("#header .header-inner").removeClass("sticky");
      }
    });

    /*====================================
			Sticky Header JS
		======================================*/
    jQuery(window).on("scroll", function () {
      if ($(this).scrollTop() > 100) {
        $(".header").addClass("sticky");
      } else {
        $(".header").removeClass("sticky");
      }
    });

    $(".pro-features .get-pro").on("click", function () {
      $(".pro-features").toggleClass("active");
    });

    /*====================================
			Search JS
		======================================*/
    $(".search a").on("click", function () {
      $(".search-top").toggleClass("active");
    });

    /*====================================
			Mobile Menu
		======================================*/
    $(".menu").slicknav({
      prependTo: ".mobile-nav",
      duration: 300,
      closeOnClick: true,
    });

    /*===============================
			Hero Slider JS
		=================================*/
    $(".hero-slider").owlCarousel({
      loop: true,
      autoplay: true,
      smartSpeed: 500,
      autoplayTimeout: 3500,
      singleItem: true,
      autoplayHoverPause: true,
      items: 1,
      nav: true,
      navText: [
        '<i class="fa fa-angle-left" aria-hidden="true"></i>',
        '<i class="fa fa-angle-right" aria-hidden="true"></i>',
      ],
      dots: false,
    });

    /*===============================
			Testimonial Slider JS
		=================================*/
    $(".testimonial-slider").owlCarousel({
      items: 3,
      autoplay: true,
      autoplayTimeout: 4500,
      smartSpeed: 300,
      autoplayHoverPause: true,
      loop: true,
      merge: true,
      nav: false,
      dots: true,
      responsive: {
        1: {
          items: 1,
        },
        300: {
          items: 1,
        },
        480: {
          items: 1,
        },
        768: {
          items: 2,
        },
        1170: {
          items: 3,
        },
      },
    });

    /*===============================
			Portfolio Slider JS
		=================================*/
    $(".portfolio-slider").owlCarousel({
      autoplay: true,
      autoplayTimeout: 4000,
      margin: 15,
      smartSpeed: 300,
      autoplayHoverPause: true,
      loop: true,
      nav: true,
      dots: false,
      responsive: {
        300: {
          items: 1,
        },
        480: {
          items: 2,
        },
        768: {
          items: 2,
        },
        1170: {
          items: 4,
        },
      },
    });

    /*=====================================
			Counter Up JS
		======================================*/
    $(".counter").counterUp({
      delay: 20,
      time: 2000,
    });

    /*===============================
			Clients Slider JS
		=================================*/
    $(".clients-slider").owlCarousel({
      items: 5,
      autoplay: true,
      autoplayTimeout: 3500,
      margin: 15,
      smartSpeed: 400,
      autoplayHoverPause: true,
      loop: true,
      nav: false,
      dots: false,
      responsive: {
        300: {
          items: 1,
        },
        480: {
          items: 2,
        },
        768: {
          items: 3,
        },
        1170: {
          items: 5,
        },
      },
    });

    /*====================================
			Single Portfolio Slider JS
		======================================*/
    $(".pf-details-slider").owlCarousel({
      items: 1,
      autoplay: false,
      autoplayTimeout: 5000,
      smartSpeed: 400,
      autoplayHoverPause: true,
      loop: true,
      merge: true,
      nav: true,
      dots: false,
      navText: [
        '<i class="icofont-rounded-left"></i>',
        '<i class="icofont-rounded-right"></i>',
      ],
    });

    /*===================
			Accordion JS
		=====================*/
    $(".accordion > li:eq(0) a").addClass("active").next().slideDown();
    $(".accordion a").on("click", function (j) {
      var dropDown = $(this).closest("li").find("p");
      $(this).closest(".accordion").find("p").not(dropDown).slideUp(300);
      if ($(this).hasClass("active")) {
        $(this).removeClass("active");
      } else {
        $(this).closest(".accordion").find("a.active").removeClass("active");
        $(this).addClass("active");
      }
      dropDown.stop(false, true).slideToggle(300);
      j.preventDefault();
    });

    /*====================================
			Nice Select JS
		======================================*/
    $("select").niceSelect();

    /*=====================================
			Date Picker JS
		======================================*/
    $(function () {
      $("#datepicker").datepicker();
    });

    /*===============================
			Checkbox JS
		=================================*/
    $('input[type="checkbox"]').change(function () {
      if ($(this).is(":checked")) {
        $(this).parent("label").addClass("checked");
      } else {
        $(this).parent("label").removeClass("checked");
      }
    });

    /*===============================
			Right Bar JS
		=================================*/
    $(".right-bar .bar").on("click", function () {
      $(".sidebar-menu").addClass("active");
    });
    $(".sidebar-menu .cross").on("click", function () {
      $(".sidebar-menu").removeClass("active");
    });

    /*=====================
			Video Popup JS
		=======================*/
    $(".video-popup").magnificPopup({
      type: "video",
    });

    /*================
			Wow JS
		==================*/
    var window_width = $(window).width();
    if (window_width > 767) {
      new WOW().init();
    }

    /*===================
			Scroll Up JS
		=====================*/
    $.scrollUp({
      scrollText: '<span><i class="fa fa-angle-up"></i></span>',
      easingType: "easeInOutExpo",
      scrollSpeed: 900,
      animation: "fade",
    });

    /*=======================
			Animate Scroll JS
		=========================*/
    $(".scroll").on("click", function (e) {
      var anchor = $(this);
      $("html, body")
        .stop()
        .animate(
          {
            scrollTop: $(anchor.attr("href")).offset().top - 100,
          },
          1000
        );
      e.preventDefault();
    });

    /*=======================
			Stellar JS
		=========================*/
    $.stellar({
      horizontalOffset: 0,
      verticalOffset: 0,
    });

    /*====================
			Google Maps JS
		======================*/
    var map = new GMaps({
      el: "#map",
      lat: 23.011245,
      lng: 90.88478,
      scrollwheel: false,
    });
    map.addMarker({
      lat: 23.011245,
      lng: 90.88478,
      title: "Marker with InfoWindow",
      infoWindow: {
        content: "<p>welcome to Medipro</p>",
      },
    });
  });

  /*====================
		Preloader JS
	======================*/

  $(document).ready(function () {
    let sections = $("section");
    let navLinks = $(".nav.menu li a");

    $(".nav.menu li a").on("click", function () {
      let thisNav = $(this);
      navLinks.parent().removeClass("active");
      thisNav.parent().addClass("active");
    });

    $(".Inscription").on("click", function (e) {
      e.preventDefault();
      window.open("https://ee.kobotoolbox.org/MhqAyM2Y", "_blank");
    });

    $("#Claim").on("click", function (e) {
      e.preventDefault();
      window.open("https://forms.gle/qYwcPsiZXhpwx9Wn6", "_blank");
    });

    $(".eventPhotos").on("click", function (e) {
      e.preventDefault();
      window.open(
        "https://drive.google.com/drive/folders/1BV_rvvDsclJSvWlIU_eEtkvqIM8ZNPi0?usp=sharing",
        "_blank"
      );
    });
    $(".AllCertificates").on("click", function (e) {
      e.preventDefault();
    });

    $(".Hostels").on("click", function (e) {
      e.preventDefault();
      window.location.href = "hostels.html";
    });

    $("#CongressPr").on("click", function (e) {
      e.preventDefault();
      downloadFile(
        "./assets/Programme du congrès.pdf",
        "Programme du congrès.pdf"
      );
    });

    $("#PainPreCongressPr").on("click", function (e) {
      e.preventDefault();
      downloadFile(
        "./assets/Programme du Pré-congrès Douleur.pdf",
        "Programme du Pré-congrès Douleur.pdf"
      );
    });

    $("#NephrologicPreCongressPr").on("click", function (e) {
      e.preventDefault();
      downloadFile(
        "./assets/Programme du Pré-congrès Néphrologie.pdf",
        "Programme du Pré-congrès Néphrologie.pdf"
      );
    });

    $(".resumeBook").on("click", function (e) {
      e.preventDefault();
      downloadFile(
        "./assets/Livre des résumés du 6e congrès de la SOTOPED.pdf",
        "Livre des résumés du 6e congrès de la SOTOPED.pdf"
      );
    });

    $(".eposterModel").on("click", function (e) {
      e.preventDefault();
      downloadFile("./assets/Modèle eposter.pptx", "Modèle eposter.pptx");
    });

    $(".communicationModel").on("click", function (e) {
      e.preventDefault();
      downloadFile(
        "./assets/Modèle PowerPoint de communication exigé_Congrès SOTOPED 2025.pptx",
        "Modèle PowerPoint de communication exigé_Congrès SOTOPED 2025.pptx"
      );
    });
  });

  function downloadFile(fileUrl, fileName) {
    var link = document.createElement("a");
    link.href = fileUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    setTimeout(() => {
      document.body.removeChild(link);
      clickEvents();
    }, 100);
  }

  $(document).ready(function () {
    $.ajaxSetup({
      beforeSend: function () {
        showLoader();
      },
      complete: function () {
        hideLoader();
      },
    });
  });

  $(window).on("load", function () {
    // Désactiver le préchargeur
    $(".preloader").addClass("preloader-deactivate");
    congressResizer();
    organsResizer();
  });

  window.addEventListener("resize", function () {
    congressResizer();
    organsResizer();
  });

  function congressResizer() {
    let maxHeight = 0;
    let maxHeightTitle = 0;
    let maxHeightTheme = 0;
    let maxHeightPlace = 0;

    $(
      ".schedule .container .schedule-inner .single-schedule .single-content p .description"
    ).each(function () {
      let currentHeight = $(this).outerHeight();
      if (currentHeight > maxHeight) {
        maxHeight = currentHeight;
      }
    });

    $(
      ".schedule .container .schedule-inner .single-schedule .single-content h4"
    ).each(function () {
      let currentHeight = $(this).outerHeight();
      if (currentHeight > maxHeightTheme) {
        maxHeightTheme = currentHeight;
      }
    });

    $(
      ".schedule .container .schedule-inner .single-schedule .single-content p .place"
    ).each(function () {
      let currentHeight = $(this).outerHeight();
      if (currentHeight > maxHeightPlace) {
        maxHeightPlace = currentHeight;
      }
    });

    $(
      ".schedule .container .schedule-inner .single-schedule .single-content span .congressTitle"
    ).each(function () {
      let currentHeight = $(this).outerHeight();
      if (currentHeight > maxHeightTitle) {
        maxHeightTitle = currentHeight;
      }
    });

    $(
      ".schedule .container .schedule-inner .single-schedule .single-content p .description"
    ).css("min-height", maxHeight + "px");

    $(
      ".schedule .container .schedule-inner .single-schedule .single-content h4"
    ).css("min-height", maxHeightTheme + "px");

    $(
      ".schedule .container .schedule-inner .single-schedule .single-content span .congressTitle"
    ).css("min-height", maxHeightTitle + "px");

    $(
      ".schedule .container .schedule-inner .single-schedule .single-content p .place"
    ).css("min-height", maxHeightPlace + "px");
  }

  function organsResizer() {
    let maxHeight = 0;
    $("#organs .single-table .title").each(function () {
      let currentHeight = $(this).outerHeight();
      if (currentHeight > maxHeight) {
        maxHeight = currentHeight;
      }
    });

    $("#organs .single-table .title").css("min-height", maxHeight + "px");
  }

  function showLoader() {
    $("body").append(`
        <div id="loaderOverlay" class="loader-overlay">
            <div class="ajax-loader"></div>
        </div>
    `);
    $("body").addClass("loading");
  }

  function hideLoader() {
    $("#loaderOverlay").remove();
    $("body").removeClass("loading");
  }
})(jQuery);
