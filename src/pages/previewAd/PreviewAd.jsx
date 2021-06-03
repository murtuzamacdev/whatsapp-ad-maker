import React, { useState } from "react";
import * as htmlToImage from 'html-to-image';
import './PreviewAd.scss';
import html2canvas from 'html2canvas'

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
        <div style={{ flex: 0.7 }} className="card product-image-card mb-3 justify-content-center p-0">
            <img src={selectedProductImage} />
        </div>

        {/* Product name */}
        <div style={{ flex: 0.08 }} className="card product-name-card justify-content-center align-items-center mb-3 flex-row">
            <p className="m-0">Awesome Shoes</p>
            <p className="m-0">Rs. 3000</p>
        </div>

        {/* Product descrption */}
        <div style={{ flex: 0.15 }} className="card product-desc-card justify-content-center align-items-center mb-3">
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
            <button onClick={downloadScreenshot}>click</button>
        </div>

        {/* Business name */}
        <div style={{ flex: 0.05 }} className="card business-name-card justify-content-center align-items-center">
            <p>Best Shoes Store Ever</p>
            <p>9054832425</p>
        </div>

        {/* <div className="d-flex justify-content-around btns-ctnr pb-3">
            <div className="buttons-ctrns mr-1"> <button className="reset-button ">Reset</button></div>
            <div className="buttons-ctrns ml-1"> <button className="preview-button ">Preview</button></div>

        </div> */}

    </div>);
}

export default PreviewAd;