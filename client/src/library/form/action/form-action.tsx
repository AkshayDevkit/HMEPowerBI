export const FormAction = ({ children }: { children?: any }) => {
    return (
        <div className="form-action">
            <div className="control">{children}</div>
        </div>
    );
};
