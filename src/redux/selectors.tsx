import { RootState } from "./store";

export const selectError = (state:RootState) => state.repository.error
export const selectRepoUrl = (state:RootState) => state.repository.html_url
export const selectRepoStars = (state:RootState) => state.repository.stargazers_count
export const selectIsLoading = (state:RootState) => state.repository.loading
export const selectRepoIssues = (state:RootState) => state.repository.issues
export const selectProfileName = (state:RootState) => state.repository.profileName
export const selectRepoName = (state:RootState) => state.repository.repoName
