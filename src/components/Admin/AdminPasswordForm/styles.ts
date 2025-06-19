// components/Admin/styles.ts
import styled from 'styled-components';
import { Modal } from 'react-bootstrap';

export const ModalStyled = styled(Modal)`
  .modal-content {
    border-radius: 1rem;
  }
`;

export const ModalDialogStyled = styled(Modal.Dialog)`
  max-width: 350px;
  margin: auto;
`;

export const ModalBodyStyled = styled(Modal.Body)`
  padding: 2rem;
  background: #f7f9fc;
  text-align: center;
`;

export const OtpCircle = styled.div`
  width: 60px;
  height: 60px;
  background: white;
  border-radius: 50%;
  border: 2px solid #007bff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  margin: 0 auto;
`;

export const FormWrapper = styled.form`
  max-width: 250px;
  margin: 0 auto;
`;

export const ErrorText = styled.div`
  color: red;
  font-size: 0.85rem;
  margin-bottom: 0.5rem;
`;
