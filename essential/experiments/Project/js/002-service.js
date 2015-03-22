
myApp.factory("Desktop", function () {

    var browserActive = false;
    var notepadActive = false;
    var youtubeActive = false;
    var textToSpeachActive = false;
    var googleActive = false;

    var getBrowser = function () {
        return browserActive;
    };

    var setBrowser = function () {
        if (browserActive == true) {
            browserActive = false;
        } else if (browserActive == false) {
            alert("Some websites do not open in an IFrame!! \nSorry for the inconvenience!! \n\nDouble click on the browser menu bar to get a new tab.");            browserActive = true;
        }
        return browserActive;
    };

    var getNotepad = function () {
        return notepadActive;
    };

    var setNotepad = function () {
        if (notepadActive == true) {
            notepadActive = false;
        } else if (notepadActive == false) {
            notepadActive = true;
        }
        return notepadActive;
    };

    var getYoutube = function () {
        return youtubeActive;
    };

    var setYoutube = function () {
        if (youtubeActive == true) {
            youtubeActive = false;
        } else if (youtubeActive == false) {
            youtubeActive = true;
        }
        return youtubeActive;
    };

    var getTextToSpeach = function () {
        return textToSpeachActive;
    };

    var setTextToSpeach = function () {
        if (textToSpeachActive == true) {
            textToSpeachActive = false;
        } else if (textToSpeachActive == false) {
            textToSpeachActive = true;
        }
        return textToSpeachActive;
    };

    var getGoogle = function () {
        return googleActive;
    };

    var setGoogle = function () {
        if (googleActive == true) {
            googleActive = false;
        } else if (googleActive == false) {
            googleActive = true;
        }
        return googleActive;
    };

    return {
        getBrowser: getBrowser,
        setBrowser: setBrowser,
        getNotepad: getNotepad,
        setNotepad: setNotepad,
        getYoutube: getYoutube,
        setYoutube: setYoutube,
        getTextToSpeach: getTextToSpeach,
        setTextToSpeach: setTextToSpeach,
        getGoogle: getGoogle,
        setGoogle: setGoogle
    }
});