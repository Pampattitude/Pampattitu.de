'use strict';

var mongooseLib = require('mongoose');

var schemaOptions = {
    autoIndex: true,
};

var schema = new mongooseLib.Schema({
    name: {type: String, required: true, index: true, unique: true},
    articleCount: {type: Number, default: 0},
    viewCount: {type: Number, default: 0},
    featuredCount: {type: Number, default: 0},
    commentCount: {type: Number, default: 0},
    manualCount: {type: Number, default: 0},

    points: {type: Number, default: 0},

    created: {type: Date, default: Date.now},
    updated: {type: Date, default: Date.now},
}, schemaOptions);

exports.model = mongooseLib.model('Tag', schema);
