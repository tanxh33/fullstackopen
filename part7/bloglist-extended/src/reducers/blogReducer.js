import blogService from '../services/blogs';

const sortByLikes = (b1, b2) => b2.likes - b1.likes;

export const getBlogs = () => async (dispatch) => {
  const allBlogs = await blogService.getAll();
  dispatch({
    type: 'GET_BLOGS',
    data: allBlogs,
  });
  dispatch({ type: 'SORT_BLOGS' });
};

export const createBlog = (blogObject) => async (dispatch) => {
  const newBlog = await blogService.create(blogObject);
  dispatch({
    type: 'CREATE_BLOG',
    data: newBlog,
  });
  return newBlog;
};

export const likeBlog = (id, blog) => async (dispatch) => {
  // Increment number of likes, then send a PUT request
  const updatedBlog = await blogService.update(id, { ...blog, likes: blog.likes + 1 });
  dispatch({
    type: 'LIKE_BLOG',
    data: updatedBlog,
  });
  dispatch({ type: 'SORT_BLOGS' });
  return updatedBlog;
};

export const deleteBlog = (id) => async (dispatch) => {
  await blogService.remove(id);
  dispatch({
    type: 'DELETE_BLOG',
    data: id,
  });
};

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'GET_BLOGS':
      return action.data;

    case 'CREATE_BLOG':
      return [...state, action.data];

    case 'LIKE_BLOG': {
      const updatedBlog = action.data;
      return state.map((blog) => (blog.id === updatedBlog.id ? updatedBlog : blog));
    }

    case 'DELETE_BLOG': {
      const id = action.data;
      return state.filter((blog) => blog.id !== id);
    }

    case 'SORT_BLOGS':
      return state.slice().sort(sortByLikes);

    default:
      return state;
  }
};

export default blogReducer;
