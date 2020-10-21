<script type="text/jsx">



    export default {
        name: "RtArrowAnchor",

        props: {
            href:{
              type: String,
              default: ''
            },
            scrollToId:{
              type: String,
              default: ''
            }
        },
        data: () => ({}),



        render: function (h) {
          return <button v-rt-scroll-to-on-click={{scrollToId: this.scrollToId}} type="button" class="d-flex flex-v-center rt-sys-icon-hover--orange rt-arrow-achor"><rt-system-icons class="rt-arrow-achor-icon" name="arrow right"></rt-system-icons><span class="sp-l-0-4 rt-font-control">{this.$slots.default}</span></button>
        }
    };
</script>
