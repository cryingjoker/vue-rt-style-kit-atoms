<script type="text/jsx">


  import {getSpacesClass, spacesParamsNames, spacesParamsProps} from "../../mixins/spaceClassMixin.js";
  import {getDisplayClass, displayParamsNames, displayParamsProps} from "../../mixins/displayClassMixin.js";

  const componentProps = {
    extraSize: {
      type: [Number, String],
      default: 0
    },
    largeSize: {
      type: [Number, String],
      default: 0
    },
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
        sizeParams: ['extraSize', 'largeSize','size', 'mobileSize', 'tabletSize'],
      }
    },

    mounted() {
    },
    computed: {
      rowClassName() {
        const classNamesArray = [
          ...spacesParamsNames.map((name) => {
              const getSpacesClassFn = getSpacesClass.bind(this)
              return getSpacesClassFn(name, this[name])
          }), (()=>{
            const displayObj = {}
            displayParamsNames.map((spaceName)=> {
              if(spaceName in this) {
                displayObj[spaceName] = this[spaceName]
              }
            })
            return getDisplayClass(displayObj);
          })(),
          ...this.sizeParams.map((name) => {
          if (this[name] >= 0) {
            return this.getClassName(name, this[name])
          }
        })
        ].filter((i) => i && i.length > 0);

        return classNamesArray;
      }
    },
    methods: {
      getClassName(name, value) {
        const classNameArray = ['rt', 'col'];
        if (value > 0) {
          switch (true) {
            case name.search(/extra/i) >=0:
              classNameArray.push('xd');
              break;
            case name.search(/large/i) >=0:
              classNameArray.push('lg');
              break;
            case name.search(/mobile/i) >= 0:
              classNameArray.push('md');
              break;
            case name.search(/tablet/i) >= 0:
              classNameArray.push('td');
              break;
          }
          classNameArray.push(value.toString());
        }
        return classNameArray.join('-');
      }
    },
    render(h) {
      return <div class={this.rowClassName}>{this.$slots.default}</div>
    }

  };
</script>
