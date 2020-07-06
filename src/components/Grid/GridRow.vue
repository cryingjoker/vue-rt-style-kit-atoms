<script type="text/jsx">

  import {getSpacesClass, spacesParamsNames, spacesParamsProps} from "../../mixins/spaceClassMixin.js";
  import {getDisplayClass, displayParamsNames, displayParamsProps} from "../../mixins/displayClassMixin.js";

  const componentsList = {};
  const componentProps = {
    tabletReverseDirection: {
      type: Boolean,
      default: false
    },
    mobileReverseDirection: {
      type: Boolean,
      default: false
    },
    tabletOnlyReverseDirection: {
      type: Boolean,
      default: false
    }
  };

  export default {
    name: "RtRow",
    props: {...componentProps, ...spacesParamsProps, ...displayParamsProps},

    mounted() {
      this.bindEvents()
    },
    beforeDestroy() {
      this.unbindEvents()
    },
    methods: {
      bindEvents() {
        if (this["_events"]) {
          Object.keys(this["_events"]).map(eventName => {
            const that = this;
            that["_events"][eventName].forEach((fn) => {
              this.$refs.row.addEventListener(eventName, fn)
            });
          });
        }
      },
      unbindEvents() {
        if (this["_events"]) {
          Object.keys(this["_events"]).map(eventName => {
            this.$refs.input.removeEventListener(
                eventName,
                this["_events"][eventName]
            );
          });
        }
      }
    },
    computed: {
      rowClassName() {
        const classNamesArray = [...spacesParamsNames.map((name) => {
          if (this[name] >= 0) {
            return getSpacesClass(name, this[name]);
          }
        }), ...displayParamsNames.map((name) => {
          if (this[name]) {
            return getDisplayClass(name, this[name]);
          }
        })].filter((i) => i && i.length > 0);
        switch (true) {
          case this.mobileReverseDirection:
            classNamesArray.unshift('row-md-reverse');
            break;
          case this.tabletReverseDirection:
            classNamesArray.unshift('row-td-reverse');
            break;

          case this.tabletOnlyReverseDirection:
            classNamesArray.unshift('row-td-only-reverse');
            break;
        }
        classNamesArray.unshift('row');
        return classNamesArray.join(' ');
      }
    },
    render(h) {
      return <div class={this.rowClassName} ref="row">{this.$slots.default}</div>
    }

  };
</script>
