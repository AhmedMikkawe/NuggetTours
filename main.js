$(document).ready(function () {
  /*manipulate nav menu on phone screen  */
  $(".toggle-menu").on("click", function () {
    $(".nav__list--mobile").toggleClass("show");
  });
  /*Configure autocomplete for distination and nationality */
  let nationalities = ["ae", "bh", "dz", "eg", "eh", "iq", "lb", "ly", "ma"];
  let cities = [
    "Daqahliyah",
    "Buhayrah",
    "Fayyum",
    "Alexandria",
    "Isma'iliyah",
    "Giza",
    "Minufiyah",
    "Al Minya",
    "Cairo",
    "Aswan",
    "Asyut",
    "Bani Suwayf",
    "Bur Sa'id",
    "Dumyat",
    "Matruh",
    "Qina",
    "Shamal Sina'",
    "Suhaj",
  ];
  $("#dest").autocomplete({
    source: function (request, response) {
      var matches = $.map(cities, function (city) {
        if (city.toUpperCase().indexOf(request.term.toUpperCase()) === 0) {
          return city;
        }
      });
      response(matches);
    },
  });
  $("#nationality").on("focus", function (e) {
    if (e.target.value == "") {
      $("#nationality").autocomplete("search", "");
    }
  });
  $("#nationality")
    .autocomplete({
      minLength: 0,
      source: function (request, response) {
        var matches = $.map(nationalities, function (city) {
          if (city.toUpperCase().indexOf(request.term.toUpperCase()) === 0) {
            return city;
          }
        });
        console.log(matches);
        response(matches);
      },
      select: function (e, ui) {
        $(".--nationality__label img").attr("src", `img/${ui.item.label}.png`);
      },
    })
    .data("ui-autocomplete")._renderItem = function (ul, item) {
    return $(
      `<li>
      <div class='ui-menu-item-wrapper'>
      <img src='img/${item.label}.png' />${item.label}
      </div>
      </li>`
    ).appendTo(ul);
  };

  /*Configure date pickers for check in and check out */
  $("#check-in")
    .datepicker({
      dateFormat: "dd/mm/yy",
      minDate: new Date(),
      onClose: function (e) {
        $("#check-out").datepicker("show");
      },
    })
    .datepicker("setDate", new Date());
  $("#check-out")
    .datepicker({
      dateFormat: "dd/mm/yy",
      defaultDate: +1,
      minDate: new Date(
        $("#check-in").datepicker("getDate").getTime() + 1 * 24 * 60 * 60 * 1000
      ),
      /*before chekout calendar shows up I must set the minDate to a date that comes after the check in date */
      beforeShow: function (e) {
        $("#check-out").datepicker(
          "option",
          "minDate",
          new Date(
            $("#check-in").datepicker("getDate").getTime() +
              1 * 24 * 60 * 60 * 1000
          )
        );
      },
    })
    .datepicker("setDate", "+1");

  /*When Night Change Check out date will change */
  $("#nights").on("change", function (e) {
    let countOfNights = e.target.value * 24 * 60 * 60 * 1000;
    let checkInDate = $("#check-in").datepicker("getDate");
    let willLeveOnDate = new Date(countOfNights + checkInDate.getTime());
    $("#check-out").datepicker("setDate", willLeveOnDate);
  });
  /*When Check out date change Nights Count Will Change */
  $("#check-out").on("change", function (e) {
    let checkInDate = $("#check-in").datepicker("getDate").getTime();
    let checkOutDate = $("#check-out").datepicker("getDate").getTime();
    let nightsCount = (checkOutDate - checkInDate) / (1000 * 60 * 60 * 24);
    if (nightsCount > 10) {
      alert("can't choose more than 10 days");
      $("#check-out").datepicker("setDate", checkOutDate);
    } else {
      $("#nights").val(nightsCount);
    }
  });
});
