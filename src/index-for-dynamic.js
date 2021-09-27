/**
 * Данный список компонентов подключается динамически на страницу
 * @info используется только для Widgets-шин сайта
 * @see RTRU-11155
 */
import { safeImport } from './global-utils'

export default {
  ...safeImport('RtButton', 'Button/Button.vue'),
  ...safeImport('RtLine', 'Line/Line.vue'),
  ...safeImport('RtImg', 'Image/Image.vue'),
  ...safeImport('RtPrice', 'Price/Price.vue'),
  ...safeImport('RtSpinner', 'Spinner/Spinner.vue'),
  ...safeImport('RtSystemIcons', 'SystemIcons/SystemIcons.vue'),

  ...safeImport('RtRow', 'Grid/GridRow.vue'),
  ...safeImport('RtCol', 'Grid/GridColumn.vue'),
}
