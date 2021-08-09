import React from 'react';
import { CoursePart } from '../types';

const Total = ({ courseParts }: { courseParts: CoursePart[] }) => (
  <div>
    <p>
      {'Number of exercises: '}
      <strong>
        {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
      </strong>
    </p>
  </div>
);

export default Total;
