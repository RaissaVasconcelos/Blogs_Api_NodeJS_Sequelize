module.exports = (sequelize, DataTypes) => {
  const blogPosts = sequelize.define('BlogPost', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    published: DataTypes.STRING,
    updated: DataTypes.STRING,
  },
  {
    tableName: 'blog_posts',
    underscored: true,
    timestamps: false,
  });

  blogPosts.associate = ({ User }) => {
    blogPosts.belongsTo(User, {
      as: 'user',
      foreignKey: 'userId',
    })
  }

  return blogPosts;
};