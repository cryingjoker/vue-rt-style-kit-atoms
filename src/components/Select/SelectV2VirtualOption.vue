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
      type: [String, Number],
      default: ''
    },
    selectName:{
      type: String,
      default: ''
    },
    value:{
      type: [String, Number],
      default: null
    },
    multiple:{
      type: Boolean,
      default: false
    },
    isFocus:{
      type: Boolean,
      default: false
    },
    sublabel: {
      type: String,
      default: ''
    }
  },
  computed:{
    selectClass(){
      const classList = ["select-v2-option","d-block"];
      if(this.isActive && !this.multiple){
        classList.push("select-v2-option--select");
      }
      if(this.isFocus){
        classList.push("select-v2-option--focus");
      }
      return classList.join(' ')
    },
    renderSublabel(){
      if(this.sublabel.length > 0){
        return <p class="rt-font-label color-main05">{this.sublabel}</p>
      }
      return null
    },
  },
  watch:{
    isFocus(newVal,oldVal){
      if(newVal && newVal!=oldVal){
        this.$refs.button.focus()
      }
    }
  },
  mounted() {
    this.setFocus()
  },
  methods:{
    scrollToEl(){
      const el = this.$el;
      const parentEl = el.parentElement;
      if(parentEl.classList.contains('select-list')){
        parentEl.scrollTop = el.getBoundingClientRect().top - parentEl.getBoundingClientRect().top
      }
    },
    setFocus(){
      if(this.isActive){
        this.$refs.button.focus()
        this.scrollToEl()
      }
    },
    onClickFire(){
      if(this.isActive){
        SelectStore.removeActiveValue(this.selectName, this.value)
      }else{
        SelectStore.setActiveValue(this.selectName, this.value)
      }
      if(this.$parent.autoComplete) {
        SelectStore.setClose(this.selectName)
      }
    }
  },
  render(h) {
    const renderLabel = () => {
      if(!!SelectStore.getInputText()) {
        let boldText = SelectStore.getInputText();
        let fullString = this.label;
        return <span>
          <span class="rt-font-bold">{fullString.slice(0, boldText.length)}</span>
          {fullString.slice(boldText.length)}
        </span>
      } else {
        return this.label
      }
    }
    if(this.label.length>0) {
      if(this.multiple){
        return <button type="button" ref="button" class={this.selectClass} onClick={this.onClickFire}>
          <rt-checkbox is-orange={true} checked={this.isActive}></rt-checkbox>
          <div class="select-v2-option__inner">
            <p class="rt-font-small-paragraph">{this.label}</p>
            {this.renderSublabel}
          </div>
        </button>
      }
      return <button type="button" ref="button" class={this.selectClass} onClick={this.onClickFire}>
        <div class="select-v2-option__inner">
          <p class="rt-font-small-paragraph">{renderLabel()}</p>
          {this.renderSublabel}
        </div>
      </button>
    }
    return null
  }
};
</script>
