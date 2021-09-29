<script type="text/jsx">
import {default as RippleComponent} from "../Ripple/Ripple.vue";
import './Switch.styl'

const componentsList = {};
componentsList[RippleComponent.name] = RippleComponent;

export default {
  name: "RtSwitch",
  components: componentsList,
  props: {
    isDisabled: {
      type: Boolean,
      default: false
    },

//    checkIdAllChecked: {
//      type: Boolean,
//      default: false
//    },
    value: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    },
    checked: {
      type: Boolean,
      default: false
    },
    isOrange: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    isChecked: false,
    localChecked: false,
    localDisabled: false
  }),
  computed: {
    fieldName() {
      return this.name || "input-field__" + this._uid;
    },
    containerClasses() {
      let classList = 'switch';
      if (this.isOrange) {
        classList += ' switch--orange';
      }
      return classList;
    }
  },
  watch:{
    checked(newVal, oldVal){
      if(newVal!= oldVal){
        this.localChecked = newVal
      }
    },
    isDisabled(newVal, oldVal){
      if(newVal!= oldVal){
        this.isDisabled = newVal
      }
    }
  },
  mounted: function () {
    setTimeout(() => {
      this.setValue();
    }, 0);
    this.bindEvents();
  },
  updated() {
    this.unbindEvents();
    this.bindEvents();
  },
  beforeDestroy() {
    this.unbindEvents();
  },
  methods: {
    eventChangeListener(event) {
      setTimeout(() => {
        this.$emit("change", event);
      }, 0);
    },
    bindEvents() {
      if (this["$listeners"]) {
        Object.keys(this["$listeners"]).map(eventName => {
          this.$refs.input.addEventListener(
              eventName,
              this["$listeners"][eventName]
          );
        });
      }
      this.$on("emittoswitcher", data => {
        if (data && data[this._uid]) {
          this.$el.querySelector(".switch-element").checked =
              data[this._uid]["checked"];
        }
      });
    },
    changeFromParent(props) {
      if (props && this.name in props) {
        const propsForItem = props[this.name];
        if (this.value && propsForItem.indexOf(this.value) >= 0) {
          this.$refs.input.checked = true;
          this.isChecked = true;
          this.$emit("changeswitcher", {
            name: this.name,
            value: this.value,
            checked: true,
            _uid: this._uid
          });
          this.showWave();
        } else {
          this.$refs.input.checked = false;
          this.isChecked = false;
        }
      }
    },
    unbindEvents() {
      if (this["_events"]) {
        Object.keys(this["_events"]).map(eventName => {
          this.$refs.input.removeEventListener(
              eventName,
              this["_events"][eventName]
          );
        });
      }
      this.$refs.input.removeEventListener("change", this.eventChangeListener);
    },
    setValue() {
      this.localDisabled = Boolean(this.isDisabled)
      this.localChecked = Boolean(this.checked)
    },
    inputHandler() {
      this.showWave();
      this.localChecked = Boolean(this.$refs.input.checked);
      this.$emit("changeswitcher", {
        name: this.fieldName,
        value: this.value,
        checked: this.localChecked,
        _uid: this._uid
      });
    },
    showWave() {
      this.$refs.ripple.startRipple({
        offsetX: 10,
        offsetY: 10
      });
    }
  },
  render(h) {
    return <label class={this.containerClasses}>
      <input ref="input"
             disabled={this.localDisabled}
             checked={this.localChecked}
             name={this.fieldName}
             type="checkbox"
             class="switch-element"
             onChange={this.inputHandler}/>
      <div class="switch-container">
        <div class="switch-container__circle">
          <rt-ripple ref="ripple" not-bind-click={true} not-render={this.isDisabled}/>
        </div>
        {this.$slots.default}
      </div>
    </label>
  }
};
</script>
