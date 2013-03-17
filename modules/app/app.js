/*jshint white: false */
require(
    ['thread-list', 'common', 'router', 'user'],
    function (ThreadList, common, router, user) {
        function appendSelf() {
            document.body.appendChild(common.createHTMLElement([
                '<div class="app">',
                    '<div class="app__header"></div>',
                    '<div class="user">',
                        '<div class="logo"></div>',
                        '<span class="user_name">Hello, ', user.fullName, '</span>',
                    '</div>',
                    '<div class="app__content">',
                        '<div class="app__loading">↺</div>',
                    '</div>',
                    '<div class="app__footer">',
                        '<div class="app__copyright">',
                            'Copyright © Dmitrii Shchadei 2013',
                        '</div>',
                    '</div>',
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

                if (target.nodeName === 'A' && href && !href.match(/^(#|http)/)) {
                    router.route(e.target.href);
                    e.preventDefault();
                }
            }, true);
        }

        appendSelf();
        handleInternalLinks();
    }
);
