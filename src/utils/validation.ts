export const validation = {
  required: {
    required: 'Dit veld is verplicht',
  },
  email: {
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: 'Vul een geldig emailadres in',
    },
  },
  password: {
    minLength: {
      value: 8,
      message: 'Wachtwoord moet minimaal 8 tekens bevatten',
    },
  },
  groupName: {
    minLength: {
      value: 3,
      message: 'Groepsnaam moet minimaal 3 tekens bevatten',
    },
  },
  groupCode: {
    minLength: {
      value: 6,
      message: 'De code moet 6 tekens bevatten',
    },
    maxLength: {
      value: 6,
      message: 'De code moet 6 tekens bevatten',
    },
  },
};
