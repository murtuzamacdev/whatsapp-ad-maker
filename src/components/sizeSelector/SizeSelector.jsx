import './SizeSelector.scss';
import { GlobalContext } from '../../context/global.context';
import { AVAILALBE_SIZES } from '../../configs/constants';
import { useContext } from 'react';

const SizeSelector = () => {
    const globalContext = useContext(GlobalContext);

    return (<>
        <div className="size-select-ctrn d-flex">
            {Object.keys(AVAILALBE_SIZES).map((key, i) => (
                    <button
                        className="size-tile"
                        style={{
                            height: AVAILALBE_SIZES[key].demoTileHieght,
                            backgroundColor: (globalContext.selectedSize === AVAILALBE_SIZES[key].id) ? 'white' : '#CDCDCD',
                            color: (globalContext.selectedSize === AVAILALBE_SIZES[key].id) ? 'black' : 'rgba(0, 0, 0, 0.45)'
                        }}
                        onClick={() => { globalContext.setselectedSize(AVAILALBE_SIZES[key].id) }} >
                            <img src={AVAILALBE_SIZES[key].icon} alt={AVAILALBE_SIZES[key].name} className="mb-2"/>
                        <p className="mb-0">{AVAILALBE_SIZES[key].name}</p></button>
            ))}
        </div></>
    );
}

export default SizeSelector;