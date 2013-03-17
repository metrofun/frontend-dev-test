/*jshint white: false */
define(['common', 'user', 'api'], 'reply-form', function (common, user, api) {
    var monthes = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
    /**
     * Returns time in hh:mm am/pm format
     *
     * @param {object} date
     * @return {String}
     */
    function getAMPMTime(date) {
        var hours = date.getHours(),
            minutes = date.getMinutes(),
            ampm = hours >= 12 ? 'pm' : 'am';

        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0'+minutes : minutes;

        return hours + ':' + minutes + ' ' + ampm;
    }
    /**
     * Returns date in human readable format
     *
     * @return {String}
     */
    function getCurrentTimeString() {
        var date = new Date(),
        dateString = [
            monthes[date.getMonth()],' ',
            date.getDate(), ' at ',
            getAMPMTime(date)
        ].join('');
        return dateString;
    }
    function handleSubmit() {
        document.body.addEventListener('submit', function (e) {
            var target = e.target, message;

            if (target.className === 'reply-form') {
                createPost(target.elements[0].value);
                e.preventDefault();
            }
        }, true);
    }
    function createPost(message) {
        api.get({
            method: 'POST',
            resource: '/post/create',
            query: 'author=zzz&message=123&threadid=903',
            // query: [
                // 'author=' + encodeURIComponent(user.fullName),
                // 'message=' + encodeURIComponent(message),
                // 'threadid=' + Math.floor(Math.random()*999)
            // ].join('&'),
            success: function () {
                console.log(arguments);
            }
        });
    }
    handleSubmit();
    return {
        buildHTML: function () {
            return [
                '<form class="reply-form" id="reply-form">',
                    '<textarea placeholder="Reply text" class="reply-form__textarea">',
                    '</textarea>',
                    '<div class="reply-form__pull-left">',
                        '<div class="reply-form__date">Current Time: ', getCurrentTimeString(), '</div>',
                        '<input type="checkbox" id="keep-updated"/>',
                        '<label class="checkbox" for="keep-updated">',
                            'Keep me updated with this thread',
                        '</label>',
                    '</div>',
                    '<button class="button button_apply" type="submit">',
                        '<span class="button__text">Done</span>',
                    '</button>',
                '</form>'
            ].join('');
        }
    };
});
