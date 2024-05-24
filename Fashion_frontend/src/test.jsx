import React, { useState,useEffect } from "react";
import axios from "axios";

function Test() {
  const [imageSrc, setImageSrc] = useState(null);
 
  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/get`, {
          responseType: 'blob' // Chỉ định dạng phản hồi là dạng blob
        });
        console.log(response);
        const blob = new Blob([response.data], { type: response.headers['content-type'] });
        const url = URL.createObjectURL(blob);
        setImageSrc(url);
      } catch (error) {
        console.error('Error fetching image:', error);
      }
    };

    fetchImage();
    console.log('Re rendered');

    // Cleanup function
    return () => {
      // Revoke the object URL to free up resources
      if (imageSrc) {
        URL.revokeObjectURL(imageSrc);
      }
    };
  }, []);

  return (
    <div style={{display: 'flex', alignItems:'center', justifyContent:'center',backgroundColor:'#000000'}} >
      {imageSrc ? (
        <img style={{maxHeight: '100vh'}} src={imageSrc} alt="Image" />
      ) : (
        <p>Loading image...</p>
      )}
    </div>
  );
}



export default Test