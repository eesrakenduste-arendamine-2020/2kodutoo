# 2. kodutöö – ToDo rakendus

## Autorid

Sten Raudmets ja Brita Liivamaa.

## Link

[greeny.cs.tlu.ee/~britalii/eesrakendused/2kodutoo/](greeny.cs.tlu.ee/~britalii/eesrakendused/2kodutoo/)

## Tekkinud keerukused

Enamus keerukusi projektiga tekkis koodiga ja SVG failidega seoses.

### Javascriptiga POST-imine

Suhteliselt algusest peale oli soov jQuery-ga tegeleda minimaalne, kuna puhta Javascriptiga DOM-iga suhtlemine nii keeruline ka ei ole. Kuid Fetch API kasutamise peale kulus päris kaua aega, sest kogemus PHP-ga on suhteliselt minimaalne ehk ei osanud seda väga debuggida kuid lõpuks selgus et vahet pole Fetch API headerid sättida ja meetod paika panna, ta alati tegi GET requeste. Seega läksime vanema standardi juurde `XMLHTTPRequest()` ja tegime selle asünkroonseks Promise-iga ja POST request töötas veatult.

### Git

Brital oli suhteliselt vähe kogemust Gitiga ja Greeny kasutamine samal ajal valmistas Githubis natuke peavalu. Ükski Brita commitidest ei ole tema tegeliku Githubi konto alt ma arvan. Aga kõigis kus tema täisnimi on mainitud on tema commitid. 

### Map vs object array

Algselt olid Todod salvestatud objektidena massiivis kuid Map tundus kiirem ja võib-olla liiga palju aega kulus selle tööle saamiseks. Sest Map-i ei saa lihtsalt sorteerida (mis on üks lehekülje funktsionaalsustest), seega oli ikkagi vaja massiivi mis oleks sünkroonis Map-iga (sest ei olnud väga tuju minna objektide juurde tagasi pärast kogu seda tööd). Mõistlik viis sünkrooni saavutamiseks oli extendida Map classi ja kirjutada üle `set()` ja `get()` meetodid ning salvestada Map-i muudatused `todosView` massiivi. Seega Map oli ülesannete kiireks kättesaamiseks ja faili salvestamiseks aga massiiv oli renderdamiseks ja sorteerimiseks.

Aga kuna Map on praktiliselt dictionary siis peab olema tal key millega mingit Todo-d addresseerida kuid ülesannetel ei olnud midagi unikaalset, isegi tiitlid võisid korduda, seega oli vaja ID genereerida (selle jaoks sai lihtsa funktsiooni stackoverflowist).

Map ei serialiseeru ka seega tuli ise `toJSON` meetod anda et saada `JSON.stringify()`-ga seda kasutada.

### SVG

SVG on vektorgraafika formaat, mis teeb ta disaini jaoks väga meelepäraseks kuna teda saab suurendada ilma et kaotaks kvaliteeti. Kuna vajalikud ikoonid ei olnud väga keerulised siis Sten valmistas need ise Affinity Designeris (Adobe Illustratori ekvivalent). Kuid CSS-is SVG faili laadimine järgneval kujul `background: url("file.svg")` ei lase seda SVG-d addresseerida CSS-i kaudu.
```css
svg {
    display: none;
}
```
See näide ei mõjutaks eelnevalt laetud SVG faili mitte kuidagi, mis tegi elu natukene keerulisemaks.

### Renderdamine

Koodis üks õudus on `renderEntries()` funktsioon mis kasvas väga suureks sest oli vaja sorteerimisjärjekord alles hoida ja mõned nupud vajasid veel containerit SVG muutmise jaoks (vt. eelnevat punkti). Mille kõige tõttu on see funktsioon kolmandik failist. Aga ta on kiire, peaks ühe reflow-ga kõik tehtud saama kuna kasutame `createDocumentFragment()`, et luua ja kombineerida kõik elemendid mälus enne kui need HTML-i lisatakse.

### Checkbox

Checkboxi tegemine CSS-is on üks õudus ja häkk pluss SVG probleemid. Ma väga ei soovi seda osa kommenteerida.

## Funktsionaalsused
* Saab ToDo-sid lisada ja kustutada ja muudatused salvestuvad faili, seega on enne lisatud ülesanded ka lehte avades nähtaval. 
* Saab märkida ToDo tehtuks ja tähtsaks.
* Saab ToDo-sid otsida.
* ToDo-sid saab sorteerida nime ja kuupäeva järgi.
* Funktsionaalsustele on lisatud ka animatsioonid
    * Tähtsaks märkimisel muutub ToDo kollaseks. 
    * Linnukese lisamisel, ehk tehtud märkimisel tämmatakse ToDo läbi. 
    * Nuppudele on lisatud hover efektid.
    * Nuppude allhoidmisel kaob nende kast ja kasti vari.
* Faili salvestamise või laadimise ebaõnnestumisel kasutatakse localStorage-it.
* Erakordne veebilehe kiirus. 
* Veebileht reageerib vastavalt veebiakna suurusele ja toetab ka väiksemaid ekraane. 

## Tööde jaotus

Sten tegeles rohkem programmeerimise osaga ja Brita abistas sellega ning tegeles disaini conceptiga.