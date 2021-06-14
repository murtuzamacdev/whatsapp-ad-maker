import './Template1.scss';
import currencies from '../../configs/currencies.json';

// Assets
import whatsappLogo from '../../assets/images/logos_whatsapp.png';

const Template1 = ({ productData }) => {
    const productDescDivHeight = window.innerHeight * (122 / 812);

    return (<div style={{ backgroundImage: "url(" + productData.productImage + ")" }} className="temp1-ctnr">
        {productData.productPrice !== '' && <div className="mt-3 d-flex justify-content-center single-line"><div className="product-price pt-2 pb-2 pl-4 pr-4"><small>{currencies.find((item) => item.code === productData.currencyCode).symbol}</small> {productData.productPrice}<small>.00</small></div></div>}
        <div className="mb-3 bottom-ctrn">
            <p className="product-name pt-2 pb-2 pl-1 pr-1 m-0">{productData.productName}</p>
            <div className="purple-ctnr pt-4 pb-4 pl-3 pr-3" style={{ backgroundColor: productData.selectedBackgroundColor }}>
                {productData.productDescription !== '' && <div className="product-desc mt-4 mb-3 pl-2" style={{ maxHeight: `${productDescDivHeight}px` }}>{productData.productDescription}</div>}
                <div className="d-flex justify-content-between align-items-center">

                    {(productData.sellerName !== '' || productData.whatsappNumber !== '') && <>
                        <div className="order-now pl-2 pr-2">Order Now</div>
                        <div className="seller-info-ctrn">
                            {productData.sellerName !== '' && <div className='seller-name single-line'>{productData.sellerName}</div>}
                            {productData.whatsappNumber !== '' && <div className="d-flex mt-1 align-items-center">
                                <img src={whatsappLogo} height="24px" width="24px" alt="whatsappLogo"></img>
                                <p className="whatsapp-number m-0 ml-2">{productData.whatsappNumber}</p>
                            </div>}
                        </div>
                    </>}

                </div>
            </div>

        </div>



    </div>);
}

export default Template1;