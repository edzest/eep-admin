import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Question } from 'src/app/shared/models/question';
import { Option } from '../question-types';

@Component({
  selector: 'app-question-editor',
  templateUrl: './question-editor.component.html',
  styleUrls: ['./question-editor.component.css']
})
export class QuestionEditorComponent implements OnInit {

  @Input() question!: Question;
  @Input() qIndex!: number;

  @Output() duplicateQuestion: EventEmitter<number> = new EventEmitter();
  @Output() deleteQuestion: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  /**
   * Custom tracking function for options ngFor
   * This is required so that the input focus is not lost when ngModel is updated
   * @param index ngFor index - not required, only for matching syntax
   * @param option Current Option
   * @returns option id
   */
   optionsTrackFn(index: number, option: Option) {
    return option.id;
  } 

  /**
   * Removes the given option from the currently editing question
   * @param index option index
   */
   removeOption(index: number) {
    const options: Option[] = this.question.options;
    // if this option is in correctAnswers, remove from there too
    const option: Option = options[index];
    const correctOptions = this.question.correctOptions;

    if (correctOptions?.includes(option.option)) {
      const caIndex = correctOptions.indexOf(option.option);
      correctOptions.splice(caIndex, 1);
    }
    // remove from current options
    options.splice(index, 1);
  } 

  /**
   * Adds a new option to the currently editing question. 
   * This function creates a new option id by incrementing the last option id. Option id is required
   * to use the custom tracking function optionsTrackFn.
   */
   onClickAddOption(qIndex: number) {
    const optionsLength = this.question.options.length;
    const lastId = optionsLength == 0 ? 1 : this.question.options[optionsLength-1].id;

    const newOption: Option = {
      id: lastId + 1,
      option: ''
    }

    const options = this.question.options;
    options.push(newOption); 
  }

  onDuplicateQuestion(qIndex: number) {
    console.log(`clicked duplicate question ${qIndex}`);
    this.duplicateQuestion.emit(qIndex);
  }

  onDeleteQuestion(qIndex: number) {
    this.deleteQuestion.emit(qIndex);
  }

}
