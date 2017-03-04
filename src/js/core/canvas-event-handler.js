$.jCanvas.defaults.fromCenter = false;

var CanvasEventHandler = (function(){

    function CanvasEventHandler(canvas){
        var STROKE_WIDTH = 4;
        this._canvas = canvas;

        this.draw = function draw(figureType, x, y, width, height, color, layerGroup){
            switch (figureType){
                case FIGURE_TYPE_RECTANGLE :{ // TODO: function
                    this._canvas.drawRect({
                        layer: true,
                        groups: [layerGroup],
                        //dragGroups: [layerGroup],
                        type: 'rectangle',
                        draggable: false,
                        strokeStyle: color,
                        strokeWidth: STROKE_WIDTH,
                        x: x, y: y,
                        width: width,
                        height: height
                    });
                    break;
                }
                case FIGURE_TYPE_Ellipse:{
                    this._canvas.drawEllipse({
                        layer: true,
                        type: 'ellipse',
                        draggable: false,
                        groups: [layerGroup],
                        strokeStyle: color,
                        strokeWidth: STROKE_WIDTH,
                        x: x, y: y,
                        width: width,
                        height: height
                    });
                    break;
                }
                case FIGURE_TYPE_LINE:{
                    canvas.drawLine({
                        layer: true,
                        type: 'line',
                        draggable: false,
                        groups: [layerGroup],
                        strokeStyle: color,
                        strokeWidth: STROKE_WIDTH,
                        x1: x, y1: y,
                        x2:  width + x, y2:  height + y
                    });
                    break;
                }

                default:
                    throw new Error('Figure type: ' + figureType + ' not supported');
            }
        };

        this.deleteLayerGroup = function deleteLayerGroup(layerGroupName){
            canvas.removeLayerGroup(layerGroupName);
            canvas.drawLayers();
        }

    }


    CanvasEventHandler.prototype.handleEvent = function(event) {
        if (event instanceof DrawFigureEvent) {
            this.draw(event.figureType, event.x, event.y, event.width, event.height, event.color, event.layerGroupName);

        } else if (event instanceof DeleteLayerGroupEvent) {
            this.deleteLayerGroup(event.layerGroupName);
        }
    }
    return CanvasEventHandler;
})();
