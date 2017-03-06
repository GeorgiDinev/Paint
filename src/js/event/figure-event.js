"use strict";

Function.prototype.extends = function(parent){
    if (!Object.create) {
        Object.create = function (proto) {
            function F() {};
            F.prototype = proto;
            return new F();
        };
    }

    this.prototype = Object.create(parent.prototype);
    this.prototype.constructor = this;
};

var FigureEvent = (function(){

    function FigureEvent(figure) {
        if(this.constructor === FigureEvent){ // make the class abstract
            throw new Error('DrawFigureEvent is an abstract class!');
        }

        this.x = figure.x;
        this.y = figure.y;
        this.width = figure.width;
        this.height = figure.height;
        this.figureType = figure.figureType;
        this.color = figure.color;
        this.layerGroupName = figure.layerGroupName;
    }

    return FigureEvent;
})();

var DrawFigureEvent = (function(){

    function DrawFigureEvent(figure) {
        FigureEvent.call(this, figure)
    }

    DrawFigureEvent.extends(FigureEvent);
    return DrawFigureEvent;
})();

var DeleteLayerGroupEvent = (function(){

    function DeleteLayerGroupEvent(layerGroupName) {
        this.layerGroupName = layerGroupName;
    }
    return DeleteLayerGroupEvent;
})();

var PaintEvent = (function () {
    function PaintEvent(layerName, fillStyle) {
        this.layerName = layerName;
        this.fillStyle = fillStyle;
    }

    return PaintEvent;
}());

