import { api } from './fetcher'

export const exportCsvReport = async () => {
  return api<{ reportUrl: string }>('/reports/links')
}
