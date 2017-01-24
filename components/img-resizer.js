AFRAME.registerComponent('img-resizer',
    {
        schema: {
            src: { type: 'string' },
            baseWidth: { type: 'int', default: 1 },
            boxdepth: { type: 'array', default: [] }
        },

        init: function() {

            var thisEl = this;

            var imgSelector = this.data.src;
            var imgSelectorClean = imgSelector.replace('#', '');

            var assetElement = $("a-assets").children("[id=" + imgSelectorClean + "]")[0];

            if (assetElement == null || assetElement.naturalWidth == 0) {
                setTimeout(function () {
                        thisEl.init();
                    },
                    100);
                return;
            } else {
                thisEl.rescale(assetElement.naturalWidth, assetElement.naturalHeight);
            }
        },

        rescale: function (width, height) {
            var ratio = height / width;

            var newWidth = this.data.baseWidth;

            var newHeight = ratio * newWidth;

            var newDepth = this.data.boxdepth[0] == "sameAsHeight" ? newHeight : this.data.boxdepth * newWidth;

            this.el.setAttribute('scale', { x: newWidth, y: newHeight, z: newDepth });
        }
    });