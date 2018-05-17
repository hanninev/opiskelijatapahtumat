# Käyttöohjeet

Sovellus hakee listan tapahtumia, joiden näkyvyyttä voi filtteröidä tapahtumatyypin, järjestäjän, järjestäjän tyypin tai paikan mukaan. Projekti koki takaiskun, kun Facebook päivitti API:aan ja esti kaikki kyselyt tapahtumiin. Edes julkisten tapahtumien julkisia tietoja ei ole enää saatavilla. Backendistä on kommentoitu pois osa, joka teki pyynnöt Facebookille ja korvattu kovakoodatulla testidatalla, joka on samassa muodossa kuin se vielä projektin alussa tuli Facebookilta.

http://opiskelijatapahtumat.herokuapp.com

Kun menee juuriosoitteeseen, oletuksena näytetään kuluva viikko. Jos filtteröintiä haluaa testata, kannattaa navigoida 7.5. alkavalle viikolle:

http://opiskelijatapahtumat.herokuapp.com/week/2018-05-07

Käyttöliittymä näyttää hieman erilaiselta mobiililaitteella kuin tietokoneella.

[Tästä](http://opiskelijatapahtumat.herokuapp.com/admin) löytyy ehdot, joiden perusteella tapahtumatyypin filtteröinti tapahtuu. Ehtojen muokkaaminen tai lisääminen tapahtuu kuitenkin tässä vaiheessa suoraan tietokantaan.
 
