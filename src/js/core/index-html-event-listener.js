"use strict";


var IndexHtmlEventListener = (function(){

    function CanvasEventListener(canvas){
        this._canvas = canvas;
        this._commandName = "";
        this._figureType = "";
        this._eventHandlers = [];
        this._canvasOffset = this._canvas.offset();
        this._offsetX = this._canvasOffset.left;
        this._offsetY = this._canvasOffset.top;
        this._startX = this._startY = null;
        this._isDrawing = false;
        this._shapeColor = $('#colorPicker').val();

        initCanvasEventListeners(this);


    }

    function initCanvasEventListeners(context, disabled) {

        var onMouseDown = function (e){
            handleMouseDown(e, context);
            console.log('mousedown');
        };

        var onMouseUp = function (e){
            handleMouseUp(e, context);
            console.log('mouseup');
        };

        var onMouseMove =function (e){
            handleMouseMove(e, context);
            console.log('mousemove');
        };


        if(!disabled){
            context._canvas
                .on('mousedown', onMouseDown)
                .on('mouseup', onMouseUp)
                .on('mousemove', onMouseMove );
        }else {// TODO: does not work, performance bottleneck?
            context._canvas.unbind('mousemove',  onMouseMove);
            context._canvas.unbind('mouseup',  onMouseUp);
            context._canvas.unbind('mousedown', onMouseDown);
        }

        $('#colorPicker').on('change', function(){
            throwEvent(new ColorPickerValueChangedEvent($(this).val()), context);
        });
    }

// in case of select and draw actions
    function handleMouseMove(e, context) {

        if (context._isDrawing && (context._commandName === DRAW_COMMAND)) {
            var mouseX = parseInt(e.clientX - context._offsetX);
            var mouseY = parseInt(e.clientY - context._offsetY);

            var newWidth = mouseX - context._startX;
            var newHeight = mouseY - context._startY;

            var layerGroupName = LayerGroupUtil.getCurrentLayerGroupNumber();
            console.log(layerGroupName);
            if(context._figureType){
                var deleteLayerGroupEvent = getDeleteLayerGroupEvent(layerGroupName);
                throwEvent(deleteLayerGroupEvent, context);

                var drawFigureEvent = getDrawFigureEvent(context, layerGroupName, newWidth, newHeight);
                throwEvent(drawFigureEvent, context);
            }else {
                throw new Error('figure type not selected');
            }

        }
    }

    function getDeleteLayerGroupEvent(layerGroupName){
        return new DeleteLayerGroupEvent(layerGroupName);
    }

    function getDrawFigureEvent(context, layerGroupName, width, height) {
        return new DrawFigureEvent({
            context: context._canvas,
            x: context._startX,
            y: context._startY,
            width: width,
            height: height,
            figureType: context._figureType,
            color: context._shapeColor,
            layerGroupName: layerGroupName
        })
    }
    function handleMouseUp(e, context) {
        if(context._isDrawing){
            LayerGroupUtil.incrementCurrentLayerGroupNumber();
        }
        context._isDrawing = false;
        context._canvas.css('cursor', 'default');
    }

    function handleMouseDown(e, context) {

        context._canvas.css('cursor', DRAGGING_CURSOR);
        context._isDrawing = true;
        context._startX = parseInt(e.clientX - context._offsetX);
        context._startY = parseInt(e.clientY - context._offsetY);
        context._shapeColor = $('#colorPicker').val();

    }

    function throwEvent(event, context){
        context._eventHandlers.forEach(function(el){
            el.handleEvent(event);
        });
    }



    function onFigureTypeChanged(figureTypeName){
        this._figureType = figureTypeName;
    }

    function onMenuCommandChanged(commandName){
        this._commandName = commandName;
        throwEvent(new MenuCommandChangedEvent(commandName), this)
    }
    CanvasEventListener.prototype.onFigureTypeChanged = onFigureTypeChanged;

    CanvasEventListener.prototype.onCommandNameChanged = onMenuCommandChanged;

    CanvasEventListener.prototype.addHandler = function(handler){
        this._eventHandlers.push(handler);
    };

    return CanvasEventListener;
})();

