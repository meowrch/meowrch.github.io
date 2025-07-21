---
title: Горячие клавиши
description: ...
---

# Hyprland
Конфигурация горячих клавиш в Hyprland находится по пути `~/.config/hypr/keybindings.conf`.

### Синтаксис:
```ini
bind=МОДИФИКАТОР,КЛАВИША,ДИСПЕТЧЕР,ПАРАМЕТРЫ
```

Где МОДИФИКАТОР может быть одним из следующих значений: `super`, `alt`, `control`, `shift`, `meta`. КЛАВИША — это символ нужной вам клавиши. ДИСПЕТЧЕР указывает на действие, которое будет выполнено при нажатии сочетания клавиш.

### Примеры использования:
```ini
# Эта команда откроет терминал kitty при нажатии сочетания Super + T.
bind=SUPER,T,exec,kitty

# Вы также можете привязать кнопки мыши, добавив к коду клавиши мыши предварительный код: mouse:, например:
bind=SUPER,mouse:272,exec,firefox
```

Для получения более подробной информации и примеров можно обратиться к официальной документации Hyprland [здесь](https://wiki.hyprland.org/configuring/binds/).


# bspwm 
Конфигурация горячих клавиш находится по пути `~/.config/bspwm/sxhkdrc`.

Каждая строка в файле интерпретируется так: \
    Если строка начинается на #, то она игнорируется. \
    Если строка начинается с пробельных символов, она считывается как команда для запуска. \
    Иначе строка считывается как сочетание клавиш: имена клавиш, разделённые пробелом или символом +. \

### Синтаксис:
```text
[МОДИФИКАТОР + ]*[@]СИМВОЛ
    КОМАНДА
```

Где МОДИФИКАТОР может иметь одно из следующих значений: super, hyper, meta, alt, control, ctrl, shift, mode_switch, lock, mod1, mod2, mod3, mod4, mod5. Если перед символом клавиши добавить @, то команда будет выполнена в момент отпускания клавиши, а не сразу в момент нажатия. СИМВОЛ нужной вам клавиши можно узнать с помощью команды xev.

Для отслеживания кнопок мыши можно использовать специальные коды клавиш button1, button2, button3, ..., button24. Также можно задать сразу несколько кодов клавиш в виде последовательности {СИМВОЛ_1,...,СИМВОЛ_N} и добавить в команду последовательность строк (в фигурных скобках и разделённых запятыми) такой же длины — тогда в команду будет подставлен тот элемент последовательности, который соответствует заданному коду клавиши в указанном вами порядке. Если вам нужно добавить в команду обычные фигурные скобки, то, чтобы они не конфликтовали с синтаксисом последовательностей, экранируйте их с помощью обратной косой черты: например, если вы хотите добавить команду awk '{print $1}', запишите её как awk '\{print $1\}'. Также можно задать последовательность в виде диапазона A-Z, где A и Z — буква или цифра.

### Примеры использования:
```text
# При нажатии левой кнопки мыши эмулировать нажатие Alt_R+F1
button1
    xte "keydown Alt_R" "keydown F1" "keyup Alt_R" "keyup F1"

# При нажатии средней кнопки мыши подождать 3 секунды и эмулировать нажатие Alt_R+F2
button2
    xte "sleep 3" "keydown Alt_R" "keydown F2" "keyup Alt_R" "keyup F2"
```

Для получения более подробной информации и примеров можно обратиться к официальному репозиторию sxhkd [здесь](https://github.com/baskerville/sxhkd), или документации, представленной на [Arch Wiki](https://wiki.archlinux.org/title/Sxhkd_(%D0%A0%D1%83%D1%81%D1%81%D0%BA%D0%B8%D0%B9)).

# Meowrch Binds
<table align="center">
	<tr>
		<td colspan="3" align="center">Сочетания клавиш</td>
	</tr>
    <tr>
        <th>Название действия</th>
        <th>Hyprland</th>
		<th>Bspwm</th>
    </tr>
	<tr>
        <td>Открыть терминал</td>
		<td colspan="2" align="center">super + enter</td>
    </tr>
    <tr>
        <td>Открыть файловый менеджер</td>
		<td colspan="2" align="center">super + e</td>
    </tr>
    <tr>
        <td>Открыть диспетчер задач (btop)</td>
		<td colspan="2" align="center">ctrl + shift + esc</td>
    </tr>
    <tr>
        <td>Сменить обои</td>
		<td colspan="2" align="center">super + w</td>
    </tr>
	<tr>
        <td>Сменить тему</td>
		<td colspan="2" align="center">super + t</td>
    </tr>
    <tr>
        <td>Сделать скриншот</td>
		<td colspan="2" align="center">PrintScreen</td>
    </tr>
    <tr>
        <td>Микшер (Pavucontrol)</td>
		<td colspan="2" align="center">super + p</td>
    </tr>
    <tr>
        <td>Буфер обмена</td>
		<td colspan="2" align="center">super + v3</td>
    </tr>
    <tr>
        <td>Открыть меню приложений</td>
		<td colspan="2" align="center">super + d</td>
    </tr>
    <tr>
        <td>Открыть выбор емоджи</td>
		<td colspan="2" align="center">super + .</td>
    </tr>
    <tr>
        <td>Открыть меню включения / выключения компьютера</td>
		<td colspan="2" align="center">super + x</td>
    </tr>
    <tr>
        <td>Заблокировать экран</td>
        <td colspan="2" align="center">super + l</td>
    </tr>
    <tr>
        <td>Распознать цвет на экране</td>
		<td colspan="2" align="center">super + c</td>
    </tr>
    <tr>
        <td>Включить/выключить панель (Waybar/Polybar)</td>
		<td colspan="2" align="center">super + b</td>
    </tr>
	<tr>
        <td>Открыть Firefox</td>
		<td colspan="2" align="center">super + shift + f</td>
    </tr>
	<tr>
        <td>Открыть VSCode</td>
		<td colspan="2" align="center">super + shift + c</td>
    </tr>
    <tr>
        <td>Открыть Telegram</td>
		<td colspan="2" align="center">super + shift + t</td>
    </tr>
    <tr>
        <td>Открыть OBS</td>
		<td colspan="2" align="center">super + shift + o</td>
    </tr>
    <tr>
        <td>Регулировка звука</td>
		<td colspan="2" align="center">По умолчанию как на вашем устройстве</td>
    </tr>
    <tr>
        <td>Регулировка яркости</td>
		<td colspan="2" align="center">По умолчанию как на вашем устройстве</td>
    </tr>
    <tr>
        <td>Управление музыкой</td>
		<td colspan="2" align="center">По умолчанию как на вашем устройстве</td>
    </tr>
    <tr>
        <td>Убить оконный менеджер</td>
		<td colspan="2" align="center">super + delete</td>
    </tr>
    <tr>
        <td>Перезапустить оконный менеджер</td>
		<td colspan="2" align="center">ctrl + shift + r</td>
    </tr>
    <tr>
        <td>Закрыть активное окно</td>
		<td colspan="2" align="center">super + q</td>
    </tr>
    <tr>
        <td>Перевести активное окно в плавающий режим</td>
		<td colspan="2" align="center">super + space</td>
    </tr>
    <tr>
        <td>Перевести активное окно в полноразмерный режим</td>
		<td colspan="2" align="center">alt + enter</td>
    </tr>
    <tr>
        <td>Поменять фокус на другое окно</td>
		<td colspan="2" align="center">super + right/left/up/down</td>
    </tr>
    <tr>
        <td>Переключиться на другую рабочую область</td>
		<td colspan="2" align="center">super + 1-10</td>
    </tr>
    <tr>
        <td>Переключиться на предыдущую/следующую рабочую область</td>
		<td colspan="2" align="center">super + ctrl + left/right</td>
    </tr>
    <tr>
        <td>Переключиться на первую свободную рабочую область</td>
		<td colspan="2" align="center">super + ctrl + down</td>
    </tr>
    <tr>
        <td>Переключиться на другую рабочую область с помощью колесика</td>
		<td colspan="2" align="center">super + scroll</td>
    </tr>
    <tr>
        <td>Перенести активное окно на другую рабочую область</td>
		<td colspan="2" align="center">super + shift + 1-10</td>
    </tr>
    <tr>
        <td>Изменить размер окна с клавиатуры</td>
		<td colspan="2" align="center">super + shift + right/left/up/down</td>
    </tr>
    <tr>
        <td>Изменить размер окна с мышки</td>
		<td colspan="2" align="center">super + right_mouse_btn</td>
    </tr>
    <tr>
        <td>Переместить окно на текщем рабочем столе клавиатурой</td>
		<td colspan="2" align="center">super + shift + ctrl + right/left/up/down</td>
    </tr>
    <tr>
        <td>Переместить окно на текщем рабочем столе мышкой</td>
		<td colspan="2" align="center">super + left_mouse_btn</td>
    </tr>
    <tr>
        <td>Переключиться на скрытую рабочую область</td>
		<td>super + s</td>
		<td>N/A</td>
    </tr>
    <tr>
        <td>Перенести окно на скрытую рабочую область / обратно</td>
		<td>super + alt + s</td>
		<td>N/A</td>
    </tr>
</table>