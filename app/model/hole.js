module.exports = ({ INTEGER, STRING, DATE }) => {
  return {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: STRING,
    },
    url: {
      type: STRING,
    },
    img: {
      type: STRING,
    },
    created_time: {
      type: DATE,
    },
    updated_time: {
      type: DATE,
    },
  };
};
