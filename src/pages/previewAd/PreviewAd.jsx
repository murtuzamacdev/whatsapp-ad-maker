import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import './PreviewAd.scss';
import domtoimage from 'dom-to-image';
import { GlobalContext } from '../../context/global.context';
import { UNSPLASH_APP_NAME, UNSPLASH_API_KEY, AVAILALBE_SIZES } from '../../configs/constants';
import { createApi } from 'unsplash-js';
import firebase from "firebase/app";
import "firebase/analytics";
import GAEvents from '../../configs/GA_events.json';
import { isSafari, changeColorTone, hexToRgbA, lightOrDark, getAverageRGB } from '../../utility';
import { useSwipeable } from 'react-swipeable';

//assets
import prevNextBtn from '../../assets/images/prevNextBtn.svg';

// Templates
import { TEMPLATES } from '../../templates/TemplateController';

// Components
import Loading from '../../components/loading/Loading';
import TemplateSelectionModal from '../../components/modals/templateSelection/TemplateSelectionModal';
import SelectColorModal from '../../components/modals/selectColorModal/SelectColorModal';
import SelectSizeModal from '../../components/modals/selectSizeModal/SelectSizeModal';
import PreviewTabs from '../../components/prievewTabs/PreviewTabs';
import SelectImageModal from '../../components/modals/selectImageModal/SelectImageModal';

