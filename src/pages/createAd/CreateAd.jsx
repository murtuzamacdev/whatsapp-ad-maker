import React, { useState, useEffect, useContext, useRef } from "react";
import { useHistory } from "react-router-dom";
import './CreateAd.scss';
import { Form, Formik, Field } from "formik";
import * as Yup from "yup";
import { GlobalContext } from '../../context/global.context';
import currencies from '../../configs/currencies.json';
import { CirclePicker } from 'react-color';

const CreateAd = () => {
    const globalContext = useContext(GlobalContext);
    const [productData, setProductData] = useState({
        productImage: "",
        productName: "",
        productPrice: "",
        currencyCode: "INR",
        productDescription: "",
        sellerName: "",
        whatsappNumber: "",
        selectedBackgroundColor: "#607d8b"
    });
    let history = useHistory();
    const ref = useRef(null);

    useEffect(() => {
        let data = globalContext.state.productData;
        if (data) {
            setProductData(data);
        } else {
            let _data = JSON.parse(localStorage.getItem('productData'));
            _data && setProductData({ ...productData, ..._data });
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const updatePicture = (file, setFieldValue) => {
        var reader = new FileReader();
        reader.onload = function (event) {
            setFieldValue('productImage', event.target.result);
        };
        reader.readAsDataURL(file);
    };

    const resetFormCustom = (setFieldValue) => {
        setFieldValue('productImage', '');
        setFieldValue('productName', '');
        setFieldValue('productPrice', '');
        setFieldValue('currencyCode', 'INR');
        setFieldValue('productDescription', '');
        setFieldValue('sellerName', '');
        setFieldValue('whatsappNumber', '');
        setFieldValue('selectedBackgroundColor', '#607d8b');
        setProductData({ ...productData, selectedBackgroundColor: '#607d8b' })
    }

    const handleChangeComplete = (color, setFieldValue) => {
        setFieldValue('selectedBackgroundColor', color.hex);
        setProductData({ ...productData, selectedBackgroundColor: ref.current.values.selectedBackgroundColor })
    }

    return (<div className="createAd p-3" style={{ backgroundColor: productData.selectedBackgroundColor }}>

        <Formik
            innerRef={ref}
            initialValues={{
                productImage: productData.productImage,
                productName: productData.productName,
                productPrice: productData.productPrice,
                currencyCode: productData.currencyCode,
                productDescription: productData.productDescription,
                sellerName: productData.sellerName,
                whatsappNumber: productData.whatsappNumber,
                selectedBackgroundColor: productData.selectedBackgroundColor
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
                globalContext.setProductData(values);
                let jsonWithoutImage = JSON.parse(JSON.stringify(values)); // Because large images cannot be stored in local storage. So images will stay only in global context variable
                delete jsonWithoutImage.productImage;
                localStorage.setItem('productData', JSON.stringify(jsonWithoutImage));
                history.push('previewAd');
            }}
            enableReinitialize
        >{({ errors, touched, setFieldValue, values, resetForm }) => (
            <Form>
                <div className="card pb-4">
                    {/* Main Image */}
                    <div className=" product-image-card justify-content-center p-0 d-flex flex-column">
                        {(values.productImage === '' || values.productImage === undefined) ?
                            <div className="d-flex justify-content-center">
                                <label class="btn btn-default buttons-ctrns p-0 w-auto">
                                    <div style={{ backgroundColor: productData.selectedBackgroundColor }} className="upload-button pl-5 pr-5 image-select-button ">Select Product Image *</div>
                                    <input type="file" accept="image/png, image/gif, image/jpeg" hidden onChange={(data) => {
                                        updatePicture(data.target.files[0], setFieldValue);
                                    }} />
                                </label>
                            </div>
                            :
                            <>
                                <img src={values.productImage} alt="productImage" />
                                <div className="d-flex justify-content-center change-image">
                                    <label class="btn btn-default buttons-ctrns p-0 w-auto">
                                        <div style={{ backgroundColor: productData.selectedBackgroundColor }} className="upload-button pl-5 pr-5 image-select-button">Change Product Image</div>
                                        <input type="file" accept="image/png, image/gif, image/jpeg" hidden onChange={(data) => {
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
                    <div className=" fields-ctnr mt-4 ">
                        <label>What's your product name? *</label>
                        <Field
                            type="text"
                            placeholder="Example: Nike Shoes"
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
                    <div className=" mt-4 fields-ctnr">
                        <label>What’s the price of this product?</label>
                        <div className="d-flex">
                            <Field as="select" name="currencyCode" className="currency-select mr-3">
                                {currencies.map((currency) => {
                                    return (<option key={currency.code} value={currency.code}>{currency.code}</option>)
                                })}
                            </Field>
                            <Field
                                type="number"
                                placeholder="Example: 5000"
                                className="ml-2"
                                class="product-price"
                                name="productPrice"
                            />
                        </div>

                    </div>

                    {/* Product descrption */}
                    <div className=" mt-4 fields-ctnr">
                        <label>Want to add any description or comment about the product?</label>
                        <Field
                            type="textarea"
                            rows="2"
                            placeholder="Example: It's a quality product..."
                            name="productDescription"
                        />
                    </div>

                    {/* Business name */}
                    <div className="  mt-4 fields-ctnr">
                        <label>Who is selling this product?</label>
                        <Field
                            type="text"
                            placeholder="Individual or Company name"
                            name="sellerName"
                        />
                    </div>

                    {/* whatsapp number */}
                    <div className="  mt-4 fields-ctnr">
                        <label>What’s the seller’s Whatsapp number?</label>
                        <Field
                            type="number"
                            placeholder="10 digits phone number"
                            name="whatsappNumber"
                        />
                    </div>
                    {errors.whatsappNumber && touched.whatsappNumber && (
                        <div className="form-error d-block mt-1 ml-2">
                            {errors.whatsappNumber}
                        </div>
                    )}

                    {/* Color theme */}
                    <div className="  mt-4 fields-ctnr">
                        <label className="pb-2">Select a color theme?</label>
                        <CirclePicker
                            color={values.selectedBackgroundColor}
                            onChangeComplete={(color) => { handleChangeComplete(color, setFieldValue) }}
                        />
                    </div>



                    <p className="form-disclaimer fields-ctnr mt-4 ">Fields marked with * are required. Rest of the fields are optional.</p>

                    <div className="d-flex justify-content-around btns-ctnr pb-3 mt-3">
                        <div className="buttons-ctrns mr-1"> <button type="button" style={{ backgroundColor: productData.selectedBackgroundColor }} className="reset-button " onClick={() => { resetFormCustom(setFieldValue) }}>Reset</button></div>
                        <div className="buttons-ctrns ml-1"> <button type="submit" style={{ backgroundColor: productData.selectedBackgroundColor }} className="preview-button " onClick={() => { window.scrollTo(0, 0); }} >Preview</button></div>
                    </div>

                </div>


            </Form>
        )}

        </Formik>

        <a href="mailto:murtuza.mac.dev@gmail.com" className="contact-link mt-3">Contact developer</a>

    </div>);
}

export default CreateAd;