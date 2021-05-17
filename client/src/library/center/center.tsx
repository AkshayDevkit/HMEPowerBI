export const Center = ({
    app,
    height,
    children,
}: {
    app?: boolean;
    height?: string;
    children: any;
}) => {
    return (
        <div
            className="center"
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: height || `80${app ? 'vh' : '%'}`,
            }}
        >
            {children}
        </div>
    );
};
