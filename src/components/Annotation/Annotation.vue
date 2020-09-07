
<script type="text/jsx">
export default {
  name: "RtAnnotation",
  components: {},
  props: {
    open: {
      type: Boolean,
      default: false
    },
    hash:{
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: null,
      required: true
    },
    hasWhiteColor: {
      type: Boolean,
      default: false
    },
    titleFontClass: {
      type: String,
      default: 'rt-font-paragraph'
    },
    scrollTimeout:{
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      isOpen: this.open
    };
  },
  computed: {
    annotationClasses() {
      const classList = ['rt-annotation'];
      if(this.hasWhiteColor){
        classList.push('rt-annotation--white-color')
      }
      if(this.isOpen){
        classList.push('rt-annotation--is-open')
      }

      return classList.join(' ')
    },
    labelClasses(){
      const classList = this.titleFontClass.split(' ')
      classList.push('rt-annotation__title')
      return classList.join(' ')

    },
    allowHeight() {
      if(this.$refs.contentHeightResolver && this.isOpen) {
          return (parseInt(getComputedStyle(this.$refs.contentHeightResolver).height, 10) + 10) + 'px'
      }
      return null

    }
  },
  mounted() {
    this.checkHash()
  },
  created() {},
  methods: {
    checkHash(){
      if(this.hash.length > 0){
        const hash = global.location.hash.replace('#','')
        if(hash?.length > 0 && hash == this.hash){

          this.isOpen = true
          setTimeout(()=> {
            window.scrollTo(0, this.$el.offsetTop)
          },this.scrollTimeout-0);
        }

      }
    },
    toggleOpen() {
      this.isOpen = !this.isOpen;

      this.$emit('toggleAnnotation', this.isOpen)
    }
  },
  render(h) {
    return <div  class={this.annotationClasses}>
      <p class={this.labelClasses} on-click={this.toggleOpen}>
      {this.label}
      <svg
          class="rt-annotation__arrow"
          width="12px"
          height="7px"
          viewBox="0 0 12 7"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
      >
        <g transform="translate(-132.000000, -2341.000000)" stroke-width="1">
          <g
              transform="translate(132.000000, 2332.000000)"
          >
            <polygon
                points="10.6 9 6 13.3513514 1.4 9 0 10.3243243 6 16 12 10.3243243"
            />
          </g>
        </g>
      </svg>
    </p>
      <div class="rt-annotation__content" style={{maxHeight: this.allowHeight}}>
      <div ref="contentHeightResolver"
          class="rt-annotation__content-height-resolver"
      >
        {this.$slots.content}
      </div>
    </div>
  </div>
  }
};
</script>




