import Vue from "vue";

const idsButtons = [];
const groupsButton = {};
const buttonsData = {};
const init = (_id, group = '', data)=>{
  return new Promise((resolve)=> {
    if (idsButtons.indexOf(_id) < 0) {
      idsButtons.push(_id)
      if (group.length > 0) {
        if (!groupsButton[group]) {
          groupsButton[group] = [_id]
        } else {
          groupsButton[group].push(_id)
        }
      }
      buttonsData[_id] = {...data};
      buttonsData[_id].watchers = [];
      buttonsData[_id].triggerWatcher = [];
      if(group.length > 0) {
        buttonsData[_id].group = group;
      }
      resolve()
    }else{
      resolve();
    }
  })
};

const getStatus = (_id)=>{
  return buttonsData[_id];
};

const addWatcher= (_id, fn, groupTriggerFn)=> {
  if(buttonsData[_id]){
    const button = buttonsData[_id];
    button.watchers.push(fn);
    if(groupTriggerFn) {
      button.triggerWatcher.push(groupTriggerFn);
    }
  }
};

const runWatcher = (_id)=>{
  const watchers = buttonsData[_id].watchers;
  for (let wKey in watchers) {
    watchers[wKey]();
  }
};
const runTriggerWatcher = (_id)=>{
  const watchers = buttonsData[_id].triggerWatcher;
  for (let wKey in watchers) {
    watchers[wKey]();
  }
};

const changeStatus = (_id,data,notRunWatcher = false)=>{
  if(buttonsData[_id]){
    const button = buttonsData[_id];
    const keys = Object.keys(data);
    keys.forEach((key)=>{
      buttonsData[_id][key] = data[key];
    });
    if(!notRunWatcher) {
      runWatcher(_id);

      if (button.group) {
        groupsButton[button.group].filter((id) => id !== _id).forEach((id) => {
          runTriggerWatcher(id);
        })
      }
    }
  }
};


export const buttonsStore = Vue.observable({
  init: init,
  getStatus: getStatus,
  changeStatus: changeStatus,
  addWatcher: addWatcher
});
