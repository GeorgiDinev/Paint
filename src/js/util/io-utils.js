function IOUtils() {

}

IOUtils.getBase64EncodedCanvasImg = function(canvas, format, quality){
    return canvas.getCanvasImage(format, quality).replace(('image/' + format), 'image/octet-stream');
};

IOUtils.saveFile = function(content, fileName, mimeType){ // TODO: does not work with firefox

    var file = new File([content], fileName, {type: mimeType});
    saveAs(file);
};


IOUtils.saveCanvasImage = function(content, fileName){
    var link = document.createElement('a');

    link.setAttribute('href', content);
    link.setAttribute('download', fileName);
    link.click();
};



IOUtils.load = function load(){
    var fileInput = $('#canvas-json-import');

    if (!window.FileReader) {
        alert('Your browser is not supported');
        return false;
    }
    var input = fileInput.get(0);

    var reader = new FileReader();
    if (input.files.length) {
        var textFile = input.files[0];
        reader.readAsText(textFile);
        $(reader).on('load', processFile);
    } else {
        alert('Please upload a file before continuing')
    }
}

function processFile(e) {
    console.log('proccessFile');
    var file = e.target.result;
    if (file && file.length) {
        var canvasJsonImport = JSON.parse(file);
        canvas.removeLayers().drawLayers();

        canvasJsonImport.forEach(function(loadedlayer){
            canvas.addLayer(loadedlayer);
        });
        canvas.drawLayers();
    }
}

