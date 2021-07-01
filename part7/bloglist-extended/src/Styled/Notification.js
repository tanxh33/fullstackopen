import styled, { css } from 'styled-components';

// eslint-disable-next-line import/prefer-default-export
export const NotificationDiv = styled.div`
  margin: 0.5rem auto;
  padding: 1rem;
  border: 2px solid;
  border-radius: 0.25rem;

  ${(props) => props.notificationType === 'success' && css`
    color: #40c940;
  `}
  ${(props) => props.notificationType === 'danger' && css`
    color: #ca1515;
  `}
`;
