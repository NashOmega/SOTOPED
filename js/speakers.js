(function ($) {
  "use strict";

  $(window).on("load", function () {
    // Charger le JSON des intervenants
    $.getJSON("./json/speakers.json", function (data) {
      let speakersHtml = "";
      data.sort((a, b) => {
        // Trier par "Denomination" : "Pr" avant "Dr"
        if (a.Denomination !== b.Denomination) {
          return a.Denomination === "Pr" ? -1 : 1;
        }
        // Trier ensuite par "Name" alphabétiquement
        return a.Name.localeCompare(b.Name);
      });
      // Boucler sur les données et construire le HTML
      data.forEach(function (speaker) {
        speakersHtml += `
                <div class="col-lg-3 col-md-6 col-12">
                    <!-- Single Blog -->
                    <div class="single-news">
                        <div class="news-body">
                            <div class="news-content">
                                <h2>${speaker.Denomination} ${speaker.Name}</h2>
                                <p class="text">${speaker.Title}</p>
                                <p class="place">${speaker.Provenance}</p>
                            </div>
                        </div>
                    </div>
                    <!-- End Single Blog -->
                </div>
            `;
      });
      speakerReizer();
      // Insérer le HTML dans la div #speakersList
      $("#speakersList").html(speakersHtml);
    }).fail(function () {
      console.error("Erreur lors du chargement du fichier JSON.");
    });
  });

  window.addEventListener("resize", function () {
    speakerReizer();
  });

  function speakerReizer() {
    setTimeout(function () {
      let maxHeight = 0;
      let maxHeightTitle = 0;
      let maxHeightPlace = 0;

      $("#speakersList .single-news .news-content .text").each(function () {
        let currentHeight = $(this).outerHeight();
        if (currentHeight > maxHeight) {
          maxHeight = currentHeight;
        }
      });

      $("#speakersList .single-news .news-body h2").each(function () {
        let currentHeight = $(this).outerHeight();
        if (currentHeight > maxHeightTitle) {
          maxHeightTitle = currentHeight;
        }
      });

      $("#speakersList .single-news .news-body .place").each(function () {
        let currentHeight = $(this).outerHeight();
        if (currentHeight > maxHeightPlace) {
          maxHeightPlace = currentHeight;
        }
      });

      $("#speakersList .single-news .news-content .text").css(
        "min-height",
        maxHeight + "px"
      );

      $("#speakersList .single-news .news-body h2").css(
        "min-height",
        maxHeightTitle + "px"
      );

      $("#speakersList .single-news .news-body .place").css(
        "min-height",
        maxHeightPlace + "px"
      );
    }, 200);
  }
})(jQuery);
