AFRAME.registerComponent('scale-by-camdistance',
    {
        schema: {
            factor: { type: 'number', default: 1.0 },
            clamp: {type: 'number', default:3.0}
        },
        init: function () {
            this.camObject3D = null;
        },
        tick: function (time, deltaTime) {
            this.camObject3D = $("a-entity[camera]")[0].object3D;

            var zeroVec = new THREE.Vector3();
            var posGlobal = this.el.object3D.localToWorld(zeroVec);

            distance = this.getDistance(this.camObject3D.position, posGlobal);
            var scaleVec = new THREE.Vector3(distance, distance, distance);
            scaleVec.multiplyScalar(this.data.factor);
            this.el.setAttribute('scale', scaleVec);
        },
        getDistance: function(v1, v2) {
            var dx = v1.x - v2.x;
            var dy = v1.y - v2.y;
            var dz = v1.z - v2.z;

            return Math.sqrt(dx * dx + dy * dy + dz * dz);
        }
    });