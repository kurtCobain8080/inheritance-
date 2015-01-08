/**
 * Created by Simone on 24/12/14.
 */
/**
 *
 * @param options(object) = {
 * @param el {HTMLInputElement}
 * @param change {function} - function on change
 * @param callback {function}
 * }

 */
var uploadFile = function(options){
    var el = options.el;
    var change = options.change;
    var callback = options.callback;
    var $self = (function(){
        /**
         * @private
         */
        var processFile = function(file,processCallback)
        {
            var reader = new FileReader();

            if(file.type.indexOf("text") >= 0 ){
                reader.onload = function(e) {
                    processCallback(e.target.result);
                 }
                reader.readAsText(file);
            }
            else if(file.type.indexOf("image") >= 0){
                reader.onload = function(e) {
                    var image = new Image();
                    image.onload = function(){
                        processCallback(image);
                    }
                    image.src = e.target.result;
                }
                reader.readAsDataURL(file);
            }
        }
        el.addEventListener("change", function(e){
            change();
            var files = e.target.files;
            for(var i=0;i<files.length;i++) // adding multiple selection help
            {
                processFile(files[i],function(processedFile){
                    callback(processedFile);
                });
            }
        });
    })();
    return $self;
}