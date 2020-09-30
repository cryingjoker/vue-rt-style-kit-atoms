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
      this.selectOptions = [...SelectStore.getSelectorOptions(this.name)];
    },
    getActiveValue() {
      this.selectActiveValue = [...SelectStore.getActiveValue(this.name)];
      this.selectActiveLabels = [...SelectStore.getActiveLabels(this.name)];
      this.activeIndex = SelectStore.getActiveIndex(this.name)
      this.focusIndex = SelectStore.getFocusIndex(this.name)
    },
    getSelectType() {
      this.selectorType = SelectStore.getSelectorType(this.name, this.type);
    },
    getSelectOpenStatus() {
      this.selectOpenStatus = SelectStore.getOpenStatus(this.name);
    },
    setVerticalOrientation(){
      if(window.innerHeight + window.screenTop - this.$el.getBoundingClientRect().top < 200){
        if(this.$el.getBoundingClientRect().top < 200){
          this.verticalOrientation = 'bottom'
        }else {
          this.verticalOrientation = 'top'
        }
      }else{
        this.verticalOrientation = 'bottom'
      }
    },
    toggleOpen() {
      if(!this.disabled) {
        if(!this.selectOpenStatus) {
          SelectStore.setOpen(this.name)
          this.setVerticalOrientation()
        }else{
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
    if (Object.keys(this.json).length > 0) {
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
    json(newVal, oldVal) {
      if (JSON.stringify(newVal) != JSON.stringify(oldVal)) {
        SelectStore.addJson(this.name, this.json)
      }
    },
    selectActiveValue(newVal, oldVal) {
      if (JSON.stringify(newVal) != JSON.stringify(oldVal)) {
        this.$emit('change', newVal)
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
    renderSelectLine() {
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
      if (!this.selectOpenStatus) {
        return null
      }
      return this.selectOptions.map((item, index) => {
        const isActive = this.activeIndex[index] > 0;
        const isFocus = index == this.focusIndex;
        return <rt-select-v2-virtual-option ref={'select-item-' + index} select-name={this.name} is-active={isActive}
                                            value={item.value}
                                            sublabel={item.sublabel}
                                            is-focus={isFocus}
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
      let selectClasses = [];
      if (this.v2) {
        selectClasses.push('rt-select-v2')
      } else {
        selectClasses.push('rt-select', 'select', 'text-field')
        if (this.hasError) {
          selectClasses.push("select--error text-field--error");
        }
        if (this.selectOpenStatus) {
          selectClasses.push("select--is-open");
          if(this.verticalOrientation == 'top'){
            selectClasses.push("select--invert-open-list");
          }
        }
      }

      // if (this.resetWrapperWidth) {
      //   selectClasses.push("select--is-reset-width");
      // }
      if (this.disabled) {
        selectClasses.push("select--disabled");
      }
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
    renderValue() {
      if (this.autoComplete) {
        //todo доделать автокомплит
        <rt-input value={"this.selectActiveLabels.join(', ')"}></rt-input>
      } else {
        return <p class="select-input">{this.selectActiveLabels.join(', ')}</p>
      }
    }
  },
  render(h) {
    if(this.v2){
      return <div class={this.selectClasses} ref="select">
        {this.$slots.default}
        new select
      </div>
    }

    return <div class={this.selectClasses} ref="select">
      <div class="select__inner">
        <div class="select-inner-container">
          <button type="button" disabled={this.disabled} class="select__inner" onClick={this.toggleOpen}>
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
