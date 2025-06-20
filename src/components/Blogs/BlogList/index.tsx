import { useState } from 'react';
import { Col, Row, Button, Alert } from 'react-bootstrap';
import { CardItem } from 'components/CardItem';
import { Wrapper, MessageBox } from './styles';
import moment from 'moment';
import { ITheme } from 'types/theme';

interface Blog {
  _id?: string;
  slug?: string;
  title: string;
  subtitle?: string;
  publishedAt?: string;
  createdAt?: string;
  date?: string;
  _createdAt?: string;
  coverImage?: string;
  tags?: string[];
  hidden?: boolean;
  numOfViews?: number;
  numOfShares?: number;
}

interface BlogListProps {
  data: any[];
  theme: ITheme;
  isAdmin?: boolean;
  authenticated?: boolean;
  searchTerm?: string;
  setSearchTerm?: (term: string) => void;
  filter?: any;
  setFilter?: (filter: any) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string, title: string) => void;
  onToggleHidden?: (id: string, hidden: boolean) => void;
  deleteSuccess?: string;
  deleteError?: string;
  dismissAlert?: (type: 'success' | 'error') => void;
  hitEnd?: boolean;
  size?: number;
  setSize?: (size: number) => void;
}

export const BlogList = ({
  data = [],
  theme,
  isAdmin = false,
  authenticated = true,
  onEdit = () => {},
  onDelete = () => {},
  onToggleHidden = () => {},
  deleteSuccess,
  deleteError,
  dismissAlert = () => {},
  hitEnd = true,
  size = 1,
  setSize = () => {},
}: BlogListProps) => {
  const blogs = Array.isArray(data[0]) ? data.flat() : data;
  const getFormattedDate = (blog: Blog) => {
    const dateValue =
      blog.publishedAt || blog.date || blog.createdAt || blog._createdAt;
    const momentDate = moment(dateValue);
    return momentDate.isValid() ? momentDate.format('LL') : 'No date';
  };

  if (isAdmin && !authenticated) return null;

  return (
    <Wrapper md={12}>
      {isAdmin && (
        <>
          {deleteSuccess && (
            <Alert
              variant="success"
              dismissible
              onClose={() => dismissAlert('success')}
            >
              {deleteSuccess}
            </Alert>
          )}
          {deleteError && (
            <Alert
              variant="danger"
              dismissible
              onClose={() => dismissAlert('error')}
            >
              {deleteError}
            </Alert>
          )}
        </>
      )}

      {blogs.length > 0 ? (
        <>
          <Row>
            {blogs.map(blog => (
              <Col key={blog._id || blog.slug} lg="4" md="6" className="mb-4">
                <CardItem
                  title={blog.title}
                  subtitle={blog.subtitle}
                  date={getFormattedDate(blog)}
                  image={blog.coverImage}
                  link={isAdmin ? undefined : { href: `/blogs/${blog.slug}` }}
                  tags={blog.tags || []}
                  isAdmin={isAdmin}
                  onEdit={isAdmin ? () => onEdit(blog._id!) : undefined}
                  onDelete={
                    isAdmin ? () => onDelete(blog._id!, blog.title) : undefined
                  }
                  onToggleHidden={
                    isAdmin
                      ? () => onToggleHidden(blog._id!, !blog.hidden)
                      : undefined
                  }
                  hidden={isAdmin ? blog.hidden : undefined}
                  theme={theme}
                  numOfViews={blog.numOfViews || 0}
                  numOfShares={blog.numOfShares || 0}
                />
              </Col>
            ))}
          </Row>

          {isAdmin && !hitEnd && (
            <MessageBox>
              <Button
                onClick={() => setSize(size + 1)}
                variant="outline-secondary"
                size="lg"
              >
                Load More
              </Button>
            </MessageBox>
          )}
        </>
      ) : (
        <MessageBox>
          <p>No blogs found.</p>
        </MessageBox>
      )}
    </Wrapper>
  );
};
