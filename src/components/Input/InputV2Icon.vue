<script type="text/jsx">
import variables from "../../variables.json";

export default {
  name: "RtInputV2Icon",
  methods:{
    bindEvents(){
      if (this["_events"] ) {
        Object.keys(this["_events"]).map(eventName => {
          this.$refs?.icon?.addEventListener(
              eventName,
              ()=>{
                if (this["_events"] && this["_events"][eventName] && this["_events"][eventName][0] && typeof this["_events"][eventName][0] === 'function') {
                  this["_events"][eventName][0](arguments[0]);
                }
              }
          );
        });
      }
    }
  },
  mounted() {
    this.bindEvents()
    // if(this.$parent.localValue || this.$parent.value) {
    //   this.$el.addEventListener('click', ()=>{
    //     this.$emit('click')
    //   })
    // }
  },
  render() {
    if (this.$slots.icon?.length > 0) {
      return <span class="rt-input-v2-icon">
        {this.$slots.icon.map(i=><span class="rt-input-v2-icon-item">{i}</span>)}
      </span>
    }
    const icon = () => {
      if(this.$parent.localValue && !this.$parent.disabled) {
        return <span class="rt-input-v2-icon-item">
          <rt-system-icons name="close large"/>
        </span>
      }
      return null
    }
    return <span class="rt-input-v2-icon" ref="icon">
      {icon()}
    </span>
  }
};
</script>
