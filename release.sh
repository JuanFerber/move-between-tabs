#!/usr/bin/env bash

set -e # Exit immediately on error

if [ -z "$1" ]; then
  echo "Usage: ./release.sh <new_version> (Example: ./release.sh v1.0.1 or 1.0.1)"
  exit 1
fi

NEW_VERSION=$1
MANIFEST_VERSION=${NEW_VERSION#v} # Strip leading 'v' if present for manifest.json
MANIFEST_FILE="manifest.json"
CHANGELOG_FILE="CHANGELOG.txt"

echo "🚀 Starting release process for $NEW_VERSION"

# 1. Update version in manifest.json (Using jq to modify JSON safely)
if command -v jq &>/dev/null; then
  jq ".version = \"$MANIFEST_VERSION\"" "$MANIFEST_FILE" >tmp.json && mv tmp.json "$MANIFEST_FILE"
else
  # Fallback to sed if jq is not installed
  sed -i.tmp "s/\"version\": \".*\"/\"version\": \"$MANIFEST_VERSION\"/" "$MANIFEST_FILE"
  rm -f "${MANIFEST_FILE}.tmp"
fi
echo "✅ Version updated in $MANIFEST_FILE"

# 2. Prompt for commit title
echo -n "Enter short commit title (e.g. feat: add new shortcuts): "
read -r COMMIT_TITLE
if [ -z "$COMMIT_TITLE" ]; then
  COMMIT_TITLE="chore: release $NEW_VERSION"
fi

# 3. Prompt for changelog notes by opening user's preferred editor (defaults to nano)
if [ ! -f "$CHANGELOG_FILE" ]; then
  touch "$CHANGELOG_FILE"
fi

echo "$NEW_VERSION" >temp_changelog.txt
echo "- (Write your changes here. Delete this parenthetical note. Save and close the editor when done)" >>temp_changelog.txt

# Open editor
${EDITOR:-nano} temp_changelog.txt

# Extract body message, skipping the help instruction line
COMMIT_BODY=$(tail -n +2 temp_changelog.txt | grep -v 'Write your changes here')

# Prepend new changelog entries to existing changelog file
cat "$CHANGELOG_FILE" >>temp_changelog.txt
mv temp_changelog.txt "$CHANGELOG_FILE"
echo "✅ $CHANGELOG_FILE updated"

# 4. Git operations (Add, Commit, Tag, Push)
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)

git add .
git commit -m "$COMMIT_TITLE" -m "$COMMIT_BODY"
git tag "$NEW_VERSION"
git push origin "$CURRENT_BRANCH"
git push origin "$NEW_VERSION"

echo "🎉 Release $NEW_VERSION successfully pushed to GitHub!"
