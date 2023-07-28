import {Person} from "../type"
type UpdatedAction = {
    type: 'updated',
    prev: string | null,
    curr: string | null,
};
type AddedAction = {
    type: 'added',
    name: string | null,
    title: string | null,
};
type DeletedAction = {
    type: 'deleted',
    name: string | null,
};

type Action = UpdatedAction | AddedAction | DeletedAction;

export default function personReducer(person: Person, action: Action): Person {
    switch(action.type) {
        case 'updated': {
            const { prev, curr } = action;
            return {
                ...person,
                mentors: person.mentors.map((mentor) => {
                    if(mentor.name === prev) return {...mentor, name: curr};
                    return mentor;
                }),
            };
        }
        case 'added': {
            const { name, title } = action;
            return {...person,
                mentors: [...person.mentors, { name, title }],
            }
        }
        case 'deleted': {
            const { name } = action;
            return {
                ...person,
                mentors:person.mentors.filter((mentor) => mentor.name !== name)
            }
        }
        default: {
            throw new Error(`알수없는 액션 타입입니다: ${action.type}`);
        }
    }
}