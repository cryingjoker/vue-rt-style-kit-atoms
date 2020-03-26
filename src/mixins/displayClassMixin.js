export const displayParamsNames  = ["display", "tabletDisplay", "mobileDisplay"];
export const displayParamsProps  = {
    display: {
        type: String,
        default: null
    },
    tabletDisplay: {
        type: String,
        default: null
    },
    mobileDisplay: {
        type: String,
        default: null
    }
};
export function getDisplayClass(name, value) {


    const classNamesParts = [];
    switch(true){
        case name.search(/tablet/i)>=0:
            classNamesParts.push('td');
            break;
        case name.search(/mobile/i)>=0:
            classNamesParts.push('md');
            break;
    }
    classNamesParts.push('d');
    classNamesParts.push(value);

    return classNamesParts.join('-');

}
