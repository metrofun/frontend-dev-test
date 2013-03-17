/*jshint white: false */
define(['common'], 'error', function (common) {
    return {
        show: function () {
            console.log('ERROR');
            document.body.appendChild(common.createHTMLElement([
                '<div class="error">',
                    'Sorry, unknown error occured. Please open start page.',
                '</div>'
            ].join('')));
        }
    };
});
