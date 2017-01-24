AFRAME.registerComponent('follow-cam', {
    init:function() {
        this.target3D = $("a-entity[camera]")[0].object3D;
    },
    tick: function(time, deltaTime) {
        if (this.target3D) {
            this.vector = new THREE.Vector3();
            this.el.setAttribute("position", this.vector.setFromMatrixPosition(this.target3D.matrixWorld));

        }
    }
});