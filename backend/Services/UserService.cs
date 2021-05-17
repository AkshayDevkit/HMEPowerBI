namespace Services
{
    using Common.Handlers;
    using Configuration.Options;
    using DotnetStandardQueryBuilder.Core;
    using FluentValidation;
    using Models;
    using Repositories;
    using Services.Transformers;
    using Services.Validators;
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;

    public class UserService : BaseService<User>, IUserService
    {
        public UserService(IAppOptions appOptions, ICacheService<User> cacheService, IUserRepository userRepository)
            : base(appOptions, cacheService, userRepository)
        {
        }

        public new async Task<User> CreateAsync(User user)
        {
            user = new UserTransformer().Transform(user);

            await OnCreating(user).ConfigureAwait(false);

            if (!string.IsNullOrEmpty(user.Password))
            {
                user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(user.Password);
                user.Password = null;
                user.ConfirmPassword = null;
            }

            return await Repository.CreateAsync(user).ConfigureAwait(false);
        }

        public async Task<LoggedInUser> LogInAsync(string id, string password)
        {
            var user = (await GetAsync(new Request
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
                            Value = id
                        },
                        new Filter
                        {
                            Operator = FilterOperator.IsEqualTo,
                            Property = nameof(User.Email),
                            Value = id
                        },
                        new Filter
                        {
                            Operator = FilterOperator.IsEqualTo,
                            Property = nameof(User.Contact1),
                            Value = id
                        },
                        new Filter
                        {
                            Operator = FilterOperator.IsEqualTo,
                            Property = nameof(User.Contact2),
                            Value = id
                        }
                    }
                },
                PageSize = 1
            })).FirstOrDefault();

            if (user == null)
            {
                throw new Exception($"No User found with User Id {id}.");
            }

            if (string.IsNullOrEmpty(user.PasswordHash) || !BCrypt.Net.BCrypt.Verify(password, user.PasswordHash))
            {
                throw new Exception("Invalid Password, please try again.");
            }

            var accesssToken = new JwtSecurityTokenHandler().GenerateJwtToken(user, AppOptions);

            return new LoggedInUser
            {
                User = user,
                AccessToken = accesssToken,

                // TODO: Cache and do better
                AppSettings = new AppSettings()
            };
        }

        public async Task<LoggedInUser> RegisterAsync(User user)
        {
            var password = user.Password;

            var createdUser = await CreateAsync(user);

            return await LogInAsync(createdUser.UserId, password);
        }

        public async Task UpdateThemeAsync(string id, string theme)
        {
            var user = await GetOrThrowAsync(id);

            user.Theme = theme;

            await UpdateAsync(id, user);
        }
        protected override async Task<User> OnCreating(User user)
        {
            new UserValidator(this).ValidateAndThrow(user);

            return await Task.FromResult(user);
        }
    }
}
