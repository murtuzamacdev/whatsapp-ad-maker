import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

export const GlobalContext = React.createContext();

export class GlobalContextProvider1 extends Component {
    state = {
        productData: null,
        selectedTemplate: 'template4',
        selectedUnsplashPhoto: null,
        unsplashCachedSearchResult: []
    }

    componentDidMount() {
        let _selectedTemplate = localStorage.getItem('selectedTemplate');
        if (_selectedTemplate) {
            this.setState({
                selectedTemplate: _selectedTemplate
            });
        }
    }

    setProductData = (productData) => {
        this.setState({
            productData: productData
        }, () => {
            let jsonWithoutImage = JSON.parse(JSON.stringify(productData)); // Because large images cannot be stored in local storage. So images will stay only in global context variable
            delete jsonWithoutImage.productImage;
            localStorage.setItem('productData', JSON.stringify(jsonWithoutImage));
        })
    }

    setSelectedTemplate = (templateId) => {
        localStorage.setItem('selectedTemplate', templateId);
        this.setState({
            selectedTemplate: templateId
        })
    }

    setSelectedUnsplashPhoto = (_setSelectedUnsplashPhoto) => {
        this.setState({ selectedUnsplashPhoto: _setSelectedUnsplashPhoto });
    }

    setUnsplashCachedSearchResult = (searchResultArr) => {
        this.setState({ unsplashCachedSearchResult: searchResultArr });
    }

    render() {
        return (
            <GlobalContext.Provider
                value={{
                    state: this.state,
                    setProductData: this.setProductData,
                    setSelectedTemplate: this.setSelectedTemplate,
                    setSelectedUnsplashPhoto: this.setSelectedUnsplashPhoto,
                    setUnsplashCachedSearchResult: this.setUnsplashCachedSearchResult
                }}
            >
                {this.props.children}
            </GlobalContext.Provider>
        );
    }
}

export const GlobalContextProvider = withRouter(GlobalContextProvider1)
