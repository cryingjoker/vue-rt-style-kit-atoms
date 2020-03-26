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
    }
}
export function getSpacesClass(name, value)  {
    const localValue = parseInt(value.toString());
    if (localValue < 0) {
        return ''
    } else {
        const classNamesParts = ['rt-'];
        if (name.search('tablet') === 0) {
            classNamesParts.push('td-')
        }
        if (name.search('mobile') === 0) {
            classNamesParts.push('md-')
        }
        classNamesParts.push('space-')
        switch (true) {
            case name.search(/left/ig) >= 0:
                classNamesParts.push('left');
                break;
            case name.search(/right/ig) >= 0:
                classNamesParts.push('right');
                break;
            case name.search(/top/ig) >= 0:
                classNamesParts.push('top');
                break;
            case name.search(/bottom/ig) >= 0:
                classNamesParts.push('bottom');
                break
        }
        switch (true) {
            case localValue % 20 === 0:
                if (localValue === 0) {
                    classNamesParts.push('-none')
                } else if (localValue !== 20) {
                    classNamesParts.push(localValue / 20 + '');
                }
                break;
            case localValue % 10 === 0:
                if (localValue === 10) {
                    classNamesParts.push('05');
                } else {
                    classNamesParts.push(localValue / 20 * 10 + '');
                }
                break;
            case localValue % 5 === 0:
                let localName = (localValue - 5) / 20;
                if (localName === 1) {
                    localName = ''
                } else {
                    localName *= 10;
                    if (localName < 10) {
                        localName = '0' + localName
                    }
                }
                localName += '-half'
                classNamesParts.push(localName);
        }
        return classNamesParts.join('');
    }
}
