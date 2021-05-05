// APPELANT

const called = require('./called')

// On appelle une méthode qui va créer et retourner une promise
// const apiCall = called.getWeather('Paris');

// apiCall
// // Le then donc en cas de succès, je défini ce que je veux faire
// .then((dataSentInResolve) => {
//   console.log("Récupération effective", dataSentInResolve);
// })
// // Le catch défini ce qu'on va faire en cas d'échec de la promesse.
// // Un catch peut être déclenché de 2 facons différentes : 
// //   - Soit la méthode reject de la promise a été déclenchée
// //   - Soit une exception a été levée DANS la promise
// .catch((error) => {
//   console.error("Une erreur est survenue", error);
// });
// Qu'on passe dans le then OU dans le catch, dans tout les cas, on passe dans le finally
// .finally(() => {
//   
// });

async function main() {
  try {
    const dataFetched = await called.getWeather('Perpignan').catch(() => {});
    console.log("dataFetched", dataFetched);
  }
  catch(e) {
    console.log('Mon error supersonic', e);
  }

  console.log("Aprés le try catch");
}

main();
