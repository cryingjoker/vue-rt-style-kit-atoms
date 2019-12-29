<script type="text/jsx">
    import {default as RippleComponent} from "../Ripple/Ripple.vue";

    const componentsList = {};
    componentsList[RippleComponent.name] = RippleComponent;
    export default {
        name: "RtRow",
        props: {
            top: {
                type: [Number, String],
                default: -1
            },
            bottom: {
                type: [Number, String],
                default: -1
            },
            left: {
                type: [Number, String],
                default: -1
            },
            right: {
                type: [Number, String],
                default: -1
            },
            tabletTop: {
                type: [Number, String],
                default: -1
            },
            tabletBottom: {
                type: [Number, String],
                default: -1
            },
            tabletLeft: {
                type: [Number, String],
                default: -1
            },
            tabletRight: {
                type: [Number, String],
                default: -1
            },
            mobileTop: {
                type: [Number, String],
                default: -1
            },
            mobileBottom: {
                type: [Number, String],
                default: -1
            },
            mobileLeft: {
                type: [Number, String],
                default: -1
            },
            mobileRight: {
                type: [Number, String],
                default: -1
            },
        },
        data() {
            return {
                spacesParams: ['top', 'bottom', 'left', 'right', 'tabletTop', 'tabletBottom', 'tabletLeft', 'tabletRight', 'mobileTop', 'mobileBottom', 'mobileLeft', 'mobileRight',]
            }
        },

        mounted() {
        },
        computed: {
            rowClassName() {
                const classNamesArray = this.spacesParams.map((name)=>{
                    if(this[name] >= 0){
                        return this.getClassName(name, this[name]);
                    }
                }).filter((i)=>i && i.length > 0)
                console.info('classNamesArray',classNamesArray);

                classNamesArray.push('row');
                return classNamesArray.join(' ');
            }
        },
        methods: {
            getClassName(name, value) {
                value = parseInt(value);
                if (value < 0) {
                    return ''
                } else {
                    const classNamesParts = ['rt-'];
                    if (name.search('tablet') === 0) {
                        classNamesParts.push('td-')
                    }
                    if (name.search('mobile') === 0) {
                        classNamesParts.push('md-')
                    }
                    classNamesParts.push('space-')
                    switch (true) {
                        case name.search(/left/ig) >= 0:
                            classNamesParts.push('left');
                            break;
                        case name.search(/right/ig) >= 0:
                            classNamesParts.push('right');
                            break;
                        case name.search(/top/ig) >= 0:
                            classNamesParts.push('top');
                            break;
                        case name.search(/bottom/ig) >= 0:
                            classNamesParts.push('bottom');
                            break
                    }
                    switch (true) {
                        case value % 20 === 0:
                            if (value === 0) {
                                classNamesParts.push('-none')
                            } else if (value !== 20) {
                                classNamesParts.push(value / 20 + '');
                            }
                            break;
                        case value % 10 === 0:
                            if (value === 10) {
                                classNamesParts.push('05');
                            } else {
                                classNamesParts.push(value / 20 * 10 + '');
                            }
                            break;
                        case value % 5 === 0:
                            let localName = (value - 5) / 20;
                            if (localName === 1) {
                                localName = ''
                            } else {
                                localName *= 10;
                                if (localName < 10) {
                                    localName = '0' + localName
                                }
                            }
                            localName += '-half'
                            classNamesParts.push(localName);
                    }
                    return classNamesParts.join('');

                }
            }
        },
        render(h) {
            return <div class={this.rowClassName}>{this.$slots.default}</div>
        }

    };
</script>
