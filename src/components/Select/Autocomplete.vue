<script type="text/jsx">
import {SelectStore} from './SelectStore.js'
import SelectV2VirtualOption from './SelectV2VirtualOption.vue'

const components = {};
components[SelectV2VirtualOption.name] = SelectV2VirtualOption
export default {
  name: "RtAutocomplete",
  components: components,
  props: {
    json: {
      type: String | Array,
      default: () => {
        return []
      }
    },
    defaultValue: {
      type: String | Array,
      default: ''
    },
    type: {
      type: String,
      default: 'autocomplete'
    },
    hasError: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    value: {
      type: Array | String,
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
    staticName: {
      type: String,
      default: ''
    },
    setFirstActive: {
      type: Boolean,
      default: false
    },
    hasContentText: {
      type: Boolean,
      default: false
    },
    bright: {
      type: Boolean,
      default: false
    },
    joinValue: {
      type: Boolean,
      default: false
    },
    sep: {
      type: String,
      default: ', '
    },
    focusOnSelect: {
      type: Boolean,
      default: true
    }
  },
  data: () => ({
    selectOptions: [],
    selectActiveValue: [],
    selectActiveLabels: [],
    selectOpenStatus: false,
    focusIndex: -1,
    activeIndex: 0,
    verticalOrientation: 'bottom',
    bottomEdge: null,
    isTagOutside: false,
    lastInside: null,
    inputLocalValue: '',
    shadowUp: false,
    shadowDown: true,
    tempIndex: null,
    isFocus: false,
    mouseenter: false,
    stopOpenAuto: false,
    clickValue: ''
  }),
  watch: {
    defaultValue (newVal, oldVal) {
      if (JSON.stringify(newVal) !== JSON.stringify(oldVal)) {
        this.setDefaultValue()
      }
    },
    clickValue:{
      deep: true,
      handler(newVal, oldVal){
        const a = newVal ? JSON.stringify(newVal) : '';
        const b = oldVal ? JSON.stringify(oldVal) : ''
        if(a != b){
          this.inputLocalValue = newVal.label
          SelectStore.setActiveValue(this.name, newVal)
          this.$emit('input', newVal.label)
          this.$nextTick(() => {
            this.selectActiveLabels[0] = newVal.label
          })
          this.$emit('item-select', newVal)
        }
      }
    },
    value: {
      deep: true,
      handler(newVal, oldVal) {
        if (JSON.stringify(newVal) != JSON.stringify(oldVal)) {
          this.getSelectType();
          this.getSelectOptions()
          this.setActiveValue();
          if (this.$refs.input) {
            if(newVal == '') {
              this.inputLocalValue = '';
              this.$nextTick(() => {
                SelectStore.setClose(this.name)
              })
            }
            if(this.focusOnSelect) {
              this.$refs.input.$el.querySelector('input').focus()
            }
          }
        }
      }
    },
    json: {
      deep: true,
      handler(newVal, oldVal) {
        let a = newVal
        let b = oldVal
        if(typeof a != 'string'){
          a = JSON.stringify(a)
        }
        if(typeof b != 'string'){
          b = JSON.stringify(b)
        }
        if (a != b) {
          if(typeof a == 'string'){
            a = JSON.parse(a)
          }
          SelectStore.addJson(this.name, a)
          this.getSelectType();
          this.getSelectOptions()
          if(this.focusOnSelect) {
            this.$refs.input.$el.querySelector('input').focus()
          }
          this.onInputAutoField();
        }
      }
    },
    selectOpenStatus(newVal, oldVal) {
      if (newVal && !oldVal) {
        this.mouseenterFn();
        this.bindClickOutside()
        this.bindKeydown()
      } else {
        if (!newVal && oldVal) {
          this.unbindClickOutside()
          this.unbindKeydown();
        }
      }
    }
  },
  computed: {
    renderSelectList() {
      const renderShadowUp = () => {
        if (this.selectOptions?.length > 6 && this.shadowUp) {
          return <div class="select-v2-list-shadow-up"></div>
        }
        return null
      }
      const renderShadowDown = () => {
        if (this.selectOptions?.length > 6 && this.shadowDown) {
          return <div class="select-v2-list-shadow-down"></div>
        }
        return null
      }
      return <div class="select-v2-list">
        <div class="select-v2-list-inner" ref="inner" onScroll={this.noteScroll}>
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
        const presetActiveIndex = () => {
          this.tempIndex = index
        }
        const resetActiveIndex = () => {
          if (this.focusIndex == index) {
            SelectStore.setFocusIndex(this.name, -1);
          }
        }
        const setActiveIndex = () => {
          SelectStore.setFocusIndex(this.name, this.tempIndex)
        }
        const isActive = this.activeIndex[index] > 0;
        const isFocus = index == this.focusIndex;
        return <rt-select-v2-virtual-option ref={'select-item-' + index}
                                            select-name={this.name}
                                            input-value={this.inputLocalValue}
                                            is-active={isActive}
                                            value={item.value}
                                            multiple={this.multiple}
                                            sublabel={item.sublabel}
                                            is-focus={isFocus}
                                            label={item.label}
                                            onMouseenter={presetActiveIndex}
                                            onMouseleave={resetActiveIndex}
                                            onMousemove={setActiveIndex}/>
      })
    },
    renderLabel() {
      const classList = [];
      classList.push('select-v2-label')
      if (this.selectActiveValue && this.selectActiveValue[0]?.toString().length > 0) {
        classList.push('select-v2-label--up')
      }
      return <label ref="placeholder" class={classList.join(' ')}>{this.label}</label>
    },
    selectClasses() {
      let selectClasses = [];
      selectClasses.push('select-v2')
      if (this.hasError) {
        selectClasses.push("select-v2--error text-field--error");
      }
      if (this.selectOpenStatus) {
        selectClasses.push("select-v2--is-open");
        if (this.verticalOrientation == 'top') {
          selectClasses.push("select-v2--invert-open-list");
        }
      }
      if (this.hasContentText) {
        selectClasses.push("rt-select--has-content")
      }
      if (this.disabled) {
        selectClasses.push("select-v2--disabled");
      }
      if (this.multiple) {
        selectClasses.push("select-v2--multiline");
      }
      if (this.bright) {
        selectClasses.push('select-v2--bright')
      }
      return selectClasses.join(' ');
    }
  },
  mounted() {
    let json = this.getJson();

    if (Object.keys(json)?.length > 0) {
      SelectStore.addJson(this.name, json)
    }
    this.setDefaultValue()
    SelectStore.setSelectorType(this.name, this.type);
    SelectStore.addWatcher(this.name, this.getSelectOptions)
    SelectStore.addWatcher(this.name, this.getActiveValue)
    SelectStore.addWatcher(this.name, this.getSelectType)
    SelectStore.addWatcher(this.name, this.getSelectOpenStatus)
    SelectStore.addWatcher(this.name, this.getSelectorsClickValue)
    this.setActiveValue();
    this.getSelectType();
    this.getSelectOptions()
    this.getActiveValue();
  },
  updated() {
    this.fixValueList();
  },
  beforeDestroy() {
    SelectStore.removeWatcher(this.name)
    SelectStore.clear(this.name)
  },
  methods: {
    getJson(){
      let json = this.json;
      if(typeof json == 'string'){
        json = JSON.parse(json)
      }
      return json
    },
    getSelectorsClickValue(){
      this.clickValue = SelectStore.getSelectorsClickValue(this.name)
    },
    onInputAutoField() {
      if (this.isFocus || this.mouseenter) {
        if (this.selectActiveLabels[0]?.toLowerCase() != this.$refs.input?.localValue?.toLowerCase() && this.selectOptions?.length > 0 && SelectStore.getInputText(this.name)?.length) {
          SelectStore.setOpen(this.name)
        } else {
          SelectStore.setClose(this.name)
        }
      }
    },
    onChange() {
      this.$emit('change', ...arguments)
    },
    setActiveValue() {
      if (this.setFirstActive) {
        if (this.getJson()[0]?.value) {
          SelectStore.setActiveValue(this.name, this.getJson()[0]?.value);
        } else {
          SelectStore.setActiveValue(this.name, this.$children[0].value);
        }
      }
      if (this.value) {
        SelectStore.setActiveValue(this.name, this.value)
      }
    },
    setDefaultValue() {
      if (this.defaultValue.length > 0 && this.inputLocalValue.length == 0) {
        this.inputLocalValue = Array.isArray(this.defaultValue) ? this.defaultValue[0] : this.defaultValue;
      }
    },
    getSelectOptions() {
      const selectorOptions = SelectStore.getSelectorOptions(this.name);
      if (selectorOptions) {
        this.selectOptions = [...selectorOptions];
      }
    },
    getActiveValue() {
      let selectActiveLabels = SelectStore.getActiveLabels(this.name)
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
        SelectStore.setPreviousFocus(this.name)
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
        if (this.autoComplete) {
          SelectStore.setClose(this.name)
        }
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
        this.stopOpenAuto = true
        setTimeout(() => {
          this.stopOpenAuto = false
        }, 1000)
      }
    },
    fixValueList() {
      this.bottomEdge = this.$refs.valueWrapper?.getBoundingClientRect().bottom;
      let valuesList = this.$el.querySelectorAll('.select-v2-tag');
      let fullLength = valuesList.length;
      Array.from(valuesList).map((item, index) => {
        if (item.getBoundingClientRect().top >= this.bottomEdge) {
          this.isTagOutside = true;
        } else {
          this.isTagOutside = false;
          if (!this.$el.querySelector('.select-v2-tag__outside-count')) {
            this.lastInside = index;
          }
        }
      })
      this.$el.querySelector('.select-v2-tag__outside-count')?.remove()
      if (this.isTagOutside && this.lastInside && !this.$el.querySelector('.select-v2-tag__outside-count') && (fullLength - this.lastInside > 1)) {
        let overflowTag = '<span class="select-v2-tag__outside-count rt-font-label">показать ещё ' + (fullLength - this.lastInside) + '</span>';
        this.$el.querySelectorAll('.select-v2-tag')[this.lastInside - 1].insertAdjacentHTML('afterend', overflowTag);
        this.$el.querySelector('.select-v2-tag__outside-count').addEventListener('click', ($event) => {
          $event.preventDefault();
          $event.stopPropagation();
          this.toggleOpen();
        })
      }
    },
    checkMatch(e) {
      SelectStore.setInputText(this.name, e)
      this.selectActiveLabels[0] = ''
      this.inputLocalValue = e;
      this.$emit('input', e);
      SelectStore.removeAllActiveValue(this.selectName)
    },
    clearValue(e) {
      SelectStore.setActiveValue(this.name, '')
      SelectStore.removeAllActiveValue(this.selectName)
      this.checkMatch('');
      this.$emit('clear');
    },
    noteScroll() {
      this.shadowUp = this.$refs.inner.scrollTop != 0
      this.shadowDown = this.$refs.inner.scrollTop != this.$refs.inner.scrollHeight - this.$refs.inner.offsetHeight
    },
    onFocus(e) {
      this.isFocus = true
      this.$emit('focus', e)
    },
    onBlur(e) {
      this.$emit('blur', e)
    },
    onBlurAuto(val, event) {
      this.isFocus = false
      setTimeout(() => {
        if (!this.isFocus && (!this.mouseenter || !this.selectOpenStatus)) {
          this.$emit('blur', val, event)
        }
      }, 300)
    },
    onKeydown(e) {
      this.$emit('keydown', e)
    },
    onKeyup(e) {
      this.$emit('keyup', e)
    }
  },
  render(h) {
    return <div class={this.selectClasses} ref="select" onMouseenter={this.mouseenterFn}
                onMouseleave={this.mouseleaveFn}>
      <div class="select-v2__container">
        <rt-input version={2}
                  name={this.staticName || this.name}
                  disabled={this.disabled}
                  placeholder={this.placeholder || this.label}
                  label={this.placeholder && this.label ?  this.label : ''}
                  ref="input"
                  value={this.selectActiveLabels[0] || this.inputLocalValue}
                  onCustom={this.checkMatch}
                  onClear={this.clearValue}
                  onChange={this.onChange}
                  onInput={this.onInputAutoField}
                  hasError={this.hasError}
                  errorMessage={this.errorMessage}
                  onFocus={this.onFocus}
                  onBlur={this.onBlurAuto}
                  onKeydown={this.onKeydown}
                  onKeyup={this.onKeyup}/>
        {this.renderSelectList}
      </div>
    </div>
  }
};
</script>
