namespace Services.Validators
{
    using FluentValidation;
    using Models;

    public class ReportValidator : AbstractValidator<Report>
    {
        public ReportValidator()
        {
            CascadeMode = CascadeMode.Stop;

            RuleFor(x => x.Name).Required();
        }
    }
}
