<script type="text/jsx">
    import variables from '../../variables.json';
    import {getColorsCustomProps, getColorClassByProps} from "../../mixins/colorTextClassMixin.ts";
    import {getFillClassByProps, fillColorProps} from "../../mixins/fillTextClassMixin.ts";

    const componentProps = {

        colorIcon: { /** @deprecated */
            type: String,
            default: "orange"
        },

        isWhiteColor: {
            type: Boolean,
            default: false
        },
        customType: {
            type: Boolean,
            default: false
        },
        hideArrow: {
            type: Boolean,
            default: false
        }
    };


    export default {
        name: "RtColorLineText",
        props: {...componentProps,...getColorsCustomProps(true), ...fillColorProps},
        data: () => ({
            isMobile: false,
            isTablet: false,
            isSafari: /constructor/i.test(window.HTMLElement) || (function (p) {
                return p.toString() === "[object SafariRemoteNotification]";
            })(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification))
        }),

        mounted() {
            const adjust = () => {
                setTimeout(() => {
                    this.isMobile = window.innerWidth <= parseInt(variables['mobile-upper-limit']);
                    this.isTablet = window.innerWidth <= parseInt(variables['tablet-upper-limit']) && window.innerWidth >= parseInt(variables['tablet-lower-limit']);
                }, 0);
            };
            window.addEventListener('resize', () => {
                adjust()
            });
            adjust();

        },
        computed: {
            colorLineIconClass() {
                let className = ["color-line-paragraph-icon",  ...(getFillClassByProps.bind(this)({fillColor: 'colorIcon'}))];


                if (this.customType) {
                    className.push(" color-line-wrapper--custom");
                }
                return className.join(' ');
            },
            labelClass() {
                let className = ["color-line-text", ...getColorClassByProps.bind(this)(true).label];

                this.isMobile = window.innerWidth <= parseInt(variables['mobile-upper-limit']);
                if (this.fillColor) {
                    className.push("color-line-text--" + this.fillColor);
                }
                if (this.isWhiteColor) {
                    className.push("color-white");
                }
                return className.join(' ');
            },
            contentClass() {

                let className = ['color-line-text', 'rt-font-paragraph', ...getColorClassByProps.bind(this)(true).content];
                this.isMobile = window.innerWidth <= parseInt(variables['mobile-upper-limit']);
                if (this.fillColor) {
                    className.push("color-line-text--" + this.fillColor);
                }
                if (this.isWhiteColor) {
                    className.push("color-white");
                }
                return className.join(' ');
            },
            topPartTransform() {
                if(this.isMobile) {
                    return null;
                } else if(this.isTablet) {
                    return this.isSafari ? "translate(-.95, -.25)" : "translate(-.25, -.75)";
                } else {
                    return this.isSafari ? "translate(.75, -.25)" : "translate(.25, -.75)";
                }

            },
            bottomPartTransform() {
                if(this.isMobile) {
                    return null;
                } else if(this.isTablet) {
                    return this.isSafari ? "translate(-.95, 1.25)" : "translate(0, 1)";
                } else {
                    return this.isSafari ? "translate(.75, 1)" : "translate(0, 1)";
                }
            },
        },
        render(h) {

            const icon = () => {
                if (this.hideArrow) {
                    return null
                }
                return <svg
                    class={this.colorLineIconClass}
                    width="38"
                    height="23"
                    viewBox="0 0 38 23"
                >
                    <path
                        class="color-line-paragraph-icon__background"
                        d="M33-1.0172375h-45V.04327594l43.7946512.04908113v7.93806336l1.4849033-.08350525c2.6481474-.14892161 4.7192255-2.33971054 4.7192629-4.99204202L38-0.0172375c.0000389-2.7614238-2.2385058-5.0000315-4.9999296-5.0000704H33z"
                        transform={this.topPartTransform}
                    />
                    <path
                        d="M33.5561211 0H0l22.4131224 22.4131038L36.5337472 6.67090677c1.4751011-1.64449747 1.3377782-4.17343176-.3067193-5.64853284C35.4931384.36408091 34.5419931 0 33.5561211 0z"
                        transform={this.bottomPartTransform}
                    />
                </svg>;
            };

            const label = () => {
                if (this.$slots.content && !this.isMobile) {
                    return <p class="rt-font-banner-label color-line color-line-label">
        <span class={this.labelClass}
        >{this.$slots.label}</span>
                    </p>;
                } else {
                    return <p class="rt-font-banner-label color-line">
        <span class={this.labelClass}
        >{this.$slots.label} {icon()}</span>
                    </p>;
                }
            };

            const content = () => {

                if (!this.isMobile) {
                    if (this.$slots.content) {
                        return <p class="color-line color-line--is-paragraph rt-space-bottom">
          <span
              class={this.contentClass}>{this.$slots.content}{icon()}</span>
                        </p>;
                    } else {
                        return null;
                    }
                } else {
                    if (this.$slots.content) {
                        return <p class="color-line color-line--is-paragraph rt-space-bottom"> <span
                            class={this.contentClass}>{this.$slots.content}</span>
                        </p>
                    } else {
                        return null;
                    }
                }
            };
            return <div class="color-line-wrapper">
                {label()}
                {content()}
            </div>;
        }
    };
</script>
