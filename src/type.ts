export type Person = {
    name: string,
    title: string,
    mentors: Mentor[],
}
export type Mentor = {
    name: string | null,
    title: string | null,
}