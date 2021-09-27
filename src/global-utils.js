/**
 * Позволяет подключать компоненты и добавлять дополнительные обработчики
 * @param {*} cmpDecorator - Название кастомного тэга для инициализации компонента
 * @param {*} file - Путь к загружаемому компоненту
 */
export const safeImport = (cmpDecorator, fileLocation) => {
  return {
    [cmpDecorator]: () => import(`./components/${fileLocation}`)
      // .then(cmp => { // @TODO Custom-events
      //   console.log('Hello there!', cmp)
      //   return cmp
      // })
      .catch(e => console.error(e))
  }
}
