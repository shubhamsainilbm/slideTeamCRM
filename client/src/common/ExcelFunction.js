import * as XLSX from "xlsx";


export const handleExportExcel = (apiResponse) => {
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(apiResponse);
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, "report.xlsx");
  };