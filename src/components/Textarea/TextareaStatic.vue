<script type="text/jsx">
    export default {
        name: "RtTextareaStatic",
        props: {
            disabled: {
                type: Boolean,
                default: false
            },
            label: {
                type: String,
                default: null
            },
            hasError: {
                type: Boolean,
                default: false
            },
            errorMessage: {
                type: String,
                default: null
            },
            value: {
                type: String,
                default: null
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
            teatareaClasses(){
                let classes = ['text-field','textarea textarea--static'];
                if (this.hasInputText) {
                    classes.push("textarea--not-empty");
                }
                if (this.disabled) {
                    classes.push("textarea--disabled");
                }
                if (this.hasError) {
                    classes.push("text-field--error");
                }
                return classes.join(' ')
            }
        },
        watch: {
            localValue(val) {
                this.$emit("change", val);
            }
        },
        mounted: function () {
            this.localValue = this.value;
            this.setValueLength();
            this.setDisabled();
        },
        methods: {
            setDisabled() {
                if (this.$refs.textarea) {
                    this.$refs.textarea.disabled = Boolean(
                        this.disabled
                    );
                }
            },
            setValueLength() {
                this.hasInputText = this.localValue ? this.localValue.length > 0 : false;
            },
            inputHandler($event) {
                this.localValue = this.$refs.textarea.value;
                this.setValueLength();
            },
            clearInput() {
                this.$refs.textarea.value = ''
                this.inputHandler();
            }
        },
        render(h) {

            const label = (() => {
                if (this.label) {
                    return <div class="textarea-label">{this.label}</div>;
                } else {
                    return null;
                }
            })();
            return <div class={this.teatareaClasses}>
                {label}
                <textarea class="textarea-element" ref="textarea" onInput={this.inputHandler}
                          id={this.fieldId}>{this.value}</textarea>
                <div class="textarea-border"/>
                <p class="text-field__error-message">{this.errorMessage}</p>
            </div>;
        }
    };
</script>
