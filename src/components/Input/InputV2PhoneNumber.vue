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
    backwards: false
  }),
  watch:{
    value(newVal, oldVal) {

      this.$refs.input.setInputValue(newVal)
      this.addMask()
    }
  },
  computed:{},
  mounted(){
    if(this.value != '') {
      this.addMask()
    }
  },
  methods: {
    preventZipCodeChange($event){
      this.caretPositionBefore = this.$refs.input.getSelectionStart();

      if($event.keyCode == 8 && this.caretPositionBefore <= 2 && this.localValue.length > 3) {
        $event.preventDefault();
      }
      if($event.keyCode == 8 && window.getSelection().toString() == this.localValue) {
        this.$refs.input.clearInput();
        this.localValue = ''
        this.filled = false
      }
      this.$emit('keydown', $event)
      if(this.$refs.input.getValue() == '' || this.localValue == ''){
        this.localValue = '';
        this.$emit("input", this.localValue);
      }
    },
    addMask() {
      let field = this.$refs.input.getValue().toString();

      if(field.length == 11) {
        if(field.charAt(0) == 7 || field.charAt(0) == 8) {
          this.$refs.input.setInputValue(field.slice(1));
        }
      }
      if(this.nativeInput) {
        this.caretPositionBefore = this.$refs.input.getSelectionStart();
        this.backwards = this.prevVal.length > field.length
      }
      if(this.backwards && this.nativeInput) {
        if(field.length == 4) {
          this.localValue = '+7 '
        }
        if(field.length < 4) {
          this.localValue = ''
        }
      } else {

        if(field.length == 1 && this.localValue.length <   field.length) {
          if(field != '7' && field != '8') {
            this.localValue = '+7 (' + field;
          } else {
            this.localValue = '+7 '
          }
        } else if(field.charAt(1) != '7') {
          this.$refs.input.setInputValue('+7' + field)
        }
      }
      let matrix = "+7 (___) ___ __ __",
          i = 0,
          def = matrix.replace(/\D/g, ""),
          val = field.replace(/\D/g, "");
      if (def.length >= val.length) val = def;
      var normalizeValue = matrix.replace(/./g, function (a) {
        return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? "" : a;
      });

      this.$refs.input.setInputValue(normalizeValue);

      this.localValue = normalizeValue;
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
        if(this.caretPositionBefore < this.caretPositionAfter - 2) {
          if(field.charAt(this.caretPositionBefore) == ' ') {
            this.setCaret(this.caretPositionBefore + 1)
            if(/[\D]/.test(field.charAt(this.caretPositionBefore - 1))) {
              this.setCaret(this.caretPositionBefore + 2)
            }
          } else {
            this.setCaret(this.caretPositionBefore)
          }
        }
      }

      this.prevVal = this.localValue
      this.nativeInput = false
    },
    clearValue() {
      this.localValue = '';
      this.$refs.input._data.localValue = '';
      this.$emit('clear')
    },
    setCaret(pos) {
      this.$refs.input.setSelectionRange(pos, pos)
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
    }
  },
  render(createElement) {
    const componentStack = [];
    const props = {...this._props}
    props.type = this.localType;
    props.value = this.localValue
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
                keyup: this.onKeyup
              },
          ref: 'input',
          componentStack
        }
    )
  }
};
</script>
