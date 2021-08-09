import React from 'react';
import { CoursePart } from '../types';
import Part from './Part';

const Content = ({ courseParts }: { courseParts: CoursePart[] }) => (
  <div>
    {courseParts.map((part) => (
      <Part
        key={part.name}
        part={part}
      />
    ))}
  </div>
);

export default Content;
