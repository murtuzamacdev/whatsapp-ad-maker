import React, { useEffect, useState } from 'react';

export const GlobalContext = React.createContext();

export const GlobalContextProvider = (props) => {
    const [productData, setProductData] = useState(null);
    const [selectedTemplate, setSelectedTemplate] = useState('template4');
    const [selectedUnsplashPhoto, setSelectedUnsplashPhoto] = useState(null);
    const [unsplashCachedSearchResult, setUnsplashCachedSearchResult] = useState([]);

    useEffect(() => {
        let _selectedTemplate = localStorage.getItem('selectedTemplate');
        _selectedTemplate && setSelectedTemplate(_selectedTemplate);
    }, [])

    const _setProductData = (productData) => {
        setProductData(productData);
        let jsonWithoutImage = JSON.parse(JSON.stringify(productData)); // Because large images cannot be stored in local storage. So images will stay only in global context variable
        delete jsonWithoutImage.productImage;
        localStorage.setItem('productData', JSON.stringify(jsonWithoutImage));
    }

    const _setSelectedTemplate = (templateId) => {
        localStorage.setItem('selectedTemplate', templateId);
        setSelectedTemplate(templateId);
    }

    return (
        <GlobalContext.Provider
            value={{
                productData, selectedTemplate, selectedUnsplashPhoto, unsplashCachedSearchResult,
                setProductData: _setProductData,
                setSelectedTemplate: _setSelectedTemplate,
                setSelectedUnsplashPhoto: setSelectedUnsplashPhoto,
                setUnsplashCachedSearchResult: setUnsplashCachedSearchResult
            }}
        >
            {props.children}
        </GlobalContext.Provider>
    );
}
