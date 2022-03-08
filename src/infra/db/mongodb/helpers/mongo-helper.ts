import { MongoClient } from 'mongodb'

export const MongoHelper = {
  client: null as MongoClient,
  async connect (url: string): Promise<void> {
    this.client = new MongoClient(url)
    await this.client.connect()
  },
  async disconnect (): Promise<void> {
    await this.client.close()
  }
}
