// Utility helper functions for blog list.
const _ = require('lodash');

// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => 1;

const totalLikes = (blogs) => {
  const reducer = (result, item) => result + item.likes;
  return blogs.reduce(reducer, 0);
};

const favouriteBlog = (blogs) => {
  const getBlogWithMostLikes = (result, item) => (
    result.likes === undefined || item.likes > result.likes
      ? item
      : result
  );
  const bestBlog = blogs.reduce(getBlogWithMostLikes, {});
  return _.pick(bestBlog, ['title', 'author', 'likes']);
};

const mostBlogs = (blogs) => {
  const authorBlogCount = _.countBy(blogs, 'author');
  // Get key with highest value
  const maxAuthor = _.maxBy(_.keys(authorBlogCount), (o) => authorBlogCount[o]);

  return {
    author: maxAuthor,
    blogs: authorBlogCount[maxAuthor],
  };
};

const mostLikes = (blogs) => {
  // Get an object with { author: totalLikes }
  const authorLikes = blogs.reduce((result, item) => {
    const res = { ...result };
    const { author, likes } = item;
    res[author] = res[author] ? res[author] + likes : likes;
    return res;
  }, {});

  // Get author with highest like total
  const mostLikesAuthor = _.maxBy(_.keys(authorLikes), (o) => authorLikes[o]);

  return {
    author: mostLikesAuthor,
    likes: authorLikes[mostLikesAuthor],
  };
};

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikes,
};
