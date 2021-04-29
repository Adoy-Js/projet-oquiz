# OQuiz

## Jour 4 : Active Record factorisé

Les méthodes Active Record sont maintenant factorisé directement dans CoreModel !!

Commencer par vérifier que tout fonctionne en écrivant quelques tests dans `test.js`, par exemple : 
- Trouver tous les User.
- Trouver la question dont l'id est 3.
- Créer un Level avec le nom "très difficile" et l'insérer en BDD.
- ...

Ensuite, rajouter 2 méthodes dans CoreModel : 
- `findBy(params, callback)` qui trouve les modèles correspondants à tous les paramètres passées dans le premier argument.
<details>
<summary>Un exemple</summary>

```js
Level.findBy({name:"difficile"}, callback); // trouve le(s) level(s) dont le nom est "difficile"
User.findBy({email: "michel@oclock.io"}, callback); // trouve le(s) user(s) dont l'email est "michel@oclock.io"
Tag.findBy({
  name: "Histoire"
}, callback); // trouve le(s) tag(s) dont le name est "Histoire".

```
</details>

- `save(callback)` : cette méthode appelle soit `insert` soit `update`, selon que l'instance existe déjà dans la BDD ou pas.

---

## Challenge jour 3 : Active Record

Les méthodes Active Record du modèle `Tag` ont été codées.

On a pu vérifier que ces méthodes fonctionnent en jouant dans `index.js`.

En s'inspirant (très largement) de ce code existant, on passe à la suite, à savoir, coder les méthodes Active Record du modèle `User` :  

- `findAll(callback)`, qui trouve tous les Users dans la base de données.
- `findById(id, callback)`, qui trouve un User en fonction de son ID.
- `insert(callback)`, qui insert l'instance courante dans la base de données.
- `update(callback)`, qui met à jour l'instance courante dans la base de données.
- `delete(callback)`, qui supprime l'instance courante de la base de données.

