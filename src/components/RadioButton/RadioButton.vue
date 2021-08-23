

<script type="text/jsx">
    import {default as RippleComponent} from "../Ripple/Ripple.vue";

    const componentsList = {};
    componentsList[RippleComponent.name] = RippleComponent;
    export default {
        name: "RtRadioButton",
        components: componentsList,
        props: {
            name: {
                type: String,
                default: ''
            },
            hasError:{
                type: Boolean,
                default: false
            },
            isOrange:{
              type: Boolean,
              default: false
            },
            bright: {
                type: Boolean,
                default: false
            },
            checked: {
                type: Boolean,
                default: false
            },
            value: {
                type: [String, Number],
                default: null
            },
            model: {
                type: [String, Number],
                default: null
            },
            isDisabled: {
                type: Boolean,
                default: false
            },
            disabled: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                isChecked: this.checked
            };
        },
        watch: {
            model() {
                this.checkModel();
            },
            checked() {
                this.isChecked = this.checked;
            }
        },
        mounted() {
            this.checkModel();
            if (this.checked) {
                this.changeModel({target: {checked: true}})
            }
        },
        methods: {
            changeFromParent(props) {
                if (props && this.name in props) {
                    const propsForItem = props[this.name];
                    if (this.value && propsForItem.indexOf(this.value) >= 0) {
                        this.$refs.input.checked = true;
                        this.isChecked = true;
                        this.$emit("change-radiobutton", {
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
                }
            },
            checkModel() {
                if (this.model !== null) {
                    this.isChecked = this.model === this.value;
                }
            },
            showWave() {
                this.$refs.ripple.startRipple({
                    offsetX: 10,
                    offsetY: 10
                });
            },
            changeModel($event) {
                this.isChecked = $event.target.checked;

                this.$emit("input", this.value);
                this.$emit("change", this.value);
                this.$emit("change-radiobutton", {
                    name: this.name,
                    value: this.value,
                    checked: this.isChecked,
                    _uid: this._uid
                });
                this.showWave();
            }
        },
        computed:{
          radioButtonClasses(){
              const classList = ['radio-button']
              if(this.isOrange){
                  classList.push('radio-button-orange')
              }
              if(this.bright){
                  classList.push('radio-button-bright')
              }
              if(this.hasError){
                  classList.push('radio-button-error')
              }
              if(this.isDisabled || this.disabled){
                  classList.push('radio-button-disabled')
              }
              if(this.isChecked){
                  classList.push('radio-button-active')
              }
              return classList.join(' ')
          }
        },
        render() {
            return <label class={this.radioButtonClasses}>
                    <rt-ripple ref="ripple" not-bind-click={true} not-render={this.isDisabled || this.disabled}/>
                <input ref="input" name={this.name} disabled={this.disabled} checked={this.isChecked} type="radio" class="radio-button-element" value={this.value} onChange={this.changeModel}
            /><div class="radio-button-container">
                {this.$slots.default}
            </div>
        </label>
        }
    };
</script>
