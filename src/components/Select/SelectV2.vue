<script type="text/jsx">
import {SelectStore} from './SelectStore.js'
import SelectV2VirtualOption from './SelectV2VirtualOption.vue'

const components = {};
components[SelectV2VirtualOption.name] = SelectV2VirtualOption
export default {
  name: "RtSelectV2",
  components: components,
  props: {
    json: {
      type: Array,
      default: () => {
        return []
      }
    },
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
      type: String | Array,
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


    autoComplete: {
      type: Boolean,
      default: false
    },
    multiple: {
      type: Boolean,
      default: false
    },
    fieldId: {
      type: String,
      default: ''
    },

    name: {
      type: String,
      default: ''
    },
    setFirstActive: {
      type: Boolean,
      default: false
    },
    v2: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    selectOptions: [],
    selectActiveValue: [],
    selectActiveLabels: [],
    selectOpenStatus: false,
    focusIndex: 0,
    activeIndex: 0,
    verticalOrientation: 'bottom'
  }),
  methods: {
    getSelectOptions() {
      const selectorOptions = SelectStore.getSelectorOptions(this.name);
      if (selectorOptions) {
        this.selectOptions = [...selectorOptions];
      }
    },
    getActiveValue() {
      let selectActiveValue = SelectStore.getActiveValue(this.name)
      let selectActiveLabels = SelectStore.getActiveLabels(this.name)
      if (selectActiveValue) {
        this.selectActiveValue = [...selectActiveValue];
      }
      if (selectActiveLabels) {
        this.selectActiveLabels = [...selectActiveLabels];
      }
      this.activeIndex = SelectStore.getActiveIndex(this.name)
      this.focusIndex = SelectStore.getFocusIndex(this.name)
    },
    getSelectType() {

      this.selectorType = SelectStore.getSelectorType(this.name, this.type, this.multiple);
    },
    getSelectOpenStatus() {
      this.selectOpenStatus = SelectStore.getOpenStatus(this.name);
    },
    setVerticalOrientation() {
      if (window.innerHeight + window.screenTop - this.$el.getBoundingClientRect().top < 200) {
        if (this.$el.getBoundingClientRect().top < 200) {
          this.verticalOrientation = 'bottom'
        } else {
          this.verticalOrientation = 'top'
        }
      } else {
        this.verticalOrientation = 'bottom'
      }
    },
    toggleOpen() {
      if (!this.disabled) {
        if (!this.selectOpenStatus) {
          SelectStore.setOpen(this.name)
          this.setVerticalOrientation()
        } else {
          SelectStore.setClose(this.name)
        }
      }
    },
    bindClickOutside() {
      window.addEventListener('click', this.clickOutsideFn)
    },
    unbindClickOutside() {
      window.removeEventListener('click', this.clickOutsideFn)
    },
    bindKeydown() {
      window.addEventListener('keydown', this.keydownFn)
    },
    unbindKeydown() {
      window.removeEventListener('keydown', this.keydownFn)
    },
    keydownFn(e) {
      if (e.keyCode == 40) {
        SelectStore.setNextFocus(this.name)
        e.preventDefault()
        e.stopPropagation()
      }
      if (e.keyCode == 38) {
        SelectStore.setPreviewFocus(this.name)
        e.preventDefault()
        e.stopPropagation()
      }
      if (e.keyCode == 27) {
        SelectStore.setClose(this.name)
        e.preventDefault()
        e.stopPropagation()
      }
      if (e.keyCode == 13) {
        // SelectStore.setClose(this.name)
        this.$refs['select-item-' + this.focusIndex]?.onClickFire()
        e.preventDefault()
        e.stopPropagation()
      }
    },
    setNextFocus() {
      const size = this.selectOptions.length
      this.focusIndex = (this.focusIndex + 1) % size
    },
    setPreviewFocus() {
      const size = this.selectOptions.length
      this.focusIndex = (this.focusIndex - 1 + size) % size
    },
    bindMouseenterMouse() {
      if (this.$refs['select']?.addEventListener) {
        this.$refs['select'].addEventListener('mouseenter', this.mouseenterFn)
        this.$refs['select'].addEventListener('mouseleave', this.mouseleaveFn)
      }

    },
    unbindMouseenterMouse() {
      if (this.$refs['select'].removeEventListener) {
        this.$refs['select'].removeEventListener('mouseenter', this.mouseenterFn)
        this.$refs['select'].removeEventListener('mouseleave', this.mouseleaveFn)
      }
    },
    mouseenterFn() {
      this.mouseenter = true
    },
    mouseleaveFn() {
      this.mouseenter = false
    },
    clickOutsideFn() {
      if (!this.mouseenter) {
        SelectStore.setClose(this.name)
      }
    }
  },
  mounted() {
    if (Object.keys(this.json)?.length > 0) {
      SelectStore.addJson(this.name, this.json)
    }
    if (this.setFirstActive) {
      SelectStore.setFirstActive(this.name);
    }

    SelectStore.setSelectorType(this.name, this.type);
    SelectStore.addWatcher(this.name, this.getSelectOptions)
    SelectStore.addWatcher(this.name, this.getActiveValue)
    SelectStore.addWatcher(this.name, this.getSelectType)
    SelectStore.addWatcher(this.name, this.getSelectOpenStatus)
    SelectStore.setActiveValue(this.name, this.value)
    this.getSelectType();
    this.getSelectOptions()
    this.getActiveValue();

  },
  beforeDestroy() {
    SelectStore.removeWatcher(this.name)
    SelectStore.clear(this.name)
  },
  watch: {

    value: {
      deep: true,
      handler(newVal, oldVal) {
        if (JSON.stringify(newVal) != JSON.stringify(oldVal)) {
          SelectStore.setActiveValue(this.name, newVal)
          this.getSelectType();
          this.getSelectOptions()
          this.getActiveValue();
        }
      }
    },
    json: {
      deep: true,
      handler(newVal, oldVal) {
        if (JSON.stringify(newVal) != JSON.stringify(oldVal)) {
          SelectStore.addJson(this.name, newVal)
          this.getSelectType();
          this.getSelectOptions()
          this.getActiveValue();

        }
      }
    },
    selectActiveValue(newVal, oldVal) {
      if (JSON.stringify(newVal) != JSON.stringify(oldVal)) {
        this.$emit('change', newVal.filter(i => i))
      }
    },
    selectOpenStatus(newVal, oldVal) {
      if (newVal && !oldVal) {
        this.mouseenterFn();
        this.bindClickOutside()
        this.bindMouseenterMouse()
        this.bindKeydown()
      } else {
        if (!newVal && oldVal) {
          this.unbindClickOutside()
          this.unbindMouseenterMouse()
          this.unbindKeydown();
        }
      }
    }
  },
  computed: {
    renderSelectList() {
      const renderShadowUp = () => {
        if (this.selectOptions.length > 6) {
          return <div class="select-v2-list-shadow-up"></div>
        }
        return null
      }
      const renderShadowDown = () => {
        if (this.selectOptions.length > 6 ) {
          return <div class="select-v2-list-shadow-down"></div>
        }
        return null
      }
      return <div class="select-v2-list">
        <div class="select-v2-list-inner">
          {renderShadowUp()}
          {renderShadowDown()}
          {this.renderSelectOption}
        </div>
      </div>
    },
    renderSelectOption() {
      if (!this.selectOpenStatus) {
        return null
      }
      return this.selectOptions.map((item, index) => {
        const isActive = this.activeIndex[index] > 0;
        const isFocus = index == this.focusIndex;
        return <rt-select-v2-virtual-option ref={'select-item-' + index} select-name={this.name} is-active={isActive}
                                            value={item.value}
                                            multiple={this.multiple}
                                            sublabel={item.sublabel}
                                            is-focus={isFocus}
                                            label={item.label}></rt-select-v2-virtual-option>
      })
    },

    renderLabel() {
      const classList = [];
      classList.push('select-v2-label')
      if (this.selectActiveValue && this.selectActiveValue[0]?.length > 0) {
        classList.push('select-v2-label--up')
      }
      return <label ref="placeholder" class={classList.join(' ')}>{this.label}</label>
    },
    selectClasses() {
      let selectClasses = [];
      selectClasses.push('select-v2',)
      if (this.hasError) {
        selectClasses.push("select-v2--error text-field--error");
      }
      if (this.selectOpenStatus) {
        selectClasses.push("select-v2--is-open");
        if (this.verticalOrientation == 'top') {
          selectClasses.push("select-v2--invert-open-list");
        }
      }

      if (this.disabled) {
        selectClasses.push("select-v2--disabled");
      }

      return selectClasses.join(' ');
    },
    renderValue() {
      if (this.autoComplete) {
        <rt-input value={"this.selectActiveLabels.join(', ')"}></rt-input>
      } else {
        if(this.selectActiveLabels.length < 2 && !this.multiple) {
          return <p class="select-v2-value">{this.selectActiveLabels[0]}</p>
        }
        const valueItem = this.selectActiveLabels.map((item,index)=>{
          const click = (e)=>{
            SelectStore.removeActiveValue(this.name, this.selectActiveValue[index])
            e.preventDefault();
            e.stopPropagation();
          }

          return <span class="select-v2-tag" onClick={click}>
            <span>{item}</span>
            <rt-system-icons class="select-v2-tag__remove" name="close small"></rt-system-icons>
          </span>
        })
        return <p class="select-v2-value d-flex">{valueItem}</p>
      }
    }
  },
  render(h) {
    return <div class={this.selectClasses} ref="select">
      <div class="select-v2__container">
        <button type="button" disabled={this.disabled} class="select-v2__inner" onClick={this.toggleOpen}>
          {this.renderValue}
          {this.renderLabel}
          {this.$slots.default}
          {this.renderSelectLine}

          <rt-system-icons class="select-v2-arrow" name="chevron down"></rt-system-icons>

        </button>
        {this.renderSelectList}
      </div>
    </div>
  }
};
</script>
