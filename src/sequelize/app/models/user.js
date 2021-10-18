module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        phone: DataTypes.STRING,
        status: DataTypes.BOOLEAN
    },
    {
      timestamps: true,
      paranoid: true
    }
  )

  User.associate = function(models) {

  }

  return User
}

