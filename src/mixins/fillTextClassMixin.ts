import colors from '../color.json'


export const fillPropsNames: string[] = ['fillColor',   'tabletFillColor',  'mobileFillColor'];

export const fillColorProps: any = {
    fillColor: {
        type: String,
        default: ''
    },

    tabletFillColor: {
        type: String,
        default: ''
    },

    mobileFillColor: {
        type: String,
        default: ''
    }
};



// type deviceType = "mobile" | "desktop" | "tablet";

const deviceTypeArray: any = ["mobile", "desktop", "tablet"];

export function getFillClassByProps(oldProps) {
    const classNames = fillPropsNames.map((key) => {
        let classes;
        if(oldProps && oldProps[key]){
            // console.info('oldProps[key]',key,oldProps[key]);
            classes = getFillClass(this[oldProps[key]], key.replace(/fillcolor/gi, ''));
        }
        else{
            classes = getFillClass(this[key], key.replace(/fillcolor/gi, ''));
        }
        return classes;
    })

    return classNames

}

export function getFillClass(colorValue: string = '', type: string = 'desktop'): string {
    // console.info('getFillClass',colorValue,type);
    if(!colorValue || colorValue.length === 0){
        return ''
    }

    if (!type || type.length === 0) {
        type = 'desktop';
    }


    if (!deviceTypeArray.find(deviceTypeArrayItem => deviceTypeArrayItem.search(type.trim()) === 0)) {
        console.error('deviceType="%s" can be only "mobile" | "desktop" | "tablet"', type);
        return '';
    }
    let colorName = colorValue;
    const colorsKeys = Object.keys(colors);
    const findingName = colorsKeys.find((colorsKeysItem) => {
        return colorsKeysItem.search(colorName) >= 0;
    });

    switch (true) {
        case colorValue && colorValue.search('#') === 0:
            colorName = colorsKeys.find((colorKey) => {
                return colors[colorKey].search(colorValue) === 0
            });
            break;
        case colors[colorName] && colors[colorName].length > 0:
            break;
        case findingName && findingName.length > 0:
            colorName = findingName;
            break;
        default:
            colorName = undefined;
            break;
    };



    if (colorName) {
        switch (true) {
            case colorName.search('b2c-') >= 0:
                colorName = 'fill-color-' + colorName.replace('b2c-', '');
                break;
            case colorName.search('main-') >= 0:
                colorName = 'fill-color-' + colorName.replace('-color', '');
                break
        }
        ;
        if (type) {
            switch (true) {
                case type.search('tablet') === 0:
                    colorName = colorName.replace('color-', 'color-td-');
                    break;
                case type.search('mobile') === 0:
                    colorName = colorName.replace('color-', 'color-md-');
                    break;
            }
        }
    } else {
        console.error('Check colors props value');
    }
    // console.info('colorName',colorName);
    return colorName;
}


