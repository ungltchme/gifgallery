AFRAME.registerComponent('gif-box',
    {
        init: function () {
            var thisEl = this;
            var imgSelector = $(this.el).attr('asset');
            var imgSelectorClean = imgSelector.replace('#', '');



            $(this.el).click(function (evt) {
                if ($.customComponents.crazyBG == false)
                    $.customComponents.sceneController.setSkyMode(true);

                $.customComponents.sceneController.setSky(imgSelectorClean);
            });


            $(this.el).attr('visible', 'false');

            var assetElement = $("a-assets").children("[id=" + imgSelectorClean + "]")[0];

            if (assetElement == null || assetElement.naturalWidth == 0) {
                setTimeout(function () {
                        thisEl.init();
                    },
                    100);
                return;
            } else {
                thisEl.setup(imgSelector);
            }
        },
        setup: function (imgSelector) {

            var shader = $.customComponents.sceneController.b == 1 ? 'flat' : 'gif';

            this.el.removeAttribute("material");
            this.el.setAttribute("material", 'shader:' + shader + '; src:' + imgSelector);

            var thisEl = this;
            //TODO find better way to not show white boxes
            setTimeout(function () {
                $(thisEl.el).attr('visible', 'true');
            }, 1000);

        }
    });