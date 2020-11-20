class LazySrc {
  constructor(element, data, vnode) {
    this.$el = element;
    this.value = data.value;
    this.vnode = vnode;
    this.bind();
  }

  bind = () => {
  
  };
  update = (el) => {
    this.unbind()
    this.bind()
  };
  unbind = (el, value) => {
  
  };
  getImage(){
    if ('IntersectionObserver' in window ) {
      const imageObserver = new IntersectionObserver((entries, imgObserver) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const lazyImage = entry.target
            lazyImage.src = this.value
            imgObserver.unobserve(lazyImage);
          }
        })
      }, {threshold: 0});
      imageObserver.observe(this.$el);
    }else{
      this.$el.src = this.value
    }
  }
  init = ()=>{
    this.getImage();
  }
}

export const LazySrcDirective = {
  name: "LazySrc",
  bind(el, bindings, vnode) {
    el.lazy = new LazySrc(vnode.elm, bindings, vnode);
    el.lazy.init()
  },
  inserted(el,bindings, vnode){},
  update(el, bindings, vnode, oldVnode) {
    el.lazy.unbind(el, bindings.value)
    el.lazy = new LazySrc(vnode.elm, bindings, vnode);
    el.lazy.init()
  },
  componentUpdated(el, bindings, vnode, oldVnode) {},
  unbind(el, bindings, vnode) {
    el.lazy.unbind();
  }
};



