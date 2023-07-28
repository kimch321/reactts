import React, { useState } from 'react';

type Form = {
    name: string;
    email: string;
}

export default function AppForm() {
    const [form, setForm] = useState<Form>({ name: "", email: "" });
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        // submit시 refresh가 된다. 따라서 refresh를 원하는게 아니라면 e.preventDefault로 막아주어야 한다.
        // 리액트의 철학은 상태가 업데이트 되면 UI를 다시 렌더링 한다.
        // submit시 refresh되는 것은 리액트의 철학에 맞지 않는 행동이다. 이런 행동을 하는 컴포넌트를
        // uncoltrolled component라고 한다.
        e.preventDefault();
        console.log(form);
    };
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const {name, value} = e.target;
        setForm({...form, [name]: value});
    }
    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor='name'>이름:</label>
            <input
                type='text'
                id='name'
                name='name'
                value = {form.name}
                onChange = {handleChange}
            />
            <label htmlFor='email'>이메일:</label>
            <input
                type='email'
                id='email'
                name='email'
                value = {form.email}
                onChange = {handleChange}
            />
            <button>Submit</button>
        </form>
    );
}
