import getVariable from '../mixins/variablesMixin';
import Vue from 'vue';
import debounce from 'debounce';
import StorePrototype from "./storePrototype.class";

class ViewportPositionStore extends StorePrototype {
    constructor() {
        super();
        this.methodFnMap = {
            'resize': [this.debouncecheckAllPositions],
            'scroll': [this.debouncecheckAllPositions]
        }
        this.$els = {}
    }


    getViewportSize = () => {
        const newViewportW = window.innerWidth;
        const newViewportH = window.innerHeight;
        if (newViewportW != this.viewportW || newViewportH != this.viewportH) {
            this.viewportW = window.innerWidth
            this.viewportH = window.innerHeight
            // run changer or return true
            return true
        }
        return false
    }
    getElPosition = (id) => {
      return this.$els[id].position
    }

    addWatchEl = (id, $el) => {
        this.$els[id] = {}
        this.$els[id].el = $el;
        this.checkPosition(id)
    }
    removeWatchEl = (id) => {
        delete this.$els[id]
    }
    checkPosition = (id) => {

        const el = this.$els[id].el;
        const rect = el.getClientRects()[0];
        let viewPortDelta;
        if(rect.top > 0){
          if(this.viewportH > rect.top){
            viewPortDelta = 0
          }else {
            viewPortDelta = rect.top / this.viewportH  - 1;
          }
        }else{
          if(Math.abs(rect.top) < rect.height){
            viewPortDelta = 0
          }else{
            viewPortDelta = (Math.abs(rect.top) - rect.height) / this.viewportH
          }
        }
        viewPortDelta = viewPortDelta.toFixed(2)
        if(this.$els[id].position != viewPortDelta) {
          this.$els[id].position = viewPortDelta
          this.runWatchersById(id);
        }

    }

    checkAllPositions = () => {
        Object.keys(this.$els).forEach((id) => {
            this.checkPosition(id)
        })
    }

    debouncecheckAllPositions = debounce(() => {
        this.getViewportSize();
        this.checkAllPositions();
    }, 30)
}

const viewportPositionStoreObject = new ViewportPositionStore();

export const viewportPositionStore = Vue.observable({

    addWatchEl: viewportPositionStoreObject.addWatchEl,
    removeWatchEl: viewportPositionStoreObject.removeWatchEl,
    getElPosition: viewportPositionStoreObject.getElPosition,
    addWatcher: viewportPositionStoreObject.addWatcher,
    removeWatcher: viewportPositionStoreObject.removeWatcher,

});
