import './ImageGrid.scss';

const ImageGrid = ({ images, onImageSelect }) => {
    return (<div className="image-grid-ctnr">
        {images.map((item) => (<img key={item.medium} onClick={() => { onImageSelect(item.portrait, 'FROM_INTERNET') }} src={item.medium} alt="product"></img>))}
    </div>);
}

export default ImageGrid;