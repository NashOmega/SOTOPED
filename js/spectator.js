import config from "./config.js";

(function ($) {
  "use strict";

  let spectators = [];

  $(document).ready(function () {
    loadSpectators();

    $("#spectatorForm").on("submit", function (e) {
      e.preventDefault();
      saveSpectator();
    });

    $(document).on("click", ".edit-btn", function () {
      let id = $(this).closest("tr").attr("id");
      console.log(id);
      editSpectator(id);
    });

    $(document).on("click", ".delete-btn", function () {
      let id = $(this).closest("tr").attr("id");
      confirmDelete(deleteSpectator, id);
    });
  });

  function loadSpectators() {
    $.ajax({
      url: `${config.API_BASE_URL}/${config.Spectator_URL}`,
      method: "GET",
      success: function (data) {
        spectators =
          data?.sort((a, b) => a.fullName.localeCompare(b.FullName)) || [];
        renderTable();
      },
      error: function () {
        alert("Erreur lors du chargement des spectateurs.");
      },
    });
  }

  function renderTable() {
    $("#spectatorTable").DataTable().destroy();
    let tbody = $("#spectatorTable tbody").empty();
    spectators.forEach((spectator) => {
      let row = `<tr id="${spectator.id}">
                <td>${spectator.code || "—"}</td>
                <td style="min-width:200px">${spectator.fullName}</td>
                <td style="word-break: break-word; min-width:150px">${
                  spectator.email
                }</td>
                <td>${getIcon(spectator.painParticipation)}</td>
                <td>${getIcon(spectator.nephrologicParticipation)}</td>
                <td>${getIcon(spectator.congressParticipation)}</td>
                <td>${getIconText(spectator.firstCommunication)}</td>
                <td>${getIconText(spectator.secondCommunication)}</td>
                <td>${getIconText(spectator.thirdCommunication)}</td>
                <td>
                    <button class="edit-btn btn-sm btn-outline"><i class="fa fa-pencil"></i></button>
                    <button class="delete-btn btn-sm btn-outline"><i class="fa fa-trash"></i></button>
                </td>
            </tr>`;
      tbody.append(row);
    });
    $("#spectatorTable").DataTable({
      paging: true, // Active la pagination
      searching: true, // Active la recherche
      order: [],
      info: true, // Affiche le nombre total d'entrées
      columnDefs: [
        { orderable: false, targets: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] },
      ],
      pageLength: 50,
      language: {
        search: "Rechercher:",
        lengthMenu: "Afficher _MENU_ éléments",
        info: "Afficher l'élément _START_ à _END_ sur _TOTAL_ éléments",
        paginate: {
          next: "Suivant",
          previous: "Précédent",
        },
      },
    });
  }

  function getIcon(value) {
    return value
      ? '<i class="fa fa-check text-success"></i>'
      : '<i class="fa fa-times text-danger"></i>';
  }

  function getIconText(value) {
    return value
      ? '<i class="fa fa-check text-success"></i>'
      : '<i class="fa fa-times text-danger"></i>';
  }

  function saveSpectator() {
    let spectator = {
      id: $("input[name='Id']").val() || 0,
      fullName: $("input[name='FullName']").val(),
      email: $("input[name='Email']").val(),
      painParticipation: $("input[name='PainParticipation']").prop("checked"),
      nephrologicParticipation: $("input[name='NephologicParticipation']").prop(
        "checked"
      ),
      congressParticipation: $("input[name='CongresParticipation']").prop(
        "checked"
      ),
      firstCommunication: $("textarea[name='FirstCommunication']").val(),
      secondCommunication: $("textarea[name='SecondCommunication']").val(),
      thirdCommunication: $("textarea[name='ThirdCommunication']").val(),
    };

    let method = spectator.id == 0 ? "POST" : "PUT";
    let url =
      spectator.id == 0
        ? `${config.API_BASE_URL}/${config.Spectator_URL}`
        : `${config.API_BASE_URL}/${config.Spectator_URL}/${spectator.id}`;

    $.ajax({
      url: url,
      method: method,
      contentType: "application/json",
      data: JSON.stringify(spectator),
      success: function (data) {
        if (spectator.id == 0) {
          spectators.unshift(data);
        } else {
          let index = spectators.findIndex((s) => s.id == data.id);
          if (index !== -1) {
            spectators.splice(index, 1);
          }
          spectators.unshift(data);
        }
        renderTable();
        $("#spectatorForm")[0].reset();
      },
      error: function (response) {
        Toastify({
          text:
            response?.responseJSON?.errorMessage ||
            "Erreur lors de l'enregistrement.",
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
  }

  function editSpectator(id) {
    let spectator = spectators.find((s) => s.id == id);
    if (!spectator) return;

    $("input[name='Id']").val(spectator.id);
    $("input[name='FullName']").val(spectator.fullName);
    $("input[name='Email']").val(spectator.email);
    $("input[name='PainParticipation']").prop(
      "checked",
      spectator.painParticipation
    );
    $("input[name='NephologicParticipation']").prop(
      "checked",
      spectator.nephrologicParticipation
    );
    $("input[name='CongresParticipation']").prop(
      "checked",
      spectator.congressParticipation
    );
    $("textarea[name='FirstCommunication']").val(spectator.firstCommunication);
    $("textarea[name='SecondCommunication']").val(
      spectator.secondCommunication
    );
    $("textarea[name='ThirdCommunication']").val(spectator.thirdCommunication);

    $("#spectatorForm")[0].scrollIntoView({ behavior: "smooth" });
  }

  function deleteSpectator(id) {
    $.ajax({
      url: `${config.API_BASE_URL}/${config.Spectator_URL}/${id}`,
      method: "DELETE",
      success: function () {
        spectators = spectators.filter((s) => s.id != id);
        renderTable();
      },
      error: function (response) {
        Toastify({
          text:
            response?.responseJSON?.errorMessage ||
            "Erreur lors de la suppression.",
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
  }

  function confirmDelete(callback, id) {
    Swal.fire({
      title: "Êtes-vous sûr ?",
      text: "Cette action est irréversible !",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Oui, supprimer",
      cancelButtonText: "Annuler",
    }).then((result) => {
      if (result.isConfirmed) {
        callback(id); // Exécute la suppression si confirmé
      }
    });
  }
})(jQuery);
