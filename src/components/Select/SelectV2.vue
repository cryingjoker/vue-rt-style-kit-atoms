<script type="text/jsx">
import {SelectStore} from './SelectStore.js'

export default {
  name: "RtSelectV2",
  props: {
    type: {
      type: String,
      default: 'simple'
    },
    hasError: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: ""
    },
    value: {
      type: String,
      default: ''
    },
    text: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    errorMessage: {
      type: String,
      default: ''
    },
    dropdownMinWidth: {
      type: [String, Number],
      default: null
    },
    resetWrapperWidth: {
      type: Boolean,
      default: false
    },
    isB2bSelect: {
      type: Boolean,
      default: false
    },
    outlined: {
      type: Boolean,
      default: false
    },
    autoComplete: {
      type: Boolean,
      default: false
    },
    multi: {
      type: Boolean,
      default: false
    },
    fieldId: {
      type: String,
      default: ''
    },
    hasContentText: {
      type: Boolean,
      default: false
    },
    name: {
      type: String
    }
  },
  data: () => ({
    selectOptions: [],
    selectActiveValue: []
  }),
  methods: {
    getSelectOptions() {
      this.selectOptions = SelectStore.getSelectorOptions(this.name);
    },
    getActiveValue() {
      this.selectActiveValue = SelectStore.getActiveValue(this.name);
    },
    getSelectType() {
      this.selectorType = SelectStore.getSelectorType(this.name, this.type);
    }
  },
  mounted() {
    SelectStore.addWatcher(this.name, this.getSelectOptions)
    SelectStore.addWatcher(this.name, this.getSelectType)
    SelectStore.setSelectorType(this.name, this.type);
    this.getSelectOptions()
    this.getSelectType();
    this.getActiveValue();
  },
  beforeDestroy() {
    SelectStore.removeWatcher(this.name)
    SelectStore.clear(this.name)
  },
  computed: {
    renderSelectOption() {
      return this.selectOptions.map((item) => {
        const index = this.selectActiveValue.indexOf(item.value);

        return <p>{JSON.stringify(item)} {index}</p>
      })
    }
  },
  render(h) {
    return <div class="rt-select-v2">
      {this.$slots.default}
      {this.renderSelectOption}
    </div>
  }
};
</script>
