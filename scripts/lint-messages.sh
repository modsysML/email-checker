#!/bin/bash
set -euo pipefail

DIR=$(dirname $(realpath $0))

# The start of the range can be bumped up over time to something that
# all live branches include. Currently pointing to initial commit.
LINT_COMMITS_RANGE="3a9ab5fcde0160668319581a847ea8a76a927bde..HEAD"

function lint_commits_in_range {
    while read -r rev; do
        lint_commit "$rev"
    done < <(git rev-list --no-merges "$LINT_COMMITS_RANGE")
}

function lint_commit {
    local rev="$1"
    local commit_msg;
    commit_msg=$(git log --format=%B -n 1 "$rev")
    "$DIR"/lint-message.sh <<<"$commit_msg"
}

lint_commits_in_range "$LINT_COMMITS_RANGE"
