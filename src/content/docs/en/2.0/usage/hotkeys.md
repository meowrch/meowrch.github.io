---
title: Hotkeys
description: ...
slug: en/2.0/usage/hotkeys
---

# Hyprland
The hotkey configuration in Hyprland is located at the path `~/.config/hypr/keybindings.conf`.

### Syntax:
```ini
bind=MODIFICATOR,KEYBINDING,DISPATCHER,PARAMETERS
```

Where MODIFICATOR can be one of the following values: `super`, `alt`, `control`, `shift`, `meta`. KEY is the symbol for the key you want. DISPETCHER indicates the action that will be performed when you press the keyboard shortcut.

#### Examples of usage:
```ini
# This command will open the kitty terminal when the Super + T shortcut is pressed.
bind=SUPER,T,exec,kitty

# You can also bind mouse buttons by adding a pre-code to the mouse key code: mouse:, for example:
bind=SUPER,mouse:272,exec,firefox
```

You can refer to the official Hyprland documentation [here](https://wiki.hyprland.org/configuring/binds/) for more details and examples.


# bspwm 
The hotkey configuration is located at the path `~/.config/bspwm/sxhkdrc`.

Each line in the file is interpreted as follows: \
    If a line starts with #, it is ignored. \
    If a line starts with whitespace characters, it is read as a command to run. \
    Otherwise, the string is read as a keyboard shortcut: key names separated by a space or + character. \

### Syntax:
```text
[MODIFIER + ]*[@]CHARACTER
    COMMAND
```

Where MODIFICATOR can have one of the following values: super, hyper, meta, alt, control, ctrl, shift, mode_switch, lock, mod1, mod2, mod3, mod4, mod5. If you add @ before the key symbol, the command will be executed when the key is released, not immediately when it is pressed. You can find out the SYMBOL of the key you need by using the xev command.

To track mouse buttons, you can use special key codes button1, button2, button3, ..., button24. You can also specify several key codes at once as a sequence {SIMBOL_1,...,SIMBOL_N} and add to the command a sequence of strings (in curly brackets and separated by commas) of the same length - then the sequence element that corresponds to the specified key code in the order you specified will be substituted into the command. If you need to add regular curly braces to a command, escape them with a backslash so that they do not conflict with the sequence syntax: for example, if you want to add the awk command '{print $1}', write it as awk '\{print $1\}'. You can also specify the sequence as an A-Z range, where A and Z are a letter or a number.

### Examples of usage:
```text
### Emulate Alt_R+F1 when left mouse button is pressed
button1
    xte “keydown Alt_R” “keydown F1” “keyup Alt_R” “keyup F1”

# When the middle mouse button is pressed, wait 3 seconds and emulate pressing Alt_R+F2
button2
    xte “sleep 3” “keydown Alt_R” “keydown F2” “keyup Alt_R” “keyup F2”
```

For more information and examples, you can refer to the official sxhkd repository [here](https://github.com/baskerville/sxhkd), or the documentation provided on the [Arch Wiki](https://wiki.archlinux.org/title/Sxhkd_(%D0%A0%D1%83%D1%D1%81%D1%81%D0%BA%D0%B8%D0%B9)).

# Meowrch Binds
<table align="center">
	<tr>
		<td colspan="3" align="center">Key combinations</td>
	</tr>
    <tr>
        <th>Name of action</th>
        <th>Hyprland</th>
		<th>Bspwm</th>
    </tr>
	<tr>
        <td>Open terminal</td>
		<td colspan="2" align="center">super + enter</td>
    </tr>
    <tr>
        <td>Open the file manager</td>
		<td colspan="2" align="center">super + e</td>
    </tr>
    <tr>
        <td>Open Task Manager (btop)</td>
		<td colspan="2" align="center">ctrl + shift + esc</td>
    </tr>
    <tr>
        <td>Change the wallpaper</td>
		<td colspan="2" align="center">super + w</td>
    </tr>
	<tr>
        <td>Change the subject</td>
		<td colspan="2" align="center">super + t</td>
    </tr>
    <tr>
        <td>Take a screenshot</td>
		<td colspan="2" align="center">PrintScreen</td>
    </tr>
    <tr>
        <td>Mixer (Pavucontrol)</td>
		<td colspan="2" align="center">super + p</td>
    </tr>
    <tr>
        <td>Clipboard</td>
		<td colspan="2" align="center">super + v3</td>
    </tr>
    <tr>
        <td>Open the application menu</td>
		<td colspan="2" align="center">super + d</td>
    </tr>
    <tr>
        <td>Open memoji selection</td>
		<td colspan="2" align="center">super + .</td>
    </tr>
    <tr>
        <td>Open the power on/off menu of the computer</td>
		<td colspan="2" align="center">super + x</td>
    </tr>
    <tr>
        <td>Lock the screen</td>
        <td colspan="2" align="center">super + l</td>
    </tr>
    <tr>
        <td>Recognize the color on the screen</td>
		<td colspan="2" align="center">super + c</td>
    </tr>
    <tr>
        <td>Enable/disable a panel (Waybar/Polybar)</td>
		<td colspan="2" align="center">super + b</td>
    </tr>
	<tr>
        <td>Open Firefox</td>
		<td colspan="2" align="center">super + shift + f</td>
    </tr>
	<tr>
        <td>Open VSCode</td>
		<td colspan="2" align="center">super + shift + c</td>
    </tr>
    <tr>
        <td>Open Telegram</td>
		<td colspan="2" align="center">super + shift + t</td>
    </tr>
    <tr>
        <td>Open OBS</td>
		<td colspan="2" align="center">super + shift + o</td>
    </tr>
    <tr>
        <td>Sound adjustment</td>
		<td colspan="2" align="center">Default as on your device</td>
    </tr>
    <tr>
        <td>Brightness control</td>
		<td colspan="2" align="center">Default as on your device</td>
    </tr>
    <tr>
        <td>Music control</td>
		<td colspan="2" align="center">Default as on your device</td>
    </tr>
    <tr>
        <td>Kill the window manager</td>
		<td colspan="2" align="center">super + delete</td>
    </tr>
    <tr>
        <td>Restart the window manager</td>
		<td colspan="2" align="center">ctrl + shift + r</td>
    </tr>
    <tr>
        <td>Close the active window</td>
		<td colspan="2" align="center">super + q</td>
    </tr>
    <tr>
        <td>Switch the active window to floating mode</td>
		<td colspan="2" align="center">super + space</td>
    </tr>
    <tr>
        <td>Switch the active window to full-size mode</td>
		<td colspan="2" align="center">alt + enter</td>
    </tr>
    <tr>
        <td>Change focus to another window</td>
		<td colspan="2" align="center">super + right/left/up/down</td>
    </tr>
    <tr>
        <td>Switch to another workspace</td>
		<td colspan="2" align="center">super + 1-10</td>
    </tr>
    <tr>
        <td>Switch to the previous/next workspace</td>
		<td colspan="2" align="center">super + ctrl + left/right</td>
    </tr>
    <tr>
        <td>Switch to the first free workspace</td>
		<td colspan="2" align="center">super + ctrl + down</td>
    </tr>
    <tr>
        <td>Switch to a different workspace using the click wheel</td>
		<td colspan="2" align="center">super + scroll</td>
    </tr>
    <tr>
        <td>Move the active window to another workspace</td>
		<td colspan="2" align="center">super + shift + 1-10</td>
    </tr>
    <tr>
        <td>Resize the window using the keyboard</td>
		<td colspan="2" align="center">super + shift + right/left/up/down</td>
    </tr>
    <tr>
        <td>Resize the window from the mouse</td>
		<td colspan="2" align="center">super + right_mouse_btn</td>
    </tr>
    <tr>
        <td>Move the window on the current desktop with the keyboard</td>
		<td colspan="2" align="center">super + shift + ctrl + right/left/up/down</td>
    </tr>
    <tr>
        <td>Move the window on the current desktop with the mouse</td>
		<td colspan="2" align="center">super + left_mouse_btn</td>
    </tr>
    <tr>
        <td>Switch to the hidden workspace</td>
		<td>super + s</td>
		<td>N/A</td>
    </tr>
    <tr>
        <td>Move window to / from hidden workspace</td>
		<td>super + alt + s</td>
		<td>N/A</td>
    </tr>
</table>