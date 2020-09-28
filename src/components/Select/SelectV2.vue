<script type="text/jsx">
import {SelectStore} from './SelectStore.js'
import SelectV2VirtualOption from './SelectV2VirtualOption.vue'
const components = {};
components[SelectV2VirtualOption.name] = SelectV2VirtualOption
export default {
  name: "RtSelectV2",
  components: components,
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
      type: String,
      default: ''
    },
    setFirstActive: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    selectOptions: [],
    selectActiveValue: []
  }),
  methods: {
    getSelectOptions() {
      this.selectOptions = [...SelectStore.getSelectorOptions(this.name)];
    },
    getActiveValue() {
      this.selectActiveValue = [...SelectStore.getActiveValue(this.name)];
    },
    getSelectType() {
      this.selectorType = SelectStore.getSelectorType(this.name, this.type);
    },
  },
  mounted() {
    if (this.setFirstActive) {
      SelectStore.setFirstActive(this.name);
    }
    SelectStore.setSelectorType(this.name, this.type);
    SelectStore.addWatcher(this.name, this.getSelectOptions)
    SelectStore.addWatcher(this.name, this.getActiveValue)
    SelectStore.addWatcher(this.name, this.getSelectType)
    this.getSelectType();
    this.getSelectOptions()
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
        const isActive = index >= 0;
        return <rt-select-v2-virtual-option select-name={this.name} is-active={isActive} value={item.value}
                                            label={item.label}></rt-select-v2-virtual-option>
      })
    },
    renderLabel() {

      const classList = [];
      classList.push('floating-placeholder')
      if (this.selectActiveValue.length > 0) {
        classList.push('floating-placeholder--go-top')
      }
      return <label ref="placeholder" class={classList.join(' ')}>{this.label}</label>
    },
    selectClasses() {
      let selectClasses = ['rt-select-v2','select', 'text-field'];
      // if (this.hasError) {
      //   selectClasses.push("select--error text-field--error");
      // }
      // if (this.isOpen) {
        selectClasses.push("select--is-open");
      // }
      // if (this.resetWrapperWidth) {
      //   selectClasses.push("select--is-reset-width");
      // }
      // if (this.disabled) {
      //   selectClasses.push("select--disabled");
      // }
      // if (this.isOpenListOnTop) {
      //   selectClasses.push("select--invert-open-list");
      // }
      // if (this.isB2bSelect) {
      //   selectClasses.push("rtb-select");
      // }
      // if (this.outlined) {
      //   selectClasses.push("rtb-select--outlined");
      // }
      // if (this.multi) {
      //   selectClasses.push("rtb-select--multi");
      // }
      // if (this.hasContentText) {
      //   selectClasses.push("rt-select--has-content")
      // }
      return selectClasses.join(' ');
    },
  },
  render(h) {
    return <div class={this.selectClasses}>
      {this.renderLabel}
      {this.$slots.default}
      {JSON.stringify(this.selectActiveValue)}
      {this.renderSelectOption}
    </div>
  }
};
</script>
