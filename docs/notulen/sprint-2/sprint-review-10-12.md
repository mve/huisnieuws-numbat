# Agenda sprint review 2 + notulen

# Notulen

## **Meeting:**

Sprint review

## **Datum en tijd:**

10-12, 14:30

## **Locatie:**

Teams

## **Aanwezigen:**

- Mike van Egmond (deelt het scherm)
- Maarten van der Lei
- Niels Bosman (gespreksleider)
- Albert Jan Nap (notulist)
- Sander Leer (PO)
- Lars Tijsma (Scrum coach)

## **Agenda:**

### Introductie van meeting

- Introductie van het doel van de meeting
- Rollen in de meeting aangeven
  (scrum master: Maarten, notulist: Niels, gene die scherm deelt: Mike)

### Sprint doel

Doel: Compleet maken van het geheel (testen). Doelen van de vorige sprintplanning verwerken. Zorgen
dat het systeem verstand heeft van postcodes. Ook willen we graag wat meer gaan documenteren en een
rollensysteem inbouwen.

### Wat is er af?

#### - [Artikelen bijwerken #11](https://github.com/HANICA-DWA/sep2021-project-numbat/issues/11) - Maarten

#### - [Rollen systeem #20](https://github.com/HANICA-DWA/sep2021-project-numbat/issues/20) - Mike

- Volgende sprint beheerdersysteem
- Users die poster zijn kunnen plaatsen
- Badge veranderd op basis van rol
- Redirect naar profiel op het moment dat je naar post pagina gaat. Dit is beschermd en normaal is
  de knop er niet.
- Inloggen maakt rol user

#### - [Reach systeem zoeken #5](https://github.com/HANICA-DWA/sep2021-project-numbat/issues/5) - Mike (**

2587 GA**)

- Straatniveau kan alleen gezien worden als je zoekt op dat niveau
- Het zoekmechanisme valt niet binnen de verwachting (maar is prima)
- Goed dat we dit aankaarten in sprint review

#### - [Kaart #85](https://github.com/HANICA-DWA/sep2021-project-numbat/issues/85) - Albert Jan

- De map veranderd op basis van de reach die je selecteert.
- Er is nog niet alle data voor het zoeken op buurt.
- Kaart animatie misschien uitzetten.
- Misschien wil je op straatniveau wel handmatig slepen in de kaart (wellicht een nieuwe user story)

#### - [Reach systeem posten #14](https://github.com/HANICA-DWA/sep2021-project-numbat/issues/14) - Niels

- Misschien ook een kaartje tonen op de toevoeg pagina (feedback).

#### - [Postcode verificatie & API #88](https://github.com/HANICA-DWA/sep2021-project-numbat/issues/88) - Maarten
- 

#### - [Deelbare linkjes #93](https://github.com/HANICA-DWA/sep2021-project-numbat/issues/93) - Niels
- 

#### - [Duidelijke foutmeldingen #21](https://github.com/HANICA-DWA/sep2021-project-numbat/issues/21) - Niels
- 

### Wat is er niet af?

### Bugs

Postcode blijft rood

Postcode rood bij alle errors

Bij bijwerken wordt de postcode spatie niet weggehaald

### DoD items

- Jest bug is niet door versie van Jest
- Mooie reviews, ziet er goed uit, grote lijst.
- Client component diagram zou aangepast moeten worden, dit kan nog beter.

## Software guidebook

- Zelf express omgeving waardoor we twee Node omgevingen hebben.
- In Nginx misschien een blokje voor Filesysteem
- Omdat er op de server ruimte vrij gemaakt moet worden moet er duidelijk zijn voor sysadmins dat er
  een filesystem is.
- Duidelijk maken waarom het een gekke keuze is om in twee verschillende servers data te schrijven (
  afbeeldingen en database queries).
- Blokje van filesystem in blokje van de server zetten.

### Overal feedback

- We kunnen een domeinnaam kiezen en in sprint 3 dit verwerken.
-

### Reflectie van sprint twee in vergelijking van sprint een.

### Voor volgende sprint

Checken of plaatjes valide zijn

Misschien pins laten zien voor de getoonde posts.

Toch sterk filteren op optie maar wel kunnen zien wat er op straat en stad niveau gebeurt.

Dark mode is een optie maar we moeten kijken of dat uitdagend genoeg is.
