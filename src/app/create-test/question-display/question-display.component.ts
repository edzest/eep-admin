import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { Question } from 'src/app/shared/models/question';


@Component({
  selector: 'app-question-display',
  templateUrl: './question-display.component.html',
  styleUrls: ['./question-display.component.css']
})
export class QuestionDisplayComponent implements OnInit {

  constructor() { }

  @Input() question!: Question;
  @Input() qIndex!: number;
  @Input() currentlyEditingQIdx: number | undefined | null;

  @Output() deleteQuestion: EventEmitter<number> = new EventEmitter();
  @Output() duplicateQuestion: EventEmitter<number> = new EventEmitter();


  editExplanation: boolean = false;
  addExplanation: string = "Add explanation";
  hideExplanation: string = "Hide explanation";

  explanationMenuTxt!: string;


  ngOnInit(): void {
    if (this.editExplanation) {
      this.explanationMenuTxt = this.hideExplanation;
    } else {
      this.explanationMenuTxt = this.addExplanation;
    }

    if (!this.question.tags) {
      this.question.tags = [];
    }
  }

  onDuplicateQuestion(qIndex: number) {
    this.duplicateQuestion.emit(qIndex);
  }

  onDeleteQuestion(qIndex: number) {
    this.deleteQuestion.emit(qIndex);
  }


  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  add(event: MatChipInputEvent): void {
    const tag = (event.value || '').trim();

    if (tag) {
      this.question.tags?.push(tag);
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(tag: string): void {
    const index = this.question.tags?.indexOf(tag);

    if (index && index >= 0) {
      this.question.tags?.splice(index, 1);
    }
  }

  toggleExplanation() {
    this.editExplanation = !this.editExplanation;
    if (this.editExplanation) {
      this.explanationMenuTxt = this.hideExplanation;
    } else {
      this.explanationMenuTxt = this.addExplanation;
    }
  }

}
