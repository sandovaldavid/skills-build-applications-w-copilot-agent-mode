// Seleccionando la base de datos octofit_db
db = db.getSiblingDB('octofit_db');

// Eliminando colecciones existentes si existen
db.users.drop();
db.teams.drop();
db.activity.drop();
db.leaderboard.drop();
db.workouts.drop();

// Creando las colecciones
db.createCollection('users');
db.createCollection('teams');
db.createCollection('activity');
db.createCollection('leaderboard');
db.createCollection('workouts');

// Estableciendo índices únicos
db.users.createIndex({ "email": 1 }, { unique: true });
db.teams.createIndex({ "name": 1 }, { unique: true });
db.activity.createIndex({ "activity_id": 1 }, { unique: true });
db.leaderboard.createIndex({ "leaderboard_id": 1 }, { unique: true });
db.workouts.createIndex({ "workout_id": 1 }, { unique: true });

// Confirmando la creación de colecciones
print("Colecciones creadas en la base de datos octofit_db:");
printjson(db.getCollectionNames());
