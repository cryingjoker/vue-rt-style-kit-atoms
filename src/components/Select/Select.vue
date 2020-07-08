<script type="text/jsx">
    export default {
        name: "RtSelect",
        props: {
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
            }
        },
        data() {
            return {
                localValue: this.text ? this.value : "",
                RtSelect: {
                    setValue: this.setValue,
                    selectedValue: this.text,
                    hasMultiSelect: this.multi
                },
                isOpen: false,
                selected: {},
                isOpenListOnTop: false,
                hasSelected: this.text ? true : false,
                focused: false,
                multiLocalValue: [],
                multiValue: ''
            };
        },
        computed: {
            selectClasses() {
                let selectClasses = ['select', 'text-field'];
                if (this.hasError) {
                    selectClasses.push("select--error text-field--error");
                }
                if (this.isOpen) {
                    selectClasses.push("select--is-open");
                }
                if (this.resetWrapperWidth) {
                    selectClasses.push("select--is-reset-width");
                }
                if (this.disabled) {
                    selectClasses.push("select--disabled");
                }
                if (this.isOpenListOnTop) {
                    selectClasses.push("select--invert-open-list");
                }
                if (this.isB2bSelect) {
                    selectClasses.push("rtb-select");
                }
                if (this.outlined) {
                    selectClasses.push("rtb-select--outlined");
                }
                if (this.multi) {
                    selectClasses.push("rtb-select--multi");
                }
                if(this.hasContentText) {
                    selectClasses.push("rt-select--has-content")
                }
                return selectClasses.join(' ');
            },
            placeholderClasses() {
                let placeholderClasses = ['floating-placeholder'];
                if (this.hasSelected && !(this.localValue === '' && this.multiLocalValue.length === 0)) {
                    placeholderClasses.push('floating-placeholder--go-top')
                }
                return placeholderClasses.join(' ');
            },
            selectListStyle() {
                if (this.dropdownMinWidth) {
                    let width = this.dropdownMinWidth;
                    if (typeof this.dropdownMinWidth === "number") {
                        width = width + "px";
                    }
                    return {
                        "min-width": width
                    };
                }
            },
            borderClass() {
                let borderClass = '';
                borderClass += this.outlined ? 'text-field__border' : 'text-field__line';
                borderClass += (this.outlined && this.hasError) ? ' text-field__border--error' : '';
                return borderClass;
            }
        },
        provide() {
            const RtSelect = this.RtSelect;
            return {RtSelect};
        },
        watch: {
            text(){
              this.localValue = this.text;
              this.RtSelect.selectedValue = this.text;
              if(this.text){
                this.hasSelected = true;
              }
            },
            localValue(val) {
                this.$emit("input", val);
            }
        },
        beforeDestroy() {
            this.removeBindEvents();
        },
        mounted() {
            this.setValue({text: this.text, value: this.value});
        },
        methods: {
            setValue(data) {
                const {value, text} = data;
                if (!this.multi) {
                    this.localValue = text;
                } else {
                    if (text !== null) {
                        if (!this.multiLocalValue.includes(text)) {
                            this.multiLocalValue.push(text)
                        } else {
                            this.multiLocalValue.splice(this.multiLocalValue.indexOf(text), 1)
                        }
                    }
                    this.multiValue = this.multiLocalValue.join(', ');
                }
                this.RtSelect.selectedValue = text;
                !this.multi ? this.emitSelected(this.localValue) : this.emitSelected(this.multiLocalValue);
                if (!this.multi) {
                    this.isOpen = false;
                    this.removeBindEvents();
                }
                this.$emit("select", data);
            },
            toggleOpen(e) {
                if (!this.disabled) {
                    this.isOpen = !this.isOpen;
                    if (this.autoComplete && this.isOpen) {
                        this.$refs.autoCompleteSelect.focus();
                    }
                    if (this.focused)
                        this.isOpen = true;
                    if (this.isOpen) {
                        this.scrollToSelected();
                        if (window.innerHeight - e.clientY < 200 && e.clientY > 200) {
                            this.isOpenListOnTop = true;
                        }
                        setTimeout(() => {
                            this.bindEvents();
                        });
                    } else {
                        this.removeBindEvents();
                    }
                }
                this.liftPlaceholder();
                e.preventDefault();
            },
            emitSelected(value) {
                this.$emit("rt-selected", value);
            },
            bindMouseEvents(e) {
                if (!e.target.closest(".select--is-open")) {
                    this.isOpen = false;
                    this.removeBindEvents();
                    if (!this.autoComplete)
                        this.liftPlaceholder();
                }
            },
            bindKeyboardEvents(e) {
                if (e.keyCode && e.keyCode === 27) {
                    this.isOpen = false;
                    this.removeBindEvents();
                } else {
                    if (e.keyCode === 38 || e.keyCode === 40) {
                        e.preventDefault();
                        e.stopPropagation();
                        let selectedItem = this.$el.querySelector(".select-option--select");
                        const focusedItem = this.$el.querySelector(".select-option__inner:focus");
                        const optionItems = this.$el.querySelectorAll(".select-option");
                        const optionItemsLength = optionItems.length;
                        if (focusedItem) {
                            selectedItem = focusedItem.parentNode;
                        }

                        let selectedIndex = selectedItem ? [...selectedItem.parentNode.children].indexOf(
                            selectedItem
                        ) : -1;
                        if (e.keyCode === 38) {
                            selectedIndex =
                                (selectedIndex - 1 + optionItemsLength) % optionItemsLength;
                        } else {
                            selectedIndex =
                                (selectedIndex + 1 + optionItemsLength) % optionItemsLength;
                        }
                        optionItems[selectedIndex].querySelector(".select-option__inner").focus();
                    }
                }
            },
            removeBindEvents() {
                document.removeEventListener("click", this.bindMouseEvents);
                document.removeEventListener("keydown", this.bindKeyboardEvents);
            },
            bindEvents() {
                document.addEventListener("click", this.bindMouseEvents, {
                    passive: false
                });
                document.addEventListener("keydown", this.bindKeyboardEvents, {
                    passive: false
                });
            },
            scrollToSelected() {
                const selectElement = this.$el.querySelector(".select-option--select");
                if (selectElement) {
                    const scrollPosition = selectElement.offsetTop - selectElement.parentNode.offsetTop;
                    selectElement.parentNode.scrollTop = scrollPosition;
                }
            },
            liftPlaceholder() {
                if(this.$refs['placeholder']) {
                    if (!this.$refs['placeholder'].classList.contains("floating-placeholder--go-top")) {
                        this.$refs['placeholder'].classList.add("floating-placeholder--go-top");
                    } else if (!this.focused) {
                        if (this.$refs.simpleSelect && !this.$refs.simpleSelect.innerText) {
                            this.$refs['placeholder'].classList.remove("floating-placeholder--go-top");
                        } else if (this.$refs.autoCompleteSelect && !this.$refs.autoCompleteSelect.value) {
                            this.$refs['placeholder'].classList.remove("floating-placeholder--go-top");
                        } else if (this.localValue === '' && this.multiLocalValue.length === 0) {
                            this.$refs['placeholder'].classList.remove("floating-placeholder--go-top");
                        }
                    }
                }
            },
            checkFill() {
                let inputValue = this.$el.children[0].childNodes[1].children[0].value;
                this.$children.forEach(el => {
                    if (!el.$el.innerText.toLowerCase().startsWith(inputValue.toLowerCase())) {
                        el.$el.classList.add('select-option--hidden');
                    } else {
                        el.$el.classList.remove('select-option--hidden');
                    }
                })
            },
            setFocus() {
                this.focused = true;
            },
            removeFocus() {
                this.focused = false;
                this.isOpen = false;
                this.$refs.autoCompleteSelect.blur();
                setTimeout(() => {
                    !this.localValue ? this.$refs['placeholder'].classList.remove("floating-placeholder--go-top") : null;
                }, 1);

            }
        },
        render(h) {
            const renderChilds = () => {
                if (!this.disabled) {
                    return <div style={this.selectListStyle} class="select-list">
                        {this.$slots.default}
                    </div>
                }
            };
            const errorMessage = (() => {
                if (!!this.hasError) {
                    return <p class="text-field__error-message">{this.errorMessage}</p>
                }
            })();

            const selectType = (() => {
                if (this.autoComplete) {
                    return <input class="select-input"
                                  value={this.localValue}
                                  onInput={this.checkFill}
                                  onFocus={this.setFocus}
                                  onBlur={this.removeFocus}
                                  ref="autoCompleteSelect"
                                  id={this.fieldId}/>
                } else if (this.multi) {
                    return <p class="select-input" ref="multiSelect" id={this.fieldId}>{this.multiValue}</p>
                } else {
                    return <p class="select-input" ref="simpleSelect" id={this.fieldId}>{this.localValue}</p>
                }
            })();
            const renderBorder = () => {
                if (this.hasContentText && this.$slots.content) {
                    return null
                }
                return <div class={this.borderClass}></div>
            }
            const renderContent = () => {
                if (!this.hasContentText || !this.$slots.content) {
                    return null
                }
                return <div class="rt-select-contents">
                    {this.$slots.content}
                </div>
            }
            const renderPlaceholder = () => {
                if (this.hasContentText && this.$slots.content) {
                    return null
                }
                return <label ref="placeholder" class={this.placeholderClasses}>{this.label}</label>
            }
            return <div class={this.selectClasses}>
                <div class="select-inner-container">
                    <button disabled={this.disabled} class="select__inner" onClick={this.toggleOpen}>
                        {renderPlaceholder()}
                        <div class="select-value">
                            {selectType}
                            {renderContent()}
                            <div class="select-arrow">
                                <svg class="select-arrow__icon" width="13" height="7">
                                    <path d="M.705 1.704l5.999 6 6-6L11.295.295h-.002l-4.59 4.58L2.115.294h-.002z"
                                          fill="#575D68" fill-rule="evenodd"/>
                                </svg>
                            </div>
                        </div>
                    </button>
                    {renderBorder()}
                    {renderChilds()}
                </div>
                {errorMessage}
            </div>

        }
    };
</script>
