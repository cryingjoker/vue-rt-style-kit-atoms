import colors from '../color.json'


export const fontColorPropsNames: string[] = ['fontColor', 'labelColor', 'contentColor', 'tabletFontColor', 'tabletLabelColor', 'tabletContentColor', 'mobileFontColor', 'mobileLabelColor', 'mobileContentColor']

export const fontColorProps: any = {
    fontColor: {
        type: String,
        default: ''
    },
    labelColor: {
        type: String,
        default: ''
    },
    contentColor: {
        type: String,
        default: ''
    },
    tabletFontColor: {
        type: String,
        default: ''
    },
    tabletLabelColor: {
        type: String,
        default: ''
    },
    tabletContentColor: {
        type: String,
        default: ''
    },
    mobileFontColor: {
        type: String,
        default: ''
    },
    mobileLabelColor: {
        type: String,
        default: ''
    },
    mobileContentColor: {
        type: String,
        default: ''
    }
}


export function getColorsCustomProps(withLabelAndContent: boolean = false) {
    const newProps = {};
    getFontColorPropsKeys(withLabelAndContent).forEach((key) => {
        newProps[key] = fontColorProps[key]
    });

    return newProps;
};

// type deviceType = "mobile" | "desktop" | "tablet";

const deviceTypeArray: any = ["mobile", "desktop", "tablet"];

export function getColorClassByProps(withLabelAndContent: boolean) {
    const fontColorPropsKeys = getFontColorPropsKeys(withLabelAndContent);
    if (withLabelAndContent) {
        const fontColorPropsKeysByType = {
            label: [],
            content: []
        };
        fontColorPropsKeys.forEach((key) => {
            if (key.search(/label/gi) >= 0) {
                fontColorPropsKeysByType.label.push(key);
            } else {
                fontColorPropsKeysByType.content.push(key);
            }
        })
        const classObjects = {}

        Object.keys(fontColorPropsKeysByType).forEach((key) => {
            classObjects[key] = fontColorPropsKeysByType[key].map(key => getColorClass(this[key], key.replace(/(labelcolor)|(contentcolor)/gi, ''))).filter((item)=>item && item.length > 0)
        });
        return classObjects;

    } else {
        const classNames = fontColorPropsKeys.map((key) => {
            const classes = getColorClass(this[key], key.replace(/fontcolor/gi, ''));
            return classes;
        })
        return classNames
    }

}

export function getColorClass(colorValue: string = '', type: string = 'desktop'): string {

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
                colorName = 'color-' + colorName.replace('b2c-', '');
                break;
            case colorName.search('main-') >= 0:
                colorName = 'color-' + colorName.replace('-color', '');
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
        console.error('Check colors text props value',colorValue);
    }
    return colorName;
}


const getFontColorPropsKeys = (withLabelAndContent) => {

    if (withLabelAndContent) {
        return fontColorPropsNames.filter(keys => keys.search(/font/gi) < 0);
    } else {
        return fontColorPropsNames.filter(keys => keys.search(/font/gi) >= 0);

    }
};