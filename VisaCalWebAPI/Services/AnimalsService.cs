using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.IO;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using VisaCalWebAPI.Helpers;
using WebApi.Entities;
using WebApi.Helpers;
using WebApi.Models;

namespace WebApi.Services
{
    public interface IAnimalsService
    {
        Task<IEnumerable<Animal>> GetAll();
        IEnumerable<Animal> UpdateAnimelCatlog(Animal animal);
    }

    public class AnimalsService: IAnimalsService
    {
        private string DataFilePath = "Data\\animals.json";
        // users hardcoded for simplicity, store in a db with hashed passwords in production applications
        private List<Animal> _animals = new List<Animal>();


        private readonly AppSettings _appSettings;

        //string IJsonListData.filePath => throw new NotImplementedException();

        public AnimalsService(IOptions<AppSettings> appSettings)
        {
            _appSettings = appSettings.Value;
        }

        public async Task<IEnumerable<Animal>> GetAll()
        {
            List<Animal> items;
            using (StreamReader r = new StreamReader(DataFilePath))
            {
                string json = await r.ReadToEndAsync();
                items =  JsonConvert.DeserializeObject<List<Animal>>(json);
            }

            return items.ToArray();
        }

        //return all animals updated list
        public IEnumerable<Animal> UpdateAnimelCatlog(Animal animal)
        {
            try
            {
                string jsonToWrite;

                List<Animal> items = getAllItems();

                Animal animalFoundByName = items.FirstOrDefault(x => x.Name == animal.Name);
                //item to add, because its currently not exist
                if (animalFoundByName == null)
                {
                    items.Add(animal);
                }
                else//item to update
                {
                    items.Remove(animalFoundByName);
                    items.Add(animal);
                }

                jsonToWrite = JsonConvert.SerializeObject(items.ToArray());
                File.WriteAllText(DataFilePath, jsonToWrite);

                return items.ToArray();
            }
            catch (Exception ex)
            {
                return null;
            }

        }

        private List<Animal> getAllItems()
        {
            List<Animal> itemsToReturn;
            using (StreamReader r = new StreamReader(DataFilePath))
            {
                string json = r.ReadToEnd();
                itemsToReturn = JsonConvert.DeserializeObject<List<Animal>>(json);
            }

            return itemsToReturn;
        }

        // helper methods


        //public Animal Add(Animal animal)
        //{
        //    List<Animal> items = getAllItems();

        //    //item to add currently not exist
        //    if (items.FirstOrDefault(x => x.Name == animal.Name) == null)
        //    {
        //        items.Add(animal);
        //        var json = JsonConvert.SerializeObject(items.ToArray());
        //        System.IO.File.WriteAllText(DataFilePath, json);
        //    }
        //    else//update  
        //    {
        //        return null;
        //    }
        //}

        //public Animal GetByName(string name)
        //{
        //    List<Animal> items;
        //    using (StreamReader r = new StreamReader(DataFilePath))
        //    {
        //        string json = r.ReadToEnd();
        //        items = JsonConvert.DeserializeObject<List<Animal>>(json);
        //    }

        //    return items.FirstOrDefault(x => x.Name == name);
        //}
    }
}