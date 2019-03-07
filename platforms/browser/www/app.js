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
  const apiRoot = "https://hjuapp.site/wp-json";
  var wp = new WPAPI({ endpoint: apiRoot });
  wp.posts()
    .perPage(3)
    .then(posts => {
      posts.forEach(function(post) {
        console.log(post.content.rendered);
      });
    })
    .catch(err => {
      console.log("Error: " + err);
    });
}

//--- Hanchiang News ---
// function getNews() {
//   var url = "http://hjuapp.site/php/getnews.php";

//   var output = "";

//   $.getJSON(url, function(result) {
//     console.log(result);
//     $.each(result, function(i, field) {
//       output += "<li class='wrap'>";
//       output += "<strong>" + field.title + "</strong><br>";
//       output += field.date + "<br>";
//       output += "<img src='";
//       output += field.pic + "'/><br>";
//       output += field.content + "<br>";
//       output += "</li>";
//     });
//     $("#newslist").append(output);
//     $("#newslist")
//       .listview()
//       .listview("refresh");
//   });
// }
