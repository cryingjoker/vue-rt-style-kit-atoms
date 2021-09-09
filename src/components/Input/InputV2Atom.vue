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
      type: String | Number,
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
    },
    step: {
      type: Number,
      default: 1
    },
    needVerification: {
      type: Boolean,
      default: false
    },
    verified: {
      type: Boolean,
      default: null
    },
    inputType: {
      type: String,
      default: 'text'
    }
  },
  data() {
    return {
      isNew: false,
      isFocus: false,
      disabledLocal: this.disabled,
      index: null,
      localLabel: this.label,
      localValue: this.value,
      hasInputText: this.value?.length > 0,
      hintPosition: "right",
      showInformer: false,
      localVerified: +this.verified || 2
    };
  },
  watch: {
    value(newValue, oldValue) {
      if (newValue != oldValue && newValue != this.localValue) {
        this.localValue = newValue;
        if(newValue != '') {
          this.$emit('phone', newValue)
        }
      }
    },
    disabled(newVal) {
      this.disabledLocal = newVal;
    },
    verified(newVal) {
      this.localVerified = +newVal;
    }
  },
  computed: {
    inputClass() {
      const inputClassName = ["rt-input-v2"]
      if (this.bright) {
        inputClassName.push("rt-input-v2-bright")
      }
      if (this.hasError) {
        inputClassName.push('rt-input-v2--error')
      }
      if (this.disabledLocal) {
        inputClassName.push('rt-input-v2--disabled')
      }
      return inputClassName.join(' ')
    }
  },
  mounted() {},
  updated() {},
  beforeDestroy() {},
  methods: {
    changeValue(e) {
      const input = this.$refs.input;

      if (this.maxLength && input.value.length > this.maxLength) {
        input.value = input.value.slice(0, this.maxLength)
      }

      if (this.type === 'number') {
        if(!this.isInteger && input.value.search(/[,.]$/) >= 0){
          this.localValue = input.value
        } else {
          // if ('valueAsNumber' in input) {
          //   this.localValue = input.valueAsNumber
          // } else {
          //   this.localValue = input.value - 0
          // }
          this.localValue = input.value;
          if(this.isInteger){
            this.localValue = parseInt(this.localValue);
          }
        }
        if (e && e.inputType?.search(/delete/gi) >= 0 && isNaN(this.localValue) && input.value.length < 2) {
          this.localValue = ''
        }
      } else {
        this.localValue = input.value + '';
      }

      this.$emit('input', this.localValue)
      if (this.type == 'tel') {
        this.$emit('phone', this.localValue)
      }

    },
    clearInput() {
      this.$refs.input.value = ''
      this.changeValue()
      this.$emit('clear')
    },
    onBlur(e) {
      this.$emit('blur', this.localValue, e)
    },
    onPaste(e) {
      this.$emit('paste', e)
    },
    onKeydown(e) {
      this.$emit('keydown', e, this.localValue)
    },
    onKeyup(e) {
      this.$emit('keyup', e, this.localValue)
    },
    onFocus(e) {
      this.$emit('focus', e, this.localValue)
    },
    onInput(e) {
      this.$emit('input', e)
      this.$emit('phone', e)
    },
    onChange(e) {
      this.$emit('change', e, this.localValue)
    },
    toggleInformer($event) {
      $event.preventDefault();
      $event.stopPropagation();
      this.showInformer = !this.showInformer;
    },
    onSelect(e) {
      if(this.$refs.input.selectionStart != this.$refs.input.selectionEnd) this.$emit('select', e)
    }
  },
  render() {
    const icons = () => {
      if(this.$slots.informer){
        return <template slot="icon">
          <rt-popover vertical="top">
            <template slot="content">
              <p class="rt-font-label color-main07">{this.$slots.informer}</p>
            </template>
          </rt-popover>
        </template>
      }
      if(this.needVerification && this.localValue.length == 18) {
        if(this.localVerified === 1) {
          return <template slot="icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"class="rt-input-v2-icon__item--verified">
              <circle opacity="0.8" cx="12" cy="12" r="10" fill="#5BCF6A"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M17.5612 9.1768L11.0613 15.5704C10.7481 15.8784 10.2452 15.8763 9.93457 15.5657L6.93457 12.5657L8.06594 11.4343L10.5049 13.8733L16.4392 8.03613L17.5612 9.1768Z" fill="white"/>
            </svg>
          </template>
        } else if(this.localVerified === 0){
          return <template slot="icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="rt-input-v2-icon__item--not-verified">
              <circle opacity="0.7" cx="12" cy="12" r="10" fill="#EB3728"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M10.939 11.9999L7.46875 15.4701L8.53069 16.5295L11.9997 13.0606L15.4688 16.5297L16.5307 15.4703L13.0604 11.9999L16.5307 8.5296L15.4688 7.47021L11.9997 10.9392L8.53069 7.47023L7.46875 8.5296L10.939 11.9999Z" fill="white"/>
            </svg>
          </template>
        }
        if(this.$parent.filled) {
          return <template slot="icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                 class="rt-sys-icon rt-input-v2-icon__item--verification-in-progress">
              <circle r="10" cx="12" cy="12" fill="none" stroke="#101828"/>
            </svg>
          </template>
        }
        // if(this.localValue && !this.$slots.icon) {
        //   return <template slot="icon">
        //     <rt-system-icons name="close large"/>
        //   </template>
        // }
      }
      return this.$slots.icon?.map((icon) => {
        return <template slot="icon">{icon}</template>
      })
    }
    const renderError = () => {
      if (this.errorMessage?.length > 0) {
        return <span class="rt-input-v2-error rt-font-label">{this.errorMessage}</span>
      }
      return null
    }
    const renderLabel = () => {
      if (this.label?.length > 0) {
        return <span class="rt-input-v2-label rt-font-label">{this.label}</span>
      }
      return null
    }
    const inputComponent = () => {
      if (this.type == 'number') {
        return <input class="rt-input-v2__input"
                      value={this.localValue}
                      onInput={this.changeValue}
                      type={this.type}
                      ref="input"
                      onFocus={this.onFocus}
                      onBlur={this.onBlur}
                      min={this.minNumber}
                      max={this.maxNumber}
                      onPaste={this.onPaste}
                      onKeyup={this.onKeyup}
                      onChange={this.onChange}
                      step={this.step}
                      placeholder={this.placeholder}
                      disabled={this.disabledLocal}/>
      }
      if (this.type == 'tel') {
        return <input class="rt-input-v2__input"
                      value={this.localValue}
                      type={this.type}
                      ref="input"
                      onBlur={this.onBlur}
                      onPaste={this.onPaste}
                      onInput={this.changeValue}
                      onKeydown={this.onKeydown}
                      onKeyup={this.onKeyup}
                      onFocus={this.onFocus}
                      onChange={this.onChange}
                      placeholder={this.placeholder}
                      disabled={this.disabledLocal}
                      onSelect={this.onSelect}/>
      }
      return <input class="rt-input-v2__input"
                    value={this.localValue}
                    onInput={this.changeValue}
                    type={this.type}
                    onFocus={this.onFocus}
                    onBlur={this.onBlur}
                    onPaste={this.onPaste}
                    onKeydown={this.onKeydown}
                    onKeyup={this.onKeyup}
                    onChange={this.onChange}
                    ref="input"
                    placeholder={this.placeholder}
                    disabled={this.disabledLocal}/>
    }
    return <div class={this.inputClass}>
      <label class="rt-input-v2-wrapper">
        {inputComponent()}
        <span class="rt-input-v2-placeholder">{this.placeholder || this.label}</span>
        <span class="rt-input-v2__line"></span>
        <rt-input-v2-icon onClearInput={this.clearInput} color={this.isWhite ? 'white' : 'main'}>
          {icons()}
        </rt-input-v2-icon>
      </label>
      {renderError()}
      {renderLabel()}
    </div>
  }
};
</script>
