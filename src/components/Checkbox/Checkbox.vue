<script type="text/jsx">
  import Vue from "vue";
  import {default as RippleComponent} from "../Ripple/Ripple.vue";
  import VeeValidate from "vee-validate";

  const componentsList = {};
  componentsList[RippleComponent.name] = RippleComponent;
  export default {
    name: "RtCheckbox",
    components: componentsList,

    props: {
      bright: {
        type: Boolean,
        default: false
      },
      isOrange: {
        type: Boolean,
        default: false
      },
      requiredRule: {
        type: Boolean,
        default: true
      },
      isDisabled: {
        type: Boolean,
        default: false
      },
      checked: {
        type: Boolean,
        default: false
      },
      value: {
        type: String,
        default: null
      },
      name: {
        type: String,
        default: null
      },
      required: {
        type: Boolean,
        default: false
      },
      uid: {
        type: String,
        default: ''
      }
    },

    data() {
      return {
        isChecked: this.checked
      };
    },
    watch: {
      checked: function (newValue) {
        this.isChecked = newValue;
      }
    },
    mounted() {
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
      changeFromParent(props) {
        if (props && this.name in props) {
          const propsForItem = props[this.name];
          if (this.value && propsForItem.indexOf(this.value) >= 0) {
            this.$refs.input.checked = true;
            this.isChecked = true;
            this.$emit("changecheckbox", {
              name: this.name,
              value: this.value,
              checked: this.isChecked,
              _uid: this._uid
            });
            this.showWave();
          } else {
            this.$refs.input.checked = false;
            this.isChecked = false;
          }
        } else {
          if (this.$refs.input.checked) {
            this.$refs.input.checked = false;
            this.isChecked = false;
          }
        }
      },
      changeInput($event) {
        this.$emit("update:checked", this.isChecked);
        this.isChecked = this.$refs['input'].checked
        this.$emit("changecheckbox", {
          name: this.name,
          value: this.value,
          checked: this.isChecked,
          _uid: this._uid
        });

        this.showWave();
      },
      bindEvents() {
        if (this["_events"]) {
          Object.keys(this["_events"]).map(eventName => {
            this["_events"][eventName].forEach((fn) => {
              this.$refs.input.addEventListener(
                  eventName,
                  fn
              );
            })

          });
        }
      },
      unbindEvents() {
        if (this["_events"]) {
          Object.keys(this["_events"]).map(eventName => {
            this["_events"][eventName].forEach((fn) => {
              this.$refs.input.removeEventListener(
                  eventName,
                  fn
              );
            })

          });
        }
      },
      showWave() {
        this.$refs.ripple.startRipple({
          offsetX: 10,
          offsetY: 10
        });
      }
    },
    computed: {
      checkBoxClass() {
        const classList = [];
        classList.push('checkbox')
	      if(this.bright){
          classList.push('checkbox-bright')
	      }
        if (this.isOrange) {
          classList.push('checkbox-orange')
        }
        if (this.isChecked) {
          classList.push('active')
        }
        if (this.isDisabled) {
          classList.push('disabled')
        }
        if (!this.isChecked && this.required) {
          classList.push('invalid')
        }
        return classList.join(' ')

      }

    },
    render(createElement, context) {
      return <label class={this.checkBoxClass}>
        <rt-ripple ref="ripple" not-render={this.isDisabled}/>
        <input id={this.uid} checked={this.checked} ref="input" disabled={this.isDisabled}
               name={this.name}
               type="checkbox" class="checkbox-element" onChange={this.changeInput}/>
        <div class="checkbox-container">

          <svg class="checkbox-container__angle"
               width="12px"
               height="9px"
               viewBox="0 0 12 9"
               version="1.1"
               xmlns="http://www.w3.org/2000/svg">
            <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
              <g id="Checkbox" transform="translate(-521.000000, -911.000000)">
                <g id="atom/checkbox/01-default" transform="translate(515.000000, 903.000000)">
                  <rect id="Rectangle" x="0" y="0" width="24" height="24"></rect>
                  <path
                      d="M16.324634,8.26251729 C16.7319344,7.88952294 17.3644884,7.91733353 17.7374827,8.32463399 C18.0817852,8.70060364 18.0845734,9.26850523 17.7626122,9.64702019 L17.675366,9.73748271 L10.4652088,16.3403428 L6.34362098,12.7544313 C5.92696008,12.3919232 5.88306058,11.7602819 6.24556871,11.343621 C6.58019159,10.9590109 7.14413505,10.89202 7.55663064,11.169112 L7.65637902,11.2455687 L10.43,13.659 L16.324634,8.26251729 Z"
                      id="Stroke-4" fill-rule="nonzero"></path>
                </g>
              </g>
            </g>
          </svg>
          {this.$slots.default}
        </div>
      </label>
    }

  };
</script>
