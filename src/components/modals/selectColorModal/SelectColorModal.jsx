import './SelectColorModal.scss';
import { CirclePicker, CompactPicker, SwatchesPicker } from 'react-color';

const SelectColorModal = ({ currentColor, handleColorChange }) => {
    return (<div class="modal fade select-color-modal-ctrn" id="selectColorModal" tabindex="-1" role="dialog" aria-labelledby="SelectImageModal" aria-hidden="true">
        <div style={{ height: '100%' }} className="d-flex flex-column justify-content-end m-0">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header pb-1 pt-2">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <SwatchesPicker
                            color={currentColor}
                            onChangeComplete={(color) => { handleColorChange(color) }} />
                    </div>
                </div>
            </div>
        </div>
    </div >);
}

export default SelectColorModal;