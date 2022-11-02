// const { Op } = require('sequelize');
const { User, BlogPost, PostCategory, Category } = require('../models');
const { validatedToken } = require('../utils/jwt.utils');

// validações
const { schemaPost, schemaEdited } = require('../utils/validations');

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

const userLogin = async (token) => {
  const user = await validatedToken(token);
  return user.id;
};

const addPosts = async ({ id, title, content, categoryIds }, token) => {
  const date = '2011-08-01T19';
  // adiciona o novo post
  const blogPosts = await BlogPost.create(
    { id, title, content, userId: await userLogin(token), published: date, updated: date },
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

  return blogPosts.dataValues;
};

const getPosts = async () => {
  const result = await BlogPost.findAll({
    include: [{
      model: User,
      as: 'user',
      attributes: { exclude: ['password'] },
    },
    {
      model: Category,
      as: 'categories',
      attributes: ['id', 'name'],
    },
  ],
  });
  return result;
};

const getById = async (id) => {
  const validated = await BlogPost.findByPk(id);

  if (!validated) return { type: 'POST_NOT_FOUND', message: 'Post does not exist' };
  
  const result = await BlogPost.findByPk(id, {
    include: [{
      model: User,
      as: 'user',
      attributes: { exclude: ['password'] },
    },
    {
      model: Category,
      as: 'categories',
      attributes: ['id', 'name'],
    },
  ],
  });

  return { type: null, message: result.dataValues };
};

const editedPost = async (id, post, token) => {
  const { error, value } = schemaEdited.validate(post);

  if (error) return { type: 'FIELD_IS_REQUIRED', message: error.message };

  // o post só pode ser alterado se a pessoa for dona dele
  const user = await userLogin(token);
  console.log('user', user);
  
  const postAfter = await BlogPost.findByPk(id);
  const { userId } = postAfter.dataValues;
  console.log('usúario do post', userId);

  if (user !== userId) return { type: 'UNAUTHORIZED_USER', message: 'Unauthorized user' };

  // atualiza o post
  await BlogPost.update(value, {
    where: { id },
  });

  const postBefore = await getById(id);

  return { type: null, message: postBefore.message };
};

module.exports = {
  addPosts,
  validatedPost,
  getPosts,
  getById,
  editedPost,
};