<script type="text/jsx">
import InputV2Atom from "./InputV2Atom.vue";
import InputV2Password from "./InputV2Password.vue";
import InputV2Number from "./InputV2Number.vue";
import InputV2PhoneNumber from "./InputV2PhoneNumber.vue";

const components = {}
components[InputV2Atom.name] = InputV2Atom
export default {
  name: "RtInputV2",
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
      type: String|Number,
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
    step:{
      type: Number,
      default: 1
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

  methods: {
    onInput(e) {
      this.$emit('input', e)
    },
    onClear() {
      this.$emit('clear')
    },
    onKeydown(e) {
      this.$emit('keydown', e)
    },
    onKeyup(e) {
      this.$emit('keyup', e.key)
    },
    onFocus() {
      this.$emit('focus')
    },
    onBlur() {
      this.$emit('blur')
    },
    onFilled(e) {
      this.$emit('filled', e)
    },
    onChange(e) {
      this.$emit('change', e)
    },
    renderIcons(createElement) {
      if (this.$slots.icon) {
        return createElement(
            'template',
            {slot: 'icon'},
            [this.$slots.icon],
        );
      }
      return null
    },
    renderInformer(createElement) {
      if (this.$slots.informer) {
        return createElement(
            'template',
            {slot: 'informer'},
            [this.$slots.informer],
        );
      }
      return null
    },
    bindEvents() {
      if (this["_events"]) {
        Object.keys(this["_events"]).map(eventName => {
          this["_events"][eventName].forEach((fn) => {
            this.$refs.input.addEventListener(
                eventName,
                fn
            );
          })
        });
      }
    },
    unbindEvents() {
      if (this["_events"]) {
        Object.keys(this["_events"]).map(eventName => {
          this["_events"][eventName].forEach((fn) => {
            this.$refs.input.removeEventListener(
                eventName,
                fn
            );
          })
        });
      }
    },
  },
  mounted() {
    this.bindEvents();
  },
  beforeDestroy() {
    this.unbindEvents();
  },
  render(createElement) {
    const componentStack = [];
    componentStack.push(this.renderIcons(createElement))
    componentStack.push(this.renderInformer(createElement))
    const props = {...this._props}
    if(this.inputType === "number"){
      return createElement(InputV2Number, {
        props: props, ref: 'input', on: {
          input: this.onInput,
          clear: this.onClear,
          focus: this.onFocus,
          blur: this.onBlur
        }
      }, componentStack)
    }
    if(typeof props.value == 'number') {
      props.value = props.value.toString()
    }
    if (this.inputType == 'password') {
      return createElement(InputV2Password, {
        props: props, ref: 'input', on: {
          input: this.onInput,
          clear: this.onClear,
          focus: this.onFocus,
          blur: this.onBlur,
          change: this.onChange
        }
      }, componentStack)
    }
    if (this.inputType == 'tel') {
      return createElement(InputV2PhoneNumber, {
        props: props, ref: 'input', on: {
          input: this.onInput,
          clear: this.onClear,
          focus: this.onFocus,
          blur: this.onBlur,
          filled: this.onFilled
        }
      }, componentStack)
    }
    return createElement(InputV2Atom, {
      props: this._props, ref: 'input', scopedSlots: {
        icon: () => {
          componentStack
        },
        informer: () => {
          componentStack
        }
      },
      on: {
        input: this.onInput,
        clear: this.onClear,
        keydown: this.onKeydown,
        keyup: this.onKeyup,
        focus: this.onFocus,
        blur: this.onBlur,
        change: this.onChange
      }
    }, componentStack)
  }
};
</script>
