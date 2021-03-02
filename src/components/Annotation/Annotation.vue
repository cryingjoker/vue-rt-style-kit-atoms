
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
      default: null
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
    },
    v2: {
        type: Boolean,
        default: false
    }
  },
  data() {
    return {
      isOpen: this.open
    };
  },
    watch: {
        isOpen(newVal) {
            if(newVal) {
                this.$refs.content.style.maxHeight = (parseInt(getComputedStyle(this.$refs.contentHeightResolver).height, 10) + 10) + 'px';
            } else {
                this.$refs.content.style.maxHeight =  0
            }
        }
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
      const classList = this.titleFontClass.split(' ');
      classList.push('rt-annotation__title');
      return classList.join(' ')
    }
  },
  mounted() {
    this.checkHash();
  },
  created() {},
  methods: {
    checkHash(){
      if(this.hash.length > 0){
        const hash = global.location.hash.replace('#','');
        if(hash?.length > 0 && hash == this.hash){
          this.isOpen = true;
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
      if(this.v2) {
          return <rt-annotation-v2 label={this.label} open={this.open} hash={this.hash} hasWhiteColor={this.hasWhiteColor}
                                   titleFontClass={this.titleFontClass} scrollTimeout={this.scrollTimeout}>
              <template slot="label">
                  {this.$slots.label}
              </template>
              <template slot="content">
                  {this.$slots.content}
              </template>
          </rt-annotation-v2>
      } else {
          return <div  class={this.annotationClasses}>
              <p class={this.labelClasses} onClick={this.toggleOpen}>
                  {this.label}
                  <svg class="rt-annotation__arrow" width="12px" height="7px" viewBox="0 0 12 7" xmlns="http://www.w3.org/2000/svg">
                      <g transform="translate(0.000000, -9.000000)" stroke-width="1">
                          <polygon points="10.6 9 6 13.3513514 1.4 9 0 10.3243243 6 16 12 10.3243243"/>
                      </g>
                  </svg>
              </p>
              <div class="rt-annotation__content" ref="content">
                  <div ref="contentHeightResolver" class="rt-annotation__content-height-resolver">
                      {this.$slots.content}
                  </div>
              </div>
          </div>
      }

  }
};
</script>