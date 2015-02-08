/**
 * Created by Simone on 08/02/15.
 */
function createWorker(worker,data,callback){
    var w;
    function startWorker() {
        if(typeof(Worker) !== "undefined") {
            if(typeof(w) === "undefined") {
                w = new Worker(worker);
                w.postMessage(data);
                w.onmessage = function(event) {
                    callback(event.data);
                };
            }
        } else {
            throw new Error('workers are not supported in this Browser. Create Worker is exiting.')
            return false;
        }
    }
    startWorker();
    return{
        w : function(){
            return w;
        },
        stopWorker:function(){
            w.terminate();
            w = undefined;
        },
        startWorker:startWorker
    };
}
