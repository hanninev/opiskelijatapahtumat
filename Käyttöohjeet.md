# Käyttöohjeet

Kaikki käyttäjät voivat selata palveluun syötettyjä tapahtumia. 
* Heinäkuun viimeiselle viikolle on syötetty testidataa, joten kannattaa navigoida sinne nähdäkseen toiminnallisuuden:
http://opiskelijatapahtumat.herokuapp.com/week/2018-07-30?comb=or
* Kustakin tapahtumasta näkee lisätietoja klikkaamalla sitä.
* Oletuksena palvelu näyttää kaikki kyseiselle viikolle syötetyt tapahtumat, mutta niitä voi filtteröidä tapahtumatyypin, järjestäjän, järjestäjän tyypin ja paikan mukaan. 
* Lisäksi voidaan valita, riittääkö yhden hakuehdon toteuttaminen vai tuleeko kaikkien hakuehtojen täyttyä. Jos esimerkiksi valitsee tapahtumatyypiksi sitsit ja paikaksi Alina-salin sekä klikkaa "toteuttaa kaikki hakuehdot", käyttäjä näkee ainoastaan kaikki Alina-salissa järjestettävät sitsit.
* Osoiterivi muuttuu hakuehtojen mukana, eli filtteröidyn sivun voi linkata kaverille.
* Palvelu on optimoitu myös mobiililaitteille.

Kaikki käyttäjät voivat lähettää tapahtumaehdotuksia.
* Ilmoita uusi tapahtuma -napista pääsee lisäämään tapahtumaehdotuksen.
* Jos sopivaa tapahtumatyyppiä, järjestäjää tai paikkaa ei löydy valmiiksi, käyttäjä voi lisätä ehdotuksen uudesta tapahtumatyypistä, järjestäjästä tai paikasta.
* Kaikki kirjautumattoman käyttäjän tekemät lisäykset menevät ensin ylläpitäjän hyväksyttäviksi.
* Ylläpitäjä voi tehdä lisäyksiä ilman, että erillistä hyväksyntää vaaditaan.

Ylläpitäjä pääsee hallinnoimaan tapahtumia
* Ylläpitäjä pääsee kirjautumaan järjestelmään oikeasta yläkulmasta.
* Ylläpitäjän näkymässä jokaisessa tapahtumassa on poista ja muokkaa-painikkeet.
* Samalla sivulla voi muokata useampaa tapahtumaa samanaikaisesti.
* Ylläpitäjä näkee Hallitse tapahtumia-sivulla listan hyväksymättömistä lisäyksistä, joita käyttäjät ovat lähettäneet järjestelmään. Kun ylläpitäjä hyväksyy lisäyksen, se näkyy kalenterissa.
