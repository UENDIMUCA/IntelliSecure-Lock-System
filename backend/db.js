const { Sequelize, DataTypes } = require('sequelize');

// Initialize Sequelize with SQLite
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'database.sqlite' // Path to SQLite database file
});

// Define the UserData model
const UserData = sequelize.define('UserData', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    firstname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    uid: {
        type: DataTypes.STRING,
        allowNull: true
    },
    code: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    login: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

sequelize.sync();

// Function to insert users
async function insertUsers() {
    try {
        // Sync the database and ensure the table exists
        await sequelize.sync({ force: true }); // Force: true will drop the table if it already exists

        // Create some users
        const users = [
            {
                firstname: 'John',
                lastname: 'Doe',
                uid: 'user123',
                code: 1001,
                login: 'johndoe',
                password: 'password123'
            },
            {
                firstname: 'Jane',
                lastname: 'Smith',
                uid: 'user456',
                code: 1002,
                login: 'janesmith',
                password: 'password456'
            },
            {
                firstname: 'Alice',
                lastname: 'Johnson',
                uid: 'user789',
                code: 1003,
                login: 'alicej',
                password: 'password789'
            },
            {
                firstname: 'Bob',
                lastname: 'Brown',
                uid: null,
                code: null,
                login: 'bobbrown',
                password: 'password000'
            }
        ];

        // Insert the users into the database
        await UserData.bulkCreate(users);

        console.log('Users have been inserted successfully!');
    } catch (error) {
        console.error('Error inserting users:', error);
    }
}

// Function to fetch users
async function fetchUser() {
    try {
        const datas = await UserData.findAll(); // Fetch all records from the database

        const users = datas.map(record => {
            return {
                id: record.id,
                firstname: record.firstname,
                lastname: record.lastname,
                uid: record.uid,
                code: record.code,
                login: record.login,
                password: record.password
            };
        });

        return { users: users };

    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

module.exports = { sequelize, UserData, fetchUser };

// Execute the function to insert users
insertUsers();
