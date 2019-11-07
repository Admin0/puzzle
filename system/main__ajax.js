const ad =
  '<section class="ad">' +
  '<!-- qualify 반응형 -->' +
  '<ins class="adsbygoogle"' +
  '     style="display:block"' +
  '     data-ad-client="ca-pub-8175591114279139"' +
  '     data-ad-slot="5452657644"' +
  '     data-ad-format="auto"' +
  '     data-full-width-responsive="true"></ins>' +
  '<script>' +
  '(adsbygoogle = window.adsbygoogle || []).push({});' +
  '</script>' +
  '</section>'

function after_load(id) {
  $('#title').html(id);

  // scroll to top for mobile
  $('html, body').animate({
    scrollTop: 0
  }, pageYOffset / 2);

  // $('.title').textillate();

}

function load(id) {
  $.ajax({
    type: 'get',
    url: 'contents/' + id + ".html",
    dataType: 'html',
    success: function(data) {
      $(".contents").html("");
      $('.contents').append(data);
      after_load(id);

      // adsense
      // $("#main_item .contents").append(ad).prepend(ad);
      // (adsbygoogle = window.adsbygoogle || []).push({
      //   google_ad_client: "ca-pub-8175591114279139",
      //   enable_page_level_ads: true
      // });
    }
  });
}
