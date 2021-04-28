<script type="text/jsx">
import InputV2Atom from "./InputV2Atom.vue";

const components = {}
components[InputV2Atom.name] = InputV2Atom
export default {
  name: "RtInputV2PhoneNumber",
  components: components,
  props: {
    bright: {
      type: Boolean,
      default: false
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
    label: {
      type: String,
      default: ''
    },
    color: {
      type: String,
      default: "purple"
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
  data: () => ({
    localType: 'tel',
    localValue: null,
    filled: false,
    caretPositionBefore: 0,
    caretPositionAfter: 0
  }),
  computed:{},
  mounted(){},
  methods: {
    preventZipCodeChange($event){
      this.caretPositionBefore = this.$refs.input.$refs.input.selectionStart;
      if($event.keyCode == 8 && this.caretPositionBefore <= 2 && this.localValue.length > 3) {
        $event.preventDefault();
      }
    },
    addMask($event) {
      let field = this.$refs.input.$refs.input;
      field.value.replace(/\D/g, "")
      let fixCaretPosition = false;
      if($event.inputType == 'deleteContentBackward') {
        if(field.value.length == 4) {
          this.localValue = '+7 '
        }
        if(field.value.length < 4) {
          this.localValue = ''
        }
      } else if(field.value.length == 1) {
        if(field.value != '7' && field.value != '8') {
          this.localValue = '+7 (' + field.value;
        } else {
          this.localValue = '+7 '
        }
      }
      this.caretPositionBefore = this.$refs.input.$refs.input.selectionStart;
      let matrix = "+7 (___) ___ __ __",
          i = 0,
          def = matrix.replace(/\D/g, ""),
          val = field.value.replace(/\D/g, "");
      if (def.length >= val.length) val = def;
      field.value = matrix.replace(/./g, function (a) {
        return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? "" : a;
      });
      if(field.value.length > 3) {
        this.localValue = field.value;
      }
      this.filled = this.localValue.length == 18;
      if(this.caretPositionBefore < this.caretPositionAfter - 2) {
        fixCaretPosition = true;
      }
      this.$refs.input._data.localValue = this.localValue;
      if(this.filled && this.needVerification) {
        this.$emit('filled', this.localValue);
      }
      this.caretPositionAfter = this.$refs.input.$refs.input.selectionStart;
      if(fixCaretPosition) {
        this.setCaret(this.caretPositionBefore)
      }
      this.$emit('input', $event)
    },
    clearValue() {
      this.localValue = '';
      this.$refs.input._data.localValue = '';
      this.$emit('clear')
    },
    setCaret(pos) {
      this.$refs.input.$refs.input.setSelectionRange(pos, pos)
    },
    onChange(e) {
      this.$emit('change', e)
    },
    onBlur(e) {
      this.$emit('blur', e)
    },
    onFocus(e) {
      this.$emit('focus', e)
    }
  },
  render(createElement) {
    const componentStack = [];
    const props = {...this._props}
    props.type = this.localType;
    return createElement(InputV2Atom,
      {
        props: props,
        on:
          {
            input: this.addMask,
            clear: this.clearValue,
            keydown: this.preventZipCodeChange,
            change: this.onChange,
            focus: this.onFocus,
            blur: this.onBlur
          },
        ref: 'input',
        componentStack
      }
    )
  }
};
</script>
