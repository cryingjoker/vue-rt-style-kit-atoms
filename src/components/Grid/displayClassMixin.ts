export const displayParamsNames : string[] = ["display", "tabletDisplay", "mobileDisplay"];

export function getDisplayClass(name: string, value:string) : string {


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
