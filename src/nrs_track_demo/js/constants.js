export const usStateRegex = /^[A-Z]+$/;

export const summaryRegex = new RegExp([
  '(^([a-z\\.]+\\s)+(to|in)\\s)|',
  '(Retreat|Counselor|Festival|Mellows|Health|Gauranga|Area|Rest|Ayurvedic|Clinic|Russian|Studies|[\\.\\/])|',
  '(Prabhupada Village,)|',
  '(\\s(w\\/|with)\\s([a-z]+\\s*)+)|(\\(.+\\))',
].join(''), 'ig');
