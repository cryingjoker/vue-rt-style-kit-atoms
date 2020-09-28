<script type="text/jsx">
import {SelectStore} from './SelectStore.js'

export default {
  name: "RtSelectV2VirtualOption",
  props: {
    onClickFn:{
      type: Function
    },
    isActive:{
      type: Boolean,
      default: false
    },
    label:{
      type: String,
      default: ''
    },
    selectName:{
      type: String,
      default: ''
    },
    value:{
      type: String
    }
  },
  computed:{
    selectClass(){
      const classList = ["select-option","d-block"];
      if(this.isActive){
        classList.push("select-option--select");
      }
      return classList.join(' ')
    },
  },
  methods:{
    setFocus(){
      if(this.isActive){
        this.$refs.button.focus()
      }
    },
    onClickFire(){
      console.info('onClickFire')
      console.info('!!!',this.value,this.label)
      if(this.isActive){
        SelectStore.removeActiveValue(this.selectName, this.value)
      }else{
        SelectStore.setActiveValue(this.selectName, this.value)
      }
    }
  },
  render(h) {
    if(this.label.length>0) {
      return <button ref="button" class={this.selectClass} onClick={this.onClickFire}>
        <div class="select-option__inner">
        !{this.label}! {this.isActive ? 1 : 2}
        </div>
      </button>
    }
    return null
  }
};
</script>
