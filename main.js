// Закомментированный код с применением jQuery
var canvas;
var ctx;
var timerId;
var arrRect = [];
var countScore;

window.onload = function () {
    var btnStart = document.getElementById("start");
    var btnStop = document.getElementById("stop");
    countScore = document.getElementById("score");
    
            btnStart.onclick = function () {
                if (!btnStart.classList.contains("started")) {
                    btnStart.classList.add('started');
                    countScore.textContent = 0;

                    (function runInterval() {
                        var randTime = 2500 * Math.random();
                        timerId = setTimeout(function () {
                            addElem();
                            runInterval();
                        }, randTime);
                    })();

                    animate();
                    canvas.onmousedown = canvasClick;
                }
            }
        
            btnStop.onclick = function () {
                clearField();
                btnStart.classList.remove("started");
            }
        
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
}

/* $(function () { 
    $("#start").click(function () {
        if (!$("#start").hasClass("started")) {
            $("#start").addClass("started");
            $("#score").text(0);
            
            (function runInterval() {
                var randTime = 2500 * Math.random();
                timerId = setTimeout(function () {
                    addElem();
                    runInterval();
                }, randTime);
            })();
 
            animate();
            canvas.onmousedown = canvasClick;
        }
    });
 
    $("#stop").click(function () {
        clearField();
        $("#start").removeClass("started");
    });
 
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
}); */


// Функция-конструктор элемента
function ElemRect() {
    this.elemWidth = 20;
    this.elemHeight = 20;
    this.speed = 2 * Math.random();
    this.fillColor = this.randomColor();
    this.strokeColor = "black";
    var randX = Math.random() * canvas.clientWidth - this.elemWidth;
    this.x = (randX < 0) ? 0 : randX;
    this.y = 0;
}

ElemRect.prototype.randomColor = function () {
    var r = this.randomInteger(0, 255);
    var g = this.randomInteger(0, 255);
    var b = this.randomInteger(0, 255);
    return "rgb(" + r + "," + g + "," + b + ")";
}

ElemRect.prototype.randomInteger = function (min, max) {
    var rand = min + Math.random() * (max + 1 - min);
    rand = Math.floor(rand);
    return rand;
}

// Создание и сохранение элемента в массиве
function addElem() {
    var elemRect = new ElemRect();
    arrRect.push(elemRect);
}

// Функция анимации
function animate() {
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
    for (var i = 0; i < arrRect.length; i++) {
        var currentRect = arrRect[i];
        ctx.beginPath();
        currentRect.y += currentRect.speed;
        ctx.fillStyle = currentRect.fillColor;
        ctx.rect(currentRect.x, currentRect.y, currentRect.elemWidth, currentRect.elemHeight);
        ctx.lineWidth = 0.4;
        ctx.fill();
        ctx.stroke();
    }
    requestAnimationFrame(animate);
}

// Функция очистки поля
function clearField() {
    for (var i = 1; i <= timerId; i++) {
        clearTimeout(i);
    }
    arrRect = [];
}

// Функция удаления элементов с поля
function canvasClick(e) {
    var count = +countScore.textContent;
    // var count = +$("#score").text();

    for (var i in arrRect) {
        var elemRect = arrRect[i];
        // Координаты щелчка мышью относительно canvas
        var posX = e.pageX - canvas.offsetLeft;
        var posY = e.pageY - canvas.offsetTop;

        if ((posX >= elemRect.x) && (posX <= elemRect.x + elemRect.elemWidth)) {
            if ((posY >= elemRect.y) && (posY <= elemRect.y + elemRect.elemHeight)) {
                arrRect.splice(i, 1);
                countScore.textContent = ++count;
                // $("#score").text(++count);                
                return;
            }
        }
    }
}

