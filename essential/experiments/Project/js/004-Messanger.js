var myApp = angular.module('messageApp', []);


myApp.controller('messageCtrl', function ($scope) {

    $scope.messages = [{ 'with': 'user1', 'messages': [{ 'type': 'sent', 'msg': 'hello' }, { 'type': 'received', 'msg': 'bye' }] },
                       { 'with': 'user2', 'messages': [{ 'type': 'sent', 'msg': 'hello' }, { 'type': 'received', 'msg': 'bye' }, { 'type': 'sent', 'msg': '3rdmsg' }, { 'type': 'sent', 'msg': '3rdmsg' }, { 'type': 'sent', 'msg': '3rdmsg' }, { 'type': 'sent', 'msg': '3rdmsg' }, { 'type': 'received', 'msg': '3rdmsg' }, { 'type': 'sent', 'msg': '3rdmsg' }, { 'type': 'received', 'msg': '3rdmsg' }, { 'type': 'sent', 'msg': '3rdmsg' }, { 'type': 'received', 'msg': '3rdmsg' }] },
                       { 'with': 'user3', 'messages': [{ 'type': 'sent', 'msg': 'hello' }, { 'type': 'received', 'msg': 'bye' }] },
                       { 'with': 'user4', 'messages': [{ 'type': 'sent', 'msg': 'hello' }, { 'type': 'received', 'msg': 'bye' }] },
                       { 'with': 'user5', 'messages': [{ 'type': 'sent', 'msg': 'hello' }, { 'type': 'received', 'msg': 'bye' }] },
                       { 'with': 'user6', 'messages': [{ 'type': 'sent', 'msg': 'hello' }, { 'type': 'received', 'msg': 'bye' }] },
                       { 'with': 'user7', 'messages': [{ 'type': 'sent', 'msg': 'hello' }, { 'type': 'received', 'msg': 'bye' }] },
                       { 'with': 'user8', 'messages': [{ 'type': 'sent', 'msg': 'hello' }, { 'type': 'received', 'msg': 'bye' }] },
                       { 'with': 'user9', 'messages': [{ 'type': 'sent', 'msg': 'hello' }, { 'type': 'received', 'msg': 'bye' }] },
                       { 'with': 'user10', 'messages': [{ 'type': 'sent', 'msg': 'hello' }, { 'type': 'received', 'msg': 'bye' }] },
                       { 'with': 'user11', 'messages': [{ 'type': 'sent', 'msg': 'hello' }, { 'type': 'received', 'msg': 'bye' }] },
                       { 'with': 'user12', 'messages': [{ 'type': 'sent', 'msg': 'hello' }, { 'type': 'received', 'msg': 'bye' }] }
    ];

    $scope.messagesFrom = "";
    $scope.messagesOf = [];

    $scope.loadMsgs = function (index) {
        $scope.with = index;
        $scope.messagesFrom = $scope.messages[index].with;
        $scope.messagesOf = $scope.messages[index].messages;

    };

    $scope.send = function () {
        if ($scope.newMsg != "" && $scope.newMsg != undefined) {
            var msg = { 'type': 'sent', 'msg': $scope.newMsg };
            $scope.messages[$scope.with].messages.push(msg);
            $scope.newMsg = "";
        };
    };

    $scope.startsWith = function (actual, expected) {
        var lowerStr = (actual + "").toLowerCase();
        return lowerStr.indexOf(expected.toLowerCase()) === 0;
    };
});

myApp.directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if (event.which === 13) {
                scope.$apply(function () {
                    scope.$eval(attrs.ngEnter);
                });
                event.preventDefault();
            }
        });
    };
});

