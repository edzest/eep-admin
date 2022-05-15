import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ExcelRow, ExcelService } from 'src/app/services/excel.service';
import { Test } from 'src/app/shared/models/test';
import * as XLSX from 'xlsx';
import { v4 as uuidv4 } from 'uuid';
import { empty } from 'rxjs';

@Component({
  selector: 'app-create-test-open-dialog',
  templateUrl: './create-test-open-dialog.component.html',
  styleUrls: ['./create-test-open-dialog.component.css']
})
export class CreateTestOpenDialogComponent implements OnInit {
  fileReader: FileReader;
  file: File | null = null;
  testName: string = 'Untitled Test';
  
  constructor(
    private excelService: ExcelService, 
    private dialogRef: MatDialogRef<CreateTestOpenDialogComponent>) {

    this.fileReader = new FileReader();
  }

  ngOnInit(): void {
  }

  onFileDrop(fileList: FileList) {
    if (fileList.length > 0) {
      const file = fileList.item(0);
      this.file = file;
    }
  }

  onFileSelect($event: Event) {
    const input = $event.target as HTMLInputElement;
    if (input.files && input.files.length)  {
      const file: File | null = input.files.item(0);
      console.log(`File selected \n
      name: ${file?.name} \n
      size: ${file?.size} \n
      type: ${file?.type}`);

      this.file = file;
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

  onCreateClick() {
    if (this.file) {
      this.fileReader.readAsBinaryString(this.file);
      this.fileReader.onload = (e: any) => {
        // todo: file validation
        const binaryStr: string = e.target.result;
        const test: Test = this.createTestFromBinaryStr(binaryStr);
        test.title = this.testName;
        this.dialogRef.close(test);
      };
    } else {
      const emptyTest: Test = {
        title: this.testName,
        testId: uuidv4(),
        sections: [
          {
            sectionName: 'Section 1',
            questions: []
          }
        ]
      }
      this.dialogRef.close(emptyTest);
    }
  }

}
