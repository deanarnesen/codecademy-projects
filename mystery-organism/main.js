// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

const pAequorFactory = (id, dna) => {
  return {
    id,
    dna,
    mutate() {
      const dnaBases = ['A', 'T', 'C', 'G'];
      const randIndex = Math.floor(Math.random() * dnaBases.length);
      const baseIndex = dnaBases.indexOf(this.dna[randIndex]);
      this.dna[randIndex] = dnaBases[(baseIndex + Math.floor(Math.random() * 3)) % 4];
    },
    compareDNA(other) {
      let matchingBases = 0;
      for(let i = 0; i < other.dna.length; i++){
        if (this.dna[i] === other.dna[i]){
          matchingBases++;
        }
      }
      let percentage = Math.round(matchingBases / this.dna.length * 100);
      console.log(`Specimens share ${percentage}% DNA.`)
    },
    willLikelySurvive() {
      let goodBases = 0;
      this.dna.forEach(base => {
        if (base === 'C' || base === 'G'){
          goodBases++;
        }
      })
      return (goodBases / this.dna.length) > .6;
    }
  }
}

// let bugMan = pAequorFactory(1, mockUpStrand());
// let fartBoy = pAequorFactory(2, mockUpStrand());
// fartBoy.compareDNA(bugMan);
// for(let i = 0; i < 10; i++){
//   console.log(bugMan.dna);
//   bugMan.mutate();
// }

let specimens = []
while(specimens.length < 30) {
  let temp = pAequorFactory(specimens.length, mockUpStrand());
  if (temp.willLikelySurvive()) {
    specimens.push(temp);
  }
}
console.log(specimens);







