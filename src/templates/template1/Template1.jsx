import React, { useContext } from "react";
import './Template1.scss';
import currencies from '../../configs/currencies.json';
import { GlobalContext } from '../../context/global.context';
import {hexToRgbA} from '../../utility';

// Assets
import whatsappLogo from '../../assets/images/logos_whatsapp.svg';

const Template1 = () => {
    const globalContext = useContext(GlobalContext);

    return (<div style={{ backgroundImage: "url(" + globalContext.state.productData.productImage + ")" }} className="temp1-ctnr">
        {globalContext.state.productData.productPrice !== '' && <div className="mt-3 d-flex justify-content-center single-line"><div className="product-price pt-2 pb-2 pl-4 pr-4"><small>{currencies.find((item) => item.code === globalContext.state.productData.currencyCode).symbol}</small> {globalContext.state.productData.productPrice}</div></div>}
        <div className="mb-3 bottom-ctrn">
            <p className="product-name pt-2 pb-2 pl-1 pr-1 m-0">{globalContext.state.productData.productName}</p>
            <div className="purple-ctnr pt-4 pb-4 pl-3 pr-3" style={{ backgroundColor: hexToRgbA(globalContext.state.productData.selectedBackgroundColor, 0.75)  }}>
                {globalContext.state.productData.productDescription !== '' && <div className="product-desc mt-4 mb-1 pl-2" >{globalContext.state.productData.productDescription}</div>}
                <div className={'d-flex align-items-center ' + (globalContext.state.productData.pitchText === '' ? 'justify-content-end' : 'justify-content-between')}>

                    {globalContext.state.productData.pitchText !== '' && <div className="order-now pl-2 pr-2">{globalContext.state.productData.pitchText}</div>}
                    {(globalContext.state.productData.sellerName !== '' || globalContext.state.productData.whatsappNumber !== '') && <>

                        <div className="seller-info-ctrn">
                            {globalContext.state.productData.sellerName !== '' && <div className='seller-name single-line'>{globalContext.state.productData.sellerName}</div>}
                            {globalContext.state.productData.whatsappNumber !== '' && <div className="d-flex mt-1 align-items-center">
                                <img src={whatsappLogo} height="24px" width="24px" alt="whatsappLogo"></img>
                                <p className="whatsapp-number m-0 ml-2">{globalContext.state.productData.whatsappNumber}</p>
                            </div>}
                        </div>
                    </>}

                </div>
            </div>
        </div>
    </div>);
}

export default Template1;