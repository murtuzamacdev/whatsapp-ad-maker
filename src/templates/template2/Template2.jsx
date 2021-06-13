import './Template2.scss';
import currencies from '../../configs/currencies.json';

// Assets
import whatsappLogo from '../../assets/images/logos_whatsapp.png';

const Template2 = ({ productData }) => {
    const productDescDivHeight = window.innerHeight * (122 / 812);

    return (<div className="d-flex flex-column template2-ctrn pt-4 pb-2 pl-3 pr-3 text-center">

        <div className="top-part d-flex flex-column justify-content-between">
            <div className="product-name mt-4">{productData.productName}</div>
            {productData.productDescription !== '' && <div className="product-description p-3" style={{ maxHeight: `${productDescDivHeight}px` }}>{productData.productDescription}</div>}
            {productData.productPrice !== '' && <div class="img-box-ctrn mt-4">
                <img src={productData.productImage} alt={'product'} className="p-1"/>
                <div className="product-price p-2 pl-3 pr-3"><small>{currencies.find((item) => item.code === productData.currencyCode).symbol}</small> {productData.productPrice}<small>.00</small></div>
            </div>}
        </div>

        <div class="bottom-part p-4 pb-0">
            <div class="order-now mb-2">Order Now</div>
            {(productData.sellerName !== '' || productData.whatsappNumber !== '') && <div className="seller-info-ctrn p-3">
                {productData.sellerName !== '' && <div className='seller-name single-line'>{productData.sellerName}</div>}
                {productData.whatsappNumber !== '' && <div className="d-flex mt-1">
                    <img src={whatsappLogo} height="24px" width="24px" alt="whatsappLogo"></img>
                    <p className="whatsapp-number m-0 ml-2">{productData.whatsappNumber}</p>
                </div>}
            </div>}
        </div>

    </div>);
}

export default Template2;