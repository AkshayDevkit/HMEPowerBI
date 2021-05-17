namespace Models
{
    using System.Collections.Generic;
    
    public class RoleApp : BaseModel
    {
        public string Role { get; set; }

        public List<string> Apps { get; set; }
    }
}
