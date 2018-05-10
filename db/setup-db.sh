#!/bin/bash
set -e

POSTGRES="psql --username ${POSTGRES_USER}"
DATABASES=($POSTGRES_DEV_DB $POSTGRES_PROD_DB)

for i in ${DATABASES[@]}; do
  echo "Creating database: ${i}"
  # Check database if existed: SELECT 1 FROM pg_database WHERE datname = ...
  # If not exist, CREATE DATABASE
  psql -U postgres -tc "SELECT 1 FROM pg_database WHERE datname = '${i}'" | grep -q 1 || psql -U postgres -c "CREATE DATABASE \"${i}\""
done