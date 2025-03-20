(function ($) {
  "use strict";

  $(window).on("load", function () {
    // Charger le JSON des intervenants
    $.getJSON("./json/hostels.json", function (data) {
      let hostelsHtml = "";
      data.sort((a, b) => {
        let distanceDiff = a.NormalizedDistance - b.NormalizedDistance;
        if (distanceDiff !== 0) {
          return distanceDiff;
        }
        return a.Name.localeCompare(b.Name);
      });
      // Boucler sur les données et construire le HTML
      data.forEach(function (hostel) {
        var mailHtml = hostel.Mail !== "" ? `<span>${hostel.Mail}</span>` : "";
        var phoneHtml =
          hostel.Phone !== "" ? `<span>${hostel.Phone}</span><br/>` : "";
        var websiteUrl = hostel.Website !== "" ? `${hostel.Website}` : "#";
        hostelsHtml += `
                <div class="col-lg-4 col-md-6 col-12">
                    <!-- Single Blog -->
                    <div class="single-news">
                        <div class="news-body">
                            <div class="news-content">
                                <a href="${websiteUrl}" target="_blank"><h2>${hostel.Name}</h2></a>
                                <p class="text hostelAdress">
                                ${hostel.Address}
                                </p>
                                <br/>
                                <p class="text hostelContact">
                                ${phoneHtml}
                                ${mailHtml}
                                </p>
                                <p class="place">${hostel.Distance} (${hostel.Estimation})</p>
                            </div>
                        </div>
                    </div>
                    <!-- End Single Blog -->
                </div>
            `;
      });

      // Insérer le HTML dans la div #hostelsList
      $("#hostelsList").html(hostelsHtml);

      hostelReizer();
    }).fail(function () {
      console.error("Erreur lors du chargement du fichier JSON.");
    });
  });

  window.addEventListener("resize", function () {
    hostelReizer();
  });

  function hostelReizer() {
    setTimeout(function () {
      setTimeout(function () {
        let maxHeightTitle = 0;
        let maxHeightPlace = 0;
        let maxHeightAdress = 0;
        let maxHeightContact = 0;

        $("#hostelsList .single-news .news-content a h2").each(function () {
          let currentHeight = $(this).outerHeight();

          if (currentHeight > maxHeightTitle) {
            maxHeightTitle = currentHeight;
          }
        });

        $("#hostelsList .single-news .news-content .place").each(function () {
          let currentHeight = $(this).outerHeight();

          if (currentHeight > maxHeightPlace) {
            maxHeightPlace = currentHeight;
          }
        });

        $("#hostelsList .single-news .news-content .hostelAdress").each(
          function () {
            let currentHeight = $(this).outerHeight();

            if (currentHeight > maxHeightAdress) {
              maxHeightAdress = currentHeight;
            }
          }
        );

        $("#hostelsList .single-news .news-content .hostelContact").each(
          function () {
            let currentHeight = $(this).outerHeight();

            if (currentHeight > maxHeightContact) {
              maxHeightContact = currentHeight;
            }
          }
        );

        $("#hostelsList .single-news .news-content a h2").css(
          "min-height",
          maxHeightTitle + "px"
        );

        $("#hostelsList .single-news .news-content .place").css(
          "min-height",
          maxHeightPlace + "px"
        );

        $("#hostelsList .single-news .news-content .hostelAdress").css(
          "min-height",
          maxHeightAdress + "px"
        );

        $("#hostelsList .single-news .news-content .hostelContact").css(
          "min-height",
          maxHeightAdress + "px"
        );
      }, 200);
    }, 200);
  }
})(jQuery);
