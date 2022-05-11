import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';

const UplodImage = ({setImgUrl}) => {
  const [images, setImages] = useState([]);

  const onDrop = useCallback((acceptedFiles, rejectFiles) => {
		console.log(acceptedFiles);
		console.log(acceptedFiles.length);
		if (acceptedFiles.length > 1) {
	    console.log('xxxx');
		}
    acceptedFiles.forEach((file) => {
			console.log(file);
      const reader = new FileReader();
      reader.onload = () => {
        setImages((prevState) => [...prevState, reader.result]);
      };
      reader.readAsDataURL(file);
    });
  }, []);
  const { getRootProps, getInputProps} = useDropzone({
    onDrop,
		 maxFiles:1,
  });
  return (
    <div className="dropzone">
      <div {...getRootProps()}>
        <input {...getInputProps()} />
				<div className="editIcon-dropzone" ><AddPhotoAlternateIcon color="disabled" fontSize="large"/></div>
      </div>
      {images.length > 0 && (
        <div className="selected-images">
          {
					images.map((img, i) => 
						{
							setImgUrl(img)
							return <img src={img} alt="hey" key={i} />
						}
          )}
        </div>
      )}
    </div>
  );
};

export default UplodImage;