En bonus, commencer à réfléchir pour factoriser tout ce code (c'est-à-dire coder toutes les méthodes Active Record dans CoreModel !)

---

## Challenge jour 2 : Le début du commencement

Pour commencer, il faut mettre en place la base de données !

Les choses à faire, dans l'ordre :

- Créer un utilisateur PostgreSQL, nommé "oquiz", avec un mot de passe et les droits nécessaires.
- Créer une base de données nommée "oquiz", dont le propriétaire est l'utilisateur "oquiz".
- Créer les tables grâce au fichier "import_tables.sql".
- Importer les données grâce au fichier "import_data.sql".

<details>
<summary>Je me rappelle plus trop des commandes...</summary>

### Créer un utilisateur PostgreSQL, nommé "oquizz", avec un mot de passe et les droits nécessaires.

- d'abord se connecter à PostgreSQL en tant que "postgres": `sudo -i -u postgres`, puis `psql`
- Ou directement si cela est déjà configurer dans le `pg_hba.conf` vous pouvez directement untiliser la commande `psql -U postgres`
- puis créer l'utilisateur : `CREATE ROLE oquiz WITH LOGIN PASSWORD 'oquiz';`

### Créer une base de données nommée "oquizz", dont le propriétaire est l'utilisateur "oquiz".

- puis créer l'utilisateur : `CREATE DATABASE oquiz OWNER oquiz;`

### Créer les tables grâce au fichier "import_tables.sql".

- `psql -U oquiz -f data/import_tables.sql`

### Importer les données grâce au fichier "import_data.sql".

- `psql -U oquiz -f data/import_data.sql`

</details>

On pourra ensuite se connecter à la BDD dans le code via l'url : `postgres://oquiz:oquiz@localhost/oquiz`

## Du code classe !

Créer un dossier `app`, puis un sous-dossier `app/models`.

Dans ce dossier, on va coder des classes à partir du MCD du projet :

- une classe par entité: `Answer`, `Level`, `Question`, `Quiz`, `Tag`, et `User`
- une seule classe par fichier ! Le fichier porte le même nom que la classe, en minuscule.

Dans chaque classe :

- déclarer une propriété pour chaque champ de la table correspondante.
- coder un `constructor` qui prend en paramètre un objet. Cet objet contient toutes les valeurs à recopier dans l'instance.
- ne pas oublier d'exporter la classe !

<details>
<summary>Heuuu oui... t'as un exemple ?</summary>

Le but, c'est d'arriver à faire ça :

```JS

const monTag = new Tag({
  name: "un super tag",
});
```

On devrait donc avoir un truc dans ce genre :

```JS
class Tag {

  name;
  
  constructor(obj) {
    this.name = obj.name;
  }
};
```

</details>

## Do not repeat yourself

La propriété `id` est présente dans toutes les classes.

On va donc... les factoriser ! Et pour ce faire, on va utiliser l'héritage !

On va donc coder une class `CoreModel`, dans le même dossier que les autres, et toutes les classes vont _hériter_ de celle-ci :

- Penser à exporter `CoreModel`.
- Penser à require `CoreModel` dans les autres fichiers.
- Penser à appeler le "constructeur parent" dans les constructeur des classes.

## Get/Set

Dans chaque classe, à commencer par `CoreModel`, coder un "getter" et un "setter" par propriété en y ajouter les instruction voulues.

<details>
<summary>Un exemple </summary>

```JS
class CoreModel {
  id;

  get id() {
    return this.id;
  };

  set id(value) {
    this.id = value;
  };
};
```

</details>

## Bonus : ne pas autoriser de valeurs absurdes

Dans les "setters", rajouter des tests pour vérifier que la donnée passée en argument est au moins du bon type.

<details>
<summary>Un exemple</summary>

```js
class CoreModel {

  id;

  set id(value) {
    if(isNaN(parseInt(value, 10))) {
      throw Error("CoreModel.id must be a integer !");
      // on "lève" une erreur => ça arrête tout !
    }
    this.id = value;
  }
};
```

</details>

---

## Challenge jour 1

En utilisant l'analyse préliminaire de la BDD, le MCD, et la [fiche récap MLD](https://kourou.oclock.io/ressources/fiche-recap/mld/), écrire le MLD de l'application !

### Bonus

Écrire le fichier SQL pour créer les tables listées dans le MLD.

---

## Détail du projet

![Screen 1](docs/oQUIz_screen_1.png)

Le client *Philippe*, demande à son assistant ( le Prof ) de lui créer un nouveau projet de Quizz. Le prof brainstorm avec son équipe de dev pour créer le projet. On analyse donc les spécificités.

A première vue, c'est un jeu qui va comporter des quizzes avec des questions suivant des thématiques. On pourra répondre aux quizzes, avec par exemple un score à la fin. Il y aura plusieurs sujets à ces quizzes.

On sera dans un premier temps, un utilisateur, donc on ne pourra que répondre aux quizz si on est connecté

On nous a dit que l'administration dans un premier temps se ferait par phpMyAdmin ( Qui est une interface pour modifier la BDD )

## 1. Prise de notes

Quest-ce que **doit faire** et quest-ce que **ne doit pas faire** notre application, et en fonction en définira des uses cases.

Un sujet c'est par exemple : Les étoiles, la gravitation, l'espace ...
Et la thématique serait : Cosmologie

**Ce qu'elle doit faire :**

- Permettre de se connecter à l'interface
- Permettre de distinguer différents roles
- Permettre de pouvoir choisir un quizz suivant son thème ou sa difficulté
- Permettre de pouvoir choisir entre plusieurs réponses pour répondre à un quizz
- Permettre de pouvoir consulter le résultat du quizz avec un score à la fin
- Permettre de pouvoir lister ses propres quizzes depuis son profil
- Permettre de choisir un sujet associé à une thématique
- Afficher l'auteur du quizz ( apparemment c'est important )

**Ce qu'elle ne doit pas faire :**

- Stocker le résultat des quizzes

**Ce qu'elle pourrait faire ( mais qui n'est pas demandé )**

