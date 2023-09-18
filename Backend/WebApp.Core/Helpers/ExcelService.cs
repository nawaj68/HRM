using OfficeOpenXml;
using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using WebApp.Core.Interface;

namespace WebApp.Core.Helpers
{
    public class ExcelService : IExcelService
    {

        public void Save<T>(FileInfo fileInfo, List<T> dataList)  
        {
            try
            {
                using (ExcelPackage excelPackage = new ExcelPackage(fileInfo))
                {
                    ExcelWorksheet ws = excelPackage.Workbook.Worksheets.Add(typeof(T).AssemblyQualifiedName);
                    ws.Cells["A1"].LoadFromCollection(dataList, true);
                    excelPackage.Save();
                }
            }
            catch (Exception ex)
            {
                throw new Exception("",ex);
            }
        }

        public void Save(FileInfo fileInfo, DataTable dataTable)
        {
            try
            {
                using (ExcelPackage excelPackage = new ExcelPackage(fileInfo))
                {
                    ExcelWorksheet ws = excelPackage.Workbook.Worksheets.Add(dataTable.TableName);
                    ws.Cells["A1"].LoadFromDataTable(dataTable, true);
                    excelPackage.Save();
                }
            }
            catch (Exception ex)
            {
                throw new Exception("", ex);
            }
        }

    }
}
