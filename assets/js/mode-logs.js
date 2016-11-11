ace.define("ace/mode/logs_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"], function(acequire, exports, module) {
"use strict";

var oop = acequire("../lib/oop");
var TextHighlightRules = acequire("./text_highlight_rules").TextHighlightRules;

var LogHighlightRules = function() {
    this.$rules = {
        "start" : [
            {
                token : "error",
                caseInsensitive: true,
                regex : /error/
            },
            {
                token : "critical",
                caseInsensitive: true,
                regex : /critical/
            },
            {
                token : "info",
                caseInsensitive: true,
                regex : /notice|info|debug/
            },
            {
                token : "warning",
                caseInsensitive: true,
                regex : /warning/
            },
            {
                token : "http",
                caseInsensitive: true,
                regex : /(GET|POST|PUT|DELETE)(?!\w)/
            },
            {
                token: "date",
                regex: /(\d{4}|\d{2})[-/.]((?=0)0[1-9]|(?=1)1[0-2]|[1-9])[-/.]((?=[0-2])[0-2][0-9]|(?=3)3[0-1]|[1-9])/
            },
            {
                token: "time",
                regex: /( ([1-9]|(?=[0-1])[0-1][0-9]|(?=2)2[0-4]):(?=[0-5])[0-5][0-9](:(?=[0-5])[0-5][0-9])?(am|pm|a|p|AM|PM|A|P)?)/
            },
            {
                token: "file",
                regex: /([^\/])\B([\/][\w-\.\w-]+)+/
            },
            {
                token: "class",
                regex: /([\w-]+(\\\\))+[\w-]+|([\w-]+(\\))+[\w-]+/
            },
            {
                token:"link",
                regex: /(https:\/|http:\/|\/)(?:[\/][\w-\.\w-]+)+/
            },
            {
                token: "punctuation",
                regex: /[^\w]/
            },
            {
                token: "function",
                regex: /(\w+)(?=\(([\w, ]+|)\))/
            }

        ]
    };

    this.normalizeRules();
};

LogHighlightRules.metaData = {
    fileTypes: ['log'],
    name: 'Logs'
};

oop.inherits(LogHighlightRules, TextHighlightRules);

exports.LogHighlightRules = LogHighlightRules;
});

ace.define("ace/mode/logs",["require","exports","module","ace/lib/oop","ace/mode/text","ace/mode/logs_highlight_rules"], function(acequire, exports, module) {
"use strict";

var oop = acequire("../lib/oop");
var TextMode = acequire("./text").Mode;
var LogHighlightRules = acequire("./logs_highlight_rules").LogHighlightRules;

var Mode = function() {
    this.HighlightRules = LogHighlightRules;
};
oop.inherits(Mode, TextMode);

(function() {
    this.lineCommentStart = "#";
    this.$id = "ace/mode/logs";
}).call(Mode.prototype);

exports.Mode = Mode;
});
