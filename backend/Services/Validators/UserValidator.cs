namespace Services.Validators
{
    using DotnetStandardQueryBuilder.Core;
    using FluentValidation;
    using Models;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;

    public class UserValidator : AbstractValidator<User>
    {
        private readonly IUserService _userService;

        public UserValidator(IUserService userService, bool validatePassword = false)
        {
            _userService = userService;

            CascadeMode = CascadeMode.Stop;

            RuleFor(x => x.Name).Required().IsAlphaNumeric();

            RuleFor(x => x.Email).Required();
            RuleFor(x => x.Contact1).Required();

            RuleFor(x => x.FirstName).Required().IsAlphaNumeric().HasMaximumLength();
            RuleFor(x => x.MiddleName).IsAlphaNumeric().HasMaximumLength();
            RuleFor(x => x.LastName).IsAlphaNumeric().HasMaximumLength();

            RuleFor(x => x.DOB).HasNotManimumValue();

            if (validatePassword)
            {
                RuleFor(x => x).Must(x => !string.IsNullOrEmpty(x.Password)).Required();
                RuleFor(x => x).Must(x => !string.IsNullOrEmpty(x.ConfirmPassword)).Required();
            }

            RuleFor(x => x).Must(x => !string.IsNullOrEmpty(x.Password) ? x.Password == x.ConfirmPassword : true).WithMessage("Password and Confirm Password are not matching.");

            RuleFor(x => new Address
            {
                Address1 = x.Address1,
                Address2 = x.Address2,
                City = x.City,
                StateId = x.StateId,
                CountryId = x.CountryId,
                ZipCode = x.ZipCode
            }).SetValidator(new AddressValidator());

            When(x => !IsUpdate(x), () => {
                RuleFor(x => x).MustAsync(async (x, cancellation) => !(await IsExists(x).ConfigureAwait(false))).WithMessage("UserId, Email or Contact already exists.");
            });
        }

        private bool IsUpdate(User user)
        {
            return !string.IsNullOrEmpty(user.Id);
        }

        private async Task<bool> IsExists(User user)
        {
            var existingUser = (await _userService.GetAsync(new Request
            {
                Filter = new CompositeFilter
                {
                    LogicalOperator = LogicalOperator.Or,
                    Filters = new List<IFilter>
                    {
                        new Filter
                        {
                            Operator = FilterOperator.IsEqualTo,
                            Property = nameof(User.UserId),
                            Value = user.UserId
                        },
                        new Filter
                        {
                            Operator = FilterOperator.IsEqualTo,
                            Property = nameof(User.Email),
                            Value = user.Email
                        },
                        new Filter
                        {
                            Operator = FilterOperator.IsEqualTo,
                            Property = nameof(User.Contact1),
                            Value = user.Contact1
                        },
                        // new Filter
                        // {
                        //     Operator = FilterOperator.IsEqualTo,
                        //     Property = nameof(User.Contact2),
                        //     Value = user.Contact1
                        // },
                    }
                },
                PageSize = 1
            })).FirstOrDefault();

            return existingUser != null;
        }
    }
}
