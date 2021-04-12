'use strict'

module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Feed', {
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
    tableName: 'feeds',
    timestamps: true,
  })

  Post.associate = function(models) {
    // associations
  }

  return Feed
}