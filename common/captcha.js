export const Captcha = (txt,cnvs)=>{
    var canvas = document.getElementById(cnvs?cnvs:'cnvs'),
        ctx = canvas.getContext('2d'),
        unite = 10,
        width = unite * 18,
        height = unite * 4.5,
        rotates = [];
        for(var i=0; i< txt.length;i++){
            rotates.push(Math.random() -0.5);
        }

    function __Constructor(){
        canvas.height = height;
        canvas.width = width;
        drawFrame();
    }

    function drawFrame(){
        var i = 0;
        canvas.height=height;
        while(++i < 6) {
            drawPhase();
        }
        drawPhase('#454545');
        setTimeout(drawFrame, 80);
    }

    function drawPhase(fill){
        ctx.fillStyle = fill || (Math.random() > 0.5 ? '#003366' : '#FF6666');
        ctx.textAlign = 'center';
        drawWord(txt);
        drawNoise(5);
        //requestAnimationFrame(drawPhase);
    }

    function drawWord(word){
        for(var i=0; i< txt.length; i++){
            putText(unite* 2 * (i+1), unite* 2, word.charAt(i), unite* 3, 0.01);
        }
    }

    function drawNoise(noise){
        var i,
            char;
        for(i = 0; i < noise; i++) {
            char = Math.random() > 0.5 ? '+' : Math.random().toString(32)[3];
            putText(Math.random() * width, Math.random() * height, char, unite* 2 * Math.random());
        }
    }

    function putText(x, y, text, size, rotate) {
        if(rotate) {
            rotate += (Math.random() * 0.5) - 0.25
        }
        ctx.font = (Math.random() > 0.5 ? 'bold ' : '') + size + 'px \'Cutive Mono\'';
        ctx.save();
        ctx.translate(x + (Math.random() * 5) - 2.5, y + (Math.random() * 5) - 2.5);
        ctx.rotate(rotate || Math.random() -0.5);
        ctx.fillText(text, 0, (size * 0.75) / 2);
        ctx.restore();
    }

    __Constructor();
}

