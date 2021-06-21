import React, { useContext } from "react";
import './Template2.scss';
import currencies from '../../configs/currencies.json';
import { GlobalContext } from '../../context/global.context';

// Assets
import whatsappLogo from '../../assets/images/logos_whatsapp.png';

const Template2 = () => {
    const globalContext = useContext(GlobalContext);
    const productDescDivHeight = window.innerHeight * (122 / 812);

    return (<div className="d-flex flex-column template2-ctrn pt-4 pb-2 pl-3 pr-3 text-center">

        <div className="top-part d-flex flex-column justify-content-between">
            <div className="product-name mt-4">{globalContext.state.productData.productName}</div>
            {globalContext.state.productData.productDescription !== '' && <div className="product-description p-3" style={{ maxHeight: `${productDescDivHeight}px` }}>{globalContext.state.productData.productDescription}</div>}
            <div class="img-box-ctrn mt-4">
                <div className="product-image" style={{ backgroundImage: "url(" + globalContext.state.productData.productImage + ")" }}> </div>
                {globalContext.state.productData.productPrice !== '' && <div className="product-price p-2 pl-3 pr-3"><small>{currencies.find((item) => item.code === globalContext.state.productData.currencyCode).symbol}</small> {globalContext.state.productData.productPrice}</div>}
            </div>
        </div>

        <div class="bottom-part p-4 pb-0">
            {globalContext.state.productData.pitchText !== '' && <div className="order-now mb-2">{globalContext.state.productData.pitchText}</div>}
            {(globalContext.state.productData.sellerName !== '' || globalContext.state.productData.whatsappNumber !== '') && <>

                <div className="seller-info-ctrn p-3">
                    {globalContext.state.productData.sellerName !== '' && <div className='seller-name single-line'>{globalContext.state.productData.sellerName}</div>}
                    {globalContext.state.productData.whatsappNumber !== '' && <div className="d-flex mt-1">
                        <img src={whatsappLogo} height="24px" width="24px" alt="whatsappLogo"></img>
                        <p className="whatsapp-number m-0 ml-2">{globalContext.state.productData.whatsappNumber}</p>
                    </div>}
                </div></>}
        </div>

    </div>);
}

export default Template2;