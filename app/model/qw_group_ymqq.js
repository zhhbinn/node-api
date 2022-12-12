module.exports = ({ INTEGER, STRING }) => {
  return {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    user: {
      type: STRING,
    },
    content: {
      type: STRING,
    },
    at_me: {
      type: INTEGER,
    },
    status: {
      type: INTEGER,
    },
    created_time: {
      type: INTEGER,
      allowNull: false,
    },
  };
};
