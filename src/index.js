import  "./css/vue-rt-style-atoms.styl";
import Global from "./variables.json";
import Project from "@projectAtoms";

import {
    Button,
    Checkbox,
    CheckboxContainer,
    Input,
    InputWithoutJs,
    Price,
    RadioButton,
    RadioButtonContainer,
    Ripple,
    RippleWihoutJs,
    Select,
    SelectOption,
    Switch,
    SwitchContainer,
    Textarea,
    TextareaStatic,
    Annotation,
    ColorLineText,
    Ussd,
    Spinner,
    GridRow,
    GridColumn
} from "./components";

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

import {
    deviceTypeStore
} from "./stores/deviceTypeStoreMixin.js";

import {
    backgroundColorPropsNames,
    backgroundColorProps,
    getBackgroundClassByProps,
    getBackgroundClass
} from "./mixins/backgroundColorTextClassMixin.js";

let VueRtStyle = {
    install(Vue, config) {
        if (!Vue.RtStyleAtoms) {
            Vue.component(Button.name, Button);
            Vue.component(Checkbox.name, Checkbox);
            Vue.component(CheckboxContainer.name, CheckboxContainer);
            Vue.component(Input.name, Input);
            Vue.component(InputWithoutJs.name, InputWithoutJs);
            Vue.component(Price.name, Price);
            Vue.component(RadioButton.name, RadioButton);
            Vue.component(RadioButtonContainer.name, RadioButtonContainer);
            Vue.component(Ripple.name, Ripple);
            Vue.component(RippleWihoutJs.name, RippleWihoutJs);
            Vue.component(Select.name, Select);
            Vue.component(SelectOption.name, SelectOption);
            Vue.component(Switch.name, Switch);
            Vue.component(SwitchContainer.name, SwitchContainer);
            Vue.component(Spinner.name, Spinner);
            Vue.component(Textarea.name, Textarea);
            Vue.component(TextareaStatic.name, TextareaStatic);
            Vue.component(Annotation.name, Annotation);
            Vue.component(ColorLineText.name, ColorLineText);
            Vue.component(Ussd.name, Ussd);
            Vue.component(GridRow.name, GridRow);
            Vue.component(GridColumn.name, GridColumn);
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

const version = Project.version;
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
VueRtStyle.version = version;

export default VueRtStyle;

export {
    Button,
    Checkbox,
    CheckboxContainer,
    Input,
    InputWithoutJs,
    Price,
    RadioButton,
    RadioButtonContainer,
    Ripple,
    RippleWihoutJs,
    Select,
    SelectOption,
    Switch,
    SwitchContainer,
    Textarea,
    TextareaStatic,
    Annotation,
    ColorLineText,
    Ussd,
    Spinner,
    GridRow,
    GridColumn,

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

    deviceTypeStore
}


