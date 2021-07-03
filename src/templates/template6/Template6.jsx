import React, { useContext } from "react";
import './Template6.scss';
import { GlobalContext } from '../../context/global.context';
import currencies from '../../configs/currencies.json';

// Components
import Dots from '../../components/dots/Dots';

// Assets
import whatsappLogo from '../../assets/images/logos_whatsapp.svg';
import backdrop from '../../assets/images/backdrop.svg';

const Template6 = () => {
    const globalContext = useContext(GlobalContext);
    const productNameArr = globalContext.productData.productName.split(" ");

    return (<div style={{ backgroundImage: "url(" + globalContext.productData.productImage + ")" }} className="temp6-ctnr">
        <img className="backdrop-top" src={backdrop} alt="productBackdrop" />

        <div className="product-name mt-4" style={{ color: globalContext.productData.selectedBackgroundColor }}>
            {productNameArr.map((word, index) => <span
                style={{
                    color: index % 2 !== 0 ? 'white' : globalContext.productData.selectedBackgroundColor,
                    fontSize: `${(1.8 + ((1 / (productNameArr.length)) * (index + 1))).toString()}rem`
                }}
                className={index % 2 === 0 ? 'text-with-shadow' : 'text-with-border'}
            >
                {word} <br /></span>)}
        </div>

        {globalContext.productData.productDescription !== '' && <div className="d-flex justify-content-center"><p className='product-desc ml-5 mr-5 mt-3  pl-3 pr-3 pt-2 pb-2'>{globalContext.productData.productDescription}</p></div>}

        {globalContext.productData.pitchText !== '' && <p className="pitch-text pl-4 pr-4 pt-1 pb-1 text-with-border" style={{ backgroundColor: globalContext.productData.selectedBackgroundColor }}>{globalContext.productData.pitchText}</p>}

        {(globalContext.productData.sellerName !== '' || globalContext.productData.whatsappNumber !== '' || globalContext.productData.productPrice !== '') && <div className={"d-flex p-2 align-items-end p-s-w-ctnr w-100 " + (globalContext.productData.productPrice === '' ? 'justify-content-end' : 'justify-content-between')}>
            {globalContext.productData.productPrice !== '' && <div className="product-price single-line pl-2 pr-2"><span className='currency-symbol'>{currencies.find((item) => item.code === globalContext.productData.currencyCode).symbol}</span> <span style={{ color: globalContext.productData.selectedBackgroundColor }}>{globalContext.productData.productPrice}</span></div>}
            <div className="seller-info-ctrn">
                {globalContext.productData.sellerName !== '' && <div className='seller-name single-line pl-4 pr-4 pt-2 pb-2'>{globalContext.productData.sellerName}</div>}
                {globalContext.productData.whatsappNumber !== '' && <div style={{ backgroundColor: globalContext.productData.selectedBackgroundColor }} className="d-flex mt-0 align-items-center justify-content-center contact-ctnr pl-3 pr-3 ">
                    <img src={whatsappLogo} height="20px" width="20px" alt="whatsappLogo"></img>
                    <p className="whatsapp-number ml-2 pt-2 pb-2 m-0 text-with-border">{globalContext.productData.whatsappNumber}</p>
                </div>}
            </div>
        </div>}

        <div className="white-dots"><Dots color={'white'} /></div>
        <div className="color-dots"><Dots color={globalContext.productData.selectedBackgroundColor} /></div>
        {/* <img className="backdrop-bottom" src={backdrop} alt="productBackdrop" /> */}
    </div>);
}

export default Template6;