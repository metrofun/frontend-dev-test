define('common', function () {
    return {
        /*
         * Creates document fragment from specified html
         *
         * @param {String} html
         *
         * @return {DocumentFragment)}
         */
        createHTMLElement: function (html) {
            var documentFragment = document.createDocumentFragment(),
                divNode = document.createElement('div');

            divNode.insertAdjacentHTML('afterbegin', html);
            while (divNode.firstChild) {
                documentFragment.appendChild(divNode.firstChild);
            }
            return documentFragment;
        }
    };
});
