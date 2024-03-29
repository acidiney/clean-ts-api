import { MongoClient, Collection } from 'mongodb'

export const MongoHelper = {
  client: null as MongoClient,
  async connect (url: string): Promise<void> {
    this.client = await MongoClient.connect(url)
  },
  async disconnect (): Promise<void> {
    await this.client.close()
  },
  getCollection (name: string): Collection {
    return this.client.db().collection(name)
  },
  map<T>(collectionData: any): T {
    const {
      _id,
      ...collectionDataWithoutId
    } = collectionData

    return {
      id: String(_id),
      ...collectionDataWithoutId
    }
  }
}
