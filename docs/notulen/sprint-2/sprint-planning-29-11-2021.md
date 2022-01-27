# Sprint planning 2 29-11-2021

[](https://github.com/HANICA-DWA/sep2021-project-numbat/projects/3)

Sprint 2 issue board

## Meeting:

Sprint planning voor sprint 2

## Datum en tijd:

29-11-2021 15:00 tot 15:45

## Locatie:

Online

## Aanwezigen:

- Mike van Egmond (Notulist)
- Niels Bosman
- Albert Jan Nap (Scrum Master)
- Maarten van der Lei
- Lars Tijsma (scrum coach)

## Notules:

In de mail staat instructies over het aanvragen van een server.

url veranderen naar id, de slug is optioneel. dus id/slug

### Postcode zoeken

Cool zou zijn als je een postcode intypt dat de kaart schaalt naar wat je invult, inzoomed naar wat je intypt. Live met het typen.

PDOK viewer voor het maken van kaarten.

[https://essay.utwente.nl/78831/](https://essay.utwente.nl/78831/) Hier staat een onderzoek

[https://nominatim.openstreetmap.org/ui/search.html?q=Arnhem](https://nominatim.openstreetmap.org/ui/search.html?q=Arnhem) API voor het zoeken naar stad

[https://nominatim.openstreetmap.org/search.php?q=Arnhem&format=jsonv2](https://nominatim.openstreetmap.org/search.php?q=Arnhem&format=jsonv2) API voor het zoeken en json terugkrijgen.

Deze links kunnen worden gebruikt voor het zoeken.

404 pagina is prima

### Rollen

Eerst inloggen, later pas een rol krijgen. Knop "Vraag rechten aan", of iemand zet handmatig een veld op true in de DB.

Rollen: Viewer, moderator, admin

Wireframe maken van beheer omgeving.

### User Story: Beheer omgeving

Eerste 0.1 versie heeft wel een rollen systeem ,maar het instellen werkt handmatig.

### User Story: Postcode zoeken

Je vult een postcode in, kiest vervolgens de range.

Definieer de 3 niveau's. letters is straat, daarna wijk, daarna stad. Als schruif.

Kaartje veranderd als de schruif veranderd.

Los component.

Bij het invullen kies je 1 postcode, ook kiezen van straat, wijk of stad.

### Uit Sprint 1 meegenomen

Bijwerken van een artikel is af.

Homepagina redirect fix.

Bij het verwijderen van artikelen ook de afbeelding verwijderen.

Zoeken met postcode werkt nu met spaties en niet case sensitive.

### Prio bij de onderzoekjes.

Resultaten van de onderzoekjes terugschakelen aan Sander.

Onderzoeksvraag bepalen, vragen opstellen.

(Van postcode naar coordinaten. hoe toon je een area, hoe toon je een straat etc.)

### Risico's

- Kaart api
- Ziekte (Prioriteit stellen en vroegtijdig melden)

## Actiepunten:

- API key aanvragen bij PDOK
- Prioriteit bepalen van user stories (Rollensysteem en foutmelding heeft lage prio)
- User stories aanvullen met Acceptatie criteria (Probeer te letten op true of false mogelijkheid, ook de alternative flow erbij zetten.)
- Eind van de week (Vrijdag?) voortgang van onderzoeken bespreken
- Morgen inplannen met Sander over het projectboard en acceptatie criteria bespreken. (Mag ook woensdag als het niet uit komt)
