define('router', function () {
    var controllers = [
        {mask: /thread\/(\d+)$/, controller: 'thread'},
        {mask: /$/, controller: 'thread-list'}
    ];

    function onURLChange() {
        var href = location.href;

        controllers.some(function (controllerDefinition) {
            var match  = location.href.match(controllerDefinition.mask),
                controller;

            if (match) {
                require([controllerDefinition.controller], function (Controller) {
                    console.log(href, controllerDefinition.controller);
                    var controller = new Controller(
                        match.slice(1)
                    );
                });
                return true;
            }
        });
    }

    window.addEventListener('popstate', function () {
        onURLChange();
    });
    onURLChange();

    return {
        /**
         * Changes location.href and executes controller
         *
         * @param {String} href New location.href, maybe relative path
         */
        route: function (href) {
            window.history.pushState(null, null, href);
            onURLChange();
        }
    };
});
