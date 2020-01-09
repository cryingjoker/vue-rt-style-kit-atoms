<script type="text/jsx">


    import {getSpacesClass, spacesParamsNames} from "./spaceClassMixin.ts";
    import {spacesParamsNames} from "./spaceClassMixin.ts";

    const componentsList = {};
    export default {
        name: "RtCol",
        props: {
            size: {
                type: [Number, String],
                default: 1
            },
            tablerSize: {
                type: [Number, String],
                default: 1
            },
            mobileSize: {
                type: [Number, String],
                default: 1
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
                sizeParams:['size','mobileSize','tabletSize'],
            }
        },

        mounted() {
        },
        computed: {
            rowClassName() {
                const classNamesArray = spacesParamsNames.map((name)=>{
                    if(parseInt(this[name]) >= 0){
                        return getSpacesClass(name, this[name]);
                    }
                }).filter((i)=>i && i.length > 0)

                classNamesArray.concat(displayParamsNames.map((name)=>{
                    return getSpacesClass(name, this[name]);
                }).filter((i)=>i && i.length > 0))


                return classNamesArray.join(' ');
            }
        },
        methods: {},
        render(h) {
            return <div class={this.rowClassName}>{this.$slots.default}</div>
        }

    };
</script>
