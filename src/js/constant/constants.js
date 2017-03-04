var DEFAULT_SHAPE_COLOR ="#000",
    DRAGGING_CURSOR = "crosshair",
    CANVAS_EXPORT_IMG_FILE_NAME = 'canvas-img',
    CANVAS_EXPORT_IMG_FILE_EXTENSION = 'png',
    CANVAS_EXPORT_FILE_NAME = 'canvas-export.txt',
    CANVAS_EXPORT_MIME_TYPE = '"text/plain;charset=utf-8"';


var FIGURE_TYPE_RECTANGLE = "Rectangle",
    FIGURE_TYPE_Ellipse = "Ellipse",
    FIGURE_TYPE_LINE = "Line";

var DRAW_COMMAND = 'draw',
    SELECT_COMMAND = 'select',
    DELETE_FIGURE_COMMAND = 'delete',
    PAINT_FIGURE_COMMAND = 'paint',
    CANVAS_IMG_SAVE_COMMAND = 'save',
    CANVAS_JSON_EXPORT_COMMAND = 'exportJSON';
    CANVAS_JSON_IMPORT_COMMAND = 'importJSON';

var FIGURE_PROPERTIES = ['type', 'layer', 'draggable', 'groups', 'strokeStyle' ,'fillStyle',
    'strokeWidth', 'x', 'y', 'width', 'height', 'x1', 'x2', 'y1', 'y2'];
