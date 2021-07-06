import React from 'react';
import './App.css';
import {DndProvider, useDrag, useDrop} from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend';

export default function App() {
  return (
      <DndProvider backend={HTML5Backend}>
        <div className="app">
          {/* math card */}
          <div className="math-card">
            <Spot type="number"></Spot>
            <Spot type="number"></Spot>
            <Spot type="operator"></Spot>
            <div className="total">2</div>
          </div>

          <div>
            <div className="cards numbers">
              {Array(10)
                  .fill(0)
                  .map((n, i) => (
                      <Card key={i} text={i} type="number"/>
                  ))}
            </div>

            <div className="cards operators">
              {['*', '-', '+', '/'].map((o, i) => (
                  <Card key={i} text={o} type="operator"/>
              ))}
            </div>
          </div>
        </div>
      </DndProvider>
  );
}

const Spot = (props: { type: string }) => {
  const {type} = props;
  const [{canDrop, isOver}, dropRef] = useDrop({
    accept: type,
    drop: item => console.log(item),
    collect: monitor => ({
      isOver: !!monitor.isOver(),
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
          style={{ backgroundColor }}
      >
        0
      </div>
  )
}

const Card = (props: { text: number | string, type: string }) => {
  const {text, type} = props;
  const [{opacity}, dragRef] = useDrag(() => ({
        type,
        number: {text},
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

const Operator = (props: { text: string }) => {
  const {text} = props;
  const [, dragRef] = useDrag({
    type: 'operator'
  });
  return (
      <div className="card" ref={dragRef}>
        {text}
      </div>
  )
}
