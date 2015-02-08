/**
 * Created by Simone on 08/02/15.
 */
onmessage = function(e) {
    importScripts('alphaCutter.js');
    console.log('from worker... message! ---> ', e);
    var aC = alphaCutter(e.data.imgData);
    postMessage(aC);
};
