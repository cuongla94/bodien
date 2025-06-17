import { Container, Row, Col } from 'react-bootstrap';
import Link from 'next/link';
import { BlogCreateForm } from 'components/BlogCreateForm';

export default function CreateBlogPage() {
  return ( 
    <Container>
      <BlogCreateForm />
    </Container>
  );
}