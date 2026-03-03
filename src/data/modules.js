const modules = [
  {
    id: 'introduction',
    title: 'Introduction to Yocto',
    description: 'Learn what the Yocto Project is, its core concepts, and essential terminology.',
    icon: '📖',
    lessons: [
      {
        id: 'what-is-yocto',
        title: 'What is the Yocto Project?',
        content: `
# What is the Yocto Project?

The **Yocto Project** is an open-source collaboration project hosted by the **Linux Foundation** since 2010, managed by Richard Purdie. It provides templates, tools, and methods to help you create custom Linux-based systems for embedded and IoT products, regardless of hardware architecture.

> **Important:** Yocto is **NOT** a Linux distribution — it *creates* custom ones.

## Approaches to Embedded Linux

| Approach | Pros | Cons |
|----------|------|------|
| **Build manually** | Full flexibility | Dependency hell, not reproducible |
| **Binary distro** (Debian, Ubuntu) | Easy to create | Hard to customize/optimize, large, native compilation (slow) |
| **Build systems** (Yocto, Buildroot) | Nearly full flexibility, reproducible, cross-compilation | Build time, learning curve |

## Yocto's Key Principle

Yocto **always builds binary packages** (rpm, deb, or ipk) first, then generates the root filesystem from that package feed.

## Yocto vs Buildroot

| Aspect | Yocto | Buildroot |
|--------|-------|-----------|
| Output | Complete distribution with binary packages | Root filesystem image only |
| Complexity | Powerful but steep learning curve | Much simpler |
| Package management | Yes (rpm, deb, ipk) | No |

## What Yocto Provides

1. **Poky** — the reference build system (BitBake + OpenEmbedded-Core)
2. **BitBake** — the task execution engine
3. **OpenEmbedded-Core (OE-Core)** — the core metadata
4. **Board Support Packages (BSPs)** — hardware configurations
5. **Documentation** — comprehensive guides

## Why Use Yocto?

| Benefit | Description |
|---------|-------------|
| **Customization** | Build exactly what you need — no bloat |
| **Reproducibility** | Same inputs always produce the same outputs |
| **Cross-platform** | ARM, x86, MIPS, PowerPC, RISC-V and more |
| **Industry standard** | Automotive, industrial, consumer electronics |
| **Community** | Large ecosystem of layers and recipes |

\`\`\`
Source Code + Metadata (Recipes) -> BitBake -> Binary Packages -> Root Filesystem Image
\`\`\`
        `,
        quiz: [
          {
            question: 'What is the Yocto Project?',
            options: ['A Linux distribution', 'A tool to create custom Linux-based systems', 'A hardware manufacturer', 'A programming language'],
            correct: 1,
            explanation: 'The Yocto Project is not a distribution itself — it provides tools to create custom Linux-based systems.',
          },
          {
            question: 'What is BitBake?',
            options: ['A web framework', 'A Linux kernel module', 'The task execution engine used by Yocto', 'A package manager like apt'],
            correct: 2,
            explanation: 'BitBake is the task execution engine that processes recipes and executes build tasks.',
          },
          {
            question: 'Which organization hosts the Yocto Project?',
            options: ['Apache Foundation', 'Linux Foundation', 'Mozilla Foundation', 'Free Software Foundation'],
            correct: 1,
            explanation: 'The Yocto Project is hosted by the Linux Foundation since 2010.',
          },
          {
            question: 'What is the key difference between Yocto and Buildroot?',
            options: ['Yocto is newer than Buildroot', 'Yocto builds binary packages while Buildroot builds filesystem images directly', 'Yocto only supports ARM', 'Buildroot is proprietary'],
            correct: 1,
            explanation: 'Yocto builds a complete distribution with binary packages, while Buildroot generates a root filesystem image without packages.',
          },
          {
            question: 'What is a major disadvantage of using a binary distribution for embedded Linux?',
            options: ['Lacks package management', 'Hard to customize and optimize for size/boot time', 'No kernel support', 'Only supports x86'],
            correct: 1,
            explanation: 'Binary distributions are hard to customize for embedded — they produce large images and use slow native compilation.',
          },
          {
            question: 'What does cross-compilation provide in build systems like Yocto?',
            options: ['Smaller binaries', 'Better security', 'Faster builds by leveraging powerful build machines', 'Simpler configuration'],
            correct: 2,
            explanation: 'Cross-compilation builds software on a powerful host for a different target architecture, much faster than native compilation.',
          },
          {
            question: "What is Yocto's fundamental build principle?",
            options: ['It copies prebuilt binaries', 'It always builds binary packages first, then generates the root filesystem', 'It compiles natively on the target', 'It uses containers for isolation'],
            correct: 1,
            explanation: 'Yocto always builds binary packages first, then generates the final root filesystem from that package feed.',
          },
        ],
      },
      {
        id: 'yocto-terminology',
        title: 'Core Terminology',
        content: `
# Yocto Core Terminology

## Poky — Multiple Meanings

1. **Poky (git repo)** — assembled from bitbake, openembedded-core, yocto-docs, meta-yocto
2. **poky (distro)** — the reference distribution
3. **meta-poky (layer)** — the layer providing the poky reference distro

## Poky Source Tree

\`\`\`
poky/
+-- bitbake/          # Build engine scripts
+-- documentation/    # Documentation sources
+-- meta/             # OpenEmbedded-Core metadata
+-- meta-skeleton/    # Template recipes for BSP/kernel dev
+-- meta-poky/        # Poky reference distro config
+-- meta-yocto-bsp/   # Reference hardware BSP
+-- oe-init-build-env # Setup script (creates build dir)
+-- scripts/          # Development tools
\`\`\`

## Essential Terms

**Recipe (.bb)** — Instructions for building software. Format: \`<name>_<version>.bb\`
**Layer** — Collection of recipes/configs, prefixed \`meta-\`
**Machine** — Target hardware definition
**Distro** — Software policy configuration
**Image** — Final root filesystem output
**Class (.bbclass)** — Reusable build logic
**Append (.bbappend)** — Modify recipes from other layers
**Tasks** — Build steps: do_fetch, do_unpack, do_patch, do_configure, do_compile, do_install, do_package
**Metadata** — Collective input to BitBake: configs, recipes, classes, include files

## File Extensions

| Extension | Purpose |
|-----------|---------|
| \`.bb\` | Recipe file |
| \`.bbappend\` | Recipe extension file |
| \`.bbclass\` | Class file |
| \`.conf\` | Configuration file |
| \`.inc\` | Include file (shared recipe content) |
        `,
        quiz: [
          {
            question: 'What is a Yocto recipe (.bb file)?',
            options: ['A kernel configuration', 'Instructions for building a piece of software', 'A hardware description', 'A test script'],
            correct: 1,
            explanation: 'A recipe (.bb file) tells BitBake how to fetch, configure, compile, and package a piece of software.',
          },
          {
            question: 'What is a Yocto layer?',
            options: ['A single recipe', 'A collection of related recipes and configurations', 'A filesystem type', 'A hardware abstraction'],
            correct: 1,
            explanation: 'A layer is a modular collection of recipes, configurations, and classes.',
          },
          {
            question: 'What file extension is used for recipe append files?',
            options: ['.bb', '.conf', '.bbappend', '.bbclass'],
            correct: 2,
            explanation: '.bbappend files modify existing recipes without changing the original.',
          },
          {
            question: 'What does oe-init-build-env do?',
            options: ['Compiles the kernel', 'Sets up the build directory and environment variables', 'Installs packages on the target', 'Creates a recipe'],
            correct: 1,
            explanation: 'oe-init-build-env creates the build directory, sets environment variables, and makes BitBake commands available.',
          },
          {
            question: 'Which directory in Poky contains the OpenEmbedded-Core metadata?',
            options: ['bitbake/', 'meta/', 'meta-poky/', 'scripts/'],
            correct: 1,
            explanation: 'The meta/ directory contains the OpenEmbedded-Core metadata.',
          },
          {
            question: 'What is the correct naming format for a recipe file?',
            options: ['<name>-<version>.bb', '<name>_<version>.bb', '<version>_<name>.bb', '<name>.bb.<version>'],
            correct: 1,
            explanation: 'Recipe files use <name>_<version>.bb format, e.g. bash_5.1.bb.',
          },
          {
            question: 'The word "Poky" can refer to which of the following?',
            options: ['Only the reference distribution', 'Only the git repository', 'A git repository, a reference distro, and a layer', 'Only the build engine'],
            correct: 2,
            explanation: 'Poky is a git repo, a reference distro, and meta-poky is the layer providing that distro config.',
          },
        ],
      },
    ],
  },
  {
    id: 'build-system',
    title: 'The Build System',
    description: 'Understand BitBake commands, build configuration, and directory structure.',
    icon: '⚙️',
    lessons: [
      {
        id: 'bitbake-fundamentals',
        title: 'BitBake Fundamentals',
        content: `
# BitBake Fundamentals

**BitBake** is a task scheduler written in Python that parses metadata files to determine what to build.

## Common Commands

| Command | Purpose |
|---------|---------|
| \`bitbake core-image-minimal\` | Build a minimal image |
| \`bitbake -c listtasks virtual/kernel\` | List available tasks for kernel |
| \`bitbake -c menuconfig virtual/kernel\` | Run kernel menuconfig |
| \`bitbake -f dropbear\` | Force rebuild |
| \`bitbake -s\` | List all recipes and versions |
| \`bitbake --runall=fetch core-image-minimal\` | Download all sources |
| \`bitbake -c devshell <recipe>\` | Open development shell |

## bitbake-getvar

Debug variable assignments:

\`\`\`bash
$ bitbake-getvar DEPLOY_DIR
# Shows each config file, pre-expansion value, and final value
\`\`\`

## Shared State Cache (SSTATE_DIR)

Caches task outputs to speed up rebuilds. Defaults to \`build/sstate-cache\`.

Clean old entries: \`find sstate-cache/ -type f -atime +30 -delete\`

## Build Statistics

Stored in \`tmp/buildstats/\` — CPU usage, elapsed time, timestamps for all packages.
        `,
        quiz: [
          {
            question: 'What command builds a minimal image?',
            options: ['bitbake minimal-image', 'bitbake core-image-minimal', 'make core-image-minimal', 'yocto build minimal'],
            correct: 1,
            explanation: '"bitbake core-image-minimal" builds the core-image-minimal target.',
          },
          {
            question: 'Which BitBake option runs a specific task?',
            options: ['-t', '-c', '-r', '-s'],
            correct: 1,
            explanation: '-c specifies which task to run, e.g. bitbake -c compile myrecipe.',
          },
          {
            question: 'What does bitbake --runall=fetch do?',
            options: ['Fetches BitBake updates', 'Downloads all sources for a target and dependencies', 'Runs all tasks for every recipe', 'Fetches sstate from mirror'],
            correct: 1,
            explanation: '--runall=fetch downloads all source code for the target and all dependencies.',
          },
          {
            question: 'What is the shared state cache (SSTATE_DIR) used for?',
            options: ['Storing source code', 'Holding config files', 'Speeding up builds by caching task outputs', 'Logging errors'],
            correct: 2,
            explanation: 'The sstate cache stores task outputs so unchanged tasks can be skipped in subsequent builds.',
          },
          {
            question: 'What does bitbake-getvar DEPLOY_DIR show?',
            options: ['Deploys files', 'How a variable is assigned across config files with final value', 'Sets DEPLOY_DIR', 'Deletes deploy dir'],
            correct: 1,
            explanation: 'bitbake-getvar shows each config file touching the variable and the final resolved value.',
          },
          {
            question: 'What does bitbake -c devshell <recipe> do?',
            options: ['Deletes workspace', 'Opens a shell with the full build environment for that recipe', 'Shows source code', 'Runs unit tests'],
            correct: 1,
            explanation: 'devshell opens an interactive shell with all environment variables set for debugging.',
          },
          {
            question: 'Where are build statistics stored?',
            options: ['tmp/logs/', 'sstate-cache/', 'tmp/buildstats/', 'conf/'],
            correct: 2,
            explanation: 'Build statistics are stored in tmp/buildstats/.',
          },
        ],
      },
      {
        id: 'build-configuration',
        title: 'Build Configuration',
        content: `
# Build Configuration

## Setup

\`\`\`bash
source oe-init-build-env [builddir]   # Default name: "build"
\`\`\`

## Config Files (conf/)

| File | Purpose |
|------|---------|
| \`bblayers.conf\` | **Mandatory** — lists layers (BBLAYERS) |
| \`local.conf\` | **Mandatory** — user config variables |
| \`site.conf\` | **Optional** — site-specific (mirrors, resources) |

## Key local.conf Variables

| Variable | Purpose | Default |
|----------|---------|---------|
| \`MACHINE\` | Target machine | qemux86-64 |
| \`BB_NUMBER_THREADS\` | Parallel BitBake tasks | CPU threads |
| \`PARALLEL_MAKE\` | Parallel make processes | CPU threads |
| \`DL_DIR\` | Download directory | build/downloads |

## Build Directory After Build

\`\`\`
build/
+-- conf/              # Config (unchanged)
+-- downloads/         # Upstream source tarballs
+-- sstate-cache/      # Shared state cache
+-- tmp/               # All build outputs
    +-- work/          # Per-recipe work dirs (by architecture)
    +-- sysroots/      # Shared libraries and headers
    +-- deploy/
    |   +-- images/    # Complete flashable images
    +-- buildstats/    # Build statistics
\`\`\`

Exported variables: \`BUILDDIR\` (absolute path), \`PATH\` (prepended with scripts/ and bitbake/bin/).
        `,
        quiz: [
          {
            question: 'Which file lists the layers used in a build?',
            options: ['local.conf', 'bblayers.conf', 'layer.conf', 'site.conf'],
            correct: 1,
            explanation: 'bblayers.conf contains the BBLAYERS variable listing all layers.',
          },
          {
            question: 'What variable sets the target machine?',
            options: ['TARGET', 'MACHINE', 'BOARD', 'PLATFORM'],
            correct: 1,
            explanation: 'MACHINE in local.conf specifies the target hardware.',
          },
          {
            question: 'Where are downloaded source tarballs stored?',
            options: ['tmp/deploy/', 'sstate-cache/', 'downloads/ in the build directory', 'conf/'],
            correct: 2,
            explanation: 'Sources are stored in the downloads/ directory (DL_DIR).',
          },
          {
            question: 'What is site.conf for?',
            options: ['Listing layers', 'Setting the machine', 'Site-specific settings like network mirrors and resource limits', 'Defining recipes'],
            correct: 2,
            explanation: 'site.conf holds site-specific settings like network mirrors and CPU/memory limits.',
          },
          {
            question: 'Where are final flashable images after a build?',
            options: ['tmp/work/', 'downloads/', 'tmp/deploy/images/', 'sstate-cache/'],
            correct: 2,
            explanation: 'Complete flashable images are placed in tmp/deploy/images/.',
          },
          {
            question: 'What does PARALLEL_MAKE control?',
            options: ['Number of images built', 'How many processes used when compiling', 'Recipe order', 'Parallel downloads'],
            correct: 1,
            explanation: 'PARALLEL_MAKE controls how many processes (make -j) are used when compiling.',
          },
          {
            question: 'What happens when you source oe-init-build-env for the first time?',
            options: ['Starts a build', 'Creates the build directory with conf/ subdirectory', 'Downloads Poky', 'Installs BitBake'],
            correct: 1,
            explanation: 'It creates the build directory with template configuration files in conf/.',
          },
        ],
      },
    ],
  },
  {
    id: 'recipes-layers',
    title: 'Recipes & Layers',
    description: 'Master recipe writing, layer management, recipe extensions, and classes.',
    icon: '🧱',
    lessons: [
      {
        id: 'writing-recipes',
        title: 'Writing Recipes',
        content: `
# Writing Recipes

Format: \`<name>_<version>.bb\` — output is binary packages (rpm/deb/ipk).

## Auto-Available Variables

| Variable | Description | Example (bash_5.1.bb) |
|----------|-------------|-----------------------|
| BPN | Recipe name | bash |
| PN | BPN with prefix/suffix | bash |
| PV | Version | 5.1 |
| BP | BPN-PV | bash-5.1 |

## Recipe Header

\`\`\`bash
SUMMARY = "Short description"
HOMEPAGE = "https://example.com"
LICENSE = "GPL-2.0-or-later"    # SPDX identifier
\`\`\`

## SRC_URI

\`\`\`bash
# HTTP with checksum
SRC_URI = "https://example.com/app-\\\${PV}.tar.gz"
SRC_URI[sha256sum] = "abc..."

# Git (SRCREV must be commit hash for offline reproducibility)
SRC_URI = "git://git.example.com/app;protocol=https;branch=main"
SRCREV = "2d47b4eb..."
S = "\\\${WORKDIR}/git"

# Local files (searched via FILESPATH)
SRC_URI += "file://defconfig file://fix.patch"
\`\`\`

## FILESPATH Search

Files searched in order: \`\\\${FILE_DIRNAME}/\\\${BP}\`, \`\\\${FILE_DIRNAME}/\\\${BPN}\`, \`\\\${FILE_DIRNAME}/files\` — allows machine-specific overrides without conditionals.

## License Tracking

\`\`\`bash
LIC_FILES_CHKSUM = "file://COPYING;md5=abc..."
\`\`\`
Mandatory unless LICENSE = "CLOSED". Build fails if checksum changes.

## .inc Files

Common metadata in \`tar.inc\`, version-specific in \`tar_1.26.bb\` using \`require tar.inc\`.

## Dependencies

| Variable | Type |
|----------|------|
| DEPENDS | Build-time |
| RDEPENDS:\\\${PN} | Runtime |

## Task Variables

| Variable | Description |
|----------|-------------|
| WORKDIR | Recipe working directory |
| S | Source code location |
| B | Build objects location |
| D | Destination (install root) |
        `,
        quiz: [
          {
            question: 'What is the correct recipe filename format?',
            options: ['myapp-1.0.bb', 'myapp_1.0.bb', '1.0_myapp.bb', 'myapp.1.0.bb'],
            correct: 1,
            explanation: 'Recipe files use <name>_<version>.bb format.',
          },
          {
            question: 'What does SRC_URI specify?',
            options: ['Installation directory', 'Where and how to retrieve source code', 'Package list', 'Machine configuration'],
            correct: 1,
            explanation: 'SRC_URI defines locations and schemes for retrieving source code, patches, and config files.',
          },
          {
            question: 'Why must SRCREV be a commit hash when using git?',
            options: ['Faster cloning', 'Tags can change, so commit hashes ensure offline reproducibility', 'BitBake cannot parse tags', 'Tags are deprecated'],
            correct: 1,
            explanation: 'Git tags can move; commit hashes ensure the exact same source is fetched every time.',
          },
          {
            question: 'What is LIC_FILES_CHKSUM used for?',
            options: ['Encrypting files', 'Tracking license file integrity so builds fail if license changes', 'Managing versions', 'Verifying binaries'],
            correct: 1,
            explanation: 'LIC_FILES_CHKSUM checksums license files — if a license changes upstream, the build fails.',
          },
          {
            question: 'What variable lists build-time dependencies?',
            options: ['RDEPENDS', 'SRC_URI', 'DEPENDS', 'PROVIDES'],
            correct: 2,
            explanation: 'DEPENDS lists build-time dependencies.',
          },
          {
            question: 'What are .inc files for?',
            options: ['Overriding recipes', 'Storing version-agnostic common metadata', 'License data only', 'Config variables only'],
            correct: 1,
            explanation: '.inc files hold common metadata shared across version-specific .bb recipe files.',
          },
          {
            question: 'What does the D variable represent?',
            options: ['Download directory', 'Destination directory where files are installed before imaging', 'Debug output', 'Device tree directory'],
            correct: 1,
            explanation: 'D is the destination install root, where files go during do_install before packaging.',
          },
        ],
      },
      {
        id: 'creating-layers',
        title: 'Creating Custom Layers',
        content: `
# Creating Custom Layers

## Creating a Layer

\`\`\`bash
bitbake-layers create-layer -p <PRIORITY> meta-custom
\`\`\`

Priority determines which recipe wins when multiple layers have the same recipe.

## Pre-filled Files

\`conf/layer.conf\` (mandatory), \`COPYING.MIT\`, \`README\`

## Managing Layers

\`\`\`bash
bitbake-layers show-layers
bitbake-layers add-layer meta-custom
bitbake-layers remove-layer meta-qt5
\`\`\`

## Layer Config Variables

| Variable | Purpose |
|----------|---------|
| LAYERDEPENDS | Dependencies on other layers |
| LAYERSERIES_COMPAT | Compatible Yocto releases |

## Third-Party Layers

Browse at **layers.openembedded.org**. Examples: meta-ti-bsp, meta-freescale, meta-browser, meta-qt5.

## Best Practices

- Never modify third-party layers — use .bbappend
- Use LAYERDEPENDS and LAYERSERIES_COMPAT
        `,
        quiz: [
          {
            question: 'What command creates a new layer?',
            options: ['bitbake create-layer', 'oe-layer-create', 'bitbake-layers create-layer', 'yocto-layer-init'],
            correct: 2,
            explanation: 'bitbake-layers create-layer creates a new layer with proper structure.',
          },
          {
            question: 'What is the naming convention for layers?',
            options: ['Prefix with layer-', 'Prefix with meta-', 'Suffix with -layer', 'Prefix with yocto-'],
            correct: 1,
            explanation: 'Layers are prefixed with meta- by convention.',
          },
          {
            question: 'What does layer priority control?',
            options: ['Parse order', 'Which recipe is used when multiple layers provide the same one', 'Compilation speed', 'Package install order'],
            correct: 1,
            explanation: 'Layer priority determines which recipe wins when multiple layers have the same recipe.',
          },
          {
            question: 'What is the mandatory entry point for a layer?',
            options: ['layer.conf', 'README', 'conf/layer.conf', 'conf/local.conf'],
            correct: 2,
            explanation: 'conf/layer.conf is mandatory — BitBake reads it to discover the layer.',
          },
          {
            question: 'What does LAYERSERIES_COMPAT specify?',
            options: ['Compatible architectures', 'Yocto release versions the layer works with', 'Compatible machines', 'Compatible kernels'],
            correct: 1,
            explanation: 'LAYERSERIES_COMPAT declares compatible Yocto release series (e.g. scarthgap).',
          },
          {
            question: 'Where can you find third-party layers?',
            options: ['github.com/yocto', 'yoctoproject.org/layers', 'layers.openembedded.org', 'bitbake.org/layers'],
            correct: 2,
            explanation: 'layers.openembedded.org is the official layer index.',
          },
          {
            question: 'Best practice when modifying a recipe from another layer?',
            options: ['Edit it directly', 'Copy it to your layer', 'Use a .bbappend file', 'Delete the original'],
            correct: 2,
            explanation: 'Create a .bbappend in your own layer to keep the original untouched.',
          },
        ],
      },
      {
        id: 'recipe-extensions',
        title: 'Recipe Extensions (bbappend)',
        content: `
# Recipe Extensions (bbappend)

## Naming Rules

- \`example_0.1.bbappend\` applies to \`example_0.1.bb\`
- \`example_0.%.bbappend\` matches \`example_0.1.bb\`, \`example_0.2.bb\` (not \`example_1.0.bb\`)
- \`%\` only works just before \`.bbappend\`

## Adding New Files

\`\`\`bash
FILESEXTRAPATHS:prepend := "\\\${THISDIR}/files:"
\`\`\`

Prepending ensures your files take priority.

## Example

\`\`\`bash
# linux-yocto_6.12.bbappend
FILESEXTRAPATHS:prepend := "\\\${THISDIR}/files:"
SRC_URI += "file://defconfig file://fix.patch"
\`\`\`

## Modifying Tasks

\`\`\`bash
do_install:append() {
    install -d \\\${D}\\\${sysconfdir}
    install -m 0644 hello.conf \\\${D}\\\${sysconfdir}
}

# Machine-specific:
do_install:append:beaglebone() {
    install -m 0644 fw.bin \\\${D}\\\${nonarch_base_libdir}/firmware
}
\`\`\`
        `,
        quiz: [
          {
            question: 'What does % match in example_0.%.bbappend?',
            options: ['Any recipe named example', 'Versions starting with 0. but not 1.0', 'All versions', 'Only 0.0'],
            correct: 1,
            explanation: '% matches example_0.1.bb, example_0.2.bb, etc., but not example_1.0.bb.',
          },
          {
            question: 'Why prepend to FILESEXTRAPATHS rather than append?',
            options: ['Faster', 'Your files take priority over the original', 'Append is not allowed', 'Alphabetical ordering'],
            correct: 1,
            explanation: 'Prepending puts your paths first in the search order.',
          },
          {
            question: 'Which variable must be set when adding files in a bbappend?',
            options: ['SRC_URI', 'FILESEXTRAPATHS', 'FILESPATH', 'FILE_DIRNAME'],
            correct: 1,
            explanation: 'FILESEXTRAPATHS must be prepended so BitBake finds your new files.',
          },
          {
            question: 'How do you extend do_install in a bbappend?',
            options: ['do_install_extra()', 'override_install()', 'do_install:append() { ... }', 'do_install += "..."'],
            correct: 2,
            explanation: 'do_install:append() adds code after the original do_install.',
          },
          {
            question: 'What happens if a recipe updates but the bbappend does not?',
            options: ['Auto-updates', 'Build may fail or bbappend silently ignored', 'BitBake ignores mismatch', 'Old version always used'],
            correct: 1,
            explanation: 'Bbappend files should be version-specific; mismatches may cause failures.',
          },
        ],
      },
      {
        id: 'classes',
        title: 'Classes',
        content: `
# Classes

Reusable build logic shared across recipes. Extension: \`.bbclass\`

## Usage

\`\`\`bash
inherit autotools              # In a recipe
INHERIT += "buildhistory"      # In config (globally)
\`\`\`

## Common Classes

**base.bbclass** — Automatically inherited by every recipe. Defines default tasks, oe_runmake, mirrors.

**kernel.bbclass** — Builds kernels. Auto-applies defconfig. Provides virtual/kernel. Variables: KERNEL_IMAGETYPE, KERNEL_EXTRA_ARGS.

**autotools.bbclass** — Handles autotools projects. do_configure runs autoreconf. EXTRA_OECONF, EXTRA_OEMAKE.

**cmake.bbclass / meson.bbclass** — For CMake and Meson projects.

**useradd.bbclass** — Adds users/groups. Must define USERADD_PACKAGES, USERADD_PARAM.

**bin_package.bbclass** — For pre-built files (firmware). Disables do_configure and do_compile.

## Example

\`\`\`bash
LICENSE = "GPL-3.0-or-later"
LIC_FILES_CHKSUM = "file://COPYING;md5=..."
SRC_URI = "\\\${GNU_MIRROR}/hello/hello-\\\${PV}.tar.gz"
SRC_URI[sha256sum] = "..."
inherit autotools
\`\`\`
        `,
        quiz: [
          {
            question: 'Which class is automatically inherited by every recipe?',
            options: ['kernel.bbclass', 'autotools.bbclass', 'base.bbclass', 'core.bbclass'],
            correct: 2,
            explanation: 'base.bbclass is auto-inherited and provides default tasks.',
          },
          {
            question: 'How do you use a class in a recipe?',
            options: ['include <class>', 'inherit <class>', 'require <class>', 'import <class>'],
            correct: 1,
            explanation: 'Use "inherit classname" in recipes.',
          },
          {
            question: 'What does the autotools class do?',
            options: ['Downloads source', 'Runs autoreconf with cross-compilation arguments', 'Creates packages', 'Compiles kernels'],
            correct: 1,
            explanation: 'autotools runs autoreconf and configures with standard cross-compilation arguments.',
          },
          {
            question: 'What is bin_package.bbclass for?',
            options: ['Building from source', 'Installing pre-built binaries like firmware', 'Binary patches', 'Compiling utilities'],
            correct: 1,
            explanation: 'bin_package is for pre-built files — it disables do_configure and do_compile.',
          },
          {
            question: 'How to inherit a class globally?',
            options: ['inherit in local.conf', 'INHERIT += "class" in config', 'GLOBAL_CLASS = "class"', 'Add to bblayers.conf'],
            correct: 1,
            explanation: 'INHERIT += "classname" in a config file applies to all recipes.',
          },
          {
            question: 'What must be defined when using useradd class?',
            options: ['USER_LIST', 'USERADD_PACKAGES', 'ADDUSER_PARAMS', 'SYSTEM_USERS'],
            correct: 1,
            explanation: 'USERADD_PACKAGES specifies which packages need users/groups created.',
          },
        ],
      },
    ],
  },
  {
    id: 'image-customization',
    title: 'Image Customization',
    description: 'Master image recipes, kernel configuration, and flashable image creation.',
    icon: '🖼️',
    lessons: [
      {
        id: 'custom-images',
        title: 'Custom Images',
        content: `
# Custom Images

An image is the top-level recipe — architecture agnostic, inherits \`core-image\`, no LICENSE needed.

## Common Images

core-image-minimal, core-image-base, core-image-x11, core-image-weston, core-image-rt

## Key Variables

| Variable | Purpose |
|----------|---------|
| IMAGE_INSTALL | Packages to install |
| IMAGE_FEATURES | Features (allow-root-login, debug-tweaks, package-management) |
| IMAGE_FSTYPES | Output formats (ext4, squashfs, cpio, tar.bz2) |
| IMAGE_LINGUAS | Locales |
| IMAGE_PKGTYPE | Package format (deb/rpm/ipk) |
| IMAGE_POSTPROCESS_COMMAND | Post-process shell commands |
| EXTRA_IMAGEDEPENDS | Build but don't install (e.g. bootloader) |

## Generation Steps

1. Empty directory created
2. Packages from IMAGE_INSTALL installed via package manager
3. Image files generated per IMAGE_FSTYPES

## Package Groups

Recipes using \`packagegroup\` class: packagegroup-core-boot, packagegroup-core-tools-debug

## wic Tool

Creates partitioned flashable images from \`.wks\` layout files.

## Example

\`\`\`bash
SUMMARY = "Custom image"
IMAGE_INSTALL = "packagegroup-core-boot dropbear myapp"
IMAGE_LINGUAS = " "
inherit core-image
\`\`\`
        `,
        quiz: [
          {
            question: 'What class must an image recipe inherit?',
            options: ['image-base', 'rootfs', 'core-image', 'base'],
            correct: 2,
            explanation: 'Image recipes inherit core-image.',
          },
          {
            question: 'What variable defines which packages go into an image?',
            options: ['IMAGE_PACKAGES', 'RDEPENDS', 'IMAGE_INSTALL', 'PACKAGE_LIST'],
            correct: 2,
            explanation: 'IMAGE_INSTALL lists packages for the root filesystem.',
          },
          {
            question: 'What does IMAGE_FSTYPES control?',
            options: ['Partition table', 'Kernel drivers', 'Output image format(s)', 'Package manager'],
            correct: 2,
            explanation: 'IMAGE_FSTYPES specifies generated image formats.',
          },
          {
            question: 'What is a package group?',
            options: ['A directory', 'A recipe grouping related packages without installing files', 'A layer type', 'A config variable'],
            correct: 1,
            explanation: 'Package groups group packages by functionality.',
          },
          {
            question: 'What tool creates partitioned flashable images?',
            options: ['dd', 'mkfs', 'wic', 'parted'],
            correct: 2,
            explanation: 'wic creates flashable partitioned images using .wks layout files.',
          },
          {
            question: 'What does EXTRA_IMAGEDEPENDS do?',
            options: ['Adds packages to rootfs', 'Creates extra images', 'Builds recipes but does not install them in rootfs', 'Installs debug tools'],
            correct: 2,
            explanation: 'EXTRA_IMAGEDEPENDS builds recipes alongside the image without installing them.',
          },
        ],
      },
      {
        id: 'kernel-config',
        title: 'Kernel Configuration',
        content: `
# Kernel Configuration

## Selection

\`\`\`bash
PREFERRED_PROVIDER_virtual/kernel = "linux-yocto"
PREFERRED_VERSION_linux-yocto = "6.6%"
\`\`\`

## Configuration Fragments

\`\`\`bash
SRC_URI += "file://defconfig file://nand.cfg file://eth.cfg"
\`\`\`

## LINUX_KERNEL_TYPE

| Type | Description |
|------|-------------|
| standard | Default generic policy |
| tiny | Bare minimum for small kernels |
| preempt-rt | PREEMPT_RT patch |

## KERNEL_FEATURES

\`\`\`bash
KERNEL_FEATURES += "features/nunchuk.scc"
\`\`\`

## .scc Files

\`\`\`
define KFEATURE_DESCRIPTION "Nunchuk support"
kconf hardware nunchuk.cfg
patch nunchuk-driver.patch
\`\`\`

## kernel.bbclass

Auto-applies defconfig, provides virtual/kernel, splits into kernel/kernel-base/kernel-dev/kernel-modules. Key: KERNEL_IMAGETYPE (zImage), KERNEL_EXTRA_ARGS, INITRAMFS_IMAGE.
        `,
        quiz: [
          {
            question: 'What variable selects the kernel recipe?',
            options: ['KERNEL_PROVIDER', 'PREFERRED_PROVIDER_virtual/kernel', 'KERNEL_RECIPE', 'LINUX_KERNEL'],
            correct: 1,
            explanation: 'PREFERRED_PROVIDER_virtual/kernel selects the kernel recipe.',
          },
          {
            question: 'How to apply a kernel config fragment?',
            options: ['Place in kernel source', 'Add .cfg file to SRC_URI', 'Set in KERNEL_CONFIG', 'Use menuconfig'],
            correct: 1,
            explanation: 'linux-yocto auto-applies .cfg fragments from SRC_URI.',
          },
          {
            question: 'What does LINUX_KERNEL_TYPE = "tiny" do?',
            options: ['Compiles core only', 'Configures bare minimum kernel', 'Removes drivers', 'Strips debug symbols'],
            correct: 1,
            explanation: '"tiny" sets up a bare minimum configuration.',
          },
          {
            question: 'What file format describes kernel metadata features?',
            options: ['.cfg', '.patch', '.scc', '.bbclass'],
            correct: 2,
            explanation: '.scc files define kernel features with kconf and patch directives.',
          },
          {
            question: 'Which variable adds kernel features?',
            options: ['KERNEL_CONFIG', 'KERNEL_OPTIONS', 'KERNEL_FEATURES', 'KERNEL_MODULES'],
            correct: 2,
            explanation: 'KERNEL_FEATURES lists features to enable.',
          },
          {
            question: 'What does kernel class automatically provide?',
            options: ['Device tree compiler', 'The virtual/kernel virtual package', 'A bootloader', 'A root filesystem'],
            correct: 1,
            explanation: 'kernel.bbclass provides virtual/kernel for machine configs to select providers.',
          },
        ],
      },
    ],
  },
  {
    id: 'advanced-topics',
    title: 'Advanced Topics',
    description: 'Master devtool, SDK generation, and debugging techniques.',
    icon: '🔧',
    lessons: [
      {
        id: 'devtool',
        title: 'devtool',
        content: `
# devtool

Utilities for recipe integration and development.

## Start

| Command | Purpose |
|---------|---------|
| \`devtool add <recipe> <uri>\` | New recipe |
| \`devtool modify <recipe>\` | Modify existing |
| \`devtool upgrade -V <ver> <recipe>\` | Upgrade version |

## Working

\`\`\`bash
devtool edit-recipe myapp
devtool build myapp
devtool build-image core-image-minimal   # Image with devtool packages
\`\`\`

## Deploy & Update

\`\`\`bash
devtool deploy-target myapp root@192.168.1.100   # Upload via SSH
devtool update-recipe myapp                       # Generate patches from git commits
devtool reset myapp                               # Remove from devtool control
\`\`\`

Workspace at \`$BUILDDIR/workspace/\`. Sources managed by git — always commit changes.
        `,
        quiz: [
          {
            question: 'What does devtool add do?',
            options: ['Adds package to image', 'Creates new recipe from source URI', 'Adds layer', 'Installs on host'],
            correct: 1,
            explanation: 'devtool add creates a new recipe from a source URI.',
          },
          {
            question: 'Where is the devtool workspace?',
            options: ['$BUILDDIR/tmp/', '$BUILDDIR/workspace/', '/opt/devtool/', '~/.devtool/'],
            correct: 1,
            explanation: 'devtool workspace is at $BUILDDIR/workspace/.',
          },
          {
            question: 'What does devtool deploy-target do?',
            options: ['Builds recipe', 'Pushes to git', 'Uploads packages to running target via SSH', 'Deploys to SD card'],
            correct: 2,
            explanation: 'deploy-target uploads packages to a live target via SSH.',
          },
          {
            question: 'How to generate patches from local changes?',
            options: ['devtool create-patch', 'devtool diff', 'devtool update-recipe', 'devtool export'],
            correct: 2,
            explanation: 'devtool update-recipe generates patches from git commits.',
          },
          {
            question: 'What does devtool reset do?',
            options: ['Resets build dir', 'Clears sstate', 'Removes recipe from devtool control', 'Deletes workspace'],
            correct: 2,
            explanation: 'reset reverts to standard layers and sources.',
          },
          {
            question: 'What does devtool build-image do?',
            options: ['Builds only devtool recipes', 'Creates dev ISO', 'Builds image including devtool recipe packages', 'Rebuilds base image'],
            correct: 2,
            explanation: 'build-image includes devtool workspace recipes in the image.',
          },
        ],
      },
      {
        id: 'sdk-generation',
        title: 'SDK Generation',
        content: `
# SDK Generation

Self-contained cross-compilation environment — no Poky required.

## Two Types

| Type | Command | Use Case |
|------|---------|----------|
| Generic | \`bitbake meta-toolchain\` | Bootloader/kernel dev |
| Image-based | \`bitbake -c populate_sdk <image>\` | Application dev |

Output: self-extracting script in \`$BUILDDIR/tmp/deploy/sdk/\`. Default install: \`/opt/poky/<version>\`

## Adding Packages

\`\`\`bash
TOOLCHAIN_TARGET_TASK:append = " libssl-dev"
TOOLCHAIN_HOST_TASK:append = " nativesdk-curl"
\`\`\`

## Environment Variables

CC, CFLAGS, CXX, CXXFLAGS, LD, LDFLAGS, ARCH, CROSS_COMPILE, GDB, OBJDUMP

## Usage

\`\`\`bash
source /opt/poky/4.0/environment-setup-cortexa57-poky-linux
$CC -o myapp myapp.c
\`\`\`
        `,
        quiz: [
          {
            question: 'What are the two types of Yocto SDKs?',
            options: ['Debug and release', 'Generic SDK and image-based SDK', 'Host and target', 'Standard and extensible'],
            correct: 1,
            explanation: 'Generic (meta-toolchain) and image-based (populate_sdk).',
          },
          {
            question: 'How to generate an image-based SDK?',
            options: ['bitbake sdk <image>', 'devtool build-sdk', 'bitbake -c populate_sdk <image>', 'bitbake -c sdk'],
            correct: 2,
            explanation: '"bitbake -c populate_sdk <image>" generates an image-based SDK.',
          },
          {
            question: 'What variable adds target packages to SDK?',
            options: ['SDK_PACKAGES', 'IMAGE_INSTALL', 'TOOLCHAIN_TARGET_TASK', 'DEPENDS'],
            correct: 2,
            explanation: 'TOOLCHAIN_TARGET_TASK controls target packages in the SDK.',
          },
          {
            question: 'Where is the generated SDK script?',
            options: ['$BUILDDIR/sdk/', '$BUILDDIR/tmp/deploy/sdk/', '/opt/poky/sdk/', 'tmp/deploy/images/'],
            correct: 1,
            explanation: 'SDK scripts are in $BUILDDIR/tmp/deploy/sdk/.',
          },
          {
            question: 'What does the generic SDK primarily provide?',
            options: ['Full app development env', 'Cross-compilation toolchain for bootloader/kernel dev', 'Target emulator', 'Package repository'],
            correct: 1,
            explanation: 'Generic SDK provides a cross-compilation toolchain for low-level development.',
          },
          {
            question: 'What SDK env variable is for kernel compilation?',
            options: ['KERNEL_CC', 'TARGET_PREFIX', 'CROSS_COMPILE', 'BUILD_CC'],
            correct: 2,
            explanation: 'CROSS_COMPILE is used by the kernel build system.',
          },
        ],
      },
      {
        id: 'debugging',
        title: 'Debugging',
        content: `
# Debugging

## Log and Run Files

In recipe temp directory: \`run.do_<task>\` (generated script), \`log.do_<task>\` (output)

## bitbake-getvar

\`\`\`bash
bitbake-getvar IMAGE_INSTALL          # Global
bitbake-getvar -r ncurses SRC_URI     # Per-recipe
\`\`\`

## Build History

\`\`\`bash
INHERIT += "buildhistory"
BUILDHISTORY_COMMIT = "1"
\`\`\`
Use \`buildhistory-diff\` to compare builds.

## oe-pkgdata-util

\`\`\`bash
oe-pkgdata-util find-path /bin/busybox     # Which package?
oe-pkgdata-util list-pkg-files busybox     # What files?
oe-pkgdata-util lookup-recipe busybox      # Which recipe?
\`\`\`

## Source Fetching Order

DL_DIR -> PREMIRRORS -> upstream SRC_URI -> MIRRORS
        `,
        quiz: [
          {
            question: 'What file has the compile task output log?',
            options: ['compile.log', 'output.do_compile', 'log.do_compile', 'build.log'],
            correct: 2,
            explanation: 'Task logs are log.do_<taskname>.',
          },
          {
            question: 'What does oe-pkgdata-util find-path /bin/busybox show?',
            options: ['Source path', 'Which package ships /bin/busybox', 'Recipe path', 'Build directory'],
            correct: 1,
            explanation: 'find-path shows which package ships a file.',
          },
          {
            question: 'How to enable build history?',
            options: ['BUILDHISTORY = "1"', 'bitbake --history', 'INHERIT += "buildhistory"', 'enable-history in bblayers.conf'],
            correct: 2,
            explanation: 'Add INHERIT += "buildhistory" to local.conf.',
          },
          {
            question: 'Source fetching order?',
            options: ['SRC_URI -> MIRRORS -> DL_DIR', 'PREMIRRORS -> SRC_URI -> DL_DIR', 'DL_DIR -> PREMIRRORS -> SRC_URI -> MIRRORS', 'MIRRORS -> PREMIRRORS -> DL_DIR'],
            correct: 2,
            explanation: 'DL_DIR first, then PREMIRRORS, upstream SRC_URI, then MIRRORS.',
          },
          {
            question: 'What does run.do_compile contain?',
            options: ['Compiler binary', 'Source list', 'The generated script executed for compile', 'Error messages'],
            correct: 2,
            explanation: 'run.do_<task> contains the shell script BitBake executed.',
          },
          {
            question: 'How to dump a recipe-specific variable?',
            options: ['bitbake --show-var', 'echo $VAR', 'bitbake-getvar -r <recipe> <VAR>', 'bitbake -D'],
            correct: 2,
            explanation: 'bitbake-getvar -r inspects per-recipe variable values.',
          },
        ],
      },
    ],
  },
  {
    id: 'variables-overrides',
    title: 'Variables & Overrides',
    description: 'Understand variable operators and the overrides system for conditional configuration.',
    icon: '🔤',
    lessons: [
      {
        id: 'variable-operators',
        title: 'Variable Operators',
        content: `
# Variable Operators

Variables: uppercase, values are strings. Global scope in .conf, local scope in .bb/.bbappend/.bbclass.

## Operators

| Operator | Behavior |
|----------|----------|
| \`=\` | Expansion when variable is used |
| \`:=\` | Immediate expansion at parse time |
| \`+=\` | Append with space |
| \`=+\` | Prepend with space |
| \`.=\` | Append without space |
| \`=.\` | Prepend without space |
| \`?=\` | Default (only if not set) |
| \`??=\` | Weak default (even lower priority than ?=) |

## Deferred vs Immediate

\`\`\`bash
# With = (deferred):
COLOUR = "blue"
SKY = "\\\${COLOUR}"
COLOUR = "grey"
# SKY -> "grey"

# With := (immediate):
COLOUR = "blue"
SKY := "\\\${COLOUR}"
COLOUR = "grey"
# SKY -> "blue"
\`\`\`

## Caveat

\`\`\`bash
VAR ?= "a"; VAR += "b"  # Result: "a b"
VAR += "b"; VAR ?= "a"  # Result: " b" (?= ignored)
\`\`\`

**Best practice:** Avoid +=, =+, .=, =. in local.conf — use overrides instead.
        `,
        quiz: [
          {
            question: 'What does ?= do?',
            options: ['Forces assignment', 'Assigns only if not already set', 'Locks variable', 'Conditional append'],
            correct: 1,
            explanation: '?= only assigns if the variable has not been set yet.',
          },
          {
            question: 'Difference between += and .= ?',
            options: ['+= is faster', '+= only in recipes', '+= adds space, .= does not', 'No difference'],
            correct: 2,
            explanation: '+= appends with a space, .= concatenates directly.',
          },
          {
            question: 'When does := expand?',
            options: ['When used', 'Immediately at parse time', 'At build time', 'During fetch'],
            correct: 1,
            explanation: ':= resolves references immediately at parse time.',
          },
          {
            question: 'Result of VAR = "hello" then VAR += "world"?',
            options: ['"helloworld"', '"hello world"', '"world hello"', 'Error'],
            correct: 1,
            explanation: '+= appends with a space: "hello world".',
          },
          {
            question: 'Why avoid += in local.conf?',
            options: ['Slower', 'Deprecated', 'Parsing order unpredictable, causes unexpected values', 'Only works in recipes'],
            correct: 2,
            explanation: 'Parsing order is unpredictable in config files; use :append/:prepend instead.',
          },
          {
            question: 'How does ??= differ from ?=?',
            options: ['Assigns twice', 'Same as ?=', 'Only assigns if not set by any operator including ?=', 'Forces assignment'],
            correct: 2,
            explanation: '??= has lower priority than ?= — only effective if nothing else set the variable.',
          },
        ],
      },
      {
        id: 'overrides-system',
        title: 'Overrides System',
        content: `
# Overrides System

Overrides modify variables at **expansion time** (when read) — predictable unlike parse-time operators.

## :append, :prepend, :remove

\`\`\`bash
IMAGE_INSTALL:append = " dropbear"     # Note leading space!
PATH:prepend = "/new/path:"
IMAGE_INSTALL:remove = "i2c-tools"     # Removes all occurrences
\`\`\`

## Conditional Overrides

\`\`\`bash
KERNEL_DEVICETREE:beaglebone = "am335x-bone.dtb"  # Only for beaglebone
\`\`\`

## Combining

\`\`\`bash
IMAGE_INSTALL:append:beaglebone = " i2c-tools"  # Append only for beaglebone
\`\`\`

## Application Order

1. Regular operators (parsing order)
2. :append
3. :prepend
4. :remove

## Syntax Change (Honister 3.4)

Old: \`IMAGE_INSTALL_append\` -> New: \`IMAGE_INSTALL:append\` (no retrocompatibility)
        `,
        quiz: [
          {
            question: 'What does IMAGE_INSTALL:append = " dropbear" do?',
            options: ['Replaces IMAGE_INSTALL', 'Adds " dropbear" at expansion time', 'Creates new variable', 'Only during fetch'],
            correct: 1,
            explanation: ':append adds to the end of the variable when it is read.',
          },
          {
            question: 'Why the leading space in :append = " dropbear"?',
            options: ['Syntax requirement', ':append does not add space automatically', 'Space is ignored', 'Prevents duplicates'],
            correct: 1,
            explanation: ':append concatenates directly — you must include your own separator.',
          },
          {
            question: 'What does :remove do?',
            options: ['Removes variable entirely', 'Removes first occurrence', 'Removes all occurrences of value', 'Removes from OVERRIDES'],
            correct: 2,
            explanation: ':remove filters out all occurrences.',
          },
          {
            question: 'How to set a variable only for beaglebone?',
            options: ['VAR_beaglebone', 'if MACHINE==beaglebone', 'VAR:beaglebone = "value"', 'VAR[beaglebone]'],
            correct: 2,
            explanation: 'Use colon syntax: VAR:beaglebone = "value".',
          },
          {
            question: 'Override application order?',
            options: [':remove first', ':prepend first', 'Operators, :append, :prepend, :remove', 'All simultaneous'],
            correct: 2,
            explanation: 'Regular operators first, then :append, :prepend, :remove.',
          },
          {
            question: 'What changed at Honister (3.4)?',
            options: ['Overrides removed', 'Underscores replaced with colons', 'Colons replaced with underscores', 'New OVERRIDES variable'],
            correct: 1,
            explanation: '_append became :append with no backward compatibility.',
          },
        ],
      },
    ],
  },
  {
    id: 'bsp-distro-layers',
    title: 'BSP & Distro Layers',
    description: 'Configure hardware support and distribution policies.',
    icon: '🏗️',
    lessons: [
      {
        id: 'bsp-layers',
        title: 'BSP Layers',
        content: `
# BSP Layers

Hold metadata to support specific hardware. Named \`meta-<bsp_name>\`.

## Provide

- Machine config files (conf/machine/*.conf)
- Custom kernel/bootloader recipes
- Hardware drivers and modules
- Pre-built firmware

## Machine Configuration

Filename = MACHINE value. Key variables:

| Variable | Purpose | Example |
|----------|---------|---------|
| TARGET_ARCH | Architecture | arm, aarch64 |
| PREFERRED_PROVIDER_virtual/kernel | Default kernel | linux-yocto |
| MACHINE_FEATURES | Hardware features | usbgadget usbhost wifi |
| SERIAL_CONSOLES | Console speed;device | 115200;ttyS0 |
| KERNEL_IMAGETYPE | Kernel format | zImage |

## U-Boot Variables

SPL_BINARY, UBOOT_SUFFIX, UBOOT_MACHINE, UBOOT_ENTRYPOINT, UBOOT_LOADADDRESS

## Example

\`\`\`bash
# conf/machine/mymachine.conf
PREFERRED_PROVIDER_virtual/kernel ?= "linux-custom"
KERNEL_IMAGETYPE = "zImage"
SERIAL_CONSOLES = "115200;ttyAMA0"
MACHINE_FEATURES = "usbgadget usbhost vfat"
\`\`\`
        `,
        quiz: [
          {
            question: 'Where are machine configs in a BSP layer?',
            options: ['recipes-bsp/', 'conf/machine/*.conf', 'conf/distro/', 'conf/layer.conf'],
            correct: 1,
            explanation: 'Machine configs are at conf/machine/*.conf.',
          },
          {
            question: 'What does MACHINE_FEATURES define?',
            options: ['Software packages', 'Hardware features provided by the machine', 'Kernel modules', 'Build capabilities'],
            correct: 1,
            explanation: 'MACHINE_FEATURES lists hardware capabilities like usbgadget, wifi, screen.',
          },
          {
            question: 'BSP layer naming convention?',
            options: ['bsp-<name>', 'meta-<bsp_name>', 'layer-<bsp>', '<bsp>-meta'],
            correct: 1,
            explanation: 'BSP layers use meta-<bsp_name> naming.',
          },
          {
            question: 'What does SERIAL_CONSOLES configure?',
            options: ['Serial drivers', 'Console speed and device for getty', 'Debug output', 'Kernel parameters'],
            correct: 1,
            explanation: 'SERIAL_CONSOLES sets baud rate and device (e.g. 115200;ttyS0).',
          },
          {
            question: 'What variable sets kernel image format?',
            options: ['KERNEL_FORMAT', 'KERNEL_IMAGETYPE', 'IMAGE_TYPE', 'KERNEL_OUTPUT'],
            correct: 1,
            explanation: 'KERNEL_IMAGETYPE defines the format (zImage, Image, etc.).',
          },
          {
            question: 'What does UBOOT_MACHINE specify?',
            options: ['Machine name', 'U-Boot build config target', 'Boot partition', 'Kernel command line'],
            correct: 1,
            explanation: 'UBOOT_MACHINE is the make target for U-Boot configuration.',
          },
        ],
      },
      {
        id: 'distro-config',
        title: 'Distro Configuration',
        content: `
# Distro Configuration

Defines software policies: init system, C library, display system.

## Config File

\`\`\`bash
# conf/distro/mydistro.conf
require conf/distro/poky.conf
DISTRO = "mydistro"
DISTRO_NAME = "My Distribution"
DISTRO_VERSION = "1.0"
\`\`\`

## DISTRO_FEATURES

\`\`\`bash
DISTRO_FEATURES = "bluetooth wifi systemd usrmerge"
\`\`\`

COMBINED_FEATURES = intersection of MACHINE_FEATURES and DISTRO_FEATURES.

## Toolchain

\`\`\`bash
TCMODE = "default"   # Includes tcmode-\\\${TCMODE}.inc
\`\`\`

## Templates

Sample files in meta-poky/conf/templates/default/. TEMPLATECONF variable points to template directory. \`bitbake-layers save-build-conf\` saves current config.

**Best practice:** Keep distro layer separate from BSP and custom layers.
        `,
        quiz: [
          {
            question: 'Where is a distro config file?',
            options: ['conf/machine/', 'conf/distro/<distro>.conf', 'conf/layer.conf', 'local.conf'],
            correct: 1,
            explanation: 'Distro configs are at conf/distro/<distro>.conf.',
          },
          {
            question: 'What does DISTRO_FEATURES control?',
            options: ['Hardware capabilities', 'Software features the distribution enables', 'Kernel modules', 'Package versions'],
            correct: 1,
            explanation: 'DISTRO_FEATURES lists software features like bluetooth, systemd.',
          },
          {
            question: 'What is COMBINED_FEATURES?',
            options: ['All features combined', 'Intersection of MACHINE_FEATURES and DISTRO_FEATURES', 'User-defined features', 'Optional features'],
            correct: 1,
            explanation: 'Features present in both MACHINE_FEATURES and DISTRO_FEATURES.',
          },
          {
            question: 'What does TCMODE control?',
            options: ['Build mode', 'Toolchain selection', 'Test config', 'Task count'],
            correct: 1,
            explanation: 'TCMODE selects the toolchain configuration.',
          },
          {
            question: 'What does TEMPLATECONF do?',
            options: ['Configures recipe templates', 'Points to directory with config templates', 'Sets template variables', 'Defines distro templates'],
            correct: 1,
            explanation: 'TEMPLATECONF points to sample config files for new build directories.',
          },
          {
            question: 'Best practice for distro layers?',
            options: ['Combine with BSP', 'Keep separate from BSP and custom layers', 'Always inherit Poky', 'Put in local.conf'],
            correct: 1,
            explanation: 'Keep the distro layer separate for cleaner organization.',
          },
        ],
      },
    ],
  },
  {
    id: 'licensing-compliance',
    title: 'Licensing & Compliance',
    description: 'Manage licenses, track compliance, and generate SBoMs.',
    icon: '📜',
    lessons: [
      {
        id: 'license-management',
        title: 'License Management',
        content: `
# License Management

## LICENSE Variable

Uses SPDX identifiers: GPL-2.0-only, MIT, BSD-3-Clause, Apache-2.0, etc.

## LIC_FILES_CHKSUM

Mandatory (unless LICENSE = "CLOSED"). Tracks license integrity:

\`\`\`bash
LIC_FILES_CHKSUM = "file://COPYING;md5=abc..."
LIC_FILES_CHKSUM = "file://main.c;beginline=3;endline=21;md5=..."
LIC_FILES_CHKSUM = "file://\\\${COMMON_LICENSE_DIR}/MIT;md5=..."
\`\`\`

If checksum changes -> build fails -> forces review.

## Excluding Licenses

\`\`\`bash
INCOMPATIBLE_LICENSE = "GPL-3.0* LGPL-3.0* AGPL-3.0*"
\`\`\`

## Commercial Licenses

\`\`\`bash
# In recipe: LICENSE_FLAGS = "commercial"
# In local.conf: LICENSE_FLAGS_ACCEPTED = "commercial_gst-plugins-ugly"
\`\`\`

## License Manifest

At \`$BUILDDIR/tmp/deploy/licenses/<image>/license.manifest\`

## Source Archiver

\`\`\`bash
INHERIT += "archiver"
ARCHIVER_MODE[src] = "configured"
\`\`\`
        `,
        quiz: [
          {
            question: 'What format does LICENSE use?',
            options: ['Custom Yocto', 'SPDX identifiers', 'GPL shorthand', 'Numerical codes'],
            correct: 1,
            explanation: 'LICENSE uses standardized SPDX identifiers.',
          },
          {
            question: 'What if a license checksum changes?',
            options: ['Warning only', 'Build fails, recipe must be updated', 'Auto-updated', 'Package excluded'],
            correct: 1,
            explanation: 'Build fails, forcing review and acknowledgment.',
          },
          {
            question: 'How to exclude GPLv3 packages?',
            options: ['EXCLUDE_LICENSE', 'BANNED_LICENSE', 'INCOMPATIBLE_LICENSE = "GPL-3.0*"', 'NO_GPL3 = "1"'],
            correct: 2,
            explanation: 'Use INCOMPATIBLE_LICENSE with SPDX patterns.',
          },
          {
            question: 'What does LICENSE_FLAGS = "commercial" mean?',
            options: ['Package is free', 'Requires payment', 'Must be explicitly accepted to build', 'Proprietary only'],
            correct: 2,
            explanation: 'Commercial packages must be listed in LICENSE_FLAGS_ACCEPTED.',
          },
          {
            question: 'Where is the license manifest?',
            options: ['conf/licenses.txt', '$BUILDDIR/tmp/deploy/licenses/<image>/license.manifest', 'tmp/deploy/images/', 'meta/licenses/'],
            correct: 1,
            explanation: 'License manifest is at tmp/deploy/licenses/<image>/license.manifest.',
          },
          {
            question: 'What does the archiver class do?',
            options: ['Compresses images', 'Generates source tarballs for license compliance', 'Creates binary archives', 'Manages git repos'],
            correct: 1,
            explanation: 'Archiver generates source tarballs for GPL compliance.',
          },
        ],
      },
      {
        id: 'spdx-sbom',
        title: 'SPDX & Software Bill of Materials',
        content: `
# SPDX & Software Bill of Materials

## What SBoM Describes

Sources, licenses, dependencies, and vulnerability fixes for all components. Standard SPDX format.

## Why It Matters

- License compliance assessment
- Vulnerability assessment (CVEs)
- Supply chain security (increasingly mandated by governments)

## Enabling SPDX 3.0

\`\`\`bash
INHERIT += "create-spdx-3.0"
INHERIT:remove = "create-spdx"
\`\`\`

Output: JSON in \`tmp/deploy/images/MACHINE/\`

## Optional Variables

| Variable | Purpose |
|----------|---------|
| SPDX_PRETTY | Human-readable formatting |
| SPDX_ARCHIVE_PACKAGED | Archives of packaged files |
| SPDX_INCLUDE_SOURCES | Source file descriptions |
| SPDX_ARCHIVE_SOURCES | Source archives |
        `,
        quiz: [
          {
            question: 'What does SPDX SBoM describe?',
            options: ['Only licenses', 'Sources, licenses, dependencies, and vulnerability fixes', 'Only source locations', 'Only binary hashes'],
            correct: 1,
            explanation: 'SBoM comprehensively describes sources, licenses, dependencies, and changes.',
          },
          {
            question: 'How to enable SPDX 3.0?',
            options: ['SPDX_VERSION = "3.0"', 'INHERIT += "create-spdx-3.0"', 'enable-spdx3', 'bitbake --spdx'],
            correct: 1,
            explanation: 'Add INHERIT += "create-spdx-3.0" and remove the default 2.2.',
          },
          {
            question: 'Where is SPDX output?',
            options: ['tmp/deploy/licenses/', 'tmp/deploy/images/MACHINE/', 'conf/spdx/', 'sstate-cache/'],
            correct: 1,
            explanation: 'JSON SPDX output is in tmp/deploy/images/MACHINE/.',
          },
          {
            question: 'What does SPDX_PRETTY do?',
            options: ['Human-readable formatting', 'PDF report', 'Color output', 'Web dashboard'],
            correct: 0,
            explanation: 'SPDX_PRETTY adds formatting for readability.',
          },
          {
            question: 'Why are SBoMs increasingly important?',
            options: ['Replace licenses', 'Speed up builds', 'Governments mandate supply chain transparency', 'Required by BitBake'],
            correct: 2,
            explanation: 'SBoMs support mandatory supply chain security requirements.',
          },
        ],
      },
    ],
  },
  {
    id: 'package-management-automation',
    title: 'Package Management & Automation',
    description: 'Runtime package management and build automation with kas and repo.',
    icon: '📦',
    lessons: [
      {
        id: 'runtime-package-management',
        title: 'Runtime Package Management',
        content: `
# Runtime Package Management

Binary packages can be used for runtime updates on the target.

## Package Format

\`\`\`bash
PACKAGE_CLASSES = "package_ipk"   # or package_rpm, package_deb
\`\`\`

Poky defaults to RPM, OE-Core defaults to IPK.

## Enabling on Target

Add \`package-management\` to IMAGE_FEATURES, or manually add \`opkg\` to IMAGE_INSTALL.

## opkg Commands

| Command | Purpose |
|---------|---------|
| opkg update | Fetch package databases |
| opkg list | List available packages |
| opkg install <pkg> | Install package |
| opkg upgrade | Upgrade all |

## Package Server

Serve via HTTP. Configure feeds:

\`\`\`bash
PACKAGE_FEED_URIS = "http://packages.example.net"
PACKAGE_FEED_BASE_PATHS = "ipk"
PACKAGE_FEED_ARCHS = "all armv7a beaglebone"
\`\`\`

**Important:** Run \`bitbake package-index\` after building new packages (run alone, not with other targets).
        `,
        quiz: [
          {
            question: 'What controls the package format?',
            options: ['PACKAGE_FORMAT', 'IMAGE_PKGTYPE', 'PACKAGE_CLASSES', 'PKG_TYPE'],
            correct: 2,
            explanation: 'PACKAGE_CLASSES controls format: package_rpm, package_deb, package_ipk.',
          },
          {
            question: 'What updates the package DB on target?',
            options: ['opkg refresh', 'opkg update', 'opkg sync', 'opkg fetch'],
            correct: 1,
            explanation: 'opkg update fetches package databases from remote servers.',
          },
          {
            question: 'Why run bitbake package-index?',
            options: ['Compile packages', 'Install on target', 'Update package database after building new packages', 'Generate rootfs'],
            correct: 2,
            explanation: 'package-index regenerates the database that opkg uses.',
          },
          {
            question: 'Three supported package formats?',
            options: ['TAR, ZIP, PKG', 'RPM, DEB, IPK', 'RPM, APK, DEB', 'IPK, APK, TAR'],
            correct: 1,
            explanation: 'Yocto supports RPM, DEB, and IPK.',
          },
          {
            question: 'How to add package management to an image?',
            options: ['Install opkg after boot', 'Add package-management to IMAGE_FEATURES', 'PACKAGE_MANAGER=true', 'Add to DISTRO_FEATURES'],
            correct: 1,
            explanation: '"package-management" in IMAGE_FEATURES installs package tools on target.',
          },
          {
            question: 'What does PACKAGE_FEED_URIS configure?',
            options: ['Local dirs', 'URL(s) where target fetches packages', 'Build order', 'Signing keys'],
            correct: 1,
            explanation: 'PACKAGE_FEED_URIS defines package server URLs for the target.',
          },
        ],
      },
      {
        id: 'automation-kas-repo',
        title: 'Automating with kas & repo',
        content: `
# Automating with kas & repo

OE/BitBake leaves code distribution and release management to external tools.

## Google repo

Manages multiple git repos with an XML manifest:

\`\`\`bash
repo init -u https://git.example.net/manifest.git
repo sync -j4
\`\`\`

Release: set revisions to commit hashes in manifest and tag it.

## kas

By Siemens — single command to fetch, configure, and build:

\`\`\`yaml
header:
  version: 8
  machine: mymachine
  distro: mydistro
target:
  - myimage
repos:
  meta-custom:
  openembedded-core:
    url: "https://git.openembedded.org/openembedded-core"
    branch: scarthgap
    layers:
      meta:
\`\`\`

\`\`\`bash
kas build meta-custom/mymachine.yaml
kas shell config.yml -c 'bitbake myapp'
\`\`\`

## Comparison

| Feature | repo | kas |
|---------|------|-----|
| Config | XML manifest | YAML/JSON |
| Sets up local.conf | No | Yes |
| Docker support | No | Yes |
| Build integration | Fetch only | Fetch + build |
        `,
        quiz: [
          {
            question: 'What does kas do?',
            options: ['Manages git only', 'Fetches, configures, and builds from a single config', 'Replaces BitBake', 'Installs SDKs'],
            correct: 1,
            explanation: 'kas automates the entire fetch-configure-build workflow.',
          },
          {
            question: 'What config format does kas use?',
            options: ['XML', 'YAML or JSON', 'INI', 'TOML'],
            correct: 1,
            explanation: 'kas uses YAML or JSON configuration files.',
          },
          {
            question: 'Command to build with kas?',
            options: ['kas run', 'kas make', 'kas build <config.yaml>', 'kas compile'],
            correct: 2,
            explanation: '"kas build <config.yaml>" does the full build.',
          },
          {
            question: 'What is Google repo for in Yocto?',
            options: ['Building images', 'Managing multiple git repos with a manifest', 'Running BitBake', 'Creating recipes'],
            correct: 1,
            explanation: 'repo manages multiple git repositories using an XML manifest.',
          },
          {
            question: 'Reproducible release with repo?',
            options: ['Use branch names', 'Set revision to commit hashes and tag manifest', 'Freeze sstate', 'Export env variables'],
            correct: 1,
            explanation: 'Pin each project to a commit hash in the manifest, then tag it.',
          },
          {
            question: 'kas advantage over manual setup?',
            options: ['Faster compilation', 'Better cross-compilation', 'Single command to fetch, configure, and build', 'Smaller images'],
            correct: 2,
            explanation: 'kas automates the entire workflow with one command.',
          },
        ],
      },
    ],
  },
];

export default modules;
