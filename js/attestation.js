import config from "./config.js";

(function ($) {
  "use strict";

  $(document).ready(function () {
    $(".AllCertificates").on("click", function () {
      $("#codeModal").remove();
      $(".modal-overlay").remove();
      $("body").append(`
        <div id="modalOverlay" class="modal-overlay"></div>
            <div id="codeModal" class="modal">
                <div class="modal-content">
                    <h3>Veuillez entrer votre code</h3>
                    <input type="text" id="certificateCode" placeholder="Entrez votre code" />
                    <button class="btn btn-primary" id="submitCode">Valider</button>
                    <button class="btn btn-danger" id="closeModal">Fermer</button>
                </div>
            </div>
        `);
    });

    // Fermer la popin
    $(document).on("click", "#closeModal", function () {
      $("#codeModal").remove();
      $(".modal-overlay").remove();
    });

    // Soumettre le code
    $(document).on("click", "#submitCode", function () {
      let code = $("#certificateCode").val();
      if (!code) {
        alert("Veuillez entrer un code valide.");
        return;
      }

      $.ajax({
        url: `${config.API_BASE_URL}/${config.Certificate_URL}/${code}`,
        method: "GET",
        success: function (response) {
          if (response) {
            $("#codeModal").remove();
            showCertificateOptions(response, code);
          } else {
            Toastify({
              text: "Aucune attestation trouvée pour ce code.",
              duration: 5000,
              close: true,
              gravity: "top",
              position: "right",
              style: {
                background: "red",
              },
              stopOnFocus: true,
            }).showToast();
          }
        },
        error: function (response) {
          Toastify({
            text:
              response?.responseJSON?.errorMessage ||
              "Erreur lors de la récupération des attestations.",
            duration: 5000,
            close: true,
            gravity: "top",
            position: "right",
            style: {
              background: "red",
            },
            stopOnFocus: true,
          }).showToast();
        },
      });
    });

    function showCertificateOptions(data, code) {
      $("#certificateModal").remove();
      $(".modal-overlay").remove();
      let modalContent = "<h3>Vos attestations disponibles</h3>";
      let options = "";

      if (data.congressParticipation)
        options += addDownloadButton("Congrès", "CongressParticipation");
      if (data.painParticipation)
        options += addDownloadButton(
          "Pré-Congrès Douleur",
          "PainParticipation"
        );
      if (data.nephrologicParticipation)
        options += addDownloadButton(
          "Pré-Congrès Néphrologie",
          "NephrologicParticipation"
        );
      if (data.firstCommunication) {
        var suffix = "";
        if (data.secondCommunication) suffix = " 1";
        options += addDownloadButton(
          "Communication" + suffix,
          "FirstCommunication"
        );
      }
      if (data.secondCommunication)
        options += addDownloadButton("Communication 2", "SecondCommunication");
      if (data.thirdCommunication)
        options += addDownloadButton("Communication 3", "ThirdCommunication");

      if (!options) {
        modalContent += "<p>Aucune attestation disponible.</p>";
      } else {
        modalContent += `<table class="table table-responsive table-hover"><tbody>${options}</tbody></table>`;
      }

      $("body").append(`
        <div id="modalOverlay" class="modal-overlay"></div>
            <div id="certificateModal" class="modal">
                <div class="modal-content">
                    ${modalContent}
                     <input type="text" id="certificateCodeHidden" value=${code} hidden />
                    <button id="closeCertificateModal" class="btn btn-danger">Fermer</button>
                </div>
            </div>
        `);
    }

    function addDownloadButton(label, key) {
      return `
						<tr><td>${label}</td><td><i class="icofont icofont-download download-btn" style="color:#02694d" data-key="${key}"></i></td></tr>`;
    }

    $(document).on("click", "#closeCertificateModal", function () {
      $("#certificateModal").remove();
      $(".modal-overlay").remove();
    });

    $(document).on("click", ".download-btn", function () {
      let $this = $(this);
      let key = $(this).data("key");
      let requestData = { Code: $("#certificateCodeHidden").val() };
      requestData[key] = true;
      $.ajax({
        url: `${config.API_BASE_URL}/${config.Certificate_Download_URL}`,
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify(requestData),
        success: function (response) {
          if (response && response.operationSucess) {
            // Décoder la chaîne Base64 en bytes
            let byteCharacters = atob(response.fileBytes);
            let byteNumbers = new Array(byteCharacters.length);
            for (let i = 0; i < byteCharacters.length; i++) {
              byteNumbers[i] = byteCharacters.charCodeAt(i);
            }
            let byteArray = new Uint8Array(byteNumbers);

            // Créer un objet Blob
            let blob = new Blob([byteArray], { type: "application/pdf" });

            // Créer une URL temporaire pour le Blob
            let url = URL.createObjectURL(blob);

            // Créer un lien de téléchargement et l'activer
            let a = document.createElement("a");
            a.href = url;
            a.download = response.fileName || "attestation.pdf"; // Nom du fichier
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            if ($this.hasClass("icofont-download")) {
              $this
                .removeClass("icofont-download")
                .addClass("icofont-downloaded");
            }

            // Libérer l'URL temporaire
            URL.revokeObjectURL(url);
          } else {
            Toastify({
              text: err?.errorMessage || "Erreur lors du téléchargement.",
              duration: 5000,
              close: true,
              gravity: "top",
              position: "right",
              style: {
                background: "red",
              },
              stopOnFocus: true,
            }).showToast();
          }
        },
        error: function (response) {
          Toastify({
            text:
              response?.responseJSON?.errorMessage ||
              "Erreur lors du téléchargement.",
            duration: 5000,
            close: true,
            gravity: "top",
            position: "right",
            style: {
              background: "red",
            },
            stopOnFocus: true,
          }).showToast();
        },
      });
    });
  });
})(jQuery);