- Noter un quizz ( juger si il était bien ou pas )
- Mettre en avant les quizzes bien notés
- Mesurer le temps de réponse à un quiz ( suivant le niveau de difficutés ) ou gérer un chronomètre par question
- En fonction de la difficulté on pourrait avoir plusieurs bonnes réponses
- Avoir une page de présentation
- Avoir une page de recherche
- Permettre de s'inscrire à une newsletter
- Permettre de proposer des quizzes recommandés ( en fonction des thèmes souvent utilisé par exemple )

**Notes au sujet de la structure des données :**

- Chaque quizz a :
  - un auteur
  - titre
  - des questions
  - un thème
  - des sujets ( tags )

- Chaque question :
  - difficulté
  - a une réponse
  - plusieurs propositions

## 2. Uses Cases

### En tant que visiteur je veux

- Accèder à un formulaire de création de compte
- Pouvoir s'inscrire
- Accèder à un formulaire de connexion afin de m'authentifier
- Pouvoir m'authentifier
- Accèder à une page d'accueil avec des quizzes
- Pouvoir consulter la liste des quizzes afin d'un selectionner un
- Pouvoir consulter un quizz afin de lire les questions
- Avoir un bouton de redirection vers la page de connexion si je consulte un quizz
- Cliquer sur le nom d'un auteur pour afficher tous ses quizzes
- Pourvoir consulter la liste des thèmes afin de lister les quizzes par thèmes
- Pouvoir consulter la liste des quizzes par thème
- Pouvoir visualiser les sujet du quizz sur la page du quizz
- Pouvoir visualiser la difficulté de chaque question

### En tant que membre je veux

- Accéder à une page de déconnexion
- Pouvoir selectionner un quizz afin d'y répondre
- Pouvoir visualiser le score aprés avoir répondu
- Pouvoir visualiser la correction aprés avoir répondu
- Accéder à ma page de profil afin de consulter mes données
- ( Si on a le temps ) Pouvoir créer quizz
- ( Si on a le temps ) Pouvoir créer des questions afin de les lier à un quizz
- ( Si on a le temps ) Pouvoir avoir accès à l'historique des mes quizzes, de mes résultats.

### En tant qu'admin ( et si on a le temps )

- Accéder à mon espace d'administration
- Valider un quizz créé par un utilisateur
- CRUD d'un utilisateur
- CRUD d'un thème
- CRUD d'un quizz
- CRUD d'une question


## 3. Les sprints

