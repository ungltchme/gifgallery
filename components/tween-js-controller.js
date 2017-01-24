AFRAME.registerComponent('tween-js-controller',
    {
        tick: function(time, deltaTime) {
            TWEEN.update(time);
        }
    });