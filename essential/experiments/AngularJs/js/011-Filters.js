var app = angular.module("Filters", []);

app.controller('FiltersController', function ($scope) {

    $scope.user =
        [{ id: 1, name: 'Alice', age: 20, note: ['alice is my name','second note'] },
         { id: 2, name: 'Bob', age: 25, note: ['bob is my name','2','3'] },
         { id: 3, name: 'Charle', age: 20, note: ['charlie is my name'] },
         { id: 4, name: 'Daniel', age: 21, note: ['daniel is my name'] },
         { id: 5, name: 'Elizebeth', age: 20, note: ['eizebth is my name'] },
         { id: 6, name: 'Frank', age: 20, note: ['frank is my name'] },
         { id: 7, name: 'George', age: 23, note: ['george is my name'] },
         { id: 8, name: 'Hary', age: 23, note: ['alicharye is my name'] },
         { id: 9, name: 'Ibrahim', age: 20, note: ['ibrahim is my name'] },
         { id: 10, name: 'John', age: 20, note: [] }];

    $scope.filterFunction = function (users) {
        return users.name.match(/^Ma/) ? true : false;
    };



});


app.filter('filter', function () {
    return function (items,id,str,age,notes) {
        var filtered = [];

        var letterMatch = new RegExp(str, 'i');

        if (id == undefined && str == undefined && age == undefined && notes == undefined) {
            filtered = items;
        }
        else if (id != undefined && str == undefined && age == undefined && notes == undefined) {
            for (var i = 0; i < items.length; i++) {
                var item = items[i];
                if (item.id == id) {
                    filtered.push(item);
                }
            }
        }
        else if (id == undefined && str != undefined && age == undefined && notes == undefined) {
            for (var i = 0; i < items.length; i++) {
                var item = items[i];
                if (letterMatch.test(item.name.substring(0, 1))) {
                    filtered.push(item);
                }
            }
        }
        else if (id == undefined && str == undefined && age != undefined && notes == undefined) {
            for (var i = 0; i < items.length; i++) {
                var item = items[i];
                if (item.age >= age) {
                    filtered.push(item);
                }
            }
        }
        else if (id == undefined && str == undefined && age == undefined && notes != undefined) {
            for (var i = 0; i < items.length; i++) {
                var item = items[i];
                if (item.note.length >= notes) {
                    console.log(item.note.length);
                    filtered.push(item);
                }
            }
        }
        return filtered;
    };
});