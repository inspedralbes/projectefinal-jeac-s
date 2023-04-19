import UploadForm from "../components/provider_upload";
import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../components/store';

const Upload = ({socket}) => (
    <Provider store={store}>
      {console.log("ASSdsfasdfasd", socket)}
      <UploadForm socket={socket}/>
    </Provider>
  );
  
  export default Upload;     