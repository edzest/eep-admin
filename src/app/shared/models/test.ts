import { Section } from "./section";

export interface Test {
    testId: string,
    title: string,
    sections: Section[],
    meta?: {
        examDuration: number
    },
    createdBy?: string,
    createdAt?: Date,
    updatdeAt?: Date
}