// Define the database and user
const dbName = 'gatewaydb';
const adminUser = {
    user: 'admin',
    pwd: 'admin',
    roles: [{ role: 'dbOwner', db: dbName }]
};

// Connect to the admin database
db = db.getSiblingDB(dbName);

// Create the admin user if not already exists
if (db.getUser(adminUser.user) === null) {
    db.createUser(adminUser);
}
