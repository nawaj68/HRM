
using Microsoft.OpenApi.Models;
using Newtonsoft.Json;
using Swashbuckle.AspNetCore.SwaggerGen;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;

namespace WebApp.Extensions
{
    //public class SwaggerExcludeFilter : ISchemaFilter
    //{
    //    #region ISchemaFilter Members

    //    public void Apply(Schema schema, SchemaRegistry schemaRegistry, Type type)
    //    {
    //        if (schema?.properties == null || type == null)
    //            return;

    //        var excludedProperties = type.GetProperties().Where(t => t.GetCustomAttribute<SwaggerExcludeAttribute>() != null);

    //        foreach (var excludedProperty in excludedProperties)
    //        {
    //            if (schema.properties.ContainsKey(excludedProperty.Name))
    //                schema.properties.Remove(excludedProperty.Name);
    //        }
    //    }

    //    #endregion
    //}


    //[AttributeUsage(AttributeTargets.Property)]
    //public class SwaggerExcludeAttribute : Attribute
    //{
    //}


    public class SwaggerIgnoreFilter : ISchemaFilter
    {
        public void Apply(OpenApiSchema schema, SchemaFilterContext schemaFilterContext)
        {
            if (schema.Properties.Count == 0)
                return;

            const BindingFlags bindingFlags = BindingFlags.Public |
                                              BindingFlags.NonPublic |
                                              BindingFlags.Instance;
            var memberList = schemaFilterContext.Type
                                .GetFields(bindingFlags).Cast<MemberInfo>()
                                .Concat(schemaFilterContext.Type
                                .GetProperties(bindingFlags));

            var excludedList = memberList.Where(m => m.GetCustomAttribute<SwaggerIgnoreAttribute>()
                                                != null)
                                         .Select(m =>
                                             (m.GetCustomAttribute<JsonPropertyAttribute>()
                                              ?.PropertyName
                                              ?? m.Name.ToCamelCase()));

            foreach (var excludedName in excludedList)
            {
                if (schema.Properties.ContainsKey(excludedName))
                    schema.Properties.Remove(excludedName);
            }
        }


    }

    [AttributeUsage(AttributeTargets.Field | AttributeTargets.Property)]
    public class SwaggerIgnoreAttribute : Attribute
    {
    }

    internal static class StringExtensions
    {
        internal static string ToCamelCase(this string value)
        {
            if (string.IsNullOrEmpty(value)) return value;
            return char.ToLowerInvariant(value[0]) + value.Substring(1);
        }
    }

}

// usage

//c.SchemaFilter<SwaggerExcludeFilter>();


// https://stackoverflow.com/questions/41005730/how-to-configure-swashbuckle-to-ignore-property-on-model