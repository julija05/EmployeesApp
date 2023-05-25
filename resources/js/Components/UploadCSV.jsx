import React, { useState } from 'react';
import InputLabel from './InputLabel';
import PrimaryButton from './PrimaryButton';
import { useForm } from '@inertiajs/react';
import ToastSuccess from './ToastSucces';
import ToastError from './ToastError';

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const { data, setData, post, delete: destroy, processing, errors, reset } = useForm({
    file:null,
    sucess:false,
});

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setData('file',selectedFile);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!data.file){
      return errors.file ='Upload CSV file';
    }
    // Make a POST request to your Laravel endpoint to handle the file upload
    post(route('upload'), {
      onError: (error) => {
          error.file='Your file in not uploaded.Upload CSV file'
      },
      onSuccess: () => {
          setData((prevData)=>({
            ...prevData,
            sucess:true,
          }));
      }
  });
  };

  return (
    <div>
        <form onSubmit={handleSubmit}>
        <InputLabel>Upload</InputLabel>
      <input type="file" onChange={handleFileChange} />
      <PrimaryButton > Upload</PrimaryButton>
      {errors.file && <div className='text-red-500 m-3'>{errors.file}</div>}
      </form>
    </div>
  );
};

export default FileUpload;
