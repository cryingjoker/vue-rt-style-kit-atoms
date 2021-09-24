/**
 * Данный список компонентов подключается динамически на страницу
 * @info используется только для Widgets-шин сайта
 * @see RTRU-11155
 */
export default {
  // Rt: () => import('./components//.vue').catch(e => console.error(e)),

  RtButton: () => import('./components/Button/Button.vue').catch(e => console.error(e)),
  RtLine: () => import('./components/Line/Line.vue').catch(e => console.error(e)),
  RtImg: () => import('./components/Image/Image.vue').catch(e => console.error(e)),
  RtPrice: () => import('./components/Price/Price.vue').catch(e => console.error(e)),
  RtSpinner: () => import('./components/Spinner/Spinner.vue').catch(e => console.error(e)),
  RtSystemIcons: () => import('./components/SystemIcons/SystemIcons.vue').catch(e => console.error(e)),

  RtRow: () => import('./components/Grid/GridRow.vue').catch(e => console.error(e)),
  RtCol: () => import('./components/Grid/GridColumn.vue').catch(e => console.error(e)),
}
