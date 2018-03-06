$(document).ready(function () {
    //start help
    $("#help").click(function(e){

       e.preventDefault();
    });
    
    console.log("%c Cześć! Widzę, że zaglądnąłeś w konsole. To fajnie. Proszę Cię, doceń moją pracę i jej nie kradnij. Możesz się ze mną skontaktować za pomocą wiadomości na facebook-u.", 'color: orange;font-weight:bold;font-size:25px');
});

$(window).bind('beforeunload', function(){
  return 'Are you sure you want to leave?';
});