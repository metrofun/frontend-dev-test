/*jshint white: false */
require(['thread-list', 'common', 'router'], function (ThreadList, common, router) {
    function appendSelf() {
        document.body.appendChild(common.createHTMLElement([
            '<div class="app">',
                '<div class="app__header"></div>',
                '<div class="user">',
                    '<div class="logo"></div>',
                '</div>',
                '<div class="app__content"></div>',
                '<div class="app__footer"></div>',
            '</div>'
        ].join('')));
    }

    /**
     * Adds pushState for local links
     */
    function handleInternalLinks() {
        document.body.addEventListener('click', function (e) {
            var target = e.target,
            href = target.getAttribute('href');

            if (target.nodeName === 'A' && href && !href.match(/^http/)) {
                router.route(e.target.href);
                e.preventDefault();
            }
        }, true);
    }

    appendSelf();
    handleInternalLinks();
});
