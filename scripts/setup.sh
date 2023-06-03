#!/usr/bin/env bash

echo "Eoscon Site post-install script:"
echo ""

# Check if edgedb is installed.
if ! command -v edgedb --version &> /dev/null
then
    echo "Edgedb is not installed!"
    echo "Please install Edgedb via www.edgedb.com/install."
    exit
fi

# Start edgedb instance.
bash "$(dirname -- "$0")/database.sh"

# Generate queries.
npx @edgedb/generate queries --file src/util/queries
echo ""

# Done.
echo "Done!"
echo "Run 'npm dev' to start the dev server!"