var socketSetup = function() {
    console.log('this will return a cool socket');
    var exampleSocket = new WebSocket("ws://127.0.0.1:8000/socketserver/");
    return exampleSocket;
};

module.exports = {
    setup: socketSetup
};
