var MenuCommandHandler = (function () {
    function MenuCommandHandler(canvas) {
        this._canvas = canvas;
        this._color = DEFAULT_SHAPE_COLOR;
    }

    MenuCommandHandler.prototype.handleEvent = function(event){
        if(event instanceof ColorPickerValueChangedEvent){
            this._color = event.color;
            console.log('Color changed Event Handled');
        }

        if(event instanceof MenuCommandChangedEvent){

            var canvas = this._canvas;
            var color = this._color;

            var clickCallBackFunction = {
                    delete: function (layer) {
                        canvas.removeLayer(layer).drawLayers();
                    },
                    paint: function(layer){
                        console.log('layer drawn');
                        layer.fillStyle = color;
                        layer.strokeStyle = color;
                        canvas.drawLayer(layer);
                    }
                };

            this._canvas.setLayers({
                    draggable: event.commandName === SELECT_COMMAND,
                    click: clickCallBackFunction[event.commandName]
            }).drawLayers();

            if (event.commandName === CANVAS_IMG_EXPORT){
                var exportedImgUrl = IOUtils.exportCanvasImage(canvas, CANVAS_EXPORT_IMG_FILE_EXTENTION, 1);
                HtmlAppender.appendAnchorToHtml('export.', CANVAS_EXPORT_IMG_FILE_EXTENTION, exportedImgUrl, document.getElementById('export'))
            }
        }


    };
       return MenuCommandHandler;
}());
