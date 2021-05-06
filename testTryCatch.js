console.log('Je débute');

try {
  // FOnction d'enregistrement de logs
  for (let i = 0; i < 5; i++) {
    const myLog = readMyLog();
    saveLog(myLog);
  }
}
catch (e) {
  console.log('Erreur générale', e);
}


console.log('Je termine');


function readMyLog() {
  try {
    let filename = getFileName();
    const fileContent = functionThatReadAFile(filename);
    console.log('FILE CONTENT', fileContent);
  }
  catch (e) {
    console.error(e);
    throw e;
  }
}

function functionThatReadAFile(nomDuFichier) {
  if (!nomDuFichier) {
    throw 'Le nom n\'est pas renseigné';
  }

  if (!isFileExiste(nomDuFichier)) {
    throw 'Le fichier avec ce nom n\'existe pas';
  }

  if (!isText(nomDuFichier)) {
    throw 'Le fichier n\'est pas un fichier texte';
  }

  return readFile(nomDuFichier);
}


function saveLog(log) {
  return true;
}
function getFileName() {
  return 'nomDufichierVoulu';
}

function readFile(nomDuFichier) {
  return "Texte de " + nomDuFichier;
}

function isText(nomDuFichier) {
  return false;
}
function isFileExiste(nom) {
  return false;
}