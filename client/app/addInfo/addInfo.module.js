/**
 * Created by zhengan on 2017/5/22.
 */
(function () {
    'use strict';

    angular.module('app.addInfo', ['app.addInfo.controller', 'app.addInfo.state', 'angularFileUpload', 'textAngular','app.addInfo.directive'])
        .config(['$provide',function ($provide) {
            $provide.decorator('taOptions', ['taRegisterTool', '$delegate','taSelection', 'taBrowserTag', 'taTranslations',
                'taToolFunctions','$window','$mdDialog', function (taRegisterTool, taOptions,taSelection,taBrowserTag,taTranslations,taToolFunctions,$window,$mdDialog) {
                    // $delegate is the taOptions we are decorating
                    // register the tool with textAngular

                    taRegisterTool('backgroundColor', {
                        display: "<div spectrum-colorpicker ng-model='color' on-change='!!color && action(color)' format='\"hex\"' options='options'></div>",
                        action: function (color) {
                            var me = this;
                            if (!this.$editor().wrapSelection) {
                                setTimeout(function () {
                                    me.action(color);
                                }, 100)
                            } else {
                                return this.$editor().wrapSelection('backColor', color);
                            }
                        },
                        options: {
                            replacerClassName: 'fa fa-paint-brush', showButtons: false
                        },
                        color: "#fff"
                    });
                    taRegisterTool('fontColor', {
                        display: "<spectrum-colorpicker trigger-id='{{trigger}}' ng-model='color' on-change='!!color && action(color)' format='\"hex\"' options='options'></spectrum-colorpicker>",
                        action: function (color) {
                            var me = this;
                            if (!this.$editor().wrapSelection) {
                                setTimeout(function () {
                                    me.action(color);
                                }, 100)
                            } else {
                                return this.$editor().wrapSelection('foreColor', color);
                            }
                        },
                        options: {
                            replacerClassName: 'fa fa-font', showButtons: false
                        },
                        color: "#000"
                    });


                    taRegisterTool('fontName', {
                        display: "<span class='bar-btn-dropdown dropdown'>" +
                        "<button class='btn btn-blue dropdown-toggle' type='button' ng-disabled='showHtml()' style='padding-top: 4px'><i class='fa fa-font'></i><i class='fa fa-caret-down'></i></button>" +
                        "<ul class='dropdown-menu'><li ng-repeat='o in options'><button class='btn btn-blue checked-dropdown' style='font-family: {{o.css}}; width: 100%' type='button' ng-click='action($event, o.css)'><i ng-if='o.active' class='fa fa-check'></i>{{o.name}}</button></li></ul></span>",
                        action: function (event, font) {
                            //Ask if event is really an event.
                            if (!!event.stopPropagation) {
                                //With this, you stop the event of textAngular.
                                event.stopPropagation();
                                //Then click in the body to close the dropdown.
                                $("body").trigger("click");
                            }
                            return this.$editor().wrapSelection('fontName', font);
                        },
                        options: [
                            {name: 'Sans-Serif', css: 'Arial, Helvetica, sans-serif'},
                            {name: 'Serif', css: "'times new roman', serif"},
                            {name: 'Wide', css: "'arial black', sans-serif"},
                            {name: 'Narrow', css: "'arial narrow', sans-serif"},
                            {name: 'Comic Sans MS', css: "'comic sans ms', sans-serif"},
                            {name: 'Courier New', css: "'courier new', monospace"},
                            {name: 'Garamond', css: 'garamond, serif'},
                            {name: 'Georgia', css: 'georgia, serif'},
                            {name: 'Tahoma', css: 'tahoma, sans-serif'},
                            {name: 'Trebuchet MS', css: "'trebuchet ms', sans-serif"},
                            {name: "Helvetica", css: "'Helvetica Neue', Helvetica, Arial, sans-serif"},
                            {name: 'Verdana', css: 'verdana, sans-serif'},
                            {name: 'Proxima Nova', css: 'proxima_nova_rgregular'}
                        ]
                    });


                    taRegisterTool('fontSize', {
                        display: "<span class='bar-btn-dropdown dropdown'>" +
                        "<button class='btn btn-default dropdown-toggle' type='button' ng-disabled='showHtml()' style='padding-top: 4px'><i class='fa fa-text-width'></i><i class='fa fa-caret-down'></i></button>" +
                        "<ul class='dropdown-menu'><li ng-repeat='o in options'><button class='btn btn-blue checked-dropdown' style='font-size: {{o.css}}; width: 100%' type='button' ng-click='action($event, o.value)'><i ng-if='o.active' class='fa fa-check'></i> {{o.name}}</button></li></ul>" +
                        "</span>",
                        action: function (event, size) {
                            //Ask if event is really an event.
                            if (!!event.stopPropagation) {
                                //With this, you stop the event of textAngular.
                                event.stopPropagation();
                                //Then click in the body to close the dropdown.
                                $("body").trigger("click");
                            }
                            // console.log(this.$editor().wrapSelection('fontSize',size));


                            return this.$editor().wrapSelection('fontSize',size);
                        },
                        options: [
                            {name: '12', css: 'xx-small', value: '14px'},
                            {name: '13', css: 'x-small', value: 2},
                            {name: '16', css: 'small', value: 3},
                            {name: '18', css: 'medium', value: 4},
                            {name: '25', css: 'large', value: 5},
                            {name: '32', css: 'x-large', value: 6},
                            {name: '48', css: 'xx-large', value: 7}
                        ]
                    });

                    taRegisterTool('lineHeight', {
                        display: "<span class='bar-btn-dropdown dropdown'>" +
                        "<button class='btn btn-default dropdown-toggle' type='button' ng-disabled='showHtml()' style='padding-top: 4px'><i class='fa fa-text-height'></i><i class='fa fa-caret-down'></i></button>" +
                        "<ul class='dropdown-menu' style='min-width:145px;height:200px;overflow:auto;'><li ng-repeat='o in options' ><button class='btn btn-blue checked-dropdown' style='width:41px;' type='button' ng-click='action($event, o.css)'><i ng-if='o.active' class='fa fa-check'></i> {{o.name}}</button></li></ul>" +
                        "</span>",
                        action: function (event, size) {
                            //Ask if event is really an event.
                            if (!!event.stopPropagation) {
                                //With this, you stop the event of textAngular.
                                event.stopPropagation();
                                //Then click in the body to close the dropdown.
                                $("body").trigger("click");
                            }
                            // console.log(this.$editor().wrapSelection('fontSize',size));
                            var ele=taSelection.getSelection().container||'';

                            $(ele).children().css('line-height','auto');
                            $(ele).children().css('line-height',size)
                            $(ele).css('line-height',size)


                        },
                        options: setOptions(1,50)
                    });


                    var blockJavascript = function (link) {
                        if (link.toLowerCase().indexOf('javascript')!==-1) {
                            return true;
                        }
                        return false;
                    };
                    taRegisterTool('selectImage', {
                        iconclass: 'fa fa-picture-o',
                        tooltiptext: 'selectImage',
                        // display:'<input type="file" style="overflow:hidden;" ng-model="img" onchange="angular.element(this).scope().action(this)"/>',
                        action: function(){
                           // var confirm=$mdDialog.confirm()
                           //     .title('select')
                           //     .content('<input type="file">')
                           //     .ok('ok')
                           //     .cancel('cancel');
                            $mdDialog.show({
                                controller: ['$scope',function(){

                                }],
                                templateUrl: 'app/addInfo/insertImgDialog.html',
                                parent: angular.element(document.body),
                                // targetEvent: ev,
                                clickOutsideToClose:true
                            }).then(function(r){
                                console.log(r);
                            },function(){
                                console.log(22);
                            });
                            var imageLink;
                            // imageLink = $window.prompt('http://', 'http://');
                            if(imageLink && imageLink !== '' && imageLink !== 'http://'){
                                /* istanbul ignore next: don't know how to test this... since it needs a dialogPrompt */
                                // block javascript here
                                if (!blockJavascript(imageLink)) {
                                    if (taSelection.getSelectionElement().tagName && taSelection.getSelectionElement().tagName.toLowerCase() === 'a') {
                                        // due to differences in implementation between FireFox and Chrome, we must move the
                                        // insertion point past the <a> element, otherwise FireFox inserts inside the <a>
                                        // With this change, both FireFox and Chrome behave the same way!
                                        taSelection.setSelectionAfterElement(taSelection.getSelectionElement());
                                    }
                                    // In the past we used the simple statement:
                                    //return this.$editor().wrapSelection('insertImage', imageLink, true);
                                    //
                                    // However on Firefox only, when the content is empty this is a problem
                                    // See Issue #1201
                                    // Investigation reveals that Firefox only inserts a <p> only!!!!
                                    // So now we use insertHTML here and all is fine.
                                    // NOTE: this is what 'insertImage' is supposed to do anyway!
                                    var embed = '<img src="' + imageLink + '">';
                                    return this.$editor().wrapSelection('insertHTML', embed, true);
                                }
                            }
                        },
                        onElementSelect: {
                            element: 'img',
                            action: taToolFunctions.imgOnSelectAction
                        }
                    });

                    function setOptions(start,end){
                        var arr=[];
                        for(var i=start;i<=end;i++){
                            var obj={name:i,css:i+'px'};
                            arr.push(obj);
                        }
                        return arr;
                    }

                    // add the button to the default toolbar definition
                    // taOptions.toolbar[1].push('backgroundColor', 'fontColor', 'fontName', 'fontSize');
                    taOptions.toolbar[3].push('fontSize','lineHeight');
                    return taOptions;
                }]);
        }])
    ;
})();
