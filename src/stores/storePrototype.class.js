
export class StorePrototype {

    constructor(){
        this.watchers = {}
        this.methodFnMap = {}
        this.runWatchersByIdDebounceObjs = {}
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
        Object.values(this.watchers).forEach((fnArray) => {
            if (fnArray && fnArray.length > 0) {
                fnArray.forEach(fn => {
                    fn.call();
                });
            }
        });
    }
  
  debounceRunWatch = (id)=>{
      
      if(this.watchers[id]) {
        if(this.runWatchersByIdDebounceObjs[id]) {
          clearTimeout(this.runWatchersByIdDebounceObjs[id])
        }
        
        this.runWatchersByIdDebounceObjs[id] = setTimeout(()=>{
          Object.values(this.watchers[id]).forEach((fn) => {
            fn.call();
          });
          clearTimeout(this.runWatchersByIdDebounceObjs[id])
        },50)
        
      }
    }
    runWatchersById = (id) => this.debounceRunWatch(id)
    
    
    
    

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