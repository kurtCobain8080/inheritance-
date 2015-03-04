/**
 * Created by Simone on 08/02/15.
 */
onmessage = function(e) {
    importScripts('alphaCutter_countour.js');
    importScripts('intersectionRectangle.js');
    //console.log('from worker... message! ---> ', e);
    try{
        var aC = alphaCutter(e.data.imgData,undefined,function(msg,data){
            var alreadyMsg = {
                "resultDescription" : msg,
                "message" : data
            };
            postMessage(alreadyMsg);
        });
    }
    catch(e){
        var errorMsg = {
            "resultDescription" : "error",
            "message" : {
                stack : e.stack,
                description : e.message
            }
        };
        postMessage(errorMsg);
        return;
    }
    var finalMessage = {
        "resultDescription" : "finished",
        "message" : aC
    };
    postMessage(finalMessage);
    close();
};
