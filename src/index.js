import  "./css/vue-rt-style-atoms.styl";
import Global from "./variables.json";
// import Project from "@projectAtoms";
import ofi from './polyfills/ofi.min'
// import 'element-closest-polyfill';
// import 'nodelist-foreach-polyfill';
// import 'element-remove';

import {
    fontColorPropsNames,
    fontColorProps,
    getColorsCustomProps,
    getColorClassByProps,
    getColorClass
} from "./mixins/colorTextClassMixin.js";
import {fillPropsNames, fillColorProps, getFillClassByProps, getFillClass} from "./mixins/fillTextClassMixin.js";
import {spacesParamsNames, spacesParamsProps, getSpacesClass} from "./mixins/spaceClassMixin.js";
import {displayParamsNames, displayParamsProps, getDisplayClass} from "./mixins/displayClassMixin.js";
import {
    strokePropsNames,
    strokeColorProps,
    getStrokeClassByProps,
    getStrokeClass
} from "./mixins/strokeTextClassMixin.js";

import {deviceTypeStore} from "./stores/deviceTypeStoreMixin.js";
import {viewportPositionStore} from "./stores/viewportPositionStoreMixin";
import {StorePrototype} from './stores/storePrototype.class'
import {
    backgroundColorPropsNames,
    backgroundColorProps,
    getBackgroundClassByProps,
    getBackgroundClass
} from "./mixins/backgroundColorTextClassMixin.js";
import getVariable from "./mixins/variablesMixin.js";
import {LazySrcDirective} from "./directives/lazySrc/LazySrc";


let VueRtStyle = {
    install(Vue, config) {
        if (!Vue.RtStyleAtoms) {
            Vue.directive(LazySrcDirective.name, LazySrcDirective);
            Vue.RtStyleAtoms = true;
        }
    }
};
VueRtStyle = {
    ...VueRtStyle
};


/**
 * Глобальные настройки библиотеки
 * -Для добавления своих настроек, создайте объект
 * с названием из Global.globalSettingsKey и положите перед подключением либы
 */
const settingsKey = Global.globalSettingsKey;

const version = "2021-09-27 14:42";
if (window && window.addEventListener) {
    if (settingsKey) {
        if (!window[settingsKey]) window[settingsKey] = {}
        if (!window[settingsKey].segment) window[settingsKey].segment = Global.defaultSegment
        window[settingsKey].version = version;
    }

// @Deprecated
    window.RTK_STYLE_VER = version;

    window.addEventListener('getVueRtStyleVersion', function () {
        window.postMessage({from: "vue-rt-style-kit", type: "setVersion", label: "atoms", version: version}, "*");
    })
}
VueRtStyle.version = version;

export default VueRtStyle;

export {
    // mixins
    fontColorPropsNames,
    fontColorProps,
    getColorsCustomProps,
    getColorClassByProps,
    getColorClass,

    fillPropsNames,
    fillColorProps,
    getFillClassByProps,
    getFillClass,

    spacesParamsNames,
    spacesParamsProps,
    getSpacesClass,

    displayParamsNames,
    displayParamsProps,
    getDisplayClass,

    strokePropsNames,
    strokeColorProps,
    getStrokeClassByProps,
    getStrokeClass,

    backgroundColorPropsNames,
    backgroundColorProps,
    getBackgroundClassByProps,
    getBackgroundClass,
    StorePrototype,
    viewportPositionStore,
    deviceTypeStore,
    getVariable
}



