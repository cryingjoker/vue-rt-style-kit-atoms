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
    this.focusIndex = {};
    this.autocompleteText = {}
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
    this.createSelectorDefaultProps(id);
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
  
  getSelectorType(id, type, multiple = false) {
    this.selectorsTypes[id] = {type:type,multiple:multiple};
  }
  
  getSelectorOptions(id) {
    return this.selectors[id]
  }
  
  setActiveValue(id, value) {
    
    if (Array.isArray(value)) {
      value.forEach(val => this.setActiveValue(id, val))
    } else {
      if (this.selectorsActiveValue[id]?.indexOf(value) < 0) {
        if (!this.selectorsTypes[id]?.multiple) {
          this.removeAllActiveValue(id)
          this.setClose(id)
        }
        this.selectorsActiveValue[id].push(value)
        if (this.selectorsTypes[id]?.multiple) {
          const values = Object.keys(this.selectorsValue[id]);
          this.selectorsActiveValue[id].sort((a,b)=>{
            return values.indexOf(a) <= values.indexOf(b) ? -1 : 1
          })
        }
        this.runWatchersById(id);
        this.setActiveFocusEl(id)
      }
    }
  }
  
  removeActiveValue(id, value) {
    const index = this.selectorsActiveValue[id]?.indexOf(value);
    if(this.selectorsTypes[id].multiple) {
      if (index >= 0) {
        this.selectorsActiveValue[id].splice(index, 1)
        this.runWatchersById(id);
      }
    } else {
      this.setClose(id);
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
    if(this.selectorsTypes[id] && this.selectors[id]) {
      if (!this.selectorsTypes[id].multiple) {
        activeIndexes[this.selectors[id].findIndex((i) => i.value == this.selectorsActiveValue[id][0])] = 1
      }
      else {
        this.selectorsActiveValue[id]?.map((activeVal) => {
          return this.selectors[id].findIndex((i) => i.value == activeVal)
        }).forEach((activeKey) => {
          activeIndexes[activeKey] = 1
        })
      }
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
    if(this.focusIndex[id] == -1) {
      this.setFocusIndex(id, 0)
    } else {
      this.setFocusIndex(id, (this.focusIndex[id] + 1) % size)
    }
  }
  
  setPreviousFocus(id) {
    const size = this.selectors[id].length;
    if(this.focusIndex[id] == -1) {
      this.setFocusIndex(id, this.selectors[id].length - 1)
    } else {
      this.setFocusIndex(id, (this.focusIndex[id] - 1 + size) % size)
    }
  }
  
  setActiveFocusEl(id) {
    if (!this.selectorsTypes[id]?.multiple) {
      this.setFocusIndex(id, this.selectors[id].findIndex(i => i.value == this.selectorsActiveValue[id][0]))
    }
  }
  addJson(id, json){
    if(json.length == 0) {
      this.selectors[id] = []
    } else {
      json.forEach((obj)=>{
        this.setSelectorOption(id,obj)
      })
    }
  }
  createSelectorDefaultProps(id){
    if (!this.selectors[id]) {
      this.selectors[id] = [];
      this.selectorsValue[id] = {};
      this.selectorsActiveValue[id] = [];
      this.selectorsOpenStatus[id] = false;
      if (!this.selectorsTypes[id]?.multiple) {
        this.focusIndex[id] = -1;
      }
    }
  }
  setSelectorOption(id, data) {
    this.createSelectorDefaultProps(id);
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
  
  // setFirstActive(id, value) {
  //   this.isFirstActive[id] = true;
  //   if (!!this.selectorsValue[id] && !(this.selectorsActiveValue[id]?.length > 0)) {
  //     this.setActiveValue(id, value);
  //   }
  // }
  
  setDefaultValue(id, data) {
    this.defaultValue[id] = {label: data.label, value: data.value}
  }

  setInputText(id, str) {
    this.autocompleteText[id] = str;
  }
  getInputText(id) {
    return this.autocompleteText[id];
  }
}

const selectStoreObject = new SelectStoreClass();

export const SelectStore = Vue.observable(selectStoreObject)
