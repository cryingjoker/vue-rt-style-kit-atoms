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
    },
    isFocus:{
      type: Boolean,
      defaut: false
    },
    sublabel: {
      type: String,
      default: ''
    }
  },
  computed:{
    selectClass(){
      const classList = ["select-option","d-block"];
      if(this.isActive){
        classList.push("select-option--select");
      }
      if(this.isFocus){
        classList.push("select-option--focus");
      }
      return classList.join(' ')
    },
    renderSublabel(){
      if(this.sublabel.length > 0){

      }
      return null
    }
  },
  methods:{
    onClickFire(){
      if(this.isActive){
        SelectStore.removeActiveValue(this.selectName, this.value)
      }else{
        SelectStore.setActiveValue(this.selectName, this.value)
      }
    }
  },
  render(h) {
    if(this.label.length>0) {
      return <button type="button" ref="button" class={this.selectClass} onClick={this.onClickFire}>
        <div class="select-option__inner">{this.label}</div>
        {this.renderSublabel}
      </button>
    }
    return null
  }
};
</script>
