import React, { useState } from 'react';

const Header = ({ text }) => <h1>{text}</h1>;

// Useful generic button component.
const Button = ({ handleClick, text }) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  );
};

// Create a HTML table row.
const Statistic = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

// Create a HTML table.
const Statistics = (props) => {
  const { good, neutral, bad } = props;

  // If all values are zero, show a placeholder message.
  if (good === 0 && neutral === 0 && bad === 0) {
    return <div>No feedback given</div>;
  }

  // Calculate some aggregate statistics.
  const total = good + neutral + bad;
  const average = (good - bad) / total;
  const positive = good / total * 100;

  return (
    <table>
      <tbody>
        <Statistic text='good' value={good} />
        <Statistic text='neutral' value={neutral} />
        <Statistic text='bad' value={bad} />
        <Statistic text='total' value={total} />
        <Statistic text='average' value={average} />
        <Statistic text='positive' value={positive} />
      </tbody>
    </table>
  );
};

const App = () => {
  // Save clicks of each button to its own state variable
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  // Button click handler functions for each state.
  const handleGood = () => setGood(good + 1);
  const handleNeutral = () => setNeutral(neutral + 1);
  const handleBad = () => setBad(bad + 1);

  return (
    <div>
      <Header text='give feedback' />
      <Button handleClick={handleGood} text='good' />
      <Button handleClick={handleNeutral} text='neutral' />
      <Button handleClick={handleBad} text='bad' />
      <Header text='statistics' />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
