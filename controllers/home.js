var asyncLib = require('async');
var mongooseLib = require('mongoose');

var consoleLib = require(__dirname + '/../lib/console');
var utilsLib = require(__dirname + '/../lib/utils');

var controller_ = function() {
    this.render = function(req, res, renderCallback) {
	var Article = mongooseLib.model('Article');
        var articlesModel = require('../models/articles.js');

        return asyncLib.series([
            function(serieCallback) {
                return articlesModel.getFeatured(function(err, featured) {
                    if (err)
                        return serieCallback(err);

                    res.locals.featuredArticle = featured;
                    return serieCallback();
                })
            },
            function(serieCallback) {
	        return Article.find({}).sort({lastUpdated: -1}).limit(5).exec(function(err, articles) {
	            if (err)
                        return serieCallback(err);

                    var featuredCount = 0;
                    for (var i = 0 ; articles.length > i ; ++i) {
                        var article = articles[i];
                        if (true === article.featured)
                            ++featuredCount;
                    }

                    if (1 === (articles.length - featuredCount) % 2) {
                        articles.pop();
                    }

	            res.locals.articleList = articles;
	            // res.locals.inlineStyles.push('home');
	            res.locals.contentPath = 'pages/home/content.ejs';

                    return serieCallback();
                });
            },
	],
        function(err) {
            return renderCallback();
        });
    };
};

exports.Controller = controller_;
