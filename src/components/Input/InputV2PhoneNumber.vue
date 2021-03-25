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
    localValue: true,
    filled: false
  }),
  computed:{},
  mounted(){},
  methods: {
    checkInputType($event){
      if((/\b[a-zA-Z]\b/).test($event.key)){
        $event.preventDefault();
      }
    },
    addMask($event) {
      let field = this.$refs.input.$el.querySelector('.rt-input-v2__input');
      if($event.inputType == 'deleteContentBackward') {
        if(field.value.length == 4) {
          this.localValue = '+7 '
        }
        if(field.value.length < 4) {
          this.localValue = ''
        }
      } else if(field.value.length == 1) {
        if((field.value != '7' && field.value != '8')) {
          this.localValue = '+7 (' + field.value;
        } else {
          this.localValue = '+7 '
        }
      }
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
      this.$refs.input._data.localValue = this.localValue;
      if(this.filled && this.needVerification) {
        this.$emit('filled', this.localValue);
      }
    },
    clearValue() {
      this.localValue = '';
      this.$refs.input._data.localValue = '';
    },
    // renderIcons(createElement) {
    //   let icon = '';
    //   if(this.localValue) {
    //     icon = createElement('rt-system-icons', {
    //         props: {name: "close large"}
    //       }
    //     )
    //   }
    //   if(this.needVerification) {
    //     if(this.verified) {
    //       return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    //         <circle opacity="0.8" cx="12" cy="12" r="10" fill="#5BCF6A"/>
    //         <path fill-rule="evenodd" clip-rule="evenodd" d="M17.5612 9.1768L11.0613 15.5704C10.7481 15.8784 10.2452 15.8763 9.93457 15.5657L6.93457 12.5657L8.06594 11.4343L10.5049 13.8733L16.4392 8.03613L17.5612 9.1768Z" fill="white"/>
    //       </svg>
    //     }
    //     if(this.filled) {
    //       icon = createElement('rt-system-icons', {
    //           props: {name: "loading"}
    //         }
    //       )
    //     }
    //   }
    //   return createElement(
    //       'template',
    //       {slot: 'icon'},
    //       [icon],
    //   );
    // }
  },
  render(createElement) {
    const componentStack = [];
    // componentStack.push(this.renderIcons(createElement));
    const props = {...this._props}
    props.type = this.localType;
    return createElement(InputV2Atom,
      {
        props: props,
        on:
          {
            input: this.addMask,
            clear: this.clearValue,
            keydown: this.checkInputType
          },
        ref: 'input',
        componentStack
      }
    )
  }
};
</script>
