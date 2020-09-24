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
      const classList = ["rt-select-v2-option"];
      if(this.isActive){
        classList.push("rt-select-v2-option--active");
      }
      return classList.join(' ')


    },
  },
  methods:{
    onClickFire(){
      console.info('onClickFire')
      if(this.isActive){
        SelectStore.removeActiveValue(this.selectName, this.value)
      }else{
        SelectStore.setActiveValue(this.selectName, this.value)
      }
    }
  },
  render(h) {
    if(this.label.length>0) {
      return <div class={this.selectClass} onClick={this.onClickFire}>
        !{this.label}! {this.isActive ? 1 : 2}
      </div>
    }
    return null
  }
};
</script>
