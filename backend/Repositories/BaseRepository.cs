namespace Repositories
{
    using Configuration.Options;
    using Models;
    using MongoDB.Driver;
    using DotnetStandardQueryBuilder.Core;
    using DotnetStandardQueryBuilder.Mongo.Extensions;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using System;
    using Common;
    using MongoDB.Bson;

    public class BaseRepository<T>
        where T : BaseModel
    {
        private readonly IMongoCollection<T> _collection;

        public BaseRepository(IDbOptions dbOptions, string collectionName)
        {
            var client = new MongoClient(dbOptions.ConnectionString);
            var database = client.GetDatabase(dbOptions.DatabaseName);

            _collection = database.GetCollection<T>(collectionName);
        }

        public async Task<List<T>> BulkCreateAsync(List<T> tList)
        {
            foreach (var item in tList)
            {
                item.CreatedDateTime = DateTime.Now;
                item.UpdateDateTime = DateTime.Now;
            }

            await _collection.InsertManyAsync(tList);

            return tList;
        }

        public async Task<List<string>> BulkRemoveAsync(List<string> ids)
        {
            var writes = new List<WriteModel<T>>();
            var filterDefinition = Builders<T>.Filter;

            foreach (var id in ids)
            {
                var filter = filterDefinition.Where(x => x.Id == id);
                writes.Add(new DeleteOneModel<T>(filter));
            }

            var result = await _collection.BulkWriteAsync(writes);

            return result.Upserts.Select(x => x.Id.ToString()).ToList();
        }

        public async Task<List<string>> BulkRemoveAsync(IFilter filter)
        {
            var writes = new List<WriteModel<T>>();
            var filterDefinition = filter.ToFilterDefinition<T>();

            writes.Add(new DeleteManyModel<T>(filterDefinition));

            var result = await _collection.BulkWriteAsync(writes);

            return result.Upserts.Select(x => x.Id.ToString()).ToList();
        }

        public async Task<List<string>> BulkUpdateAsync(List<T> tList)
        {
            foreach (var item in tList)
            {
                item.UpdateDateTime = DateTime.Now;
            }

            var ids = tList.Select(x => x.Id);

            var writes = new List<WriteModel<T>>();
            var filterDefinition = Builders<T>.Filter;

            foreach (var t in tList)
            {
                var filter = filterDefinition.Where(x => x.Id == t.Id);
                writes.Add(new ReplaceOneModel<T>(filter, t));
            }

            var result = await _collection.BulkWriteAsync(writes);

            return result.Upserts.Select(x => x.Id.ToString()).ToList();
        }

        public async Task<List<T>> GetAsync(IRequest request = null)
        {
            var query = _collection.Query(request);

            return await Task.FromResult(query.ToList());
        }

        public async Task<T> GetAsync(string id) => (await _collection.FindAsync<T>(x => x.Id == id)).FirstOrDefault();

        public async Task<List<T>> GetAsync(List<string> ids) => (await _collection.FindAsync<T>(x => ids.Contains(x.Id))).ToList();

        public async Task<IResponse<T>> PaginateAsync(IRequest request)
        {
            var query = _collection.Query(request);

            return new Response<T>
            {
                Count = await _collection.QueryCount(request).CountDocumentsAsync().ConfigureAwait(false),
                Items = query.ToList()
            };
        }

        public async Task<T> CreateAsync(T t)
        {
            t.CreatedDateTime = DateTime.Now;
            t.UpdateDateTime = DateTime.Now;

            await _collection.InsertOneAsync(t);

            return t;
        }

        public async Task<long> RemoveAsync(string id)
        {
            var result = await _collection.DeleteOneAsync(x => x.Id == id);

            return result.IsAcknowledged ? result.DeletedCount : 0;
        }

        public async Task<string> UpdateAsync(string id, T t)
        {
            t.UpdateDateTime = DateTime.Now;

            var result = await _collection.ReplaceOneAsync(x => x.Id == id, t);

            return result.MatchedCount == 1 ? id : string.Empty;
        }
    }
}
