import { useState } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';

interface AdminPasswordFormProps {
  onSubmit: (password: string) => void;
  show: boolean;
  error?: string;
  loading?: boolean;
}

export const AdminPasswordForm = ({ onSubmit, show, error, loading }: AdminPasswordFormProps) => {
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(password);
  };

  return (
    <Modal show={show} centered backdrop="static" keyboard={false} contentClassName="border-0 shadow rounded" dialogClassName="admin-password-modal">
      <Modal.Body className="p-4 text-center" style={{ background: '#f7f9fc' }}>
        <div className="mb-4">
          <div className="otp-circle mx-auto mb-3">🔐</div>
          <h5 className="fw-bold">Admin Access</h5>
          <p className="text-muted small">Enter your password to continue</p>
        </div>
        {error && <div className="text-danger small mb-2">{error}</div>}
        <Form onSubmit={handleSubmit}>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
            required
            className="mb-3 text-center"
            style={{ maxWidth: '250px', marginInline: 'auto' }}
          />
          <Button type="submit" variant="primary" disabled={loading}>
            {loading ? 'Verifying...' : 'Submit'}
          </Button>
        </Form>
      </Modal.Body>

      <style jsx>{`
        .otp-circle {
          width: 60px;
          height: 60px;
          background: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          border: 2px solid #007bff;
        }
        .admin-password-modal {
          max-width: 350px;
        }
      `}</style>
    </Modal>
  );
};
