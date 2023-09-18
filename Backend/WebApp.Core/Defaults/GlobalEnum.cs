using System;
using System.Collections.Generic;
using System.Text;

namespace WebApp.Core
{
    //public enum Gender
    //{
    //    Male = 1,
    //    Female = 2,
    //    Other = 3
    //}

    //public enum MaritalStatus
    //{
    //    Single = 1,
    //    Married = 2,
    //    Divorced = 3,
    //    Widow = 4
    //}

    //public enum Status
    //{
    //    Initial = 1,
    //    Pending,
    //    NoAssigned,
    //    InProgress,
    //    DonePayment,
    //    Reverted,
    //    Failed,
    //    Completed,
    //    Downloaded
    //}

    public enum MessageType : int
    {
        All = 1,
        Sms = 2,
        Email = 3
    }
    //public enum BloodGroup
    //{
    //    A_Positive = 1,
    //    A_Negative,
    //    B_Positive,
    //    B_Negative,
    //    O_Positive,
    //    O_Negative,
    //    AB_Positive,
    //    AB_Negative
    //}

    //public enum Religion
    //{
    //    Islam=1,
    //    Christian,
    //    Hindu,
    //    Shikh,
    //    Ihudi,
    //    Other
    //}

    public enum Relationship
    {
        Father = 1,
        Mother,
        Brother,
        Sister,
        Husband,
        Wife,
        Others
    }
}
