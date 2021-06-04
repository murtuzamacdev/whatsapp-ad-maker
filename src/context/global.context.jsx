import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

export const GlobalContext = React.createContext();

export class GlobalContextProvider1 extends Component {
    state = {
        productData: null
    }

    setProductData = (productData) => {
        this.setState({
            productData: productData
        })
    }

    render() {
        return (
            <GlobalContext.Provider
                value={{
                    state: this.state,
                    setProductData: this.setProductData
                }}
            >
                {this.props.children}
            </GlobalContext.Provider>
        );
    }
}

export const GlobalContextProvider = withRouter(GlobalContextProvider1)
