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

function create_adventure(){
    var request = new XMLHttpRequest();
    var url = "/create/add";

    var daysInput = document.getElementById('daysInput').value;
    var levelInput = document.getElementById('levelInput').value;
    var playersInput = document.getElementById('playersInput').value;
    var encounterInput = document.getElementById('encounterInput').value;

    if(daysInput && levelInput && playersInput && encounterInput){
        if(/^\d+$/.test(daysInput) && /^\d+$/.test(levelInput) &&
         /^\d+$/.test(playersInput) && /^\d+$/.test(encounterInput)){
            request.open("POST", url);

            var requestBody = JSON.stringify({
              days: daysInput,
              level: levelInput,
              players: playersInput,
              encounters: encounterInput
            });

            request.addEventListener('load', function (event) {
              if (event.target.status === 200) {
                alert("callback: " + event.target.response);
              } else {
                alert("Error storing adventure: " + event.target.response);
              }
            });

            request.setRequestHeader('Content-Type', 'application/json');
            request.send(requestBody);
        } else {
            alert("Please ensure all fields are integers");
        }
    } else {
        alert("Please ensure all fields are filled");
    }
}
