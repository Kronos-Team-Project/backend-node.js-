module.exports = (sequelize, Datatypes) => {
    return sequelize.define('Boards',{
        id: {
            type: Datatypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        boardNumber:{
            type: Datatypes.INTEGER,
            allowNull: false,
        },
        star:{
            type: Datatypes.FLOAT,
            allowNull: false,
        },
        name: {
            type: Datatypes.STRING(20),
            allowNull: false,
        },
        password: {
            type: Datatypes.STRING,
            allowNull: false,
        },
        content: {
            type: Datatypes.STRING,
        }
    });
};