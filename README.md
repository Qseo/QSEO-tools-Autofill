# QSEO-tools-Autofill

Userscript for auto full form values and submit forms on any page.

Copyright
------------------------

Author: Alexey Murz Korepov

E-mail: seo@qseo.ru

Description in Russian
========================

Юзерскрипт для автоматического заполнения форм на страницах и кликания по кнопкам. С его помощью можно по заранее подготовленному урлу автоматически в 1 клик входить в учетные записи Яндекс.Почты, почты Mail.ru, а также любых других сайтов и сервисов.

Для того, чтобы заполнить поле формы значением - нужно указать в url-адресе jquery-селектор для этого элемента и требуемое значение.

Элементы для заполнения передаются через параметр _autofill в url-адресе, разделенные точкой с запятой. 

Команды выполняются последовательно. Кроме заполнения форм доступны также специальные команды:

- sleep=xxx - сделать паузу на ххх милисекунд (1 секунда = 1000 милисекунд).

- click=xxx - сгенерировать событие клика на объект, где xxx - jquery-селектор нужного элемента.

*Помните, что набранные урлы сохраняются в истории браузера, поэтому могут быть доступны всем, кто имеет доступ к истории браузера. Поэтому рекомендуем открывать такие ссылки только в приватном окне или приватной вкладке через расширение "Private tab" https://addons.mozilla.org/ru/firefox/addon/private-tab/ - тогда они сотрутся из истории сразу после закрытия всех приватных вкладок.*


Примеры: 
------------------------

1. https://mail.yandex.ru/?_autofill=%23nb-1%20input=vasya;%23nb-2%20input=super-password - откроет страницу Яндекс.Почты и автоматически заполнит логин-пароль

2. https://mail.yandex.ru/?_autofill=%23nb-1%20input=vasya;%23nb-2%20input=super-password;click=button._nb-action-button - откроет страницу Яндекс.Почты и автоматически заполнит логин-пароль из url-адреса

3. https://accounts.google.com/ServiceLogin?service=mail&debug&continue=https://mail.google.com/mail/&hl=ru&_autofill=%23Email=vasya;click=%23next;sleep=1000;%23Passwd=super-password;click=%23signIn - выполнит вход на почту Gmail, учитывая необходимость двойного клика по кнопкам в форме.

4. http://yandex.ru/yandsearch?text=url%3Ahttp%3A%2F%2Fexample.com%2Fboring&how=tm&_autofill=sleep%3D10%3Bhref%3D.popup2%20a.i-bem - откроет страницу кеша Яндекс по данному урлу.


Установка:
------------------------

Данный скрипт должен работать во всех современных браузерах:

- Mozilla Firefox: предварительно нужно установить расширение GreaseMonkey https://addons.mozilla.org/ru/firefox/addon/greasemonkey/

- Google Chrome: не требует установки специальных плагинов/расширений, для расширенных настроек можно использовать Tampermonkey https://chrome.google.com/webstore/detail/dhdgffkkebhmkfjojejmpbldmpobfkfo

- Internet Explorer: IE7, IE8, IE9 поддерживают юзерскрипты при использовании плагинов Trixie http://www.bhelpuri.net/Trixie/Trixie/ и IE7Pro http://www.ie7pro.com/

- Подробнее о поддержке браузерами UserScripts можете прочитать здесь: http://habrahabr.ru/post/129454/

После этого перейти по ссылке: https://github.com/Qseo/QSEO-tools-Autofill/raw/master/QSEO-tools-Autofill/QSEO-tools-Autofill.user.js
и согласиться с установкой плагина, перезагружать браузер не требуется.

После этого на страницах Яндекса должны появиться дополнительные элементы.

Отключение и удаление:
------------------------

- перейти в список UserScripts, отключить или удалить скрипт с названием QSEO-tools-Autofill

**P.S.**

*Изначально скрипт был разработан для личных нужд компании qseo.ru, но в процессе доработок принято решение поделиться этими наработками с сообществом.*

*Найденные баги и предложения можете сообщать через GitHub issue tracker.*


Changelog
---------

2016-07-04 - версия 1.6. Исправление багов.

2016-03-31 - версия 1.5. Исправлена работа селекторов использующих знак "=".

2016-03-31 - версия 1.4. bug fixes

2016-02-02 - версия 1.3. Фикс для ситуаций, когда при редиректе, к примеру на www., параметры в урле повторно энкодятся.

2016-02-02 - версия 1.2. Добавлена возможность работы с любыми селекторами без использования замен. Все селекторы и значения заполняемых полей должны быть предварительно обработаны в urlencode.

2015-08-19 - версия 1.1. Улучшено распознавание символа "=" в значениях. Добавлена поддержка команды href (перейти по ссылке).

2015-08-18 - версия 1.0. Первая тестовая версия.
