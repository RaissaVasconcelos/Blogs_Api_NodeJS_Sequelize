module.exports = (sequelize, DataTypes) => {
  const PostCategory = sequelize.define('PostCategory',
    {
      postId: DataTypes.INTEGER,
      categoryId: DataTypes.INTEGER,
    },
    {
      tableName: 'posts_categories',
      underscored: true,
      timestamps: false,
    });

    PostCategory.associate = (models) => {
      models.Category.belongsToMany(models.BlogPost, {
        as: 'blogPosts', // referencia ao modelo BlogPosts
        through: 'PostCategory',  // cria um relacionamento N:N no modelo PostCategory
        foreignKey: 'category_id', // se refere ao id de Category na tabela
        otherKey: 'post_id',
      });
      models.BlogPost.belongsToMany(models.Category, {
        as: 'categories',
        through: 'PostCategory',
        foreignKey: 'post_id',
        otherKey: 'category_id',
      });
    };

  return PostCategory;
};
