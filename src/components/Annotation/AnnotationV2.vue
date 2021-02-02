<script type="text/jsx">
  import {AnnotationStore} from "./AnnotationStore";
  export default {
    name: "RtAnnotationV2",
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
          this.$refs.content.style.maxHeight = (parseInt(getComputedStyle(this.$refs.contentHeightResolver).height, 10) + 20) + 'px';
        } else {
          this.$refs.content.style.maxHeight =  0
        }
      }
    },
    computed: {
      title() {
        return this.label || this.$slots.label
      },
      annotationClasses() {
        const classList = ['rt-annotation', 'rt-annotation-v2'];
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
        classList.push('rt-font-bold');
        classList.push('rt-annotation__title');
        classList.push('rt-annotation-v2__title');
        return classList.join(' ')
      }
    },
    mounted() {
      this.checkHash();
      AnnotationStore.initStore(this._uid, this.isOpen);
      if(this.isOpen) {
        AnnotationStore.setActive(this._uid);
        this.$refs.content.style.maxHeight = (parseInt(getComputedStyle(this.$refs.contentHeightResolver).height, 10) + 20) + 'px';
      }
      AnnotationStore.addWatcher(this._uid, () => {
        this.closeOutside()
      });
    },
    beforeDestroy(){
      AnnotationStore.removeWatcher(this._uid);
      AnnotationStore.clearStore(this._uid);
    },
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
        if(AnnotationStore.getActive() != this._uid) {
          AnnotationStore.setActive(this._uid);
          this.isOpen = true;
          this.$emit('toggleAnnotation', this.isOpen);
        } else {
          AnnotationStore.setActive(null);
          this.isOpen = false;
        }
      },
      closeOutside() {
        if(AnnotationStore.getActive() != this._uid) {
          this.isOpen = false;
        }
      }
    },
    render(h) {
      return <div class={this.annotationClasses} onClick={this.toggleOpen}>
        <p class={this.labelClasses}>
          {this.title}
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
  };
</script>