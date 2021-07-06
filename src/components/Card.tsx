import React from 'react';
import {useDrag} from 'react-dnd';

const Card = (props: { text: number | string, type: string }): JSX.Element => {
  const {text, type} = props;
  const [{opacity}, dragRef] = useDrag(() => ({
        type,
        item: () => ({
          text
        }),
        collect: (monitor) => ({
          opacity: monitor.isDragging() ? 0.5 : 1
        })
      }),
      []);

  return (
      <div
          className="card"
          ref={dragRef}
          style={{opacity}}
      >
        {text}
      </div>
  )
}

export default Card;
