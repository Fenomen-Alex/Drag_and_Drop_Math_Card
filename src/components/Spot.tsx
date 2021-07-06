import React from 'react';
import { useDrop } from 'react-dnd';

const Spot = (props: { text: number | string, type: string, spot: string, handleDrop: Function }): JSX.Element => {
  const {text, type, spot, handleDrop} = props;
  const [{canDrop, isOver}, dropRef] = useDrop({
    accept: type,
    drop: item => {
      console.log(item)
      handleDrop(spot, item)
    },
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    })
  });

  let backgroundColor = '#f2f2f2';
  if (canDrop) backgroundColor = '#3db897';
  if (isOver) backgroundColor = '#4bdcb5';

  return (
      <div
          className="spot"
          ref={dropRef}
          style={{backgroundColor}}
      >
        {text}
      </div>
  )
}

export default Spot;
