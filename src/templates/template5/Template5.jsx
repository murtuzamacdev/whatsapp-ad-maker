import React, { useContext } from "react";
import './Template5.scss';
import currencies from '../../configs/currencies.json';
import { GlobalContext } from '../../context/global.context';
import {hexToRgbA} from '../../utility';

// Assets
import backdrop from '../../assets/images/backdrop.svg';
import whatsappLogo from '../../assets/images/logos_whatsapp.svg';

const Template5 = () => {
    const globalContext = useContext(GlobalContext);

    return (<div className="template5-cntr" style={{ background: 'linear-gradient( 0.74deg , ' + globalContext.productData.selectedBackgroundColor  + ' 0.59%, ' + hexToRgbA(globalContext.productData.selectedBackgroundColor, 0.7)  + ' 99.01%)' }}>
        <div className="card p-0 main-card">
            {/* Main Image */}
            <div style={{ minHeight: '60%', flexGrow: 1 }} className="d-flex product-image-card justify-content-center p-0">
                <img className="product-image" src={globalContext.productData.productImage} alt="productImage" />
                <img className="product-image-backdrop" src={backdrop} alt="productBackdrop" />
                <div className="d-flex name-price-ctnr product-name-card justify-content-between align-items-center flex-column">
                    <p style={{ flexGrow: 0.7 }} className="product-name mb-2">{globalContext.productData.productName}</p>
                    {globalContext.productData.productPrice !== '' && <p className="m-0 product-price pt-1 pb-2 pl-4 pr-4" style={{ backgroundColor: globalContext.productData.selectedBackgroundColor }}><small>{currencies.find((item) => item.code === globalContext.productData.currencyCode).symbol}</small> {globalContext.productData.productPrice}</p>}
                </div>

            </div>

            <div style={{ maxHeight: '40%' }} className="p-4">
                {/* Product descrption */}
                {globalContext.productData.productDescription !== '' && <div style={{ flex: 1 }} className=" product-desc-card justify-content-center mb-1">
                    <p className="m-0 product-desc">{globalContext.productData.productDescription}</p>
                </div>}

                {/* Business name */}
                {globalContext.productData.pitchText !== '' && <p className='order-now m-0'>{globalContext.productData.pitchText} </p>}
                {(globalContext.productData.sellerName !== '' || globalContext.productData.whatsappNumber !== '') && <div style={{ flex: 1 }} className=" business-name-card justify-content-center align-items-start mt-1">
                    {globalContext.productData.sellerName !== '' && <p className="store-name m-0"> {globalContext.productData.sellerName}</p>}
                    {globalContext.productData.whatsappNumber !== '' && <div className="d-flex">
                        <img src={whatsappLogo} height="24px" width="24px" alt="whatsappLogo"></img>
                        <p className="whatsapp-number m-0 ml-2">{globalContext.productData.whatsappNumber}</p>
                    </div>}
                </div>}

            </div>
        </div>
    </div>);
}

export default Template5;