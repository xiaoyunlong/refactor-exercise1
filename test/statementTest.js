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


test('test audience is more then 30', t => {
  //given
    const invoice = {
        'customer': 'BigCo',
        'performances': [
            {
                'playID': 'hamlet',
                'audience': 31,
            }
        ],
    };

 const expectResult = 'Statement for BigCo\n'
        + ` Hamlet: $410.00 (31 seats)\n`
        + `Amount owed is $410.00\n`
        + `You earned 1 credits \n`;

  //when
  const result = statement(invoice, plays);

  //then
  t.is(result, expectResult);
});


test('test audience is 20 and play.type is comedy', t => {
  //given
    const invoice = {
        'customer': 'SmallCo',
        'performances': [
            {
                'playID': 'as-like',
                'audience': 20,
            }
        ],
    };

 const expectResult = 'Statement for SmallCo\n'
        + ` As You Like It: $360.00 (20 seats)\n`
        + `Amount owed is $360.00\n`
        + `You earned 4 credits \n`;

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