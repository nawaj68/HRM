using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebApp.Core;
using WebApp.Core.Collections;
using WebApp.Service.Models.Enrols;
using WebApp.Services;
using WebApp.Sql.Entities.Enrols;

namespace WebApp.Service
{
    public interface IFunctionalDesignationService:IBaseService<FunctionalDesignation>
    {
        Task<Paging<FunctionalDesignationModel>> GetSearchAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string searchText = null);
        Task<Paging<FunctionalDesignationModel>> GetFilterAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string filterText1 = null);
        Task<FunctionalDesignationModel> GetFunctionalDesignationDetailAsync(long functionalDesignationId);
        Task<FunctionalDesignationModel> AddFunctionalDesignationDetailAsync(FunctionalDesignationModel functionalDesignation);
        Task<FunctionalDesignationModel> UpdateFunctionalDesignationDetailAsync(long functionalDesignationId, FunctionalDesignationModel model);
    }
}
