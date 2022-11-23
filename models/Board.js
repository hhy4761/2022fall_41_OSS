module.exports = function (sequelize, DataTypes) {
    // 계좌
    let board = sequelize.define(
      "Board",
      {
        // PK_AutoIncrement
        id: {
          type: DataTypes.BIGINT,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true
        },
        title:{
          type: DataTypes.STRING,
          allowNull: true,
        },
        content:{
          type: DataTypes.TEXT,
          allowNull: true,
        },
        type:{
          type: DataTypes.TEXT,
          allowNull: true,
        },
      },
      {
        tableName: "Board",
        timestamp: true,
        charset: "utf8",
        underscored: true,
      }
    );
    board.associate = models => {
       board.belongsTo(models.User, {foreignKey: "user_id", sourceKey: "id"});
       board.hasMany(models.Comment, {foreignKey: "board_id", sourceKey: 'id'});
    };
  
    return board;
  };