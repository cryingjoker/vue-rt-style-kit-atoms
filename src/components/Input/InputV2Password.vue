<script type="text/jsx">
import InputV2Atom from "./InputV2Atom.vue";

const components = {}
components[InputV2Atom.name] = InputV2Atom
export default {
  name: "RtInputV2Password",
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
    type: {
      type: String,
      default: 'text'
    },
    color: {
      type: String,
      default: "purple"
    },
  },
  data: () => ({
    localType: 'password'
  }),
  methods: {
    onInput(e){
      this.$emit('input',e)
    },
    changeLocalType() {
      this.localType = this.localType == 'password' ? 'text' : 'password';
    },
    renderIcons(createElement) {
      let icon = ''
      if (this.localType == 'password') {
        icon = createElement('rt-system-icons', {
              props: {name: "password hide", bright:this.bright}, on: {
                click: this.changeLocalType
              }
            },
        )
      } else {
        icon = createElement('rt-system-icons', {
              props: {name: "password show", bright:this.bright}, on: {
                click: this.changeLocalType
              }
            },
        )
      }
      return createElement(
          'template',
          {slot: 'icon'},
          [icon],
      );
    }
  },
  render(createElement) {
    const componentStack = [];
    componentStack.push(this.renderIcons(createElement))
    const props = {...this._props}
    props.type = this.localType;
    return createElement(InputV2Atom, {props: props,on:{input:this.onInput}}, componentStack)
  }
};
</script>
