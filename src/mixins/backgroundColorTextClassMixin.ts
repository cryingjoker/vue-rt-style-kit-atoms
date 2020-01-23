import colors from '../color.json'


export const backgroundColorPropsNames: string[] = ['backgroundColor', 'tabletBackgroundColor', 'mobileBackgroundColor']

export const backgroundColorProps: any = {
    backgroundColor: {
        type: String,
        default: ''
    },
    tabletBackgroundColor: {
        type: String,
        default: ''
    },
    mobileBackgroundColor: {
        type: String,
        default: ''
    }
}






// type deviceType = "mobile" | "desktop" | "tablet";

const deviceTypeArray: any = ["mobile", "desktop", "tablet"];

export function getBackgroundClassByProps(oldProps) {
    const classNames = backgroundColorPropsNames.map((key) => {
        let classes;
        if(oldProps && oldProps[key]){
            classes = getBackgroundClass(this[oldProps[key]], key.replace(/backgroundcolor/gi, ''));
        }
        else{
            classes = getBackgroundClass(this[key], key.replace(/backgroundcolor/gi, ''));
        }
        return classes;
    }).filter(i => i && i.length > 0)

    return classNames

}

export function getBackgroundClass(colorValue: string = '', type: string = 'desktop'): string {
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
                colorName = 'background-' + colorName.replace('b2c-', '');
                break;
            case colorName.search('main-') >= 0:
                colorName = 'background-' + colorName.replace('-color', '');
                break
        }
        ;
        if (type) {
            switch (true) {
                case type.search('tablet') === 0:
                    colorName = colorName.replace('background-', 'backgrounds-td-');
                    break;
                case type.search('mobile') === 0:
                    colorName = colorName.replace('background-', 'background-md-');
                    break;
            }
        }
    } else {
        console.error('Check backgorund-colors props value');
    }
    // console.info('colorName',colorName);
    return colorName;
}


