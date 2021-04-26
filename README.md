# OQuiz

Le client *Philippe*, demande à son assistant ( le Prof ) de lui créer un nouveau projet de Quizz. Le prof brainstorm avec son équipe de dev pour créer le projet. On analyse donc les spécificités.

A première vue, c'est un jeu qui va comporter des quizzes avec des questions suivant des thématiques. On pourra répondre aux quizzes, avec par exemple un score à la fin. Il y aura plusieurs sujets à ces quizzes.

On sera dans un premier utilisateur, donc on ne pourra que répondre aux quizz si on est connecté

On nous a dit que l'administration dans un premier temps se ferait par phpMyAdmin ( Qui est une interface pour modifier la BDD )

## 1. Prise de note

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
  
**Notes au sujet de la structure des données :**

- Chaque quizz a un auteur, contenu, titre, niveau
