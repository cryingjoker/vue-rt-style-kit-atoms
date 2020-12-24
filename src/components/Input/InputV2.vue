<script type="text/jsx">
import variables from "../../variables.json";
import VeeValidate from "vee-validate";
import InputV2Icon from "./InputV2Icon.vue";
const components = {}
components[InputV2Icon.name] = InputV2Icon
export default {
  name: "RtInputV2",
  components:components,
  props: {
    maxLength: {
      type: Number,
      default: null
    },
    minNumber: {
      type: Number,
      default: null
    },
    newVersion: {
      type: Number,
      default: 1
    },
    maxNumber: {
      type: Number,
      default: null
    },

    insertLang: {
      type: String,// [ru, en]
      default: ''
    },
    insertType: {
      type: String, //[number, string, password, tel]
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    autocomplete: {
      type: String,
      default: 'disable,false,off,none'
    },
    placeholder: {
      type: String,
      default: ''
    },
    hasError: {
      type: Boolean,
      default: false
    },
    errorMessageFunc: {
      type: Function,
      default: null
    },
    errorMessage: {
      type: String,
      default: ''
    },
    value: {
      type: String,
      default: ""
    },
    isWhite: {
      type: Boolean,
      default: false
    },
    name: {
      type: String,
      default: ''
    },
    showNumbersButtons: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    },
    isB2bInput: {
      type: Boolean,
      default: false
    },
    outlined: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: "purple"
    },
    isHidden: {
      type: Boolean,
      default: false
    },
    approved: {
      type: Boolean,
      default: false
    },
    hasTimer: {
      type: Boolean,
      default: false
    },
    timerDuration: {
      type: String,
      default: ''
    },
    inputButton: {
      type: Boolean,
      default: false
    },
    inputButtonText: {
      type: String,
      default: ''
    },
    scope: {
      type: String,
      default: ''
    },
    isInteger: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isNew: false,
      isFocus: false,
      disabledLocal: null,
      index: null,
      localLabel: this.label,
      localValue: this.value,
      hasInputText: this.value?.length > 0,
      hintPosition: "right",
      passwordVisibilityLocal: false
    };
  },

  computed: {},


  mounted() {
  },
  updated() {

  },
  beforeDestroy() {
  },
  methods: {
    changeValue() {
      this.localValue = this.$refs.input.value;
      this.$emit('input', this.localValue)
    },
    clearInput(){
      this.$refs.input.value = ''
      this.changeValue()
    }

  },
  watch: {
    value(newValue, oldValue) {
      if (newValue != oldValue && newValue != this.localValue) {
        this.localValue = newValue;
      }
    },
    localValue(val) {
      this.$emit("change", val);
    }

  },
  render() {

    const renderIcon = ()=>{
      if(this.$slots.icon?.length > 0){
        return <span class="rt-input-v2-icon">
          {this.$slots.icon}
        </span>
      }
      return <span class="rt-input-v2-icon">
          <span class="rt-input-v2-clear" onClick={this.clearInput}><rt-system-icons
              name="close large"></rt-system-icons></span>
        </span>
    }
    return <div class="rt-input-v2">
      <label class="rt-input-v2-label">
        <input class="rt-input-v2__input" value={this.localValue} onInput={this.changeValue} type="text" ref="input"
               placeholder={this.label || this.placeholder}/>
        <span class="rt-input-v2-placeholder">{this.label || this.placeholder}</span>
        <span class="rt-input-v2__line"></span>
        <rt-input-v2-icon onClick={this.clearInput}>
          {this.$slots.icon ? <template slot="icon">{this.$slots.icon[0]}</template> : null}
        </rt-input-v2-icon>
      </label>
      <span class="rt-input-v2-error sp-t-0-2 rt-font-label">Текст ошибки</span>
      {this.localValue}
    </div>
  }
};
</script>
