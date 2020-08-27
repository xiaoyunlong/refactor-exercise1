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

test('test audience more then 30', t => {
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
        + `Amount owed is $0.00\n`
        + `You earned 0 credits \n`;

  //when
  const result = statement(invoice, plays);

  //then
  t.is(result, expectResult);
});


    const invoice = {
        'customer': 'BigCo',
        'performances': [
            {
                'playID': 'hamlet',
                'audience': 55,
            },
            {
                'playID': 'as-like',
                'audience': 35,
            },
            {
                'playID': 'othello',
                'audience': 40,
            },
        ],
    };



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