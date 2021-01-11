<script type="text/jsx">
import InputV2Atom from "./InputV2Atom.vue";
import InputV2Password from "./InputV2Password.vue";

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
    scope: {
      type: String,
      default: ''
    },
    isInteger: {
      type: Boolean,
      default: false
    }
  },

  methods: {
    onInput(e) {
      this.$emit('input', e)
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

    if (this.inputType == 'password') {
      return createElement(InputV2Password, {
        props: this._props, ref: 'input', on: {
          input: this.onInput
        }
      }, componentStack)
    }

    return createElement(InputV2Atom, {
      props: this._props, ref: 'input', scopedSlots: {
        icon: () => {
          componentStack
        }
      },
      on: {
        input: this.onInput
      }

    }, componentStack)
  }
};
</script>
