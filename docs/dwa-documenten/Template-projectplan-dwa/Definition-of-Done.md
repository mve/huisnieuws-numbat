# Definition of Done
Onze definition of done bestaat uit 4 stappen. Technische documentatie, code review en testen en Code standaarden.

## Testen
Elke nieuwe feature die valt binnen de scope die we gaan testen moet tests bevatten. Dit zijn alle functies die in de backend staan. Voor het testen gaan we werken met een tweede database zodat we niet de echte database vuil maken met testdata. Deze tests moeten 100% succesvol runnen voordat er een stuk code naar de main branch samengevoegd mag worden. Verder moeten alle functies in de express api omgeving tests hebben. Deze functies moeten tests hebben voor de happy flow en voor alle uitzonderingen.

## Technische documentatie
Als er documentatie nodig is voor een bepaalde taak dan moet deze af zijn voordat de taak kan worden samengevoegd. We gaan dit in markdown format in de Github repository zetten. Dit kan bijvoorbeeld documentatie zijn over een API endpoint of commentaar is complexe stukken code.

## Code review
Als een developer een taak heeft uitgewerkt dan maakt hij daar een pull request van. Deze moet worden gereviewed door een andere developer. De reviewer wordt willekeurig uitgekozen zodat de taak van het reviewen van code wordt gedeelt door het hele team.
Als reviewer letten we op een aantal punten. Ten eerste controleren we of de code standaarden zijn opgevolgd. Dit kunnen we controleren door te kijken of er geen waarschuwing worden gegeven door ESLint. Zie het hoofdstuk Code standaarden hieronder voor meer informatie hierover. Verder wordt er gecontroleerd of de code goed leesbaar is en of de naamgeving duidelijk is.
Als dit is goedgekeurd dan kan deze worden gemerged. Binnen github gaan we werken met github actions om een pull request automatisch te controleren op code standaarden. Deze tests moeten succesvol zijn.

## Code standaarden
Alle code moet voldoen aan onze opgestelde code standaarden. Dit doen we om te zorgen dat de code een geheel vormt.
Voor de code standaarden gaan wij een extensie gebruiken genaamd: esLint, deze tool/extensie helpt met het voorkomen van bugs en verbetert de kwaliteit van code.
Als code standaard gaan wij de standaard gedocumenteerd in deze github repository gebruiken: https://github.com/airbnb/javascript, deze repo bevat een uitgebreide documentatie over hoe de code opgebouwd zou moeten worden, esLint gaat ons daarbij helpen dit goed te doen.
Voor CSS code style standards gebruiken wij de volgende guide: https://github.com/airbnb/css, deze reposotory bevat uitgebreide documentatie over hoe CSS code opgebouwd moet worden. ook hier gaat esLint overheen om de code te verbeteren.
