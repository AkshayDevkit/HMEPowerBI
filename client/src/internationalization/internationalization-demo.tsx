import { useIntl } from 'react-intl';

export const InternationalizationDemo = () => {
    const { formatMessage: f } = useIntl();

    return (
        /* For Non Hooks - Syntax commented */
        /* <IntlProvider locale="en" messages={messages}> */
        <p>
            {/* <FormattedMessage id="simple" /> */}
            {f({ id: 'simple' })}
            <br />
            {/* <FormattedMessage id="placeholder" values={{name: 'John'}} /> */}
            {f({ id: 'placeholder' }, { name: 'John' })}
            <br />
            {/* <FormattedMessage id="date" values={{ts: Date.now()}} /> */}
            {f({ id: 'date' }, { ts: Date.now() })}
            <br />
            {/* <FormattedMessage id="time" values={{ts: Date.now()}} /> */}
            {f({ id: 'time' }, { ts: Date.now() })}
            <br />
            {/* <FormattedMessage id="number" values={{num: Math.random() * 1000}} /> */}
            {f({ id: 'number' }, { num: Math.random() * 1000 })}
            <br />
            {/* <FormattedMessage id="plural" values={{num: 1}} /> */}
            {f({ id: 'plural' }, { num: 1 })}
            <br />
            {/* <FormattedMessage id="plural" values={{num: 99}} /> */}
            {f({ id: 'plural' }, { num: 99 })}
            <br />
            {/* <FormattedMessage id="select" values={{gender: 'male'}} /> */}
            {f({ id: 'select' }, { gender: 'male' })}
            <br />
            {/* <FormattedMessage id="select" values={{gender: 'female'}} /> */}
            {f({ id: 'select' }, { gender: 'female' })}
            <br />
            {f({ id: 'selectordinal' }, { order: 1 })}
            <br />
            {/* <FormattedMessage id="selectordinal" values={{order: 2}} /> */}
            {f({ id: 'selectordinal' }, { order: 2 })}
            <br />
            {/* <FormattedMessage id="selectordinal" values={{order: 3}} /> */}
            {f({ id: 'selectordinal' }, { order: 3 })}
            <br />
            {/* <FormattedMessage id="selectordinal" values={{order: 4}} /> */}
            {f({ id: 'selectordinal' }, { order: 4 })}
            <br />
            {/* <FormattedMessage id="unicode" values={{placeholder: 'world'}} /> */}
            {f({ id: 'unicode' }, { placeholder: 'world' })}
            <br />
            {/* <FormattedMessage
                id="whatever"
                defaultMessage="Hello\u0020{placeholder}"
                values={{placeholder: 'world'}}
            /> */}
            {f(
                { id: 'whatever', defaultMessage: 'Hello\u0020{placeholder}' },
                { placeholder: 'world' },
            )}
        </p>
        /* </IntlProvider> */
    );
};
