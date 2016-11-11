exports.logsyTheme = [
    {
        name : "logsy_error",
        pattern : /\[?error\]?/gi
    },
    {
        name : "logsy_critical",
        pattern : /\[?critical\]?/gi
    },
    {
        name : "logsy_info",
        pattern : /\[?(info)\]?/gi
    },
    {
        name : "logsy_debug",
        pattern : /\[?(debug)\]?/gi
    },
    {
        name : "logsy_notice",
        pattern : /\[?(notice)\]?/gi
    },
    {
        name : "logsy_warning",
        pattern : /\[?warning\]?/gi
    },
    {
        name : "logsy_http",
        pattern : /(GET|POST|PUT|DELETE)(?!\w)/g
    },
    {
        name: "logsy_dateTime",
        pattern: /\[?(\d{4}|\d{2})[-/.]((?=0)0[1-9]|(?=1)1[0-2]|[1-9])[-/.]((?=[0-2])[0-2][0-9]|(?=3)3[0-1]|[1-9]) (([1-9]|(?=[0-1])[0-1][0-9]|(?=2)2[0-4]):(?=[0-5])[0-5][0-9](:(?=[0-5])[0-5][0-9])?(am|pm|a|p|AM|PM|A|P)?)\]?/g
    },
    {
        name: "logsy_dateTime",
        pattern: /\[? *(\w{3})[ \t]*(\w{3})[ \t]*\d{1,2}[ \t]*(([1-9]|(?=[0-1])[0-1][0-9]|(?=2)2[0-4]):(?=[0-5])[0-5][0-9](:(?=[0-5])[0-5][0-9])?(am|pm|a|p|AM|PM|A|P)?)[ \t]*(\d{4}|\d{2})[ \t]*\]?/g
    },
    {
        name: "logsy_date",
        pattern: /(\d{4}|\d{2})[-/.]((?=0)0[1-9]|(?=1)1[0-2]|[1-9])[-/.]((?=[0-2])[0-2][0-9]|(?=3)3[0-1]|[1-9])/g
    },
    {
        name: "logsy_time",
        pattern: /(([1-9]|(?=[0-1])[0-1][0-9]|(?=2)2[0-4]):(?=[0-5])[0-5][0-9](:(?=[0-5])[0-5][0-9])?(am|pm|a|p|AM|PM|A|P)?)/g
    },
    {
        name: "logsy_ip",
        pattern: /(\[client|\[)?[ \t]*\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\]?/g
    },
    {
        name: "logsy_file",
        pattern: /([^\/])\B([\/][\w-\.\w-]+)+/g
    },
    {
        name: "logsy_class",
        pattern: /([\w-]+(\\\\))+[\w-]+|([\w-]+(\\))+[\w-]+/g
    },
    {
        name:"logsy_link",
        pattern: /(https:\/|http:\/|\/)(?:[\/][\w-\.\w-]+)+/g
    },
    {
        name: "logsy_punctuation",
        pattern: /[^\w]/g
    },
    {
        name: "logsy_function",
        pattern: /(\w+)(?=\(([\w, ]+|)\))/g
    }

];
