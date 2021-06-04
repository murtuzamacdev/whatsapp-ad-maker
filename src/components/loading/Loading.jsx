import './Loading.scss'

const Loading = () => {
    return ( <div className="loading-screen-wrapper">
    <div className="loading-screen-icon">
        <div className="spinner">
            <div className="double-bounce1"></div>
            <div className="double-bounce2"></div>
        </div>
    </div>
</div>);
}

export default Loading;