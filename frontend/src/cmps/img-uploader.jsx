import { useEffect, useState } from 'react';
import { uploadService } from '../services/upload.service';

export function ImgUploader({ onUploaded = null, imageToDisplay = null }) {
  const [imgData, setImgData] = useState({
    imgUrl: imageToDisplay || null,
    height: 500,
    width: 500,
  });
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (imageToDisplay) {
      setImgData((prevState) => ({ ...prevState, imgUrl: imageToDisplay }));
    }
  }, [imageToDisplay]);

  const handleDrop = async (event) => {
    event.preventDefault();
    try {
      setIsUploading(true);

      const file = event.dataTransfer ? event.dataTransfer.files[0] : event.target.files[0];
      const uploadedImg = await uploadService.uploadImg(file);

      setImgData({
        imgUrl: uploadedImg.secure_url,
        width: uploadedImg.width,
        height: uploadedImg.height,
      });

      setIsUploading(false);
      onUploaded && onUploaded(uploadedImg.secure_url);
    } catch (err) {
      console.error('Failed to upload', err);
      setIsUploading(false);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const getUploadLabel = () => {
    return isUploading ? 'Uploading....' : imgData.imgUrl ? 'Upload another image' : 'Upload Image';
  };

  return (
    <section className='img-uploader'>
      <div
        className="upload-preview"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <p>Drag & drop image here, or click to select image</p>
        {imgData.imgUrl && (
          <img src={imgData.imgUrl} alt="" />
        )}
        <label
          className='btn-style-copy'
          htmlFor="imgUpload">{getUploadLabel()}
        </label>
        <input
          type="file"
          onChange={(e) => handleDrop(e)}
          accept="image/*"
          id="imgUpload"
          style={{ display: 'none' }}
        />
      </div>
    </section>
  );
}
