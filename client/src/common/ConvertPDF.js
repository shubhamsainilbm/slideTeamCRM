import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export const handleExportPDF = (contentRef) => {
    const content = contentRef.current;
    html2canvas(content).then((canvas) => {
      const imgData = canvas.toDataURL("image/png"); // using this image is created -----
      const pdf = new jsPDF("p", "mm", "a4"); // Portrait, millimeters, A4 size
      pdf.addImage(imgData, "PNG", 10, 10, 190, 0);
      pdf.save("report.pdf");
    });
  };