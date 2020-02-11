<script type="text/jsx">

    import {getSpacesClass, spacesParamsNames, spacesParamsProps} from "../../mixins/spaceClassMixin.ts";
    import {getDisplayClass, displayParamsNames, displayParamsProps} from "../../mixins/displayClassMixin.ts";

    const componentsList = {};
    const componentProps = {
        tabletReverseDirection: {
            type: Boolean,
            default: false
        },
        mobileReverseDirection: {
            type: Boolean,
            default: false
        },
        tabletOnlyReverseDirection: {
            type: Boolean,
            default: false
        }
    };

    export default {
        name: "RtRow",
        props: {...componentProps, ...spacesParamsProps, ...displayParamsProps},

        mounted() {
        },
        computed: {
            rowClassName() {
                const classNamesArray = [...spacesParamsNames.map((name) => {
                    if (this[name] >= 0) {
                        return getSpacesClass(name, this[name]);
                    }
                }), ...displayParamsNames.map((name) => {
                    if (this[name]) {
                        return getDisplayClass(name, this[name]);
                    }
                })].filter((i) => i && i.length > 0);
                switch (true) {
                    case this.mobileReverseDirection:
                        classNamesArray.unshift('row-md-reverse');
                        break;
                    case this.tabletReverseDirection:
                        classNamesArray.unshift('row-td-reverse');
                        break;

                    case this.tabletOnlyReverseDirection:
                        classNamesArray.unshift('row-td-only-reverse');
                        break;
                }
                classNamesArray.unshift('row');
                return classNamesArray.join(' ');
            }
        },
        methods: {},
        render(h) {
            return <div class={this.rowClassName}>{this.$slots.default}</div>
        }

    };
</script>
