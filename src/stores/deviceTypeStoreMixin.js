import getVariable from '../mixins/variablesMixin';
import Vue from 'vue';
import debounce from 'debounce';
import {StorePrototype} from "./storePrototype.class";

class DeviceTypeStore extends StorePrototype{
  constructor() {
    super();
    this.possibleTypes = ['desktop-pc','desktop-large','desktop-pc','desktop', 'tablet', 'mobile']
    this.laptopUpperLimit = getVariable('laptopUpperLimit')
    this.desktopPsUpperLimit = getVariable('desktopPcLowerLimit')
    this.tabletUpperLimit = getVariable('tabletUpperLimit')
    this.mobileUpperLimit = getVariable('mobileUpperLimit')
    this.mobileUpperLimit = getVariable('mobileUpperLimit')
    this.deviceType = NaN;
    this.methodFnMap = {
      'resize': [this.debounceCheckWidth]
    }
  }
  getStatus = () => {
    if (isNaN(this.deviceType)) {
      this.checkWidth();
    }
    return this.possibleTypes[this.deviceType];
  }
  checkWidth = () => {
    const width = window.innerWidth;

    let newDeviceType;
    switch (true) {
      case width > this.desktopPsUpperLimit:
        newDeviceType = 0;
        break;
      case width > this.laptopUpperLimit:
        newDeviceType = 1;
        break;
      case width > this.tabletUpperLimit:
        newDeviceType = 2;
        break;
      case width > this.mobileUpperLimit:
        newDeviceType = 4;
        break;
      default:
        newDeviceType = 5;
    }
    if (newDeviceType != this.deviceType) {
      this.deviceType = newDeviceType;
      this.runWatchers();
    }
  }
  debounceCheckWidth = debounce(() => {
    this.checkWidth();
  }, 30)
}

const deviceTypeStoreObject = new DeviceTypeStore();

export const deviceTypeStore = Vue.observable({
  getStatus: deviceTypeStoreObject.getStatus,
  removeWatcher: deviceTypeStoreObject.removeWatcher,
  addWatcher: deviceTypeStoreObject.addWatcher
})
