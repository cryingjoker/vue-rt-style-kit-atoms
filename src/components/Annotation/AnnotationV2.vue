<script type="text/jsx">
  import './Annotation.styl'

  import {annotationStore} from "./AnnotationStore";
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
      isOnlyOneOpen:{
        type: Boolean,
        default: true
      },
      label: {
        type: String,
        default: ''
      },
      gaLabel: {
        type: String,
        default: ''
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
      smallGap: {
        type: Boolean,
        default: false
      },
      reversed: {
        type: Boolean,
        default: false
      },
      color: {
        type: String,
        default: ''
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
          this.$emit('toggleAnnotation', this.isOpen);
        } else {
          this.$refs.content.style.maxHeight =  0
        }
      }
    },
    computed: {
      annotationClasses() {
        const classList = ['rt-annotation', 'rt-annotation-v2'];
        if(this.hasWhiteColor){
          classList.push('rt-annotation--white-color')
        }
        if(this.isOpen){
          classList.push('rt-annotation--is-open')
        }
        if(this.smallGap) {
          classList.push('rt-annotation-v2--small-gap');
        }
        if(this.reversed) {
          classList.push('rt-annotation-v2--reversed');
        }
        return classList.join(' ')
      },
      labelClasses(){
        const classList = this.titleFontClass.split(' ');
        classList.push('rt-annotation__title');
        classList.push('rt-annotation-v2__title');
        if(this.color) {
          classList.push('color--' + this.color)
        }
        return classList.join(' ')
      }
    },
    mounted() {
      this.checkHash();
      this.getParentUid()
      annotationStore.initStore(this._uid, this.isOpen,{
        isOnlyOneOpen: this.isOnlyOneOpen,
        parentUid : this.getParentUid()
      }, this.closeOutside);
      if(this.isOpen) {
        annotationStore.setActive(this._uid);
        this.$refs.content.style.maxHeight = (parseInt(getComputedStyle(this.$refs.contentHeightResolver).height, 10) + 20) + 'px';
      }

    },
    beforeDestroy(){
      annotationStore.removeWatcher(this.getParentUid());
      annotationStore.clearStore(this.getParentUid(), this._uid);
    },
    methods: {
      toggleOpen(){
        annotationStore.toggle(this.getParentUid(), this._uid);
      },

      getParentUid(){
        // check: if we in annotation v1 ?
        if(this.$parent?.$vnode?.tag.search('annotation')){
          return this.$parent.$parent._uid
        }else{
          return this.$parent._uid
        }
      },
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
      closeOutside() {
          this.isOpen = annotationStore.isActive(this.getParentUid(),this._uid);
      }
    },
    render(h) {
      const title = () => {
        return this.label || this.$slots.label
      }
      return <div class={this.annotationClasses}>
        <p class={this.labelClasses} onClick={this.toggleOpen} button={this.gaLabel}>
          {title()}
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
