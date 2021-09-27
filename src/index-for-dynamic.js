/**
 * Данный список компонентов подключается динамически на страницу
 * @info используется только для Widgets-шин сайта
 * @see RTRU-11155
 */

/**
 * Позволяет подключать компоненты и добавлять дополнительные обработчики
 * @param {*} cmpDecorator - Название кастомного тэга для инициализации компонента
 * @param {*} file - Путь к загружаемому компоненту
 */
const load = (cmpDecorator, fileLocation) => {
  return {
    [cmpDecorator]: () => import(`./components/${fileLocation}`)
      // .then(cmp => { // @TODO Custom-events
      //   console.log('Hello there!', cmp)
      //   return cmp
      // })
      .catch(e => console.error(e))
  }
}

export default { // Сортировака по принадлежности, как в pages
  // Main
  ...load('RtRow', 'Grid/GridRow.vue'),
  ...load('RtCol', 'Grid/GridColumn.vue'),
  ...load('RtImg', 'Image/Image.vue'),
  ...load('RtLine', 'Line/Line.vue'),
  ...load('RtRipple', 'Ripple/Ripple.vue'),
  ...load('RtRippleWithoutJs', 'Ripple/RippleWithoutJs.vue'),
  ...load('RtCircleNumber', 'CircleNumber/CircleNumber.vue'),

  // Form
  ...load('RtButton', 'Button/Button.vue'),
  ...load('RtCalendar', 'Calendar/Calendar.vue'),
  ...load('RtCheckbox', 'Checkbox/Checkbox.vue'),
  ...load('RtCheckboxContainer', 'Checkbox/CheckboxContainer.vue'),
  ...load('RtInput', 'Input/Input.vue'),
  ...load('RtRadioButton', 'RadioButton/RadioButton.vue'),
  ...load('RtRadioButtonContainer', 'RadioButton/RadioButtonContainer.vue'),
  ...load('RtAutocomplete', 'Select/Autocomplete.vue'),
  ...load('RtSelect', 'Select/Select.vue'),
  ...load('RtSelectOption', 'Select/SelectOption.vue'),
  ...load('RtSelectV2', 'Select/SelectV2.vue'),
  ...load('RtSelectV2Option', 'Select/SelectV2Option.vue'),
  ...load('RtSwitch', 'Switch/Switch.vue'),
  ...load('RtSwitchContainer', 'Switch/SwitchContainer.vue'),
  ...load('RtSwitchV2', 'Switch/SwitchV2.vue'),
  ...load('RtTextarea', 'Textarea/Textarea.vue'),
  ...load('RtTextareaStatic', 'Textarea/TextareaStatic.vue'),
  ...load('RtTextareaV2', 'Textarea/TextareaV2.vue'),

  // Group
  ...load('RtAnnotation', 'Annotation/Annotation.vue'),
  ...load('RtAnnotationV2', 'Annotation/AnnotationV2.vue'),

  // Simple
  ...load('RtArrowAnchor', 'ArrowAnchor/ArrowAnchor.vue'),
  ...load('RtColorLineText', 'ColorLineText/ColorLineText.vue'),
  ...load('RtHint', 'Hint/Hint.vue'),
  ...load('RtHintBody', 'Hint/HintBody.vue'),
  ...load('RtPrice', 'Price/Price.vue'),
  ...load('RtSpinner', 'Spinner/Spinner.vue'),
  ...load('RtSystemIcons', 'SystemIcons/SystemIcons.vue'),
  ...load('RtUssd', 'Ussd/Ussd.vue'),
  ...load('RtVideoPlayer', 'VideoPlayer/VideoPlayer.vue')

  // Complex
}
