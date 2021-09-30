<script type="text/jsx">
import './ArrowAnchor.styl'

export default {
  name: "RtArrowAnchor",
  props: {
    href: {
      type: String,
      default: ''
    },
    scrollToId: {
      type: String,
      default: ''
    },
    iconColor:{
      type: String,
      default: ''
    }
  },
  data: () => ({}),
  render: function (h) {
    return <button v-rt-scroll-to-on-click={{scrollToId: this.scrollToId}} type="button"
                   class="d-flex rt-sys-icon-hover--orange rt-sys-icon-focus--orange-button-active  rt-arrow-anchor">
      <rt-system-icons class="rt-arrow-anchor-icon" name="arrow right" color={this.iconColor}></rt-system-icons>
      <span class="sp-l-0-4 rt-font-control">{this.$slots.default}</span></button>
  }
};
</script>
