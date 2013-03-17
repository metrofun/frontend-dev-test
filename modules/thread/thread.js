define(['api', 'post'], 'thread', function (api, post) {
    var Thread = function (threadID) {
        this.threadID = threadID;
        this.getData();
    };
    Thread.prototype = {
        buildHTML: function (posts) {
            var htmlTokens = [
                post.buildHTML(posts.pop()),
                '<div class="thread__separator"></div>'
            ];

            htmlTokens = htmlTokens.concat(posts.map(function (postData) {
                return post.buildHTML(postData);
            }));

            document.querySelector('.app__content').innerHTML = htmlTokens.join('');
        },
        onsuccess: function (response) {
            var posts = response.posts;
            if (posts && posts.length) {
                this.buildHTML(posts);
            }
        },
        getData: function () {
            api.get({
                resource: '/post/read',
                query: 'threadid=' + this.threadID,
                success: this.onsuccess.bind(this)
            });
        }
    };
    return  Thread;
});
