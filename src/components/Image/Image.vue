<script type="text/jsx">

import { deviceTypeStore } from "../../stores/deviceTypeStoreMixin.js";

function WebpIsSupported(callback) {
  // If the browser doesn't has the method createImageBitmap, you can't display webp format
  if (!window.createImageBitmap) {
    callback(false);
    return;
  }

  // Base64 representation of a white point image
  var webpdata = 'data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoCAAEAAQAcJaQAA3AA/v3AgAA=';

  // Retrieve the Image in Blob Format
  fetch(webpdata).then(function (response) {
    return response.blob();
  }).then(function (blob) {
    // If the createImageBitmap method succeeds, return true, otherwise false
    createImageBitmap(blob).then(function () {
      callback(true);
    }, function () {
      callback(false);
    });
  });
}

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
    lgSrc: {
      type: String,
      default: ''
    },
    x2LgSrc: {
      type: String,
      default: ''
    },
    webpSrc: {
      type: String,
      default: ''
    },
    webpX2Src: {
      type: String,
      default: ''
    },
    webpTdSrc: {
      type: String,
      default: ''
    },
    webpMdSrc: {
      type: String,
      default: ''
    },
    webpLgSrc: {
      type: String,
      default: ''
    },
    webpX2LgSrc: {
      type: String,
      default: ''
    },
    lazySrc: {
      type: String,
      default: ''
    },
    lazyTdSrc: {
      type: String,
      default: ''
    },
    lazyMdSrc: {
      type: String,
      default: ''
    },
    lazyLgSrc: {
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
      supportWebP: false,
      lazyReady: false
    }
  },
  beforeUpdate() {
    deviceTypeStore.removeWatcher(this._uid, this.calculateTypeOptions);
  },
  updated() {
    deviceTypeStore.removeWatcher(this._uid, this.calculateTypeOptions);
    deviceTypeStore.addWatcher(this._uid, this.calculateTypeOptions);
  },
  beforeDestroy() {
    deviceTypeStore.removeWatcher(this._uid, this.calculateTypeOptions);
  },
  computed: {
    image() {
      let image = '';
      if (this.type == 'desktop-large' && this.lgSrc) {
        if (this.x2LgSrc && window.devicePixelRatio && window.devicePixelRatio > 1) {
          if (this.supportWebP && this.webpX2LgSrc) {
            image = this.webpX2LgSrc
          } else {
            image = this.x2LgSrc
          }
        } else {
          if (this.supportWebP && this.webpLgSrc) {
            image = this.webpLgSrc
          } else {
            image = this.lgSrc
          }
        }
      }
      if (this.type == 'tablet' && this.tdSrc) {
        if (this.supportWebP && this.webpTdSrc) {
          image = this.webpTdSrc
        } else {
          image = this.tdSrc
        }
      }
      if (this.type == 'mobile' && this.mdSrc)
        if (this.supportWebP && this.webpMdSrc) {
          image = this.webpMdSrc
        } else {
          image = this.mdSrc
        }
      if (image.length == 0) {
        if (this.x2Src && window.devicePixelRatio && window.devicePixelRatio > 1) {
          if (this.supportWebP && this.webpX2Src) {
            image = this.webpX2Src
          } else {
            image = this.x2Src
          }
        } else {
          if (this.supportWebP && this.webpSrc) {
            image = this.webpSrc
          } else {
            image = this.src
          }
        }
      }
      if (this.backgroundMode) {
        image = 'url(' + image + ')';
      }
      return image
    },
    lazy(){
      let lazyImage = '';
      if (this.type == 'desktop-large' && this.lazyLgSrc) {
        lazyImage = this.lazyLgSrc
      }
      if (this.type == 'tablet' && this.lazyTdSrc) {
        lazyImage = this.lazyTdSrc
      }
      if (this.type == 'mobile' && this.lazyMdSrc){
        lazyImage = this.lazyMdSrc
      }
      if (lazyImage.length == 0 && this.lazySrc) {
        lazyImage = this.lazySrc
      }
      return lazyImage
    }
  },
  mounted() {
    WebpIsSupported((isSupported) => {
      if (isSupported) {
        this.supportWebP = isSupported
      }
    })
    deviceTypeStore.addWatcher(this._uid, this.calculateTypeOptions);
    this.calculateTypeOptions();

  },
  methods: {
    calculateTypeOptions() {
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
        if(this.lazySrc){
          return <div class="rt-img-container">
            <img ref="img" v-lazy-src={this.image} class="rt-img d-block" src={this.lazy} alt=""/>
          </div>
        }else {
          return <div class="rt-img-container">
            <img ref="img" class="rt-img d-block" src={this.image} alt=""/>
          </div>
        }
      }
    }
    return null
  }
};
</script>
