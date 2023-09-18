using System;
using Microsoft.Extensions.Caching.Memory;

namespace WebApp.Core.StackExchange
{
    public interface ICachingProvider : IDisposable
    {
        void Set<T>(string key, T value, CacheItemPriority priority = CacheItemPriority.Normal, int? timeoutInSeconds = null);
        void Clear(string key);
        bool Exists(string key);
        bool Get<T>(string key, out T value);
        int Increment(string key, int defaultValue, int incrementValue, CacheItemPriority priority = CacheItemPriority.Normal);
    }
}
