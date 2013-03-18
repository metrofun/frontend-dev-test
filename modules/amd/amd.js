(function (global) {
    var moduleDefinitions = {},
        pendingRequires = [];

    /**
     * @param {String} module name
     *
     * @return {*} Module instance
     */
    function createModule(name) {
        var definition = moduleDefinitions[name];

        if (definition.dependences) {
            global.require(definition.dependences, function () {
                definition.singleton = definition.factory.apply(
                    global,
                    [].slice.call(arguments)
                );
                rerunPendingRequires();
            });
        }
    }
    function rerunPendingRequires() {
        setTimeout(function () {
            var length = pendingRequires.length,
                pendingRequire;

            while (length--) {
                pendingRequire = pendingRequires.shift();
                global.require(pendingRequire.dependences, pendingRequire.callback);
            }
        });
    }
    /**
     * Fetch module from the server
     */
    function fetchModule(moduleName) {
        var definition = moduleDefinitions[moduleName], js;
        if (!(definition && definition.loaded)) {
            js = document.createElement("script");

            js.type = "text/javascript";
            js.onload = rerunPendingRequires;
            js.src = ['', 'modules', moduleName, moduleName].join('/') + '.js';

            document.body.appendChild(js);

            moduleDefinitions[moduleName] = {loaded: true};
        }
    }
    /**
     * @params {Array} [dependences] Required module names
     * @params {String} name Module name
     * @params {Function} callback Module factory, Will be executed when all dependences ready
     */
    global.define = function () {
        var args = [].slice.apply(arguments),
            callback = args.pop(),
            name = args.pop(),
            dependences = args.pop() || [];

        moduleDefinitions[name].factory = callback;
        moduleDefinitions[name].dependences  = dependences;
    };
    /**
     * @params {Array} dependences Required module names
     * @params {Function} callback Will be executed when all dependences
     */
    global.require = function (dependences, callback) {
        var resolvedDeps = [];

        dependences.forEach(function (moduleName) {
            var moduleDefinition = moduleDefinitions[moduleName];
            if (moduleDefinition) {
                if (moduleDefinition.hasOwnProperty('singleton')) {
                    resolvedDeps.push(moduleDefinition.singleton);
                } else {
                    createModule(moduleName);
                }
            } else {
                fetchModule(moduleName);
            }
        });
        if (resolvedDeps.length === dependences.length) {
            callback.apply(global, resolvedDeps);
        } else {
            pendingRequires.push({
                dependences: dependences,
                callback: callback
            });
        }
    };

})(window);
