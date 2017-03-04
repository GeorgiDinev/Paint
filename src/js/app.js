"use strict";

var canvas = $('#canvas');




var canvasEventHandler = new CanvasEventHandler(canvas);
var menuEventHandler = new MenuEventHandler(canvas);

var indexHtmlEventListener = new IndexHtmlEventListener(canvas);

indexHtmlEventListener.addHandler(canvasEventHandler);
indexHtmlEventListener.addHandler(menuEventHandler);

