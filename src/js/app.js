"use strict";

var canvas = $('#canvas');




var figureDrawEventHandler = new CanvasEventHandler(canvas);
var menuCommandHandler = new MenuCommandHandler(canvas);

var canvasEventListener = new CanvasEventListener(canvas);

canvasEventListener.addHandler(figureDrawEventHandler);
canvasEventListener.addHandler(menuCommandHandler);
