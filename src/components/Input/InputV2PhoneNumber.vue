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
    localValue: '',
    filled: false,
    caretPositionBefore: 0,
    caretPositionAfter: 0,
    prevVal: '',
    nativeInput: false,
    backwards: false,
    selection: false
  }),
  watch:{
    value(newVal, oldVal) {
      this.value = newVal
      this.$refs.input.$refs.input.value = newVal
      this.addMask()
    }
  },
  computed:{},
  mounted(){
    this.localValue = this.value
    if(this.value != '') {
      this.addMask()
    }
  },
  methods: {
    preventZipCodeChange($event){
      this.caretPositionBefore = this.$refs.input.$refs.input.selectionStart;
      if(!this.selection) {
        if($event.keyCode == 8 && this.caretPositionBefore <= 2 && this.localValue.length > 3 || this.localValue.length >= 18 && ($event.keyCode > 47 && $event.keyCode < 58)) {
          $event.preventDefault();
        }
      } else {
        this.selection = false;
      }
      if($event.keyCode == 8 && window.getSelection().toString() == this.localValue) {
        this.$refs.input.clearInput();
        this.localValue = ''
        this.filled = false
      }
      this.$emit('keydown', $event)
    },
    addMask() {
      let field = this.$refs.input.$refs.input;
      let fieldVal = field.value;
      if(fieldVal.length == 11) {
        if(+fieldVal.charAt(0) == 7 || +fieldVal.charAt(0) == 8) {
          fieldVal = fieldVal.slice(1);
        }
      }
      if(this.nativeInput) {
        this.caretPositionBefore = field.selectionStart;
        this.backwards = this.prevVal.length > fieldVal.length
      }
      if(this.backwards && this.nativeInput) {
        if(fieldVal.length == 4) {
          this.localValue = '+7 '
        }
        if(fieldVal.length < 4) {
          this.localValue = ''
        }
      } else {
        if(fieldVal.length == 1) {
          if(fieldVal != '7' && fieldVal != '8') {
            this.localValue = '+7 (' + fieldVal;
          } else {
            this.localValue = '+7 '
          }
        } else if(fieldVal.charAt(1) != '7') {
          fieldVal = '+7' + fieldVal
        }
      }
      let matrix = "+7 (___) ___ __ __",
          i = 0,
          def = matrix.replace(/\D/g, ""),
          val = fieldVal.replace(/\D/g, "");
      if (def.length >= val.length) val = def;
      fieldVal = matrix.replace(/./g, function (a) {
        return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? "" : a;
      });
      if(fieldVal.length > 3) {
        this.localValue = fieldVal;
      }
      this.filled = this.localValue.length == 18;
      this.$refs.input.localValue = this.localValue;
      if(this.filled && this.needVerification) {
        this.$emit('filled', this.localValue);
      }
      this.caretPositionAfter = field.selectionStart;
      if(this.backwards) {
        if(this.caretPositionBefore <= this.caretPositionAfter - 1) {
          this.setCaret(this.caretPositionBefore)
        }
      } else {
        if(this.caretPositionBefore < this.caretPositionAfter - 2 && this.caretPositionBefore != 1) {
          if(fieldVal.charAt(this.caretPositionBefore) == ' ') {
            this.setCaret(this.caretPositionBefore + 1)
            if(/[\D]/.test(fieldVal.charAt(this.caretPositionBefore - 1))) {
              this.setCaret(this.caretPositionBefore + 2)
            }
          } else {
            this.setCaret(this.caretPositionBefore)
          }
        }
      }
      this.prevVal = this.localValue
      this.nativeInput = false
      this.$emit('input', this.localValue)
    },
    clearValue() {
      this.localValue = '';
      this.$refs.input.localValue = '';
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
    },
    onInput(e) {
      if(!e.match(/\d/)) {
        this.$nextTick(() => {
          this.$refs.input._data.localValue = ''
        })
      }
      this.nativeInput = true;
      this.$emit('input', e)
    },
    onKeyup(e) {
      this.$emit('keyup', e)
    },
    onSelect() {
      this.selection = true
    }
  },
  render(createElement) {
    const componentStack = [];
    const props = {...this._props}
    props.type = this.localType;
    props.value = this.value;
    return createElement(InputV2Atom,
      {
        props: props,
        on:
          {
            phone: this.addMask,
            clear: this.clearValue,
            keydown: this.preventZipCodeChange,
            change: this.onChange,
            focus: this.onFocus,
            blur: this.onBlur,
            input: this.onInput,
            keyup: this.onKeyup,
            select: this.onSelect
          },
        ref: 'input',
        componentStack
      }
    )
  }
};
</script>
