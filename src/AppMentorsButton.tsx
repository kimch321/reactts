import React, {memo, useCallback, useMemo, useReducer} from 'react';
import personReducer from './reducer/person-reducer';
import {Person} from "./type";

/*
* 리액트는 상태와 props가 변경되면 다시 렌더링 한다.
* 변경이란 새로운 참조값이 생기는 것이다.
* 현재 AppMentorsButton의 하위 컴포넌트 Button에는 AppMentorsButton에서 시작된 props가 전달되고 있다.
* button을 클릭해 이벤트함수를 실행하면 AppmentorsButton의 상태가 변경된다.
* AppMentorsButton는 다시 렌더링 되기 위해 컴포넌트를 재실행한다.
* 그 결과 컴포넌트의 함수들도 다시 초기화된다. => 즉 함수 바디가 다시 생성되어 재 할당 되고 참조값도 변경된다.
* 그렇게 Button 컴포넌트에 전달하는 props의 참조값이 변경되게 되어 Button컴포넌트도 다시 렌더링 되게 된다.
* 그리고 Button 컴포넌트 아래에 컴포넌트들이 있다면 모두 다시 렌더링 되게 된다.
* 하지만 문제 없다. 왜냐하면 이러한 렌더링은 가상dom에 일어나는 일이며 실제로 변경된것이 아니라면 real DOM에 업데이트 되지 않는다.
* 그러나 만약 다시 실행되는 컴포넌트에 반복문같은 무거운 함수가 실행되는 부분이 있다면, 이는 현실적인 성능 감소로 나타나게 된다.
* 이러한 경우에는 성능 개선을 고려해 봐야 한다.
* */

export default function AppMentorsButton() {
    const [person, dispatch] = useReducer(personReducer, initialPerson);

    // useMemo처럼 의존배열이 변경되지 않으면 딱 한번만 실행된다.
    // 차이점은 useMemo는 값의 재사용, useCallback은 로직이 재사용된다.
    const handleUpdate = useCallback(() => {
        const prev = prompt(`누구의 이름을 바꾸고 싶은가요?`);
        const curr = prompt(`이름을 무엇으로 바꾸고 싶은가요?`);
        dispatch({ type: 'updated', prev, curr });
    }, []);

    const handleAdd = () => {
        const name = prompt(`멘토의 이름은?`);
        const title = prompt(`멘토의 직함은?`);
        dispatch({ type: 'added', name, title });
    };

    const handleDelete = () => {
        const name = prompt(`누구를 삭제하고 싶은가요?`);
        dispatch({ type: 'deleted', name });
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
            <Button text={"멘토 이름을 바꾸기"} onClick={handleUpdate} />
            <Button text={"멘토 추가하기"} onClick={handleAdd} />
            <Button text={"멘토 삭제하기"} onClick={handleDelete} />
        </div>
    );
}

type ButtonProps = { text: string; onClick:() => void}
// memo 값을 검사하게 하는 것.
const Button = memo(({ text, onClick }: ButtonProps) => {
    console.log('Button', text, 're-rendering 😜');
    // 이렇게 무거운 계산이 들어있다면 비록 react가 가상 돔을 가지고 있다고 하더라도
    // 리렌더링 할 요소를 결정하는데 시간을 쓰게 된다.
    // 만약 컴포넌트가 다시 렌더링될때 한번만 호출해야 한다면 useEffect를 쓰면 되고,
    // 아니면 useMemo를 써도 된다. useMemo는 의존배열이 변경되지 않으면 딱 한번만 호출된다.
    const result = useMemo(() => calculateSomething(), []);
    return (
        <button
            onClick={onClick}
            style={{
                backgroundColor: 'black',
                color: 'white',
                borderRadius: '20px',
                margin: '0.4rem',
            }}
        >
            {`${text} ${result}`}
        </button>
    );
})

function calculateSomething(): number {
    for (let i = 0; i < 10000; i++) {
        console.log("무거운 계산 중...")
    }
    return 10;
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
