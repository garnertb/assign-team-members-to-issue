import * as core from '@actions/core'
import {Octokit} from '@octokit/rest'
// eslint-disable-next-line import/no-unresolved
import {OctokitOptions} from '@octokit/core/dist-types/types'

const newClient = (options?: OctokitOptions): Octokit => {
  return new Octokit(options)
}

async function run(): Promise<void> {
  try {
    const org: string = core.getInput('org')
    const team_slug: string = core.getInput('team')
    const repo: string = core.getInput('repository')
    const issue_number: number = parseInt(core.getInput('issue_number'))

    core.debug(
      `Org: ${org}, team:${team_slug}, repo: ${repo}, issue_number: ${issue_number}`
    )

    const client = newClient({auth: core.getInput('token')})

    const {data: members} = await client.teams.listMembersInOrg({
      org,
      team_slug
    })

    const issue = await client.issues.get({
      owner: org,
      repo,
      issue_number
    })

    // you can only assign up to 10 people to an issue
    // check how much space is left
    const spaceAvailable = issue.data.assignees
      ? 10 - issue.data.assignees.length
      : 10

    core.debug(`Space available for assignees: ${spaceAvailable}`)

    const assignees = members.slice(0, spaceAvailable - 1).map(a => a.login)

    core.debug(`Members that will be assigned: ${assignees}`)

    await client.issues.addAssignees({
      owner: org,
      repo,
      issue_number,
      assignees
    })
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
