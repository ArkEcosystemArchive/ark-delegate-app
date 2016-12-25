
import CONST from './Const'

export function getTSFromEpochStamp (epochStamp) {
  return Math.floor(
    new Date(
      (((CONST.GENESIS_BLOCK_TS / 1000) + epochStamp) * 1000)
    ).getTime()
  )
}

export function getDiffInSeconds (dateOne, dateTwo) {
  return Math.floor(
    (
      new Date(dateOne).getTime() - new Date(dateTwo).getTime()
    ) / 1000
  ) * 1000
}
