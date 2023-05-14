import axios from 'axios'

import { IssueType, ProfileType } from '../types'

export const repoAPI = {
  getRepositoryIssues(profile: string, name: string) {
    const issuesUrl = `https://api.github.com/repos/${profile}/${name}/issues`
    const res = axios.get<IssueType[]>(issuesUrl)
    return res
  },
  getRepository(profile: string, name: string) {
    const repoUrl = `https://api.github.com/repos/${profile}/${name}`
    const res = axios.get<ProfileType>(repoUrl)
    return res
  },
}
