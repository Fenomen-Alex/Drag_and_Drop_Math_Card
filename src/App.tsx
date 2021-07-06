import React, {useState} from 'react';
import './App.css';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Spot from "./components/Spot";
import Card from "./components/Card";

const App = (): JSX.Element => {
  const [number1, setNumber1] = useState<number>(1);
  const [number2, setNumber2] = useState<number>(1);
  const [operator, setOperator] = useState<string>('*');
  const result = (a: number, b: number, operator: string | number): number | undefined => {
    if (operator === '+') return a + b;
    if (operator === '-') return a - b;
    if (operator === '*') return a * b;
    if (operator === '/') return Number((a / b).toFixed(2));
  }

  const handleDrop = (spot: string, item: any) => {
    console.log(item);
    if (spot === 'number1') setNumber1(item.text);
    if (spot === 'number2') setNumber2(item.text);
    if (spot === 'operator') setOperator(item.text);
  }

  return (
      <DndProvider backend={HTML5Backend}>
        <div className="app">
          {/* math card */}
          <div className="math-card">
            <Spot
                type="number"
                text={number1}
                spot="number1"
                handleDrop={handleDrop}
            />
            <Spot
                type="number"
                text={number2}
                spot="number2"
                handleDrop={handleDrop}
            />
            <Spot
                type="operator"
                text={operator}
                spot="operator"
                handleDrop={handleDrop}
            />
            <div className="total">{result(number1, number2, operator)}</div>
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

export default App;
