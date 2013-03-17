/*jshint white: false */
define(['api', 'post'], 'thread-list', function (api, post) {
    var ThreadList = function (parentNode) {
        this.parentNode = parentNode;
        this.getData();
    };
    ThreadList.prototype = {
        onsuccess: function (response) {
            var htmlTokens = [];

            if (response && response.threads) {
                response.threads.map(function (thread) {
                    htmlTokens.push(this.buildThreadItemHTML(thread));
                }.bind(this));
            }
            this.parentNode.innerHTML = htmlTokens.join('');
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
