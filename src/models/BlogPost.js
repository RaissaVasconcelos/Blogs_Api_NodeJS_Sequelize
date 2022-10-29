module.exports = (sequelize, DataTypes) => {
  const blogPosts = sequelize.define('BlogPost', {
    id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
    },
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'users',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    published: DataTypes.STRING,
    updated: DataTypes.STRING,
  },
  {
    tableName: 'blog_posts',
    underscored: true,
    timestamps: false,
  });

  blogPosts.associate = (models) => {
    blogPosts.belongsTo(models.User, {
      as: 'user',
      foreignKey: 'id',
    })
  }

  return blogPosts;
};