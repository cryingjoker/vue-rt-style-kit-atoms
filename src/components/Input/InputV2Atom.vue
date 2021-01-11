<script type="text/jsx">
import InputV2Icon from "./InputV2Icon.vue";

const components = {}
components[InputV2Icon.name] = InputV2Icon
export default {
  name: "RtInputV2Atom",
  components: components,
  props: {
    bright: {
      type: Boolean,
      default: false
    },
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
    disabled: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: ''
    },
    hasError: {
      type: Boolean,
      default: false
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
  computed: {
    inputClass(){
      const inputClassName =  ["rt-input-v2"]
      if(this.bright){
        inputClassName.push("rt-input-v2--bright")
      }
      if(this.hasError){
        inputClassName.push('rt-input-v2--error')
      }
      return inputClassName.join(' ')
    }
  },

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
    clearInput() {
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
    const icons = () => {
      return this.$slots.icon?.map((icon) => {
        return <template slot="icon">{icon}</template>
      })
    }
    const renderLabel = ()=>{
      if(this.hasError){
        if(this.errorMessage?.length > 0){
          return <span class="rt-input-v2-error sp-t-0-2 rt-font-label">{this.errorMessage}</span>
        }
        return null
      }
      if(this.label?.length > 0){
        return <span class="rt-input-v2-label sp-t-0-2 rt-font-label">{this.label}</span>
      }
      return null
    }
    return <div class={this.inputClass}>
      <label class="rt-input-v2-wrapper">
        <input class="rt-input-v2__input" value={this.localValue} onInput={this.changeValue} type={this.type} ref="input"
               placeholder={this.placeholder}/>
        <span class="rt-input-v2-placeholder">{this.label || this.placeholder}</span>
        <span class="rt-input-v2__line"></span>
        <rt-input-v2-icon onClick={this.clearInput} color={this.isWhite ? 'white' : 'main'}>
          {icons()}
        </rt-input-v2-icon>
      </label>
      {renderLabel()}
    </div>
  }
};
</script>