Vous pouvez trouver le [trello ici](https://trello.com/b/YaDGQf8c/sinbad-gdp-oquiz)

| En tant que | J'ai besoin de ... | Commentaire | Sprint |
|---|---|---|---|
| Visiteur | Accèder à un formulaire de création de compte | | 1 |
| Visiteur | Accèder à un formulaire de connexion afin de m'authentifier | | 1 |
| Visiteur | Accèder à une page d'accueil avec des quizzes | | 1 |
| Visiteur | Pouvoir consulter la liste des quizzes afin d'un selectionner un | | 1 |
| Visiteur | Pouvoir consulter un quizz afin d'accéder aux questions | | 1 |
| Visiteur | Avoir un bouton de redirection vers la page de connexion si je consulte un quizz | | 1 |
| Visiteur | Pourvoir consulter la liste des thèmes afin de lister les quizzes par thèmes  | | 1 |
| Visiteur | Pouvoir consulter la liste des quizzes par thème | | 1 |
| Visiteur | Pouvoir visualiser les sujet du quizz sur la page du quizz | | 1 |
| Visiteur | Pouvoir visualiser la difficulté de chaque question | | 1 |
| Visiteur | Pouvoir se connecter | | 2 |
| Visiteur | Pouvoir s'inscrire | | 2 |
| Visiteur | Cliquer sur le nom d'un auteur pour afficher tous ses quizzes | | 2 |
| Membre | Accéder à une page de déconnexion | | 2 |
| Membre | Pouvoir répondre à un quizz | | 2 |
| Membre | Pouvoir visualiser/interpréter le score aprés avoir répondu | | 2 |
| Membre | Pouvoir visualiser la correction aprés avoir répondu | | 2 |
| Membre | Accéder à ma page de profil afin de consulter mes données | | 2 |
| Membre | ( Si on a le temps ) Pouvoir créer quizz | | 3 |
| Membre | ( Si on a le temps ) Pouvoir créer des questions afin de les lier à un quizz | | 3 |
| Membre | ( Si on a le temps ) Pouvoir avoir accès à l'historique des mes quizzes, de mes résultats. | | 3 |
| Admin | Accéder à mon espace d'administration | | 4 |
| Admin | Valider un quizz créé par un utilisateur | | 4 |
| Admin | CRUD d'un utilisateur | | 4 |
| Admin | CRUD d'un thème | | 4 |
| Admin | CRUD d'un quizz | | 4 |
| Admin | CRUD d'une question | | 4 |

## 4. WireFrames

![Screen 2](docs/oQUIz_screen_2.png)

### [Page d'accueil](https://wireframe.cc/V5m8ot)

![Wireframe Accueil](docs/wireframe_accueil.png)

### [Page de login](https://wireframe.cc/wvwa2y)

![Wireframe Login](docs/wireframe_login.png)

### [Page de détail](https://wireframe.cc/hbrvgq)

![Wireframe Détail](docs/wireframe_detail.png)

### [Page de résultat](https://wireframe.cc/r96bdA)

![Wireframe Resultat](docs/wireframe_resultat.png)

### [Page de liste des sujets](https://wireframe.cc/8nA9pN)

![Wireframe Resultat](docs/wireframe_liste_sujets.png)

## 5. Le MCD

Commençons a identifier les différentes entités de notre système de données.

- quizz
- question
- reponse ( = proposition )
- tag ( = sujet )
- niveau
- utilisateur ( = auteurs, en fait un auteur c'est utilisateur qui a créé un quizz )

Puis identifions les propriétés de ces entités

- quizz
  - titre
  - thème
  - description
- question
  - description
  - anecdote
  - wiki
- reponse ( = proposition )
  - description
- tag ( = sujet )
  - nom
- niveau
  - nom
- utilisateur ( = auteurs, un auteur est utilisateur qui a créé un quizz )
  - nom
  - prénom
  - email
  - mot de passe

Pour construire le MCD il vaut mieux s'inspirer de la [fiche récap kourou](https://kourou.oclock.io/ressources/fiche-recap/mcd-modele-conceptuel-de-donnees/) :

:warning: Alerte vocabulaire :

- Le **le déterminant (ou identifiant, discriminant)** c'est le champs souligné, c'est ce qui identifiera le mieux l'entité ( attention ce qui identifie, c'est pas forcément un identifiant )
- Les **attributs** sont les données qui concernent les entités, ce qui les définissent
- Les **entités**, se sont les différents objets qui structurent notre application
- Les **relations**, ce sont les différents liens entre les entités
- Les **cardinalités** ce sont le nombre de relation minimum et maximum entre les entités, on vient comptabiliser les différentes relations possible entre 2 entités.

Pour créer le MCD autant aller voir la fiche récap prévu à cet effet : https://kourou.oclock.io/ressources/fiche-recap/mocodo/#relations

Le MCD : 

```
QUIZZ: titreQuizz, thème, descriptionQuizz
QUESTION: descriptionQuest, anecdote, wiki
REPONSE: descriptionResp
TAG: nomTag
NIVEAU: nomNiveau
UTILISATEUR: _nom, prénom, _email, mot de passe

DEFINIR, 11 QUESTION, 0N NIVEAU
COMPOSER, 0N QUIZZ, 11 QUESTION
POSSEDER, 0N QUESTION, 11 REPONSE
VALIDER, 01 QUESTION, 01 REPONSE
CREER, 0N UTILISATEUR, 11 QUIZZ
APPARTENIR, 0N TAG, 0N QUIZZ
```

[Le détail ordonné du .mcd](docs/MCD/Quizz.mcd)  
![MCD](docs/MCD/Quizz.svg);
