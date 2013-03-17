/*jshint white: false */
define('post', function () {
    return {
        /*
         * Returns HTML representation for Post
         *
         * @param {Object} data
         * @param {String} data.author
         * @param {String} [data.message]
         * @param {String} [data.content]
         * @param {String} data.date
         *
         * @return {String}
         */
        buildHTML: function (data) {
            return [
                '<div class="post">',
                    '<div class="logo"></div>',
                    '<div class="post__author">', data.author, '</div>',
                    this.buildContentHTML(data),
                    '<div class="post__date">Date: ', data.date, '</div>',
                '</div>'
            ].join('');
        },
        /*
         * @param {Object} data
         * @param {String} [data.mesage] Message text
         * @param {String} [data.content] Content HTML
         *
         * @return {String}
         */
        buildContentHTML: function (data) {
            if (data.content) {
                return data.content;
            }
            return ['<div class="post__text">', data.message, '</div>'].join('');
        }
    };
});
