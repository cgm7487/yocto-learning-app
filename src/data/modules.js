const modules = [
  {
    id: 'introduction',
    title: 'Introduction to Yocto',
    description: 'Learn what the Yocto Project is, its history, and why it matters for embedded Linux development.',
    icon: '📖',
    lessons: [
      {
        id: 'what-is-yocto',
        title: 'What is the Yocto Project?',
        content: `
# What is the Yocto Project?

The **Yocto Project** is an open-source collaboration project that provides templates, tools, and methods to help you create custom Linux-based systems for embedded and IoT products, regardless of the hardware architecture.

## Key Points

- It is **not** a Linux distribution — it creates a custom one for you
- Hosted by the **Linux Foundation**
- Started in 2010, combining several existing projects
- Used by major companies like Intel, AMD, Texas Instruments, and many others

## What Yocto Provides

1. **Poky** — the reference build system (includes BitBake + OpenEmbedded-Core)
2. **BitBake** — the task execution engine (similar to Make but more powerful)
3. **OpenEmbedded-Core (OE-Core)** — the core set of metadata (recipes and classes)
4. **Board Support Packages (BSPs)** — hardware-specific configurations
5. **Documentation** — comprehensive guides and manuals

## Why Use Yocto?

| Benefit | Description |
|---------|-------------|
| **Customization** | Build exactly what you need — no bloat |
| **Reproducibility** | Same inputs always produce the same outputs |
| **Cross-platform** | Supports ARM, x86, MIPS, PowerPC, and more |
| **Industry standard** | Widely adopted in automotive, industrial, and consumer electronics |
| **Community** | Large ecosystem of layers and recipes |

## The Build Process at a Glance

\`\`\`
Source Code + Metadata (Recipes) → BitBake → Custom Linux Image
\`\`\`

Yocto takes your configuration, fetches source code, patches it, compiles it, and packages everything into a bootable Linux image tailored to your target hardware.
        `,
        quiz: [
          {
            question: 'What is the Yocto Project?',
            options: [
              'A Linux distribution',
              'A tool to create custom Linux-based systems',
              'A hardware manufacturer',
              'A programming language',
            ],
            correct: 1,
            explanation: 'The Yocto Project is not a distribution itself — it provides tools and templates to create custom Linux-based systems for embedded products.',
          },
          {
            question: 'What is BitBake?',
            options: [
              'A web framework',
              'A Linux kernel module',
              'The task execution engine used by Yocto',
              'A package manager like apt',
            ],
            correct: 2,
            explanation: 'BitBake is the task execution engine at the heart of the Yocto build system. It processes recipes and executes build tasks.',
          },
          {
            question: 'Which organization hosts the Yocto Project?',
            options: [
              'Apache Foundation',
              'Linux Foundation',
              'Mozilla Foundation',
              'Free Software Foundation',
            ],
            correct: 1,
            explanation: 'The Yocto Project is hosted by the Linux Foundation.',
          },
        ],
      },
      {
        id: 'yocto-terminology',
        title: 'Core Terminology',
        content: `
# Yocto Core Terminology

Before diving deeper, let's understand the key terms you'll encounter throughout your Yocto journey.

## Essential Terms

### Poky
The **reference distribution** of the Yocto Project. It includes:
- BitBake (the build engine)
- OpenEmbedded-Core (metadata)
- meta-poky (the distribution configuration)
- meta-yocto-bsp (reference BSP)

### Recipe (.bb files)
A **recipe** is a set of instructions for building a particular piece of software. It tells BitBake:
- Where to fetch the source code
- How to configure and compile it
- How to package the results

\`\`\`bash
# Example: A simple recipe filename
myapp_1.0.bb
\`\`\`

### Layer
A **layer** is a collection of related recipes, configurations, and classes. Layers allow modular customization.

\`\`\`
meta-mylayer/
├── conf/
│   └── layer.conf
├── recipes-core/
│   └── myapp/
│       └── myapp_1.0.bb
└── README
\`\`\`

### Machine
A **machine** defines the target hardware. It specifies things like:
- Architecture (ARM, x86, etc.)
- Kernel configuration
- Boot loader settings

### Distro (Distribution)
A **distro** configuration defines the software policies:
- Which init system to use (systemd, sysvinit)
- Package format (rpm, deb, ipk)
- Feature selections

### Image
An **image** is the final output — a complete root filesystem ready to be flashed onto your target device.

### Class (.bbclass files)
**Classes** provide reusable build logic that recipes can inherit. Examples:
- \`autotools.bbclass\` — for Autotools-based projects
- \`cmake.bbclass\` — for CMake-based projects

### Append Files (.bbappend)
**Append files** let you modify existing recipes without editing the original. They "append" changes to a recipe from another layer.

## File Extensions Quick Reference

| Extension | Purpose |
|-----------|---------|
| \`.bb\` | Recipe file |
| \`.bbappend\` | Recipe append file |
| \`.bbclass\` | Class file |
| \`.conf\` | Configuration file |
| \`.inc\` | Include file (shared recipe content) |
        `,
        quiz: [
          {
            question: 'What is a Yocto recipe (.bb file)?',
            options: [
              'A configuration file for the kernel',
              'Instructions for building a piece of software',
              'A hardware description',
              'A test script',
            ],
            correct: 1,
            explanation: 'A recipe (.bb file) contains instructions that tell BitBake how to fetch, configure, compile, and package a piece of software.',
          },
          {
            question: 'What is a Yocto layer?',
            options: [
              'A single recipe file',
              'A collection of related recipes and configurations',
              'A type of filesystem',
              'A hardware abstraction',
            ],
            correct: 1,
            explanation: 'A layer is a modular collection of related recipes, configurations, and classes that can be added to or removed from your build.',
          },
          {
            question: 'What file extension is used for recipe append files?',
            options: [
              '.bb',
              '.conf',
              '.bbappend',
              '.bbclass',
            ],
            correct: 2,
            explanation: '.bbappend files are used to modify existing recipes without changing the original recipe file.',
          },
        ],
      },
    ],
  },
  {
    id: 'build-system',
    title: 'The Build System',
    description: 'Understand how BitBake works, the build workflow, and how to configure your first build.',
    icon: '🔧',
    lessons: [
      {
        id: 'bitbake-basics',
        title: 'BitBake Fundamentals',
        content: `
# BitBake Fundamentals

**BitBake** is the task scheduler and execution engine at the core of the Yocto build system. Understanding BitBake is essential for working effectively with Yocto.

## How BitBake Works

1. **Parse** — Reads all recipes, classes, and configuration files
2. **Resolve** — Determines dependencies between tasks and recipes
3. **Execute** — Runs tasks in the correct order, parallelizing where possible

## BitBake Tasks

Every recipe goes through a standard set of tasks:

\`\`\`
do_fetch → do_unpack → do_patch → do_configure → do_compile → do_install → do_package
\`\`\`

| Task | Description |
|------|-------------|
| \`do_fetch\` | Downloads the source code |
| \`do_unpack\` | Extracts the source archive |
| \`do_patch\` | Applies any patches |
| \`do_configure\` | Runs configuration (e.g., ./configure) |
| \`do_compile\` | Compiles the source code |
| \`do_install\` | Installs files into a staging area |
| \`do_package\` | Creates packages (rpm, deb, ipk) |

## Common BitBake Commands

\`\`\`bash
# Build a specific recipe
bitbake myrecipe

# Build a complete image
bitbake core-image-minimal

# Run a specific task
bitbake myrecipe -c compile

# Show the recipe environment
bitbake myrecipe -e

# List all recipes
bitbake-layers show-recipes

# List all layers
bitbake-layers show-layers

# Clean a recipe (remove build artifacts)
bitbake myrecipe -c cleansstate
\`\`\`

## The Shared State Cache (sstate)

BitBake uses a **shared state cache** to avoid rebuilding unchanged components. If the inputs to a task haven't changed, BitBake reuses the cached output.

This is one of the most powerful features of the build system:
- Dramatically speeds up rebuilds
- Can be shared across machines
- Enables reproducible builds
        `,
        quiz: [
          {
            question: 'What is the correct order of BitBake tasks?',
            options: [
              'compile → fetch → install → package',
              'fetch → unpack → patch → configure → compile → install → package',
              'configure → compile → fetch → package',
              'fetch → compile → configure → install',
            ],
            correct: 1,
            explanation: 'BitBake follows the order: fetch → unpack → patch → configure → compile → install → package.',
          },
          {
            question: 'What does the shared state cache (sstate) do?',
            options: [
              'Stores user preferences',
              'Caches network requests',
              'Avoids rebuilding unchanged components',
              'Manages Git repositories',
            ],
            correct: 2,
            explanation: 'The shared state cache stores task outputs so that unchanged components don\'t need to be rebuilt, dramatically speeding up subsequent builds.',
          },
          {
            question: 'Which command builds a minimal Linux image?',
            options: [
              'bitbake linux-minimal',
              'make core-image',
              'bitbake core-image-minimal',
              'build-image minimal',
            ],
            correct: 2,
            explanation: 'The command "bitbake core-image-minimal" builds the minimal reference image provided by Yocto.',
          },
        ],
      },
      {
        id: 'build-configuration',
        title: 'Build Configuration',
        content: `
# Build Configuration

Setting up your build environment correctly is crucial. Let's walk through the key configuration files and settings.

## Setting Up the Build Environment

\`\`\`bash
# Clone the Poky repository
git clone git://git.yoctoproject.org/poky
cd poky

# Check out a release branch
git checkout -b my-build scarthgap

# Initialize the build environment
source oe-init-build-env
\`\`\`

After running \`oe-init-build-env\`, you'll be placed in the \`build/\` directory with two key configuration files.

## conf/local.conf

This is your **local build configuration**. Key variables:

\`\`\`bash
# Target machine (what hardware are you building for?)
MACHINE ?= "qemux86-64"

# Distribution
DISTRO ?= "poky"

# Package format
PACKAGE_CLASSES ?= "package_rpm"

# Number of parallel threads
BB_NUMBER_THREADS ?= "8"
PARALLEL_MAKE ?= "-j 8"

# Extra image features
EXTRA_IMAGE_FEATURES ?= "debug-tweaks"

# Download directory (where sources are cached)
DL_DIR ?= "${TOPDIR}/downloads"

# Shared state directory
SSTATE_DIR ?= "${TOPDIR}/sstate-cache"

# Temporary build directory
TMPDIR = "${TOPDIR}/tmp"
\`\`\`

## conf/bblayers.conf

This file lists the **layers** included in your build:

\`\`\`bash
BBLAYERS ?= " \\
  /path/to/poky/meta \\
  /path/to/poky/meta-poky \\
  /path/to/poky/meta-yocto-bsp \\
  /path/to/meta-mylayer \\
"
\`\`\`

## Common MACHINE Values

| Machine | Description |
|---------|-------------|
| \`qemux86-64\` | QEMU x86-64 emulator |
| \`qemux86\` | QEMU x86 emulator |
| \`qemuarm\` | QEMU ARM emulator |
| \`qemuarm64\` | QEMU ARM64 emulator |
| \`genericx86-64\` | Generic x86-64 hardware |
| \`beaglebone-yocto\` | BeagleBone board |

## Build Directory Structure

\`\`\`
build/
├── conf/
│   ├── local.conf          # Local configuration
│   └── bblayers.conf       # Layer configuration
├── tmp/
│   ├── deploy/
│   │   └── images/         # Output images
│   ├── work/               # Recipe build directories
│   └── sysroots/           # Cross-compilation sysroots
├── downloads/              # Downloaded source archives
└── sstate-cache/           # Shared state cache
\`\`\`
        `,
        quiz: [
          {
            question: 'Which file contains the target machine configuration?',
            options: [
              'bblayers.conf',
              'local.conf',
              'machine.conf',
              'bitbake.conf',
            ],
            correct: 1,
            explanation: 'The MACHINE variable is set in conf/local.conf to specify the target hardware for the build.',
          },
          {
            question: 'What command initializes the Yocto build environment?',
            options: [
              'make init',
              'yocto-init',
              'source oe-init-build-env',
              'bitbake init',
            ],
            correct: 2,
            explanation: 'Running "source oe-init-build-env" sets up the build environment and creates the build directory.',
          },
          {
            question: 'What is bblayers.conf used for?',
            options: [
              'Setting the target machine',
              'Listing the layers included in the build',
              'Configuring the Linux kernel',
              'Defining package dependencies',
            ],
            correct: 1,
            explanation: 'bblayers.conf lists all the metadata layers that BitBake should include when processing recipes.',
          },
        ],
      },
    ],
  },
  {
    id: 'recipes-layers',
    title: 'Recipes & Layers',
    description: 'Master the art of writing recipes and creating custom layers for your Yocto builds.',
    icon: '📝',
    lessons: [
      {
        id: 'writing-recipes',
        title: 'Writing Recipes',
        content: `
# Writing Yocto Recipes

A recipe is the fundamental building block in Yocto. Each recipe describes how to build a single piece of software.

## Basic Recipe Structure

\`\`\`bash
# myapp_1.0.bb

SUMMARY = "My example application"
DESCRIPTION = "A simple application to demonstrate Yocto recipes"
LICENSE = "MIT"
LIC_FILES_CHKSUM = "file://LICENSE;md5=abc123..."

# Source location
SRC_URI = "git://github.com/example/myapp.git;branch=main;protocol=https"
SRCREV = "a1b2c3d4e5f6..."

S = "\${WORKDIR}/git"

# Dependencies
DEPENDS = "libxml2 openssl"
RDEPENDS:\${PN} = "bash"

# Inherit a class for the build system
inherit cmake

# Install extra files
do_install:append() {
    install -d \${D}\${sysconfdir}
    install -m 0644 \${WORKDIR}/myapp.conf \${D}\${sysconfdir}/
}
\`\`\`

## Key Recipe Variables

| Variable | Description |
|----------|-------------|
| \`SUMMARY\` | One-line description |
| \`DESCRIPTION\` | Detailed description |
| \`LICENSE\` | Software license (e.g., MIT, GPLv2) |
| \`LIC_FILES_CHKSUM\` | Checksum of the license file |
| \`SRC_URI\` | Where to fetch source code |
| \`SRCREV\` | Git revision to use |
| \`S\` | Source directory path |
| \`DEPENDS\` | Build-time dependencies |
| \`RDEPENDS\` | Runtime dependencies |
| \`FILES\` | Files to include in the package |

## SRC_URI Examples

\`\`\`bash
# Git repository
SRC_URI = "git://github.com/user/repo.git;branch=main;protocol=https"

# HTTP tarball
SRC_URI = "https://example.com/myapp-1.0.tar.gz"

# Local files
SRC_URI = "file://myconfig.conf \\
           file://0001-fix-build.patch"

# Multiple sources
SRC_URI = "https://example.com/myapp-1.0.tar.gz \\
           file://0001-fix-typo.patch \\
           file://custom.cfg"
\`\`\`

## Recipe Versioning

Recipe filenames encode the version:
\`\`\`
myapp_1.0.bb        → version 1.0
myapp_2.3.1.bb      → version 2.3.1
myapp_git.bb        → version from git
\`\`\`

## Common Inherited Classes

| Class | Use Case |
|-------|----------|
| \`autotools\` | Projects using Autotools (configure/make) |
| \`cmake\` | Projects using CMake |
| \`meson\` | Projects using Meson |
| \`setuptools3\` | Python packages |
| \`systemd\` | Services managed by systemd |
        `,
        quiz: [
          {
            question: 'What does DEPENDS specify in a recipe?',
            options: [
              'Runtime dependencies',
              'Build-time dependencies',
              'Optional features',
              'Kernel modules',
            ],
            correct: 1,
            explanation: 'DEPENDS lists build-time dependencies — packages that must be built before this recipe can be compiled. RDEPENDS is for runtime dependencies.',
          },
          {
            question: 'How is the version encoded in a recipe filename?',
            options: [
              'In a VERSION variable',
              'In the filename after an underscore (e.g., myapp_1.0.bb)',
              'In a separate version file',
              'In the layer.conf',
            ],
            correct: 1,
            explanation: 'Yocto encodes the version in the recipe filename: myapp_1.0.bb means the recipe "myapp" at version "1.0".',
          },
          {
            question: 'What does LIC_FILES_CHKSUM do?',
            options: [
              'Checks if the license server is online',
              'Validates the integrity of the license file',
              'Counts the number of licensed files',
              'Downloads the license',
            ],
            correct: 1,
            explanation: 'LIC_FILES_CHKSUM contains a checksum of the license file to verify its integrity and ensure compliance tracking.',
          },
        ],
      },
      {
        id: 'creating-layers',
        title: 'Creating Custom Layers',
        content: `
# Creating Custom Layers

Layers are the modular building blocks of a Yocto build. Creating your own layer is essential for organizing custom recipes and configurations.

## Creating a Layer with bitbake-layers

\`\`\`bash
# Create a new layer
bitbake-layers create-layer meta-mylayer

# Add it to your build
bitbake-layers add-layer meta-mylayer
\`\`\`

## Layer Structure

\`\`\`
meta-mylayer/
├── conf/
│   └── layer.conf
├── recipes-core/
│   └── images/
│       └── my-image.bb
├── recipes-apps/
│   └── myapp/
│       ├── myapp_1.0.bb
│       └── files/
│           └── myapp.conf
├── recipes-bsp/
│   └── ...
├── COPYING.MIT
└── README
\`\`\`

## layer.conf

\`\`\`bash
# conf/layer.conf

# We have a conf and classes directory, add to BBPATH
BBPATH .= ":\${LAYERDIR}"

# We have recipes-* directories, add to BBFILES
BBFILES += "\${LAYERDIR}/recipes-*/*/*.bb \\
            \${LAYERDIR}/recipes-*/*/*.bbappend"

BBFILE_COLLECTIONS += "mylayer"
BBFILE_PATTERN_mylayer = "^\${LAYERDIR}/"
BBFILE_PRIORITY_mylayer = "6"

LAYERDEPENDS_mylayer = "core"
LAYERSERIES_COMPAT_mylayer = "scarthgap"
\`\`\`

## Key layer.conf Variables

| Variable | Description |
|----------|-------------|
| \`BBFILE_COLLECTIONS\` | Unique name for the layer |
| \`BBFILE_PATTERN\` | Pattern to match files in this layer |
| \`BBFILE_PRIORITY\` | Priority (higher = takes precedence) |
| \`LAYERDEPENDS\` | Other layers this layer depends on |
| \`LAYERSERIES_COMPAT\` | Compatible Yocto release series |

## Layer Naming Convention

Layers follow the naming convention \`meta-<name>\`:
- \`meta-raspberrypi\` — Raspberry Pi BSP
- \`meta-openembedded\` — Extra OE recipes
- \`meta-security\` — Security tools and hardening
- \`meta-virtualization\` — Container and VM support

## Using .bbappend Files

To modify a recipe from another layer without editing it:

\`\`\`bash
# In your layer, mirror the path structure
meta-mylayer/
└── recipes-core/
    └── base-files/
        └── base-files_%.bbappend

# The % wildcard matches any version
\`\`\`

\`\`\`bash
# base-files_%.bbappend
FILESEXTRAPATHS:prepend := "\${THISDIR}/files:"

# Add custom files
SRC_URI += "file://my-custom-file"

do_install:append() {
    install -m 0644 \${WORKDIR}/my-custom-file \${D}\${sysconfdir}/
}
\`\`\`

## Finding Existing Layers

The **OpenEmbedded Layer Index** at [layers.openembedded.org](https://layers.openembedded.org) is the official directory of available layers.
        `,
        quiz: [
          {
            question: 'What is the naming convention for Yocto layers?',
            options: [
              'layer-<name>',
              'yocto-<name>',
              'meta-<name>',
              '<name>-layer',
            ],
            correct: 2,
            explanation: 'Yocto layers follow the naming convention meta-<name>, such as meta-raspberrypi or meta-security.',
          },
          {
            question: 'What does BBFILE_PRIORITY control?',
            options: [
              'Build order of tasks',
              'Which layer takes precedence when recipes conflict',
              'Download priority for sources',
              'CPU priority for compilation',
            ],
            correct: 1,
            explanation: 'BBFILE_PRIORITY determines which layer\'s recipes take precedence when multiple layers provide the same recipe. Higher values win.',
          },
          {
            question: 'How do you modify a recipe from another layer?',
            options: [
              'Edit the original recipe file directly',
              'Create a .bbappend file in your layer',
              'Delete the original and rewrite it',
              'Use a .patch file on the recipe',
            ],
            correct: 1,
            explanation: 'The proper way to modify recipes from other layers is to create a .bbappend file in your own layer, preserving modularity.',
          },
        ],
      },
    ],
  },
  {
    id: 'customization',
    title: 'Image Customization',
    description: 'Learn to create custom images, add packages, and configure your embedded Linux system.',
    icon: '🎨',
    lessons: [
      {
        id: 'custom-images',
        title: 'Creating Custom Images',
        content: `
# Creating Custom Images

An **image recipe** defines the contents of your root filesystem. Creating custom images lets you build exactly the system you need.

## Standard Reference Images

Yocto provides several reference images:

| Image | Description |
|-------|-------------|
| \`core-image-minimal\` | Minimal boot image (just enough to boot) |
| \`core-image-base\` | Console-only image with hardware support |
| \`core-image-full-cmdline\` | Full command-line Linux system |
| \`core-image-sato\` | Mobile/embedded GUI using Sato |
| \`core-image-weston\` | Wayland/Weston compositor image |

## Writing a Custom Image Recipe

\`\`\`bash
# recipes-core/images/my-custom-image.bb

SUMMARY = "My custom embedded Linux image"
LICENSE = "MIT"

# Inherit the core-image class
inherit core-image

# Start from minimal and add packages
IMAGE_INSTALL = "packagegroup-core-boot"
IMAGE_INSTALL += "kernel-modules"
IMAGE_INSTALL += "openssh"
IMAGE_INSTALL += "python3"
IMAGE_INSTALL += "nginx"
IMAGE_INSTALL += "myapp"

# Image features
IMAGE_FEATURES += "ssh-server-openssh"
IMAGE_FEATURES += "package-management"

# Set the root filesystem size
IMAGE_ROOTFS_EXTRA_SPACE = "524288"

# Set the image type
IMAGE_FSTYPES = "ext4 wic"
\`\`\`

## Package Groups

For better organization, create **package groups**:

\`\`\`bash
# recipes-core/packagegroups/packagegroup-my-tools.bb

SUMMARY = "My custom tool set"
LICENSE = "MIT"

inherit packagegroup

RDEPENDS:\${PN} = " \\
    htop \\
    vim \\
    git \\
    curl \\
    screen \\
"
\`\`\`

Then use it in your image:
\`\`\`bash
IMAGE_INSTALL += "packagegroup-my-tools"
\`\`\`

## IMAGE_FEATURES

Common image features you can enable:

| Feature | Description |
|---------|-------------|
| \`debug-tweaks\` | Allows root login without password |
| \`ssh-server-openssh\` | Adds OpenSSH server |
| \`package-management\` | Keeps package manager on target |
| \`tools-debug\` | Adds debugging tools |
| \`tools-sdk\` | Adds SDK tools |
| \`splash\` | Shows splash screen during boot |
| \`read-only-rootfs\` | Makes root filesystem read-only |

## Image Types (IMAGE_FSTYPES)

\`\`\`bash
# Common output formats
IMAGE_FSTYPES = "ext4"        # Standard Linux filesystem
IMAGE_FSTYPES = "wic"         # Partitioned disk image
IMAGE_FSTYPES = "tar.gz"      # Compressed tarball
IMAGE_FSTYPES = "cpio.gz"     # For initramfs
IMAGE_FSTYPES = "iso"         # Bootable ISO
\`\`\`
        `,
        quiz: [
          {
            question: 'Which reference image provides a minimal boot system?',
            options: [
              'core-image-sato',
              'core-image-base',
              'core-image-minimal',
              'core-image-full-cmdline',
            ],
            correct: 2,
            explanation: 'core-image-minimal is the most stripped-down reference image — it contains just enough to boot the system.',
          },
          {
            question: 'What does IMAGE_FEATURES += "debug-tweaks" do?',
            options: [
              'Enables debug logging',
              'Allows root login without a password',
              'Adds GDB to the image',
              'Enables kernel debug mode',
            ],
            correct: 1,
            explanation: 'The "debug-tweaks" feature primarily allows root login without a password, which is useful during development.',
          },
          {
            question: 'What is a packagegroup used for?',
            options: [
              'Grouping source files together',
              'Organizing related packages for easy inclusion in images',
              'Compressing multiple packages into one',
              'Managing Git repositories',
            ],
            correct: 1,
            explanation: 'Package groups organize related packages so they can be easily included in image recipes as a single unit.',
          },
        ],
      },
      {
        id: 'kernel-customization',
        title: 'Kernel Configuration',
        content: `
# Kernel Configuration in Yocto

Customizing the Linux kernel is a common task in embedded development. Yocto provides several ways to configure the kernel.

## Using menuconfig

\`\`\`bash
# Open the kernel menuconfig
bitbake virtual/kernel -c menuconfig

# After saving your changes, create a config fragment
bitbake virtual/kernel -c diffconfig
\`\`\`

The \`diffconfig\` task generates a fragment file containing only your changes from the default configuration.

## Config Fragments

Config fragments are the recommended way to customize the kernel:

\`\`\`bash
# Create a .cfg file with your changes
# my-kernel-options.cfg
CONFIG_USB_GADGET=y
CONFIG_USB_ETH=m
# CONFIG_DEBUG_INFO is not set
\`\`\`

## Applying Fragments via .bbappend

\`\`\`bash
# meta-mylayer/recipes-kernel/linux/linux-yocto_%.bbappend

FILESEXTRAPATHS:prepend := "\${THISDIR}/files:"

SRC_URI += "file://my-kernel-options.cfg"
\`\`\`

## Using defconfig

For a complete kernel configuration:

\`\`\`bash
# meta-mylayer/recipes-kernel/linux/linux-yocto_%.bbappend

FILESEXTRAPATHS:prepend := "\${THISDIR}/files:"

SRC_URI += "file://defconfig"
\`\`\`

## Kernel Recipes

Yocto provides standard kernel recipes:

| Recipe | Description |
|--------|-------------|
| \`linux-yocto\` | Standard Yocto kernel with LTSI |
| \`linux-yocto-rt\` | Real-time kernel variant |
| \`linux-yocto-tiny\` | Minimal kernel for small footprints |
| \`linux-yocto-dev\` | Development kernel (latest mainline) |

## Selecting a Kernel Provider

\`\`\`bash
# In local.conf or machine.conf
PREFERRED_PROVIDER_virtual/kernel = "linux-yocto"
PREFERRED_VERSION_linux-yocto = "6.6%"
\`\`\`

## Useful Kernel Tasks

\`\`\`bash
# Configure the kernel
bitbake virtual/kernel -c menuconfig

# Generate config diff
bitbake virtual/kernel -c diffconfig

# Rebuild the kernel
bitbake virtual/kernel -c compile -f

# Deploy kernel to the image deploy directory
bitbake virtual/kernel -c deploy

# Clean and rebuild
bitbake virtual/kernel -c cleansstate
bitbake virtual/kernel
\`\`\`
        `,
        quiz: [
          {
            question: 'What is the recommended way to customize the kernel in Yocto?',
            options: [
              'Edit the kernel source directly',
              'Use config fragments (.cfg files)',
              'Modify the default config in the kernel tree',
              'Use kernel command-line parameters only',
            ],
            correct: 1,
            explanation: 'Config fragments (.cfg files) are the recommended approach because they are maintainable, modular, and only contain your changes.',
          },
          {
            question: 'What does "bitbake virtual/kernel -c diffconfig" do?',
            options: [
              'Shows the difference between two kernels',
              'Creates a config fragment from menuconfig changes',
              'Compares kernel versions',
              'Diffs the kernel source code',
            ],
            correct: 1,
            explanation: 'The diffconfig task generates a configuration fragment containing only the differences from the default config, making it easy to capture menuconfig changes.',
          },
          {
            question: 'Which kernel recipe is designed for minimal footprints?',
            options: [
              'linux-yocto',
              'linux-yocto-rt',
              'linux-yocto-tiny',
              'linux-yocto-dev',
            ],
            correct: 2,
            explanation: 'linux-yocto-tiny is specifically designed for systems with very small storage and memory constraints.',
          },
        ],
      },
    ],
  },
  {
    id: 'advanced-topics',
    title: 'Advanced Topics',
    description: 'Explore SDK generation, devtool, and debugging techniques for professional Yocto development.',
    icon: '🚀',
    lessons: [
      {
        id: 'devtool',
        title: 'Working with devtool',
        content: `
# Working with devtool

**devtool** is a powerful command-line tool that streamlines common Yocto development tasks. It's the recommended workflow for recipe development.

## devtool Workflow

\`\`\`
devtool add → develop → devtool build → devtool deploy-target → devtool finish
\`\`\`

## Adding a New Recipe

\`\`\`bash
# Create a recipe from a source repository
devtool add myapp https://github.com/example/myapp.git

# This creates:
# - A recipe in workspace/recipes/myapp/
# - Source code in workspace/sources/myapp/
\`\`\`

## Modifying an Existing Recipe

\`\`\`bash
# Start modifying an existing recipe
devtool modify myrecipe

# This extracts the source and sets up a workspace
# Make your code changes in workspace/sources/myrecipe/
\`\`\`

## Building and Testing

\`\`\`bash
# Build the recipe
devtool build myapp

# Deploy directly to a running target (via SSH)
devtool deploy-target myapp root@192.168.1.100

# Undeploy from target
devtool undeploy-target myapp root@192.168.1.100
\`\`\`

## Finishing Up

\`\`\`bash
# Create a .bbappend and move to your layer
devtool finish myapp meta-mylayer

# Or reset the workspace without creating an append
devtool reset myapp
\`\`\`

## devtool Commands Reference

| Command | Description |
|---------|-------------|
| \`devtool add\` | Add a new recipe |
| \`devtool modify\` | Modify an existing recipe |
| \`devtool build\` | Build a recipe from workspace |
| \`devtool deploy-target\` | Deploy to running target |
| \`devtool undeploy-target\` | Remove from target |
| \`devtool finish\` | Finish and create .bbappend |
| \`devtool reset\` | Remove from workspace |
| \`devtool status\` | Show workspace status |
| \`devtool search\` | Search for recipes |
| \`devtool upgrade\` | Upgrade a recipe to new version |

## Upgrading Recipes

\`\`\`bash
# Upgrade a recipe to a new version
devtool upgrade myapp --version 2.0

# This updates the recipe and lets you resolve any issues
# When done:
devtool finish myapp meta-mylayer
\`\`\`
        `,
        quiz: [
          {
            question: 'What is devtool primarily used for?',
            options: [
              'Hardware debugging',
              'Streamlining recipe development workflow',
              'Managing the Linux kernel',
              'Network configuration',
            ],
            correct: 1,
            explanation: 'devtool simplifies common development tasks like adding, modifying, building, and deploying recipes.',
          },
          {
            question: 'What does "devtool deploy-target" do?',
            options: [
              'Builds the recipe locally',
              'Pushes source code to Git',
              'Deploys built software to a running target via SSH',
              'Creates a new target machine configuration',
            ],
            correct: 2,
            explanation: 'devtool deploy-target copies the built binaries to a running target device over SSH for testing.',
          },
          {
            question: 'What does "devtool finish" do?',
            options: [
              'Deletes the workspace',
              'Creates a .bbappend and moves changes to your layer',
              'Shuts down the build system',
              'Completes the build process',
            ],
            correct: 1,
            explanation: 'devtool finish creates a .bbappend file with your changes and properly integrates the recipe into your specified layer.',
          },
        ],
      },
      {
        id: 'sdk-generation',
        title: 'SDK Generation',
        content: `
# SDK Generation

Yocto can generate **Software Development Kits (SDKs)** that allow developers to build applications for the target platform outside of the Yocto build system.

## Types of SDKs

### Standard SDK
A basic cross-compilation toolchain.

\`\`\`bash
# Generate a standard SDK
bitbake core-image-minimal -c populate_sdk
\`\`\`

### Extensible SDK (eSDK)
An enhanced SDK that includes devtool and can pull in additional packages on demand.

\`\`\`bash
# Generate an extensible SDK
bitbake core-image-minimal -c populate_sdk_ext
\`\`\`

## Installing the SDK

\`\`\`bash
# The SDK installer is generated in tmp/deploy/sdk/
./poky-glibc-x86_64-core-image-minimal-cortexa57-toolchain-4.0.sh

# Default installation path: /opt/poky/4.0
\`\`\`

## Using the SDK

\`\`\`bash
# Source the SDK environment
source /opt/poky/4.0/environment-setup-cortexa57-poky-linux

# Now you can cross-compile
$CC -o myapp myapp.c

# Or use with autotools/cmake
./configure $CONFIGURE_FLAGS
make

# CMake example
cmake -DCMAKE_TOOLCHAIN_FILE=$OECORE_NATIVE_SYSROOT/usr/share/cmake/OEToolchainConfig.cmake ..
make
\`\`\`

## SDK Contents

| Component | Description |
|-----------|-------------|
| Cross-compiler | GCC configured for target architecture |
| Sysroot | Target libraries and headers |
| Environment script | Sets up paths and variables |
| Debug tools | GDB, strace configured for target |
| \`devtool\` (eSDK only) | Recipe development tool |

## Customizing the SDK

\`\`\`bash
# In your image recipe or local.conf

# Add extra packages to the SDK's target sysroot
TOOLCHAIN_TARGET_TASK += "libssl-dev libcurl-dev"

# Add extra native tools to the SDK
TOOLCHAIN_HOST_TASK += "nativesdk-cmake"
\`\`\`

## Comparing SDK Types

| Feature | Standard SDK | Extensible SDK |
|---------|-------------|----------------|
| Size | Smaller | Larger |
| Includes devtool | No | Yes |
| Can add packages | No | Yes (on-demand) |
| Build from source | No | Yes |
| Use case | Application development | Recipe development |
        `,
        quiz: [
          {
            question: 'What is the difference between a standard SDK and an extensible SDK?',
            options: [
              'Standard is free, extensible is paid',
              'Extensible includes devtool and can pull in packages on demand',
              'Standard supports more architectures',
              'There is no difference',
            ],
            correct: 1,
            explanation: 'The extensible SDK (eSDK) includes devtool and can dynamically pull in additional packages, while the standard SDK is a fixed cross-compilation toolchain.',
          },
          {
            question: 'Which command generates a standard SDK?',
            options: [
              'bitbake -c sdk',
              'bitbake core-image-minimal -c populate_sdk',
              'make sdk',
              'yocto-sdk generate',
            ],
            correct: 1,
            explanation: 'The command "bitbake <image> -c populate_sdk" generates a standard SDK for the specified image.',
          },
          {
            question: 'How do you set up the SDK environment for cross-compilation?',
            options: [
              'Run the SDK binary directly',
              'Source the environment-setup script',
              'Set PATH manually',
              'Install a VSCode extension',
            ],
            correct: 1,
            explanation: 'You source the environment-setup script provided in the SDK installation directory to set up all cross-compilation variables.',
          },
        ],
      },
      {
        id: 'debugging',
        title: 'Debugging & Troubleshooting',
        content: `
# Debugging & Troubleshooting

When things go wrong in Yocto (and they will!), knowing how to debug effectively is essential.

## Common Build Errors

### Fetch Failures
\`\`\`bash
# Check if the URL is accessible
bitbake myrecipe -c fetch -v

# Use a mirror or pre-downloaded sources
PREMIRRORS:prepend = "\\
    git://.*/.* https://my-mirror.com/\\n \\
    https://.*/.* https://my-mirror.com/\\n"
\`\`\`

### Compilation Errors
\`\`\`bash
# Find the build log
cat tmp/work/<arch>/<recipe>/<version>/temp/log.do_compile

# Open a devshell to debug interactively
bitbake myrecipe -c devshell
\`\`\`

### Packaging Errors
\`\`\`bash
# Check what files are being packaged
bitbake myrecipe -c package -v

# View the packaging log
cat tmp/work/<arch>/<recipe>/<version>/temp/log.do_package
\`\`\`

## Key Debugging Tools

### devshell
Opens an interactive shell in the recipe's build environment:
\`\`\`bash
bitbake myrecipe -c devshell
# You're now in the source directory with all env vars set
\`\`\`

### Environment Inspection
\`\`\`bash
# Show all variables for a recipe
bitbake myrecipe -e | grep "^VARIABLE="

# Show the recipe file being used
bitbake myrecipe -e | grep "^FILE="

# Show all tasks for a recipe
bitbake myrecipe -c listtasks
\`\`\`

### Task Logs
All task logs are stored in:
\`\`\`
tmp/work/<arch>/<recipe>/<version>/temp/
├── log.do_fetch
├── log.do_compile
├── log.do_install
├── log.do_package
└── run.do_compile    # The actual script that was run
\`\`\`

## Dependency Analysis

\`\`\`bash
# Show recipe dependencies
bitbake myrecipe -g

# Generate a dependency graph
bitbake myrecipe -g -u taskexp  # Opens task explorer

# Check reverse dependencies
bitbake myrecipe -g
cat pn-buildlist
\`\`\`

## Frequently Encountered Issues

| Issue | Solution |
|-------|----------|
| "Nothing provides X" | Add the missing recipe/layer providing X |
| "Multiple providers for X" | Set PREFERRED_PROVIDER_X |
| QA Errors (file-rdeps) | Add missing runtime dependencies |
| Sstate cache misses | Check SSTATE_DIR path and permissions |
| "Taskhash mismatch" | Clean sstate: \`bitbake recipe -c cleansstate\` |
| Disk space errors | Clean tmp/ or add more storage |

## Performance Tips

\`\`\`bash
# Use tmpfs for build (if you have enough RAM)
TMPDIR = "/dev/shm/yocto-tmp"

# Share downloads and sstate across builds
DL_DIR = "/shared/downloads"
SSTATE_DIR = "/shared/sstate-cache"

# Tune parallel execution
BB_NUMBER_THREADS = "8"
PARALLEL_MAKE = "-j 8"

# Enable hash equivalence server
BB_HASHSERVE = "auto"
BB_SIGNATURE_HANDLER = "OEEquivHash"
\`\`\`
        `,
        quiz: [
          {
            question: 'Where are BitBake task logs stored?',
            options: [
              'In the recipe directory',
              'In tmp/work/<arch>/<recipe>/<version>/temp/',
              'In /var/log/bitbake/',
              'In the layer\'s log directory',
            ],
            correct: 1,
            explanation: 'Task logs (log.do_compile, log.do_install, etc.) are stored in the tmp/work/<arch>/<recipe>/<version>/temp/ directory.',
          },
          {
            question: 'What does "bitbake myrecipe -c devshell" do?',
            options: [
              'Starts a development server',
              'Opens an interactive shell in the recipe\'s build environment',
              'Installs development tools',
              'Creates a developer account',
            ],
            correct: 1,
            explanation: 'devshell opens an interactive terminal in the recipe\'s source directory with all build environment variables set, allowing hands-on debugging.',
          },
          {
            question: 'How do you resolve "Nothing provides X" errors?',
            options: [
              'Delete the tmp directory',
              'Add the missing recipe or layer that provides X',
              'Increase BB_NUMBER_THREADS',
              'Reinstall BitBake',
            ],
            correct: 1,
            explanation: 'This error means a dependency is missing. You need to find and add the recipe or layer that provides the required package.',
          },
        ],
      },
    ],
  },
];

export default modules;
