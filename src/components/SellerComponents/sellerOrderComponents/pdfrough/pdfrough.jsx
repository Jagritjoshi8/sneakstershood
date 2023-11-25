import React, { useEffect, useRef } from "react";
import * as htmlToImage from "html-to-image";
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from "html-to-image";
import jsPDF from "jspdf";

const PdfRough = () => {
  const pageRef = useRef(null);

  const handleDownload = async () => {
    try {
      const dataUrl = await htmlToImage.toPng(pageRef.current, {
        quality: 0.95,
      });

      const pdf = new jsPDF();
      const imgProps = pdf.getImageProperties(dataUrl);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(dataUrl, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("download.pdf");
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  // Trigger the function when the component mounts

  // Empty dependency array to ensure the effect runs only once on mount

  return (
    <div id="myPage" ref={pageRef}>
      {/* Your content goes here */}
      <h1>Hello PDF!</h1>
      <p>This is a simple PDF example.</p>
      <p>This is a simple PDF example. t7g</p>
      <img
        src="https://th.bing.com/th/id/OIP.9IRAdWdQZ2Dfwp86yYQ1CgHaIz?rs=1&pid=ImgDetMain"
        height="500px"
      />
      <button onClick={() => handleDownload()}>download</button>
    </div>
  );
};

export default PdfRough;
