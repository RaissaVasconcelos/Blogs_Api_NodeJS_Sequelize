const { BlogPost, PostCategory, Category } = require('../models');
const { validatedToken } = require('../utils/jwt.utils');

// validações
const { schemaPost } = require('../utils/validations');

const validatedPost = async (post) => {
  const { categoryIds } = post;

  const { error, value } = schemaPost.validate(post);

  if (error) return { type: 'FIELD_IS_REQUIRED', message: error.message };

  const result = await Category.findAll();

  const validateCategory = result.every((categorie) => 
    categoryIds.find((item) => item === categorie.dataValues.id));

  if (validateCategory) return { type: null, message: value };
  
  return { type: 'FIELD_IS_REQUIRED', message: 'one or more "categoryIds" not found' };  
};

const userId = async (token) => {
  const user = await validatedToken(token);
  return user.id;
};

const addPosts = async ({ id, title, content, categoryIds }, token) => {
  const date = '2011-08-01T19';
  // adiciona o novo post
  const blogPosts = await BlogPost.create(
    { id, title, content, userId: await userId(token), published: date, updated: date },
  );
    
  const arrBulk = categoryIds.map((category) => {
    const post = blogPosts.dataValues;
    return { postId: post.id, categoryId: category };
  });

  // adiciona na tabela Categories
  await PostCategory.bulkCreate(
    arrBulk,
    { fields: ['postId', 'categoryId'] },
  );

  console.log(blogPosts.dataValues);

  return blogPosts.dataValues;
};

module.exports = {
  addPosts,
  validatedPost,
};