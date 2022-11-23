module.exports = function (sequelize, DataTypes) {
    // 계좌
    let comment = sequelize.define(
      "Comment",
      {
        // PK_AutoIncrement
        id: {
          type: DataTypes.BIGINT,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true
        },
        comment_content:{
          type: DataTypes.STRING,
          allowNull: true,
        },
      },
      {
        tableName: "Comment",
        timestamp: true,
        charset: "utf8",
        underscored: true,
      }
    );
    comment.associate = models => {
       comment.belongsTo(models.User, {foreignKey: "user_id", sourceKey: "id"});
       comment.belongsTo(models.Board, {foreignKey: "board_id", sourceKey: "id"});
    };
  
    return board;
  };