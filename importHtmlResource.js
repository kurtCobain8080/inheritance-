/**
 * Created by simone.dinuovo on 02/01/15.
 */

var importHtmlResource = function(){
    var requires = document.getElementsByClassName('importHtmlResource');
    this.loaded = false;
    var getStylesheets = function(doc){
        var stylesheets = document.createDocumentFragment();
        var external = doc.querySelectorAll('link');
        var internal = doc.querySelectorAll('style');
        for ( var i = 0; i<external.length; i++ )
        {
            if ( external[i].rel == 'stylesheet' )
                stylesheets.appendChild(external[i]);
                //stylesheets+='<link href="' + external[i].href + '" rel="stylesheet" />\n';
                //;
        }
        for ( var k = 0; k<internal.length; k++)
                stylesheets.appendChild(internal[k]);
                //stylesheets+='<style>' + internal[k].innerHTML + '</style>';
                //

        return stylesheets;
    };
    var scriptLoaded = 0;
    var getScripts = function(doc,callback){
        var interalScripts = document.createDocumentFragment();
        var externalScripts = document.createDocumentFragment();
        var docScripts = doc.getElementsByTagName('script');
        var countingExternalScripts = 0;
        for ( var i = 0; i< docScripts.length;i++ )
        {
            var newScript = document.createElement('script');
            newScript.type = 'text/javascript';
            if ( docScripts[i].src.length ) {
                newScript.src = docScripts[i].src;
                newScript.async = true;
                newScript.onload = function(){
                    scriptLoaded++;
                };
                countingExternalScripts++;
                externalScripts.appendChild(newScript);
            }
            else {
                newScript.innerHTML = docScripts[i].innerHTML;
                interalScripts.appendChild(newScript);
                console.log("Forse qui?");
            }
        }
        var scripts = {
            ext : externalScripts,
            int : interalScripts,
            extLength : countingExternalScripts
        }
        return scripts
    }
    var getBody = function(doc){
        var body = document.createDocumentFragment();
        var bodyDoc = doc.querySelectorAll("body>*:not(script):not(noscript)");
        for ( var i = 0; i< bodyDoc.length;i++ )
        {
            body.appendChild(bodyDoc[i]);
        }

        return body;
    }
    var bindResources = function(el, url){
        var frame = document.createElement('frame');
        frame.src = url;
        frame.width = 0;
        frame.height = 0;
        document.body.appendChild(frame);
        frame.onload = function(e){
            var frameDocument = frame.contentDocument || frame.contentWindow.document;
            el.appendChild(getBody(frameDocument));
            var stylesheets = getStylesheets(frameDocument);
            document.getElementsByTagName('head')[0].appendChild(stylesheets);
            var scripts = getScripts(frameDocument);
            insertScripts = function (){
                if ( scripts.extLength == scriptLoaded )
                {
                    document.body.appendChild(scripts.int);
                    frame.parentNode.removeChild(frame);
                    this.loaded = true;
                }
                else
                    setTimeout( function(){ insertScripts() } );
            };
            document.body.appendChild(scripts.ext);
            insertScripts();
        }
    }
    for (var i = 0; i<requires.length;i++)
    {
        bindResources( requires[i], requires[i].getAttribute('data-url') );
    }
    return this;
};
