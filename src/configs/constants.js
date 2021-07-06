export const UNSPLASH_API_KEY = process.env.REACT_APP_UNSPLASH_API_KEY;
export const UNSPLASH_APP_NAME = 'Create Awesome Ads'

export const PITCH_DEFAULT = ['ORDER NOW!', 'HURRY UP!', 'SALE!!!', '50% OFF', '1 + 1 FREE', 'CALL NOW!'];

export const AVAILALBE_SIZES = {
    WHATSAPP_STATUS: {
        id: 'WHATSAPP_STATUS',
        remFontSize: '15px',
        calculateCanvasHieghtFunc: () => {
            let deviceHeight = window.innerHeight;
            let calculatedHeight = window.innerWidth * (1280 / 764);
            if (calculatedHeight > deviceHeight) {
                return deviceHeight;
            } else {
                return calculatedHeight;
            }
        }
    },
    INSTA_STORY: {
        id: 'INSTA_STORY',
        remFontSize: '15px',
        calculateCanvasHieghtFunc: () => {
            let deviceHeight = window.innerHeight;
            let calculatedHeight = window.innerWidth * (16 / 9);
            if (calculatedHeight > deviceHeight) {
                return deviceHeight;
            } else {
                return calculatedHeight;
            }
        }
    },
    INSTA_SQUARE: {
        id: 'INSTA_SQUARE',
        remFontSize: '12px',
        calculateCanvasHieghtFunc: () => {
            let deviceHeight = window.innerHeight;
            let calculatedHeight = window.innerWidth;
            if (calculatedHeight > deviceHeight) {
                return deviceHeight;
            } else {
                return calculatedHeight;
            }
        }
    },
    INSTA_VERTICLE: {
        id: 'INSTA_VERTICLE',
        remFontSize: '12px',
        calculateCanvasHieghtFunc: () => {
            let deviceHeight = window.innerHeight;
            let calculatedHeight = window.innerWidth * (5 / 4);
            if (calculatedHeight > deviceHeight) {
                return deviceHeight;
            } else {
                return calculatedHeight;
            }
        }
    }
}