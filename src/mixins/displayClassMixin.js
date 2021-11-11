export const displayParamsNames  = ["lgHide","hide","tHide", "mHide"];
export const displayParamsProps  = {
    hide: {
        type: Boolean,
        default: false
    },
    mHide: {
        type: Boolean,
        default: false
    },
    tHide: {
        type: Boolean,
        default: false
    },
    lgHide: {
        type: Boolean,
        default: false
    }
};
const displayParamsPropsClasses = {
    hide : ['d-none', 'd-block'],
    mHide : ['md-d-none','md-d-block'],
    tHide : ['td-d-none','td-d-block'],
    lgHide : ['lg-d-none','lg-d-block']
}
export function getDisplayClass(displayOptions) {
    const displayClassesArray = []
    displayParamsNames.forEach((name,index)=>{
        if(displayOptions[name]){
            displayClassesArray.push(displayParamsPropsClasses[name][0])
        }
        else {
            if (index > 1 && displayOptions[displayParamsNames[index - 1]]){
                displayClassesArray.push(displayParamsPropsClasses[displayParamsNames[index]][1])
            }
        }
    })
    
    return displayClassesArray.join(' ')

}
