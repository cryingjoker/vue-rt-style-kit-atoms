<script type="text/jsx">
import {SelectStore} from './SelectStore.js'

export default {
  name: "RtSelectV2VirtualOption",
  props: {
    onClick:{
      type: Function
    },
    isActive:{
      type: Boolean
    },
    label:{
      type: String,
      default: ''
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
    onClickFire(){
      this.onClick();
    }
  },
  render(h) {
    if(this.label.length>0) {
      return <div class={this.selectClass} onClick={this.onClickFire}>
        {this.label}
      </div>
    }
    return null
  }
};
</script>
