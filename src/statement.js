const format = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format;


function statement(invoice,plays){
    return generateText(invoice,plays);
}
function statementHtml(invoice,plays) {

   return generateHtml(invoice, plays);
}

function generateHtml(invoice, plays){
     let result = `<h1>Statement for ${invoice.customer}</h1>\n`;
     result += `<table>\n`;
     result += `<tr><th>play</th><th>seats</th><th>cost</th></tr>\n`
     for (let perf of invoice.performances) {
          const play = plays[perf.playID];
          thisAmount = getAmount(play,perf);
          result += ` <tr><td>${play.name}</td><td>${perf.audience}</td><td>${format(thisAmount / 100)}</td></tr>\n`;
     }
     result += `</table>\n`;
     result += `<p>Amount owed is <em>${format(calculateTotalAmount(invoice.performances,plays) / 100)}</em></p>\n`;
     result += `<p>You earned <em>${calculateAllVolumeCredits(invoice.performances,plays)}</em> credits</p>\n`;

     return result;
}

function generateText(invoice,plays){
    let result = `Statement for ${invoice.customer}\n`;
     for (let perf of invoice.performances) {
        const play = plays[perf.playID];
        thisAmount = getAmount(play,perf);
        result += formatResult(play.name,thisAmount,perf.audience);
     }
     result += `Amount owed is ${format(calculateTotalAmount(invoice.performances,plays) / 100)}\n`;
     result += `You earned ${calculateAllVolumeCredits(invoice.performances,plays)} credits \n`;

     return result;
}

function calculateAllVolumeCredits(performances,plays){
      let volumeCredits = 0;
      for (let perf of performances) {
        const play = plays[perf.playID];
        volumeCredits = calculateVolumeCredits(play.type,perf.audience,volumeCredits);
      }
      return volumeCredits;
}

function calculateTotalAmount(performances,plays){
      let totalAmount = 0;
      for (let perf of performances) {
        const play = plays[perf.playID];
        let thisAmount = getAmount(play,perf);
        totalAmount += thisAmount;
      }
      return totalAmount;
}

function formatResult(name,thisAmount,audienceNumber){
    return ` ${name}: ${format(thisAmount / 100)} (${audienceNumber} seats)\n`;
}

function calculateVolumeCredits(type,audienceNumber,volumeCredits){

    volumeCredits += Math.max(audienceNumber - 30, 0);
    if ('comedy' === type) volumeCredits += Math.floor(audienceNumber / 5);
    return volumeCredits;

}

function getAmount(play,perf){
    let thisAmount = 0;
    switch (play.type) {
      case 'tragedy':
        thisAmount = calculateTragedyAmount(perf.audience);
        break;
      case 'comedy':
        thisAmount = calculateComedyAmount(perf.audience);
        break;
      default:
        throw new Error(`unknown type: ${play.type}`);
    }
    return thisAmount;
}

function calculateTragedyAmount(audienceNumber){
    let thisAmount = 40000;
    if (audienceNumber > 30) {
        thisAmount += 1000 * (audienceNumber - 30);
    }
    return thisAmount;
}

function calculateComedyAmount(audienceNumber){
    let thisAmount = 30000;
    if (audienceNumber > 20) {
       thisAmount += 10000 + 500 * (audienceNumber - 20);
    }
    thisAmount += 300 * audienceNumber;
    return thisAmount;
}



module.exports = {
  statement,statementHtml
};
