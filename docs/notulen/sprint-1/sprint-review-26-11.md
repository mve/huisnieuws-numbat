# Agenda sprint review 1 + notulen

# Notulen

## **Meeting:**

Sprint review

## **Datum en tijd:**

26-11, 13:15

## **Locatie:**

Teams

## **Aanwezigen:**

- Mike van Egmond (deelt het scherm)
- Maarten van der Lei
- Niels Bosman (gespreksleider)
- Albert Jan Nap (notulist)
- Sander Leer (PO)

## **Agenda:**

### Introductie van meeting

- Introductie van het doel van de meeting
- Rollen in de meeting aangeven 
(scrum master: Niels, notulist: Albert Jan, gene die scherm deelt: Mike)
- Vragen of PO een demo wil van user stories die gedeeltelijk af zijn

### Sprint doel

Doel: Versie 0.1 van de website.

- Hebben we het sprint doel behaald? Waarom of waarom niet? Hoe kan dit beter? Hoe gaan we dit doen in sprint 2?
    - ESLint
    - Typescript
    - Ziekte

### Wat is er niet af?

- US-11 (Als geverifieerd bedrijf wil ik mijn artikelen kunnen bijwerken zodat ik mogelijke fouten kan oplossen)
- Onderzoek postcode API

Waarom is dit niet gelukt?

### Wat is er af?

Per user story op het scrum board laten zien en per taak deze langslopen in de applicatie. Hierbij ook acceptatiecriteria langslopen en aantonen dat dit verwerkt is in de features (niet alleen happy flow).

- [US-1 (Als bezoeker wil ik mijn postcode kunnen invullen)](https://github.com/HANICA-DWA/sep2021-project-numbat/projects/2?card_filter_query=label%3A%22us+%231%22) **Maarten**
- US-2 (Als bezoeker wil ik een artikel kunnen bekijken, zodat ik meer over het onderwerp te weten kan komen) **Niels**
- US-13 (Als geverifieerd bedrijf wil ik kunnen inloggen, zodat ik nieuws kan posten) **Mike**
- US-10 (Als geverifieerd bedrijf wil ik mijn artikelen kunnen inzien zodat ik kan zien wat de status van mijn artikelen is) **Albert Jan**
- US-9 (Als geverifieerd bedrijf wil ik mijn artikelen kunnen verwijderen zodat ik niet relevante artikelen uit de feed van mensen kan halen) **Albert Jan**
- US-8 (Als geverifieerd bedrijf wil ik artikelen kunnen plaatsen zodat ik mensen kan bereiken) **Niels**

Feedback vragen PO (of het aan de verwachtingen voldoet).

- Zo nee, actiepunten opstellen.

Nalopen DoD van alle taken (tests, reviews en documentatie kort doorlopen).

### Reflectie

- Was er duidelijke communicatie met de product-owner?
- Hebben wij in de toekomst nog wat nodig van de PO voor een betere sprint? Zijn we tevreden met het contact met de PO?
- Notulen doorlopen en actiepunten opnoemen (akkoord krijgen PO)

# **Onderwerpen:**

## Introductie van meeting

demo van user story die niet af is aan het einde 

## Wat is er niet af?

- US 11
- Onder zoek naar de sprint API naar de volgende sprint verschoven

## Wat is er af?

- [US-1 (Als bezoeker wil ik mijn postcode kunnen invullen)](https://github.com/HANICA-DWA/sep2021-project-numbat/projects/2?card_filter_query=label%3A%22us+%231%22) **Maarten**

*demo*

opmerkingen:

Placeholder postcode kleur iets lichter maken.

Voldoet dit aan de wensen van de PO?

Antwoord: Ja mooi!

- US-2 (Als bezoeker wil ik een artikel kunnen bekijken, zodat ik meer over het onderwerp te weten kan komen) **Niels**

*demo*

opmerkingen:

-

Voldoet dit aan de wensen van de PO?

Antwoord: Ook mooi, lijkt idd helemaal af.

- US-13 (Als geverifieerd bedrijf wil ik kunnen inloggen, zodat ik nieuws kan posten) **Mike**

*demo*

opmerkingen:

Zou leuk zijn als je met je Microsoft.HAN kan inloggen. 

Voldoet dit aan de wensen van de PO?

Antwoord: Ja, mooi dat de session onthouden wordt als je het tabblad sluit

- US-10 (Als geverifieerd bedrijf wil ik mijn artikelen kunnen inzien zodat ik kan zien wat de status van mijn artikelen is) **Albert Jan**

extra info detail pagina(postcode) US sprint 2

*demo*

opmerkingen:

-

Voldoet dit aan de wensen van de PO?

Antwoord: Ja

- US-9 (Als geverifieerd bedrijf wil ik mijn artikelen kunnen verwijderen zodat ik niet relevante artikelen uit de feed van mensen kan halen) **Albert Jan**

*demo*

opmerkingen:

optioneel melding bovenin het scherm tonen

Voldoet dit aan de wensen van de PO?

Antwoord: Ja, verwijderen werkt mooi met die pop-up.

- US-8 (Als geverifieerd bedrijf wil ik artikelen kunnen plaatsen zodat ik mensen kan bereiken) **Niels**

*demo*

opmerkingen:

Cool hoe die slug werkt

url artikel met id en slug → /id/slug

Voldoet dit aan de wensen van de PO?

Antwoord: Ja leuk

### Is de PO tevreden over het resultaat van sprint 1?

Over het algemeen zag het er goed uit.

Er is veel gedaan als je ook nagaat dat er veel nieuwe technieken zijn gebruikt

Design ziet er goed uit, heel strak

Opmerking:

Acceptatie criteria zijn bij sommige user stories een beetje kort, je mag tijdens de sprint AC toevoegen.

## Bugs

spatie met postcode en hoofdlettergevoelig

als je een artikel verwijdert wordt de afbeelding niet verwijdert

## Demo US 11

moet nog gereviewd worden, dus kost niet extreem veel tijd meer

goed dat deze US als niet af is gemarkeerd.

## Software guidebook

*globaal snel door gelezen* 

readme ombouwen zodat je kan zien waar alle documentatie staat 

## Reflectie

Agenda in het bedrijfsleven iets eerder mailen naar de PO

pluspunten:

Erg transparant wat wel of niet af.

Goed voorbereid.

We stralen vertrouwen uit.

## Goal sprint 2:

Het systeem heeft verstand van postcode, het systeem weet welke postcodes bij elkaar horen.

Een visualisatie van postcodes, een kaartje van een wijk bijv.

Focus leggen op testen.

Optioneel de site live zetten en deels beheren.