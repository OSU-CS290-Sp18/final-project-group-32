$('#carouselExample').on('slide.bs.carousel', function (e) {

    var $e = $(e.relatedTarget);
    var idx = $e.index();
    var itemsPerSlide = 4;
    var totalItems = $('.carousel-item').length;

    if (idx >= totalItems-(itemsPerSlide-1)) {
        var it = itemsPerSlide - (totalItems - idx);
        for (var i=0; i<it; i++) {
            // append slides to end
            if (e.direction=="left") {
                $('.carousel-item').eq(i).appendTo('.carousel-inner');
            }
            else {
                $('.carousel-item').eq(0).appendTo('.carousel-inner');
            }
        }
    }
});
test_send();
function test_send(){
    var request = new XMLHttpRequest();
    var url = "/create/add";
    request.open("POST", url);

    var requestBody = JSON.stringify({
      magic: "heyfag",
      asdf: "asdf",
      wow: "magic"
    });

    request.addEventListener('load', function (event) {
      if (event.target.status === 200) {
        alert("callback: " + event.target.response);
      } else {
        alert("Error storing photo: " + event.target.response);
      }
    });

    request.setRequestHeader('Content-Type', 'application/json');
    request.send(requestBody);
}
