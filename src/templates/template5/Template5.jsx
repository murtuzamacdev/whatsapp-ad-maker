import './Template5.scss';
import currencies from '../../configs/currencies.json';

// Assets
import backdrop from '../../assets/images/backdrop.png';
import whatsappLogo from '../../assets/images/logos_whatsapp.png';

const Template5 = ({ productData }) => {
    const productDescDivHeight = window.innerHeight * (122 / 812);

    return (<div class="template5-cntr" style={{ backgroundColor: productData.selectedBackgroundColor }}>
        <div className="card p-0 main-card">
            {/* Main Image */}
            <div style={{ minHeight: '60%', flexGrow: 1 }} className="d-flex product-image-card justify-content-center p-0">
                <img className="product-image" src={productData.productImage} alt="productImage" />
                <img className="product-image-backdrop" src={backdrop} alt="productBackdrop" />
                <div className="d-flex name-price-ctnr product-name-card justify-content-between align-items-center flex-column">
                    <p style={{ flexGrow: 0.7 }} className="m-0 product-name">{productData.productName}</p>
                    {productData.productPrice !== '' && <p className="m-0 mt-3 product-price pt-2 pb-2 pl-4 pr-4" style={{ backgroundColor: productData.selectedBackgroundColor }}><small>{currencies.find((item) => item.code === productData.currencyCode).symbol}</small> {productData.productPrice}<small>.00</small></p>}
                </div>

            </div>

            <div style={{ maxHeight: '40%' }} className="p-4">
                {/* Product descrption */}
                {productData.productDescription !== '' && <div style={{ flex: 1 }} className=" product-desc-card justify-content-center mb-3">
                    <p className="m-0 product-desc" style={{ maxHeight: `${productDescDivHeight}px` }}>{productData.productDescription}</p>
                </div>}

                {/* Business name */}
                {(productData.sellerName !== '' || productData.whatsappNumber !== '') && <div style={{ flex: 1 }} className=" business-name-card justify-content-center align-items-start">
                    {productData.sellerName !== '' && <p className="store-name m-0"><small style={{ fontSize: '11px' }}>Order Now </small><br />{productData.sellerName}</p>}
                    {productData.whatsappNumber !== '' && <div className="d-flex mt-1">
                        <img src={whatsappLogo} height="24px" width="24px" alt="whatsappLogo"></img>
                        <p className="whatsapp-number m-0 ml-2">{productData.whatsappNumber}</p>
                    </div>}
                </div>}

            </div>
        </div>
    </div>);
}

export default Template5;