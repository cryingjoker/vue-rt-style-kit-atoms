<script type="text/jsx">
import InputV2Atom from "./InputV2Atom.vue";

const components = {}
components[InputV2Atom.name] = InputV2Atom
export default {
  name: "RtInputV2Number",
  components: components,
  props: {
    bright: {
      type: Boolean,
      default: false
    },
    newVersion: {
      type: Number,
      default: 2
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
    minNumber: {
      type: Number,
      default: null
    },
    maxNumber: {
      type: Number,
      default: null
    },
    step: {
      type: Number,
      default: 1
    },
    isInteger:{
      type: Boolean,
      default: false

    }
  },

  methods: {
    onBlur(e){
      if(!isNaN(e)){
        if(typeof this.minNumber == 'number' && e < this.minNumber){
          this.$refs['input'].localValue = this.minNumber
          this.$emit('input', this.minNumber)
        }
        if(typeof this.maxNumber == 'number' && e > this.maxNumber){
          this.$refs['input'].localValue = this.maxNumber
          this.$emit('input', this.maxNumber)
        }
      }
    },
    onPaste(e){
      let paste = (e.clipboardData || window.clipboardData).getData('text') - 0;
      if(!isNaN(paste)){
        if(typeof this.minNumber == 'number' && paste < this.minNumber){
          this.$nextTick(()=> {
            this.$refs['input'].localValue = this.minNumber;
            this.$emit('input', this.minNumber)
          })
        }
        if(typeof this.maxNumber == 'number' && paste > this.maxNumber){
          this.$nextTick(()=> {
            this.$refs['input'].localValue = this.maxNumber;
            this.$emit('input', this.maxNumber)
          })
        }
      }
    },
    onInput(e) {

      if (isNaN(e)) {
        e = this.value
        this.$refs['input'].value = e;
        this.$refs['input'].localValue = e;
      } else {
        if (typeof e == 'number') {
          if (typeof this.maxNumber == 'number' && e > this.maxNumber) {
            e = this.maxNumber
            this.$refs['input'].localValue = e;
          }
        }
      }
      this.$emit('input', e)
    },
    addNumber() {
      let min = typeof this.minNumber == 'number' ? this.minNumber : 0
      let step = 0
      if (this.value == '') {
          step = min;
        if(min < 0){
          step += this.step
        }
        if(typeof this.minNumber != 'number') {
          step = this.step
        }
      } else {

        if(this.step%1 == 0) {
          step = this.step - (this.value - 0) % this.step;
          if(this.step >= 90) {
            step += Math.abs(min)
          }
        }else{
          step = this.step
        }
      }

      this.changeInput(step)
    },
    subtractNumber() {
      let min = typeof this.minNumber == 'number' ? this.minNumber : 0
      let step = 0
      if (this.value == '') {
          step = min;
          if(typeof this.minNumber != 'number'){
            step += this.step;
          }
      }else {
        step = -(((this.value - 0) - this.step - min) % this.step);
        if (step >= 0) {
          step = -this.step;
        }
      }
      this.changeInput(step)
    },
    changeInput(delta) {
      let value = this.$refs['input'].value - 0
      if (value.length == 0) {
        value = 0
      } else {
        value = value - 0
      }
      this.onInput((value + delta));
    },
    changeLocalType() {
      this.localType = this.localType == 'password' ? 'text' : 'password';
    },
    renderIcons(createElement) {
      let icons = []
      let iconClass = 'input-number-icon'
      if(this.bright){
        iconClass+=' input-number-icon-bright'
      }
      icons.push(createElement('rt-system-icons', {
            class: iconClass,
            props: {name: "add small",bright:this.bright}, on: {
              click: this.addNumber
            }
          },
      ))

      icons.push(createElement('rt-system-icons', {
            class: iconClass,
            props: {name: "remove small",bright:this.bright}, on: {
              click: this.subtractNumber
            }
          },
      ))


      return createElement(
          'template',
          {slot: 'icon'},
          icons,
      );
    }
  },
  render(createElement) {
    const componentStack = [];
    componentStack.push(this.renderIcons(createElement))
    const props = {...this._props}
    return createElement(InputV2Atom, {props: props, on: {input: this.onInput, blur: this.onBlur, paste: this.onPaste}, ref: 'input'}, componentStack)
  }
};
</script>
