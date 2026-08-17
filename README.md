# Přehraj.to premium bypasser

Userscript, který umožní přehrávání videí na webu [Přehraj.to](https://prehrajto.cz/) neomezeně, bez limitu.

## Požadavky

Nainstalované rozšíření v prohlížeči pro spouštění userscriptů (např. [Tampermonkey](https://www.tampermonkey.net/), [Greasemonkey](https://wiki.greasespot.net/) nebo [Violentmonkey](https://github.com/violentmonkey/violentmonkey))

## Instalace

1. Nainstalujte si výše uvedené rozšíření do prohlížeče
2. Vytvořte nový skript
3. Vložte/nahrajte [script](sledujteto_premium_bypasser.js) a uložte

## Implementace

Skript byl vytvořen díky reverse-engineeringu chování stránky. Pro zjištění se začne od důsledku (přehrávač se zastaví a zobrazí reklamu) k příčině (skript pravidelně kontroluje uběhlou dobu a ukončí přehrávání)  

- Po uplynutí časového limitu (60 s) je odeslán požadavek na URL typu `...?videoStoppedDialog-open=1`.
- Ten je odeslán ze skriptu `video-js-player.js`.
- Tento skript je zodpovědný za přehrávání videa a je vložen do zdrojové html stránky.
- Uvnitř je funkce, která pravidelně spouští tuto kontrolu.
```js
if (links.redirect && viewed >= freeLimitPlay) {
    console.log("Stop");
    player.pause();
    window.location.href = links.redirect;
}
```
- Proměnné ani funkce nejsou přístupné zvenčí, takže je nutné změnit chování před spuštěním toho skriptu.
- Je ale patrné, že podmínka závisí hlavně na tom, jestli existuje `links.redirect`, což je parametr hlavní funkce ve skriptu `video-js-player.js`.
- Userscript přepíše hodnotu této proměnné (`null`) předtím než je funkce zavolána.
- Díky tomu podmínka nikdy není pravdivá a přehrávání běží donekonečna.

## Limitace

Pokud se při nějaké aktualizaci z velké části změní chování webové stránky, je pravděpodobné, že skript už nemusí fungovat.

## Licence

MIT
