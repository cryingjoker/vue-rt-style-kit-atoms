<template>
  <div
    :class="[
      className,
      'input-wrapper'
    ]"
  >
    <div
      :class="[
        className + '__wrap',
        'input'
      ]"
    >
      <date-picker
        confirm
        lang="ru"
        :type="type"
        :class="[
          className + '__cmp',
          'input-element'
        ]"
        :id="`${className}--${_uid}`"
        :editable="editable"
        :clearable="clearable"
        :input-class="inputClass"
        :placeholder="placeholder"
        :append-to-body="appendToBody"
        v-bind="calendarProps"
        v-model="inputVal"
        @confirm="val => $emit('confirm', val, `${className}--${_uid}`)"
      >
        <slot></slot>
      </date-picker>
      <div class="text-field__line"></div>
      <div
        class="floating-placeholder floating-placeholder--go-top"
        v-html="label"
      ></div>
    </div>
  </div>
</template>

<script>
import DatePicker from 'vue2-datepicker'
// import 'vue2-datepicker/locale/ru'

const className = 'rt-calendar'

export default {
  name: 'RtCalendar',
  components: { DatePicker },
  props: {
    calendarProps: null, // @see https://github.com/mengxiong10/vue2-datepicker
    clearable: {
      type: Boolean,
      default: false
    },
    editable: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'datetime'
    },
    placeholder: {
      type: String,
      default: 'Выберите дату'
    },
    label: {
      type: String
    },
    appendToBody: {
      type: Boolean,
      default: true
    },
    value: null,
    inputClass: {
      type: String,
      default: className + '__input'
    }
  },
  data () {
    return {
      className: className
    }
  },
  computed: {
    inputVal: { // @model
      get () {
        return this.value
      },
      set (val) {
        this.$emit('input', val)
      }
    }
  }
}
</script>
