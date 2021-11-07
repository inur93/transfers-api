#!/bin/bash
set -e

echo "Creating DB $MONGO_INITDB_DATABASE"
mongosh <<EOF
use $MONGO_INITDB_DATABASE
db.createUser(
    {
        user: '$MONGO_INITDB_APP_USERNAME',
        pwd: '$MONGO_INITDB_APP_PASSWORD',
        roles: [
            {
                role: "readWrite",
                db: "$MONGO_INITDB_DATABASE"
            }
        ]
    }
)
db.createCollection("users")
EOF