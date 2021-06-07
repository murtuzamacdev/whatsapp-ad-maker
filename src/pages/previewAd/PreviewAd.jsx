import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import './PreviewAd.scss';
import whatsappLogo from '../../assets/images/logos_whatsapp.png';
import downloadBtn from '../../assets/images/downloadBtn.png';
import editBtn from '../../assets/images/editBtn.png';
import backdrop from '../../assets/images/backdrop.png';
import domtoimage from 'dom-to-image';
import Loading from '../../components/loading/Loading';
import { GlobalContext } from '../../context/global.context';
import currencies from '../../configs/currencies.json';

const PreviewAd = () => {
    const globalContext = useContext(GlobalContext);
    const [productData, setProductData] = useState(null);
    const [loading, setLoading] = useState(false);
    let history = useHistory();

    useEffect(() => {
        let data = globalContext.state.productData;
        if (data) {
            setProductData(data);
        } else {
            history.push('createAd');
        }
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

    return (
        <>
        {loading && <Loading></Loading>}
        {productData && <>
            <div className="d-flex flex-column previewAd p-4" id="html-content-holder">
                <div className="card p-0 main-card">
                    {/* Main Image */}
                    <div style={{ minHeight: '60%', flexGrow: 1 }} className="d-flex product-image-card justify-content-center p-0">
                        <img className="product-image" src={productData.productImage} alt="productImage"/>
                        <img className="product-image-backdrop" src={backdrop} alt="productBackdrop"/>
                        <div className="d-flex name-price-ctnr product-name-card justify-content-between align-items-center flex-row">
                            <p style={{ flexGrow: 0.7 }} className="m-0 product-name">{productData.productName}</p>
                            {productData.productPrice !== '' && <p className="m-0 product-price pt-2 pb-2">{currencies.find((item) => item.code === productData.currencyCode).symbol} {productData.productPrice}</p>}
                        </div>

                    </div>

                    <div style={{ maxHeight: '40%' }} className="p-3">
                        {/* Product descrption */}
                        {productData.productDescription !== '' && <div style={{ flex: 1 }} className=" product-desc-card justify-content-center mb-3">
                            <p className="m-0 product-desc">{productData.productDescription}</p>
                        </div>}

                        {/* Business name */}
                        {(productData.sellerName !== '' || productData.whatsappNumber !== '') && <div style={{ flex: 1 }} className=" business-name-card justify-content-center align-items-start">
                            {productData.sellerName !== '' && <p className="store-name m-0">{productData.sellerName}</p>}
                            {productData.whatsappNumber !== '' && <div className="d-flex mt-1">
                                <img src={whatsappLogo} height="24px" width="24px" alt="whatsappLogo"></img>
                                <p className="whatsapp-number m-0 ml-2">{productData.whatsappNumber}</p>
                            </div>}
                        </div>}

                    </div>
                </div>


            </div>
            <input type="image" class="edit-btn" alt="Login"
                src={editBtn} onClick={goToCreateAd}></input>
            <input type="image" class="download-btn" alt="Login"
                src={downloadBtn} onClick={downloadScreenshot}></input></>}

            
        </>);
}

export default PreviewAd;