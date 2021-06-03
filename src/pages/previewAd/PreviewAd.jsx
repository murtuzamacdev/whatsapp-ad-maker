import React, { useState } from "react";
import * as htmlToImage from 'html-to-image';
import './PreviewAd.scss';
import html2canvas from 'html2canvas';
import whatsappLogo from '../../assets/images/logos_whatsapp.png';
import downloadBtn from '../../assets/images/downloadBtn.png'

const PreviewAd = () => {

    const [selectedProductImage, setSelectedProductImage] = useState(null);

    const updatePicture = (file) => {
        var reader = new FileReader();
        reader.onload = function (event) {
            setSelectedProductImage(event.target.result);
        };
        reader.readAsDataURL(file);
    };

    const downloadScreenshot = (params) => {
        console.log(document.querySelector("#html-content-holder"))
        html2canvas(document.querySelector("#mainBody")).then(canvas => {
            let x = canvas.toDataURL("image/png");
            var y = x.replace(/^data:image\/png/, "data:application/octet-stream");
            console.log(y)
            var a = document.createElement("a"); //Create <a>
            a.href = y; //Image Base64 Goes here
            a.download = "Image.png"; //File name Here
            a.click(); //Downloaded file
            // document.body.appendChild(canvas)
        }, { useCORS: true, scale: window.devicePixelRatio });
    }

    return (<div className="d-flex flex-column previewAd p-3" id="html-content-holder">
        {/* Main Image */}
        <div style={{ flex: 0.65 }} className="card product-image-card mb-3 justify-content-center p-0">
            <img src={selectedProductImage} />
        </div>

        {/* Product name */}
        <div style={{ flex: 0.09 }} className="card product-name-card justify-content-between align-items-center mb-3 flex-row">
            <p className="m-0 product-name">Awesome Shoes</p>
            <p className="m-0 product-price pl-3 pr-3 pt-2 pb-2">Rs. 3000</p>
        </div>

        {/* Product descrption */}
        <div style={{ flex: 0.15 }} className="card product-desc-card justify-content-center align-items-center mb-3">
            <p className="m-0 product-desc">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s. </p>
        </div>

        {/* Business name */}
        <div style={{ flex: 0.11 }} className="card business-name-card justify-content-center align-items-start">
            <p className="store-name m-0">Best Shoes Store Ever</p>
            <div className="d-flex mt-2">
                <img src={whatsappLogo} height="24px" width="24px"></img>
                <p className="whatsapp-number m-0 ml-2">9054832425</p>
            </div>
        </div>

        <input type="image" class="download-btn" alt="Login"
            src={downloadBtn}></input>

    </div>);
}

export default PreviewAd;