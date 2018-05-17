# Opiskelijatapahtumat
Harjoitustyön aiheena on tehdä kalenterisovellus, josta näkee yhdelllä vilkaisulla kaikki kunkin viikon opiskelijatapahtumat. Tiedot haetaan ainejärjestöjen ja osakuntien Facebook-sivuilta käyttäen Facebookin APIa.

[Linkki sovellukseen](http://opiskelijatapahtumat.herokuapp.com)

Projekti koki takaiskun, kun Facebook päivitti API:aan ja esti kaikki kyselyt tapahtumiin. Edes julkisten tapahtumien julkisia tietoja ei ole enää saatavilla. Backendistä on kommentoitu pois osa, joka teki pyynnöt Facebookille ja korvattu kovakoodatulla testidatalla, joka on samassa muodossa kuin se vielä projektin alussa tuli Facebookilta. Tapahtumia löytyy etenkin [7.5. alkavalla viikolla.](http://opiskelijatapahtumat.herokuapp.com/week/2018-05-07?comb=or)

[Backendin repo](https://github.com/hanninev/opiskelijatapahtumat-backend)
[Tuntikirjanpito](https://github.com/hanninev/opiskelijatapahtumat/blob/master/Tuntikirjanpito.md)
[Käyttöohjeet](https://github.com/hanninev/opiskelijatapahtumat/blob/master/Kayttoohjeet.md)
