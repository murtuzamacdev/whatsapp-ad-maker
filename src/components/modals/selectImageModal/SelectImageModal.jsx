import { useEffect, useState } from 'react';
import './SelectImageModal.scss';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { createClient } from 'pexels';
import { PEXEL_API_KEY } from '../../../configs/constants';

// Components
import ImageGrid from '../imageGrid/ImageGrid';
import BrowseImage from '../browseImage/BrowseImage';
import Loading from '../../loading/Loading';

// Assets
import fromInternet from '../../../assets/images/fromInternet.png';
import fromDevice from '../../../assets/images/fromDevice.png';

const SelectImageModal = ({ updatePicture, setFieldValue }) => {
    const [images, setImages] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTxt, setSearchTxt] = useState('');
    const [showSearchBtnLoading, setShowSearchBtnLoading] = useState(false);
    const client = createClient(PEXEL_API_KEY);

    useEffect(() => {
        window.$('#selectImageModal').on('show.bs.modal', function (e) {
            fetchImages(currentPage);
        })

        window.$('#selectImageModal').on('show.bs.modal', function (e) {
            setSearchTxt('');
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchImages = (_currentPage) => {
        let _query = /\S/.test(searchTxt) ? searchTxt : 'shoes, fruits, clothing, chocolates, watches';

        client.photos.search({ query: _query, per_page: 60, page: _currentPage }).then(photos => {
            let _images = [];
            photos.photos.forEach(element => {
                _images.push({
                    medium: element.src.medium,
                    portrait: element.src.portrait
                });
            });

            setCurrentPage(photos.page);

            // Differentiate between search and load more
            if (_currentPage === 1) { // Search
                setShowSearchBtnLoading(false);
                setImages(_images);
            } else { // Load More
                setImages([...images, ..._images]);
            }

        }).catch((error) => {
            alert(error);
        })
    }

    const handleSearch = (params) => {
        if (/\S/.test(searchTxt)) {
            setShowSearchBtnLoading(true);
            fetchImages(1);
        }
    }

    const onImageSelect = (imgUrl, type) => {
        window.$('#selectImageModal').modal('hide');
        updatePicture(imgUrl, setFieldValue, type)
    }

    return (
        <div class="modal fade select-image-modal-ctrn" id="selectImageModal" tabindex="-1" role="dialog" aria-labelledby="SelectImageModal" aria-hidden="true">
            <div style={{ height: '100%' }} className="d-flex flex-column justify-content-end m-0">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header pb-1 pt-2">
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <Tabs>
                                <TabList>
                                    <Tab><div className="d-flex justify-content-center align-items-center "><img src={fromInternet} alt="From Internet" width="20px" /><p className='m-0 ml-2'>From Internet</p></div></Tab>
                                    <Tab><div className="d-flex justify-content-center align-items-center "><img src={fromDevice} alt="From Device" width="20px" /><p className='m-0 ml-2'>From Device</p></div></Tab>
                                </TabList>

                                {/* From Internet */}
                                <TabPanel>
                                    <div className="p-3 d-flex justify-content-center align-items-center">
                                        <input type="text" placeholder="Search millions of photos" value={searchTxt} onChange={(e) => { setSearchTxt(e.target.value) }} className="search-input mr-2" />
                                        {!showSearchBtnLoading && <input type="button" class="search-btn" alt="Search Button" onClick={() => { handleSearch() }}></input>}
                                        {showSearchBtnLoading && <div style={{ position: 'relative', height: '50px', width: '50px' }}><Loading fullScreen={false} /></div>}
                                    </div>

                                    {images.length !== 0 && <>
                                        <a href="https://www.pexels.com" rel="noreferrer" target="_blank"> <img src="https://images.pexels.com/lib/api/pexels.png" width="60px" className="mb-1 pl-1" alt="Pexels" /> </a>
                                        <ImageGrid images={images} onImageSelect={onImageSelect} />
                                        <div className="btn-ctrn mt-3 mb-3"><button type="button" onClick={() => { fetchImages(currentPage + 1) }} className="load-more-btn ">Load More</button></div>
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