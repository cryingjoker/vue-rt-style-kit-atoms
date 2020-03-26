import getVariable from '../mixins/variablesMixin';
import Vue from 'vue';
import  debounce from 'debounce';

const possibleTypes = ['desktop', 'tablet', 'mobile'];
const tabletUpperLimit = getVariable('tabletUpperLimit');
const mobileUpperLimit = getVariable('mobileUpperLimit');
const watchers = {};
let deviceType = NaN;

const checkWidth = () => {
  const width = window.innerWidth;

  let newDeviceType;
  switch (true) {
    case width > tabletUpperLimit:
      newDeviceType = 0;
      break;
    case width > mobileUpperLimit:
      newDeviceType = 1;
      break;
    default:
      newDeviceType = 2;
  }
  if (newDeviceType != deviceType) {
    deviceType = newDeviceType;
    runWatchers();
  }
};
const debounceCheckWidth = debounce(() => {
  checkWidth();
}, 30);
let statusEventListenet = 0;
const eventListener = (status = false) => {
  const statusNumber = status ? 1 : 0;
  if (statusNumber != statusEventListenet) {
    const methods = ['removeEventListener', 'addEventListener'];
    window[methods[statusNumber]]('resize', debounceCheckWidth);
    statusEventListenet = statusNumber;
  }
};

const runWatchers = () => {
  Object.values(watchers).forEach((fnArray) => {
    if (fnArray && fnArray.length > 0) {
      fnArray.forEach(fn => {
        fn.call();
      });
    }
  });
};
const addWatcher = (id, fn) => {
  if (!watchers[id]) {
    watchers[id] = [];
  }
  watchers[id].push(fn);
  eventListener(Object.keys(watchers).length > 0);
};
const removeWatcher = id => {
  delete watchers[id];

  eventListener(Object.keys(watchers).length > 0);
};
const getStatus = () => {
  if (isNaN(deviceType)) {
    checkWidth();
  }
  return possibleTypes[deviceType];
};

export const deviceTypeStore = Vue.observable({
  getStatus: getStatus,
  removeWatcher: removeWatcher,
  addWatcher: addWatcher
});
