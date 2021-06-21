<script type="text/jsx">
import variables from "../../variables.json";
import InputV2 from "./InputV2.vue";

const components = {}
components[InputV2.name] = InputV2
export default {
  name: "RtInput",
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
    version: {
      type: Number,
      default: 1
    },
    step: {
      type: Number,
      default: 1
    },
    minNumber: {
      type: Number,
      default: null
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
    inputType: {
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
    isInteger: {
      type: Boolean,
      default: false
    },
    needVerification: {
      type: Boolean,
      default: false
    },
    verified: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isFocus: false,
      disabledLocal: null,
      index: null,
      localLabel: this.label,
      localValue: this.value?.length > 0 ? this.value : "",
      hasInputText: this.value?.length > 0,
      hintPosition: "right",
      passwordVisibilityLocal: false
    };
  },
  computed: {
    fieldName() {
      return this.name || "input-field__" + this._uid;
    },
    isInvalid() {
      if (this.hasError) {

        return this.hasError || this.errors && this.errors.has(this.fieldName);
      }
    },
    inputClass() {
      let className = ["input-wrapper"];

      if (this.disabledLocal) {
        className.push("input-disabled")
      }
      if (this.outlined) {
        className.push("input-wrapper--outlined");
      }
      if (this.isB2bInput) {
        className.push("rtb-input color-block--white");
      }
      if (this.isHidden) {
        className.push("rtb-input--hidden");
      }
      if (this.approved) {
        className.push("rtb-input--approved");
      }
      return className;
    },
    inputContainerClass() {
      let inputClass = ["input", "text-field"];
      if (this.isFocus) {
        inputClass.push("input--focus")
      }
      if (this.isInvalid) {
        inputClass.push("text-field--error");
      }
      if (this.showNumbersButtons && this.insertType && this.insertType === "number") {
        inputClass.push("input--with-button");
      }
      if (this.isWhite) {
        inputClass.push("rt-input--white");
      }
      if (this.type && this.type === "password") {
        inputClass.push("rt-input--password");
      }
      if (this.color === "orange") {
        inputClass.push("text-field--orange");
      } else {
        inputClass.push("text-field--purple");
      }
      return inputClass.join(' ')
    },
    inputElementClass() {
      const classList = ['input-element']
      if (this.hasInputText) {
        classList.push('input-element--n-emp')
      }
      return classList.join(' ')
    }
  },
  watch: {
    value(val) {
      this.localValue = this.value;
      this.setValue();
    },
    localValue(val) {
      this.$emit("input", val);
    },
    label() {
      this.localLabel = this.label;
    },
    disabled() {
      this.disabledLocal = this.disabled
      this.setDisabled()
    }
  },
  mounted() {
    this.setNewRender();
    this.disabledLocal = this.disabled;
    this.setValue();
    this.setDisabled();
    this.bindEvents();
    if (this.$el && this.$el.getBoundingClientRect) {
      if (this.$el.getBoundingClientRect().left > window.innerWidth / 2) {
        this.hintPosition = "left";
      } else {
        this.hintPosition = "right";
      }
    }
  },
  updated() {
    this.unbindEvents();
    this.bindEvents();
  },
  beforeDestroy() {
    this.unbindEvents();
  },
  methods: {
    setNewRender() {
      // if(this.newRender){
      //   this.isNew = true
      // }
      // else {
      //   if (document.cookie) {
      //     if (document.cookie.split('; ').find(i => i.split('=')[0] == 'new_design')) {
      //       this.isNew = true;
      //     }
      //   }
      // }
    },
    focus() {
      this.isFocus = true
    },
    blur() {
      this.isFocus = false
    },
    bindEvents() {
      if (this["_events"]) {
        Object.keys(this["_events"]).map(eventName => {

          this["_events"][eventName].forEach((fn) => {

            if (this.$refs.component) {

              Object.keys(this.$slots).forEach((slotKey) => {
                this.$refs.component.$slots = this.$slots[slotKey]
              })
              if (!this.$refs.component['_events'][eventName]) {
                this.$refs.component['_events'][eventName] = []
              }
              if (this.$refs.component['_events'][eventName].indexOf(fn) < 0) {
                this.$refs.component['_events'][eventName].push(fn)
              }
            } else {
              if (this.$refs.input) {
                if (eventName != 'input' && window[variables.globalSettingsKey].segment != 'b2c') { // for work with v-model
                  this.$refs.input.addEventListener(eventName, fn)
                } else if (eventName != 'input') {
                  this.$refs.input.addEventListener(
                      eventName,
                      () => {
                        if (this["_events"] && this["_events"][eventName] && this["_events"][eventName][0] && typeof this["_events"][eventName][0] === 'function') {
                          this["_events"][eventName][0](arguments[0]);
                        }
                      }
                  );
                }
              }
            }
          });
        });
      }
    },
    unbindEvents() {
      if (this["_events"]) {
        Object.keys(this["_events"]).map(eventName => {
          if (this.$refs.component) {
            this["_events"][eventName].forEach((fn) => {
              const index = this.$refs.component['_events'][eventName].indexOf(fn);
              if (index >= 0) {
                this.$refs.component['_events'][eventName].splice(index, 1)
              }
            })
          } else {
            // console.info(this['_events'])
            // if(this.$refs.input) {
            //   this.$refs.input.removeEventListener(
            //       eventName,
            //       this["_events"][eventName]
            //   );
            // }
          }
        });
      }
    },
    addNumber() {
      this.localValue = typeof parseInt(this.localValue) === "number" ? this.localValue - 0 + 1 : 1;
      if (this.maxNumber !== null && this.localValue > this.maxNumber) {
        this.localValue = this.maxNumber;
        event.target.value = this.maxNumber;
      }
      this.updateInputValue();
      this.setValueLength();
      this.$refs.input.focus();
    },
    subtractNumber() {
      this.localValue = typeof parseInt(this.localValue) === "number" ? this.localValue - 1 : 0;
      if (this.minNumber !== null && this.localValue < this.minNumber) {
        this.localValue = this.minNumber;
        // event.target.value = this.minNumber;
      }
      this.updateInputValue();
      this.setValueLength();
      this.$refs.input.focus();
    },
    updateInputValue() {
      if (this.$refs.input) {
        this.$refs.input.value = this.localValue;
      }
    },
    setValue() {
      if (this.$refs.input) {
        this.$refs.input.value = this.localValue;
      }
      this.setValueLength();
    },
    setDisabled() {
      if (this.$refs.input) {
        this.$refs.input.disabled = Boolean(this.disabledLocal);
      }
    },
    setValueLength() {
      this.hasInputText = this.localValue?.toString()?.length > 0;
    },
    inputHandler($event) {
      let temporaryValue = this.$refs.input.value;
      if (this.insertType === 'number' && this.isInteger) {
        if (!isNaN(parseInt(temporaryValue)) && !this.isSpecialCharacters($event.data)) {
          this.localValue = temporaryValue;
        } else {
          this.$refs.input.value = temporaryValue;
          setTimeout(() => {
            this.$refs.input.blur();
            this.$refs.input.focus();
            this.$refs.input.selectionStart = this.$refs.input.value.length;
          }, 1)
        }
      } else {
        this.localValue = temporaryValue;
      }
      this.setValueLength();
    },
    clearInput() {
      this.localValue = "";
      this.setValue();
      this.$emit('clearField');
    },
    getChar(event) {
      if (event.which == null) {
        if (event.keyCode < 32) return null;
        return String.fromCharCode(event.keyCode);
      }
      if (event.which < 32) return null;
      return String.fromCharCode(event.which);
    },
    isSpecialCharacters(chr) {
      return chr.match(/[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/) !== null;
    },
    keyPress(event) {

      let chr = this.getChar(event);
      if (this.maxLength && this.maxLength <= event.target.value.length) {
        event.preventDefault();
        event.stopPropagation();
        return null;
      }
      if (this.insertType) {
        switch (this.insertType) {
          case "number":
            if (!chr.match(/[0-9]/)) {
              event.preventDefault();
              event.stopPropagation();
              return null;
            }
            break;
          case "string":
            if (chr.match(/[0-9]/)) {
              event.preventDefault();
              event.stopPropagation();
              return null;
            }
            break;
          case "tel":
            this.enablePhoneMask();
            break;
        }
      }
      if (this.insertLang) {

        if (isNaN(parseInt(chr)) && !this.isSpecialCharacters(chr)) {
          switch (this.insertLang) {
            case "en":
              if (!chr.match(/[a-z]/i)) {
                event.preventDefault();
                event.stopPropagation();
                return null;
              }
              break;
            case "ru":
              if (!chr.match(/[а-я]/i)) {
                event.preventDefault();
                event.stopPropagation();
                return null;
              }
              break;
          }
        }
      }
    },
    keyUp(event) {
      if (this.insertType) {
        switch (this.insertType) {
          case "number":
            let value = event.target.value - 0;
            if (this.maxNumber !== null && value > this.maxNumber) {
              this.localValue = this.maxNumber + "";
              event.target.value = this.maxNumber + "";
            }
            if (this.minNumber !== null && value < this.minNumber) {
              this.localValue = this.minNumber + "";
              event.target.value = this.minNumber + "";
            }
            break;
        }
      }
    },
    changeFromParent(props) {
      if (props && this.name in props) {
        const propsForItem = props[this.name];
        if ("0" in propsForItem) {
          this.$refs.input.value = propsForItem[0];
          this.inputHandler();
        }
      } else {
        if (this.insertType === "number") {
          if (this.minNumber) {
            this.$refs.input.value = this.minNumber;
          } else {
            this.$refs.input.value = 0;
          }
        }
      }
    },
    togglePasswordVisibility() {
      let inputElement = this.$el.getElementsByTagName("input")[0];
      if (inputElement.getAttribute("type") === "password") {
        inputElement.setAttribute("type", "text");
      } else if (inputElement.getAttribute("type") === "text") {
        inputElement.setAttribute("type", "password");
      }
      this.passwordVisibilityLocal = !this.passwordVisibilityLocal;
    },
    mask(e) {
      if (e.type === "focus") {
        setTimeout(() => {
          let matrix = "+7 (___) ___ ____",
              i = 0,
              def = matrix.replace(/\D/g, ""),
              val = this.$refs.input.value.replace(/\D/g, "");
          if (def.length >= val.length) val = def;
          this.$refs.input.value = matrix.replace(/./g, function (a) {
            return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? "" : a;
          });
        }, 500)
      } else {
        let matrix = "+7 (___) ___ ____",
            i = 0,
            def = matrix.replace(/\D/g, ""),
            val = this.$refs.input.value.replace(/\D/g, "");
        if (def.length >= val.length) val = def;
        this.$refs.input.value = matrix.replace(/./g, function (a) {
          return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? "" : a;
        });
      }
      if (e.type === "blur") {
        if (this.$refs.input.value.length == 2) {
          this.$refs.input.value = "";
        }
      } else {
        this.setCursorPosition(this.$refs.input.value.length, this.$refs.input);
      }
      this.localValue = this.$refs.input.value;
      this.setValueLength();
    },
    setCursorPosition(pos, elem) {
      elem.focus();
      if (elem.setSelectionRange)
        elem.setSelectionRange(pos, pos);
      else if (elem.createTextRange) {
        let range = elem.createTextRange();
        range.collapse(true);
        range.moveEnd("character", pos);
        range.moveStart("character", pos);
        range.select();
      }
    },
    enablePhoneMask() {
      this.$refs.input.addEventListener("input", this.mask, false);
      this.$refs.input.addEventListener("blur", this.mask, false);
    },
    getCode() {
      this.$root.$emit('getCode', this.localValue);
    },
    focusInput() {
      this.$refs.input.focus()
    },
  },
  render() {
    if (this.version == 2) {
      const renderSlots = Object.keys(this.$slots).map((key) => {
        return this.$slots[key].map((slot) => {
          return <template slot={key}>{slot}</template>
        })
      })
      return <rt-input-v2
          ref="component"
          bright={this.bright}
          inputType={this.inputType}
          maxLength={this.maxLength}
          minNumber={this.minNumber}
          maxNumber={this.maxNumber}
          insertLang={this.insertLang}
          insertType={this.insertType}
          disabled={this.disabled}
          autocomplete={this.autocomplete}
          placeholder={this.placeholder}
          hasError={this.hasError}
          errorMessageFunc={this.errorMessageFunc}
          errorMessage={this.errorMessage}
          value={this.value}
          isWhite={this.isWhite}
          name={this.name}
          showNumbersButtons={this.showNumbersButtons}
          label={this.label}
          type={this.type}
          step={this.step}
          isB2bInput={this.isB2bInput}
          outlined={this.outlined}
          color={this.color}
          isHidden={this.isHidden}
          approved={this.approved}
          hasTimer={this.hasTimer}
          timerDuration={this.timerDuration}
          inputButton={this.inputButton}
          inputButtonText={this.inputButtonText}
          scope={this.scope}
          isInteger={this.isInteger}
          needVerification={this.needVerification}
          verified={this.verified}
      >{renderSlots}</rt-input-v2>
    }

    const placeholder = (() => {
      if (this.placeholder) {
        let placeholderClassNames = "floating-placeholder";
        if (this.hasInputText) {
          placeholderClassNames += " floating-placeholder--go-top";
        }
        return <div class={placeholderClassNames}>
          {this.placeholder}
        </div>;
      }
      return null;
    })();

    const clearButton = (() => {
      const buttonClass = (() => {
        let clearButtonClassNames = "input-clear";
        if (this.isB2bInput) {
          clearButtonClassNames += " rtb-input-clear";
        }
        return clearButtonClassNames;
      })();
      if (!this.showNumbersButtons && !this.disabledLocal && this.hasInputText && this.type != "password") {
        return <div class={buttonClass} onClick={this.clearInput}>
          <svg class="input-clear__icon" viewBox="0 0 14 14" width="12" height="12"
               xmlns="http://www.w3.org/2000/svg">
            <path d="M14 1.4L12.6 0 7 5.6 1.4 0 0 1.4 5.6 7 0 12.6 1.4 14 7 8.4l5.6 5.6 1.4-1.4L8.4 7z"
                  fill-rule="evenodd"/>
          </svg>
        </div>;
      }
      return null;
    })();

    const passwordIcon = (() => {
      if (this.type === "password") {
        if (!this.passwordVisibilityLocal) {
          return <div class="password-icon password-hidden" onClick={this.togglePasswordVisibility}>
            <svg width="20" height="10" xmlns="http://www.w3.org/2000/svg" class="password-icon__icon">
              <g stroke="#575D68" stroke-width="2" fill="none" fill-rule="evenodd"
                 stroke-linecap="round">
                <path d="M3.333 1C4.838 3.687 7.06 5.031 10 5.031S15.162 3.687 16.667 1M10 7.667v1.25M14.396 6.833l.572
                1.031M5.801 6.833L5.23 7.864M17.5 4.333l.833.834M2.5 4.333l-.833.834"/>
              </g>
            </svg>
          </div>;
        } else {
          return <div class="password-icon" onClick={this.togglePasswordVisibility}>
            <svg width="18" height="12" xmlns="http://www.w3.org/2000/svg"
                 class="password-icon__icon password-icon__icon-show">
              <g transform="translate(1 1)" stroke="#101828" stroke-width="2" fill="none"
                 fill-rule="evenodd">
                <path d="M0 5c1.805 3.225 4.472 4.837 8 4.837 3.528 0 6.195-1.612 8-4.837M0 4.837C1.805 1.612 4.472 0
                8 0c3.528 0 6.195 1.612 8 4.837" stroke-linecap="round"/>
                <circle cx="8" cy="5" r="2"/>
              </g>
            </svg>
          </div>;
        }
      }
      return null;
    })();

    const searchIcon = (() => {
      if (this.type === "search" && !this.hasInputText) {
        return <div class="password-icon" onClick={this.focusInput}>
          <svg viewBox="0 0 20 30" xmlns="http://www.w3.org/2000/svg" style="height: 20px;"
               class="password-icon__icon">
            <g stroke="#575D68" stroke-width="1.4" fill="none" fill-rule="evenodd"
               stroke-linecap="round">
              <path d="M19.129,18.164l-4.518-4.52c1.152-1.373,1.852-3.143,1.852-5.077c0-4.361-3.535-7.896-7.896-7.896
                                    c-4.361,0-7.896,3.535-7.896,7.896s3.535,7.896,7.896,7.896c1.934,0,3.705-0.698,5.078-1.853l4.52,4.519
                                    c0.266,0.268,0.699,0.268,0.965,0C19.396,18.863,19.396,18.431,19.129,18.164z M8.567,15.028c-3.568,0-6.461-2.893-6.461-6.461
                                    s2.893-6.461,6.461-6.461c3.568,0,6.46,2.893,6.46,6.461S12.135,15.028,8.567,15.028z"/>
            </g>
          </svg>
        </div>;
      }
      return null;
    })();

    const errorMessage = (() => {
      if (this.isInvalid) {
        let errorMessageClass = "text-field__error-message";
        if (this.label) {
          errorMessageClass += " text-field__error-message--has-label";
        }
        if (this.isB2bInput) {
          errorMessageClass += " rtb-text-field__error-message rt-col-rt-col-3";
        }
        if (this.hintPosition === "right") {
          errorMessageClass += " rtb-text-field__error-message--on-the-right";
        } else if (this.hintPosition === "left") {
          errorMessageClass += " rtb-text-field__error-message--on-the-left";
        }

        if (Object.prototype.toString.call(this.errorMessageFunc) === "[object Function]") {
          return <div class={errorMessageClass}>
            <span class="error-message-text-content rt-font-label">{this.errorMessageFunc(this.localValue)}</span>
          </div>;
        }

        return <div class={errorMessageClass}>
          <span class="error-message-text-content rt-font-label">{this.errorMessage}</span>
        </div>;
      }
    })();
    const arithmeticButtons = (() => {
      if (this.showNumbersButtons && this.insertType && this.insertType === "number") {
        return <div class="input-arithmetic">
          <div class="d-flex">
            <button class="input-arithmetic__button input-arithmetic__minus" onClick={this.subtractNumber}>
              <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg">
                <g fill="none" fill-rule="evenodd">
                  <path d="M0 10c0 5.5 4.5 10 10 10s10-4.5 10-10S15.5 0 10 0 0 4.5 0 10z"
                        fill="#E3E8EC"/>
                  <path d="M15 10H5" stroke="#101828" stroke-width="2"/>
                </g>
              </svg>
            </button>
            <button class="input-arithmetic__button input-arithmetic__plus" onClick={this.addNumber}>
              <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg">
                <g fill="none" fill-rule="evenodd">
                  <path d="M0 10c0 5.5 4.5 10 10 10s10-4.5 10-10S15.5 0 10 0 0 4.5 0 10z"
                        fill="#E3E8EC"/>
                  <path d="M10 10V5v5h5-5zm0 0v5-5H5h5z" stroke="#101828" stroke-width="2"/>
                </g>
              </svg>
            </button>
          </div>
        </div>;
      }
    })();

    const inputLabel = (() => {
      if (this.localLabel)
        return <div class="input-label">{this.localLabel}</div>;
    })();

    const inputElementByType = (() => {
      if (this.insertType !== 'tel') {
        return <input
            onKeypress={this.keyPress}
            onKeyup={this.keyUp}
            onFocus={this.focus}
            onBlur={this.blur}
            ref="input"
            autocomplete={this.autocomplete}
            autocapitalize="off"
            type={this.type === 'search' ? 'text' : this.type}
            class={this.inputElementClass}
            name={this.fieldName}
            onInput={this.inputHandler}
        />;
      } else {
        return <input
            onKeypress={this.keyPress}
            onKeyup={this.keyUp}
            ref="input"
            autocomplete={this.autocomplete}
            autocapitalize="off"
            type={this.type}
            class={this.inputElementClass}
            name={this.fieldName}
            onInput={this.inputHandler}
            onFocus={this.mask}
            onBlur={this.mask}
        />;
      }
    })();
    const inputLine = () => {

      if (this.outlined) {
        return <div class="text-field__border"/>
      } else {
        return <div class="text-field__line"/>
      }
    }
    const renderButton = () => {
      if (this.inputButton) {


        return <rt-button class="rt-button-transparent-purple rt-button-small"
                          onClick={this.getCode}>{this.inputButtonText}</rt-button>
      }
      return null

    }
    const renderTimer = () => {
      if (this.hasTimer) {

        return <rt-countdown-timer duration={this.timerDuration}/>
      }
      return null

    }
    return <div class={this.inputClass}>
      <div class={this.inputContainerClass}>
        {inputElementByType}
        {inputLine()}
        {placeholder}
        {this.inputButton ? null : clearButton}
        {passwordIcon}
        {searchIcon}
        {errorMessage}
        {arithmeticButtons}
        {this.$slots.default}
        {renderTimer()}
      </div>
      {inputLabel}

      {renderButton()}
    </div>;
  }
};
</script>
