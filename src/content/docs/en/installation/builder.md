---
title: Builder Description Work
description: ...
---

# Preinstallation (install.sh)
Running `install.sh` starts installing packages (python and python-pip) needed for the main part of the builder to work correctly.
Next, the python libraries needed for both the builder and the system are installed.

These include:
- inquirer
- loguru
- psutil
- gputil
- pyamdgpuinfo
- pyyaml
- pillow

After that the main part of the builder finally starts.

# A bit about the packages to be installed
In the `Builder` folder you can find the `packages.py` file, which contains all the packages to be installed. 

This file contains instances of the Packages class, which can have two attributes (pacman and aur). \
Inside them is an instance of the `DistributionPackages` class, which contains three attributes: 
- `common` - packages to be installed for all window managers.
- `hyprland_packages` - packages that are required for Hyprland only.
- `bspwm_packages` - packages that are required for bspwm only.

The BASE constant contains the base packages that are required for the system to work correctly. \
The CUSTOM constant contains a dictionary with “categories” of packages. At the moment there are only games and social networks. \
There is also a DRIVERS constant, which contains packages of necessary drivers for each vendor.

# Beginning of installation
We start collecting answers from the user, based on which we will start installing the system components.

There are two types of questions:
- Single-answer{\.
  Simply press Enter to select the desired option.
- Multiple Choice \.
  This type of question allows you to select more than one answer. You must press the space bar. You must press Enter to finalize your choice. 

Questions:
- `1) Should I enable the multilib repository?
  multilib is an official repository that allows the user to run and build 32-bit applications on a 64-bit version of Arch Linux. \
  **Recommend accepting this setting.
- ``2) Update Arch DataBase?
  This option prompts you to update the package database. \
  **Recommend accepting this setting.
- ``3) Install game dependencies?
  This option offers to install packages related to games and their optimization. \
  For more details about the packages to be installed, please refer to [this](https://github.com/meowrch/meowrch/blob/main/Builder/packages.py) file.
- ``4) Install social-media dependencies?
  This option prompts you to install social-media dependencies. \
  You can find more information about the packages to install in [this](https://github.com/meowrch/meowrch/blob/main/Builder/packages.py) file.
- `5) What drivers do you want to install?

  This option prompts you to select the vendor of the video card and processor for which you want to install drivers. In most cases, the vendor is detected and selected automatically. \
   You can learn more about installable packages in [this](https://github.com/meowrch/meowrch/blob/main/Builder/packages.py) file.

:::caution[Important to Know]
This page has not been completed. 
:::