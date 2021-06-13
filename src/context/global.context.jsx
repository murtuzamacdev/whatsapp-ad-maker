import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

export const GlobalContext = React.createContext();

export class GlobalContextProvider1 extends Component {
    state = {
        productData: null,
        selectedTemplate: 'template1'
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
        })
    }

    setSelectedTemplate = (templateId) => {
        localStorage.setItem('selectedTemplate', templateId);
        this.setState({
            selectedTemplate: templateId
        })
    }

    render() {
        return (
            <GlobalContext.Provider
                value={{
                    state: this.state,
                    setProductData: this.setProductData,
                    setSelectedTemplate: this.setSelectedTemplate
                }}
            >
                {this.props.children}
            </GlobalContext.Provider>
        );
    }
}

export const GlobalContextProvider = withRouter(GlobalContextProvider1)
