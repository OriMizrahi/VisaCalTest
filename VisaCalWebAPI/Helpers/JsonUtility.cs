using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace VisaCalWebAPI.Helpers
{
    public interface IJsonListData
    {
        string filePath { get; }
    }

public class JsonUtility
    {
        private string filePath;
        public JsonUtility(string filePath)
        {
            this.filePath = filePath;
        }
    }
}
