AFRAME.registerComponent('scene-controller',
    {
        init: function() {

            if (/Mobi/.test(navigator.userAgent)) {
                this.isMobile = true;
            }

            this.isChangingHotspot = false;

            this.sky = $("a-sky")[0];
            this.sunSky = $("a-sun-sky")[0];

            this.currentHotspots = [];
            this.activeHotspotAmount = 1;

            var thisEl = this;

            this.setPlanesToWireframe();

            /// Defining custom components and classes

            $.customComponents = {};

            $.customComponents.sceneController = this;
            $.customComponents.crazyBG = false;

            $.customComponents.layoutTemplate = function(template, data) {
                this.template = template;
                this.data = data;
            };

            $.customComponents.mapping = {};
            $.customComponents.mapping.alternating = "alternating";
            $.customComponents.mapping.random = "random";

            var aScene = $("a-scene");
            $(aScene).on("enter-vr", function() {
                $.customComponents.vrMode = true;
                console.log("Entering vr.");
                thisEl.showHotspotSpheres(thisEl.currentHotspots[thisEl.currentHotspots.length-1].hotspotID);
            });

            $(aScene).on("exit-vr", function() {
                $.customComponents.vrMode = false;
                console.log("Exiting vr.");

                thisEl.showHotspotSpheres(thisEl.currentHotspots[thisEl.currentHotspots.length-1].hotspotID);
            });

            $.customComponents.customAttribute = function(name, value) {
                this.name = name;
                this.value = value;
            };

            $.customComponents.hotspot = function(assetArray, exit, layoutTemplate, mapping) {
                this.assetArray = assetArray;

                this.exit = (typeof exit !== 'undefined') ? exit : new THREE.Vector3(0, 0, -1);

                // maps the index of a hotspot to an asset in the asset array! ["0 0", "1 1", "2 0", "3 1"] where the values represent "hotspotIndex assetIndex".
                // each hotspotIndex can only be set once per mapping
                this.mapping = mapping;

                this.layoutTemplate = (typeof layoutTemplate !== 'undefined')
                    ? layoutTemplate
                    : new $.customComponents.layoutTemplate("gif-box-cluster", null);

                this.hotspotID = null;
                this.hotspotElement = null;
                this.hotspotParent = null;
                this.isBuilt = false;
            };

            $.customComponents.asset = function(src, id) {
                this.src = src;
                this.id = id;
            };

            $.customComponents.getRandomInt = function(min, max) {
                min = Math.ceil(min);
                max = Math.floor(max);
                return Math.floor(Math.random() * (max - min)) + min;
            };

            $.customComponents.getUrlParameter = function getUrlParameter(sParam) {
                var sPageURL = decodeURIComponent(window.location.search.substring(1)),
                    sURLVariables = sPageURL.split('&'),
                    sParameterName,
                    i; };

            $.customComponents.getRandomColor = function() {
                var letters = '0123456789ABCDEF';
                var color = '#';
                for (var i = 0; i < 6; i++) {
                    color += letters[Math.floor(Math.random() * 16)];
                }
                return color;
            };

            var navDiv = $("<div></div>");
            $(navDiv).attr("id", "nav");

            var arrowLeft = $("<div></div>");
            $(arrowLeft).attr("class", "arrow-left");
            $(arrowLeft).appendTo(navDiv);

            var arrowRight = $(arrowLeft).clone().attr("class", "arrow-right").appendTo(navDiv);

            $(navDiv).appendTo("body");

            $(arrowLeft).click(function() {
                thisEl.gotoPreviousHotspot();
            });

            $(arrowRight).click(function() {
                thisEl.gotoNextHotspot();
            });

            $.customComponents.navDiv = navDiv;

            var topNav = $("<div>Press <strong>b</strong> to toggle background (or touch this).</div>");
            $(topNav).attr("id", "top-nav");
            $(topNav).appendTo("body");

            $(topNav).click(function() {
                $.customComponents.sceneController.setSkyMode(!$.customComponents.crazyBG);
            });

            /////////////////////////////////////////////

            this.hotspots = [
                new $.customComponents.hotspot(
                    [new $.customComponents.asset("https://i.giphy.com/l2R046dgGawl0i54A.gif", "pulp0"), new $.customComponents.asset("https://i.giphy.com/l2R05GDOfYH3E1G24.gif", "pulp1")],
                    new THREE.Vector3(1, 0, -1),
                    new $.customComponents.layoutTemplate(
                        "one-each-side",
                        [new $.customComponents.customAttribute("data-height", 4),
                            new $.customComponents.customAttribute("data-width", 8),
                            new $.customComponents.customAttribute("data-depth", 8),
                            new $.customComponents.customAttribute("data-boxdepth", 0.05),
                            new $.customComponents.customAttribute("data-sidedepth", 4)]),
                    $.customComponents.mapping.alternating),
                new $.customComponents.hotspot(
                    [new $.customComponents.asset("https://i.giphy.com/l4hLVztM04FbOT8Yg.gif", "psycho0"), new $.customComponents.asset("https://i.giphy.com/xTiQyqwdg8j7IsmEDu.gif", "psycho1")],
                    new THREE.Vector3(1, 0, -1),
                    new $.customComponents.layoutTemplate(
                        "one-each-side",
                        [new $.customComponents.customAttribute("data-height", 4),
                            new $.customComponents.customAttribute("data-width", 8),
                            new $.customComponents.customAttribute("data-depth", 8),
                            new $.customComponents.customAttribute("data-boxdepth", 0.05),
                            new $.customComponents.customAttribute("data-sidedepth", 4)]),
                    $.customComponents.mapping.alternating),
                new $.customComponents.hotspot(
                    [new $.customComponents.asset("https://i.giphy.com/3oGRFExXrcYwyAd9OE.gif", "abstract0"), new $.customComponents.asset("https://i.giphy.com/3o7WTNddMd4rfjeWHe.gif", "abstract1")],
                    new THREE.Vector3(1, 0, -1),
                    new $.customComponents.layoutTemplate(
                        "one-each-side",
                        [new $.customComponents.customAttribute("data-height", 4),
                            new $.customComponents.customAttribute("data-width", 8),
                            new $.customComponents.customAttribute("data-depth", 8),
                            new $.customComponents.customAttribute("data-boxdepth", 0.05),
                            new $.customComponents.customAttribute("data-sidedepth", 4)]),
                    $.customComponents.mapping.alternating),
                new $.customComponents.hotspot(
                    [new $.customComponents.asset("https://i.giphy.com/3o7WTH26ktc6kYkWgo.gif", "requiem0")],
                    new THREE.Vector3(0, 0, -1),
                    new $.customComponents.layoutTemplate(
                        "two-big-right-left",
                        [new $.customComponents.customAttribute("data-height", 4),
                            new $.customComponents.customAttribute("data-width", 8),
                            new $.customComponents.customAttribute("data-depth", 8),
                            new $.customComponents.customAttribute("data-boxdepth", 0.05),
                            new $.customComponents.customAttribute("data-sidedepth", 4)])),
                new $.customComponents.hotspot(
                    [new $.customComponents.asset("https://i.giphy.com/l2QZYIZU6fSTZbih2.gif", "love0")],
                    new THREE.Vector3(1, 0, 0),
                    new $.customComponents.layoutTemplate(
                        "two-big-forward-left",
                        [new $.customComponents.customAttribute("data-height", 4),
                            new $.customComponents.customAttribute("data-width", 8),
                            new $.customComponents.customAttribute("data-depth", 8),
                            new $.customComponents.customAttribute("data-boxdepth", 0.05),
                            new $.customComponents.customAttribute("data-sidedepth", 4)])),
                new $.customComponents.hotspot(
                    [new $.customComponents.asset("https://i.giphy.com/3osxYcz4vYKgdYYLJu.gif", "fear0")],
                    new THREE.Vector3(1, 0, -1),
                    new $.customComponents.layoutTemplate(
                        "gif-box-cluster",
                        [new $.customComponents.customAttribute("data-height", 4),
                            new $.customComponents.customAttribute("data-width", 8),
                            new $.customComponents.customAttribute("data-depth", 8),
                            new $.customComponents.customAttribute("data-boxdepth", "sameAsHeight"),
                            new $.customComponents.customAttribute("data-sidedepth", 4)])),
                new $.customComponents.hotspot(
                    [new $.customComponents.asset("https://68.media.tumblr.com/a5fe4f7b31b3a77f866b91b5f5e1a308/tumblr_o5kzsqNMeg1v1tvl6o1_500.gif", "shining0"), new $.customComponents.asset("https://68.media.tumblr.com/b3156de2853daf58c32ea981bc74e0d2/tumblr_o5kzsqNMeg1v1tvl6o2_r1_500.gif", "shining1")],
                    new THREE.Vector3(1, 0, -1),
                    new $.customComponents.layoutTemplate(
                        "one-each-side",
                        [new $.customComponents.customAttribute("data-height", 4),
                            new $.customComponents.customAttribute("data-width", 8),
                            new $.customComponents.customAttribute("data-depth", 8),
                            new $.customComponents.customAttribute("data-boxdepth", 0.05),
                            new $.customComponents.customAttribute("data-sidedepth", 4)]),
                    $.customComponents.mapping.alternating),
                new $.customComponents.hotspot(
                    [new $.customComponents.asset("https://i.giphy.com/3oGRFeOshQQSVIoUIo.gif", "intointo0"), new $.customComponents.asset("https://i.giphy.com/l4hLFJz7rNRn1H9pS.gif", "intointo1")],
                    new THREE.Vector3(1, 0, -1),
                    new $.customComponents.layoutTemplate(
                        "one-each-side",
                        [new $.customComponents.customAttribute("data-height", 4),
                            new $.customComponents.customAttribute("data-width", 8),
                            new $.customComponents.customAttribute("data-depth", 8),
                            new $.customComponents.customAttribute("data-boxdepth", 0.05),
                            new $.customComponents.customAttribute("data-sidedepth", 4)]),
                    $.customComponents.mapping.alternating),
                new $.customComponents.hotspot(
                    [new $.customComponents.asset("https://i.giphy.com/l4hLPbu6aopzonrkk.gif", "intothevoid")],
                    new THREE.Vector3(1, 0, -1),
                    new $.customComponents.layoutTemplate(
                        "one-each-side",
                        [new $.customComponents.customAttribute("data-height", 4),
                            new $.customComponents.customAttribute("data-width", 8),
                            new $.customComponents.customAttribute("data-depth", 8),
                            new $.customComponents.customAttribute("data-boxdepth", 0.05),
                            new $.customComponents.customAttribute("data-sidedepth", 4)])),
                new $.customComponents.hotspot(
                    [new $.customComponents.asset("https://i.giphy.com/3oGRFjm63p2QC1x8eQ.gif", "faces")],
                    new THREE.Vector3(1, 0, -1),
                    new $.customComponents.layoutTemplate(
                        "one-each-side",
                        [new $.customComponents.customAttribute("data-height", 4),
                            new $.customComponents.customAttribute("data-width", 8),
                            new $.customComponents.customAttribute("data-depth", 8),
                            new $.customComponents.customAttribute("data-boxdepth", 0.05),
                            new $.customComponents.customAttribute("data-sidedepth", 4)]))
            ];

            this.initHotspots();
            this.activateHotspot(0);
        },
        setPlanesToWireframe: function() {

            var planes = $("a-plane");
            var thisEl = this;

            if (planes == null || planes.length == 0) {
                setTimeout(function () {
                        console.log("Retry setting planes to wireframe.");
                        thisEl.setPlanesToWireframe();
                    },
                    100);
                return;
            } else {
                $(planes).each(function(index, element){
                    element.getObject3D('mesh').material.wireframe = true}
                );
            }
        },
        gotoPreviousHotspot: function() {
            var currentHotspot = this.currentHotspots[this.currentHotspots.length-1];
            if (currentHotspot != null)
                this.activateHotspot(currentHotspot.hotspotID-1);
        },
        gotoNextHotspot:function() {
            var currentHotspot = this.currentHotspots[this.currentHotspots.length-1];
            if (currentHotspot != null)
                this.activateHotspot(currentHotspot.hotspotID+1);
        },
        updateNavArrows: function(newHotspot) {

            var leftArrow = $($.customComponents.navDiv).children(".arrow-left")[0];
            var rightArrow = $($.customComponents.navDiv).children(".arrow-right")[0];

            if (newHotspot.hotspotID == 0) {
                $(leftArrow).attr("disabled", "");
            } else {
                $(leftArrow).removeAttr("disabled", "");
            }

            if (newHotspot.hotspotID == this.hotspots.length-1) {
                $(rightArrow).attr("disabled", "");
            } else {
                $(rightArrow).removeAttr("disabled", "");
            }

        },
        activateHotspot: function (id) {

            if (this.isChangingHotspot)
                return;

            var newHotspot = this.hotspots[id];

            if (newHotspot == null)
                return;

            console.log("Activating: " + id);
            this.updateNavArrows(newHotspot);

            if ($(newHotspot.hotspotElement)[0].components != null) {
                var tweenCam = $(newHotspot.hotspotElement)[0].components["tween-cam"];

                if (tweenCam != null)
                    tweenCam.startTween();
            }


            // loading all assets on demand
            for (var i = 0; i < newHotspot.assetArray.length; i++) {

                var assetExists = $(newHotspot.hotspotParent).children("a-entity[asset-id=" + newHotspot.assetArray[i].id + "]")[0];
                if (assetExists == null) {
                    var assetOnDemand = $("<a-entity></a-entity>");
                    $(assetOnDemand).attr('asset-on-demand', 'src:' + newHotspot.assetArray[i].src + '; customID:' + newHotspot.assetArray[i].id + '; crossorigin:true');
                    $(assetOnDemand).attr('visible', 'false');
                    $(newHotspot.hotspotParent).append(assetOnDemand);
                }
            }

            this.setupHotspot(newHotspot);
            this.showHotspotSpheres(id);

        },
        deactivateHotspot: function (oldHotspot, hardDelete) {
            if (oldHotspot == null)
                return;

            hardDelete = (typeof hardDelete !== 'undefined') ? hardDelete : false;

            var childrenTemplate = $(oldHotspot.hotspotParent).children("[template]");

            if (hardDelete) {

                childrenTemplate.each(function (index, element) {

                    element.parentNode.removeChild(element);

                });

                var assetOnDemand = $(oldHotspot.hotspotParent).children("[asset-on-demand]");
                $(assetOnDemand).removeAttr("asset-on-demand");
                $(assetOnDemand).removeAttr("asset-id");

                oldHotspot.isBuilt = false;

            } else {
                childrenTemplate.each(function (index, element) {

                    element.setAttribute("visible", "false");

                });
            }

        },
        showHotspotSpheres: function(id) {

            $(this.hotspots).each(function(index, element) {

                $(element.hotspotElement).attr("visible", false);

                if ($.customComponents.vrMode == true)
                    if (index == id || index == id+1 || index == id-1)
                        $(element.hotspotElement).attr("visible", true);

            });

        },
        setupHotspot: function (newHotspot) {

            var thisEl = this;
            var assetElement = $("img[id=" + newHotspot.assetArray[0].id + "]")[0];

            if (assetElement == null || assetElement.naturalWidth == 0) {
                setTimeout(function () {
                        console.log("Retry Hotspot set-up: waiting for assetElement to load the image.");
                        thisEl.setupHotspot(newHotspot);
                    },
                    100);
                return;
            } else {
                thisEl.setSky(newHotspot.assetArray[0].id);

                if (!newHotspot.isBuilt)
                    thisEl.setupBoxes(newHotspot);
                else
                    thisEl.reshowBoxes(newHotspot)
            }

            setTimeout(function() {
                thisEl.currentHotspots.push(newHotspot);

                if (thisEl.currentHotspots.length > thisEl.activeHotspotAmount)
                    thisEl.deactivateHotspot(thisEl.currentHotspots.splice(0, 1)[0]);

            }, 1200);

        },
        reshowBoxes: function(newHotspot) {
            var childrenTemplate = $(newHotspot.hotspotParent).children("[template]");
            childrenTemplate.each(function (index, element) {

                element.setAttribute("visible", "true");

            });
        },
        setupBoxes: function (newHotspot) {

            var boxCluster = $("<a-entity></a-entity>");
            $(boxCluster).attr('template', 'src:#' + newHotspot.layoutTemplate.template);

            if (newHotspot.layoutTemplate.data != null) {
                if (newHotspot.layoutTemplate.data.length > 0) {
                    $(newHotspot.layoutTemplate.data).each(function (index, element) {
                        $(boxCluster).attr(element.name, element.value);
                    });
                }
            }

            $(newHotspot.hotspotParent).append(boxCluster);

            this.findBoxes(newHotspot);
            newHotspot.isBuilt = true;

        },
        findBoxes: function(newHotspot) {

            var thisEl = this;
            var simpleBoxes = $(newHotspot.hotspotParent).find("[simple-box]");

            if (simpleBoxes == null || simpleBoxes.length == 0) {
                setTimeout(function () {
                        console.log("Retry Finding Boxes: waiting for templating engine to instantiate them.");
                        thisEl.findBoxes(newHotspot);
                    },
                    100);
                return;
            } else {
                this.setBoxSources(simpleBoxes, newHotspot);
            }

        },
        setBoxSources: function (simpleBoxes, newHotspot) {
            var thisEl = this;
            $(simpleBoxes).each(function (index, element) {

                var currentMapping = 0;
                if (newHotspot.mapping != null)
                    currentMapping = thisEl.determineCurrentMapping(newHotspot, index);

                var currentAsset = newHotspot.assetArray[currentMapping];
                if (currentAsset == null)
                    currentAsset = newHotspot.assetArray[0];

                var baseWidth = $(element).attr("data-basewidth");
                var depth = $(element).attr("data-boxdepth");
                $(element).attr("img-resizer", "src:#" + currentAsset.id + "; baseWidth:" + baseWidth + "; boxdepth:" + depth);
                $(element).attr("asset", "#" + currentAsset.id);
                $(element).attr("gif-box", "");

            });
        },
        determineCurrentMapping: function (newHotspot, index) {

            if (newHotspot.mapping == $.customComponents.mapping.alternating)
                return index % newHotspot.assetArray.length;

            if (newHotspot.mapping == $.customComponents.mapping.random)
                return $.customComponents.getRandomInt(0, newHotspot.assetArray.length);

            var element = $.Enumerable.From(newHotspot.mapping).Where(function (x) { return x.split(" ")[0] == index }).ToArray();

            if (element.length == 0) {
                console.log("Index " + index + " not found in mapping. Defaulting to first asset in array.")
                return 0;
            } else {
                console.log(index + "||" + element);
                return element[0].split(" ")[1];
            }

        },
        setSkyMode:function(crazy) {

            if (crazy) {
                $(this.sky).attr("visible", true);
                $(this.sunSky).attr("visible", false);

                var thisEl = this;
                if (this.currentHotspots[this.currentHotspots.length-1] == null) {
                    console.log("Retry changing skyMode");
                    setTimeout(function() {
                        thisEl.setSkyMode(crazy);
                    },100);

                } else {
                    var selector = this.currentHotspots[this.currentHotspots.length-1].assetArray[0].id;

                    this.setSky(selector);

                    $.customComponents.crazyBG = true;

                    $("a-plane").each(function(index, element) {
                        $(element).attr("visible", false);
                    });
                }

            } else {
                $(this.sky).attr("visible", false);
                $(this.sunSky).attr("visible", true);

                $.customComponents.crazyBG = false;

                $("a-plane").each(function(index, element) {
                    $(element).attr("visible", true);
                });

            }

        },
        setSky: function (selector) {
            //   return;
            if (this.sky == null)
                return;

            var shader = this.b == 1 ? 'flat' : 'gif';
            this.sky.setAttribute('material', 'shader:' + shader + '; src:#' + selector);

        },
        initHotspots: function () {

            var currentPos = new THREE.Vector3();

            for (var i = 0; i < this.hotspots.length; i++) {
                var hParentEntity = $("<a-entity></a-entity>");
                $(hParentEntity).attr('hotspot-parent', 'id:' + i);
                this.hotspots[i].hotspotParent = hParentEntity;

                var camScaleEntity = $("<a-entity tween-cam scale-by-camdistance=\"factor:0.04\"></a-entity>");
                $(hParentEntity).append(camScaleEntity);
                $(camScaleEntity).attr('hotspot', 'id:' + i);
                $(camScaleEntity).attr('color', "#66d6a8");
                $(camScaleEntity).attr('class', 'link');

                this.hotspots[i].hotspotElement = camScaleEntity;
                this.hotspots[i].hotspotID = i;

                var currentHotspot = this.hotspots[i - 1];

                if (currentHotspot == null) {
                    currentPos = new THREE.Vector3();
                } else {
                    var distance = 40;
                    currentPos.x += currentHotspot.exit.x * distance;
                    currentPos.y += currentHotspot.exit.y * distance;
                    currentPos.z += currentHotspot.exit.z * distance;
                }


                $(hParentEntity).attr("position", currentPos.x.toString() + " " + currentPos.y.toString() + " " + currentPos.z.toString());
                $("a-scene").append(hParentEntity);
            }

        }
    });