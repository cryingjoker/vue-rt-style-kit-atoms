<script type="text/jsx">
    export default {
        inject: ["RtSelect"],
        name: "RtSelectOption",
        props: {
            value: {
                type: String,
                default: null
            },
            selected: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                localValue: this.text ? this.text : "",
                isSelected: false
            };
        },
        computed: {
            selectedValue() {
                if (this.RtSelect) {
                    return this.RtSelect.selectedValue;
                } else {
                    return "";
                }
            },
            optionClasses() {
                const optionClasses = ['select-option'];
                if (this.RtSelect && this.RtSelect.hasMultiSelect) {
                    optionClasses.push("select-option--multi");
                } else {
                    if (this.isSelected) {
                        optionClasses.push('select-option--select');
                    }
                }

                return optionClasses.join(' ');
            }
        },

        watch: {
            selectedValue() {
                this.setIsSelected();
            }
        },
        mounted() {

            this.setValue();
            this.setIsSelected(() => {
                if (this.selected) {
                    this.RtSelect.setValue({text: this.text, value: this.value});
                }
            });

        },
        methods: {
            setIsSelected(callbackFn) {
                this.isSelected = this.selectedValue === this.text;
                if (callbackFn) {
                    setTimeout(() => {
                        callbackFn()
                    }, 0)
                }

            },
            setValue() {
                this.text = this.getTextContent();
            },
            setSelection(e) {
                this.RtSelect.setValue({text: this.text, value: this.value});
                if (this.$refs['multiSelectCheckboxInput']) {
                    this.$refs['multiSelectCheckboxInput'].checked = !this.$refs['multiSelectCheckboxInput'].checked;
                }
                if (e) {
                    e.preventDefault();
                }
            },
            getTextContent() {
                if (this.$el) {
                    return this.$el.textContent.trim();
                }
                const slot = this.$slots.default;
                return slot ? slot[0].text.trim() : "";
            }
        },
        render(h) {
            const hiddenCheckbox = (() => {

                if (this.RtSelect && this.RtSelect.hasMultiSelect) {
                    return <div class="select-option__checkbox" ref="multiSelectCheckbox">
                        <input type="checkbox" class="select-option__hidden-checkbox" ref="multiSelectCheckboxInput"/>
                        <div class="select-option__checkbox-angle">
                            <svg class="select-option__checkbox-angle-icon" width="12" height="10"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 5l3.448 3L11 2" stroke="#70F" stroke-width="3" fill="none"
                                      fill-rule="evenodd"/>
                            </svg>
                        </div>
                    </div>
                } else {
                    return null
                }
            })();

            return <div class={this.optionClasses}>

                <button class="select-option__inner" onClick={this.setSelection}>
                    {hiddenCheckbox}
                    {this.$slots.default}
                </button>
            </div>
        }
    };
</script>
