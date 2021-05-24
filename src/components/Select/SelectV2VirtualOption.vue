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
    },
    index: {
      type: Number,
      default: null
    }
  },
  data() {
    return {
      checkMouseEnter: true
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
        return <p class="rt-font-label">{this.sublabel}</p>
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
        this.emitLeave()
      }
      if(this.$parent.autoComplete) {
        SelectStore.setClose(this.selectName)
      }
    },
    clickOnCheckbox(e){
      e.preventDefault()
      this.onClickFire()
    },
    emitEnter() {
      this.$emit('mouseenter')
    },
    emitLeave() {
      this.$emit('mouseleave')
    },
    emitMove() {
      this.$emit('mousemove')
    }
  },
  render(h) {
    const renderLabel = () => {
      if(!!SelectStore.getInputText(this.selectName)) {
        let boldText = SelectStore.getInputText(this.selectName);
        let fullString = this.label;
        return h('span', {
              domProps: {
                innerHTML: '<span class="select-v2-option__mismatch">'+fullString.replace(new RegExp('('+boldText.split(' ').join(')|(')+')','gi'),'</span><span>$&</span><span class="select-v2-option__mismatch">')+'</span>'
              }
            }
        )
      } else {
        return this.label
      }
    }
    if(this.label.length > 0) {
      if(this.multiple){
        return <button type="button" ref="button" class={this.selectClass} onClick={this.onClickFire}
                       onMouseenter={this.emitEnter} onMouseleave={this.emitLeave} onMousemove={this.emitMove}>
          <rt-checkbox onClick={this.clickOnCheckbox} is-orange={true} checked={this.isActive}></rt-checkbox>
          <div class="select-v2-option__inner">
            <p class="rt-font-control">{this.label}</p>
            {this.renderSublabel}
          </div>
        </button>
      }
      return <button type="button" ref="button" class={this.selectClass} onClick={this.onClickFire}
                     onMouseenter={this.emitEnter} onMouseleave={this.emitLeave} onMousemove={this.emitMove}>
        <div class="select-v2-option__inner">
          <p class="rt-font-control">{renderLabel()}</p>
          {this.renderSublabel}
        </div>
      </button>
    }
    return null
  }
};
</script>
