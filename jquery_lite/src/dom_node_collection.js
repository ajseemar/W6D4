class DOMNodeCollection {
    constructor (arr) {
        this.elements = arr;
    }

    html (arg = null) {
        if (arg) {
            this.elements.forEach(el => el.innerHTML = arg);
        } else {
            this.elements[0].innerHTML;
        }
    }

    empty () {
        this.elements.forEach( el => el.innerHTML = "");
    }

    append (arg) {
        switch (typeof arg) {
            case 'DOMNodeCollection':
                this.elements.forEach((el) => {
                    for (let i = 0; i < arg.length; i++) {
                        el.innerHTML += arg[i].outerHTML; 
                    }
                });
                break; 
            case 'string':
                this.elements.forEach((el) => {
                    el.innerHTML += arg;
                 });
                break; 
            case 'HTMLElement': 
                this.elements.forEach((el) => {
                     el.innerHTML += arg.outerHTML;
                 });
                break;
        }
    }

    children() {
        const kids = [];   
        let sad_orphans;  

        for (let i = 0; i < this.elements.length; i++) {
            sad_orphans = this.elements[i].children; 
            for (let j = 0; j < sad_orphans.length; j++) {
                kids.push(sad_orphans[j]); 
            }
        }

        return new DOMNodeCollection(kids);
    }

    attr(attr, val = null) {
        if (val === null) return this.elements[0].getAttribute(attr);

        for (let i = 0; i < this.elements.length; i++) {
            this.elements[i].setAttribute(attr, val);
        }
    }

    addClass(val) {
        this.attr("class", val); 
    } 

    removeClass() {
        this.attr("class", "");
    }

    parent() {
        let daddies = []; 

        this.elements.forEach( (kid) => daddies.push(kid.parentNode) );

        return new DOMNodeCollection(daddies);
    }

    find(arg) {
        const me = []; 

        this.children().elements.forEach( (el) => {
            me.concat(el.querySelectorAll(arg));
        });

        return new DOMNodeCollection(me);
    }

}

module.exports = DOMNodeCollection;