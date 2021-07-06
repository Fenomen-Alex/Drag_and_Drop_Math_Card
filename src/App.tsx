import React from 'react';
import './App.css';
import {DndProvider, useDrag} from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend';

export default function App() {
  return (
      <DndProvider backend={HTML5Backend}>
        <div className="app">
          {/* math card */}
          <div className="math-card">
            <div className="spot">1</div>
            <div className="spot">1</div>
            <div className="spot">+</div>
            <div className="total">2</div>
          </div>

          <div>
            <div className="cards numbers">
              {Array(10)
                  .fill(0)
                  .map((n, i) => (
                      <Number key={i} text={i}/>
                  ))}
            </div>

            <div className="cards operators">
              {['*', '-', '+', '/'].map((o, i) => (
                  <Operator key={i} text={o}/>
              ))}
            </div>
          </div>
        </div>
      </DndProvider>
  );
}

const Number = (props: { text: number }) => {
  const {text} = props;
  const [{opacity}, dragRef] = useDrag(() => ({
        type: 'number',
        number: { text },
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
