module.exports = (sequelize, DataTypes) => {
  const PostsCategory = sequelize.define('PostCategory',
    {
      postId: DataTypes.INTEGER,
      categoryId: DataTypes.INTEGER,
    },
    {
      tableName: 'PostsCategory',
      underscored: true,
      timestamps: false,
    });

    PostsCategory.associate = (models) => {
      models.Category.belongsToMany(models.BlogPost, {
        as: 'blogPosts', // referencia ao modelo BlogPosts
        through: 'PostsCategory',  // cria um relacionamento N:N no modelo PostCategory
        foreignKey: 'category_id', // se refere ao id de Category na tabela
        otherKey: 'post_id',
      });
      models.BlogPost.belongsToMany(models.Category, {
        as: 'categories',
        through: 'PostsCategory',
        foreignKey: 'post_id',
        otherKey: 'category_id',
      });
    };

  return PostsCategory;
};
