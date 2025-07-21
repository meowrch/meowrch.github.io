---
title: Tips for optimizing the system
description: ...
---

# System boot
To find out which process is slowing down your system startup the most, run the `systemd-analyze blame` command

Let me guess, NetworkManager-wait-online has turned out to be a traitor and is taking ~4 seconds off your system startup? No problem. You can just disable it)
```bash
sudo systemctl mask NetworkManager-wait-online.service
```

# Speeding up initramfs unpacking
Is the initial boot environment that completes the Linux kernel image, including all the necessary modules and utilities to boot it, especially for mounting the root partition. To save space, it is presented as a self-extracting archive that is unpacked at boot time. In Arch Linux, the mkinitcpio utility creates initramfs and by default uses the zstd compression algorithm, which is optimal for speed. However, to speed up boot time, it is better to use the lz4 algorithm, which provides faster decompression. 

To set lz4 as the compression algorithm for initramfs, you need to edit the /etc/mkinitcpio.conf file by adding the following lines:
```ini
COMPRESSION="lz4"
COMPRESSION_OPTIONS=(-9)
```

Additionally, you can speed up boot by replacing the base and udev hooks with systemd in the same config file. This will increase the size of initramfs, but may reduce boot time by a few seconds:
```ini
HOOKS=(systemd autodetect microcode modconf kms keyboard sd-vconsole block filesystems fsck)
```

> [!WARNING]
> For systems with an encrypted root partition, you should also add sd-encrypt with a space immediately after the sd-vconsole hook to the list of hooks provided.

After making the changes, update the initramfs images with the command:
```bash
sudo mkinitcpio -P
```


# Compilation flags
Compilation flags are pointers for the compiler on what instructions and optimizations to use when building programs. 

To optimize the build process, we can change them by creating a custom `~/.makepkg.conf` config in the home directory to override system settings:
```ini
CFLAGS="-march=native -mtune=native -O2 -pipe -fno-plt -fexceptions \
      -Wp,-D_FORTIFY_SOURCE=3 -Wformat -Werror=format-security \
      -fstack-clash-protection -fcf-protection"
CXXFLAGS="$CFLAGS -Wp,-D_GLIBCXX_ASSERTIONS"
RUSTFLAGS="-C opt-level=3 -C target-cpu=native -C link-arg=-z -C link-arg=pack-relative-relocs"
MAKEFLAGS="-j$(nproc) -l$(nproc)"
```

> [!WARNING]
> These compiler flags maximize compilation performance, but may cause build errors in very rare applications. If this happens, disable the 'lto' parameter in the options line by adding an exclamation mark character in front of it ! (“!lto”).

# Ccache
Linux has programs that can take more than two hours to build, and ccache can be used to speed up the recompilation of applications such as Wine or Proton-GE.

Ccache is a cache for C/C++ compilers, compatible with GCC and Clang, that speeds up recompilation of the same code. If identical blocks of source code are found when building a new version of a program, ccache uses already compiled code from the cache, which greatly speeds up the compilation process.

To install it, run the following commands:
```
sudo pacman -S ccache
```

After installation, it still needs to be activated in your makepkg settings. To do this, edit the `~/.makepkg.conf` configuration file by adding the following configurations:
```ini
BUILDENV=(!distcc color ccache check !sign)
```

> [!WARNING]
> ccache can break the build of some programs, so be careful with its use.


# TRIM 
This is a command used in solid state drives (SSDs) that allows the operating system to tell the drive which data blocks are no longer needed and can be cleared. This helps maintain SSD performance by preventing the SSD from slowing down when writing data.

To enable it, run the following commands:
```
sudo systemctl enable fstrim.timer
sudo fstrim -v /
```

> [!WARNING]
> If you use the Btrfs file system and have kernel version 6.2 or higher, you do not need to enable the service to periodically execute the TRIM command, because Btrfs itself executes it asynchronously.

# OOM
Out-Of-Memory Killer (OOM) is a Linux process that terminates an application to save the kernel from crashing. It sacrifices the application to keep the OS running.

To enable it, run the command:
```bash
sudo systemctl enable --now systemd-oomd
```


