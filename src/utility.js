export const hexToRgbA = (hex, alpha) => {
    var c;
    if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
        c = hex.substring(1).split('');
        if (c.length === 3) {
            c = [c[0], c[0], c[1], c[1], c[2], c[2]];
        }
        c = '0x' + c.join('');
        return 'rgba(' + [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',') + ',' + alpha + ')';
    }
    throw new Error('Bad Hex');
}

export const eligibleToShowChromeTip = () => {
    let tipHidden = localStorage.getItem('hideChromeTip');
    if (tipHidden) {
        return false;
    } else {
        return window.chrome ? false : true;
    }
}

export const isSafari = () => {
    if (navigator.userAgent.search("Safari") >= 0 && navigator.userAgent.search("Chrome") < 0) {
        return true;
    } else {
        return false;
    }
}