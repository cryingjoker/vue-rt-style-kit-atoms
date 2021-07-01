import  "./css/vue-rt-style-atoms.styl";
import Global from "./variables.json";
import Project from "@projectAtoms";
import ofi from './polyfills/ofi.min'
import {
    Button,
    Calendar,
    Image,
    Checkbox,
    CheckboxContainer,
    Input,
    Price,
    RadioButton,
    RadioButtonContainer,
    Ripple,
    RippleWihoutJs,
    Select,
    SelectOption,
    SelectV2,
    SelectV2Option,
    Switch,
    SwitchContainer,
    Textarea,
    TextareaStatic,
    Annotation,
    AnnotationV2,
    ColorLineText,
    Ussd,
    Spinner,
    GridRow,
    GridColumn,
    Hint,
    HintBody,
    VideoPlayer,
    SystemIcons,
    ArrowAnchor,
    Autocomplete
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
            Vue.component(Button.name, Button);
            Vue.component(Calendar.name, Calendar);
            Vue.component(Checkbox.name, Checkbox);
            Vue.component(CheckboxContainer.name, CheckboxContainer);
            Vue.component(Image.name, Image);
            Vue.component(Input.name, Input);
            Vue.component(Price.name, Price);
            Vue.component(RadioButton.name, RadioButton);
            Vue.component(RadioButtonContainer.name, RadioButtonContainer);
            Vue.component(Ripple.name, Ripple);
            Vue.component(RippleWihoutJs.name, RippleWihoutJs);
            Vue.component(Select.name, Select);
            Vue.component(SelectOption.name, SelectOption);
            Vue.component(SelectV2.name, SelectV2);
            Vue.component(SelectV2Option.name, SelectV2Option);
            Vue.component(Switch.name, Switch);
            Vue.component(SwitchContainer.name, SwitchContainer);
            Vue.component(Spinner.name, Spinner);
            Vue.component(Textarea.name, Textarea);
            Vue.component(TextareaStatic.name, TextareaStatic);
            Vue.component(Annotation.name, Annotation);
            Vue.component(AnnotationV2.name, AnnotationV2);
            Vue.component(ColorLineText.name, ColorLineText);
            Vue.component(Ussd.name, Ussd);
            Vue.component(GridRow.name, GridRow);
            Vue.component(GridColumn.name, GridColumn);
            Vue.component(Hint.name, Hint);
            Vue.component(Autocomplete.name, Autocomplete);
            Vue.component(HintBody.name, HintBody);
            Vue.component(SystemIcons.name, SystemIcons);
            Vue.component(VideoPlayer.name, VideoPlayer);
            Vue.component(ArrowAnchor.name, ArrowAnchor);

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

const version = Project.version;
if (typeof window !== 'undefined') {
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
    Button,
    Calendar,
    Checkbox,
    CheckboxContainer,
    Input,
    Price,
    RadioButton,
    RadioButtonContainer,
    Ripple,
    RippleWihoutJs,
    Select,
    SelectOption,
    SelectV2,
    SelectV2Option,
    Switch,
    SwitchContainer,
    Textarea,
    TextareaStatic,
    Annotation,
    AnnotationV2,
    ColorLineText,
    Ussd,
    Spinner,
    GridRow,
    GridColumn,
    Hint,
    HintBody,
    VideoPlayer,
    ArrowAnchor,
    Image,
    Autocomplete,
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
    getVariable,
}



