import React, {useState} from 'react';
import './AppXY.css';

type Pointer = {x: number, y: number}
export default function AppXY() {
    const [pointer, setPointer] = useState<Pointer>({x: 0, y: 0});

    const findPointer = (e: React.MouseEvent<HTMLDivElement>) => {
        // setPointer({x: e.clientX, y: e.clientY});
        // 만약 수평으로만 이동이 가능하다면?
        setPointer((prev) => ({...prev, x: e.clientX}))
    }

  return (
      <div className='container' onPointerMove={findPointer}>
        <div className='pointer' style={{transform: `translate(${pointer.x}px, ${pointer.y}px)`}}/>
      </div>
  );
}
