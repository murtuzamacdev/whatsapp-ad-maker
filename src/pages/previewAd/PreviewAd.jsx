import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import './PreviewAd.scss';
import whatsappLogo from '../../assets/images/logos_whatsapp.png';
import downloadBtn from '../../assets/images/downloadBtn.png';
import editBtn from '../../assets/images/editBtn.png';
import backdrop from '../../assets/images/backdrop.png';
import domtoimage from 'dom-to-image';

const PreviewAd = () => {
    const [productData, setProductData] = useState(null);
    let history = useHistory();

    useEffect(() => {
        let data = JSON.parse(localStorage.getItem('productData'));
        if (data) {
            setProductData(data);
        } else {
            history.push('createAd');
        }
    }, [])

    const downloadScreenshot = (params) => {
        const scale = 5
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
                link.download = 'my-image-name.jpeg';
                link.href = dataUrl;
                link.click();
            });

        // html2canvas(document.querySelector("#html-content-holder"), {scale:4}).then(canvas => {
        //     let x = canvas.toDataURL("image/png");
        //     var y = x.replace(/^data:image\/png/, "data:application/octet-stream");
        //     console.log(y)
        //     var a = document.createElement("a"); //Create <a>
        //     a.href = y; //Image Base64 Goes here
        //     a.download = "Image.png"; //File name Here
        //     a.click(); //Downloaded file
        //     // document.body.appendChild(canvas)
        // });
    }

    const goToCreateAd = () => {
        history.push('createAd')
    }

    return (
        <>{productData && <>
            <div className="d-flex flex-column previewAd p-4" id="html-content-holder">
                <div className="card p-0 main-card">
                    {/* Main Image */}
                    <div style={{ minHeight: '60%', flexGrow: 1 }} className="d-flex product-image-card justify-content-center p-0">
                        <img className="product-image" src={productData.productImage} />
                        <img className="product-image-backdrop" src={backdrop} />
                        <div className="d-flex name-price-ctnr product-name-card justify-content-between align-items-center flex-row">
                            <p style={{ flexGrow: 0.7 }} className="m-0 product-name">{productData.productName}</p>
                            {productData.productPrice !== '' && <p className="m-0 product-price pt-2 pb-2">₹ {productData.productPrice}</p>}
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
                                <img src={whatsappLogo} height="24px" width="24px"></img>
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