// Components
import Template1 from '../templates/template1/Template1';
import Template2 from '../templates/template2/Template2';
import Template3 from '../templates/template3/Template3';
import Template4 from '../templates/template4/Template4';

// Assets
import template1Img from '../assets/images/templates/demo/1.png';
import template2Img from '../assets/images/templates/demo/2.png';
import template3Img from '../assets/images/templates/demo/3.png';
import template4Img from '../assets/images/templates/demo/4.png';

export const TEMPLATES = {
    template1: {
        id: 'template1',
        component: Template1,
        demoImage: template1Img
    },
    template2: {
        id: 'template2',
        component: Template2,
        demoImage: template2Img
    },
    template3: {
        id: 'template3',
        component: Template3,
        demoImage: template3Img
    },
    template4: {
        id: 'template4',
        component: Template4,
        demoImage: template4Img
    },
}