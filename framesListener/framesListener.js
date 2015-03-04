/**
 * Created by simone.dinuovo on 30/09/14.
 */

var framesListener = (function(){

    if ( window.location.host == "file://" || window.location.protocol == "file:")
        var origin = "*";
    else
        var origin = location.protocol + '//' + location.host; //window.location.host.replace(':' + window.location.port,'');

    return {
        origin: origin,
        listener : function(callback){
            if ( typeof callback === 'undefined' ) return false;

            function receiveMessage(event)
            {


                // Do we trust the sender of this message?  (might be
                // different from what we originally opened, for example).
                //console.log('event.origin -->', event.origin);
                if (event.origin !== origin && ( window.location.protocol != "file:" && window.location.host == "file://")  )
                    return;

                // event.source is popup
                // event.data is "hi there yourself!  the secret response is: rheeeeet!"
                callback( event.data, event.source );
            }
            window.addEventListener("message", receiveMessage, false);
        },
        listen : function(phrase, callback){

            function receiveMessage(event)
            {


                // Do we trust the sender of this message?  (might be
                // different from what we originally opened, for example).
                //console.log('event.origin -->', event.origin);
                if (event.origin !== origin && ( window.location.protocol != "file:" && window.location.host == "file://") )
                    return;

                // event.source is popup
                // event.data is "hi there yourself!  the secret response is: rheeeeet!"
                if ( event.data.message == phrase )
                    callback( event, event.source );
            }
            window.addEventListener("message", receiveMessage, false);
        },
        send: function(el,msgData){
            el.postMessage(msgData, origin);
        },
        destroy : function(){
           window.removeEventListener('message', receiveMessage ,false);
        }
    }

})();