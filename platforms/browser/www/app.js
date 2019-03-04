// $('#news-content').load('http://www.hanchiangnews.com/en/');

//--- load side panel into index.html ---
$.ajax('sidepanel.html')
  .done(function(sidepanel) {
    $('#mypanel').html(sidepanel);
  })
  .fail(function() {
    console.log('ajax sidepanel error');
  });

$(document).on('click', '#news', function() {
  console.log('news clicked');
  $('[data-role=panel]').panel('close');
  loadNewsPageDiv();
  //getNews();
});

$(document).on('click', '#closepanel', function() {
  console.log('closepanel clicked');
  $('[data-role=panel]').panel('close');
});

//--- replace contents div with news div ---
function loadNewsPageDiv() {
  $.ajax('news.html')
    .done(function(newsdiv) {
      console.log('ajax news done');
      $('.contents').replaceWith(newsdiv);
      getNews();
    })
    .fail(function() {
      console.log('ajax unable to replace with news div');
    });
}

//--- Hanchiang News ---
function getNews() {
  //var url = 'http://192.168.137.84/hanchiang/hanchiangscraper.php';
  var url = 'http://hju.epizy.com/php/getnews.php';

  $.ajax(url)
    .done(function(data) {
      console.log(data);
      //var obj = JSON.parse(data);
      //console.log(obj);
      //$('.contents').html(data);
    })
    .fail(function() {
      $('.contents').html(name + ' not found!');
    });
}
