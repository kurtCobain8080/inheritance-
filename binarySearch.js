/**
 * Created by Simone on 08/02/15.
 */
var N = 10000; // length of array
var Q = 5000; // value to find

var nativeArray = [];
var typedArray = new Uint16Array(N);
typedArray.indexOf = Array.prototype.indexOf;

for(var i=0; i<N; i++) {
    var v = N + 1;
    nativeArray.push(v);
    typedArray[i] = v;
}

function binarySearch(arr, val) {
    // given that arr is sorted,
    // find i for which arr[i] == val
    // if it doesn't exist, return -1

    start = 0;
    end = arr.length - 1;

    while(end >= start) {
        midptidx = Math.floor((start+end)/2);
        midptval = arr[midptidx];
        if(midptval === val) {
            return midptidx;
        } else if(midptval > val) {
            end = midptidx - 1;
        } else {
            start = midptidx + 1;
        }
    }
    return -1;
}

binarySearch(typedArray,Q)
