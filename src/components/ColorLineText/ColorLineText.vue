<script type="text/jsx">
    import {getColorsCustomProps, getColorClassByProps} from "../../mixins/colorTextClassMixin.js";
    import {getFillClassByProps, fillColorProps} from "../../mixins/fillTextClassMixin.js";
    import {deviceTypeStore} from "../../stores/deviceTypeStoreMixin.js";

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
        },
        isAdvertise: {
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
        beforeUpdate(){
            deviceTypeStore.removeWatcher(this._uid,this.calculateMobileOptions);
        },
        updated(){
            deviceTypeStore.addWatcher(this._uid,this.calculateMobileOptions);
        },
        beforeDestroy(){
            deviceTypeStore.removeWatcher(this._uid,this.calculateMobileOptions);
        },
        mounted() {

            deviceTypeStore.addWatcher(this._uid,this.calculateMobileOptions);
            this.calculateMobileOptions();

        },
        methods:{
            calculateMobileOptions(){
                const type =  deviceTypeStore.getStatus();
                this.isMobile = type === 'mobile';
                this.isTablet = type === 'tablet';
            }
        },
        computed: {
            wrapperClass() {
                let className = 'color-line-wrapper';
                className += this.customType ? " color-line-wrapper--custom" : "";
                className += this.isAdvertise ? " color-line-wrapper--is-advertise" : "";

                return className;
            },
            colorLineIconClass() {
                let className = ["color-line-paragraph-icon",  ...(getFillClassByProps.bind(this)({fillColor: 'colorIcon'}))];

                return className.join(' ');
            },
            labelClass() {
                let className = ["color-line-text", ...getColorClassByProps.bind(this)(true).label];
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

                return <svg viewBox="0 0 39 23" class={this.colorLineIconClass}>
                    <g id="Page-1" fill-rule="evenodd">
                        <g id="001-bw" >
                            <path class="color-line-paragraph-icon__background" d="M33,-1.13686838e-13 L34.2595405,7.93519842 C36.9076879,7.78627681 38.2488174,3.85720464 38.2488174,1.20487316 L38.2488174,-1.13686838e-13 L33,-1.13686838e-13 Z" id="Path" fill="#FFFFFF" transform={this.topPartTransform}></path>
                            <path d="M33.5561211,0 L0,0 L22.4131224,22.4131038 L36.5337472,6.67090677 C38.0088483,5.0264093 37.8715254,2.49747501 36.2270279,1.02237393 C35.4931384,0.36408091 34.5419931,0 33.5561211,0 Z" id="Path"  transform={this.bottomPartTransform}></path>
                        </g>
                    </g>
                </svg>;
                return <svg class={this.colorLineIconClass}
                            width="38"
                            height="23"
                            viewBox="0 0 38 23">
                    <path class="color-line-paragraph-icon__background"
                        d="M33-1.0172375h-45V.04327594l43.7946512.04908113v7.93806336l1.4849033-.08350525c2.6481474-.14892161 4.7192255-2.33971054 4.7192629-4.99204202L38-0.0172375c.0000389-2.7614238-2.2385058-5.0000315-4.9999296-5.0000704H33z"
                        transform={this.topPartTransform}/>
                    <path d="M33.5561211 0H0l22.4131224 22.4131038L36.5337472 6.67090677c1.4751011-1.64449747 1.3377782-4.17343176-.3067193-5.64853284C35.4931384.36408091 34.5419931 0 33.5561211 0z"
                        transform={this.bottomPartTransform}/>
                </svg>;
            };

            const label = () => {
                const labelClasses = ['rt-font-banner-label', 'color-line', 'color-line-label'];
                if (this.$slots.content && !this.isMobile) {
                    return <p class={labelClasses.join(' ')}>
                        <span class={this.labelClass}>{this.$slots.label}</span>
                    </p>;
                } else {
                    if(!this.$slots.content){
                        labelClasses.push('color-line-label-single');
                    }
                    return <p class={labelClasses.join(' ')}>
                        <span class={this.labelClass}>{this.$slots.label}</span>
                        {icon()}
                    </p>;
                }
            };

            const content = () => {

                if (!this.isMobile) {
                    if (this.$slots.content) {
                        return <p class="color-line color-line--is-paragraph">
                            <span class={this.contentClass}>{this.$slots.content}{icon()}</span>
                        </p>;
                    } else {
                        return null;
                    }
                } else {
                    if (this.$slots.content) {
                        return <p class="color-line color-line--is-paragraph">
                            <span class={this.contentClass}>{this.$slots.content}</span>
                        </p>
                    } else {
                        return null;
                    }
                }
            };
            return <div class={this.wrapperClass}>
                {label()}
                {content()}
            </div>;
        }
    };
</script>
