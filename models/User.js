// -------+-------------+------+-----+---------+----------------+
// | Field | Type | Null | Key | Default | Extra |
// +--------+-------------+------+-----+---------+----------------+
// | id | int | NO | PRI | NULL | auto_increment |
// | userid | varchar(20) | NO | | NULL | |
// | name | varchar(10) | NO | | NULL | |
// | pw | varchar(20) | NO | | NULL | |

// TODO: User 모델(-> 테이블 구조) 정의
// 시퀄라이즈 모델이랑 mysql table 연결
const User = function (Sequelize, DataTypes) {
  // Sequelize: models/index.js 의 sequelize
  // DataTypes: models/index.js 의 Sequelize

  // Sequelize.define(param1, param2, param3)
  // param1: 모델 이름 설정 -> ''
  // param2: 컬럼 정의 -> {}
  // param3: 모델 옵션 정의 -> {}

  const model = Sequelize.define(
    "user",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      userid: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      pw: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
    },
    {
      tableName: "user", // 실제 DB의 테이블 이름
      freezeTableName: true, // 테이블 이름 고정
      timestamps: false, // 데이터가 추가/수정 시간을 자동으로 컬럼 만들어서 기록
    }
  );

  return model;
};

module.exports = User;