# Ananicy CPP
[Ananicy](https://github.com/Nefelim4ag/Ananicy) is a task prioritization daemon, and installing it greatly improves system responsiveness.

But we will install its fork, namely [Ananicy CPP](https://gitlab.com/ananicy-cpp/ananicy-cpp).
Unlike the original Ananicy, this fork is rewritten entirely in C++, which results in a speed boost.

To install it, run the following commands:
```bash
git clone https://aur.archlinux.org/ananicy-cpp.git
cd ananicy-cpp  
makepkg -sric 
sudo systemctl enable --now ananicy-cpp
```

I would also advise you to set up additional rules for re-prioritizing processes
```bash
git clone https://aur.archlinux.org/cachyos-ananicy-rules-git.git
cd cachyos-ananicy-rules-git
makepkg -sric
sudo systemctl restart ananicy-cpp
```

# Haveged
I can also recommend the package [Haveged](https://wiki.archlinux.org/title/Haveged_(%D0%A0%D1%83%D1%81%D1%81%D0%BA%D0%B8%D0%B9)).
This is a daemon that monitors the entropy of the system. It is needed to speed up system startup at high systemd-analyze blame (More than 1 second).

To install it, run the following commands:
```bash
sudo pacman -S haveged 
sudo systemctl enable haveged
```

# Rng-tools
[Rng-tools](https://wiki.archlinux.org/title/Rng-tools) - a daemon that also monitors system entropy, but, unlike haveged, via a hardware timer. It is needed to speed up system startup at high systemd-analyze blame (More than 1 second).

To install it, run the following commands:
```bash
sudo pacman -S rng-tools
sudo systemctl enable --now rngd
```

> [!WARNING]
> Not to be used in conjunction with Ananicy CPP

# Cpu Power
By default, the processor dynamically changes its frequency, which is basically correct and gives a balance between power saving and performance, but if you still want to squeeze all the juice, you need to fix the maximum performance mode.

To set it, run the following commands:
```bash
sudo pacman -S cpupower
sudo cpupower frequency-set -g performance
```

Set up the cpupower configuration

```bash
sudo nano /etc/default/cpupower
```

Edit the `governor='performance'` line and enable the service
```bash
sudo systemctl enable cpupower
```

# Auto CpuFreq
This is a utility for Linux designed to automatically optimize CPU speed and power consumption. It actively monitors battery status, CPU utilization, temperature and overall system load, allowing you to dynamically switch between power saving and high performance modes. Is probably the best option.

To install it, run the following commands:
```bash
yay -S auto-cpufreq
sudo systemctl enable --now auto-cpufreq
```

# Optimizing kernel loading
You can change the kernel boot parameters in GRUB a bit, change the following line in `/etc/default/grub` adding the following parameters to your own:
```ini
GRUB_CMDLINE_LINUX_DEFAULT="... loglevel=2 nowatchdog split_lock_detect=off processor.ignore_ppc=1 migrations=off msr.allow_writes=on pcie_aspm=force module.sig_unenforce cryptomgr.notests initcall_debug no_timer_check noreplace-smp page_alloc.shuffle=1 rcupdate.rcu_expedited=1 tsc=reliable ..."
```
And finally update grub 
```bash
sudo grub-mkconfig -o /boot/grub/grub.cfg
```

> [!WARNING]
> Changes to kernel boot parameters in GRUB can affect security and overall system behavior. Do so at your own risk.
>
> Impact on safety
>    Disabling safety mechanisms:
>        Parameters such as nowatchdog and `split_lock_detect=off` can reduce the level of protection against hangs and conflicts, which could potentially be used by attackers to attack the system.
>       For example, disabling `watchdog` can allow a system to hang without automatically rebooting, allowing attackers to gain access to the system.
>    Ignoring certain checks:
>        The `module.sig_unenforce` parameter disables kernel module signature checking, which allows unsigned modules to be loaded. This can be risky, as unsigned modules may contain malicious code.
>
>    Simplifying access to the system:
>        Disabling parameters such as `rcupdate.rcu_expedited=1` can result in less efficient processing in multi-threaded environments, which can also be used for attack.
>
>Impact on productivity
>   Optimization of system performance:
>        Parameters such as `pcie_aspm=force` and `page_alloc.shuffle=1` can improve system performance and power management, which is especially important for mobile devices.
>    Improved stability:
>        Settings like `tsc=reliable` help provide more accurate time synchronization on multi-core systems, which can improve application stability.
> Process Management:
>        Disabling process migration with `migrations=off` can improve performance in some scenarios, but can also lead to worse load balancing between cores

# You want more?
I suggest you visit [this repo](https://github.com/ventureoo/ARU). 
It contains all the ways to optimize Arch linux.