<script type="text/jsx">
    import {default as Spinner} from "../Spinner/Spinner.vue";
    import {default as RippleComponent} from "../Ripple/Ripple.vue";
    import {buttonsStore} from "./ButtonStore.tsx"

    const componentsList = {};
    componentsList[RippleComponent.name] = RippleComponent;
    componentsList[Spinner.name] = Spinner;

    export default {
        name: "RtButton",
        components: componentsList,
        props: {
            ga: {
                type: Object,
                default: null
            },
            gaB2b: {
                type: Object,
                default: null
            },
            isBlock: {
                type: Boolean,
                default: false
            },
            isDisabled: {
                type: Boolean,
                default: false
            },
            isFetched: {
                type: Boolean,
                default: false
            },
            hasIcon: {
                type: Boolean,
                default: false
            },
            checkboxBehavior: {
                type: Boolean,
                default: false
            },
            radioGroupName: {
                type: String,
                default: "radio-group"
            },
            buttonClassList: {
                type: String,
                default: ""
            },
            radioValue: {
                type: String,
                default: ""
            },
            showAsTag: {
                type: Boolean,
                default: false
            },
            color: {
                type: String,
                default: ''
            },
            popupButton: {
                type: Boolean,
                default: false
            },
            targetPopup: {
                type: String,
                default: ''
            },
            backgroundColor: {
                type: String,
                default: 'orange'
            },
            href: {
                type: String,
                default: ''
            },
            target: {
                type: String,
                default: '_blank'
            },
            activeClass: {
                type: String,
                default: ''
            },
            isActive: {
                type: Boolean,
                default: false
            },
            notActiveClass: {
                type: String,
                default: ''
            }
        },
        data: () => ({
            hide: false,
            isActiveLocal: false
        }),
        computed: {
            buttonClass() {
                let className = ["rt-button rt-button-with-ripple"];
                if (this.isBlock) {
                    className.push("rt-button--is-block");
                }
                if (this.isFetched) {
                    className.push("rt-button--is-fitched")
                }
                if (this.showAsTag) {
                    className.push("rt-button--as-tag")
                }
                if (this.color && this.color.length > 0) {
                    className.push('rt-button-' + this.color)
                }
                if (this.activeClass.length > 0 && this.isActiveLocal) {
                    className.push(this.activeClass)
                }
                if (this.notActiveClass.length > 0 && !this.isActiveLocal) {
                    className.push(this.notActiveClass)
                }
                className = className.concat(this.buttonClassList.split(' '));

                return className.join(' ');
            }
        },

        mounted: function () {
            this.isActiveLocal = this.isActive;
            this.hide = this.$el.disabled || this.isDisabled;
            if (this.ga) {
                this.activateEventToLink('b2c', this.ga);
            }
            if (this.gaB2b) {
                this.activateEventToLink('b2b', this.gaB2b);
            }
            if (this.checkboxBehavior) {
                buttonsStore.init(this._uid, this.radioGroupName, {isActiveLocal: this.isActiveLocal}).then(() => {
                    buttonsStore.addWatcher(this._uid, this.getStatusActive.bind(this), this.clearStatusActive.bind(this))
                })
            }

        },
        methods: {
            clearStatusActive() {
                this.isActiveLocal = false;
                buttonsStore.changeStatus(this._uid, {isActiveLocal: this.isActiveLocal}, true)
            },
            getStatusActive() {
                this.isActiveLocal = buttonsStore.getStatus(this._uid);
            },
            triggerClick($event) {
                if (this.popupButton && this.targetPopup) {
                    let target = [this.$el, this.targetPopup];
                    document.querySelector('body').dispatchEvent(new CustomEvent("open-popup", {'detail': target}));
                    this.$emit("click", $event);
                } else {
                    this.$emit("click", $event);
                }
                if (this.checkboxBehavior) {
                    buttonsStore.changeStatus(this._uid, {isActiveLocal: true})
                }
            },
            activateEventToLink(typeEvent, ga) {

                if (this.$refs && this.$refs["button"]) {
                    const button = this.$refs["button"];
                    if (button.parentElement.tagName.toLocaleLowerCase() === "a") {
                        button.parentElement.addEventListener("click", (e) => {
                            if (!this.$el.getAttribute("data-ga-pushed")) {
                                // e.preventDefault();
                                if (!window.dataLayer) {
                                    window.dataLayer = [];
                                }
                                window.dataLayer.push({
                                    event: typeEvent,
                                    button: button.innerText
                                });
                            }
                        }, false);
                    } else {
                        button.addEventListener("click", (e) => {
                            if (!this.$el.getAttribute("data-ga-pushed")) {
                                if (!window.dataLayer) {
                                    window.dataLayer = [];
                                }
                                window.dataLayer.push({
                                    event: typeEvent,
                                    button: button.innerText
                                });

                            }
                        }, false);

                    }
                }
            }
        },
        render: function (h) {
            const buttonTextContent = (() => {
                return <span>{this.$slots["button-text"]}</span>;
            })();
            const icon = (() => {
                return <span class="rt-button__icon rt-space-right05">{this.$slots.icon}</span>;
            })();
            const spinner = (() => {
                if (this.isFetched) {
                    return <rt-spinner fill={true} isAbsolute={true}/>;
                } else {
                    return null;
                }
            })();
            const content = () => {
                if (this.checkboxBehavior) {
                    return (

                        <rt-ripple notRender={this.hide} twiceRender={true}>
                            {spinner}
                            {this.isActiveLocal ? this.$slots.active : this.$slots.not_active}
                        </rt-ripple>
                    );
                } else {
                    if (this.hasIcon) {
                        return (

                            <rt-ripple notRender={this.hide} twiceRender={true}>
                                {icon}
                                {spinner}
                                {buttonTextContent}
                            </rt-ripple>
                        );
                    } else {
                        return (
                            <rt-ripple notRender={this.hide} twiceRender={true} waitParentClicked={true}>
                                {spinner}
                                {this.$slots.default}
                            </rt-ripple>
                        );
                    }
                }
            }
            if(this.href.length > 0){
                return <a href={this.href} target={this.target} class={this.buttonClass} onClick={this.triggerClick}>
                    {content()}
                </a>
            }else {
                return <button class={this.buttonClass} onClick={this.triggerClick}>{content()} </button>
            }
        }
    };
</script>
