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
            var divNode = document.createElement('div'),
                documentFragment;

            divNode.insertAdjacentHTML('afterbegin', html);
            if (divNode.childElementCount > 1) {
                documentFragment = document.createDocumentFragment();
                while (divNode.firstChild) {
                    documentFragment.appendChild(divNode.firstChild);
                }
                return documentFragment;
            } else {
                return divNode.firstChild;
            }
        }
    };
});
