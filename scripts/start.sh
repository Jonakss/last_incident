#!/bin/sh

if [ -z "$DB_FILE" ]; then
    echo "DB_FILE is not set"
    DB_FILE="/app/db.json"
fi

if [ ! -f $DB_FILE ]; then
    echo "Doesn't exist $DB_FILE"
    cp /app/db_example.json $DB_FILE
fi

/usr/local/bin/npx json-server --watch $DB_FILE --host 0.0.0.0