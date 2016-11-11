// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const ipc = require('electron').ipcRenderer;
const fs = require('fs');
const $ = require('jquery');
const Tail = require('always-tail');
const es = require('event-stream');
const rainbow = require('rainbow-code');

var syntax = require('./assets/js/log_syntax.js');

const selectFileBtn = document.getElementById('select-file');

var tailer = null;
var lineNbr = null;

rainbow.extend('logsy', syntax.logsyTheme);

selectFileBtn.addEventListener('click', function (event) {
    ipc.send('open-file-dialog');
});

ipc.on('selected-file', function (event, path) {
        if(!lineNbr)
            logsyUtils.filter();

        $('footer .fileName').html(path);

        logsyUtils.toggleLoader();
        if ($('#fileDisplay').html() !== '') {
            tailer.unwatch();
            $('#fileDisplay').html('');
            $('#fileDisplay').removeClass('hundredth_line');
        }

        logsyUtils.readFile(path[0]);

        tailer = logsyUtils.tail(path[0]);

});

logsyUtils = {};

logsyUtils.toggleLoader = function(){
    $('.loader').toggle();
    $('.loadingTool').toggle();
};

logsyUtils.writeLine = function(line){
    if (line) {
        $('#fileDisplay').append('<div class="logsy_line" data-line="'+lineNbr+'">'+rainbow.colorSync(line, 'logsy')+'</div>');
    }else{
        lineNbr--;
    }
};

logsyUtils.writeLine = function(line){
    if (line) {
        $('#fileDisplay').append('<div class="logsy_line" data-line="'+lineNbr+'">'+rainbow.colorSync(line, 'logsy')+'</div>');
    }else{
        lineNbr--;
    }
};

logsyUtils.readFile = function(fileName){
    // OLD CODE READING FILE
    // data = fs.readFileSync(path[0], 'utf-8');
    // if (data ===  null) {
    //     document.getElementByClass('fileDisplay').innerHTML = "There is no file";
    // } else {
    //
    //     editor.getSession().setMode('ace/mode/logs');
    //     editor.setTheme('ace/theme/logsy');
    //     editor.setReadOnly(true);
    //     editor.setValue(data);
    //     editor.clearSelection();
    //
    // }
    lineNbr = 0;
    var s = fs.createReadStream(fileName, {encoding: 'utf-8'})
    .pipe(es.split())
    // .pipe(es.join('\n'))
    .pipe(es.mapSync(function(line){

            // pause the readstream
            s.pause();

            lineNbr++;
            if (lineNbr > 99)
                $('#fileDisplay').addClass('hundredth_line');

            // process line here and call s.resume() when rdy
            // function below was for logging memory usage

            logsyUtils.writeLine(line);
            // resume the readstream, possibly from a callback
            s.resume();
        })
        .on('error', function(){
            console.log('Error while reading file.');
        })
        .on('end', function(){
            console.log('Read entire file.');
            logsyUtils.toggleLoader();
        })
    );
};

logsyUtils.tail = function(fileName){
    var tail = new Tail(fileName);
    tail.on('line', function(data) {
        lineNbr++;
        logsyUtils.writeLine(data);
    });

    tail.on('error', function(data) {
      console.log("error:", data);
    });

    tail.watch();
    return tail;
    // to unwatch and close all file descriptors, tail.unwatch();
};

logsyUtils.filter = function(){
    $('.filter button').on('click', function(){
        $(this).toggleClass('active');
        $('.logsy_'+$(this).data('filter')).parent('.logsy_line').toggleClass('hidden');
    });
};
logsyUtils.resetFilter = function(){
    $('.filter button').removeClass("active");
};
