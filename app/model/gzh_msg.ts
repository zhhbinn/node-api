module.exports = ({ INTEGER, STRING }) => {
  return {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    from_user: {
      type: STRING,
    },
    msg_type: {
      type: STRING,
    },
    msg_time: {
      type: INTEGER,
    },
    msg_content: {
      allowNull: false,
      type: STRING,
    },
    reply_content: {
      type: STRING,
    },
    status: {
      type: INTEGER,
      allowNull: false,
    },
    encrypt: {
      type: STRING,
    },
    msg_id: {
      type: STRING,
    },
    created_time: {
      type: INTEGER,
      allowNull: false,
    },
  };
};
