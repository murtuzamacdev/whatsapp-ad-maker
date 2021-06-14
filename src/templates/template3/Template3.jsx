import './Template3.scss'
import currencies from '../../configs/currencies.json';

// Assets
import whatsappLogo from '../../assets/images/logos_whatsapp.png';
import topRightLines from '../../assets/images/templates/template3/topRightLines.png'

const Template3 = ({ productData }) => {
    const productDescDivHeight = window.innerHeight * (122 / 812);

    return (<div className="template3-ctrn d-flex flex-column pt-4 pb-4">

        <div className="product-image-ctrn">
            <img src={topRightLines} alt="lines" class="top-right-lines"/>
            <img src={topRightLines} alt="lines" class="bottom-left-lines"/>
            <div className="child1" style={{ backgroundImage: "url(" + productData.productImage + ")" }}>
                {productData.productPrice !== '' && <div className="mt-2 d-flex justify-content-end single-line mr-2"><div className="product-price pt-1 pb-1 pl-3 pr-3" style={{ backgroundColor: productData.selectedBackgroundColor }}><small>{currencies.find((item) => item.code === productData.currencyCode).symbol}</small> {productData.productPrice}<small>.00</small></div></div>}
                <div className="product-name m-2 pl-2">{productData.productName}</div>
            </div>

        </div>

        <div className="bottom-ctrn d-flex">
            <div className="purple-ctnr  pl-3 pr-3">
                {productData.productDescription !== '' && <div className="product-desc pl-2 mt-4 mb-3" style={{ maxHeight: `${productDescDivHeight}px` }}>{productData.productDescription}</div>}
                <div className="d-flex justify-content-between align-items-center">
                    {(productData.sellerName !== '' || productData.whatsappNumber !== '') && <>
                        <div className="order-now pl-2 pr-2">Order Now</div>
                        <div className="seller-info-ctrn">
                            {productData.sellerName !== '' && <div className='seller-name single-line'>{productData.sellerName}</div>}
                            {productData.whatsappNumber !== '' && <div className="d-flex mt-1 align-items-center">
                                <img src={whatsappLogo} height="24px" width="24px" alt="whatsappLogo"></img>
                                <p className="whatsapp-number m-0 ml-2">{productData.whatsappNumber}</p>
                            </div>}
                        </div></>}

                </div>
            </div>
        </div>

        <div id="tri-top-right" style={{ borderTopColor: productData.selectedBackgroundColor }}></div>
        <div className='child-ctnr'> <div id="tri-middle-black"></div> </div>
        <div id="tri-bottom-left" style={{ borderBottomColor: productData.selectedBackgroundColor }}></div>
        <div id="tri-bottom-right" style={{ borderBottomColor: productData.selectedBackgroundColor }}></div>
    </div>);
}

export default Template3;