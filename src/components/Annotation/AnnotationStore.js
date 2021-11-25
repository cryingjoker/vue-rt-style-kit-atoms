import Vue from "vue";

import {StorePrototype} from "../../stores/storePrototype.class";

class AnnotationStore extends StorePrototype {
  constructor() {
    super();
    this.annotations = {}
    
  }
  
  initStore = (uid, isOpened, settings, fn) => {
    if (!this.annotations[settings.parentUid]) {
      this.annotations[settings.parentUid] = {
        childs: [],
        isOnlyOneOpen: {},
        actives: []
      }
    }
    this.annotations[settings.parentUid].childs.push(uid);
    this.annotations[settings.parentUid].isOnlyOneOpen[uid] = settings.isOnlyOneOpen
    
    this.addWatcher(settings.parentUid, fn)
    if (isOpened) {
      this.setActive(settings.parentUid, uid)
    }
  }
  setActive = (parentUid, uid) => {
    const annotatiosObj = this.annotations[parentUid];
    if (annotatiosObj) {
      if (annotatiosObj.isOnlyOneOpen[uid]) {
        annotatiosObj.actives = [uid]
      } else {
        annotatiosObj.actives.push(uid)
      }
      this.runWatchers(parentUid);
    }
  }
  toggle = (parentUid, uid) => {
    const annotatiosObj = this.annotations[parentUid];
    if(this.isActive(parentUid, uid)){
      this.disableActive(parentUid, uid)
    }else{
      this.setActive(parentUid, uid)
    }
  }
  disableActive=(parentUid, uid)=>{
    
    const annotatiosObj = this.annotations[parentUid];
    if (annotatiosObj) {
      
        const index = annotatiosObj.actives.indexOf(uid);
        if(index >= 0) {
          annotatiosObj.actives.splice(index,1)
        }
      
      this.runWatchers(parentUid);
    }
  }
  isActive = (parentUid, uid) => {
    return this.annotations[parentUid]?.actives.indexOf(uid) >= 0;
  }
  
  clearStore = (parentUid, uid) => {
    const annotatiosObj = this.annotations[parentUid];
    if (annotatiosObj) {
      const indexInActive = annotatiosObj.actives.indexOf(uid)
      const indexInChilds = annotatiosObj.childs.indexOf(uid)
      if (indexInActive >= 0) {
        annotatiosObj.actives.splice(indexInActive, 1)
      }
      if (indexInChilds >= 0) {
        annotatiosObj.actives.splice(indexInActive, 1)
      }
      
    }
  }
}

const annotationStoreObject = new AnnotationStore();
export const annotationStore = Vue.observable({
  toggle: annotationStoreObject.toggle,
  initStore: annotationStoreObject.initStore,
  setActive: annotationStoreObject.setActive,
  removeWatcher: annotationStoreObject.removeWatcher,
  isActive: annotationStoreObject.isActive,
  clearStore: annotationStoreObject.clearStore
});

// const initStore = (uid, isOpened, settings) => {
//     annotations[uid] = {
//       isOpened : isOpened,
//       settings: settings
//     };
//
//
// };
//
// const setActive = (uid) => {
//   if (annotations[uid].settings.isOnlyOneOpen && activeAnnotationID[0] === uid) return;
//
//   activeAnnotationID = uid;
//
//   runWatchers()
// };
//
// const getActive = () => {
//   return activeAnnotationID;
// };
//
// const addWatcher = (id, fn) => {
//   if(annotations[id]) {
//     watchers[id] = fn
//   }
// };
//
// const removeWatcher = (id) => {
//   delete watchers[id];
// };
//
// const clearStore = (id) => {
//   delete annotations[id];
// };
//
// const runWatchers = () => {
//   Object.keys(watchers).forEach((id) => {
//     watchers[id]()
//   })
// };
//
// export const AnnotationStore = Vue.observable({
//     initStore: initStore,
//     setActive: setActive,
//     addWatcher: addWatcher,
//     getActive: getActive,
//     removeWatcher: removeWatcher,
//     clearStore: clearStore
// });
