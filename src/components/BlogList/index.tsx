import { CardItem } from 'components/CardItem';
import { useThemeProvider } from 'hooks/useThemeProvider';
import moment from 'moment';
import { Col } from 'react-bootstrap';
import { ITheme } from 'types/theme';

export const BlogList = ({ data = [] }) => {
  const { theme } = useThemeProvider() as { theme: ITheme };

  const getFormattedDate = (blog: any) => {
    const dateValue = blog.publishedAt || blog.date || blog.createdAt || blog._createdAt;
    const momentDate = moment(dateValue);
    return momentDate.isValid() ? momentDate.format('LL') : 'No date';
  };

  return data.map(page =>
    page.map(blog => (
      <Col key={blog.slug} lg="4" md="6" className="mb-4">
        <CardItem
          title={blog.title}
          subtitle={blog.subtitle}
          date={getFormattedDate(blog)}
          image={blog.coverImage}
          link={{ href: `/blogs/${blog.slug}` }}
          theme={theme}
        />
      </Col>
    ))
  );
};