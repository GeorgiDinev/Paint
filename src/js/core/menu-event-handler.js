"use strict";

var MenuEventHandler = (function () {
    function MenuEventHandler(canvas) {
        this._canvas = canvas;
        this._color = DEFAULT_SHAPE_COLOR;

    }

    MenuEventHandler.prototype.handleEvent = function(event){
        if(event instanceof ColorPickerValueChangedEvent){
            this._color = event.color;
            return;
        }

        if(event instanceof MenuCommandChangedEvent){

            var canvas = this._canvas;
            var color = this._color;

            var clickCallBackFunctions = {
                delete: function (layer) {
                    canvas.removeLayer(layer).drawLayers();
                },
                paint: function(layer){
                    layer.fillStyle = color;
                    layer.strokeStyle = color;
                    canvas.drawLayer(layer);
                }
            };
            this._canvas.setLayers({
                    draggable: event.commandName === SELECT_COMMAND,
                    click: clickCallBackFunctions[event.commandName]
            }).drawLayers();

            if (event.commandName === CANVAS_IMG_SAVE_COMMAND){
                saveCanvasImage();

            }else if (event.commandName === CANVAS_JSON_EXPORT_COMMAND){
                exportCanvasFile();
            }else if(event.commandName === CANVAS_JSON_IMPORT_COMMAND){
                loadCanvasFromJson();
            }
        }


        function saveCanvasImage() {
            var base64EncodedCanvasImg = IOUtils.getBase64EncodedCanvasImg(canvas, CANVAS_EXPORT_IMG_FILE_EXTENSION, 1);

            var fileName = CANVAS_EXPORT_IMG_FILE_NAME + '.' + CANVAS_EXPORT_IMG_FILE_EXTENSION;
            IOUtils.saveCanvasImage(base64EncodedCanvasImg, fileName, document.getElementById('container'));
        }

        function exportCanvasFile(){
            var allCanvasLayers = canvas.getLayers();

            var JsonCanvasLayers = JSON.stringify(allCanvasLayers, FIGURE_PROPERTIES);

            IOUtils.saveFile(JsonCanvasLayers, CANVAS_EXPORT_FILE_NAME, CANVAS_EXPORT_MIME_TYPE);
        }
        function loadCanvasFromJson() {
            IOUtils.loadJSONDataFromFIle($('#canvas-json-import'), function (loadedLayers) {
                canvas.removeLayers().drawLayers();

                loadedLayers.forEach(function (layer) {
                    canvas.addLayer(layer);
                });
                LayerGroupUtil.updateCurrentLayerGroupsNumber(loadedLayers);
                canvas.drawLayers();
            });
        }

    };
       return MenuEventHandler;
}());
