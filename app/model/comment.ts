module.exports = ({ INTEGER, STRING }) => {
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
    article_id: {
      allowNull: false,
      type: STRING,
    },
    email: {
      type: STRING,
    },
    content: {
      allowNull: false,
      type: STRING,
    },
    is_show: {
      type: INTEGER,
      allowNull: false,
    },
    status: {
      type: INTEGER,
      allowNull: false,
    },
    created_time: {
      type: INTEGER,
      allowNull: false,
    },
  };
};
