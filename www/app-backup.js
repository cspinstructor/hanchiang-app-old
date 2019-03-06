// $('#news-content').load('http://www.hanchiangnews.com/en/');

//--- load side panel into index.html ---
$.ajax("sidepanel.html")
  .done(function(sidepanel) {
    $("#mypanel").html(sidepanel);
  })
  .fail(function() {
    console.log("ajax sidepanel error");
  });

$(document).on("click", "#news", function() {
  //alert('news panel clicked');
  loadNewsPageDiv();
  $("[data-role=panel]").panel("close");
});

$(document).on("click", "#closepanel", function() {
  $("[data-role=panel]").panel("close");
});

//--- replace contents div with news div ---
function loadNewsPageDiv() {
  $.ajax("news.html")
    .done(function(newsdiv) {
      $(".contents").replaceWith(newsdiv);
      getNews();
    })
    .fail(function() {
      console.log("ajax unable to replace with news div");
    });
}

//--- Hanchiang News ---
function getNews() {
  var url = "http://hju.freetzi.com/php/getnews.php";

  var output = "";

  $.getJSON(url, function(result) {
    console.log(result);
    $.each(result, function(i, field) {
      output += "<li class='wrap'>";
      output += "<strong>" + field.title + "</strong><br>";
      output += field.date + "<br>";
      output += "<img src='";
      output += field.pic + "'/><br>";
      output += field.content + "<br>";
      output += "</li>";
    });
    $("#newslist").append(output);
    $("#newslist")
      .listview()
      .listview("refresh");
  });

  // $.ajax({
  //   type: 'GET',
  //   url: url,
  //   crossDomain: true,
  //   cache: false,
  //   success: function(result) {
  //     // var obj = $.parseJSON(result[0]);
  //     console.log(result);
  //     $.each(result, function(i, field) {
  //       console.log(i + ':' + field.title);
  //     });
  //   }
  // });

  // $.ajax(url)
  //   .done(function(data) {
  //     console.log(data);
  //     alert(data);
  //     //var obj = JSON.parse(data);
  //     //console.log(obj);
  //     //$('.contents').html(data);
  //   })
  //   .fail(function() {
  //     $('.contents').html(name + ' not found!');
  //   });
}
