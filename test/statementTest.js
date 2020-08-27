const test = require('ava');
const {statement} = require('../src/statement');

test('test there is no performances', t => {
  //given
  const invoice = {
    'customer': 'BigCo',
    'performances': [],
  };
    const expectResult = 'Statement for BigCo\n'
        + `Amount owed is $0.00\n`
        + `You earned 0 credits \n`;

  //when
  const result = statement(invoice, plays);

  //then
  t.is(result, expectResult);
});

test('test audience is 30', t => {
  //given
    const invoice = {
        'customer': 'BigCo',
        'performances': [
            {
                'playID': 'hamlet',
                'audience': 30,
            }
        ],
    };

 const expectResult = 'Statement for BigCo\n'
        + ` Hamlet: $400.00 (30 seats)\n`
        + `Amount owed is $400.00\n`
        + `You earned 0 credits \n`;

  //when
  const result = statement(invoice, plays);

  //then
  t.is(result, expectResult);
});


const plays = {
  'hamlet': {
    'name': 'Hamlet',
    'type': 'tragedy',
  },
  'as-like': {
    'name': 'As You Like It',
    'type': 'comedy',
  },
  'othello': {
    'name': 'Othello',
    'type': 'tragedy',
  },
};