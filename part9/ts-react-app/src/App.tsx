import React from 'react';
import './App.css';

const MyComp1 = () => {
  // Typescript automatically infers the return type of this function 
  // (i.e., a react component) as `JSX.Element`.
  return <div>Typescript has auto inference!</div>
}

const MyComp2 = (): JSX.Element => {
  // We are explicitly defining the return type of a function here 
  // (i.e., a react component).
  return <div>Typescript React is easy.</div>
}

interface MyProps{
  label: string;
  price?: number;
}

const MyComp3 = ({label, price}: MyProps): JSX.Element => {
  // We are explicitly defining the parameter types using interface `MyProps` 
  // and return types as `JSX.Element` in this function (i.e., a react component).
  return <div>Typescript is great. {label} {price}</div>
}

const MyComp4 = ({label, price}: {label: string, price: number}) => {
  // We are explicitly defining the parameter types using an inline interface 
  // and typescript automatically infers the return type as JSX.Element of the function (i.e., a react component).
  return <div>There is nothing like typescript. {label} {price}</div>
}

const App = () => {
  return (
    <div>
      <MyComp1 />
      <MyComp2 />
      <MyComp3 label="ラベル" price={1428.57} />
      <MyComp3 label="ラベル" />
      <MyComp4 label="ラベル" price={1428.57} />
    </div>
  );
}

export default App;
