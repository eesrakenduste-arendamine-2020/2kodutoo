# 2. kodutöö – ToDo rakendus

### Autorid:
Herman Petrov, Daniel Eelmaa, Tauri Miilits

### Tekkinud keerukused:
Sortimine, AJAXI töölesaamine, animatsioonid, 

Suurim probleem siiski jääb AJAXI ja andmebaasi sidumine. Oli  raske seadistada nii ,et üle ei kirjutaks olevaid entry-sid.
Kuna tahtsime, et olev t-odo list oleks keskendatud todo.txt andmebaasiga töötamisele ja mitte tavapärase localStoragega, andes nii võimaluse kasutajal ka teiselt arvutilt täiendada ja kuvada enda to-do listi. 

### Funktsionaalsuste kirjeldused:
* Kasutaja saab lisada erinevaid ülesandeid ja neid kustutada
* Ülesannete lisamisel saab kasutaja märkida ülesande pealkirja/märksõna, kirjutada täpsemalt antud ülesande kohta, Võimalus märkida ülesanne tähtsaks ning viimasena märkida ülesande kuupäeva.
* Saab märkida ülesandeid, kas need on tehtud või mitte
* Kasutajal on võimalus järjestada ülesandeid kuupäeva ja nime järgi. Lisaks saab omakorda kuvada ülesandeid, mis on tehtud, tegemata või kõiki korraga(nii tehtud kui tegemata)
* Ülesannet saab salvestada localStorage'isse ja faili andmebaasi. LocalStorage'i key on "here are your events" ja faili andmebaas "todo.txt"
* Ülesanne salvestatakse ja kuvatakse kasutades AJAX'it (todo.txt)
* Tulles tagasi lehele saab näha ka varem salvestatud ülesandeid
* Rakenduses on väljatoodud legend To Do eristamiseks
* Kuvatakse eraldi kaks To Do listi kasutajale:
    * Oluline To Do list
    * Tavaline To Do list
* Ülesanded kuvatakse erinevate värvustega: möödunud kuupäev on kollane, tänane kuupäev on punane ning valgega on märgitud ülesanded, millega on aega
* Elementide kuvamisel/eemaldamisel on kasutatud jQuery animatsioone
* Võimalus otsida ülesandeid
* Soovi korral saab ka muusika mängima panna

Suurem osa gruppitööst oli tehtud koostöös Discordi teel ning katsetatud putty: greeny keskkonas +  WinSCP.

*Herman Petrov :
Olulisemad punktid: 
Js-funktsionaalsuse testimine ja loomine+css.
Kirjutasin ja arendasin koodi, mis võimaldaks lugeda ajaxi abil todo.txt failist andmeid ja ka salvestaks neid. 
Kirjutasin localStorage võimaluse todoListile.
Andmebaasi töötamise testimine ja arendamine.
Kujundasin CSS, arendasin tausta todo ja paigutust. 
Arendasin Delete ja Add võimalused todod.
Koodi vormistus + testmine

*Tauri Miilits:
Olulisemad punktid:
Arendasin välja koodi, kus sai lõpuks siduda läbi serveri funktsioonide todo.txt faili (AJAX).
Arendasime koos To Do'de eristamiseks sorteerimisvõimaluse.
CSS kujundamine, disain ja nende paigutused. Lisasin legendi, et paremini eristada To Do'sid.
Koodi vormistus + testimine

*Daniel Eelmaa:
Olulisemad punktid:
Tegelesin enamjaolt JS'i funktsionaalsuste loomisega.
Tegin valmis põhjalikuma Add funktsiooni. 
Arendasin Search ja Sort funktsioone lehe jaoks.
Võimaluse märkida ülesanded tehtuks.
JQUERY animatsioonid ToDo'de kuvamisel.
ToDo'de tähtsaks märkimine ja eraldi kuvamine.
Koodi vormistus + testimine

