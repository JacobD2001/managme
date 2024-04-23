# This app uses modules not standalone components for now

# Client

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.4.

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

## ToDo

- [x] lab 1
- [ ] lab 2 - api(do zapisywania historyjki, ale tu jest firebase), status historyjek lista filtrowana
           - dostosować modele pod apke
           - labele mają 3 kolore todo/doing/done
           - dodać filtrowanie z ikonką filtrowania
- [ ] lab 3 - dodać zadania pod historyjki
- [ ] lab 4 - api(firebase zajmuje się logowaniem itd)
- [x] lab 5

1. Dostosować modele pod projekt/story/user
2. Zmodyfikować żeby projekty w kanbanie ustawiać w 3 statusas todo/doing/done i przesuwać tylko między 3 kolumnami
2. Historyjki powinny mieć statusy(filtorwanie po statusie czy coś takiego dodać)
3. dodać zadania pod historyjki(lab3)
4. Zapytać czy zamiast api u mnie to robi firebase i czy to jest ok
5. Projekty 


## My notes

---Użytkownicy---
1. Panel logowania użytkowników - dane wysyłane do api -> 
2. api(1. endpoint) pobiera login i hasło weryfikuje i zwraca token JWT i refreshtoken lub błąd
3. api(2. endpoint) odświeżanie tokena JWT
Model użytkownika: id, imię, nazwisko, rola(admin,devops,developer)
PYTANIA: 
1. Gdzie przechowywane są dane użytkowników żeby ich logowało itd?

---Projekty(największa jednostka)---
1. Crud projektu(utwórz nowy, edytuj, usuń, zapisz)
Model projektu: id, nazwa, opis, status(czekający na wyknoanie, aktualnie wykonywany, zamknięty) lub po prostu wybrać który projekt jest aktywny, inaczej mówiąc taki widok szczegółowy projektu. ew zostawić jak na trello i będą historyjki w środku

---Historyjki(przypisane do projektu)---
1. Crud historyjek(utwórz nową, edytuj, usuń, zapisz)
2. Widok historyjek podzielony na: aktualnie wykonywane, czekające na wykonanie i zamknięte
Model historyjki: id, nazwa, opis, priorytet (niski/średni/wysoki), projekt, data utworzenia, stan (todo/doing/done), właściciel (id użytkownika)

---Zadania(przypisane do historyjek - najmniejsza jednostka w aplikacji)---
1. Crud zadań(utwórz nową, edytuj, usuń, zapisz)
2. Widok szczegółów zadania (lub dodatkowy widok) powinien dostarczać możliwość przypisania osoby do zadania (devops lub developer). Przypisanie osoby automatycznie zmienia stan zadania z "todo" na "doing" oraz uzupełnia datę startu zadania.
3. Widok szczegółów zadania (lub dodatkowy widok) powinien dostarczać możliwość zmiany stanu zadania na "done". Zmiana stanu automatycznie uzupełnia datę zakończenia zadania.
4. Zrealizuj widok tablicy kanban z zadaniami (kolumny todo, doing, done) 
5. Zadania powinny się zapisywać za pośrednictwem mechanizmu komunikacji z api

Model Zadania:

Nazwa
Opis
Priorytet (niski/średni/wysoki)
Historyjka do której przynależy zadanie
Przewidywany czas wykonania
Stan (todo, doing, done). Zadanie ze stanem doing musi posiadać czas startu oraz przypisanego użytkownika. Zadanie ze stanem done posiada przypisanego użytkownika oraz datę zakończenia
Data dodania
Data startu (stan zmieniony na doing)
Data zakończenia (stan zmieniony na done)
Użytkownik odpowiedzialny za zadanie (zadanie może wykonywać devops lub developer)


