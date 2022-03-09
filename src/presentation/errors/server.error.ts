export class ServerError extends Error {
  constructor (error: string) {
    super('Internal server error!')
    this.name = 'ServerError'
    this.stack = error
  }
}
