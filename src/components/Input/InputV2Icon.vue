<script type="text/jsx">
import variables from "../../variables.json";
import VeeValidate from "vee-validate";

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
  },
  render() {

    if (this.$slots.icon?.length > 0) {
      return <span class="rt-input-v2-icon">
        {this.$slots.icon.map(i=><span class="rt-input-v2-icon-item">{i}</span>)}
        </span>
    }

    return <span class="rt-input-v2-icon" ref="icon">
          <span class="rt-input-v2-icon-item"><rt-system-icons
              name="close large"></rt-system-icons></span>
        </span>

  }
};
</script>
