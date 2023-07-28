import React from 'react';
import {Person} from "./type";
import {useImmer} from "use-immer";

/*immer 상태 객체를 더 쉽게 업데이트 하는 방법을 제공.
    불변성의 데이터 처리를 마치 가변적인 데이터를 처리하듯이 사용할 수 있게 해준다.
    immer 내부에서 새로운 객체를 만들어서 업데이트 해준다.
    뿐만 아니라 내부적으로 useState를 사용하고 있기 때문에 useImmer를 사용해서 상태를 업데이트하면 useState를 사용할 때와 동일하게 component를 업데이트해줍니다.*/

export default function AppMentor() {
    const [person, updatePerson] = useImmer<Person>(initialPerson);
    const handleUpdate = (): void => {
        const prev = prompt(`누구의 이름을 바꾸고 싶은가요?`);
        const current = prompt(`이름을 무엇으로 바꾸고 싶은가요?`);
        updatePerson(person =>{
            const mentor = person.mentors.find(m => m.name == prev);
            if(mentor !== undefined) mentor.name = current;
        })
    };
    const handleAdd = (): void => {
        const name = prompt(`멘토의 이름은?`);
        const title = prompt(`멘토의 직함은?`);
        updatePerson((person) => {
            if(name !== null && title !== null)person.mentors.push({name, title})
        });
    };
    const handleDelete = (): void => {
        const name = prompt(`누구를 삭제하고 싶은가요?`);
        updatePerson((person) => {
            const index = person.mentors.findIndex(m => m.name === name);
            person.mentors.splice(index, 1);
        })
    };
    return (
        <div>
            <h1>
                {person.name}는 {person.title}
            </h1>
            <p>{person.name}의 멘토는:</p>
            <ul>
                {person.mentors.map((mentor, index) => (
                    <li key={index}>
                        {mentor.name} ({mentor.title})
                    </li>
                ))}
            </ul>
            <button onClick={handleUpdate}>멘토의 이름을 바꾸기</button>
            <button onClick={handleAdd}>멘토 추가하기</button>
            <button onClick={handleDelete}>멘토 삭제하기</button>
        </div>
    );
}

const initialPerson: Person = {
    name: '엘리',
    title: '개발자',
    mentors: [
        {
            name: '밥',
            title: '시니어개발자',
        },
        {
            name: '제임스',
            title: '시니어개발자',
        },
    ],
};
