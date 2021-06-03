import React, { useState } from "react";
import './CreateAd.scss';

const CreateAd = () => {
    const [selectedProductImage, setSelectedProductImage] = useState(null);

    const updatePicture = (file) => {
        var reader = new FileReader();
        reader.onload = function (event) {
            setSelectedProductImage(event.target.result);
        };
        reader.readAsDataURL(file);
    };

    return (<div className="mb-5 createAd">
        {/* Main Image */}
        <div className="card product-image-card mb-3 justify-content-center p-0">
            {selectedProductImage === null ?
                <div className="d-flex justify-content-center">
                    <label class="btn btn-default buttons-ctrns p-0 w-auto">
                        <div className="upload-button pl-5 pr-5 image-select-button">Select Product Image</div>
                        <input type="file" hidden onChange={(data) => { updatePicture(data.target.files[0]); }} />
                    </label>
                </div>
                :
                <>
                    <img src={selectedProductImage} />
                    <div className="d-flex justify-content-center change-image">
                    <label class="btn btn-default buttons-ctrns p-0 w-auto">
                        <div className="upload-button pl-5 pr-5 image-select-button">Change Product Image</div>
                        <input type="file" hidden onChange={(data) => { updatePicture(data.target.files[0]); }} />
                    </label>
                    </div>
                </>

            }
        </div>

        {/* Product name */}
        <div className="card product-name-card justify-content-center align-items-center mb-3 flex-row">
            <input
                type="text"
                placeholder="Product name"
                class="product-name mr-3"
            />
            <input
                type="text"
                placeholder="Price in Rs."
                className="ml-2"
                class="product-price"
            />
        </div>

        {/* Product descrption */}
        <div className="card product-desc-card justify-content-center align-items-center mb-3">
            <input
                type="textarea"
                rows="2"
                placeholder="Product description"
            />
        </div>

        {/* Business name */}
        <div className="card business-name-card justify-content-center align-items-center mb-3">
            <input
                type="text"
                placeholder="Business name"
            />
        </div>

        {/* whatsapp number */}
        <div className="card whatsapp-number-card justify-content-center align-items-center mb-3">
            <input
                type="text"
                placeholder="Whatsapp number"
            />
        </div>

        <div className="d-flex justify-content-around btns-ctnr pb-3">
            <div className="buttons-ctrns mr-1"> <button className="reset-button ">Reset</button></div>
            <div className="buttons-ctrns ml-1"> <button className="preview-button ">Preview</button></div>

        </div>

    </div>);
}

export default CreateAd;