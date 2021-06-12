import React, { useContext } from "react";
import './TemplateSelectionModal.scss';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { GlobalContext } from '../../../context/global.context';
import { TEMPLATES } from '../../../templates/TemplateController';


const TemplateSelectionModal = ({productData}) => {
    const globalContext = useContext(GlobalContext);
    let templatesArr = [];
    Object.keys(TEMPLATES).forEach(function (key) {
        templatesArr.push(TEMPLATES[key]);
    });

    const handleSelect = (templateId) => {
        globalContext.setSelectedTemplate(templateId)
    }

    return (<div class="modal fade template-selection-modal-ctrn" id="templateSelectionModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div style={{ height: '100%' }} className="d-flex flex-column justify-content-end m-0">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5>Choose a Template</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <Carousel showThumbs={false} autoFocus={false} showArrows={false} centerMode={true} showStatus={false} infiniteLoop={true} autoPlay={false} showIndicators={false}>
                            {templatesArr.map((item) => (
                                <div className="d-flex flex-column justify-content-between align-items-center" >
                                    {/* {<item.component productData={productData}/>} */}
                                    <img src={item.demoImage} alt="Demo img" />
                                    <button onClick={() => { handleSelect(item.id) }} className="small-select-btn mt-3 mb-3" data-dismiss="modal"><span>Select</span></button>
                                </div>
                            ))}
                        </Carousel>
                    </div>
                </div>
            </div>
        </div>


    </div>);
}

export default TemplateSelectionModal;