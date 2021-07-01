import styled from 'styled-components';

// eslint-disable-next-line import/prefer-default-export
export const Table = styled.table`
  text-align: left;
  margin: 1rem 0;

  thead {
    background: lightskyblue;
  }

  th, td {
    width: 25%;
    padding: 0.5rem;
  }

  tr:nth-child(even) {
    background: #eee;
  }
`;
