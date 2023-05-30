#!/usr/bin/env bash
if [ "$1" != "major" ] && [ "$1" != "minor" ] && [ "$1" != "patch" ];
then
    echo "Could not release!"
    echo "Usage: 'npm run release -- (major|minor|patch)'"
    echo ""
    exit 1
fi

npm version $1
git add .
export NPM_VERSION=$(npm pkg get version --workspaces=false | tr -d \")
git commit -m "Release @mapsindoors/components@$NPM_VERSION"
git tag @mapsindoors/components@$NPM_VERSION
echo "Bumped version to v$NPM_VERSION"
git push && git push --tags