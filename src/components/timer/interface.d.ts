export interface IProps {
  startTime: number,
  endTime: number,
  onTimeup?(): void,
  onTick?(leftTime: number): void
}

export interface IState {
  diffTime: number,
  remainHour: number,
  remainMin: number,
  remainSec: number
}
