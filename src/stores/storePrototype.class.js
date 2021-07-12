export class StorePrototype {

    constructor(){
        this.watchers = {}
        this.methodFnMap = {}
    }

    addWatcher = (id, fn) => {
        if (!this.watchers[id]) {
            this.watchers[id] = [];
        }
        this.watchers[id].push(fn);
        this.eventListener(Object.keys(this.watchers).length > 0);
        fn()
    }

    runWatchers = () => {
      if(this.watchers) {
        Object.values(this.watchers).forEach((fnArray) => {
          if (fnArray && fnArray.length > 0) {
            fnArray.forEach(fn => {
              fn.call();
            });
          }
        });
      }
    }

    runWatchersById = (id) => {
        if(this.watchers[id]) {
            Object.values(this.watchers[id]).forEach((fn) => {
                fn.call();
            });
        }
    }

    removeWatcher = id => {
        delete this.watchers[id];
        this.eventListener(Object.keys(this.watchers).length > 0);
    }

    eventListener = (status = false) => {
        const statusNumber = status ? 1 : 0;
        if (statusNumber != this.statusEventListenet) {
            const methods = ['removeEventListener', 'addEventListener'];
            Object.keys(this.methodFnMap).forEach((method)=>{
                this.methodFnMap[method].forEach((fn)=>{
                    window[methods[statusNumber]](method, fn);
                })
            })
            this.statusEventListenet = statusNumber;
        }
    };

}