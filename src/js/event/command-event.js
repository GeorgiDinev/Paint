"use strict";

var MenuCommandChangedEvent  = (function () {
    function MenuCommandChangedEvent(commandName) {
        this.commandName = commandName;
    }

    return MenuCommandChangedEvent;
}());


var ColorPickerValueChangedEvent = (function () {
    function ColorPickerValueChangedEvent(color) {
        this.color = color;
    }

    return ColorPickerValueChangedEvent;
}());
