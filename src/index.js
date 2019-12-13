import styles from "./css/vue-rt-style-atoms.styl";
import Global from "./variables.json";
import Project from "../package.json";

import {} from "./components";

// console.info('OptionsList',OptionsList)
import 'element-closest-polyfill';
import 'nodelist-foreach-polyfill';
import 'element-remove';

const VueRtStyle = {
    install(Vue, config) {
        if (!Vue.RtStyleAtoms) {
            Vue.component(Button.name, Button);
            Vue.component(ButtonRippleWithoutJs.name, ButtonRippleWithoutJs);
            Vue.component(ButtonWithoutRipple.name, ButtonWithoutRipple);
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
            Vue.component(SelectWithoutJs.name, SelectWithoutJs);
            Vue.component(Switch.name, Switch);
            Vue.component(SwitchContainer.name, SwitchContainer);
            Vue.component(Textarea.name, Textarea);
            Vue.component(TextareaStatic.name, TextareaStatic);
            Vue.component(CheckboxTabs.name, CheckboxTabs);
            Vue.component(Annotation.name, Annotation);
            Vue.component(ColorLineText.name, ColorLineText);
            Vue.component(Ussd.name, Ussd);
            Vue.RtStyleAtoms = true;
        }
    }
};
// VueRtStyle.directives = { SwipeLeft, SwipeRight, OutsideClickDirective, FilterCallerDirective};
VueRtStyle.directives = {SwipeLeft, SwipeRight, OutsideClickDirective};

// if(localStorage && localStorage.getItem('dev_mode')){
//   localStorage.setItem('dev_mode__version',version);
// }

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
VueRtStyle.version = version;

export default VueRtStyle;
