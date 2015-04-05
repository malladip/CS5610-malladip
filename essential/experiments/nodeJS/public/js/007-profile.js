app.controller("profileCtrl", function ($scope, $interval, $document,MyService) {

    $scope.currentUser = MyService.getCurrentUser().user;
    $scope.currentUserElemets = MyService.getCurrentUser().positions;

    $scope.init = function () {

        for (ele in $scope.currentUserElemets) {
            var element = $scope.currentUserElemets[ele];
            console.log("id "+element.elemid);
            console.log("left " + element.position.left);
            console.log("top " + element.position.top);

            var domElement = $document.find("#" + element.elemid);
            domElement.offset({ top: element.position.top, left: element.position.left });

            console.log(domElement.offset().left);
            console.log(domElement.offset().top);
        }

    };

    $scope.save = function () {
        
        var elements = [];

        var div1Id = $document.find('#div1').prop('id');
        var div1Pos = $document.find('#div1').offset();
        var element = {'id':div1Id,'pos':div1Pos};

        elements.push(element);

        MyService.save(elements);
    };

    $scope.logout = function () {
        MyService.logout();
    };

});