/*jshint white: false */
require(['thread-list', 'common'], function (ThreadList, common) {
    var appNode = document.body.appendChild(common.createHTMLElement([
        '<div class="app">',
            '<div class="app__header"></div>',
            '<div class="user">',
                '<div class="logo"></div>',
            '</div>',
            '<div class="app__content"></div>',
            '<div class="app__footer"></div>',
        '</div>'
    ].join('')));
});
