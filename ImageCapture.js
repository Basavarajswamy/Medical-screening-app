// import React, { useRef } from 'react';
// import Webcam from 'react-webcam';

// const ImageCapture = () => {
//     const webcamRef = useRef(null);

//     const capture = async () => {
//         const imageSrc = webcamRef.current.getScreenshot();

//         // Convert base64 to file-like format (blob)
//         const blob = await fetch(imageSrc).then((res) => res.blob());

//         // Create a FormData object to upload
//         const formData = new FormData();
//         formData.append('image', blob, 'patient-image.jpg');

//         try {
//             const response = await fetch('http://localhost:5000/api/upload/image', {
//                 method: 'POST',
//                 body: formData
//             });
//             const result = await response.json();
//             console.log(result);
//             alert('Image uploaded successfully!');
//         } catch (err) {
//             console.error(err);
//             alert('Error uploading image');
//         }
//     };

//     return (
//         <div>
//             <Webcam
//                 audio={false}
//                 ref={webcamRef}
//                 screenshotFormat="image/jpeg"
//                 width="100%"
//             />
//             <button onClick={capture}>Capture and Upload Image</button>
//         </div>
//     );
// };

// export default ImageCapture;




import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';

const ImageCapture = ({ patientId }) => { // Pass patientId as a prop
    const webcamRef = useRef(null);
    const [imageUrl, setImageUrl] = useState('');

    const capture = async () => {
        const imageSrc = webcamRef.current.getScreenshot();
        const blob = await fetch(imageSrc).then((res) => res.blob());

        // Create FormData to upload image along with patientId
        const formData = new FormData();
        formData.append('image', blob, 'patient-image.jpg');
        formData.append('patientId', patientId); // Send patientId with the image

        try {
            const response = await fetch('http://localhost:5000/api/upload/image', {
                method: 'POST',
                body: formData
            });
            const result = await response.json();
            setImageUrl(result.imageUrl);
            alert('Image uploaded successfully and saved to MongoDB!');
        } catch (err) {
            console.error(err);
            alert('Error uploading image');
        }
    };

    return (
        <div>
            <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                width="100%"
            />
            <button onClick={capture}>Capture and Upload Image</button>
            {imageUrl && <img src={imageUrl} alt="Patient" />}
        </div>
    );
};

export default ImageCapture;
