import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ExcelRow, ExcelService } from 'src/app/services/excel.service';
import { Test } from 'src/app/shared/models/test';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-create-test-open-dialog',
  templateUrl: './create-test-open-dialog.component.html',
  styleUrls: ['./create-test-open-dialog.component.css']
})
export class CreateTestOpenDialogComponent implements OnInit {
  fileReader: FileReader;
  
  constructor(
    private excelService: ExcelService, 
    private dialogRef: MatDialogRef<CreateTestOpenDialogComponent>) {

    this.fileReader = new FileReader();
  }

  ngOnInit(): void {
  }

  onFileUpload($event: any) {
    const files = $event.srcElement.files;
    if (files && files.length > 0) {
      const file: File = files.item(0);
      console.log(`File selected \n
      name: ${file.name} \n
      size: ${file.size} \n
      type: ${file.type}`);

      this.fileReader.readAsBinaryString(file);
      this.fileReader.onload = (e: any) => {
        // todo: file validation
        const binaryStr: string = e.target.result;
        const test: Test = this.createTestFromBinaryStr(binaryStr);
        this.dialogRef.close(test);
      };
    }
  }

  createTestFromBinaryStr(binaryStr: string) {
    const allSheetData: { name: string, data: ExcelRow[]}[] = [];
    const wb: XLSX.WorkBook = XLSX.read(binaryStr, { type: 'binary' });
    for (let sheetName in wb.Sheets) {
      const ws: XLSX.WorkSheet = wb.Sheets[sheetName];
      const data = XLSX.utils.sheet_to_json(ws);
      allSheetData.push({
        name: sheetName,
        data: <ExcelRow[]> data
      });
    }
    return this.excelService.createTest(allSheetData);
  }

}
