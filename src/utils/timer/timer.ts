class Timer {
  private _time: number

  getTimer() {
    return this._time
  }

  setTimer(time: number) {
    this._time = time
  }

  clearTimer() {
    if (this._time) {
      clearTimeout(this._time)
      clearInterval(this._time)
    }
  }
}

export default new Timer()
