import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import './CreateAd.scss';
import { Form, Formik, Field } from "formik";
import * as Yup from "yup";

const CreateAd = () => {
    const [productData, setProductData] = useState({
        productImage: "",
        productName: "",
        productPrice: "",
        productDescription: "",
        sellerName: "",
        whatsappNumber: ""
    });
    let history = useHistory();

    useEffect(() => {
        let data = JSON.parse(localStorage.getItem('productData'));
        if (data) {
            setProductData(data);
        }
    }, [])

    const updatePicture = (file, setFieldValue) => {
        var reader = new FileReader();
        reader.onload = function (event) {
            setFieldValue('productImage', event.target.result);
        };
        reader.readAsDataURL(file);
    };

    const goToPreviewAd = () => {
        history.push('previewAd')
    }

    const resetFormCustom = (setFieldValue) => {
        setFieldValue('productImage', '');
        setFieldValue('productName', '');
        setFieldValue('productPrice', '');
        setFieldValue('productDescription', '');
        setFieldValue('sellerName', '');
        setFieldValue('whatsappNumber', '');
    }

    return (<div className="mb-5 createAd p-4">

        <Formik
            initialValues={{
                productImage: productData.productImage,
                productName: productData.productName,
                productPrice: productData.productPrice,
                productDescription: productData.productDescription,
                sellerName: productData.sellerName,
                whatsappNumber: productData.whatsappNumber
            }}
            validationSchema={Yup.object().shape({
                productImage: Yup.string().required("Please provide product image"),
                productName: Yup.string().trim().required("Please provide product name"),
                productPrice: Yup.string().trim(),
                productDescription: Yup.string().trim(),
                sellerName: Yup.string().trim(),
                whatsappNumber: Yup.string().trim().max(10),
            })}
            onSubmit={(values) => {
                let data = JSON.stringify(values);
                localStorage.setItem('productData', data);
                history.push('previewAd');
            }}
            enableReinitialize
        >{({ errors, touched, setFieldValue, values, resetForm }) => (
            <Form>
                {/* Main Image */}
                <div className="card product-image-card justify-content-center p-0">
                    {values.productImage === '' ?
                        <div className="d-flex justify-content-center">
                            <label class="btn btn-default buttons-ctrns p-0 w-auto">
                                <div className="upload-button pl-5 pr-5 image-select-button">Select Product Image</div>
                                <input type="file" hidden onChange={(data) => {
                                    updatePicture(data.target.files[0], setFieldValue);
                                }} />
                            </label>
                        </div>
                        :
                        <>
                            <img src={values.productImage} alt="productImage" />
                            <div className="d-flex justify-content-center change-image">
                                <label class="btn btn-default buttons-ctrns p-0 w-auto">
                                    <div className="upload-button pl-5 pr-5 image-select-button">Change Product Image</div>
                                    <input type="file" hidden onChange={(data) => {
                                        updatePicture(data.target.files[0], setFieldValue);
                                    }} />
                                </label>
                            </div>
                        </>
                    }
                </div>
                {errors.productImage && touched.productImage && (
                    <div className="form-error d-block mt-1 ml-2">
                        {errors.productImage}
                    </div>
                )}

                {/* Product name */}
                <div className="card product-name-card justify-content-center align-items-center mt-3">
                    <Field
                        type="text"
                        placeholder="Product name"
                        className="ml-2"
                        class="product-name"
                        name="productName"
                    />
                </div>
                {errors.productName && touched.productName && (
                    <div className="form-error d-block mt-1 ml-2">
                        {errors.productName}
                    </div>
                )}

                {/* Product price */}
                <div className="card product-name-card justify-content-center align-items-center mt-3">
                    <Field
                        type="number"
                        placeholder="Price in Rs. (Optional)"
                        className="ml-2"
                        class="product-price"
                        name="productPrice"
                    />
                </div>

                {/* Product descrption */}
                <div className="card product-desc-card justify-content-center align-items-center mt-3">
                    <Field
                        type="textarea"
                        rows="2"
                        placeholder="Comments or description (Optional)"
                        name="productDescription"
                    />
                </div>

                {/* Business name */}
                <div className="card business-name-card justify-content-center align-items-center mt-3">
                    <Field
                        type="text"
                        placeholder="Business or seller name (Optional)"
                        name="sellerName"
                    />
                </div>

                {/* whatsapp number */}
                <div className="card whatsapp-number-card justify-content-center align-items-center mt-3">
                    <Field
                        type="number"
                        placeholder="Whatsapp number (Optional)"
                        name="whatsappNumber"
                    />
                </div>
                {errors.whatsappNumber && touched.whatsappNumber && (
                    <div className="form-error d-block mt-1 ml-2">
                        {errors.whatsappNumber}
                    </div>
                )}

                <div className="d-flex justify-content-around btns-ctnr pb-3 mt-3">
                    <div className="buttons-ctrns mr-1"> <button type="button" className="reset-button " onClick={() => {resetFormCustom(setFieldValue)}}>Reset</button></div>
                    <div className="buttons-ctrns ml-1"> <button type="submit" className="preview-button ">Preview</button></div>
                </div>
            </Form>
        )}

        </Formik>



    </div>);
}

export default CreateAd;