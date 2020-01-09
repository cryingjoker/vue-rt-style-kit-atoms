<script type="text/jsx">

    import {getSpacesClass, spacesParamsNames} from "./spaceClassMixin.ts";
    import {getDisplayClass, displayParamsNames} from "./displayClassMixin.ts";

    const componentsList = {};
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
            display: {
                type: String,
                default: null
            },
            tabletDisplay: {
                type: String,
                default: null
            },
            mobileDisplay: {
                type: String,
                default: null
            }
        },

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
