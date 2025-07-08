const apiRoute = '/api';
const blogsRoute = `${apiRoute}/blogs`;
const blogRoute = `${apiRoute}/blog`;


export const AppApis = {
    blogs: {
        default: blogsRoute,
        create: `${blogsRoute}/create`,
        edit: `${blogsRoute}/edit`,
        delete: `${blogsRoute}/delete`,
        toggleVisibility: `${blogsRoute}/toggle-visibility`,
    },
    blog: {
        trackView: `${blogRoute}/track-view`
    }
}
