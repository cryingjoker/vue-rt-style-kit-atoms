<script type="text/jsx">
import {SelectStore} from "./SelectStore";

export default {
  name: "RtSelectV2Option",
  props: {
    selectName: {
      type: String,
      default: ''
    },
    value: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    default: {
      type: Boolean,
      default: false
    },
    sublabel: {
      type: String,
      default: ''
    },
    selected: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({}),
  computed: {},
  mounted() {
    let label
    if (this.label) {
      label = this.label
    } else {
      if (this.$slots.default[0].text?.length > 0) {
        label = this.$slots.default[0].text
      }
    }
    const data = {value: this.value, label: label}
    if (this.sublabel.length > 0) {
      data.sublabel = this.sublabel
    }
    SelectStore.setSelectorOption(this.selectName, data)
    if (this.selected) {
      SelectStore.setActiveValue(this.selectName, this.value)
    }
    if (this.default) {
      SelectStore.setDefaultValue(this.selectName, {value: this.value, label: label})
    }
  },
  render(h) {
    return null
  }
};
</script>
