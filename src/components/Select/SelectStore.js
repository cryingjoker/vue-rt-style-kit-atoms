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
  }
  setSelectorType(id,type){
    
    this.selectorsTypes[id] = type;
    this.runWatchersById(id);
    if(type == 'simple'){
      if(this.selectorsActiveValue[id]?.length > 1){
        const firstValue = this.selectorsActiveValue[id][0];
        this.removeAllActiveValue(id);
        this.setActiveValue(id,firstValue);
      }
    }
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
    
    if(this.selectorsActiveValue[id].indexOf(value) < 0){
      if(this.selectorsTypes[id] == 'simple'){
        this.removeAllActiveValue(id)
      }
      this.selectorsActiveValue[id].push(value)
      console.info('this.selectorsActiveValue',this.selectorsActiveValue);
      this.runWatchersById(id);
    }
  }
  removeActiveValue(id,value){
    console.info('removeActiveValue',id,value)
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
    }
    if(!this.selectorsValue[id][data.value]){
      this.selectorsValue[id][data.value] = 1
      this.selectors[id].push(data)
      if(this.selectors[id].length == 1 && this.isFirstActive[id]){
        this.setActiveValue(id,data.value)
      }
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
  setFirstActive(id){
    this.isFirstActive[id] = true;
    
    if(this.selectorsValue[id].length > 0 && !(this.selectorsActiveValue[id]?.length > 0)){
      this.setActiveValue(id,this.selectorsValue[id][0]);
    }
  }
  setDefaultValue(id, data){
    this.defaultValue = {label: data.label, value: data.value}
  }
  
}
const selectStoreObject = new SelectStoreClass();

export const SelectStore = Vue.observable(selectStoreObject)
