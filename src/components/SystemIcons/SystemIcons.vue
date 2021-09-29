<script type="text/jsx">
import './SystemIcons.styl'

import systemIcons from '../../system-icons.json'

function de(b) {
  var a, e, d, c, g, h, o, f;
  a, e = {}, d = b.split(""), c = f = d[0], g = [c], h = o = 256;
  for (b = 1; b < d.length; b++) a = d[b].charCodeAt(0), a = h > a ? d[b] : e[a] ? e[a] : f + c, g.push(a), c = a.charAt(0), e[o] = f + c, o++, f = a;
  return g.join("")
}

const systemIconsData = JSON.parse(de(systemIcons.data))
export default {
  name: "RtSystemIcons",
  props: {
    name: {
      default: '',
      type: String
    },
    color: {
      default: '',
      type: String
    },
    bright:{
      default: false,
      type: Boolean
    }
  },
  data: () => ({
    optios: {},
    localName: null
  }),
  watch: {
    name(newVal, oldVal) {
      this.localName = newVal
      this.setOptions()
    }
  },
  created() {
    this.localName = this.name;
    this.setOptions()
  },
  computed: {
    iconClass() {
      const classList = ['rt-sys-icon'];
      if(this.bright){
        classList.push('rt-sys-icon-bright')
      }
      if (this.color.length > 0) {
        classList.push('rt-sys-icon--' + this.color)
      }
      return classList.join(' ')
    },

  },
  mounted() {
    this.bindEvent();
  },
  methods: {
    setOptions() {
      if (this.localName in systemIconsData) {
        this.optios = systemIconsData[this.localName]
        let html = this.optios.html;
        html = html.replace(/@fr/g, 'fill-rule')
        html = html.replace(/@cr/g, 'clip-rule')
        html = html.replace(/@sw/g, 'stroke-width')
        html = html.replace(/@edd/g, 'evenodd')
        this.optios.html = html;
      }
    },
    bindEvent(){
      Object.keys(this["_events"]).map(eventName => {
        this["_events"][eventName].forEach((fn)=>{
          this.$refs?.icon?.addEventListener(eventName, fn)
        })
      })
    },
    unbindEvent(){
      Object.keys(this["_events"]).map(eventName => {
        this["_events"][eventName].forEach((fn)=>{
          this.$refs?.icon?.removeEventListener(eventName, fn)
        })
      })
    }
  },
  beforeDestroy() {
    this.unbindEvent()
  },
  render() {

    if (this.optios.html) {
      return <svg class={this.iconClass} width={this.optios.width} height={this.optios.height}
                  ref="icon"
                  viewBox={"0 0 " + this.optios.width + " " + this.optios.height} fill="none"
                  xmlns="http://www.w3.org/2000/svg" domPropsInnerHTML={this.optios.html}></svg>
    } else {
      console.info('alll not', this.name)
    }
    return null
  }
}

</script>
