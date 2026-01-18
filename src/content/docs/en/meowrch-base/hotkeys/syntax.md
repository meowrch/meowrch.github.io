---
title: Syntax
description: Guide to hotkey syntax in various WM
sidebar:
  order: 1
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
