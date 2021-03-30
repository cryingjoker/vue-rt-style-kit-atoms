<script type="text/jsx">
export default {
  name: "RtTextareaV2",
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: null
    },
    hasError: {
      type: Boolean,
      default: false
    },
    errorMessage: {
      type: String,
      default: ""
    },
    value: {
      type: String,
      default: ''
    },
    fieldId: {
      type: String,
      default: ''
    },
    resize: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: ''
    },
    maxSize: {
      type: [String,Number],
      default: 0
    },
    stopOnOversize:{
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      localValue: "",
      inputText: "",
      hasInputText: false,
    }
  },
  created() {
    this.localValue = this.value
  },
  computed: {
    renderError(){
      if(this.errorMessage.length > 0 && this.hasError){
        return <p class="rt-textarea-v2__error rt-font-label">{this.errorMessage}</p>
      }
      return null
    },
    sizeRender(){
      if(this.maxSize && parseInt(this.maxSize) > 0){
        const sizeClasslist = ['rt-textarea-v2__size','rt-font-label'];
        if(this.localValue.length > this.maxSize){
          sizeClasslist.push('rt-textarea-v2__size--error')
        }
        if(this.disabled){
          sizeClasslist.push('rt-textarea-v2__size--disabled')
        }
        return <div class={sizeClasslist.join(' ')}>{this.localValue.length}/{parseInt(this.maxSize)}</div>
      }
      return null
    },
    textareaLabelClassname() {
      const textareaTagClassname = ['rt-textarea-v2__label', 'rt-font'];
      if (this.localValue.length > 0) {
        textareaTagClassname.push('rt-textarea-v2__label--small')
        if (this.hasError) {
          textareaTagClassname.push('rt-textarea-v2__label--error')
        }
      }

      return textareaTagClassname.join(' ')

    },
    textareaTagClassname() {
      const textareaTagClassname = ['rt-font', 'rt-textarea-v2__tag']
      if (this.resize) {
        textareaTagClassname.push('rt-textarea-v2__tag--resize')
      }

      return textareaTagClassname.join(' ')
    },
    textareaClassname() {
      const textareaClassname = ['rt-textarea-v2']
      if (this.hasError) {
        textareaClassname.push('rt-textarea-v2--error')
      }
      if (this.disabled) {
        textareaClassname.push('rt-textarea-v2--disabled')
      }
      return textareaClassname.join(' ')
    },
  },
  watch: {
    value(newVal, oldVal) {
      if (newVal != oldVal && newVal != this.localValue) {
        this.localValue = newVal
        this.$nextTick(() => {
          if (this.$refs.textarea.value != this.localValue) {
            this.$refs.textarea.value = this.localValue
          }
        })
      }
    },
    localValue(newVal, oldVal) {
      if (oldVal != newVal && newVal != this.value) {
        if(this.stopOnOversize && this.maxSize > 0) {
          if(this.maxSize >= newVal.length){
            this.$emit('input', newVal)
          }else{
            this.localValue = newVal.substring(0,this.maxSize)
            this.$refs.textarea.value = this.localValue;

          }
        }else{
          this.$emit('input', newVal)
        }
      }
    }
  },
  mounted: function () {

  },
  methods: {
    setInTextarea() {
      this.$refs.textarea.innerHTML = this.localValue;
    },
    onInput() {
      this.localValue = this.$refs.textarea.value
    }
  },
  render(h) {
    return <div class={this.textareaClassname}>
      <textarea disabled={this.disabled} class={this.textareaTagClassname} ref="textarea"
                onInput={this.onInput}></textarea>
      <p class={this.textareaLabelClassname}>{this.label || this.placeholder}</p>
      <div class="rt-textarea-v2__line"></div>
      <div class="rt-textarea-v2-footer">
      {this.sizeRender}
      {this.renderError}
      </div>


    </div>
  }
};
</script>
