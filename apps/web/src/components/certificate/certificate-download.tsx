import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import moment from "moment";
import React from "react";
import CertificateTemplate from "./certificate-template";
interface CertificateDownloadProps {
  fullName: string;
  title: string;
  date: Date;
  type: "LESSON_ACHIEVEMENT" | "QUIZ_ACHIEVEMENT";
}

const CertificateDownload: React.FC<CertificateDownloadProps> = ({
  date,
  fullName,
  title,
  type,
}) => {
  const generatePDF = () => {
    const input = document.getElementById("certificate");
    if (input) {
      html2canvas(input, { scale: 2 }).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("landscape", "pt", "a4");
        const pdfWidth = pdf.internal.pageSize.width;
        const pdfHeight = pdf.internal.pageSize.height;
        const imgWidth = canvas.width;
        const imgHeight = canvas.height;
        const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
        const imgX = (pdfWidth - imgWidth * ratio) / 2;
        const imgY = (pdfHeight - imgHeight * ratio) / 2;
        pdf.addImage(
          imgData,
          "PNG",
          imgX,
          imgY,
          imgWidth * ratio,
          imgHeight * ratio
        );
        pdf.save("certificate.pdf");
      });
    }
  };
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4">
      <div
        id="certificate"
        className="mb-8 rounded-lg bg-empower p-8 shadow-lg"
      >
        <CertificateTemplate
          fullName={fullName}
          title={title}
          type={type === "LESSON_ACHIEVEMENT" ? "Lesson" : "Quiz"}
          date={moment(date).format("DD MMM YYYY")}
        />
      </div>
      <button
        onClick={generatePDF}
        className="rounded-lg bg-empower px-4 py-2 font-semibold text-white shadow-md transition duration-300 hover:bg-rise"
      >
        Download Certificate
      </button>
    </div>
  );
};

export default CertificateDownload;
