import  "./css/vue-rt-style-kit-atoms.styl";
// import { version } from '../package.json'
let version = ''
import Global from "./variables.json";
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
    Select,
    SelectOption,
    SelectV2,
    SelectV2Option,
    Switch,
    SwitchContainer,
    SwitchV2,
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
    CircleNumber,
    Line,
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
import {default as LazySrcDirective} from "./directives/lazySrc/LazySrc";


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
            Vue.component(Select.name, Select);
            Vue.component(SelectOption.name, SelectOption);
            Vue.component(SelectV2.name, SelectV2);
            Vue.component(SelectV2Option.name, SelectV2Option);
            Vue.component(Switch.name, Switch);
            Vue.component(SwitchContainer.name, SwitchContainer);
            Vue.component(SwitchV2.name, SwitchV2);
            Vue.component(Spinner.name, Spinner);
            Vue.component(Textarea.name, Textarea);
            Vue.component(TextareaStatic.name, TextareaStatic);
            Vue.component(Annotation.name, Annotation);
            Vue.component(AnnotationV2.name, AnnotationV2);
            Vue.component(ColorLineText.name, ColorLineText);
            Vue.component(Line.name, Line);
            Vue.component(Ussd.name, Ussd);
            Vue.component(GridRow.name, GridRow);
            Vue.component(GridColumn.name, GridColumn);
            Vue.component(Hint.name, Hint);
            Vue.component(HintBody.name, HintBody);
            Vue.component(SystemIcons.name, SystemIcons);
            Vue.component(VideoPlayer.name, VideoPlayer);
            Vue.component(ArrowAnchor.name, ArrowAnchor);
            Vue.component(CircleNumber.name, CircleNumber);
            Vue.component(Autocomplete.name, Autocomplete);

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

if (window && window.addEventListener) {
    if (settingsKey) {
        if (!window[settingsKey]) window[settingsKey] = {}
        if (!window[settingsKey].segment) window[settingsKey].segment = Global.defaultSegment
        window[settingsKey].atoms_version = version
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
    Select,
    SelectOption,
    SelectV2,
    SelectV2Option,
    Switch,
    SwitchContainer,
    SwitchV2,
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
    CircleNumber,
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
    SystemIcons,
    Line,
    StorePrototype,
    viewportPositionStore,
    deviceTypeStore,
    getVariable
}
