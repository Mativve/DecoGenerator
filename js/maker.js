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
    $("#add").on('click', function () {
        if ($elements.find(".row").length == 15) {
            alert("Nie możesz dodać więcej warstw!");
        } else {

            ids++;

            if (ids == 1) currentId = "c1";

            $canvasy.append("<canvas id='c" + ids + "' data-x='" + xcenter + "' data-y='" + ycenter + "' data-r='0' data-size='52' data-font='Arimo' data-text='Twój tekst' data-color='#000' data-align='center'></canvas>");



            $elements.append("<div class='row'><button data-id='c" + ids + "' class='select'>Warstwa" + ids + "</button><button data-id='c" + ids + "' class='remove'><span><i class='fas fa-trash-alt'></i></span></button></div>");

            resizeCanvas("c" + ids);
        }
    });

    $(".elements").on("click", "button", function () {

        if ($(this).hasClass("select")) {
            //zmien id
            console.log("Tryb pobierania warstwy");
            $(".elements .row").removeClass("active");
            $(this).parent().addClass("active");

            currentId = $(this).data("id");
            ccanv = $("#" + currentId);

            //Pobranie wartości
            $("#yt").val($("#" + currentId).data("text"));
            $("#font").val($("#" + currentId).data("font"));
            editCanvas();
        } else if ($(this).hasClass("remove")) {
            //usun layer
            console.log("Tryb usuwania warstwy");
            var id = $(this).data("id");

            if (confirm("Czy chcesz usunąć warstwę " + id)) {
                $("#" + id).remove();
                $(this).parent().remove();
                console.log("Usunięto warstwę:" + id);
            }
        }

    });

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
    
    $(".align").on("click", function () {
        changeAlign($(this).data("align"));
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

    function colorChange(col) {
        var color = ccanv.data("color");
        color = col;
        ccanv.attr("data-color", color);
        ccanv.data("color", color);
        editCanvas();
    }
    
    function changeAlign(a){
        var ca = ccanv.data("align");
        ca = a;
        ccanv.attr("data-align", ca);
        ccanv.data("align", ca);
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
        var align = ccanv.data("align");

        var fontColor = ccanv.data("color");

        var fsize = ccanv.data("size");
        var font = ccanv.data("font");

        ctx.font = fsize + "px " + font;
        ctx.textAlign = align;
        ctx.textBaseline = "middle";

        ctx.rotate(r * Math.PI / 180);

        ctx.fillStyle = fontColor;

        
        var lineheight = fsize;
        var lines = text.split('\n');

        for (var i = 0; i<lines.length; i++)
            ctx.fillText(lines[i], x, y + (i*lineheight) );        

    }

    function resizeCanvas(id) {
        var cW = $canvasy.width();
        var cH = $canvasy.height();

        $(".canvasy #" + id).attr("width", cW);
        $(".canvasy #" + id).attr("height", cH);
    }

    //Wygenerowanie obrazka
    var mirror = false;
    function generated(){
        if ($(".elements .row").length == 0) {
            alert("Przez sprawdzeniem podglądu musisz utworzyć transfer!");
            return;
        }        
        console.log("Generowanie transferu...");
        
        $(".image").html("");
        
        if(mirror){
            $(".canvasy").css({
                "transform": "scale(-1, 1)"
            });              
        }
        
        
        html2canvas(document.querySelector(".canvasy")).then(canvas => {
            document.querySelector(".image").append(canvas);
            other();
        });
        
        function other(){
        if(mirror){
            $(".canvasy").css({
                "transform": "scale(1, 1)"
            });              
        }
            
            $(".image canvas").attr("id","downloadcanvas");
            
            var link = document.getElementById("downloadcanvas").toDataURL();
            $(".image").append("<img src='"+link+"' alt='Transfer'/>");
        }
    }
                              

    $("#download").click(function(){
        var anchor = document.getElementById("download");
        var today = new Date();
        var sec = today.getSeconds();
        var dd = today.getDate();
        var mm = today.getMonth() + 1; //January is 0!
        var yyyy = today.getFullYear();
        today = "Transfer"+sec+''+mm + '' + dd + '' + yyyy;        
        downloadCanvas(anchor, "downloadcanvas", today);
    });

    function downloadCanvas(link, canvasId, filename) {
        link.href = document.getElementById(canvasId).toDataURL();
        link.download = filename + ".png";
    } 
    
    $("#wygeneruj").click(function(){mirror=false;generated();});
    $("#wygenerujmirr").click(function(){mirror=true;generated();});
});
