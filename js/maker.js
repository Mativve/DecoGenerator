$(document).ready(function () {

    //Zmienne globalne
    var currentId;
    var ccanv = $("#" + currentId);
    var ids = 0;
    var $canvasy = $(".canvasy");
    var $elements = $(".elements");
    var xcenter = $canvasy.width() / 2;
    var ycenter = $canvasy.height() / 2;
    xcenter = Math.floor(xcenter);
    ycenter = Math.floor(ycenter);

    //Nowa warstwa
    $("#add").on('click' , function() {
        if ($elements.find(".row").length == 15) {
            alert("Nie możesz dodać więcej warstw!");
        } else {

            ids++;

            if (ids == 1) {
//                $canvasy.append("<canvas id='c" + ids + "' data-x='" + xcenter + "' data-y='" + ycenter + "' data-r='0' data-size='52' data-font='Arimo' data-text='Twój tekst' data-color='#000'></canvas>");
                document.getElementsByClassName("canvasy")[0].innerHTML += "<canvas id='c" + ids + "' data-x='" + xcenter + "' data-y='" + ycenter + "' data-r='0' data-size='52' data-font='Arimo' data-text='Twój tekst' data-color='#000'></canvas>";
                currentId = "c1";
            } else {
//                $canvasy.append("<canvas id='c" + ids + "' data-x='" + xcenter + "' data-y='" + ycenter + "' data-r='0' data-size='52' data-font='Arimo' data-text='Twój tekst' data-color='#000'></canvas>");
                document.getElementsByClassName("canvasy")[0].innerHTML += "<canvas id='c" + ids + "' data-x='" + xcenter + "' data-y='" + ycenter + "' data-r='0' data-size='52' data-font='Arimo' data-text='Twój tekst' data-color='#000'></canvas>";
            }


//            $elements.append("<div class='row'><button data-id='c" + ids + "' class='select' onclick='changeId(this)' >Warstwa" + ids + "</button><button data-id='c" + ids + "' class='remove' onclick='removeLayer(this)'><span><i class='fas fa-trash-alt'></i></span></button></div>");
            document.getElementsByClassName("elements")[0].innerHTML += "<div class='row'><button data-id='c" + ids + "' class='select' onclick='changeId(this);' >Warstwa" + ids + "</button><button data-id='c" + ids + "' class='remove' onclick='removeLayer(this);'><span><i class='fas fa-trash-alt'></i></span></button></div>";

            resizeCanvas("c" + ids);
            editCanvas();
        }
    });

    //Pobieranie id
    function changeId(obj) {
        $(".elements .row").removeClass("active");
        $(obj).parent().addClass("active");
        currentId = $(obj).data("id");
        //            console.log("Pobrano id: " + currentId);
        ccanv = $("#" + currentId);
        //Pobranie wartości
        $("#yt").val($("#" + currentId).data("text"));
        $("#font").val($("#" + currentId).data("font"));
        editCanvas();
        console.log("current id" + currentId);
    }

    //usuwanie elementu
    function removeLayer(obj) {
        var i = $(obj).data("id");
        console.log("Usuwam:" + i);
        $("#" + i).remove();
        $(obj).parent().remove();
    }

    //Stylowanie
    var xystep = 20;
    var rotatestep = 15;
    var sizestep = 10
    //Gdy zmiana X
    $("#left").click(function () {
        changeX(-xystep);
    });
    $("#right").click(function () {
        changeX(+xystep);
    });

    //Gdy zmiana Y
    $("#up").click(function () {
        changeY(-xystep);
    });
    $("#down").click(function () {
        changeY(+xystep);
    });

    //Gdy obracanie
    $("#rotl").click(function () {
        rotate(-rotatestep);
    });
    $("#rotr").click(function () {
        rotate(+rotatestep);
    });

    //wysrodkowanie
    $("#center").click(function () {
        console.log("wysroduj");
        centered();
    });

    $("#scaleup").click(function () {
        fontSize(+sizestep);
    });
    $("#scaledown").click(function () {
        fontSize(-sizestep);
    });

    $("#font").change(function () {
        changeFont($(this).val());
    });

    $("#yt").on("change paste keyup", function () {
        changeText($(this).val());
    });
    
    $("#color").on("change", function () {
        colorChange($(this).val());
    });    

    //Funkcje styli
    function changeX(x) {
        var cx = ccanv.data("x");
        cx += x;
        cx = Math.floor(cx);
        ccanv.attr("data-x", cx);
        ccanv.data("x", cx);
        //        console.log("Zmieniono pozycję X o: " + cx);
        editCanvas();
    }

    function changeY(y) {
        var cy = ccanv.data("y");
        cy += y;
        cy = Math.floor(cy);
        ccanv.attr("data-y", cy);
        ccanv.data("y", cy);
        //        console.log("Zmieniono pozycję Y o: " + cy);
        editCanvas();
    }

    function rotate(r) {
        console.log(ccanv);
        var cr = ccanv.data("r");
        cr += r;
        ccanv.data("r", cr);
        ccanv.attr("data-r", cr);
        editCanvas();
        //        console.log("Obrócono o: " + cr);
        //        $("#" + currentId).css({
        //            "transform": "rotate("+cr+"deg)"
        //        });
    }

    function fontSize(s) {
        var cs = ccanv.data("size");
        cs += s;
        ccanv.attr("data-size", cs);
        ccanv.data("size", cs);
        //        console.log("Zmieniono rozmiar czcionki: " + cs);
        editCanvas();
    }

    function changeFont(f) {
        var cf = ccanv.data("font");
        cf = f;
        ccanv.attr("data-font", cf);
        ccanv.data("font", cf);
        //        console.log("Zmieniono czcionkę: " + cf);
        editCanvas();
    }

    function changeText(t) {
        var ct = ccanv.data("text");
        ct = t;
        ccanv.attr("data-text", ct);
        ccanv.data("text", ct);
        //        console.log("Zmieniono tekst: " + ct);
        editCanvas();
    }

    function centered() {
        var cx = ccanv.data("x");
        var cy = ccanv.data("y");
        cx = xcenter;
        cy = ycenter;
        ccanv.attr("data-x", cx);
        ccanv.attr("data-y", cy);
        ccanv.data("x", cx);
        ccanv.data("y", cy);
        editCanvas();
    }
    
    function colorChange(col){
        var color = ccanv.data("color");
        color = col;
        ccanv.attr("data-color", color);
        ccanv.data("color", color);
        editCanvas();
    }
    
    
    //Edit canvas
    function editCanvas() {
        var canvas = document.getElementById(currentId);
        var ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        var text = ccanv.data("text");
        var x = ccanv.data("x");
        var y = ccanv.data("y");
        var r = ccanv.data("r");
        
        var fontColor = ccanv.data("color");

        var reg = new RegExp("(http(s?):)|([/|.|\w|\s])*\.(?:jpg|gif|png)");

        if (reg.test(text)) {

            var img = new Image(); // Create new img element
            img.width = xcenter*2;
            img.height = ycenter*2;
            img.addEventListener('load', function () {}, false);
            img.src = text; // Set source path

            ctx.rotate(r * Math.PI / 180);

            ctx.drawImage(img, 0, 0, img.width,img.height);

        } else {
            var fsize = ccanv.data("size");
            var font = ccanv.data("font");

            ctx.font = fsize + "px " + font;
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";

            ctx.rotate(r * Math.PI / 180);
            
            ctx.fillStyle=fontColor;

            ctx.fillText(text, x, y);
        }
    }

    function resizeCanvas(id) {
        var cW = $canvasy.width();
        var cH = $canvasy.height();

        $(".canvasy #" + id).attr("width", cW);
        $(".canvasy #" + id).attr("height", cH);
    }

    //Wygenerowanie obrazka
    $("#wygeneruj").click(function () {

        $(".image").html("");

        $(".canvasy").css({
            "transform": "scaleX(-1)"
        });

        var cns = document.getElementsByClassName("canvasy")[0];
        html2canvas(cns).then(canvas => {
            document.querySelector(".image").appendChild(canvas)
        });

        setTimeout(function () {
            $(".image canvas").attr("id", "rendered");
            var c = document.getElementById("rendered");
            var d = c.toDataURL("image/png");
            $(".image").append("<img src='" + d + "' alt='from canvas' id='imageready'/>");
            $(".canvasy").css({
                "transform": "scaleX(1)"
            });
        }, 100);
    });



    //Udostępnianie
    $("#download").click(function (e) {
        var d = new Date();
        var txt = d.getDate() + "_" + (parseInt(d.getMonth()) + 1) + "_" + d.getFullYear();
        downloadCanvas(this, "rendered", "decoupage_" + txt + ".png");
    });
    $("#share").click(function (e) {
        upload();
        e.preventDefault();
    });

    function downloadCanvas(link, canvasId, filename) {
        link.href = document.getElementById(canvasId).toDataURL();
        link.download = filename;
    }
});
