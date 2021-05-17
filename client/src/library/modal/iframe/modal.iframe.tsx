import './modal.iframe.scss';

export const iframe = ({
    src,
    newTab,
    width,
    height,
    onClose,
    ...props
}: any) => {
    width = width || 800;
    height = height || 600;
    const windowProperties = `toolbar=no,scrollbars=yes,resizable=yes,top=200,left=300,width=${width},height=${height}`;

    src = src.split('#')[0];
    
    var newwindow = newTab
        ? window.open(src, '_blank')
        : window.open(src, '_blank', windowProperties);

    (newwindow as any).focus();

    if (onClose) {
        const checkIfWindowClosed = setInterval(() => {
            if (newwindow && newwindow.closed) {
                clearInterval(checkIfWindowClosed);
                if (onClose) {
                    onClose();
                }
            }
        }, 1000);
    }

    return newwindow;
};
