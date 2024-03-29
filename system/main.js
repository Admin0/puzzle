function toast(msg, icon, time) {
  if (icon == null) {
    icon = "priority_high";
  }
  if (time == null) {
    time = 1500;
  }

  $('#toast').remove();
  $('body').append('<div id="toast" class="shadow"><i class="material-icons">' + icon + '</i>' + msg + '</div>');
  $('#toast').addClass("on").removeClass("off");

  setTimeout(function() {
    $("#toast").addClass("off").removeClass("on", function() {
      $(this).delay(300).remove();
    });
  }, time + 300);
}

function scroll_smooth() {
  $("[href^='#']").click(function(event) {
    event.preventDefault();

    if (document.height === null) {
      pageYOffset = document.documentElement.scrollTop;
    }
    var isNotNav = true;
    if ($(this).parent().prop("tagName") == "H3" || $(this).parent().prop("tagName") == "H2") {
      isNotNav = false;
    }

    var target_pre = this.hash;
    var target = (target_pre.substring(1, 2) == "%" ? $(decodeURIComponent(target_pre)) : $(target_pre));
    var target_reverse; // = $(this) //old code
    if ($(this).parent("p").parent(".back").prev(".front").length != 0) {
      target_reverse = $(this).parent("p").parent(".back").prev(".front");
    } else {
      target_reverse = $(this);
    }
    var target_bg;
    var reversible = true;

    function bg_change(t, color, time) {
      if (t[0].tagName == "TR") {
        t.children("td").css({
          "background-color": color,
          "transition": time
        });
      } else {
        t.css({
          "background-color": color,
          "transition": time
        });
      }
    }

    function scroll(target, event) {

      $("section > .contents, section > link").remove();
      $("section").removeClass("on");

      if (target[0].tagName == "TR") {
        target_bg = target.children("td").css("background-color");
      } else {
        target_bg = target.css("background-color");
      }

      $("section > .contents, section > link").remove();
      $("section").removeClass("on");
      if (isNotNav) {
        target_position = target.offset().top - event.pageY + pageYOffset + target.height() / 2;
      } else if (target.css("display") != "none") {
        // console.log(pageYOffset + ", " + target.offset().top);
        if (pageYOffset > target.offset().top - 114) {
          target_position = target.offset().top - 114;
        } else {
          target_position = target.offset().top - 179;
        }
      } else {
        toast("항목이 없습니다.");
      }

      $('html, body').delay(350).animate({
        scrollTop: target_position
      }, 500, function() {
        bg_change(target, target_bg, ".75s");
      });
    }

    scroll(target, event);
    bg_change(target, "#ffa", ".25s");

    if (isNotNav) {
      toast("원래 자리로 가려면 더블 클릭.", "refresh", 2500);
      document.ondblclick = function(event) {
        if (reversible) {
          scroll(target_reverse, event);
          bg_change(target_reverse, "#ffa", ".25s");
          reversible = false;
        }
      };
    }
    // alert(target_reverse.offset().top);
  });
}

function title_tooltip() {
  $('[title]').attr({
    'data-title': function() {
      return this.title;
    },
    'title': null
  });
  $('body').append('<div id="tooltip"><div id="tooltip_text"></div><div id="tooltip_before"></div></div>');
  $("#tooltip").css({
    "background": "#424242"
  });
  $("#tooltip").append($("#tooltip_before"));
  $("#tooltip_before").css({
    "border-color": "#424242 transparent transparent transparent"
  });
  $('[data-title]').each(function() {
    $(this).hover(
      function() {
        // console.log($(this).attr('data-title'));
        if (document.height === null) {
          pageYOffset = document.documentElement.scrollTop;
        }
        $('#tooltip_text').html($(this).attr('data-title'));
        var left = $(this).offset().left + ($(this).outerWidth() - $('#tooltip').outerWidth()) / 2;
        if (left <= 0) {
          left = 0;
        }
        $('#tooltip').css({
          'visibility': 'visible',
          'opacity': 1,
          'top': $(this).offset().top - $('#tooltip').outerHeight() /*+ pageYOffset*/ - 16 + 'px',
          'left': left + 'px'
        });
      },
      function() {
        $('#tooltip').css({
          'visibility': 'hidden',
          'opacity': 0
        });
      }
    );
  });
}

$(window).scroll(function() {
  for (i = $("h3:not(nav h3)").length - 1; i >= 0; i--) {
    var target = $("h3:not(nav h3):nth(" + i + ")");
    // console.log(target.offset().top);
    if (target.offset().top < pageYOffset + 256 && target.css("display") != "none") {
      $("nav h3 a").css({
        "color": "inherit"
      });
      if ($('section.on').length >= 1 && target.parent().hasClass("on")) {
        // document.title = '#' + target.children("span").text();
        // $('#title').html('#' + target.children("span").text());
      } else {
        // document.title = "qualify";
        // $('#title').html('<span class="hide_mobile"></span>스크롤하면 어지러웡');
      }
      // console.log(target.children("span").text());
      // console.log('<span class="hide_mobile">초보자 가이드 > </span>' + target.children("span").text()));
      break;
    }
  }
});

function clear() {
  $('.contents').html("");
}

function answer_check() {
  console.log("input: " + $("#input_answer").val().trim());
  for (var i = 0; i < list_answer.length; i++) {
    if ($("#input_answer").val().trim().toUpperCase() == list_answer[i].toUpperCase()) {
      console.log("딩동댕!");
      $(".answer.input").addClass("hide");
      $(".answer.output").removeClass("hide");

      var audio_answer = new Audio();
      audio_answer.src = "assets/answer.mp3"
      audio_answer.play();

      toast("정답입니다!");
      break;
    } else {
      toast("답이 아닙니다!");
      console.log("땡!");
    }
  }
}

$(window).resize(function() {
  // columns();
});

$(document).ready(function() {
  // nav_create();
  scroll_smooth();
  // columns();
  title_tooltip();
  context_menu();
});

$(window).on('load', function() {
  setTimeout(function() {
    // columns();
    // scroll_at_open();
  }, 0);
  // imgReady();
});
