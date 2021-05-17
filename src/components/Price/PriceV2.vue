<script type="text/jsx">
export default {
  name: "RtPriceV2",
  props: {
    bright: {
      type: Boolean,
      default: false
    },
    value: {
      type: [Number, String],
      default: 0
    },
    oldValue: {
      type: [Number, String],
      default: 0
    },
    optionLabel: {
      type: String,
      default: 'от'
    },
    showFloat: {
      type: Boolean,
      default: false
    },
    colorValue: {
      type: String,
      default: ''
    },
    currency: {
      type: String,
      default: 'руб.'
    },
    timeInterval: {
      type: String,
      default: 'мес.'
    },
    isOption: {
      type: Boolean,
      default: false
    },
    onlyPrice: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    localValue: 0,
    normalizeValue: 0,
    priceType: "",
    normalizeCurrency: '',
    normalizeTimeInterval: 0,
  }),
  watch: {},
  computed: {
    normalOldValue() {
      if (this.oldValue) {
        let value = (this.oldValue + '')
        if (this.showFloat) {
          value = (parseFloat(value.replace(',', '.')) + '').split('.')
          value[0] = (value[0] + '').replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1 ");
          if(value[1] != undefined) {
            value[1] = '0.' + value[1]
            value[1] = ((value[1] - 0).toFixed(2) + '').replace('0.', '')
            value = value.join(',')
          }
        } else {
          value = parseInt(value) + ''
          value = value.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1 ");
        }
        return value
      }
      return null
    },
    normalValue() {
      let value = (this.value + '')
      if (this.showFloat) {
        value = (parseFloat(value.replace(',', '.')) + '').split('.')
        value[0] = (value[0] + '').replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1 ");
        if(value[1] != undefined) {
          value[1] = '0.' + value[1]
          value[1] = ((value[1] - 0).toFixed(2) + '').replace('0.', '')
          value = value.join(',')
        }
      } else {
        value = parseInt(value) + ''
        value = value.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1 ");
      }
      return value
    },
    currencyRender() {
      if (this.currency) {
        return <div class="rt-price-v2__info-item rt-font-control">{this.currency}
        </div>;

      }
      return null;

    },
    oldValueRender() {
      if (this.oldValue && parseFloat(this.oldValue) > 0) {
        return <div class="rt-price-v2__old-value d-inline-block rt-font-control">{this.normalOldValue}</div>;
      } else {
        return null;
      }
    },
    timeIntervalRender() {
      if (this.timeInterval && !this.onlyPrice) {
        return <div class="rt-price-v2__info-item rt-font-control">
          {this.timeInterval}
        </div>;
      }
      return null;
    },
    optionRender(){
      if (this.isOption) {
        return <div class="rt-price-v2__option d-inline-block sp-r-0-1 rt-font-control">{this.optionLabel}</div>;
      } else {
        return null;
      }
    },
    valueRender(){

      const classList = ["rt-price-v2__value", "d-inline-block", "rt-font-h1", "rt-font-bold"]
      if (this.oldValue && parseFloat(this.oldValue) > 0) {
        classList.push("sp-l-0-1")
      }

      return <div class={classList.join(' ')}>{this.normalValue}</div>;
    },
    postCodeRender(){
      const classNames = ["d-inline-block", "flex-column", "sp-l-0-1", "rt-price-n__info"]
      if(this.onlyPrice){
        classNames.push('rt-price-n__info-price')
      }
      return <div class={classNames.join(' ')}>{this.currencyRender}{this.timeIntervalRender}</div>
    },
    wrapperClass(){
      const classList = ["rt-price-v2"];
      if(this.bright){
        classList.push("rt-price-v2-bright")
      }
      return classList.join(' ')
    }
  },


  mounted() {


  },
  render(h) {
    return <div class={this.wrapperClass}>{this.optionRender}{this.oldValueRender}{this.valueRender}{this.postCodeRender}</div>
  }


}

</script>