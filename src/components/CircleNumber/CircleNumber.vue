<script type="text/jsx">
import './circleNumber.styl'

export default {
  name: "RtCircleNumber",
  props: {
    value: {
      type: [Number, String],
      default: 0
    },
    size: {
      type: [Number, String],
      default: 0
    },
    isSmall:{
      type:Boolean,
      default: false
    }
  },
  data: () => ({}),
  computed: {
    correctValue() {
      return this.value - 0
    },
    path() {
      let rad = 120;
      if(this.isSmall){
        rad=80
      }
      let path = 'M'+rad/2+',1 A'+(rad/2-1)+','+(rad/2-1)+' 1 0 1 '
      if ((this.correctValue - 0) > (this.size - 0) / 2) {
        path += ''+rad/2+','+(rad-1)
        let proc = (this.correctValue - 0) / ((this.size - 0) / 2) - 1
        let alf = proc * Math.PI * -1
        let x = 0
        let y = -1*(rad/2 - 1)
        var sin = (angle) => Math.sin(angle).toFixed(5) - 0
        var cos = (angle) => Math.cos(angle).toFixed(5) - 0
        let x2 = x * cos(alf) - y * sin(alf) + rad/2
        let y2 = rad/2 - (x * sin(alf) + y * cos(alf))
        path += ' A'+(rad/2-1)+','+(rad/2-1)+' 1 0 1 '
        path += [x2, y2].join(',')
      } else {
        let proc = (this.correctValue - 0) / ((this.size - 0) / 2)
        let alf = proc * Math.PI * -1
        let x = 0
        let y = (rad/2 - 1)
        var sin = (angle) => Math.sin(angle).toFixed(5) - 0
        var cos = (angle) => Math.cos(angle).toFixed(5) - 0
        let x2 = x * cos(alf) - y * sin(alf) + rad/2
        let y2 = rad/2 - (x * sin(alf) + y * cos(alf))
        path += [x2, y2].join(',')
      }
      return path
    }
  },
  mounted() {
  },
  render() {
    let rad = 120;
    if(this.isSmall){
      rad=80
    }
    const circleNumberClassList = ['rt-circle-number', 'd-flex']
    if(this.isSmall){
      circleNumberClassList.push('rt-circle-number-small')
    }
    return <div class={circleNumberClassList}>
      <svg class="rt-circle-number-svg" viewBox={"0 0 "+rad+" "+rad} style={{width:rad+'px'}}>
        <circle class="rt-circle-number-svg__circle"  stroke-width="2" fill="none" stroke="#B8B9C0" cx={rad/2} cy={rad/2} r={rad/2-1}></circle>
        <path class="rt-circle-number-svg__line" stroke-width="2" fill="none" stroke="#FF4F12" d={this.path}></path>
      </svg>
      <div class="flex-center-center rt-circle-number-conent">
        <div>
      {this.$slots.default}
        </div>
      </div>
    </div>

  }
}

</script>
