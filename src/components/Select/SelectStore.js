import Vue from "vue";

import {StorePrototype} from '../../stores/storePrototype.class'


class SelectStoreClass extends StorePrototype {
  constructor(props) {
    super(props);
    this.selectors = {};
    this.selectorsTypes = {};
    this.selectorsValue = {};
    this.selectorsActiveValue = {};
  }
  setSelectorType(id,type){
    this.selectorsTypes[id] = type;
    this.runWatchersById(id);
  }
  clear(id){
    delete this.selectors[id];
    delete this.selectorsTypes[id];
    delete this.selectorsValue[id];
    delete this.selectorsActiveValue[id];
  }
  getSelectorType(id,type){
    this.selectorsTypes[id] = type;
  }
  getSelectorOptions(id){
    return this.selectors[id]
  }
  setActiveValue(id,value){
    console.info('this.selectorsActiveValue',this.selectorsActiveValue,id);
    if(this.selectorsActiveValue[id].indexOf(value) < 0){
      this.selectorsActiveValue[id].push(value)
      this.runWatchersById(id);
      console.info('setActiveValue',id,value)
    }
  }
  removeActiveValue(id,value){
    const index = this.selectorsActiveValue[id].indexOf(value);
    if(index >=0){
      this.selectorsActiveValue[id].splice(index,1)
      this.runWatchersById(id);
    }
  }
  removeAllActiveValue(id){
    this.selectorsActiveValue[id] = []
    this.runWatchersById(id);
  }
  getActiveValue(id){
    return this.selectorsActiveValue[id]
  }
  setSelectorOption(id,data){
    if(!this.selectors[id]){
      this.selectors[id] = [];
      this.selectorsValue[id] = {};
      this.selectorsActiveValue[id] = [];
      console.info('set this.selectorsActiveValue',this.selectorsActiveValue);
    }
    if(!this.selectorsValue[id][data.value]){
      this.selectorsValue[id][data.value] = 1
      this.selectors[id].push(data)
    }
    this.runWatchersById(id);
  }
  removeSelectorOption(id,data){
    if(this.selectors[id]){
      delete this.selectorsValue[id][data.value]
      let index = this.selectors[id].indexOf(data);
      this.selectors[id].splice(index,1)
      this.runWatchersById(id);
      this.removeActiveValue(data.value);
    }
  }
  
}
const selectStoreObject = new SelectStoreClass();

export const SelectStore = Vue.observable(selectStoreObject)
