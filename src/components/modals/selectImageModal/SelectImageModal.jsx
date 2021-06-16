import { useEffect, useState } from 'react';
import './SelectImageModal.scss';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { createClient } from 'pexels';
import { PEXEL_API_KEY } from '../../../configs/constants';

// Components
import ImageGrid from '../imageGrid/ImageGrid';
import BrowseImage from '../browseImage/BrowseImage';

const SelectImageModal = ({ updatePicture, setFieldValue }) => {
    const [images, setImages] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTxt, setSearchTxt] = useState('');
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
        let _query = /\S/.test(searchTxt) ? searchTxt : 'shoes, fruits, mobiles, cakes, clothing, chocolates, watches';

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
            if (_currentPage === 1) {
                setImages(_images);
            } else {
                setImages([...images, ..._images]);
            }

        }).catch((error) => {
            alert(error);
        })
    }

    const onImageSelect = (imgUrl, type) => {
        window.$('#selectImageModal').modal('hide')
        updatePicture(imgUrl, setFieldValue, type)
    }

    return (
        <div class="modal fade select-image-modal-ctrn" id="selectImageModal" tabindex="-1" role="dialog" aria-labelledby="SelectImageModal" aria-hidden="true">
            <div style={{ height: '100%' }} className="d-flex flex-column justify-content-end m-0">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5>Choose Image</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <Tabs>
                                <TabList>
                                    <Tab><div>From Internet</div></Tab>
                                    <Tab><div>From Device</div></Tab>
                                </TabList>

                                <TabPanel>
                                    <div className="p-3 mb-2 d-flex justify-content-center align-items-center">
                                        <input
                                            type="text"
                                            placeholder="Search millions of photos"
                                            value={searchTxt}
                                            onChange={(e) => { setSearchTxt(e.target.value) }}
                                            className="search-input mr-2"
                                        />
                                        <input type="button" class="search-btn" alt="Search Button"
                                            onClick={() => {
                                                if (/\S/.test(searchTxt)) {
                                                    fetchImages(1);
                                                }
                                            }}></input>
                                    </div>
                                    <a href="https://www.pexels.com" rel="noreferrer" target="_blank">
                                        <img src="https://images.pexels.com/lib/api/pexels.png" width="60px" className="mb-1 pl-1" alt="Pexels" />
                                    </a>
                                    <ImageGrid images={images} onImageSelect={onImageSelect} />
                                    <div className="btn-ctrn mt-3 mb-3"><button type="button" onClick={() => { fetchImages(currentPage + 1) }} className="load-more-btn ">Load More</button></div>
                                </TabPanel>
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