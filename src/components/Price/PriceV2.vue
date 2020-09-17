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
  watch: {},
  camputed: {
    normalValue(){
      let value = (this.value + '')

    }
  },


  mounted() {


  },
  computed: {},
  render(h) {
    return <div class="rt-price-v2">new price</div>
  }


}

</script>