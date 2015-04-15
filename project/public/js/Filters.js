app.filter('messengerfilter', function () {
    return function (items, searchstring) {
        var filtered = [];

        var letterMatch = new RegExp(searchstring, 'i');

        if (searchstring == undefined || searchstring == "") {
            filtered = items;
        }
        else {
            for (var i = 0; i < items.length; i++) {
                var item = items[i];
                var firstname = item.firstname.toLowerCase();
                var lastname = item.lastname.toLowerCase();
                searchstring = searchstring.toLowerCase();
                if (firstname.indexOf(searchstring.toLowerCase()) === 0 ||
                    lastname.indexOf(searchstring.toLowerCase()) === 0) {
                    filtered.push(item);
                }
            }
        }
        return filtered;
    };
});

app.filter('weatherfilter', function ($filter) {
    return function (input, precision) {
        if (!precision) {
            precision = 1;
        }
        var numberFilter = $filter('number');
        return numberFilter(input, precision) + '\u00B0C';
    };
});

app.filter('youtubefilter', function () {
    return function (items, searchstring) {
        var filtered = [];

        var letterMatch = new RegExp(searchstring, 'i');

        if (searchstring == undefined || searchstring == "") {
            filtered = items;
        }
        else {
            for (var i = 0; i < items.length; i++) {
                var item = items[i];
                var title = item.title.toLowerCase();
                searchstring = searchstring.toLowerCase();
                if (title.indexOf(searchstring) > -1) {
                    filtered.push(item);
                }
            }
        }
        return filtered;
    };
});