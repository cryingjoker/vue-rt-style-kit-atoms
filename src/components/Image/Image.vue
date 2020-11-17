<script type="text/jsx">

import {deviceTypeStore} from "../../index";

const componentsList = {};
export default {
  name: "RtImg",
  props: {
    image: {
      type: String,
      default: ''
    },
    x2Image: {
      type: String,
      default: ''
    },
    tdImage: {
      type: String,
      default: ''
    },
    mdImage: {
      type: String,
      default: ''
    },
    x2LgImage: {
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
    deviceTypeStore.removeWatcher(this._uid, this.calculateMobileOptions);
  },
  updated() {
    deviceTypeStore.addWatcher(this._uid, this.calculateMobileOptions);
  },
  beforeDestroy() {
    deviceTypeStore.removeWatcher(this._uid, this.calculateMobileOptions);
  },
  mounted() {
    deviceTypeStore.addWatcher(this._uid, this.calculateMobileOptions);
    this.calculateMobileOptions();
  },
  computed: {},
  calculateMobileOptions() {
    this.type = deviceTypeStore.getStatus()
  },
  render(h) {

    let image = '';
    switch (true) {
      case this.type == 'desktop-large' && this.lgImage:
        if (this.x2LgImage && window.devicePixelRatio && window.devicePixelRatio > 1) {
          image = this.x2LgImage
        }else {
          image = this.lgImage
        }
        break;
      case this.type == 'tablet' && this.tdImage:
        image = this.tdImage
        break;
      case this.type == 'mobile' && this.mdImage:
        image = this.mdImage
        break;
      default:
        if (this.x2Image && window.devicePixelRatio && window.devicePixelRatio > 1) {
          image = this.x2Image
        } else {
          image = this.image
        }
    }
    if (this.backgroundMode) {
      return <div class="rt-img-container" style={{backgroundImage: 'url('+image+')'}}></div>
    }else{
      <div class="rt-img-container">
        <img class="rt-img d-block" src={image} alt=""/>
      </div>
    }
  }
};
</script>
