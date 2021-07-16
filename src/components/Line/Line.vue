<script type="text/jsx">

import colors from '../../color.json'

const componentsList = {};

export default {
  name: "RtLine",
  props: {
    color: {
      type: String,
      default: 'main-color005-no-opacity'
    },
    height:{
      type: [String, Number],
      default: 2
    }
  },
  beforeUpdate() {
  },
  updated() {
  },
  beforeDestroy() {
  },
  mounted() {

  },
  computed:{
    lineClass(){
      return ['color-block--'+this.color, 'line']
    },
    colorVariable(){
      return colors[this.color] || colors['b2c-'+this.color]
    },
    setHeight(){

      return {
        height :  this.height+'px'
      }
    }
  },
  methods: {},

  render(h) {
    return <div class={this.lineClass} style={this.setHeight} color={this.colorVariable}></div>

  }
};
</script>
