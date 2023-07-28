import React, {ReactNode} from 'react';

// children 사용
// 다양한 재사용 방법
// 태그 중간에 무언가 다양하게 넣고 싶다면
// children의 type은 ReactNode가 좋다. 더 구체적인 타입도 있는 듯 하다.
export default function AppWrap() {
    return (
        <div>
            <Navbar>
                <Avatar
                    image='https://images.unsplash.com/photo-1527980965255-d3b416303d12?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1160&q=80'
                    name='Bob'
                    size={200}
                />
                <p>안녕하세요!</p>
            </Navbar>

            <Navbar>
                <p>안녕하세요!</p>
            </Navbar>
        </div>
    );
}

type NavbarProp = {
    children: ReactNode;
}
function Navbar({ children }: NavbarProp) {
    return <header style={{ backgroundColor: 'yellow' }}>{children}</header>;
}

type Avatar = {
    image: string;
    name: string | null;
    size: number
}
function Avatar({ image, name, size }: Avatar) {
    return (
        <div>
            <img
                src={image}
                alt={`${name}'`}
                width={size}
                height={size}
                style={{ borderRadius: '50%' }}
            />
        </div>
    );
}
