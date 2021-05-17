const common = {};

export const enTranslations = {
    ...common,
    searchPatientTitle: 'Search Patient',
    placeholder: 'Patient name {name}',
    date: 'Hospitalised date {ts, date}',
    time: 'Hospitalised time {ts, time}',
    number: 'Claim amount {num, number}',
    plural: 'Total number of {num, plural, one {# patient} other {# patients}}',
    select: 'Gender {gender, select, male {boy} female {girl}}',
    selectordinal: `I am the {order, selectordinal, 
        one {#st person} 
        two {#nd person}
        =3 {#rd person} 
        other {#th person}
    }`,
    richtext: 'I have <bold>{num, plural, one {# dog} other {# dogs}}</bold>',
    richertext:
        'I have & < &nbsp; <bold>{num, plural, one {# & dog} other {# dogs}}</bold>',
    unicode: 'Hello\u0020{placeholder}',
    'modules.patient.search.header.title.searchPatient': 'Search Patient',
    // `${t.module()}`
};

export { enTranslations as EnTranslations };
