const DB_CONF = {
  host: '127.0.0.1',
  dialect: 'mysql',
  timezone: '+08:00',
  user: 'root',
  pwd: 'ddd',
  database: 'test',
  pageLimit: 10,      // 分页，每页显示记录数量

  define: {
    freezeTableName: true,
    timestamps: true,
    paranoid: true,
    createdAt: 'create_time',
    updatedAt: 'update_time',
    deletedAt: 'delete_time',
    underscored: true
  },
  dialectOptions: {
    dateStrings: true,
    typeCast: true
  }
};

module.exports = DB_CONF;
