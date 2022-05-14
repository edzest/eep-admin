import { v4 as uuidv4 } from 'uuid';
import { Injectable } from '@angular/core';
import { Test } from 'src/app/shared/models/test'; 
import { Question } from '../shared/models/question';
import { Section } from '../shared/models/section';


export interface ExcelRow {
  Question: string;
  Option1: string;
  Option2: string;
  Option3: string;
  Option4: string;
  CorrectAnswers: string;
  Explanation: string;
  Tags: string;
}

@Injectable({
  providedIn: 'root'
})
export class ExcelService {

  constructor() { }

  createTest(sheetData: {name: string, data: ExcelRow[]}[]) {
    let test: Test = {
      testId: uuidv4(),
      title: "Untitled Exam",
      sections: []
   };

   for (let sheet of sheetData) {
     let sectionName = sheet.name;
     let dataRows = sheet.data;
     let questions = [];
     for (let row of dataRows) {
      let options = [row.Option1, row.Option2, row.Option3, row.Option4];
       let question: Question = {
         questionTxt: row.Question,
         options: options.map((opt, idx) => {return {id: idx, option: opt}}, options),
         correctOptions: row.CorrectAnswers.split(','),
         explanation: row.Explanation,
         tags: row.Tags.split(',')
       };
       questions.push(question);
     } 
     let section: Section = {
       sectionName: sectionName,
       questions: questions
     };
     test.sections.push(section);
   }

   return test;

  }
}
