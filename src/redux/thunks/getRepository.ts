import { createAsyncThunk } from '@reduxjs/toolkit'

import { repoAPI } from '../../services/repoApi'
import { IssuesStateType, IssueType } from '../../types'

type ReturnedType = {
  profileName : string
  repoName : string
  issues: IssuesStateType | IssueType[]
  stargazers_count: number
  html_url: string
}

export const getRepository = createAsyncThunk<ReturnedType, string>(
  'repository/getRepository',
  async (url: string) => {
    const cachedState = localStorage.getItem(url)

    if (cachedState) return JSON.parse(cachedState)

    const urlPath = new URL(url).pathname
    const [_, profileName, repoName] = urlPath.split('/')

    const repositoryIssues = await repoAPI.getRepositoryIssues(
      profileName,
      repoName
    )
    const repositoryInfo = await repoAPI.getRepository(profileName, repoName)

    return {
      profileName,
      repoName,
      issues: repositoryIssues.data,
      stargazers_count: repositoryInfo.data.stargazers_count,
      html_url: repositoryInfo.data.html_url,
    }
  }
)
