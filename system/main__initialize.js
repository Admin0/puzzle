var is_mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

// var list_contents = [
//   "TaMCYKcucQ9zq3p9", "BDp4Qp7ry2Hq4TR5", "dvTfCbD8tyMKFB89", "7TgkjCMXLwq4UPwz", "Q8PaZFjY25dAZxNz",
//   "CWKUWMk3mW83uXrH", "TvhNw3Achp4HUN7T", "zA7EC4MgfyuFZ3qC"
// ]

var content_data;

function initialize() {

  $.getJSON("index.json", function(data) {

    if (window.location.href.substring(window.location.href.length - 8, window.location.href.length) != window.location.pathname.substring(window.location.pathname.length - 8, window.location.pathname.length)) {
      var target_pre = window.location.href.substring(window.location.href.indexOf("#") + 1);
      var target = (target_pre.substring(0, 1) == "%" ? decodeURIComponent(target_pre) : target_pre);
      content_data = data[target];
      load(target);
      console.log(target);
    } else {
      var id = Object.keys(data)[Math.floor(Math.random() * Object.keys(data).length)];
      content_data = data[id];
      load(id);
      console.log(id);
    };

    // console.log(content_data);

  });
}


$(document).ready(function() {
  initialize();
  $("#nav_menu").load("system/module/nav_menu.html");
  $("#share").load("system/module/share.html", function() {
    nav_create();
  });
  $("#context_menu").load("system/module/context_menu.html");
  $.getScript("system/main__initialize_console.js");
});

$(window).on('load', function() {
  $("div#splash").fadeOut();
})
