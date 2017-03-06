"use strict";

var _currentLaterGroupNumber = 0;

function LayerGroupUtil(){
}

LayerGroupUtil.incrementCurrentLayerGroupNumber = function(){
    _currentLaterGroupNumber++;
};

LayerGroupUtil.getCurrentLayerGroupNumber = function(){
    return _currentLaterGroupNumber;
};

LayerGroupUtil.updateCurrentLayerGroupsNumber = function(layerGroups){
    if(layerGroups !== []){
        var layerGroupsNumbers = [];

        layerGroups.forEach(function(layer){
            layerGroupsNumbers.push(layer.groups[0]);
        });
        _currentLaterGroupNumber = Math.max.apply(Math, layerGroupsNumbers);
        _currentLaterGroupNumber++;
    }
};
