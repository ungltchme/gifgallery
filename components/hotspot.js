AFRAME.registerComponent('hotspot',
    {
        schema: {
            id: { type: 'int', default: 1 }
        },
        init: function() {
            this.sceneController = $("a-scene[scene-controller]")[0].components["scene-controller"];

            var thisEl = this;
            $(this.el).click(function (evt) {
                thisEl.activate();
            });
        },
        activate: function() {
            this.sceneController.activateHotspot(this.data.id);
        }
    });