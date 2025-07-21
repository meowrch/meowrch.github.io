---
title: Customizing
description: ...
---

# Edit configurations
As you already know, **meowrch** provides a **themes** system. It is important to note that if you make changes to the utilities configuration via the default paths (e.g. `~/.config/waybar/` | `~/.config/kitty/` | `~/.config/cava/`) - your settings may be lost when you change themes.

To keep your configuration changes even when you change themes, you need to edit the configuration file in the `.config/meowrch/themes/<theme_name>/` directory.

# Wallpapers
To add your own wallpapers to the meowrch system, you need to make changes to the configuration file `.config/meowrch/config.yaml`.

To do this, open the `.config/meowrch/config.yaml` file and:
- If you want to add wallpapers to all themes, then:
	Find the **custom-wallpapers** section and add the paths to your wallpapers. Example configuration:
	```yaml
	custom-wallpapers:
		- <path_to_wallpapers_which_will_be_in_all_themes>
		- <path_to_wallpapers_which_will_be_in_all_themes>
	```
- If you need to add wallpapers for a specific theme, then:
	Locate or create a **available_wallpapers** section in the section with the theme, and then list the wallpapers. Example:
	```yaml
	themes:
		<theme_name>:
			available_wallpapers:
				- <path_to_wallpapers_for_the_current_theme>.
				- <way_to_wallpapers_for_the_current_theme>
				- <way_to_wallpaper_for_the_current_theme>.
	```

> [!IMPORTANT]
> Use the “*” mask in paths to specify all png and jpg images from your folder. For example:
> `.config/meowrch/wallpapers/my-wallpapers/*`.

Your wallpapers will then be available for all themes.

# How to create your own theme
You can also create your own theme. To do this, simply copy one of the standard themes (e.g. `.config/meowrch/themes/catppuccin-mocha`), place it in the path `.config/meowrch/themes/` and give the new folder a unique name. You will then be able to make changes to all available configurations of your new theme.

> [!WARNING]
> Only existing configurations can be modified. You should not change their name, as they will simply not be detected.
> Adding extraneous files will not affect the theme in any way. They will be ignored.

The next step is to add your theme to the list of available themes. This can be done by editing the `.config/meowrch/config.yaml` file. \
The sample format for adding a new theme is as follows:
```yaml
themes:
	<theme_name>:
		available_wallpapers:
			- <path_to_wallpapers_for_the_current_theme>.
			- <way_to_wallpapers_for_the_current_theme>
			- <way_to_wallpaper_for_the_current_theme>.
```