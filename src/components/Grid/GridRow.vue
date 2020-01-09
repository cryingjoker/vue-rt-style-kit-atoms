<script type="text/jsx">

    import {getSpacesClass, spacesParamsNames, spacesParamsProps} from "./spaceClassMixin.ts";
    import {getDisplayClass, displayParamsNames, displayParamsProps } from "./displayClassMixin.ts";

    const componentsList = {};
    let componentProps = {};

    export default {
        name: "RtRow",
        props: {...componentProps,...spacesParamsProps, ...displayParamsProps},

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
