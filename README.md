# Assign Team Members to Issue

This action looks up members of a team and assigns them to an issue.

Only 10 users can be added to an issue at a time.  If users are already assigned to the issue
this action will not remove them.

## Usage
```yaml
- uses: garnertb/assign-team-members-to-issue@v0
  with:
    # Organization that team is in   
    org: ''

    # Team name with members who should be assigned
    team: ''

    # Name of the repository where the issue is
    # Default: ${{ github.repository }}
    repository: ''

    # PAT used to access the GitHub API
    # Default: ${{ github.token }}
    token: ''

    # Issue number to assign the team members to
    issue_number: ''
```