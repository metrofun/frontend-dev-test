/*jshint white: false */
define(['api', 'post'], 'thread-list', function (api, post) {
    var ThreadList = function () {
        this.getData();
    };
    ThreadList.prototype = {
        onsuccess: function (response) {
            var htmlTokens = [];

            if (response && response.threads) {
                htmlTokens = response.threads.map(function (thread) {
                    return this.buildThreadItemHTML(thread);
                }.bind(this));
            }

            document.querySelector('.app__content').innerHTML = htmlTokens.join('');
        },
        getData: function () {
            api.get({
                resource: '/thread/read',
                success: this.onsuccess.bind(this)
            });
        },
        buildThreadItemHTML: function (threadData) {
            threadData.content = [
                '<a href="thread/', threadData.id, '" class="thread-list__item-title">',
                    threadData.message,
                '</a>'
            ].join('');
            return post.buildHTML(threadData);
        }
    };
    return ThreadList;
});
