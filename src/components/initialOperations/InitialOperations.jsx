import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import firebase from "firebase/app";
import "firebase/analytics";
import GAEvents from '../../configs/GA_events.json';

const InitialOperations = () => {
    const history = useHistory();

    useEffect(() => {

        // Initiate firebase as the first thing :)
        const _initFirebase = async (params) => {
            await initFirebase();

            // Listen to route change event and do stuff...
            history.listen(() => {
                firebase.analytics().logEvent(GAEvents.screen_view.title, { 
                    [GAEvents.screen_view.params.screen_name]: window.location.pathname 
                });
            });
        }
        _initFirebase();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const initFirebase = () => {
        var firebaseConfig = {
            apiKey: "AIzaSyAnsFuEK5xZ_1a30quyudtw7ILmroM5rfA",
            authDomain: "dev-createawesomeads.firebaseapp.com",
            databaseURL: "https://dev-createawesomeads-default-rtdb.asia-southeast1.firebasedatabase.app",
            projectId: "dev-createawesomeads",
            storageBucket: "dev-createawesomeads.appspot.com",
            messagingSenderId: "1040397287421",
            appId: "1:1040397287421:web:3d7924f947eda51317a394",
            measurementId: "G-PECZRHLJ71"
        };

        // Initialize Firebase
        firebase.initializeApp(firebaseConfig);
    }

    return (null);
}

export default InitialOperations;