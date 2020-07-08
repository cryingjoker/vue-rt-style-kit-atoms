<script type="text/jsx">


  import {getSpacesClass, spacesParamsNames, spacesParamsProps} from "../../mixins/spaceClassMixin.js";
  import {getDisplayClass, displayParamsNames, displayParamsProps} from "../../mixins/displayClassMixin.js";

  const componentProps = {
    size: {
      type: [Number, String],
      default: 0
    },
    tabletSize: {
      type: [Number, String],
      default: -1
    },
    mobileSize: {
      type: [Number, String],
      default: -1
    }
  }
  const componentsList = {};
  export default {
    name: "RtCol",
    props: {...componentProps, ...spacesParamsProps, ...displayParamsProps},
    data() {
      return {
        sizeParams: ['size', 'mobileSize', 'tabletSize'],
      }
    },

    mounted() {
      this.bindEvents()
    },
    beforeDestroy() {
      this.unbindEvents()
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
        }), ...this.sizeParams.map((name) => {
          if (this[name] >= 0) {
            return this.getClassName(name, this[name])
          }
        })
        ].filter((i) => i && i.length > 0);


        return classNamesArray.join(' ');
      }
    },
    methods: {
      getClassName(name, value) {
        let classNameArray = ['rt', 'col'];
        if (value > 0) {
          switch (true) {
            case name.search(/mobile/i) >= 0:
              classNameArray.push('md');
              break;
            case name.search(/tablet/i) >= 0:
              classNameArray.push('td');
              break;
          }
          classNameArray.push(value.toString());
        }
        if (value == 0) {
          classNameArray = [];
          switch (true) {
            case name.search(/mobile/i) >= 0:
              classNameArray.push('md');
              break;
            case name.search(/tablet/i) >= 0:
              classNameArray.push('td');
              break;
          }
          classNameArray.push('d')
          classNameArray.push('none')
        }
        return classNameArray.join('-');
      },
      bindEvents() {
        if (this["_events"]) {
          Object.keys(this["_events"]).map(eventName => {
            const that = this;
            that["_events"][eventName].forEach((fn) => {
              this.$refs.column.addEventListener(eventName, fn)
            });
          });
        }
      },
      unbindEvents() {
        if (this["_events"]) {
          Object.keys(this["_events"]).map(eventName => {
            this.$refs.column.removeEventListener(
                eventName,
                this["_events"][eventName]
            );
          });
        }
      }
    },
    render(h) {
      return <div ref="column" class={this.rowClassName}>{this.$slots.default}</div>
    }

  };
</script>
