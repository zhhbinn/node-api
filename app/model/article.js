module.exports = ({ INTEGER, STRING }) => {
  return {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    customize_id: {
      type: STRING,
    },
    title: {
      type: STRING,
    },
    content: {
      allowNull: false,
      type: STRING,
    },
    tag_str: {
      type: STRING,
    },
    show: {
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
    updated_time: {
      type: INTEGER,
      allowNull: false,
    },
  };
};
