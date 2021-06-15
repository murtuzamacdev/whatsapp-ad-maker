import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import './PreviewAd.scss';
import domtoimage from 'dom-to-image';
import { GlobalContext } from '../../context/global.context';

//assets
import downloadBtn from '../../assets/images/downloadBtn.png';
import editBtn from '../../assets/images/editBtn.png';
import changeTemplateBtn from '../../assets/images/changeTempBtn.png';

// Templates
import { TEMPLATES } from '../../templates/TemplateController';

// Components
import Loading from '../../components/loading/Loading';
import TemplateSelectionModal from '../../components/modals/templateSelection/TemplateSelectionModal';

const PreviewAd = () => {
    const globalContext = useContext(GlobalContext);
    const [productData, setProductData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showControls, setShowControls] = useState(true);
    let history = useHistory();

    useEffect(() => {

        // Closing Modal when back button is clicked instead of routing to back page
        window.onpopstate = e => {
            e.preventDefault();
            if (window.$('#templateSelectionModal').hasClass('show')) {
                window.$('#templateSelectionModal').modal('hide');
                history.goForward();
            }
        }

        // Set initial data
        let data = globalContext.state.productData;
        if (data) {
            setProductData(data);
        } else {
            history.push('createAd');
        }

        setTimeout(() => {
            setShowControls(false);
        }, 3000);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const downloadScreenshot = (params) => {
        setLoading(true);
        const scale = 3
        const node = document.getElementById("html-content-holder")

        const style = {
            transform: 'scale(' + scale + ')',
            transformOrigin: 'top left',
            width: node.offsetWidth + "px",
            height: node.offsetHeight + "px"
        }

        const param = {
            height: node.offsetHeight * scale,
            width: node.offsetWidth * scale,
            quality: 1,
            style
        }

        domtoimage.toJpeg(node, param)
            .then(function (dataUrl) {
                var link = document.createElement('a');
                link.download = new Date().getTime() + '.jpeg';
                link.href = dataUrl;
                link.click();
                setLoading(false);
            });
    }

    const goToCreateAd = () => {
        history.push('createAd')
    }

    const getSelectedTemplateComponent = () => {
        let SelectedTemplate = TEMPLATES[globalContext.state.selectedTemplate].component;
        return <SelectedTemplate productData={productData} />
    }

    const toggleControls = () => {
        setShowControls(!showControls);
    }

    return (
        <div onClick={toggleControls} className="preview-ad-ctnr">
            {loading && <Loading></Loading>}
            {productData && <>
                <div className="d-flex flex-column previewAd" id="html-content-holder">
                    {getSelectedTemplateComponent()}
                </div>

                {showControls && <><input type="image" class="edit-btn" alt="Edit Button"
                    src={editBtn} onClick={goToCreateAd}></input>
                    <input type="image" class="download-btn" alt="Download Button"
                        src={downloadBtn} onClick={downloadScreenshot}></input>
                    <input type="image" class="change-temp-btn" alt="Change Template Button"
                        src={changeTemplateBtn} data-toggle="modal" data-target="#templateSelectionModal"></input>
                </>}

                <TemplateSelectionModal productData={productData} />
            </>}
        </div>);
}

export default PreviewAd;