AFRAME.registerComponent('tween-cam',
    {
        schema: {
            onclick: {
                type:'bool',
                default:'false'
            }
        },
        init: function () {

            this.sceneController = $("a-scene[scene-controller]")[0].components["scene-controller"];

            this.el.setAttribute("geometry", "primitive:sphere");
            this.el.setAttribute("material", "shader:flat;color:" + this.el.getAttribute("color"));

            var thisEl = this;

            $(this.el).click(function (evt) {
                if (thisEl.sceneController.isChangingHotspot)
                    return;

                if (thisEl.data.onclick == true)
                    thisEl.startTween();
            });
        },

        startTween: function() {
            var thisEl = this;

            if (thisEl.sceneController.isChangingHotspot)
                return;

            var camPos = $("a-entity[camera]")[0].getAttribute('position');
            var newPos = new THREE.Vector3();
            newPos.setFromMatrixPosition(this.el.object3D.matrixWorld);
            var tween = new TWEEN.Tween(camPos)
                .to({ x: newPos.x, y: newPos.y, z: newPos.z }, 1500)
                .onUpdate(function () {
                    $("a-entity[camera]")[0].setAttribute('position', camPos);
                })
                .onStart(function() {
                    thisEl.sceneController.isChangingHotspot = true;
                })
                .onComplete(function() {
                    thisEl.sceneController.isChangingHotspot = false;
                })
                .easing(TWEEN.Easing.Cubic.InOut)
                .start();
        }
    });