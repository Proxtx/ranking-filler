let doc = (await (await fetch("ranking.csv")).text()).split("\r\n");

let questions = doc.shift().split(";");

let totalVotes = doc.pop().split(";");

let teachers = {};

for (let t of doc) {
  t = t.split(";");
  teachers[t.shift()] = t.map((v) => {
    if (v) return Number(v);
    return 0;
  });
}

for (let q in questions) {
  let ta = [];
  for (let t in teachers) ta.push({ t: t, v: teachers[t][q] });
  shuffle(ta);
  ta.sort((a, b) => b.v - a.v);
  let w = [ta[0], ta[1], ta[2]];
  if (w[1].v == w[0].v) {
    w[1].v = w[0].v - 1;
  }
  if (w[2].v >= w[1].v) {
    w[2].v = w[1].v - 1;
  }
  let tv = w[0].v + w[1].v + w[2].v;
  for (let sw of w) {
    sw.p = Math.round((sw.v / tv) * 100);
    delete sw.v
  }
  let re = { question: questions[q], winners: w };

  console.log(re);
}

function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}
