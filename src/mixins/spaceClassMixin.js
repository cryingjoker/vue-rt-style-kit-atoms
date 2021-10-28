import spaceAdaptive from '../space-adaptive-map.json'
export const spacesParamsNames  = ['top', 'bottom', 'left', 'right', 'tabletTop', 'tabletBottom', 'tabletLeft', 'tabletRight', 'mobileTop', 'mobileBottom', 'mobileLeft', 'mobileRight']

export const spacesParamsProps  = {
    top: {
        type: [Number, String],
        default: -1
    },
    bottom: {
        type: [Number, String],
        default: -1
    },
    left: {
        type: [Number, String],
        default: -1
    },
    right: {
        type: [Number, String],
        default: -1
    },
    tabletTop: {
        type: [Number, String],
        default: -1
    },
    tabletBottom: {
        type: [Number, String],
        default: -1
    },
    tabletLeft: {
        type: [Number, String],
        default: -1
    },
    tabletRight: {
        type: [Number, String],
        default: -1
    },
    mobileTop: {
        type: [Number, String],
        default: -1
    },
    mobileBottom: {
        type: [Number, String],
        default: -1
    },
    mobileLeft: {
        type: [Number, String],
        default: -1
    },
    mobileRight: {
        type: [Number, String],
        default: -1
    },
    topAdaptive:{
        type:Boolean,
        default: false
    },
    bottomAdaptive:{
        type:Boolean,
        default: false
    },
    leftAdaptive:{
        type:Boolean,
        default: false
    },
    rightAdaptive:{
        type:Boolean,
        default: false
    }
}
export function getSpacesClass(name, value)  {
    const localValue = parseInt(value.toString());
    if (localValue < 0) {
        return ''
    } else {
        let isAdaptive = false;
        const classNamesParts = [];
        if (name.search('tablet') === 0) {
            classNamesParts.push('td-')
        }
        if (name.search('mobile') === 0) {
            classNamesParts.push('md-')
        }
        classNamesParts.push('sp-')
        switch (true) {
            case name.search(/left/ig) >= 0:
                classNamesParts.push('l');
                if(this.leftAdaptive){
                    isAdaptive = true
                }
                break;
            case name.search(/right/ig) >= 0:
                classNamesParts.push('r');
                if(this.rightAdaptive){
                    isAdaptive = true
                }
                break;
            case name.search(/top/ig) >= 0:
                classNamesParts.push('t');
                if(this.topAdaptive){
                    isAdaptive = true
                }
                
                break;
            case name.search(/bottom/ig) >= 0:
                classNamesParts.push('b');
                if(this.bottomAdaptive){
                    isAdaptive = true
                }
                break
        }
        
        if (localValue === 0) {
            classNamesParts.push('-none')
        }else {
            if(isAdaptive){
                const unitSpace = parseInt(localValue / 4);
                classNamesParts.push('-x'+unitSpace)
            }else {
                const unitSpace = parseInt(localValue / 20);
                const partSpace = parseInt(localValue % 20 / 4);
                classNamesParts.push('-' + unitSpace)
                if (partSpace > 0) {
                    classNamesParts.push('-' + partSpace)
                }
            }
        }
        return classNamesParts.join('');
    }
}
