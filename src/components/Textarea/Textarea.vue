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
                default: null
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
            }
        },
        data: () => ({
            inputText: "",
            hasInputText: false
        }),
        computed: {
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
            localValue(val) {
                this.$emit("change", val);
            },
            value(val,a){
              if(val != this.localValue){
                this.localValue = val;
                setTimeout(()=>{
                  this.calculateHeight()
	                this.setValueLength()
                },0)
              }
            }
        },
        mounted: function () {
            this.localValue = this.value;
            this.setValueLength();
            this.setDisabled();
            if(this.localValue?.length > 0){
              this.calculateHeight()
            }
        },
        methods: {

            setDisabled() {
                this.$el.querySelector(".textarea-element").disabled = Boolean(
                    this.disabled
                );
            },
            setValueLength() {
                this.hasInputText = this.localValue ? this.localValue.length > 0 : false;
            },
            inputHandler() {
                this.localValue = this.$el.querySelector(".textarea-element").value;
                this.setValueLength();
            },
            calculateHeight() {
                const textarea = this.$el.querySelector(".textarea-element");
                textarea.style.height = "";
                textarea.style.height = textarea.scrollHeight + 'px';
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

                              onChange={this.inputHandler}
                              onKeyup={this.calculateHeight}
                              onInput={this.calculateHeight}
                              id={this.fieldId}
                    >{this.value}</textarea>
                {renderLine()}
                {renderPlaceholder()}
                <p class="text-field__error-message">
                    {this.errorMessage}
                </p>
            </div>
        }
    };
</script>
