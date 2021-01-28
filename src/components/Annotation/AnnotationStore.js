import Vue from "vue";

const annotations = [];
let activeAnnotationID = null;
const watchers = {};

const initStore = (uid, isOpened) => {
  annotations[uid] = {isOpened : isOpened};
};

const setActive = (uid) => {
  if (activeAnnotationID === uid) return;
  activeAnnotationID = uid;
  runWatchers()
};

const getActive = () => {
  return activeAnnotationID;
};

const addWatcher = (id, fn) => {
  if(annotations[id]) {
    watchers[id] = fn
  }
};

const removeWatcher = (id) => {
  delete watchers[id];
};

const clearStore = (id) => {
  delete annotations[id];
};

const runWatchers = () => {
  Object.keys(watchers).forEach((id) => {
    watchers[id]()
  })
};

export const AnnotationStore = Vue.observable({
  initStore: initStore,
  setActive: setActive,
  addWatcher: addWatcher,
  getActive: getActive,
  removeWatcher: removeWatcher,
  clearStore: clearStore
});
