/**
 * Created by Simone on 08/02/15.
 */
function createWorker(worker,data,callback){
    var $self = {};
    function startWorker() {
        if(typeof(Worker) !== "undefined") {
            if(typeof($self.w) === "undefined") {
                $self.w = new Worker(worker);
                $self.w.postMessage(data);
                $self.w.onmessage = function(event) {
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
        w : $self.w,
        stopWorker:function(w){
            w.terminate();
            w = undefined;
        },
        startWorker:startWorker
    };
}
