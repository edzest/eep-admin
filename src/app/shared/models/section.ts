import { Question } from "./question";

export interface Section {
    sectionName: string,
    duration?: number,
    questions: Question[]
}