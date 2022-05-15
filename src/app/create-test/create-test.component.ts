import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Question } from 'src/app/shared/models/question';
import { Section } from 'src/app/shared/models/section';
import { Test } from 'src/app/shared/models/test';
import * as XLSX from 'xlsx';
import { ExcelService, ExcelRow } from '../services/excel.service';
import { CreateTestOpenDialogComponent } from './create-test-open-dialog/create-test-open-dialog.component';


@Component({
  selector: 'app-create-test',
  templateUrl: './create-test.component.html',
  styleUrls: ['./create-test.component.css']
})
export class CreateTestComponent implements OnInit {

  test: Test = {
    testId: "",
    title: "",
    sections: []
  }

  currentQIdx: number | undefined | null;
  currentSectionIdx: number = 0;
  isTimeBased: boolean = false;
  selectedSection = new FormControl(0);

  constructor(private router: Router, private excelService: ExcelService, public entryDialog: MatDialog) {
    
  }

  ngOnInit(): void {
    if (this.testHasNoSection()) {
      const dialogRef = this.entryDialog.open(CreateTestOpenDialogComponent);
      dialogRef.afterClosed().subscribe(result => this.test = result);
    }
    
    if (this.test.sections.length == 1 && this.test.sections[0].questions.length == 1) {
      this.currentQIdx = 0;
    }
  }

  testHasNoSection() {
    return this.test.sections.length == 0;
  }


  /**
   * Duplicates the question at 'qIndex' and inserts it below the current question
   * @param qIndex Question index
   */
  duplicateQuestion(qIndex: number) {
    if (this.test.sections.length > 0) {
      const question: Question = this.test.sections[this.currentSectionIdx].questions[qIndex];
      const questionCopy: Question = JSON.parse(JSON.stringify(question));
      this.test.sections[this.currentSectionIdx].questions.splice(qIndex+1, 0, questionCopy);
    }
  }

  /**
   * Removes the question at index 'qIndex' from 'allQuestions'
   * @param qIndex Question index
   */
  deleteQuestion(qIndex: number) {
    if (this.test.sections.length > 0) {
      this.test.sections[this.currentSectionIdx].questions.splice(qIndex, 1);
      this.currentQIdx = null;
    }
  }


  /**
   * Adds a new question to 'allQuestions' array
   */
  addNewQuestion() {
    if (this.test.sections.length == 0) {
      this.addNewSection();
    } else {
      const question: Question = {
        questionTxt: '',
        options: [
          {
            id: 0,
            option: ''
          },
        ],
        correctOptions: ['']
      };
      this.test.sections[this.currentSectionIdx].questions.push(question);
      this.currentQIdx = 0;
    }
    
  }


  onFileUpload($event: any) {
    const files = $event.srcElement.files;
    if (files !== null && files !== undefined && files.length > 0) {
      if (files && files.length > 0) {
        let file: File = files.item(0);
        const reader: FileReader = new FileReader();
        reader.readAsBinaryString(file);
        reader.onload = (e: any) => {
          const sheetData: {name: string, data: ExcelRow[]}[] = [];
          const binarystr: string = e.target.result;
          const wb: XLSX.WorkBook = XLSX.read(binarystr, { type: 'binary' });
          
          const totalSheets = wb.SheetNames.length;

          for (let i = 0; i < totalSheets; i++) {
            const wsname: string = wb.SheetNames[i];
            const ws: XLSX.WorkSheet = wb.Sheets[wsname];

            const data = XLSX.utils.sheet_to_json(ws);
            sheetData.push({
              name: wsname,
              data: <ExcelRow[]> data
            });

            this.test = this.excelService.createTest(sheetData);
          }
        }
      }
    }
  }


  addNewSection() {
    const newSection: Section = {
      sectionName: "New Section",
      questions: [{
        questionTxt: "What is the capital of Maharashtra?",
        options: [
          {
            id: 1,
            option: "Pune"
          },{
            id: 2,
            option: "Mumbai"
          },{
            id: 3,
            option: "Nagpur"
          }
        ],
        correctOptions: ["Mumbai"]
      }]
    }
    this.test.sections.push(newSection);
    this.currentSectionIdx = this.test.sections.length - 1;
    this.selectedSection.setValue(this.test.sections.length - 1);
  }

  deleteSection(index: number) {
    this.test.sections.splice(index, 1);
    // if (index < this.currentSectionIdx) {
    //   this.currentSectionIdx--;
    // }
  }

  onSectionClick(sectionIndex: number) {
    this.currentSectionIdx = sectionIndex;
  }


  saveTest() {
    console.log(this.test);
  }

  goToDashboard() {
    this.router.navigate(['/admin']);
  }
}
