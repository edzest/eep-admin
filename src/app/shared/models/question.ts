import { Option } from "./option";

export interface Question {
    questionTxt: string,
    options: Option[],
    correctOptions: String[],
    explanation?: string,
    tags?: string[]
}