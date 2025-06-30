import moment from 'moment-timezone';

export const getFormattedDate = (blog, timeZone = moment.tz.guess()) => {
  const dateValue = blog.publishedAt || blog.date || blog._createdAt;
  const momentDate = moment.tz(dateValue, timeZone);

  return momentDate.isValid() ? momentDate.format('LL') : 'No date';
};
