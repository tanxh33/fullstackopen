import React from 'react';
import { CoursePart } from '../types';

// Helper function for exhaustive type checking
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`,
  );
};

const Part = ({ part }: { part: CoursePart }) => {
  const descriptionStyle = {
    fontStyle: 'italic',
  };

  // Use switch-case to narrow down the type based on some shared attribute in the type union.
  switch (part.type) {
    case 'normal':
      return (
        <p>
          <strong>
            {`${part.name} (${part.exerciseCount} parts)`}
          </strong>
          <br />
          <span style={descriptionStyle}>
            {part.description}
          </span>
        </p>
      );

    case 'groupProject':
      return (
        <p>
          <strong>
            {`${part.name} (${part.exerciseCount} parts)`}
          </strong>
          <br />
          {`Project exercises: ${part.groupProjectCount}`}
        </p>
      );

    case 'submission':
      return (
        <p>
          <strong>
            {`${part.name} (${part.exerciseCount} parts)`}
          </strong>
          <br />
          <span style={descriptionStyle}>
            {part.description}
          </span>
          <br />
          {'Submit to: '}
          <a href={part.exerciseSubmissionLink} target="_blank" rel="noreferrer">
            {part.exerciseSubmissionLink}
          </a>
        </p>
      );

    case 'special':
      return (
        <p>
          <strong>
            {`${part.name} (${part.exerciseCount} parts)`}
          </strong>
          <br />
          <span style={descriptionStyle}>
            {part.description}
          </span>
          <br />
          {'Required skills: '}
          {part.requirements.join(', ')}
        </p>
      );

    default:
      return assertNever(part);
  }
};

export default Part;
