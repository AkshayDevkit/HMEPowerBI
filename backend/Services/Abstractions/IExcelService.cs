namespace Services
{
    using Models;
    using System.Collections.Generic;
    
    public interface IExcelService
    {
        ApiFile Export<T>(List<T> tList);
    }
}
