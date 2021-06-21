import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import './PreviewAd.scss';
import domtoimage from 'dom-to-image';
import { GlobalContext } from '../../context/global.context';
import { UNSPLASH_APP_NAME, UNSPLASH_API_KEY } from '../../configs/constants';
import { createApi } from 'unsplash-js';

//assets
import downloadBtn from '../../assets/images/downloadBtn.png';
import editBtn from '../../assets/images/editBtn.png';
import changeTemplateBtn from '../../assets/images/changeTempBtn.png';
import changeColor from '../../assets/images/changeColor.png';
import logoWatermark from '../../assets/images/logoWatermark.png';

// Templates
import { TEMPLATES } from '../../templates/TemplateController';

// Components
import Loading from '../../components/loading/Loading';
import TemplateSelectionModal from '../../components/modals/templateSelection/TemplateSelectionModal';
import SelectColorModal from '../../components/modals/selectColorModal/SelectColorModal';

const PreviewAd = () => {
    const globalContext = useContext(GlobalContext);
    const [loading, setLoading] = useState(false);
    const [showWatermark, setShowWatermark] = useState(false);
    const [showControls, setShowControls] = useState(false);
    let history = useHistory();
    const unsplash = createApi({
        accessKey: UNSPLASH_API_KEY
    });

    useEffect(() => {

        // Closing Modal when back button is clicked instead of routing to back page
        window.onpopstate = e => {
            e.preventDefault();
            if (window.$('#templateSelectionModal').hasClass('show')) {
                window.$('#templateSelectionModal').modal('hide');
                history.goForward();
            }

            if (window.$('#selectColorModal').hasClass('show')) {
                window.$('#selectColorModal').modal('hide');
                history.goForward();
            }
        }

        // Set initial data
        if (!globalContext.state.productData) {
            history.push('/');
        }

        setTimeout(() => {
            setShowControls(false);
        }, 5000);

        setShowControls(true);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const downloadScreenshot = (params) => {
        setShowWatermark(true);
        setLoading(true);

        setTimeout(() => {
            // To track unsplash image download as per their guidelines
            globalContext.state.selectedUnsplashPhoto && unsplash.photos.trackDownload({
                downloadLocation: globalContext.state.selectedUnsplashPhoto.links.download_location,
            });


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
                    setShowWatermark(false);
                });
        }, 400);

    }

    const goToCreateAd = () => {
        history.push('/')
    }

    const getSelectedTemplateComponent = () => {
        let SelectedTemplate = TEMPLATES[globalContext.state.selectedTemplate].component;
        return <SelectedTemplate />
    }

    const toggleControls = () => {
        setShowControls(!showControls);
    }

    const handleColorChange = (newColor) => {
        window.$('#selectColorModal').modal('hide');
        globalContext.setProductData({ ...globalContext.state.productData, selectedBackgroundColor: newColor.hex });
    }

    return (
        <div onClick={toggleControls} className="preview-ad-ctnr">
            {loading && <Loading fullScreen={true}></Loading>}
            {globalContext.state.productData && <>
                <div className="d-flex flex-column previewAd" id="html-content-holder">
                    {showWatermark && <img src={logoWatermark} alt="Create Awesome Ads" width="100px" className='logo-badge' />}
                    {getSelectedTemplateComponent()}
                </div>

                <input type="image" className={"edit-btn " + (showControls ? 'fadeIn' : 'fadeOut')} alt="Edit Button"
                    src={editBtn} onClick={goToCreateAd}></input>
                <input type="image" className={"download-btn " + (showControls ? 'fadeIn' : 'fadeOut')} alt="Download Button"
                    src={downloadBtn} onClick={downloadScreenshot}></input>
                <input type="image" className={"change-temp-btn " + (showControls ? 'fadeIn' : 'fadeOut')} alt="Change Template Button"
                    src={changeTemplateBtn} data-toggle="modal" data-target="#templateSelectionModal"></input>
                <input type="image" className={"change-color-btn " + (showControls ? 'fadeIn' : 'fadeOut')} alt="Change Color Button"
                    src={changeColor} data-toggle="modal" data-target="#selectColorModal" data-backdrop="false"></input>

                {globalContext.state.selectedUnsplashPhoto && <div className={"unsplash-attr-ctrn " + (showControls ? 'fadeIn' : 'unsplash-attr-ctrn-fadeOut')} >
                    <div>Photo by <a rel="noreferrer" target="_blank" href={`https://unsplash.com/@${globalContext.state.selectedUnsplashPhoto.user.username}?utm_source=${UNSPLASH_APP_NAME}&utm_medium=referral`}>{globalContext.state.selectedUnsplashPhoto.user.name}</a> on <a target="_blank" rel="noreferrer" href={`https://unsplash.com/?utm_source=${UNSPLASH_APP_NAME}&utm_medium=referral`}>Unsplash</a></div>
                </div>}

                <TemplateSelectionModal />
                <SelectColorModal handleColorChange={handleColorChange} />
            </>}
        </div>);
}

export default PreviewAd;