'use strict'

module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER.UNSIGNED
    },
    userUid: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    creator: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    post: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    }
  }, {
    tableName: 'posts',
    timestamps: true,
  })

  Post.associate = function(models) {
    // associations
  }

  return Post
}