const PreviewAd = () => {
    const globalContext = useContext(GlobalContext);
    const [loading, setLoading] = useState(false);
    const [showWatermark, setShowWatermark] = useState(false);
    const [showControls, setShowControls] = useState(false);
    const [canvasHeight, setcanvasHeight] = useState(AVAILALBE_SIZES[globalContext.selectedSize].calculateCanvasHieghtFunc());
    let history = useHistory();
    const unsplash = createApi({
        accessKey: UNSPLASH_API_KEY
    });

    const containerHieght = window.innerHeight;

    const swipeConfig = {
        delta: 10,                            // min distance(px) before a swipe starts
        preventDefaultTouchmoveEvent: false,  // call e.preventDefault *See Details*
        trackTouch: true,                     // track touch input
        trackMouse: false,                    // track mouse input
        rotationAngle: 0,                     // set a rotation angle
    }

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

        // if no context, send to create page
        if (!globalContext.productData) {
            history.push('/');
        }

        setTimeout(() => {
            setShowControls(false);
        }, 4000);

        setTimeout(() => {
            setShowControls(true);
        }, 500);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        setcanvasHeight(AVAILALBE_SIZES[globalContext.selectedSize].calculateCanvasHieghtFunc());
        document.getElementById('preview-ad-ctrn-id').style.fontSize = AVAILALBE_SIZES[globalContext.selectedSize].remFontSize;
    }, [globalContext.selectedSize]);

    useEffect(() => {
        if (globalContext.productData) {
            const selectedTemplateObj = TEMPLATES[globalContext.selectedTemplate];
            let selectedThemeColor = localStorage.getItem('selectedThemeColor');
            let rgbColorStr = hexToRgbA(selectedThemeColor, 1);
            let finalColor;

            if (selectedTemplateObj.colorPreference === 0) {
                finalColor = selectedThemeColor;
            } else if (lightOrDark(rgbColorStr) !== selectedTemplateObj.colorPreference) {
                finalColor = changeColorTone(selectedThemeColor, selectedTemplateObj.colorPreference * selectedTemplateObj.colorTone)
            } else {
                finalColor = selectedThemeColor;
            }
            // lightOrDark(rgbColorStr);
            globalContext.setselectedThemeColor(finalColor);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [globalContext.selectedTemplate]);

    const downloadScreenshot = (params) => {
        setShowWatermark(true);
        setLoading(true);

        // Send data to google analytics
        firebase.analytics().logEvent(GAEvents.template_downloaded.title, {
            [GAEvents.template_downloaded.params.template_id]: globalContext.selectedTemplate,
            [GAEvents.template_downloaded.params.template_color]: globalContext.selectedThemeColor
        });

        // To track unsplash image download as per their guidelines
        globalContext.selectedUnsplashPhoto && unsplash.photos.trackDownload({
            downloadLocation: globalContext.selectedUnsplashPhoto.links.download_location,
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

        domtoimage.toPng(node, param)
            .then(function (dataUrl) {
                if (isSafari()) {
                    // Need to call domtoimage again due to Safari issue
                    setTimeout(() => {
                        domtoimage.toPng(node, param)
                            .then(function (dataUrlInner) {
                                simulateDownload(dataUrlInner);
                            });
                    }, 1000);
                } else {
                    simulateDownload(dataUrl);
                }
            });
    }

    const simulateDownload = (dataUrl) => {
        var link = document.createElement('a');
        link.download = new Date().getTime();
        link.href = dataUrl;
        link.click();
        setLoading(false);
        setShowWatermark(false);
    }

    const goToCreateAd = () => {
        history.push('/')
    }

    const getSelectedTemplateComponent = () => {
        let SelectedTemplate = TEMPLATES[globalContext.selectedTemplate].component;
        return <SelectedTemplate />
    }

    const toggleControls = (e) => {
        setShowControls(!showControls);
    }

    const handleColorChange = (newColor) => {
        window.$('#selectColorModal').modal('hide');
        setShowControls(false);
        globalContext.setselectedThemeColor(newColor.hex);
        localStorage.setItem('selectedThemeColor', newColor.hex);
    }

    const handleTemplateChange = (templateId) => {
        setTimeout(() => {
            setShowControls(false);
        }, 100);
        globalContext.setSelectedTemplate(templateId);
    }

    const handleChangeTemplate = (type) => {
        let templatesArr = [];
        Object.keys(TEMPLATES).forEach(function (key) {
            if (TEMPLATES[key].status === 'ACTIVE') {
                templatesArr.push(TEMPLATES[key]);
            }
        });

        const selectedTemplateIndex = templatesArr.findIndex((item) => item.id === globalContext.selectedTemplate);

        if (type === 'NEXT') {
            if (selectedTemplateIndex === (templatesArr.length - 1)) {
                globalContext.setSelectedTemplate(templatesArr[0].id);
            } else {
                let newIndex = selectedTemplateIndex + 1;
                globalContext.setSelectedTemplate(templatesArr[newIndex].id);
            }
        } else {
            if (selectedTemplateIndex === 0) {
                globalContext.setSelectedTemplate(templatesArr[templatesArr.length - 1].id);
            } else {
                let newIndex = selectedTemplateIndex - 1;
                globalContext.setSelectedTemplate(templatesArr[newIndex].id);
            }
        }
    }

    const swipeHandlers = useSwipeable({
        onSwipedLeft: (eventData) => handleChangeTemplate('NEXT'),
        onSwipedRight: (eventData) => handleChangeTemplate('PREV'),
        ...swipeConfig,
    });

    const updatePicture = (file, setFieldValue, source) => {
        if (source !== 'FROM_INTERNET') {
            var reader = new FileReader();
            reader.onload = function (event) {
                globalContext.setSelectedUnsplashPhoto(null);
                globalContext.setProductData({ ...globalContext.productData, productImage: event.target.result });

                // Set background color based on the image selected
                const img = document.createElement("img");
                img.src = event.target.result;
                setTimeout(() => {
                    let imageColorHex = getAverageRGB(img);
                    globalContext.setselectedThemeColor(imageColorHex);
                    localStorage.setItem('selectedThemeColor', imageColorHex);
                }, 100);

            };
            reader.readAsDataURL(file);
        } else {
            globalContext.setselectedThemeColor(file.color);
            localStorage.setItem('selectedThemeColor', file.color);
            globalContext.setSelectedUnsplashPhoto(file);
            globalContext.setProductData({ ...globalContext.productData, productImage: file.urls.regular });
        }
        setTimeout(() => {
            setShowControls(false);
        }, 200);
    };

    const handleSizeChange = (sizeId) => {
        window.$('#selectSizeModal').modal('hide');
        globalContext.setselectedSize(sizeId);
        setTimeout(() => {
            setShowControls(false);
        }, 200);
    }

    return (
        <div id="preview-ad-ctrn-id" {...swipeHandlers} onClick={toggleControls} className="preview-ad-ctnr d-flex align-items-center" style={{ height: containerHieght }}>
            {loading && <Loading fullScreen={true}></Loading>}
            {globalContext.productData && <>
                <div style={{ height: canvasHeight }} className="d-flex flex-column previewAd" id="html-content-holder">
                    <small className={'logo-badge ' + (showWatermark ? 'd-block' : 'd-none')}>made with createAwesomeAds.com</small>
                    {getSelectedTemplateComponent()}
                </div>

                {/* Previous Next btn */}
                <input type="image" className={"prev-btn " + (showControls ? 'fadeIn' : 'fadeOut')} alt="Previous"
                    src={prevNextBtn} onClick={() => { handleChangeTemplate('PREV') }}></input>
                <input type="image" className={"next-btn " + (showControls ? 'fadeIn' : 'fadeOut')} alt="Next"
                    src={prevNextBtn} onClick={() => { handleChangeTemplate('NEXT') }}></input>


                {globalContext.selectedUnsplashPhoto && <div className={"unsplash-attr-ctrn " + (showControls ? 'fadeIn' : 'unsplash-attr-ctrn-fadeOut')} >
                    <div>Photo by <a rel="noreferrer" target="_blank" href={`https://unsplash.com/@${globalContext.selectedUnsplashPhoto.user.username}?utm_source=${UNSPLASH_APP_NAME}&utm_medium=referral`}>{globalContext.selectedUnsplashPhoto.user.name}</a> on <a target="_blank" rel="noreferrer" href={`https://unsplash.com/?utm_source=${UNSPLASH_APP_NAME}&utm_medium=referral`}>Unsplash</a></div>
                </div>}

                <div className={"tabs-wrapper " + (showControls ? 'fadeIn' : 'fadeOut')}>
                    <PreviewTabs
                        handleBgTap={() => { window.$('#selectImageModal').modal('show'); }}
                        handleTextTap={() => { goToCreateAd() }}
                        handleColorTap={() => { window.$('#selectColorModal').modal('show') }}
                        handleSizeTap={() => { window.$('#selectSizeModal').modal('show') }}
                        handleDownloadtap={() => { downloadScreenshot() }}
                    />
                </div>
                <SelectImageModal updatePicture={updatePicture} setFieldValue={null} />
                <TemplateSelectionModal handleTemplateChange={handleTemplateChange} />
                <SelectColorModal handleColorChange={handleColorChange} />
                <SelectSizeModal handleSizeChange={handleSizeChange} />
            </>}
        </div>);
}

export default PreviewAd;