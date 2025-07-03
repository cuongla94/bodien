// components/Admin/AdminPasswordForm.tsx
import { useState } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import {
  ModalStyled,
  ModalBodyStyled,
  OtpCircle,
  ModalDialogStyled,
  FormWrapper,
  ErrorText,
} from './styles';

interface AdminPasswordFormProps {
  onSubmit: (password: string) => void;
  show: boolean;
  error?: string;
  loading?: boolean;
}

export const AdminPasswordForm = ({
  onSubmit,
  show,
  error,
  loading,
}: AdminPasswordFormProps) => {
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(password);
  };

  return (
    <ModalStyled
      show={show}
      centered
      backdrop="static"
      keyboard={false}
      contentClassName="border-0 shadow rounded"
      dialogClassName="admin-password-modal"
      dialogAs={ModalDialogStyled}
    >
      <ModalBodyStyled>
        <div className="mb-4 text-center">
          <OtpCircle>🔐</OtpCircle>
          <h5 className="fw-bold mt-3">Admin Access</h5>
          <p className="text-muted small">Enter your password to continue</p>
        </div>

        {error && <ErrorText>{error}</ErrorText>}

        <FormWrapper onSubmit={handleSubmit}>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            disabled={loading}
            required
            className="mb-3 text-center"
          />
          <Button type="button" variant="primary" disabled={loading}>
            {loading ? 'Verifying...' : 'Submit'}
          </Button>
        </FormWrapper>
      </ModalBodyStyled>
    </ModalStyled>
  );
};
