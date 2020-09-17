<script type="text/jsx">
import PriceV2 from './PriceV2.vue'

const componentsList = {};
componentsList[PriceV2.name] = PriceV2

export default {
  name: "RtPrice",
  components: componentsList,
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
      default: 'руб'
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
    },
    forGame: {
      type: Boolean,
      default: false
    },
    boldOption: {
      type: Boolean,
      default: false
    },
    b2bPrice: {
      type: Boolean,
      default: false
    },
    oldPriceColor: {
      type: String,
      default: ''
    },
    isTimeIntervalBottom: {
      type: Boolean,
      default: false
    },
    trimHundredth: {
      type: Boolean,
      default: false
    },
    darkened: {
      /**Deprecated. need to be cut off*/
      type: Boolean,
      default: false
    },
    v2: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    localValue: 0,
    normalizeValue: 0,
    normalizeOldValue: 0,
    priceType: "",
    normalizeCurrency: '',
    normalizeTimeInterval: 0,

  }),
  watch: {
    value: {
      // Run as soon as the component loads
      immediate: true,
      handler(val) {

        this.localValue = parseFloat(this.value.toString());
        this.normalizeValue = this.showFloat ?
            parseFloat(this.localValue.toString()).toString().split(".").map((item, index) => {
              if (index === 0) {
                item = item.replace(
                    /(\d)(?=(\d\d\d)+([^\d]|$))/g,
                    "$1 "
                );
              } else {
                item = parseInt(item).toFixed(2).toString();
                item = item[0] + item[1];
                item = item.replace('.', '');
                if (item.length === 1 && !this.trimHundredth) {
                  item += '0';
                }
              }
              return item;
            }).join(",") : parseInt(this.localValue.toString(), 10).toString().replace(
                /(\d)(?=(\d\d\d)+([^\d]|$))/g,
                "$1 "
            ).trim();
      }
    },
    oldValue(val) {
      this.normalizeOldValue = this.showFloat ?
          parseFloat(val.toString()).toString().split(".").map((item, index) => {
            if (index === 0) {
              item = item.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1 ");
            } else {
              item = parseInt(item).toFixed(2).toString();
              item = item[0] + item[1];
              item = item.replace('.', '');
              if (item.length === 1 && !this.trimHundredth) {
                item += '0';
              }
            }

            return item;
          }).join(",") : parseInt(val.toString(), 10).toString().replace(
              /(\d)(?=(\d\d\d)+([^\d]|$))/g,
              "$1 "
          ).trim();
    },
    currency(val) {
      this.normalizeCurrency = val;
    },
    timeInterval(val) {
      this.normalizeTimeInterval = val;
    }
  },

  mounted() {
    this.localValue = this.value ? parseFloat(this.value.toString()) : 0;
    this.normalizeCurrency = this.currency;
    this.normalizeTimeInterval = this.timeInterval;

    //todo сделать проверку системного языка с заменой . , у double данных
    if (this.showFloat) {
      this.normalizeValue = parseFloat(this.localValue.toString()).toString().split(".").map((item, index) => {
        if (index === 0) {
          item = item.replace(
              /(\d)(?=(\d\d\d)+([^\d]|$))/g,
              "$1 "
          );
        } else {
          item = parseInt(item).toFixed(2).toString()
          item = item[0] + item[1];
          item = item.replace('.', '');
          if (item.length === 1 && !this.trimHundredth) {
            item += '0';
          }
        }
        return item;
      }).join(",")
      this.normalizeOldValue = parseFloat(this.oldValue.toString()).toString().split(".").map((item, index) => {
        if (index === 0) {
          item = item.replace(
              /(\d)(?=(\d\d\d)+([^\d]|$))/g,
              "$1 "
          );
        } else {
          item = parseInt(item).toFixed(2).toString();
          item = item[0] + item[1];
          item = item.replace('.', '');
          if (item.length === 1 && !this.trimHundredth) {
            item += '0';
          }
        }
        return item;
      }).join(",")
    } else {
      this.normalizeValue = parseInt(this.value.toString(), 10).toString().replace(
          /(\d)(?=(\d\d\d)+([^\d]|$))/g,
          "$1 "
      ).trim();
      this.normalizeOldValue = parseInt(this.oldValue.toString(), 10).toString().replace(
          /(\d)(?=(\d\d\d)+([^\d]|$))/g,
          "$1 "
      ).trim();
    }


  },
  computed: {
    priceClass() {
      const rtPriceClass = ['rt-price', 'rt-price-without-space']
      if (this.forGame) {
        rtPriceClass.push('rt-price-game')
      }
      if (this.bright) {
        rtPriceClass.push('rt-price-bright')
      }
      return rtPriceClass.join(' ')
    }
  },
  render(h) {
    if (this.v2) {
      return <rt-price-v2 bright={this.bright} value={this.value} old-value={this.oldValue}
                          option-label={this.optionLabel} show-float={this.showFloat} currency={this.currency}
                          only-price={this.onlyPrice}
                          time-interval={this.timeInterval} is-option={this.isOption}>{this.$slots.default}</rt-price-v2>
    }
    const rtPriceInfoClass = "rt-price__info" + (this.boldOption ? " rt-price__info--bold-font" : "");
    const timeIntervalRender = () => {
      if (this.normalizeTimeInterval && !this.onlyPrice) {
        return <div class="rt-price__info-item">
          {this.normalizeTimeInterval}
        </div>;
      } else {
        return null;
      }
    };
    const optionRender = () => {
      if (this.isOption) {
        return <div class="rt-price__option">{this.optionLabel}</div>;
      } else {
        return null;
      }
    };
    const currencyRender = () => {
      if (this.normalizeCurrency) {
        {
          return <div class="rt-price__info-item">
            {this.normalizeCurrency}
          </div>;
        }
      } else {
        return null;
      }
    };
    const oldValueRender = () => {
      if (this.normalizeOldValue && parseFloat(this.normalizeOldValue) > 0) {
        return <div class="rt-price__old-value">{this.normalizeOldValue}</div>;
      } else {
        return null;
      }
    };
    const priceInfoRender = () => {
      if (this.isTimeIntervalBottom) {
        return <div>
          {optionRender()}
          <div
              class={"rt-price__value rtb-price__value" + (this.colorValue ? " color-" + this.colorValue : "")}>
            {this.$slots.epcPrice ? this.$slots.epcPrice : this.normalizeValue}
          </div>
          <div class="rtb-price__info rt-price__info">{this.normalizeCurrency}</div>
          <div
              class="rt-font-small-paragraph rt-font-bold rtb-price__info-interval">{this.normalizeTimeInterval}</div>
        </div>;
      } else {
        return <div>
          {optionRender()}
          <div
              class={"rt-price__value rtb-price__value" + (this.colorValue ? " color-" + this.colorValue : "")}>
            {this.$slots.epcPrice ? this.$slots.epcPrice : this.normalizeValue}
          </div>
          <div class="rt-price__info rtb-price__info">
            <div class="rt-price__info-item rtb-price__info-item">{this.normalizeCurrency}</div>
            <div class="rtb-price__info-item">{this.normalizeTimeInterval}</div>
          </div>
        </div>;
      }
    };
    if (this.b2bPrice) {
      const oldB2bPriceRender = () => {
        if (this.normalizeOldValue && parseFloat(this.normalizeOldValue) > 0) {
          return <div
              class={"rt-price__old-value rtb-price__old-value" + (this.oldPriceColor ? " color-" + this.oldPriceColor : "")}>{this.normalizeOldValue}
            <div class={"rt-price__info rtb-price__info-item"}>
            <span
                class={(this.oldPriceColor ? " color-" + this.oldPriceColor : "")}>{this.normalizeCurrency}</span>
            </div>
          </div>;
        } else {
          return null;
        }
      };
      return <div
          class={"rt-price rtb-price rt-price-without-space" + (this.darkened ? " rtb-price--darkened" : "")}>
        {oldB2bPriceRender()}
        {priceInfoRender()}
      </div>;
    } else {
      return <div class={this.priceClass}>
        {optionRender()}
        {oldValueRender()}
        <div
            class={"rt-price__option-value rt-price__value" + (this.colorValue ? " color-" + this.colorValue : "")}>{this.normalizeValue}</div>
        <div class={rtPriceInfoClass}>
          {currencyRender()}
          {timeIntervalRender()}
        </div>
      </div>;
    }
  }


}

</script>