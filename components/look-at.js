AFRAME.registerComponent('look-at',
    {
        schema: {
            src: { type: 'string' },
            alterAxis: { type: 'array', default: [true, true, true] }
        },
        init: function () {
            this.startRotation = jQuery.extend({}, this.el.object3D.rotation);
            this.target3D = null;
            this.vector = new THREE.Vector3();
            this.target3D = $(this.data.src)[0].object3D;
        },
        tick: function(time, deltaTime) {
            if (this.target3D) {
                this.el.object3D.lookAt(this.vector.setFromMatrixPosition(this.target3D.matrixWorld));
                var alterAxis = this.data.alterAxis;

                if (alterAxis[0] == "false")
                    this.el.object3D.rotation.x = this.startRotation.x;

                if (alterAxis[1] == "false")
                    this.el.object3D.rotation.y = this.startRotation.y;

                if (alterAxis[2] == "false")
                    this.el.object3D.rotation.z = this.startRotation.z;

            }
        }
    });