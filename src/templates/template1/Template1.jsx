import './Template1.scss';

// Assets
import whatsappLogo from '../../assets/images/logos_whatsapp.png';

const Template1 = ({ productData }) => {
    return (<div style={{ backgroundImage: "url(" + productData.productImage + ")" }} className="temp1-ctnr d-flex flex-column justify-content-between align-items-center ">
        <div className="mt-3"><div className="product-price pt-2 pb-2 pl-4 pr-4">₹ 22000.00</div></div>
        <div className="mb-3 bottom-ctrn">
            <p className="product-name pt-2 pb-2 pl-1 pr-1">Product </p>
            <div className="purple-ctnr pt-4 pb-4 pl-3 pr-3">
                <div className="product-desc mt-4 mb-3 pl-2">100% Original item. 100% Original item.</div>
                <div className="d-flex justify-content-between align-items-center">
                    <div className="order-now pl-2 pr-2">Order Now</div>
                    <div>
                        <div className='seller-name'>Your Brand Name</div>
                        <div className="d-flex mt-1">
                            <img src={whatsappLogo} height="24px" width="24px" alt="whatsappLogo"></img>
                            <p className="whatsapp-number m-0 ml-2">1234567890</p>
                        </div>
                    </div>
                </div>
            </div>

        </div>



    </div>);
}

export default Template1;