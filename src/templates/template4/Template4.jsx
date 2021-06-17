import { useEffect, useState, useContext } from 'react';
import './Template4.scss';
import currencies from '../../configs/currencies.json';
import { GlobalContext } from '../../context/global.context';

// Assets
import whatsappLogo from '../../assets/images/logos_whatsapp.png';

const Template4 = () => {
    const globalContext = useContext(GlobalContext);
    const productDescDivHeight = window.innerHeight * (122 / 812);
    const [secondaryBgForGradient, setSecondaryBgForGradient] = useState('#ffffff');

    useEffect(() => {
        setSecondaryBgForGradient(generateColorHex());
    }, [])

    useEffect(() => {
        setSecondaryBgForGradient(generateColorHex());
    }, [globalContext.state.productData.selectedBackgroundColor])

    const generateColorHex = () => {
        const randomColor = Math.floor(Math.random() * 16777215).toString(16);
        return "#" + randomColor;
    }

    return (<div style={{ backgroundImage: "url(" + globalContext.state.productData.productImage + ")" }} className="temp4-ctnr">

        {/* Shapes */}
        <div className="price-ctrn" style={{ background: 'linear-gradient(233.12deg, ' + globalContext.state.productData.selectedBackgroundColor + ' 33.2%, ' + secondaryBgForGradient + ' 75.65%)' }}> </div>
        <div className='content-ctrn' style={{ background: 'linear-gradient(233.12deg, ' + globalContext.state.productData.selectedBackgroundColor + ' 33.2%, ' + secondaryBgForGradient + ' 75.65%)' }}></div>

        <div className="mt-3 d-flex justify-content-center single-line flex-column top-part align-items-center price-order">
            <div className="order-now pl-5 pr-2">Order Now</div>
            {globalContext.state.productData.productPrice !== '' && <div className="product-price pt-2 pb-2 pl-4 pr-4"><small>{currencies.find((item) => item.code === globalContext.state.productData.currencyCode).symbol}</small> {globalContext.state.productData.productPrice}<small>.00</small></div>}
        </div>

        <div className="bottom-ctrn">

            <div className="purple-ctnr pt-4 pb-4 pl-3 pr-3">
                <p className="product-name p-2 m-0">{globalContext.state.productData.productName}</p>
                {globalContext.state.productData.productDescription !== '' && <div className="product-desc mt-4 mb-3 pl-2" style={{ maxHeight: `${productDescDivHeight}px` }}>{globalContext.state.productData.productDescription}</div>}
                <div className="d-flex justify-content-end align-items-center">

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

export default Template4;