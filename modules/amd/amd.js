(function (global) {
    var moduleDefinitions = {};

    /**
     * @param {String} module name
     *
     * @return {*} Module instance
     */
    function createModule(name) {
        var definition = moduleDefinitions[name];

        return definition.singleton = definition.factory.apply(
            global,
            definition.dependences.map(function (moduleName) {
                return moduleDefinitions[moduleName].singleton || createModule(moduleName);
            })
        );
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

        moduleDefinitions[name] = {
            factory: callback,
            dependences: dependences
        };
    };

    /**
     * @params {Array} dependences Required module names
     * @params {Function} callback Will be executed when all dependences
     */
    global.require = function (dependences, callback) {
        setTimeout(function () {
            callback.apply(global, dependences.map(function (moduleName) {
                return moduleDefinitions[moduleName].singleton || createModule(moduleName);
            }));
        });
    };
})(window);
