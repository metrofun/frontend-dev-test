/*jshint white: false */
define(
    ['api', 'post', 'reply-form', 'user', 'common'],
    'thread',
    function (api, post, replyForm, user, common) {
        var Thread = function (threadID) {
            this.threadID = 903;
            this.getData();
        };
        Thread.prototype = {
            createPost: function (message) {
                api.get({
                    method: 'POST',
                    resource: '/post/create',
                    query: [
                        'author=' + user.fullName,
                        'message=' + message,
                        'threadid=' + Math.floor(Math.random()*999)
                    ].join('&'),
                    success: function (postData) {
                        var postWithReplyForm = document.querySelector('.post:last-child');

                        postData.date = 'now';

                        postWithReplyForm.parentNode.insertBefore(
                            common.createHTMLElement(post.buildHTML(postData)),
                            postWithReplyForm
                        );
                        document.body.querySelector(
                            '.reply-form__textarea'
                        ).value = '';
                    }.bind(this)
                });
            },
            addSelf: function (posts) {
                var htmlTokens = [
                    post.buildHTML(posts.pop()),
                    '<div class="thread__separator">',
                        '<a class="thread__answer" href="#reply-form">Write reply</a>',
                    '</div>'
                ], replyFormElement;

                htmlTokens = htmlTokens.concat(posts.map(function (postData) {
                    return post.buildHTML(postData);
                }));

                htmlTokens.push(post.buildHTML({
                    author: user.fullName,
                    content: '<div class="thread__reply-form"></div>'
                }));

                document.querySelector('.app__content').innerHTML = htmlTokens.join('');
                // Add reply-form
                replyFormElement = document.querySelector('.thread__reply-form');
                replyFormElement = replyFormElement.parentNode.replaceChild(
                    replyForm.createFormElement(this.createPost.bind(this)),
                    replyFormElement
                );
            },
            onsuccess: function (response) {
                var posts = response.posts;
                if (posts && posts.length) {
                    this.addSelf(posts);
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
        return Thread;
    }
);
