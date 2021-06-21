import React, { useContext } from "react";
import './Template3.scss';
import currencies from '../../configs/currencies.json';
import { GlobalContext } from '../../context/global.context';

// Assets
import whatsappLogo from '../../assets/images/logos_whatsapp.png';
import topRightLines from '../../assets/images/templates/template3/topRightLines.png'

const Template3 = () => {
    const globalContext = useContext(GlobalContext);
    const productDescDivHeight = window.innerHeight * (122 / 812);

    return (<div className="template3-ctrn d-flex flex-column pt-4 pb-4">

        <div className="product-image-ctrn">
            <img src={topRightLines} alt="lines" class="top-right-lines"/>
            <img src={topRightLines} alt="lines" class="bottom-left-lines"/>
            <div className="child1" style={{ backgroundImage: "url(" + globalContext.state.productData.productImage + ")" }}>
                {globalContext.state.productData.productPrice !== '' && <div className="mt-2 d-flex justify-content-end single-line mr-2"><div className="product-price pt-1 pb-1 pl-3 pr-3" style={{ backgroundColor: globalContext.state.productData.selectedBackgroundColor }}><small>{currencies.find((item) => item.code === globalContext.state.productData.currencyCode).symbol}</small> {globalContext.state.productData.productPrice}</div></div>}
                <div className="product-name d-flex pl-2 pr-2 mb-2"><div className="child1 pl-2 pr-2">{globalContext.state.productData.productName}</div></div>
            </div>

        </div>

        <div className="bottom-ctrn d-flex">
            <div className="purple-ctnr  pl-3 pr-3">
                {globalContext.state.productData.productDescription !== '' && <div className="product-desc pl-2 mt-4 mb-3" style={{ maxHeight: `${productDescDivHeight}px` }}>{globalContext.state.productData.productDescription}</div>}
                <div className={'d-flex align-items-center ' + (globalContext.state.productData.pitchText ==='' ? 'justify-content-end' : 'justify-content-between')}>
                {globalContext.state.productData.pitchText !== '' && <div className="order-now pl-2 pr-2">{globalContext.state.productData.pitchText}</div>}
                    {(globalContext.state.productData.sellerName !== '' || globalContext.state.productData.whatsappNumber !== '') && <>
                        <div className="seller-info-ctrn">
                            {globalContext.state.productData.sellerName !== '' && <div className='seller-name single-line'>{globalContext.state.productData.sellerName}</div>}
                            {globalContext.state.productData.whatsappNumber !== '' && <div className="d-flex mt-1 align-items-center">
                                <img src={whatsappLogo} height="24px" width="24px" alt="whatsappLogo"></img>
                                <p className="whatsapp-number m-0 ml-2">{globalContext.state.productData.whatsappNumber}</p>
                            </div>}
                        </div></>}

                </div>
            </div>
        </div>

        <div id="tri-top-right" style={{ borderTopColor: globalContext.state.productData.selectedBackgroundColor }}></div>
        <div className='child-ctnr'> <div id="tri-middle-black"></div> </div>
        <div id="tri-bottom-left" style={{ borderBottomColor: globalContext.state.productData.selectedBackgroundColor }}></div>
        <div id="tri-bottom-right" style={{ borderBottomColor: globalContext.state.productData.selectedBackgroundColor }}></div>
    </div>);
}

export default Template3;