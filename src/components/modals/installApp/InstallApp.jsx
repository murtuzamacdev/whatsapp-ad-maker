import './InstallApp.scss';

const InstallAppModal = () => {

    const setIntallAppLSFlag = () => {
        localStorage.setItem('hideInstallAppModal', true);
    }

    return (
        <div className="modal fade install-app-modal-ctrn" id="installAppModal" tabIndex="-1" role="dialog" aria-labelledby="installAppModal" aria-hidden="true">
            <div style={{ height: '100%' }} className="d-flex flex-column justify-content-end m-0">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header pb-1 pt-2">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => { setIntallAppLSFlag() }}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body pl-3 pr-4 pb-4 text-center">
                            <label className="mb-3">For better experience, try our Android app!</label>
                            <button data-dismiss="modal" type="button" className="mb-2 app" onClick={() => {
                                setIntallAppLSFlag()
                                window.location.href = "https://play.google.com/store/apps/details?id=io.ionic.createawesomeads"
                            }
                            } > Install Android App</button>
                            <button data-dismiss="modal" type="button" className="web" onClick={() => { setIntallAppLSFlag() }}>Continue on Web</button>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default InstallAppModal;