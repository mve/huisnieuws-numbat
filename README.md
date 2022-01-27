# [sep2021-project-numbat](https://en.wikipedia.org/wiki/Numbat)

<img src="https://upload.wikimedia.org/wikipedia/commons/0/05/Numbat.jpg" alt="numbat" width="400"/>

## Opdracht

Huisnieuws

## Leden

- Niels Bosman
- Mike van Egmond
- Albert Jan Nap
- Maarten van der Lei

## Product Owner

Sander Leer

## Coach

Lars Tijsma

## Skills

Helen Visser

## Documentatie
De documentatie staat in het mapje /docs. <br>
Software guidebook: https://github.com/HANICA-DWA/sep2021-project-numbat/blob/main/docs/software-guidebook/software-guidebook-huisnieuws.md

## Code structuur
De code is opgedeeld in 2 delen. De client en de server applicaties.

### Client
De client applicatie is een Next.js app. Deze app is terug te vinden onder /client

### Server
De server applicatie is een Express app. Deze app is terug te vinden onder /server

## Requirements

- Node.js versie 16 of hoger geïnstalleerd.
- Lokaal een MongoDB Database aan.

## Meewerken aan het project.

Onderstaande stappen zijn een opzet voor het live zetten van de development applicaties. Om dit succesvol te runnen heb je een Node versie van minimaal 16 nodig een npm geinstalleerd hebben.

## Clone de Github repository, en ga naar de folder in je terminal
> De source folder van het project is huisnieuws, voer alle commandos uit vanuit deze folder.

```bash
git clone git@github.com:HANICA-DWA/sep2021-project-numbat.git
cd sep2021-project-numbat
# huisnieuws is de source folder van het project.
cd huisnieuws
```

### Kopieer `.env.example` in de server folder en plak deze met de naam `.env`

```bash
# Voor Mac en Linux gebruikers
cd server
cp .env.example .env

# Voor windows
cd server
copy .env.example .env
```

### Kopieer `.env.local.example` in client folder en plak deze met de naam `.env.local`

```bash
# Voor Mac en Linux gebruikers
cd ../client
cp .env.local.example .env.local

# Voor windows
cd ../client
copy .env.local.example .env.local
```

Vul dit bestand aan met de volgende gegevens:

- `GOOGLE_CLIENT_ID` Keys van Google API voor OAuth
(Zie deze link: [https://support.google.com/cloud/answer/6158849?hl=en](https://support.google.com/cloud/answer/6158849?hl=en))
- `GOOGLE_CLIENT_SECRET` Keys van Google API voor OAuth
(Zie deze link: [https://support.google.com/cloud/answer/6158849?hl=en](https://support.google.com/cloud/answer/6158849?hl=en))
- *`NEXT_PUBLIC_MAPBOX_API_ACCESS_TOKEN` API key* voor de kaart.
    - Zie deze links: [How to use mapbox](https://docs.mapbox.com/help/getting-started/#how-to-use-mapbox), [Mapbox Glossary (Access token)](https://docs.mapbox.com/help/glossary/access-token/)
- *`GOOGLE_USER_EMAIL` Gmail account voor OAuth e2e tests.*
- *`GOOGLE_USER_PASSWORD` Gmail account voor OAuth e2e tests.*

### Zet de omgeving klaar en run de apps

Installeer de benodigde packages, run de seeder van de database en run de development apps. in dit geval de Next.js app en de Express API.

```bash
# Development

# Open een terminal om de Next.js app starten in dev-mode.
cd client
npm i
npm run dev

# Open een terminal om de Express API te starten in dev-mode.
cd server
npm i
npm run seed # Seed de database met testdata.
npm run dev
```

### Bekijk de applicatie

Als alle stappen zijn doorlopen, staat er een Huisnieuws applicatie klaar op de URL: `http://localhost:8080`.

Je ziet dan de client app:

![image](https://user-images.githubusercontent.com/38584349/147246281-e454cba5-a6a1-4bb2-9051-9358c6bff666.png)

### Acties

In de testdata wordt de volgende postcode gebruikt: 2587GA.
Deze postcode kan je gebruiken om te zoeken naar artikelen.

Je kan inloggen door rechtsboven in de navbar op inloggen te drukken. Daar moet je inloggen met een google account wat is toegevoegd als test user aan je Google API.

### Tests

Je kan de volgende commando’s gebruiken om de unit tests uit te voeren.

```bash
# unit tests
cd ./server
npm run test

cd ./client
npm run test
```

**Voor de e2e tests moet je eerst de dev server van zowel de client als de server starten.**   
**Voor het gebruik van de test user, moet je eerst een keer inloggen via chrome(puppeteer draait op chromium) om google tevreden te stellen, anders vraagt google om een telefoon nummer, waar wij geen rekening mee houden.**

```bash
# Start client en server
cd ./client
npm run dev

cd ./server
npm run dev

# start de e2e tests.
cd ./client
npm run test:e2e
```

### Deployment

Als je build-ready varianten van de beide applicaties wilt genereren zijn hier speciale commands voor. Hieronder staat beschreven hoe je dit doet.

```bash
# Open een terminal om de Next.js app builden.
cd client
npm i
npm run build # Maakt en productie build in de .next folder.
npm run start # Start de Next.js app in production mode.

# Open een terminal om de Express api starten.
cd server
npm i
npm run build # Maakt een productie build in de /dist map.
npm run start # Start de Express api in production mode.
``` 
