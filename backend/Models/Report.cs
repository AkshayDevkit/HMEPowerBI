namespace Models
{
    using MongoDB.Bson.Serialization.Attributes;
    using System.Collections.Generic;
    
    public class Report : BaseModel
    {
        public string Name { get; set; }

        [BsonIgnoreIfNull]
        public string Description { get; set; }

        [BsonIgnoreIfNull]
        public string MajorDepartment { get; set; }

        [BsonIgnoreIfNull]
        public string Department { get; set; }

        public string Category { get; set; }

        [BsonIgnoreIfNull]
        public string SubCategory { get; set; }

        [BsonIgnoreIfNull]
        public string Brand { get; set; }

        [BsonIgnoreIfNull]
        public string Manufacturer { get; set; }

        [BsonIgnoreIfNull]
        public string Thumbnail { get; set; }

        [BsonIgnore]
        [BsonExtraElements]
        public Dictionary<string, object> Metadata { get; set; } = new Dictionary<string, object>();
    }
}
