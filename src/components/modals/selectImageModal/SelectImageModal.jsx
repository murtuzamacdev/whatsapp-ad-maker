import { useEffect, useState } from 'react';
import './SelectImageModal.scss';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { UNSPLASH_API_KEY } from '../../../configs/constants';
import { createApi } from 'unsplash-js';

// Components
import ImageGrid from '../imageGrid/ImageGrid';
import BrowseImage from '../browseImage/BrowseImage';
import Loading from '../../loading/Loading';

// Assets
import fromInternet from '../../../assets/images/fromInternet.png';
import fromDevice from '../../../assets/images/fromDevice.png';

var currentPage = 1;
var firstTimeImagesLoaded = false;

const SelectImageModal = ({ updatePicture, setFieldValue }) => {
    const [images, setImages] = useState([]);
    const [searchTxt, setSearchTxt] = useState('');
    const [searchResultTotalPages, setSearchResultTotalPages] = useState(1);
    const [showSearchBtnLoading, setShowSearchBtnLoading] = useState(false);
    const [showLoadMoreLoading, setShowLoadMoreLoading] = useState(false);
    const unsplash = createApi({
        accessKey: UNSPLASH_API_KEY
    });

    useEffect(() => {
        window.$('#selectImageModal').on('show.bs.modal', function (e) {
            firstTimeImagesLoaded === false && fetchImages();
        })

        return (() => {
            firstTimeImagesLoaded = false;
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchImages = () => {
        
        let _query;
        if(/\S/.test(searchTxt)){
            _query = searchTxt;
        }else {
            let randomSearchQueriesArr = ['cake', 'clothes', 'watches', 'shoes', 'grocery', 'furniture', 'indian dress', 'sandals', 'indian food', 'food', 'household product', 'mobile'];
            _query = randomSearchQueriesArr[Math.floor(Math.random()*randomSearchQueriesArr.length)];
        }

        unsplash.search
            .getPhotos({ query: _query, per_page: 60, page: currentPage})
            .then(result => {
                let _images = result.response.results;

                // Differentiate between search and load more
                if (currentPage === 1) { // Search
                    setShowSearchBtnLoading(false);
                    setImages(_images);
                } else { // Load More
                    setShowLoadMoreLoading(false);
                    setImages([...images, ..._images]);
                }

                firstTimeImagesLoaded = true;
                currentPage = currentPage + 1;
                setSearchResultTotalPages(result.response.total_pages);
            })
            .catch((error) => {
                console.log('Unsplash Error', error);
            });
    }

    const handleSearch = (params) => {
        if (/\S/.test(searchTxt)) {
            setShowSearchBtnLoading(true);
            currentPage = 1;
            fetchImages();
        }
    }

    const onImageSelect = (unsplashPhoto, type) => {
        window.$('#selectImageModal').modal('hide');
        updatePicture(unsplashPhoto, setFieldValue, type)
    }

    return (
        <div className="modal fade select-image-modal-ctrn" id="selectImageModal" tabIndex="-1" role="dialog" aria-labelledby="SelectImageModal" aria-hidden="true">
            <div style={{ height: '100%' }} className="d-flex flex-column justify-content-end m-0">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header pb-1 pt-2">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <Tabs>
                                <TabList>
                                    <Tab><div className="d-flex justify-content-center align-items-center "><img src={fromInternet} alt="From Internet" width="20px" /><p className='m-0 ml-2'>From Internet</p></div></Tab>
                                    <Tab><div className="d-flex justify-content-center align-items-center "><img src={fromDevice} alt="From Device" width="20px" /><p className='m-0 ml-2'>From Device</p></div></Tab>
                                </TabList>

                                {/* From Internet */}
                                <TabPanel>
                                    <div className="p-3 d-flex justify-content-center align-items-center">
                                        <input type="text" placeholder="Search millions of photos" value={searchTxt} onChange={(e) => { setSearchTxt(e.target.value) }} className="search-input mr-2" />
                                        {!showSearchBtnLoading && <input type="button" className="search-btn" alt="Search Button" onClick={() => { handleSearch() }}></input>}
                                        {showSearchBtnLoading && <div style={{ position: 'relative', height: '50px', width: '50px' }}><Loading fullScreen={false} /></div>}
                                    </div>

                                    {images.length !== 0 && <>
                                        {/* <a href="https://www.pexels.com" rel="noreferrer" target="_blank"> <img src="https://images.pexels.com/lib/api/pexels.png" width="60px" className="mb-1 pl-1" alt="Pexels" /> </a> */}
                                        <ImageGrid images={images} onImageSelect={onImageSelect} />
                                        {currentPage < searchResultTotalPages && <div className="btn-ctrn">
                                            {!showLoadMoreLoading && <button type="button" onClick={() => { setShowLoadMoreLoading(true); fetchImages() }} className="load-more-btn ">Load More</button>}
                                            {showLoadMoreLoading && <Loading fullScreen={false} />}
                                            
                                            </div>}
                                    </>}

                                    {images.length === 0 && <>
                                        <Loading fullScreen={false} />
                                    </>}

                                </TabPanel>

                                {/* From Device */}
                                <TabPanel>
                                    <BrowseImage onImageSelect={onImageSelect} />
                                </TabPanel>
                            </Tabs>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default SelectImageModal;