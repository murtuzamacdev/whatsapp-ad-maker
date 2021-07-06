import './SizeSelector.scss';
import { GlobalContext } from '../../context/global.context';
import { AVAILALBE_SIZES } from '../../configs/constants';
import { useContext } from 'react';

const SizeSelector = () => {
    const globalContext = useContext(GlobalContext);

    return (<>
        <div className="size-select-ctrn d-flex">
            <button onClick={() => { globalContext.setselectedSize(AVAILALBE_SIZES.WHATSAPP_STATUS.id) }} >Whatsapp status</button>
            <button onClick={() => { globalContext.setselectedSize(AVAILALBE_SIZES.INSTA_STORY.id) }}>Insta story</button>
            <button onClick={() => { globalContext.setselectedSize(AVAILALBE_SIZES.INSTA_SQUARE.id) }}>Insta square post</button>
            <button onClick={() => { globalContext.setselectedSize(AVAILALBE_SIZES.INSTA_VERTICLE.id) }}>Insta rectangle post</button>
        </div></>
    );
}

export default SizeSelector;