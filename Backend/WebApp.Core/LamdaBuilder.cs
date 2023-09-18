using System;
using System.Linq.Expressions;

namespace WebApp.Core
{
    public static class LambdaBuilder
    {
        public static Expression<Func<T, bool>> BuildLambdaForFindByKey<T>(object id)
        {
            var item = Expression.Parameter(typeof(T), "entity");
            //var prop = Expression.Property(item, typeof(TEntity).Name + "Id");
            var prop = Expression.Property(item, "Id");
            var value = Expression.Constant(id);
            var equal = Expression.Equal(prop, value);
            var lambda = Expression.Lambda<Func<T, bool>>(equal, item);

            return lambda;
        }
    }
}
