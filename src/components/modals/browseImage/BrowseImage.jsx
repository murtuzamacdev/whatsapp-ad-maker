import './BrowseImage.scss';

//assets
import browseDevice from '../../../assets/images/browseDevice.svg';

const BrowseImage = ({ onImageSelect }) => {

    return (<div className="browse-image-container d-flex flex-column align-items-center justify-content-center">
        <img src={browseDevice} alt="Browse Device" width="50%" className="mt-5 pt-5" />
        <div className="d-flex justify-content-center mt-5">
            <label className="btn btn-default p-0 w-auto">
                <div className="upload-button pl-5 pr-5 image-select-button browseBtn">Browse Photos</div>
                <input type="file" accept="image/png, image/gif, image/jpeg" hidden onChange={(data) => {
                    onImageSelect(data.target.files[0], 'FROM_DEVICE');
                }} />
            </label>
        </div>
    </div>);
}

export default BrowseImage;