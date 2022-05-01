// Type to store question and its answers
export interface McqQuestion {
    question: string,
    options: Option[],
    correctOptions: string[]
}
  
export interface Option {
    id: number,
    option: string
}