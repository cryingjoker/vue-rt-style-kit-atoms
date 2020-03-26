import variables from "../variables.json";
const _normalizeVariables = {};
(function(){
    if(Object.keys(_normalizeVariables).length === 0) {
        Object.keys(variables).forEach((key) => {
            if (!parseInt(variables[key])) {
                return
            }
            let newKey = key;
            if (newKey.search('-')) {
                newKey = newKey.split('-').map((item, index) => {
                    if (index > 0) {
                        item = item[0].toUpperCase() + item.substr(1)
                    }
                    return item
                }).join('')
            }
            _normalizeVariables[newKey] = parseInt(variables[key]);
        })
    }
})();

const getVariable = (variableName)=>{
    if(variableName in _normalizeVariables){
        return _normalizeVariables[variableName];
    }
    console.error('cannot find "%s" in variables', variableName)
    return null;
}
export default getVariable;
