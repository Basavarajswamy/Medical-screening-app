// import React, { useState } from 'react';

// const DiagnosisReportSubmission = () => {
//     const [comment, setComment] = useState('');
//     const [pdfFile, setPdfFile] = useState(null);

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         console.log({ comment, pdfFile });
//         alert('Diagnosis submitted successfully!');
//     };

//     return (
//         <form onSubmit={handleSubmit}>
//             <h2>Submit Diagnosis Report</h2>
//             <textarea
//                 placeholder="Enter your diagnosis comments here"
//                 value={comment}
//                 onChange={(e) => setComment(e.target.value)}
//             />
//             <input
//                 type="file"
//                 accept="application/pdf"
//                 onChange={(e) => setPdfFile(e.target.files[0])}
//             />
//             <button type="submit">Submit Report</button>
//         </form>
//     );
// };

// export default DiagnosisReportSubmission;



import React, { useState } from 'react';

const DiagnosisReportSubmission = ({ patientId }) => { // Pass patientId as a prop
    const [comment, setComment] = useState('');
    const [pdfFile, setPdfFile] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('patientId', patientId); // Include patientId
        formData.append('comments', comment);
        formData.append('report', pdfFile);

        try {
            const response = await fetch('http://localhost:5000/api/reports/submit', {
                method: 'POST',
                body: formData
            });
            if (response.ok) {
                alert('Diagnosis report submitted successfully!');
            } else {
                alert('Error submitting diagnosis report');
            }
        } catch (err) {
            console.error(err);
            alert('Error submitting diagnosis report');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Submit Diagnosis Report</h2>
            <textarea
                placeholder="Enter your diagnosis comments here"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
            />
            <input
                type="file"
                accept="application/pdf"
                onChange={(e) => setPdfFile(e.target.files[0])}
            />
            <button type="submit">Submit Report</button>
        </form>
    );
};

export default DiagnosisReportSubmission;
