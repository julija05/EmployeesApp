import React, { useState } from 'react';
import InputLabel from './InputLabel';
import PrimaryButton from './PrimaryButton';
import { useForm } from '@inertiajs/react';

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const { data, setData, post, delete: destroy, processing, errors, reset } = useForm({
    file:null,
});

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setData('file',selectedFile);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Make a POST request to your Laravel endpoint to handle the file upload
    post(route('upload'));
  };

  return (
    <div>
        <form onSubmit={handleSubmit}>
        <InputLabel>Upload</InputLabel>
      <input type="file" onChange={handleFileChange} />
      <PrimaryButton > Upload</PrimaryButton>
      </form>
    </div>
  );
};

export default FileUpload;
