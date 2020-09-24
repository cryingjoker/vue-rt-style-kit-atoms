<script type="text/jsx">
import {SelectStore} from "./SelectStore";

export default {
  name: "RtSelectV2Option",
  props: {
    selectName:{
      type:String
    },
    value:{
      type:String
    },
    label:{
      type:String
    },
    isActive:{
      type: Boolean,
      default: false
    },
    default:{
      type: Boolean,
      default: false
    }
  },
  // data() {
  //
  // },
  computed: {
  },



  mounted() {
    let label
    if(this.label){
      label = this.label
    }
    else{
      if(this.$slots.default[0].text?.length > 0){
        label = this.$slots.default[0].text
      }
    }

    SelectStore.setSelectorOption(this.selectName,{ value: this.value, label: label});
    if(this.isActive){
      SelectStore.setActiveValue(this.selectName, this.value)
    }
    if(this.default){
      SelectStore.setDefaultValue(this.selectName, {value:this.value, label: this.label})
    }
  },
  render(h) {
    return null
  }
};
</script>
