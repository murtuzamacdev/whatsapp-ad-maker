import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

export const GlobalContext = React.createContext();

export class GlobalContextProvider1 extends Component {
    state = {
        productData: null,
        selectedTemplate: 'template1'
    }

    setProductData = (productData) => {
        this.setState({
            productData: productData
        })
    }

    setSelectedTemplate = (template) => {
        this.setState({
            selectedTemplate: template
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
