import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Question } from 'src/app/shared/models/question';
import { Section } from 'src/app/shared/models/section';
import { Test } from 'src/app/shared/models/test';
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

  constructor(private router: Router, public entryDialog: MatDialog) {
    
  }

  ngOnInit(): void {
    // open "create new test" dialog
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


  addNewSection() {
    const newSection: Section = {
      sectionName: "New Section",
      questions: []
    }
    this.test.sections.push(newSection);
    this.currentSectionIdx = this.test.sections.length - 1;
    this.selectedSection.setValue(this.test.sections.length - 1);
  }

  deleteSection(index: number) {
    this.test.sections.splice(index, 1);
  }


  saveTest() {
    console.log(this.test);
  }

  goToDashboard() {
    this.router.navigate(['/admin']);
  }
}
