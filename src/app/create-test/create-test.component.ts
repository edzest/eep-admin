import { Component, OnInit } from '@angular/core';
import { Question } from 'src/app/shared/models/question';
import { Section } from 'src/app/shared/models/section';
import { Test } from 'src/app/shared/models/test';
import { McqQuestion, Option } from './question-types';

@Component({
  selector: 'app-create-test',
  templateUrl: './create-test.component.html',
  styleUrls: ['./create-test.component.css']
})
export class CreateTestComponent implements OnInit {

  test: Test = {
    testId: "1",
    title: "Untitled Exam",
    sections: [
      {
        sectionName: "Section 1",
        questions: [
          {
            questionTxt: "Ex: What is the capital of India...",
            options: [
              {
                id: 0,
                option: 'New Delhi'
              }
            ],
            correctOptions: ['New Delhi']
          }
        ]
      }
    ]
  }

  // allQuestions: McqQuestion[] = [
  //   {
  //     'question': 'Ex: What is the capital of India...',
  //     'options': [{
  //       id: 0,
  //       option: 'New Delhi'
  //     }],
  //     correctOptions: ['New Delhi']
  //   }
  // ];

  currentQIdx: number | undefined | null;
  currentSectionIdx: number = 0;

  constructor() { }

  ngOnInit(): void {
    if (this.test.sections.length == 1 && this.test.sections[0].questions.length == 1) {
      this.currentQIdx = 0;
    }
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
        questionTxt: 'What is the capital of India?',
        options: [
          {
            id: 0,
            option: 'New Delhi'
          },
        ],
        correctOptions: ['New Delhi']
      };
      this.test.sections[this.currentSectionIdx].questions.push(question);
      this.currentQIdx = 0;
    }
    
  }


  onQuestionContainerClick(qIndex: number) {
    this.currentQIdx = qIndex;
  }


  onFileUpload($event: any) {
    const files = $event.srcElement.files;
    if (files !== null && files !== undefined && files.length > 0) {
      // todo: read file and populate allQuestions
      console.log(files);
      if (files && files.length > 0) {
        let file: File = files.item(0);
        console.log(file.name);
        console.log(file.size);
        console.log(file.type);
        let reader: FileReader = new FileReader();
        reader.readAsText(file);
        reader.onload = (e) => {
          let csv: string = reader.result as string;
          this.convertCsvStringToJson(csv);
        }
      }
    }
  }

  convertCsvStringToJson(data: string) {
    console.log(data);
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
  }

  deleteSection(index: number) {
    this.test.sections.splice(index, 1);
    if (index < this.currentSectionIdx) {
      this.currentSectionIdx--;
    }
  }

  onSectionClick(sectionIndex: number) {
    this.currentSectionIdx = sectionIndex;
  }


  saveTest() {
    console.log(this.test);
  }
}
