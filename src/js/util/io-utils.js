function IOUtils() {

}
IOUtils.exportCanvasImage = function(canvas, format, quality){ // TODO: implement
    var output = canvas.getCanvasImage(format, quality );

    document.getElementById('img-output').innerHTML = output;
    console.log('output export: ' + output);
};
