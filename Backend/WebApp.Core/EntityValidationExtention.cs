//using WebApp.Core.Models;
//using WebApp.Core.Sql;
//using Newtonsoft.Json;
//using System;
//using System.Collections.Generic;
//using System.Data.Entity.Validation;
//using System.IO;
//using System.Linq;
//using System.Reflection;
//using System.Web.ModelBinding;
//using System.Xml.Serialization;
//using Microsoft.AspNetCore.Mvc.ModelBinding;

//namespace WebApp.Core
//{
//    public static class EntityValidationExtention
//    {
//        //public static void ValidationError()
//        //{
//        //    try { }
//        //    catch (DbEntityValidationException e)
//        //    {
//        //        foreach (var eve in e.EntityValidationErrors)
//        //        {
//        //            Console.WriteLine("Entity of type \"{0}\" in state \"{1}\" has the following validation errors:",
//        //                eve.Entry.Entity.GetType().Name, eve.Entry.State);
//        //            foreach (var ve in eve.ValidationErrors)
//        //            {
//        //                Console.WriteLine("- Property: \"{0}\", Error: \"{1}\"",
//        //                    ve.PropertyName, ve.ErrorMessage);
//        //            }
//        //        }
//        //        throw;
//        //    }
//        //}

//        public static IEnumerable<string> GetErrors(this ModelStateDictionary modelState)
//        {
//            return modelState.Values.SelectMany(v => v.Errors)
//                .Select(v => v.ErrorMessage + " " + v.Exception).ToList();

//        }

//        public static IEnumerable<string> GetErrorList(this ModelStateDictionary modelState)
//        {
//            return modelState.Values.SelectMany(v => v.Errors).Select(v => v.ErrorMessage + " " + v.Exception).ToList();

//        }

//        public static string EntityValidationErrors(this Exception exception)
//        {
//            var exceptionMessage = string.Empty;

//            if (exception is DbEntityValidationException)
//            {
//                var ex = exception as DbEntityValidationException;
//                var errorMessages = ex.EntityValidationErrors
//                    .SelectMany(x => x.ValidationErrors)
//                    .Select(x => x.ErrorMessage);

//                // Join the list to a single string.
//                var fullErrorMessage = string.Join("; ", errorMessages);

//                // Combine the original exception message with the new one.
//                exceptionMessage = string.Concat(ex.Message, " The validation errors are: ", fullErrorMessage);

//                // Throw a new DbEntityValidationException with the improved exception message.
//                throw new DbEntityValidationException(exceptionMessage, ex.EntityValidationErrors);
//            }

//            return exceptionMessage;
//        }

//        #region compare
//        public static bool JsonCompare(this object obj, object another)
//        {
//            if (ReferenceEquals(obj, another)) return true;
//            if ((obj == null) || (another == null)) return false;
//            if (obj.GetType() != another.GetType()) return false;

//            var objJson = JsonConvert.SerializeObject(obj);
//            var anotherJson = JsonConvert.SerializeObject(another);

//            return objJson == anotherJson;
//        }

//        public static bool Compare<T>(T Object1, T object2) where T : class, new()
//        {
//            //Get the type of the object
//            Type type = typeof(T);

//            //return false if any of the object is false
//            if (object.Equals(Object1, default(T)) || object.Equals(object2, default(T)))
//                return false;

//            //Loop through each properties inside class and get values for the property from both the objects and compare
//            foreach (System.Reflection.PropertyInfo property in type.GetProperties())
//            {
//                if (property.Name != "ExtensionData")
//                {
//                    string Object1Value = string.Empty;
//                    string Object2Value = string.Empty;
//                    if (type.GetProperty(property.Name).GetValue(Object1, null) != null)
//                        Object1Value = type.GetProperty(property.Name).GetValue(Object1, null).ToString();
//                    if (type.GetProperty(property.Name).GetValue(object2, null) != null)
//                        Object2Value = type.GetProperty(property.Name).GetValue(object2, null).ToString();
//                    if (Object1Value.Trim() != Object2Value.Trim())
//                    {
//                        return false;
//                    }
//                }
//            }
//            return true;
//        }

