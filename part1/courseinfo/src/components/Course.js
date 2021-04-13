import React from 'react';

const Course = ({ course }) => (
  <div>
    <Header text={course.name} />
    <Content parts={course.parts} />
    <Total parts={course.parts} />
  </div>
);

const Header = ({ text }) => <h2>{text}</h2>;

// Takes in props containing all the course information.
const Content = ({ parts }) => (
  <div>
    {parts.map(part =>
      <Part key={part.id} name={part.name} exercises={part.exercises} />
    )}
  </div>
);

// Component displaying a single part.
const Part = ({ name, exercises }) => (
  <p>
    {name} {exercises}
  </p>
);

const Total = ({ parts }) => (
  <p><strong>
    Number of exercises: {
      parts.reduce((total, curr) => total + curr.exercises, 0)
    }
  </strong></p>
);

export default Course;
