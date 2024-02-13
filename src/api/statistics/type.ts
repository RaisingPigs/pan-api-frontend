declare namespace StatisticsAPI {
  type StatisticsCountVO = {
    itfCount: number,
    invokeCount: number,
    userInvokeCount: number
  }

  type StatisticsItfCountVO = {
    id: string,
    name: string,
    total: number
    percentage: number
  }
}
