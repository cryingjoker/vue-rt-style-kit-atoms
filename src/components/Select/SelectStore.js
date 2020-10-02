import Vue from "vue";

import {StorePrototype} from '../../stores/storePrototype.class'


class SelectStoreClass extends StorePrototype {
  constructor(props) {
    super(props);
    this.selectors = {};
    this.selectorsTypes = {};
    this.selectorsValue = {};
    this.selectorsActiveValue = {};
    this.isFirstActive = {};
    this.defaultValue = {};
    this.selectorsOpenStatus = {}
    this.focusIndex = {}
  }
  
  setOpen(id) {
    this.selectorsOpenStatus[id] = true;
    this.runWatchersById(id);
  }
  
  setClose(id) {
    this.selectorsOpenStatus[id] = false;
    this.runWatchersById(id);
  }
  
  getOpenStatus(id) {
    return this.selectorsOpenStatus[id]
  }
  
  setSelectorType(id, type) {
    
    this.selectorsTypes[id] = type;
    this.runWatchersById(id);
    if (type == 'simple') {
      if (this.selectorsActiveValue[id]?.length > 1) {
        const firstValue = this.selectorsActiveValue[id][0];
        this.removeAllActiveValue(id);
        this.setActiveValue(id, firstValue);
      }
    }
  }
  
  clear(id) {
    delete this.selectors[id];
    delete this.selectorsTypes[id];
    delete this.selectorsValue[id];
    delete this.selectorsActiveValue[id];
    delete this.selectorsOpenStatus[id];
    delete this.focusIndex[id];
  }
  
  getSelectorType(id, type) {
    this.selectorsTypes[id] = type;
  }
  
  getSelectorOptions(id) {
    return this.selectors[id]
  }
  
  setActiveValue(id, value) {
    if (Array.isArray(value)) {
      value.forEach(val => this.setActiveValue(id, val))
    } else {
      if (this.selectorsActiveValue[id]?.indexOf(value) < 0) {
        if (this.selectorsTypes[id] == 'simple') {
          this.removeAllActiveValue(id)
          this.setClose(id)
        }
        this.selectorsActiveValue[id].push(value)
        if (this.selectorsTypes[id] == 'multiselect') {
          const values = Object.keys(this.selectorsValue[id]);
          this.selectorsActiveValue[id].sort((a,b)=>{
            return values.indexOf(a) <= values.indexOf(b) ? -1 : 1
          })
        }
        this.runWatchersById(id);
        if (this.selectorsTypes[id] == 'simple') {
          this.setActiveFocusEl(id)
        }
      }
    }
  }
  
  removeActiveValue(id, value) {
    const index = this.selectorsActiveValue[id]?.indexOf(value);
    if (index >= 0) {
      this.selectorsActiveValue[id].splice(index, 1)
      this.runWatchersById(id);
    }
  }
  
  removeAllActiveValue(id) {
    this.selectorsActiveValue[id] = []
    this.runWatchersById(id);
  }
  
  getActiveValue(id) {
    return this.selectorsActiveValue[id]
  }
  
  getActiveLabels(id) {
    if (this.selectorsActiveValue[id]?.length > 0) {
      return this.selectorsActiveValue[id]?.map((value) => {
        return this.selectors[id].find((item) => item.value == value)?.label
      }).filter(i => i)
    }
    return this.selectorsActiveValue[id]
  }
  
  getActiveIndex(id) {
    const activeIndexes = {}
    if (this.selectorsTypes[id] == 'simple') {
      activeIndexes[this.selectors[id].findIndex((i) => i.value == this.selectorsActiveValue[id][0])] = 1
    }
    if (this.selectorsTypes[id] == 'multiselect') {
      this.selectorsActiveValue[id]?.map((activeVal) => {
        return this.selectors[id].findIndex((i) => i.value == activeVal)
      }).forEach((activeKey) => {
        activeIndexes[activeKey] = 1
      })
    }
    return activeIndexes
  }
  
  getFocusIndex(id) {
    return this.focusIndex[id]
  }
  
  setFocusIndex(id, index) {
    if (index > this.selectors[id].length) {
      index = 0;
    }
    this.focusIndex[id] = index;
    this.runWatchersById(id);
  }
  
  setNextFocus(id) {
    const size = this.selectors[id].length;
    this.setFocusIndex(id, (this.focusIndex[id] + 1) % size)
  }
  
  setPreviewFocus(id) {
    const size = this.selectors[id].length;
    this.setFocusIndex(id, (this.focusIndex[id] - 1 + size) % size)
  }
  
  setActiveFocusEl(id) {
    this.setFocusIndex(id, this.selectors[id].findIndex(i => i.value == this.selectorsActiveValue[id][0]))
  }
  addJson(id, json){
    json.forEach((obj)=>{
      this.setSelectorOption(id,obj)
    })
  }
  setSelectorOption(id, data) {
    if (!this.selectors[id]) {
      this.selectors[id] = [];
      this.selectorsValue[id] = {};
      this.selectorsActiveValue[id] = [];
      this.selectorsOpenStatus[id] = false;
      this.focusIndex[id] = 0;
    }
    if (!this.selectorsValue[id][data.value]) {
      this.selectorsValue[id][data.value] = 1
      this.selectors[id].push(data)
      if (this.selectors[id].length == 1 && this.isFirstActive[id]) {
        this.setActiveValue(id, data.value)
      }
    }
    this.runWatchersById(id);
  }
  
  removeSelectorOption(id, data) {
    if (this.selectors[id]) {
      delete this.selectorsValue[id][data.value]
      let index = this.selectors[id]?.indexOf(data);
      this.selectors[id].splice(index, 1)
      this.runWatchersById(id);
      this.removeActiveValue(data.value);
    }
  }
  
  setFirstActive(id) {
    this.isFirstActive[id] = true;
    
    if (this.selectorsValue[id].length > 0 && !(this.selectorsActiveValue[id]?.length > 0)) {
      this.setActiveValue(id, this.selectorsValue[id][0]);
    }
  }
  
  setDefaultValue(id, data) {
    this.defaultValue = {label: data.label, value: data.value}
  }
  
}

const selectStoreObject = new SelectStoreClass();

export const SelectStore = Vue.observable(selectStoreObject)
