
app.directive('draggable', function (MyService) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            element.draggable({
                cursor: "move",
                stop: function (event, ui) {
                    scope[attrs.xpos] = ui.position.left;
                    scope[attrs.ypos] = ui.position.top;

                }
            });
        }
    };
});