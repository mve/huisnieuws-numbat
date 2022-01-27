/* eslint-disable @next/next/no-img-element */
import React from 'react';

type Props = {
  url: string,
}

const UploadedImage: React.FC<Props> = ({ url }) => (
  <div className="align-baseline">
    <img
      className="object-contain"
      src={url}
      alt="Geüploade afbeelding"
      width="200"
      height="200"
    />
  </div>
);

export default UploadedImage;
