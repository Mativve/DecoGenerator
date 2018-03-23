        $(document).ready(function () {
            var currentTag = "Wszystko";

            var settings = {
                "async": true,
                "crossDomain": true,
                "url": "https://api.imgur.com/3/album/B86sw/images",
                "method": "GET",
                "headers": {
                    "Authorization": "Client-ID afaee7435584e53"
                }
            };

            function renderTags() {
                let html = "";
                var tags = ["Wszystko"];

                $("#sidebar ul").html("");
                $.ajax(settings).done(function (response) {

                    html += "";

                    for (var i = 0; i < Object.keys(response.data).length; i++) {
                        if (i == 0) {
                            tags.push(response.data[i].title);
                        } else {
                            if (!tags.includes(response.data[i].title)) {
                                tags.push(response.data[i].title);
                            }
                        }
                    }

                    for (var i = 0; i < tags.length; i++) {
                        html += "<li><button class='tagbuttons' data-tag='" + tags[i] + "'>" + tags[i] + "</button></li>";
                    }

                    $("#sidebar ul").html(html);
                });
                
            }
            renderTags();

            function render() {
                $.ajax(settings).done(function (response) {
                    let html = "";
                    //Generate gallery
                    $("#gallery").html("");


                    if (Object.keys(response.data).length == 0) {
                        gallery.append("<p>Brak zdjęć. Spróbuj odświeżyć stronę. Jeśli problem się powtórzy skontaktuj się z administratorem strony</p>");
                    }
                    $(".col").fadeOut();
                    
                    if(currentTag == "Wszystko"){
                        for (var i = 0; i < Object.keys(response.data).length; i++) {
                            html += "<div class='col' style='display:none'>";
                            html += "<div class='img'><img src='" + response.data[i].link + "' alt='Transfer decopage'/></div>";
                            html += "<div class='desc'><p>Tag: " + response.data[i].title + "</p><p class='date'>Dodano:" + timeConverter(response.data[i].datetime) + "</p><p><a href='" + response.data[i].link + "' download><i class='fas fa-save'></i> Pobierz transfer</a></p></div>";
                            html += "</div>";
                        }                        
                    }
                    else{
                        for (var i = 0; i < Object.keys(response.data).length; i++) {
                            if(currentTag == response.data[i].title){
                                    html += "<div class='col' style='display:none'>";
                                    html += "<div class='img'><img src='" + response.data[i].link + "' alt='Transfer decopage'/></div>";
                                    html += "<div class='desc'><p>Tag: " + response.data[i].title + "</p><p class='date'>Dodano:" + timeConverter(response.data[i].datetime) + "</p><p><a href='" + response.data[i].link + "' download><i class='fas fa-save'></i> Pobierz transfer</a></p></div>";
                                    html += "</div>";                               
                               }
                        } 
                    }

                    $("#gallery").html(html);
                    $(".col").fadeIn();
                });
            }
            render();
            
            
            //selectTags
            
            $("#sidebar").on("click",".tagbuttons",function(){
                
                $(".tagbuttons").removeClass("");
                $(this).addClass("selected");
               
                var t = $(this).data("tag");
                if(t!=currentTag){
                    currentTag = t;
                    console.log("Wybrano "+t);
                    render();
                }
                
                
                
            });
            
            

            function timeConverter(UNIX_timestamp) {
                var a = new Date(UNIX_timestamp * 1000);
                var months = ["Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec", "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"];
                var year = a.getFullYear();
                var month = months[a.getMonth()];
                var date = a.getDate();
                var hour = a.getHours();
                var min = a.getMinutes();
                if (min < 10) {
                    min = "0" + a.getMinutes();
                }

                var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min;
                return time;
            }
        });
