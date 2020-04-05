Autorid: Edgar Lainelo, Robin Kadakas

Keeruline osa oli tööle saada template selleks et ei peaks iga taski javascriptis manuaalselt kirjutama, vaid et saab html põhja ja selle .js faili tuua.

Funktsionaalsus:
1. Kirjutades "Loo uus list" kohale kirje ja vajutatdes "+" saab luua uued listid.
2. Klikkides listi peale mille olid just teinud, avaneb paremal ülesanne lisamise moodul.
3. Kirjutades "Loo uus ülesanne" ja vajutated "+" saab luua uue ülesande, mida saab valideerida ja siis vajutata "Tühjenda täidetud ülesanded" 
4. Kui ülesande peale on vajutatud siis muutub ta roheliseks ja kriips tuleb peale.
5. Paremas üleval nurgas on loendur mis vaatab kui palju on ülesandeid jäänud teha.
6. Kui kõik ülesanded seal listis tehtud on siis võib listi kustutada kasutades "Kustuta list" nuppu.
7. Kui liste on palju siis on neid võimalik otsida "Otsi listi..." lahtriga


--------------------------------------------------------------------------------------------------------------------------
# 2. kodutöö – ToDo rakendus

### Tähtpäev 05.04.2020 23:59

## Nõuded

1. Töö tuleb teha vähemalt kahekesi, eelnevalt kokkuleppel on lubatud ka kolm liiget. GitHub'is peab eristuma, kes mida tegi!
1. README.md fail sisaldab (1 punkti):
    * autorite nimesid; 
    * kirjeldust tekkinud keerukustest
    * funktsionaalsuste kirjeldust
1. Todo rakenduse funktsionaalsused:   
    * Saab lisad ja kustutada (1 punkt)
    * Saab märkida ülesandeid tehtuks (1 punkt)
    * Saab järjestada kuupäeva ja nime järgi ülesandeid (2 punkti)
    * Ülesanded salvestatakse localStorage'isse ja faili/andmebaasi (2 punkti)
    * Ülesannete salvestamiseks ja kuvamiseks kasutatakse AJAX-it (1 punkti)
    * Kui kasutaja tuleb lehele, siis näidatakse varem salvestatud ülesandeid (1 punkt)
    * Rakendus töötab loogiliselt ja kasutaja ei pea mõtlema, et kuidas rakendus töötab. (2 punkti)
    * Lisa ise 5 funktsionaalsust juurde.(5 punkti)
      Näiteks: 
         * Võimalus lisada kategooriad ja nende alusel jagada ülesandeid
         * Möödunud ja/või tänase kuupäevaga tegemata ülesanded märkida erinevalt
         * Võimalus otsida ülesandeid
         * Võimalus märkida ülesandeid tähtsaks ning kuvada tähtsad ülesanded eraldi listina
1. Väljanägemine ja animatsioonid
    * Rakendus näeb kena välja (3 punkti)
    * Elementide kuvamisel/eemaldamisel on kasutatud jQuery animatsioone (1 punkt)


## Githubi töövoog grupiga töötades

1. Üks grupi liikmetest teeb fork-i 2kodutoo repositooriumist
2. Tuleb lisada meeskonnaliikmed collaborators-iteks fork-itud repositooriumi 
3. Collaborator-id peavad kutsega nõustuma (e-mail)
4. Iga ühel tuleb teha git clone fork-itud repositooriumist (git clone https://YOURUSERNAME@github.com/REPOSITORYOWNERUSERNAME/REPOSITORY.git)
5. Muudatuste lisamine:
     * git add
     * git commit
     * git fetch & pull
     * git push

## Kasulikud viited
* [JQuery dokumentatsioon](http://api.jquery.com)
* [Collaboration on github](https://github.com/eesrakenduste-arendamine-2019/2kodutoo/settings/collaboration)
* [JQuery POST](https://api.jquery.com/jquery.post/)
* [JQuery AJAX](http://api.jquery.com/jquery.ajax/)
