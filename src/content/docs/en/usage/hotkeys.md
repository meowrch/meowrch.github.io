---
title: Hotkeys
description: Complete guide to hotkeys in Meowrch
---

# Hyprland
Hyprland hotkey configuration is located at `~/.config/hypr/keybindings.conf`.

### Syntax:
```ini
bind=MODIFIER,KEY,DISPATCHER,PARAMS
```

Where MODIFIER can be one of the following values: `super`, `alt`, `control`, `shift`, `meta`. KEY is the symbol of the desired key. DISPATCHER specifies the action that will be performed when the key combination is pressed.

### Usage examples:
```ini
# This command will open kitty terminal when Super + T is pressed.
bind=SUPER,T,exec,kitty

# You can also bind mouse buttons by adding a prefix to the mouse key code: mouse:, for example:
bind=SUPER,mouse:272,exec,firefox
```

For more detailed information and examples, you can refer to the official Hyprland documentation [here](https://wiki.hyprland.org/configuring/binds/).

# bspwm 
Hotkey configuration is located at `~/.config/bspwm/sxhkdrc`.

Each line in the file is interpreted as follows: \
    If a line starts with #, it is ignored. \
    If a line starts with whitespace, it is read as a command to run. \
    Otherwise, the line is read as a key combination: key names separated by space or + symbol. \

### Syntax:
```text
[MODIFIER + ]*[@]SYMBOL
    COMMAND
```

Where MODIFIER can have one of the following values: super, hyper, meta, alt, control, ctrl, shift, mode_switch, lock, mod1, mod2, mod3, mod4, mod5. If you add @ before the key symbol, the command will be executed when the key is released, not immediately when pressed. You can find out the SYMBOL of the desired key using the xev command.

For tracking mouse buttons, you can use special key codes button1, button2, button3, ..., button24. You can also set multiple key codes as a sequence {SYMBOL_1,...,SYMBOL_N} and add to the command a sequence of strings (in curly brackets and separated by commas) of the same length — then the command will substitute the element of the sequence that corresponds to the given key code in the order you specified. If you need to add regular curly brackets to the command, so they don't conflict with sequence syntax, escape them with a backslash: for example, if you want to add the command awk '{print $1}', write it as awk '\{print $1\}'. You can also set a sequence as a range A-Z, where A and Z are a letter or digit.

### Usage examples:
```text
# On left mouse button press, emulate Alt_R+F1 press
button1
    xte "keydown Alt_R" "keydown F1" "keyup Alt_R" "keyup F1"

# On middle mouse button press, wait 3 seconds and emulate Alt_R+F2 press
button2
    xte "sleep 3" "keydown Alt_R" "keydown F2" "keyup Alt_R" "keyup F2"
```

For more detailed information and examples, you can refer to the official sxhkd repository [here](https://github.com/baskerville/sxhkd), or the documentation presented on [Arch Wiki](https://wiki.archlinux.org/title/Sxhkd).

# Meowrch Hotkeys

## System Shortcuts
<table align="center">
    <tr>
        <th>Action</th>
        <th>Hyprland</th>
		<th>Bspwm</th>
    </tr>
	<tr>
        <td>Open terminal</td>
		<td colspan="2" align="center">super + enter</td>
    </tr>
    <tr>
        <td>Open file manager</td>
		<td colspan="2" align="center">super + e</td>
    </tr>
	<tr>
        <td>Open application menu</td>
		<td colspan="2" align="center">super + d</td>
    </tr>
     <tr>
        <td>Open power menu</td>
		<td colspan="2" align="center">super + x</td>
    </tr>
	<tr>
        <td>Open emoji picker</td>
		<td colspan="2" align="center">super + .</td>
    </tr>
	<tr>
        <td>Take a screenshot</td>
		<td colspan="2" align="center">PrintScreen</td>
    </tr>
	<tr>
        <td>Take a full screenshot</td>
		<td colspan="2" align="center">super + PrintScreen</td>
    </tr>
	<tr>
        <td>Change wallpaper</td>
		<td colspan="2" align="center">super + w</td>
    </tr>
	<tr>
        <td>Change theme</td>
		<td colspan="2" align="center">super + t</td>
    </tr>
	<tr>
        <td>Switch keyboard layout</td>
		<td colspan="2" align="center">alt + shift</td>
    </tr>
     <tr>
        <td>Pick color from screen</td>
		<td colspan="2" align="center">super + c</td>
    </tr>
     <tr>
        <td>Lock screen</td>
        <td colspan="2" align="center">super + l</td>
    </tr>
	<tr>
        <td>Open task manager (btop)</td>
		<td colspan="2" align="center">ctrl + shift + esc</td>
    </tr>
	<tr>
        <td>Pin window</td>
		<td colspan="2" align="center">super + p</td>
    </tr>
	<tr>
        <td>Clipboard manager</td>
		<td colspan="2" align="center">super + v</td>
    </tr>
	<tr>
        <td>Toggle bar</td>
		<td colspan="2" align="center">super + b</td>
    </tr>
	<tr>
        <td>Switch bar to mewline/waybar</td>
		<td>super + shift + b</td>
		<td>N/A</td>
    </tr>
</table>

## Window and Workspace Management
<table align="center">
    <tr>
        <th>Action</th>
        <th>Hyprland</th>
		<th>Bspwm</th>
    </tr>
	<tr>
        <td>Switch to another workspace</td>
		<td>super + 1-9</td>
		<td>super + 1-9</td>
    </tr>
	<tr>
        <td>Switch to next workspace</td>
		<td>super + ctrl + right</td>
		<td>super + ctrl + right</td>
    </tr>
	<tr>
        <td>Switch to previous workspace</td>
		<td>super + ctrl + left</td>
		<td>super + ctrl + left</td>
    </tr>
	<tr>
        <td>Switch to first empty workspace</td>
		<td>super + ctrl + down</td>
		<td>super + ctrl + down</td>
    </tr>
	<tr>
        <td>Scroll workspaces forward</td>
		<td>super + mouse_down</td>
		<td>super + mouse_down</td>
    </tr>
	<tr>
        <td>Scroll workspaces backward</td>
		<td>super + mouse_up</td>
		<td>super + mouse_up</td>
    </tr>
	<tr>
        <td>Switch to special workspace</td>
		<td>super + s</td>
		<td>N/A</td>
    </tr>
     <tr>
        <td>Move active window to another workspace</td>
		<td>super + shift + 1-9</td>
		<td>super + shift + 1-9</td>
    </tr>
     <tr>
        <td>Toggle active window to floating mode</td>
		<td colspan="2" align="center">super + space</td>
    </tr>
	<tr>
        <td>Toggle active window to fullscreen mode</td>
		<td colspan="2" align="center">alt + enter</td>
    </tr>
    <tr>
        <td>Close active window</td>
		<td colspan="2" align="center">super + q</td>
    </tr>
    <tr>
        <td>Kill active window</td>
		<td colspan="2" align="center">super + k</td>
    </tr>
     <tr>
        <td>Move window focus</td>
		<td colspan="2" align="center">super + arrow keys</td>
    </tr>
	<tr>
        <td>Resize window</td>
		<td colspan="2" align="center">super + shift + arrow keys</td>
    </tr>
	<tr>
        <td>Move window</td>
		<td colspan="2" align="center">super + shift + ctrl + arrow keys</td>
    </tr>
</table>

## Launch Applications
<table align="center">
    <tr>
        <th>Action</th>
        <th>Hyprland</th>
		<th>Bspwm</th>
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
        <td>Open Obsidian</td>
		<td colspan="2" align="center">super + shift + o</td>
    </tr>
	<tr>
        <td>Open pavucontrol</td>
		<td colspan="2" align="center">super + shift + p</td>
    </tr>
</table>

## System Control
<table align="center">
    <tr>
        <th>Action</th>
        <th>Hyprland</th>
		<th>Bspwm</th>
    </tr>
	<tr>
        <td>Exit session</td>
		<td colspan="2" align="center">super + delete</td>
    </tr>
    <tr>
        <td>Restart window manager</td>
		<td colspan="2" align="center">ctrl + shift + r</td>
    </tr>
	<tr>
        <td>Disable/Enable hotkey tracking</td>
		<td colspan="2" align="center">super + escape</td>
    </tr>
</table>