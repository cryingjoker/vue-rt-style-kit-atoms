<script type="text/jsx">

const componentsList = {};


export default {
  name: "RtSwitchV2",
  components: componentsList,
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    checked: {
      type: Boolean,
      default: false
    },
    name: {
      type: String,
      default: ''
    },
    invert:{
      type: Boolean,
      default: false
    }


  },

  computed:{
    switchClassName(){
      const switchClassName = ['switch-v2']
      if(this.invert){
        switchClassName.push('switch-v2--invert')
      }
      return switchClassName.join(' ')
    }
  },
  mounted: function () {

  },

  methods: {
    onChange(){

    }
  },
  render(h) {
    const renderInput = ()=> {
      if (this.name) {
        return <input ref="input"
                      name={this.name}
                      disabled={this.disabled}
                      checked={this.checked}
                      type="checkbox"
                      class="switch-v2-element"
                      onChange={this.onChange}/>
      } else {
        return <input ref="input"
                      disabled={this.disabled}
                      checked={this.checked}
                      type="checkbox"
                      class="switch-v2-element"
                      onChange={this.onChange}/>
      }
    }

    return <label class={this.switchClassName}>
      {renderInput()}
      <div class="switch-v2-container">
        <div class="switch-v2-float"></div>
        {this.$slots.default}
      </div>
    </label>
  }
};
</script>
