<script type="text/jsx">

import {deviceTypeStore} from "../../index";

const componentsList = {};
export default {
  name: "RtImg",
  props: {
    src: {
      type: String,
      default: ''
    },
    x2Src: {
      type: String,
      default: ''
    },
    tdSrc: {
      type: String,
      default: ''
    },
    mdSrc: {
      type: String,
      default: ''
    },
    x2LgSrc: {
      type: String,
      default: ''
    },
    backgroundMode: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      type: '',
    }
  },
  beforeUpdate() {
    deviceTypeStore.removeWatcher(this._uid, this.calculateTypepOtions);
  },
  updated() {
    deviceTypeStore.removeWatcher(this._uid, this.calculateTypepOtions);
    deviceTypeStore.addWatcher(this._uid, this.calculateTypepOtions);
  },
  beforeDestroy() {
    deviceTypeStore.removeWatcher(this._uid, this.calculateTypepOtions);
  },
  computed: {
    image() {
      let image = '';

      if (this.type == 'desktop-large' && this.lgSrc) {
        if (this.x2LgSrc && window.devicePixelRatio && window.devicePixelRatio > 1) {
          image = this.x2LgSrc
        } else {
          image = this.lgSrc
        }
      }
      if (this.type == 'tablet' && this.tdSrc) {
        image = this.tdSrc
      }
      if (this.type == 'mobile' && this.mdSrc)
        image = this.mdSrc

      if (image.length == 0) {
        if (this.x2Src && window.devicePixelRatio && window.devicePixelRatio > 1) {
          image = this.x2Src
        } else {
          image = this.src
        }
      }
      if (this.backgroundMode) {
        image = 'url(' + image + ')';
      }
      return image
    }
  },
  mounted() {
    deviceTypeStore.addWatcher(this._uid, this.calculateTypepOtions);
    this.calculateTypepOtions();
  }
  ,
  methods: {
    calculateTypepOtions() {
      this.type = deviceTypeStore.getStatus()
    },
  },
  watch: {
    type(oldVal, newVal) {
      if (oldVal != newVal) {
        this.$forceUpdate()
      }
    }
  },
  render(h) {
    if (this.type) {
      if (this.backgroundMode) {
        return <div class="rt-img-container" style={{backgroundImage: this.image}}></div>
      } else {
        return <div class="rt-img-container">
          <img class="rt-img d-block" src={this.image} alt=""/>
        </div>
      }
    }
    return null
  }
};
</script>
