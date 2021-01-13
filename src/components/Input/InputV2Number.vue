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
    }
  },

  methods: {
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
          if (typeof this.minNumber == 'number' && e < this.minNumber) {
            e = this.minNumber
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
        step = this.step - this.value % this.step;
        step += Math.abs(min)
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
        step = -((this.value - this.step - min) % this.step);
        if (step >= 0) {
          step = -this.step;
        }
      }
      this.changeInput(step)
    },
    changeInput(delta) {
      let value = this.$refs['input'].value
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

      icons.push(createElement('rt-system-icons', {
            class: 'input-number-icon',
            props: {name: "add small"}, on: {
              click: this.addNumber
            }
          },
      ))

      icons.push(createElement('rt-system-icons', {
            class: 'input-number-icon',
            props: {name: "remove small"}, on: {
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
    return createElement(InputV2Atom, {props: props, on: {input: this.onInput}, ref: 'input'}, componentStack)
  }
};
</script>
