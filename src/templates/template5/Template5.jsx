import React, { useContext } from "react";
import './Template5.scss';
import currencies from '../../configs/currencies.json';
import { GlobalContext } from '../../context/global.context';

// Assets
import backdrop from '../../assets/images/backdrop.png';
import whatsappLogo from '../../assets/images/logos_whatsapp.png';

const Template5 = () => {
    const globalContext = useContext(GlobalContext);
    const productDescDivHeight = window.innerHeight * (122 / 812);

    function hexToRgbA() {
        var c;
        let hex = globalContext.state.productData.selectedBackgroundColor
        if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
            c = hex.substring(1).split('');
            if (c.length === 3) {
                c = [c[0], c[0], c[1], c[1], c[2], c[2]];
            }
            c = '0x' + c.join('');
            return 'rgba(' + [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',') + ',0.65)';
        }
        throw new Error('Bad Hex');
    }

    return (<div class="template5-cntr" style={{ background: 'linear-gradient( 0.74deg , ' +  hexToRgbA() + ' 0.59%, ' + globalContext.state.productData.selectedBackgroundColor + ' 99.01%)' }}>
        <div className="card p-0 main-card">
            {/* Main Image */}
            <div style={{ minHeight: '60%', flexGrow: 1 }} className="d-flex product-image-card justify-content-center p-0">
                <img className="product-image" src={globalContext.state.productData.productImage} alt="productImage" />
                <img className="product-image-backdrop" src={backdrop} alt="productBackdrop" />
                <div className="d-flex name-price-ctnr product-name-card justify-content-between align-items-center flex-column">
                    <p style={{ flexGrow: 0.7 }} className="m-0 product-name">{globalContext.state.productData.productName}</p>
                    {globalContext.state.productData.productPrice !== '' && <p className="m-0 product-price pt-3 pb-2 pl-4 pr-4" style={{ backgroundColor: globalContext.state.productData.selectedBackgroundColor }}><small>{currencies.find((item) => item.code === globalContext.state.productData.currencyCode).symbol}</small> {globalContext.state.productData.productPrice}<small>.00</small></p>}
                </div>

            </div>

            <div style={{ maxHeight: '40%' }} className="p-4">
                {/* Product descrption */}
                {globalContext.state.productData.productDescription !== '' && <div style={{ flex: 1 }} className=" product-desc-card justify-content-center mb-3">
                    <p className="m-0 product-desc" style={{ maxHeight: `${productDescDivHeight}px` }}>{globalContext.state.productData.productDescription}</p>
                </div>}

                {/* Business name */}
                {(globalContext.state.productData.sellerName !== '' || globalContext.state.productData.whatsappNumber !== '') && <div style={{ flex: 1 }} className=" business-name-card justify-content-center align-items-start">
                    {globalContext.state.productData.sellerName !== '' && <p className="store-name m-0">{globalContext.state.productData.pitchText !== '' && <><small className='order-now'>{globalContext.state.productData.pitchText} </small><br /></>} {globalContext.state.productData.sellerName}</p>}
                    {globalContext.state.productData.whatsappNumber !== '' && <div className="d-flex mt-1">
                        <img src={whatsappLogo} height="24px" width="24px" alt="whatsappLogo"></img>
                        <p className="whatsapp-number m-0 ml-2">{globalContext.state.productData.whatsappNumber}</p>
                    </div>}
                </div>}

            </div>
        </div>
    </div>);
}

export default Template5;