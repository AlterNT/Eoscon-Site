#!/usr/bin/env bash

# Handle edgedb instance.
echo "Starting database instance:"
echo ""
edgedb instance status -I Eoscon_Site > /dev/null 2>&1
code=$?
if [ $code -eq 8 ] # Instance does not exist.
then
    echo "Instance not found!"
    echo "Initializing new edgedb Instance:"
    echo ""
    edgedb project init --non-interactive
    edgedb database create testing
    edgedb migrate -d testing
elif [ $code -eq 3 ] # Instance is inactive.
then
    echo "Instance offline."
    echo "Attempting to start edgedb instance:"
    echo ""
    edgedb instance start -I Eoscon_Site
elif [ $code -eq 0 ] # Instance is already running.
then
    echo "Edgedb instance already online."
else
    echo "Unknown error code: $code"
    echo "Unable to start edgedb instance!"
fi
echo ""