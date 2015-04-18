app.controller("CalculatorCtrl", function ($scope, MyService) {

    $scope.output = "";

    var isLoggedIn, userData;

    $scope.init = function () {
        isLoggedIn = MyService.isLoggedIn();
        if (isLoggedIn == true) {
            userData = MyService.getDataOnInitialLoad("calculator");
            $("#calculator").offset({ top: userData.top, left: userData.left });

        } else {

        };
    };

    $scope.$watch(
        function () {
            return MyService.getShowCalculator();
        },
       function (showCalculator) {
           $scope.showCalculator = showCalculator;
       }, true);

    $scope.buttonClick = function (value) {
        var output = $scope.output;

        if (output == "Syntax Error" || output == "Infinity" || output == "NaN") {
            output = "";
        };

        if (isNaN(value)) {

            if (value == 'c') {
                output = "";
            }
            else if (value == 'ng') {

                if (output.charAt(0) == '-') {
                    output = output.slice(1);
                } else {
                    output = "-" + output;
                }
            }
            else {
                output = output + value;
            }

        } else {
            output = output + value;
        };

        $scope.output = output;
    };

    $scope.calculate = function () {

        var output = $scope.output;

        try {
            output = output.replace('x', '*');

            output = eval(output);

            output = output.toString();

            $scope.output = output;
        } catch (e) {
            if (e instanceof SyntaxError) {
                $scope.output = "Syntax Error";
            }
        }
    };

    $scope.closeCalculator = function () {
        $scope.output = "";
        MyService.setShowCalculator();
        $("#calculator").offset({ top: 100, left: 100 });
    };

});