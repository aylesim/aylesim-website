# Brief UI — homepage Aylesim

Questo documento riassume la direzione richiesta per la homepage e può essere
passato a un’altra AI come brief di progetto.

## Obiettivo

Presentare i progetti di Alessandro Miracapillo (aylesim) come un ambiente
visivo interattivo. La homepage deve mettere in primo piano i progetti e la
loro scena animata, riducendo al minimo l’interfaccia che li circonda.

## Direzione visiva e mood

- Scena notturna, immersiva e contemplativa, con un carattere digitale e
  sperimentale. Deve sembrare uno spazio tridimensionale da esplorare, non un
  pannello di amministrazione o una griglia di portfolio convenzionale.
- Sfondo molto scuro, blu profondo e nero inchiostro; accenti freddi ciano,
  azzurro e violetto. La luce deve dare profondità alle immagini senza
  competere con esse.
- Le sfere sono l’elemento visivo principale: grandi, morbide e traslucide,
  con immagini dei progetti al loro interno e riflessi delicati da vetro.
- Il mood è calmo e sospeso. L’animazione deve essere fluida e lenta, mai
  frenetica o decorativa al punto da distrarre dai progetti.

## Composizione

- La scena delle sfere occupa l’intero viewport ed è il contenuto dominante.
- Le sfere hanno dimensioni e profondità diverse, si sovrappongono con
  intenzione e restano distribuite nello spazio. Il movimento deve farle
  percepire come oggetti sospesi, non come card che scorrono.
- Un menu semplice è sovrapposto sul lato sinistro. Deve essere leggibile,
  leggero e secondario rispetto alla scena; può usare testo chiaro e un fondo
  trasparente o appena sfumato se serve contrasto.
- Il menu contiene il nome/brand, i link Work e About e i filtri di progetto
  (All projects, Audio tools, Web, Community, Artworks). I conteggi sono
  facoltativi se appesantiscono la composizione.
- Non mostrare contenuti di pagina sotto o dietro la scena.

## Movimento e interazione

- Le sfere fluttuano autonomamente, ciascuna con una traiettoria e un ritmo
  lievemente diversi. Il moto deve continuare anche quando il puntatore è
  fermo.
- Il puntatore controlla il parallax della scena/camera: spostandolo,
  l’ambiente ruota e trasla con risposta morbida e contenuta. Il movimento del
  puntatore non deve annullare o bloccare la fluttuazione autonoma.
- Selezionando un filtro, le sfere rappresentano la categoria scelta e le
  altre vengono attenuate o arretrate con una transizione fluida.
- Selezionando una sfera si apre il dettaglio del progetto; Escape e un
  controllo Close consentono di tornare alla scena.
- Rispetta `prefers-reduced-motion` e mantieni controlli e testi accessibili da
  tastiera.

## Da eliminare dalla homepage

La richiesta è di spogliare la homepage dagli elementi che sottraggono spazio o
creano problemi alla scena. Evitare di rimontare:

- cornice desktop/Finder o finestra centrale;
- sidebar e pannello laterale con riconoscimenti;
- dock, playbar e barra di navigazione inferiore;
- ricerca, breadcrumb, toolbar e controlli non necessari;
- griglie di card, elenchi o contenuti duplicati sotto le sfere.

Le pagine separate, come About, possono mantenere i contenuti informativi
propri: la semplificazione descritta qui riguarda soprattutto la homepage.

## Criteri di riuscita

La scena deve essere il primo elemento che si nota. Il menu deve essere
comprensibile in un istante senza sembrare una seconda interfaccia. Le sfere
devono apparire grandi, nitide quando sono in primo piano e chiaramente
tridimensionali; parallax e fluttuazione devono funzionare insieme senza
scatti, tremolii o conflitti. Su schermi piccoli il menu deve restare compatto
e non coprire i progetti.

## Sintesi da riutilizzare come prompt

> Ridisegna la homepage del portfolio Aylesim come una scena 3D immersiva e
> minimale. Usa uno sfondo scuro blu/nero, luci fredde e grandi sfere di vetro
> che contengono le immagini dei progetti. Le sfere devono fluttuare da sole
> con ritmi diversi; il puntatore deve controllare un parallax morbido della
> scena. Sovrapponi soltanto un menu semplice a sinistra con brand, Work,
> About e filtri per categoria. Cliccando una sfera si apre il dettaglio del
> progetto. Rimuovi dalla homepage Finder, sidebar, pannelli, dock, playbar,
> ricerca, griglie e contenuti sottostanti. Mantieni la composizione
> responsive, accessibile e rispettosa della preferenza per movimento ridotto.
