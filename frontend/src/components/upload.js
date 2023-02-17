import UploadForm from "./provider_upload";
import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';

const Upload = () => (
    <Provider store={store}>
      <UploadForm />
    </Provider>
  );
  
  export default Upload;     