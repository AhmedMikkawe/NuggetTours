$(document).ready(function () {
  /*manipulate nav menu on phone screen  */
  $(".toggle-menu").on("click", function () {
    $(".nav__list--mobile").toggleClass("show");
  });
});
