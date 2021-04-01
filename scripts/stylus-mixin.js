import nib from 'nib';
import path from 'path'
import plugins from '../src/css/plugins/plugins.js'
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)
export default function useMixin(style) {
    //style
    // style.use()
    
    style.options.use.push(nib())
    style.options.use.push(plugins())
    style.options.imports.push(path.resolve(__dirname, '../', 'node_modules/nib/lib/nib/index.styl'))
    return style
}