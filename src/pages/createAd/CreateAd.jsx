import React, { useState, useEffect, useContext, useRef } from "react";
import { useHistory } from "react-router-dom";
import './CreateAd.scss';
import { Form, Formik, Field } from "formik";
import * as Yup from "yup";
import { GlobalContext } from '../../context/global.context';
import SelectImageModal from '../../components/modals/selectImageModal/SelectImageModal';
import SelectCurrency from 'react-select-currency';
import { PITCH_DEFAULT } from '../../configs/constants';

// Assets
import nextBtn from '../../assets/images/nextBtn.png';
import resetBtn from '../../assets/images/resetBtn.png';
import logo from '../../assets/images/logo.png';

const CreateAd = () => {
    const globalContext = useContext(GlobalContext);
    const [safeToShowForm, setSafeToShowForm] = useState(false);
    const [showControls, setShowControls] = useState(false);
    const [productData, setProductData] = useState({
        productImage: "",
        productName: "",
        productPrice: "",
        currencyCode: "INR",
        productDescription: "",
        sellerName: "",
        whatsappNumber: "",
        selectedBackgroundColor: "#7986cb",
        pitchText: ''
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
        setSafeToShowForm(true);

        // Closing Modal when back button is clicked instead of routing to back page
        window.onpopstate = e => {
            e.preventDefault();
            if (window.$('#selectImageModal').hasClass('show')) {
                window.$('#selectImageModal').modal('hide');
                history.goForward();
            }
        }

        setTimeout(() => {
            setShowControls(true);
        }, 200);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const updatePicture = (file, setFieldValue, source) => {
        if (source !== 'FROM_INTERNET') {
            var reader = new FileReader();
            reader.onload = function (event) {
                setFieldValue('productImage', event.target.result);
                globalContext.setSelectedUnsplashPhoto(null);
            };
            reader.readAsDataURL(file);
        } else {
            setFieldValue('productImage', file.urls.regular);
            globalContext.setSelectedUnsplashPhoto(file);
        }

    };

    const resetFormCustom = (setFieldValue) => {
        setFieldValue('productImage', '');
        setFieldValue('productName', '');
        setFieldValue('productPrice', '');
        setFieldValue('currencyCode', 'INR');
        setFieldValue('productDescription', '');
        setFieldValue('sellerName', '');
        setFieldValue('whatsappNumber', '');
        setFieldValue('pitchText', '');
        setFieldValue('selectedBackgroundColor', '#7986cb');
        setProductData({ ...productData, selectedBackgroundColor: '#7986cb' })
    }

    return (<div className="createAd p-3" style={{ backgroundColor: productData.selectedBackgroundColor }}>
        {/* <div style={{background: 'radial-gradient(50% 50% at 50% 50%, #FAD7A1 0%, rgba(233, 109, 113, 0.21) 100%)', display: 'inline-block', padding: '0 10px'}}></div> */}
        {safeToShowForm && <Formik
            innerRef={ref}
            initialValues={{
                productImage: productData.productImage,
                productName: productData.productName,
                productPrice: productData.productPrice,
                currencyCode: productData.currencyCode,
                productDescription: productData.productDescription,
                sellerName: productData.sellerName,
                whatsappNumber: productData.whatsappNumber,
                selectedBackgroundColor: productData.selectedBackgroundColor,
                pitchText: productData.pitchText
            }}
            validationSchema={Yup.object().shape({
                productImage: Yup.string().required("Please provide product image"),
                productName: Yup.string().trim().required("Please provide product name"),
                productPrice: Yup.string().trim(),
                productDescription: Yup.string().trim(),
                sellerName: Yup.string().trim(),
                whatsappNumber: Yup.string().trim().max(10, 'Whatsapp number should be 10 digits').min(10, 'Whatsapp number should be 10 digits'),
                pitchText: Yup.string().trim().max(10, 'Pitch should be of 10 characters max'),
            })}
            onSubmit={(values) => {
                globalContext.setProductData(values);
                history.push('previewAd');
            }}
        // enableReinitialize
        >{({ errors, touched, setFieldValue, values, resetForm, handleChange, isValid, dirty, isInitialValid }) => (
            <Form>
                <div className="card pb-4">
                    <img src={logo} alt="Create Awesome Ads Logo" width="170px" />
                    {/* Main Image */}
                    <div className=" product-image-card justify-content-center p-0 d-flex flex-column">
                        {(values.productImage === '' || values.productImage === undefined) ?
                            <div className="d-flex justify-content-center">
                                <label class="btn btn-default buttons-ctrns p-0 w-auto">
                                    <button type="button" data-toggle="modal" data-target="#selectImageModal" style={{ backgroundColor: productData.selectedBackgroundColor }} className="upload-button pl-5 pr-5 image-select-button ">Select Product Image *</button>
                                </label>
                            </div>
                            :
                            <>
                                <img src={values.productImage} alt="productImage" />
                                <div className="d-flex justify-content-center change-image">
                                    <label class="btn btn-default buttons-ctrns p-0 w-auto">
                                        <div type="button" data-toggle="modal" data-target="#selectImageModal" style={{ backgroundColor: productData.selectedBackgroundColor }} className="upload-button pl-5 pr-5 image-select-button">Change Product Image</div>
                                    </label>
                                </div>
                            </>
                        }
                    </div>
                    {errors.productImage && touched.productImage && (
                        <div className="form-error d-block mt-1 ml-3">
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
                        <div className="form-error d-block mt-1 ml-3">
                            {errors.productName}
                        </div>
                    )}

                    {/* Product price */}
                    <div className=" mt-4 fields-ctnr">
                        <label>What’s the price of this product?</label>
                        <div className="d-flex">
                            <SelectCurrency value={values.currencyCode} onChange={(event) => { setFieldValue('currencyCode', event.target.value) }} />
                            <Field
                                type="number"
                                placeholder="5000"
                                className="ml-2"
                                class="product-price"
                                name="productPrice"
                            />
                        </div>

                    </div>

                    {/* Product descrption */}
                    <div className=" mt-4 fields-ctnr">
                        <label>Want to add any description or comment about the product?</label>
                        <textarea
                            type="textarea"
                            rows="3"
                            placeholder="Example: It's a quality product..."
                            name="productDescription"
                            value={values.productDescription}
                            onChange={handleChange}
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
                            type="tel"
                            placeholder="10 digits phone number"
                            name="whatsappNumber"
                            maxLength="10"
                        />
                    </div>
                    {errors.whatsappNumber && touched.whatsappNumber && (
                        <div className="form-error d-block mt-1 ml-3">
                            {errors.whatsappNumber}
                        </div>
                    )}

                    {/* Pitch text */}
                    <div className="  mt-4 fields-ctnr">
                        <label>Add some pitching words?</label>
                        <Field
                            type="text"
                            placeholder="Example: HURRY UP!"
                            name="pitchText"
                        />
                    </div>
                    {errors.pitchText && touched.pitchText && (
                        <div className="form-error d-block mt-1 ml-3">
                            {errors.pitchText}
                        </div>
                    )}
                    <div className="mt-1 fields-ctnr">
                        {PITCH_DEFAULT.map((item) => <button key={item} onClick={() => { setFieldValue('pitchText', item) }} className={'chips p-2 mr-2 mt-2 ' + (item === values.pitchText ? 'selected' : '')} type="button">{item}</button>)}
                    </div>

                    <p className="form-disclaimer fields-ctnr mt-5 ">Fields marked with * are required. Rest of the fields are optional.</p>

                    <div class="btns-ctnr">
                        <button type="button" className={"reset-btn " + (showControls ? 'fadeIn' : 'fadeOut')} alt="Reset Button"
                            src={resetBtn} onClick={() => { resetFormCustom(setFieldValue) }}></button>
                        <button type="submit" className={"next-btn " + (showControls ? 'fadeIn' : 'fadeOut')} alt="Next Button"
                            src={nextBtn} onClick={() => { window.scrollTo(0, 0); }}></button>
                    </div>
                </div>
                <SelectImageModal updatePicture={updatePicture} setFieldValue={setFieldValue} />
                <a href="mailto:murtuza.mac.dev@gmail.com" className="contact-link mt-3">Contact developer</a>
            </Form>
        )}
        </Formik>}

    </div>);
}

export default CreateAd;