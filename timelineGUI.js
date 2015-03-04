/**
 * Created by simone.dinuovo on 2/22/15.
 */

var timelineImpl = function(el,onclick, onchange){

    var ul = document.createElement("ul"); // assuming it exists
    var docfrag = document.createDocumentFragment();

    el.forEach(function(e) {
        var li = document.createElement("li");
        li.textContent = e.name;
        li.contentEditable = true;
        li.addEventListener('click',function(ee){

            onclick(e,ee);
        },false);
        li.addEventListener('keyup',function(e){
            if ( li.textContent == li.getAttribute('oldValue') ) return;
            li.setAttribute('oldValue',li.textContent);
            if ( li.textContent.length )
                li.setAttribute('empty','false');
            else
                li.setAttribute('empty','true');

            onchange(li.textContent);
        },false);
        docfrag.appendChild(li);
    });
    var li = document.createElement("li");
    li.textContent = "";
    li.contentEditable = true;
    li.setAttribute('empty','true');
    li.setAttribute('oldValue','');
    li.addEventListener('keyup',function(e){
        var trg = e.target||e.srcElement
        var nodeNumb = Array.prototype.indexOf.call(ul.childNodes, trg);
        //var nodeNumbNumber = el[nodeNumb];
        if ( li.textContent == li.getAttribute('oldValue') ) return;
        li.setAttribute('oldValue',li.textContent);
        if ( li.textContent.length )
            li.setAttribute('empty','false');
        else
            li.setAttribute('empty','true');

        onchange(nodeNumb,li.textContent);
    },false);
    li.addEventListener('click',function(ee){
        var nodeNumb = Array.prototype.indexOf.call(ul.childNodes, ee.target||ee.srcElement);
        var e = el[nodeNumb];
        onclick(e,ee);
    },false);
    docfrag.appendChild(li);
    ul.appendChild(docfrag);
    return ul;
}
