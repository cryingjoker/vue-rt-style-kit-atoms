<script type="text/jsx">
    export default {
        name: "RtTextarea",
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
            isB2bTextarea: {
                type: Boolean,
                default: false
            },
            outlined: {
                type: Boolean,
                default: false
            },
            color: {
                type: String,
                default: "purple"
            },
            fieldId: {
                type: String,
                default: ''
            },
            autoResize: {
                type: Boolean,
                default: true
            }
        },
        data () {
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
        roundStyle() {
          return {strokeDashoffset: 45 - 45 * this.step / 100}
        },
            textareaClasses() {
                const classes = ['text-field', 'textarea'];
                if (this.disabled) {
                    classes.push("textarea--disabled")
                }
                if (this.hasInputText) {
                    classes.push("textarea--not-empty")
                }
                if (this.hasError) {
                    classes.push("text-field--error")
                }
                if (this.isB2bTextarea) {
                    classes.push("rtb-textarea")
                }
                if (this.outlined) {
                    classes.push("rtb-textarea--outlined")
                }
                if (this.color === "orange") {
                    classes.push("text-field--orange")
                }
                if (this.color === "purple") {
                    classes.push("text-field--purple")
                }
                // console.info('this.autoResize',this.autoResize);
                if(this.autoResize) {
                  classes.push('text-field--autoresized')
                }else{
                  classes.push('text-field--scrollable')
                }
                return classes.join(' ')
            },
            placeholderClasses() {
                const classes = ['floating-placeholder']
                if (this.hasInputText) {
                    classes.push("floating-placeholder--go-top");
                }
                return classes.join(' ')

            }
        },
        watch: {
            localValue(newVal,oldVal) {
              if(newVal != oldVal) {
                this.$emit("input", newVal);
                setTimeout(() => {
                  this.setValueLength();
                  this.calculateHeight();
                }, 0);
              }
            },
            value(newVal,oldVal){
              if(newVal != oldVal) {
                if (newVal != oldVal) {
                  this.localValue = newVal;
                }
              }
            }
        },
        mounted: function () {
            this.localValue = this.value;
            this.setValueLength();
            this.setDisabled();
        },
        methods: {
            setDisabled() {
                this.$refs.textarea.disabled = Boolean(
                    this.disabled
                );
            },
            setValueLength() {
                this.hasInputText = this.localValue ? this.localValue.length > 0 : false;
            },
            inputHandler() {
                this.localValue = this.$refs.textarea.value;
                this.setValueLength();
            },
            calculateHeight() {
                if (this.autoResize) {
                    const textarea = this.$refs.textarea;

                    textarea.style.height = 'auto';
                    if(this?.localValue?.length > 0) {
                      textarea.style.height = textarea.scrollHeight + 'px'
                    }else{
                      textarea.style.height = 'auto'
                    }
                }else{
                  textarea.style.height = 'auto'
                }
            },
            clearInput() {
              this.$refs.textarea.value = ''
              this.inputHandler()
            }
        },
        render(h) {
            const renderLine = () => {
                if (this.outlined) {
                    return <div class="text-field__border"></div>

                } else {
                    return <div class="text-field__line"></div>
                }
            }
            const renderPlaceholder = () => {
                if (this.placeholder && this.placeholder.length > 0) {
                    return <div class={this.placeholderClasses}>
                        {this.placeholder}
                    </div>
                }
                return null
            }
            return <div class={this.textareaClasses}>
                    <textarea class="textarea-element" rows="1"
                              ref="textarea"

                              onInput={this.inputHandler}
                              id={this.fieldId}
                    >{this.localValue}</textarea>
                {renderLine()}
                {renderPlaceholder()}
                <p class="text-field__error-message">
                    {this.errorMessage}
                </p>
            </div>
        }
    };
</script>
