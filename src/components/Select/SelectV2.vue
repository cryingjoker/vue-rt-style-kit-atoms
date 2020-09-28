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
    selectActiveValue: [],
    selectActiveLabels: [],
    selectOpenStatus: false
  }),
  methods: {
    getSelectOptions() {
      this.selectOptions = [...SelectStore.getSelectorOptions(this.name)];
    },
    getActiveValue() {

      this.selectActiveValue = [...SelectStore.getActiveValue(this.name)];
      this.selectActiveLabels = [...SelectStore.getActiveLabels(this.name)];
      console.info('selectActiveValue',this.selectActiveValue)
      console.info('this.selectActiveLabelsselectActiveValue',this.selectActiveLabels)
    },
    getSelectType() {
      this.selectorType = SelectStore.getSelectorType(this.name, this.type);
    },
    getSelectOpenStatus() {
      this.selectOpenStatus = SelectStore.getOpenStatus(this.name);
      console.info('this.selectorOpenStatus !!',this.selectOpenStatus)
    },
    toggleOpen(){
      SelectStore.setOpen(this.name)
    }
  },
  mounted() {
    if (this.setFirstActive) {
      SelectStore.setFirstActive(this.name);
    }
    SelectStore.setSelectorType(this.name, this.type);
    SelectStore.addWatcher(this.name, this.getSelectOptions)
    SelectStore.addWatcher(this.name, this.getActiveValue)
    SelectStore.addWatcher(this.name, this.getSelectType)
    SelectStore.addWatcher(this.name, this.getSelectOpenStatus)
    this.getSelectType();
    this.getSelectOptions()
    this.getActiveValue();

  },
  beforeDestroy() {
    SelectStore.removeWatcher(this.name)
    SelectStore.clear(this.name)
  },
  computed: {
    renderSelectLine(){
      let borderClass = '';
      borderClass += this.selectOpenStatus ? 'text-field__border' : 'text-field__line';
      borderClass += (this.outlined && this.hasError) ? ' text-field__border--error' : '';
      return <div class={borderClass}></div>
    },
    renderSelectList() {
      return <div class="select-list">
        {this.renderSelectOption}
      </div>
    },
    renderSelectOption() {
      console.info('render not')
      if(!this.selectOpenStatus){
        return null
      }
      console.info('render')
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
      let selectClasses = ['rt-select','select', 'text-field'];
      // if (this.hasError) {
      //   selectClasses.push("select--error text-field--error");
      // }
      if (this.selectOpenStatus) {
        selectClasses.push("select--is-open");
      }
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
    renderValue(){
      return <p class="select-input">{this.selectActiveLabels.join(', ')}</p>
    }
  },
  render(h) {
    return <div class={this.selectClasses}>
      <div class="select__inner">
      <div class="select-inner-container">
        <button disabled={this.disabled} class="select__inner" onClick={this.toggleOpen}>
          <div class="select-value">
            {this.renderValue}
          </div>
      {this.renderLabel}
      {this.$slots.default}
          {this.renderSelectLine}

        </button>
        <div class="select-arrow">
          <svg class="select-arrow__icon" width="13" height="7">
            <path d="M.705 1.704l5.999 6 6-6L11.295.295h-.002l-4.59 4.58L2.115.294h-.002z"
                  fill="#575D68" fill-rule="evenodd"/>
          </svg>
        </div>
      </div>
        {this.renderSelectList}

      </div>


    </div>
  }
};
</script>
