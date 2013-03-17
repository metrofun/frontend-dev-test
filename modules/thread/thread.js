/*jshint white: false */
define(
    ['api', 'post', 'reply-form', 'user'],
    'thread',
    function (api, post, replyForm, user) {
        var Thread = function (threadID) {
            this.threadID = 903;
            this.getData();
        };
        Thread.prototype = {
            buildHTML: function (posts) {
                var htmlTokens = [
                    post.buildHTML(posts.pop()),
                    '<div class="thread__separator">',
                        '<a class="thread__answer" href="#reply-form">Write reply</a>',
                    '</div>'
                ];

                htmlTokens = htmlTokens.concat(posts.map(function (postData) {
                    return post.buildHTML(postData);
                }));

                htmlTokens.push(post.buildHTML({
                    author: user.fullName,
                    content: replyForm.buildHTML()
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
    }
);
