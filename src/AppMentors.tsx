import React, {useReducer} from 'react';
import personReducer from "./reducer/person-reducer";
import {Person} from "./type"

export default function AppMentor() {
    // const [person, setPerson] = useState<Person>(initialPerson);
    /*
    * 객체를 만들어나갈 로직을 작성한 함수, 초기값
    * 상태에 접근할 수 있는 변수(person)와 reducer를 호출할 수 있는 dispatch로 구성되어 있다.
    * */
    const [person, dispatch] = useReducer(personReducer, initialPerson);

    const handleUpdate = () => {
        const prev = prompt(`누구의 이름을 바꾸고 싶은가요?`);
        const curr = prompt(`이름을 무엇으로 바꾸고 싶은가요?`);
        dispatch({ type: 'updated', prev, curr});
        /*
        * person.mentors[0].name = current;
        * setPerson(person);
        * UI에 변화가 없다.
        * react는 객체를 얕은 깊이 탐색을 한다. 즉 객체의 참조값이 변경되어야 객체가 바뀐 것이라고 인식한다.
        * 위와 같이, 비록 person 객체가 상태를 나타낸다 하더라도 참조값이 같은 상태에서 그 값만 변동된 경우에는 변경된 것으로 인식하지 않는다.
        * 이것이 리액트의 객체가 불변성을 유지해야 하는 이유이다.
        * 그래서 리액트에서 상태는 readonly, 읽기 전용이 걸려있습니다.
        * 이를 불편하게 여긴 사람들이 Redux, MobX, Immer 같은 라이브러리를 개발하였습니다.
        * 이제는 리액트 최신버전에서 제공해주는 훅으로 상태 관리를 할 수 있게 되었다.
        * useState. 상태가 객체거나 배열인 경우에도 상태 관리를 할 수 있다.
        * 그리고 상태관리 코드를 재사용하고 싶거나 분리하고 싶다면 useReducer 사용할 수 있다.
        * 또한 컴포넌트에서 글로벌하게 사용되는 context 훅을 사용할 수 있다.
        * 웹 어플리케이션이나 모바일 어플리케이션이라면 굳이 상태관리 라이브러리를 사용할 필요는 없으나
        * 클라이언트에서 복잡한 상호작용이 발생할 경우에는 고려해 볼 수 있다.
        * 네트워크 상에서 받아오는 데이터를 글로벌하게 상태관리할 수 있는 네트워크 라이브러리도 있는데, 그것은 추후 배운다.
        * */
        /*setPerson((person) => ({...person, mentors: [...person.mentors].map((mentor) => {
                if(mentor.name === prev) {
                    return {...mentor, name: current};
                }
                return mentor
            }),
        }))*/
    }

    const handleAdd = () => {
        // 멘토의 이름과 타이틀을 입력받아서
        // 멘토 배열에 추가하기
        const name = prompt("추가할 멘토의 이름을 입력하세요.");
        const title = prompt("추가할 멘토의 직함을 입력하세요.");
        dispatch({ type: "added", name, title });
        /*setPerson((person) => ({...person, mentors: [...person.mentors, {name, title}]}))*/
    }

    const handleDelete = () => {
        // 멘토의 이름을 입력받아서
        // 멘토 배열에서 삭제하기
        const name = prompt("삭제할 멘토의 이름을 입력하세요.");
        dispatch({ type: "deleted", name })
        /*setPerson((person) => ({...person, mentors: [...person.mentors].filter((mentor) => mentor.name !== name)}));*/
    }

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
            <button onClick={() => handleUpdate}>멘토의 이름을 바꾸기</button>
            <button onClick={() => handleAdd}>멘토 추가하기</button>
            <button onClick={() => handleDelete}>멘토 삭제하기</button>
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
}