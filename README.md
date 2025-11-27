# Angular Assessment Tasklist

## Voor we beginnen

Voor een nieuwe opdracht start neem ik eerst even de tijd om vooruit te kijken, net zoals bij klimmen. Je staat onderaan de muur, voelt de energie om omhoog te gaan en kijkt naar de route die het meest logisch voelt. Niet door snel te beginnen, maar door eerst te spotten waar mogelijke knelpunten zitten. Door die vooraf te zien kun je ze aanpakken of kleiner maken voordat ze echte problemen worden. Dat geeft rust en zorgt ervoor dat de eerste stap stevig staat.

## Doel van de applicatie

Deze applicatie hoort bij een Angular assessment. Het doel is een eenvoudige takenlijst die laat zien hoe de onderdelen binnen Angular samenwerken. Taken bekijken, details openen, zoeken binnen de lijst en nieuwe taken toevoegen vormen de basis. Routing verzorgt de navigatie tussen de schermen en een service beheert de data. Zoekresultaten worden subtiel gemarkeerd. Tests maken deel uit van de opdracht en aan het einde komt er een lichte vorm van autorisatie.

## De route die ik volg

Het project begint met een schone Angular installatie. Daarna komt er een basisstructuur met een dataservice als uitgangspunt. Vanuit deze basis worden de componenten voor de lijst, het detail scherm en de zoekbalk opgebouwd.

Wanneer deze fundamenten staan voeg ik de interactie toe, zoals het formulier voor nieuwe taken, de zoekfunctie en de routing. Daarna schrijf ik tests en pak ik kleine punten mee die opvallen. Als laatste komt er een eenvoudige login die laat zien hoe Angular omgaat met een gebruiker die wel of niet ingelogd is. De opzet blijft overzichtelijk zodat de focus op Angular zelf ligt.

Het document wordt aan het einde bijgewerkt zodat de route duidelijk te volgen blijft.

## Hoe ik omga met het bewaren van gegevens

Een stabiele ervaring vraagt om gegevens die bewaard blijven bij een verversing. Daarom sla ik de state op in de browser, zoals de taken en de gebruiker. Angular signals gecombineerd met een klein effect naar localStorage houden dit licht, modern en betrouwbaar.

## Hoe ik omga met kwaliteit en structuur

De code hou ik graag rustig en duidelijk. Angular linting helpt daarbij en Prettier zorgt dat alles automatisch wordt opgemaakt. De line endings staan op Linux omdat dat praktische problemen voorkomt in pipelines en op andere machines. Daarnaast werk ik liever in kleine stappen met duidelijke naamgeving.

Toegankelijkheid hoort vanzelf bij het proces. Semantische HTML, aria attributen waar dat nodig is, voldoende contrast en schaalbare waarden zoals rem dragen bij aan een fijne gebruikservaring. De vormgeving blijft fluid zodat de applicatie zich prettig gedraagt op verschillende schermformaten. Performance en eenvoud vormen de basis.

## Hoe ik omga met testen

Angular zeventien gebruikt Vitest als standaard test runner. Deze keuze past goed bij de moderne Angular architectuur. Vitest werkt snel, geeft duidelijke foutmeldingen en heeft bijna geen configuratie nodig. Zowel de service als de componenten en de zoeklogica worden hiermee getest. De tests blijven klein zodat ze goed leesbaar en begrijpelijk blijven.

## Overwegingen tijdens refinement

### Zoeken en highlighten

In een echte refinement zou worden uitgezocht wat iemand precies verwacht van een zoekfunctie. Filteren, sorteren of alleen markeren zijn allemaal opties. Voor deze opdracht blijft het eenvoudig en highlight ik alleen de resultaten zoals omschreven in de opdracht.

### Styling en fluid design

Een fluid ontwerp zorgt voor een prettige schaalbaarheid. SCSS geeft overzicht en maakt herbruikbare delen mogelijk. Angular scoped styles automatisch waardoor componenten elkaar niet beïnvloeden. De vormgeving blijft rustig en gericht op de inhoud.

### Gebruik van ontwerp richtlijnen

Omdat deze opdracht aansluit bij werk voor de overheid kijk ik ook naar het NL Design System. Dit systeem wordt hier niet volledig toegepast omdat de opdracht technisch is en klein van omvang. De principes gebruik ik wel, zoals toegankelijkheid, voldoende contrast en schaalbare tekst. Daarmee sluit het ontwerp aan bij de standaarden die binnen de overheid gelden.

### Afbakening van functionaliteit

De opdracht richt zich op Angular. Daarom kies ik voor signals en eenvoudige opslag in de browser. Zware state libraries zijn niet nodig. Ook een volledige authenticatieflow hoort hier niet thuis. In echte projecten wordt authenticatie door de backend geregeld. Voor deze opdracht volstaat een lichte autorisatielaag op basis van een eenvoudige gebruiker en rol.

### Gebruikservaring

Kleine keuzes hebben veel effect. Een daarvan is het bewaren van gegevens na een verversing. Dat geeft meteen meer stabiliteit zonder dat het ingewikkeld wordt.

## Hoe ik commit

Bij committen werk ik in kleine stappen. Zo blijft het overzichtelijk en kun je altijd terugzien welke keuzes er zijn gemaakt en waarom.

## Over deze documentatie

Deze documentatie is bewust in het Nederlands geschreven omdat de opdracht en de communicatie ook Nederlandstalig zijn. De code, tests en bestandsnamen zijn wel in het Engels, zoals gebruikelijk binnen Angular projecten.

---

# Globale stappen van het project

- Een nieuw Angular project opzetten met SCSS, routing en standalone componenten
- Basisstructuur aanmaken
- Service voor het beheren van taken
- Models toevoegen voor duidelijke data types
- State opslaan via Angular signals en localStorage
- Componenten bouwen voor de takenlijst
- Component bouwen voor taakdetails
- Component bouwen voor de zoekbalk
- Routing configureren tussen lijst en details
- Formulier maken voor het toevoegen van nieuwe taken
- Zoeklogica koppelen en resultaten highlighten
- Eenvoudige autorisatie toevoegen met een gebruiker en rol
- Styling aanbrengen met een SCSS structuur
- Fluid design toepassen
- Toegankelijkheid verwerken (contrast, aria, semantiek)
- Unit tests schrijven voor service, componenten en zoeklogica
- Documentatie bijwerken

# AngularAssessmentTasklist

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.17.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
