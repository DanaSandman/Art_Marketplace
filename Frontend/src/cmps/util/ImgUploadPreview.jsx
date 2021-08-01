import React from 'react';
import { Avatar } from './Avatar';
import { UploadImg } from './UploadImg';

export function ImgUploadPreview({
  imgUrl,
  onImgChange,
  showAvatar,
  fullname,
}) {
  const handleImgChange = (url) => {
    onImgChange(url);
  };
  return (
    <section className='img-upload-preview'>
      <div className='img-preview'>
        {imgUrl ? (
          showAvatar ? (
            <Avatar imgUrl={imgUrl} fullname={fullname} />
          ) : (
            <img src={imgUrl} alt='' />
          )
        ) : (
          <div className='empty-img'>Upload an Image</div>
        )}
      </div>

      <UploadImg handleImgChange={handleImgChange} />
    </section>
  );
}