//        public static string SerializeObject<T>(this T toSerialize)
//        {
//            XmlSerializer xmlSerializer = new XmlSerializer(toSerialize.GetType());

//            using (StringWriter textWriter = new StringWriter())
//            {
//                xmlSerializer.Serialize(textWriter, toSerialize);
//                return textWriter.ToString();
//            }

           
//        }

//        public static bool EqualTo(this object obj, object toCompare)
//        {
//            if (obj.SerializeObject() == toCompare.SerializeObject())
//                return true;
//            else
//                return false;
//        }

//        public static bool IsBlank<T>(this T obj) where T : new()
//        {
//            T blank = new T();
//            T newObj = ((T)obj);

//            if (newObj.SerializeObject() == blank.SerializeObject())
//                return true;
//            else
//                return false;
//        }

//        public static bool CompareProperties(object newObject, object oldObject)
//        {
//            if (newObject.GetType().GetProperties().Length != oldObject.GetType().GetProperties().Length)
//            {
//                return false;
//            }
//            else
//            {
//                var oldProperties = oldObject.GetType().GetProperties();

//                foreach (PropertyInfo newProperty in newObject.GetType().GetProperties())
//                {
//                    try
//                    {
//                        PropertyInfo oldProperty = oldProperties.Single<PropertyInfo>(pi => pi.Name == newProperty.Name);

//                        if (newProperty.GetValue(newObject, null) != oldProperty.GetValue(oldObject, null))
//                        {
//                            return false;
//                        }
//                    }
//                    catch
//                    {
//                        return false;
//                    }
//                }

//                return true;
//            }
//        }
//        #endregion
//    }


//    //public class Person : IEquatable<Person>
//    //{
//    //    public int Age { get; set; }
//    //    public string FirstName { get; set; }
//    //    public Address Address { get; set; }

//    //    public override bool Equals(object obj)
//    //    {
//    //        return this.Equals(obj as Person);
//    //    }

//    //    public bool Equals(Person other)
//    //    {
//    //        if (other == null)
//    //            return false;

//    //        return this.Age.Equals(other.Age) &&
//    //            (
//    //                object.ReferenceEquals(this.FirstName, other.FirstName) ||
//    //                this.FirstName != null &&
//    //                this.FirstName.Equals(other.FirstName)
//    //            ) &&
//    //            (
//    //                object.ReferenceEquals(this.Address, other.Address) ||
//    //                this.Address != null &&
//    //                this.Address.Equals(other.Address)
//    //            );
//    //    }
//    //}

//    //public class Address : IEquatable<Address>
//    //{
//    //    public int HouseNo { get; set; }
//    //    public string Street { get; set; }
//    //    public City City { get; set; }

//    //    public override bool Equals(object obj)
//    //    {
//    //        return this.Equals(obj as Address);
//    //    }

//    //    public bool Equals(Address other)
//    //    {
//    //        if (other == null)
//    //            return false;

//    //        return this.HouseNo.Equals(other.HouseNo) &&
//    //            (
//    //                object.ReferenceEquals(this.Street, other.Street) ||
//    //                this.Street != null &&
//    //                this.Street.Equals(other.Street)
//    //            ) &&
//    //            (
//    //                object.ReferenceEquals(this.City, other.City) ||
//    //                this.City != null &&
//    //                this.City.Equals(other.City)
//    //            );
//    //    }
//    //}

//    //public class City : IEquatable<City>
//    //{
//    //    public string Name { get; set; }

//    //    public override bool Equals(object obj)
//    //    {
//    //        return this.Equals(obj as City);
//    //    }

//    //    public bool Equals(City other)
//    //    {
//    //        if (other == null)
//    //            return false;

//    //        return
//    //            object.ReferenceEquals(this.Name, other.Name) ||
//    //            this.Name != null &&
//    //            this.Name.Equals(other.Name);
//    //    }
//    //}
//}
