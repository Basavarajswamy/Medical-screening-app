import React, { useState } from 'react';
import Cropper from 'react-easy-crop';

const ImageCroppingTool = () => {
    const [image] = useState('https://via.placeholder.com/300'); // Placeholder image for now
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);

    return (
        <div>
            <h2>Crop Patient Image</h2>
            <div style={{ position: 'relative', width: '300px', height: '300px' }}>
                <Cropper
                    image={image}
                    crop={crop}
                    zoom={zoom}
                    aspect={1}
                    onCropChange={setCrop}
                    onZoomChange={setZoom}
                />
            </div>
            <input
                type="range"
                value={zoom}
                min="1"
                max="3"
                step="0.1"
                onChange={(e) => setZoom(e.target.value)}
            />
        </div>
    );
};

export default ImageCroppingTool;
