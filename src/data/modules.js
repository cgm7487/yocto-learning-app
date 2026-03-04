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

> **Important:** Yocto is **NOT** a Linux distribution — it *creates* custom ones. Think of it as a "distribution factory" that produces tailor-made Linux systems.

## The Problem Yocto Solves

When building an embedded Linux product (a smart camera, industrial controller, or in-vehicle infotainment), you face a fundamental challenge: how do you assemble a complete, optimized Linux system that contains **exactly** what your hardware needs and **nothing more**?

- A desktop distro like Ubuntu ships thousands of packages you don't need, wastes storage, increases attack surface, and slows boot time.
- Compiling everything by hand is error-prone — dependency management becomes a nightmare, and your builds are not reproducible.

Yocto solves this by providing a **metadata-driven build system** where you describe *what* you want, and the tooling figures out *how* to build it, from source, for your specific hardware.

## Approaches to Embedded Linux

| Approach | Pros | Cons |
|----------|------|------|
| **Build manually** | Full flexibility | Dependency hell, not reproducible, extremely time-consuming |
| **Binary distro** (Debian, Ubuntu) | Easy to start, rich ecosystem | Hard to customize/optimize, large images, native compilation (slow), harder to maintain long-term |
| **Build systems** (Yocto, Buildroot) | Nearly full flexibility, reproducible, cross-compilation | Longer initial build time, steeper learning curve |

### When to Use Each Approach

- **Prototype or proof of concept** — A binary distro (e.g., Raspberry Pi OS) gets you running fast.
- **Mass production with long lifecycle** — Yocto provides reproducibility, security updates, and license compliance.
- **Simple single-purpose device** — Buildroot may suffice if you don't need runtime package management.
- **Complex multi-team product** — Yocto's layer system enables parallel development across BSP, middleware, and application teams.

## Yocto's Key Principle

Yocto **always builds binary packages** (rpm, deb, or ipk) first, then generates the root filesystem from that package feed. This is different from Buildroot which directly populates a root filesystem.

This package-first approach enables:
- **Runtime updates** — Ship package updates to deployed devices via opkg/apt/dnf.
- **Dependency tracking** — Packages declare what they need, preventing missing-library issues.
- **Selective installation** — Different image recipes can pick different subsets from the same package feed.

## Yocto vs Buildroot

| Aspect | Yocto | Buildroot |
|--------|-------|-----------|
| Output | Complete distribution with binary packages | Root filesystem image only |
| Complexity | Powerful but steep learning curve | Much simpler, kconfig-based |
| Package management | Yes (rpm, deb, ipk) | No |
| Incremental builds | Yes (shared state cache) | Limited (per-package rebuild) |
| Layer system | Yes (modular, team-friendly) | No (single tree) |
| Typical build time | 1-4 hours (first build) | 15-60 minutes |
| Community layers | 300+ on layers.openembedded.org | Fewer external packages |

## What Yocto Provides

1. **Poky** — the reference build system (BitBake + OpenEmbedded-Core + reference distro)
2. **BitBake** — the task execution engine (written in Python, similar to make but for distributions)
3. **OpenEmbedded-Core (OE-Core)** — the core metadata (recipes for gcc, glibc, busybox, systemd, etc.)
4. **Board Support Packages (BSPs)** — hardware configurations for reference boards
5. **Documentation** — comprehensive mega-manual, quick-start guide, and development manual
6. **Tools** — devtool (rapid development), recipetool (recipe generation), wic (image creation)

## Why Use Yocto?

| Benefit | Description |
|---------|-------------|
| **Customization** | Build exactly what you need — a minimal image can be as small as 5 MB |
| **Reproducibility** | Same inputs always produce the same outputs (critical for certification and auditing) |
| **Cross-platform** | ARM, x86, MIPS, PowerPC, RISC-V and more from a single host machine |
| **Industry standard** | Used by automotive (AGL), industrial (Siemens), consumer electronics (Samsung) |
| **Community** | 300+ layers, thousands of recipes, active mailing lists and IRC |
| **License compliance** | Built-in license tracking, manifest generation, and source archiving |
| **Long-term support** | LTS releases with 2+ years of security patches |

## How the Build Pipeline Works

\`\`\`
Source Code + Metadata (Recipes)
        |
        v
   [ BitBake ]  -- parses recipes, resolves dependencies, schedules tasks
        |
        v
  fetch -> unpack -> patch -> configure -> compile -> install -> package
        |
        v
   Binary Packages (rpm / deb / ipk)
        |
        v
   Root Filesystem Image (ext4 / squashfs / wic)
\`\`\`

Each step in the pipeline is a **task** (e.g., \`do_fetch\`, \`do_compile\`). BitBake tracks dependencies between tasks across all recipes and runs them in the correct order, parallelizing where possible.

## Release Cycle

Yocto releases roughly every 6 months. Each release has a code name:

| Release | Code Name | Year |
|---------|-----------|------|
| 4.0 | Kirkstone (LTS) | 2022 |
| 4.3 | Nanbield | 2023 |
| 5.0 | Scarthgap (LTS) | 2024 |
| 5.1 | Styhead | 2024 |

**LTS releases** receive security and bug-fix updates for at least 2 years. For production products, always choose an LTS release.

## Real-World Industry Usage

- **Automotive**: Automotive Grade Linux (AGL) is built on Yocto — used by Toyota, Honda, Mercedes.
- **Networking**: Switches, routers, and firewalls from Cisco, Juniper use Yocto-based firmware.
- **Industrial**: Siemens uses Yocto for factory automation controllers.
- **Consumer**: Smart TVs, set-top boxes, and home automation gateways.
- **Aerospace**: Flight computers and ground systems for satellites.
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

Understanding these terms is essential — they form the vocabulary used in all Yocto documentation, mailing lists, and team discussions.

## Poky — Multiple Meanings

The word "Poky" is used in three different contexts, which often confuses beginners:

1. **Poky (git repo)** — The main repository you clone. It bundles bitbake, openembedded-core, documentation, and the reference distro. This is your starting point.
2. **poky (distro)** — The reference distribution configuration. When you see \`DISTRO = "poky"\` in local.conf, it's selecting this distro policy.
3. **meta-poky (layer)** — The layer within the Poky repo that provides the "poky" distro configuration files.

> **Tip:** When someone says "clone Poky," they mean the git repo. When they say "build with Poky," they usually mean using the poky distro config.

## Poky Source Tree

After \`git clone git://git.yoctoproject.org/poky\`, you get:

\`\`\`
poky/
+-- bitbake/          # Build engine (Python scripts + library)
+-- documentation/    # Yocto documentation sources (sphinx)
+-- meta/             # OpenEmbedded-Core metadata (~1800 recipes)
+-- meta-skeleton/    # Template recipes for BSP/kernel development
+-- meta-poky/        # Poky reference distro config (conf/distro/poky.conf)
+-- meta-yocto-bsp/   # Reference hardware BSP (beaglebone, genericx86-64)
+-- oe-init-build-env # Setup script — run this first!
+-- scripts/          # Developer tools (devtool, recipetool, oe-pkgdata-util)
\`\`\`

**Key insight:** \`meta/\` contains OpenEmbedded-Core — the foundation recipes that provide the toolchain (gcc, binutils), C library (glibc/musl), core utilities (busybox, coreutils), and system services (systemd, sysvinit). Nearly every Yocto build depends on this layer.

## Essential Terms — Explained

### Recipe (.bb)

A recipe is **the fundamental unit of work** in Yocto. It describes how to build one piece of software — where to download the source, how to configure it, how to compile it, and how to package the results.

- Filename format: \`<name>_<version>.bb\` (e.g., \`dropbear_2024.86.bb\`)
- Each recipe produces one or more **packages** (e.g., dropbear recipe produces \`dropbear\`, \`dropbear-dbg\`, \`dropbear-dev\`)
- Think of a recipe like a Makefile + spec file combined

### Layer

A layer is a **modular collection** of related recipes, configuration files, and classes. Layers are prefixed with \`meta-\` by convention.

- Layers allow different teams to maintain different parts independently
- You can stack layers — higher-priority layers override lower ones
- Example layers: \`meta-raspberrypi\` (BSP), \`meta-qt5\` (Qt framework), \`meta-security\` (hardening)

### Machine

A **machine definition** describes the target hardware: CPU architecture, kernel, bootloader, and device features. Each machine is a \`.conf\` file in \`conf/machine/\`.

- Examples: \`qemux86-64\`, \`beaglebone-yocto\`, \`raspberrypi4-64\`
- Set in local.conf: \`MACHINE = "raspberrypi4-64"\`
- The machine config selects which kernel, bootloader, and firmware to build

### Distro (Distribution)

A **distro** defines software policies independent of hardware: which init system (systemd vs sysvinit), which C library (glibc vs musl), which features to enable (bluetooth, wifi, x11).

- Examples: \`poky\` (reference), \`poky-tiny\` (minimal), your custom distro
- Set in local.conf: \`DISTRO = "poky"\`
- The distro is the "personality" of your Linux system

### Image

An **image recipe** defines the final root filesystem — which packages to install, which features to enable, and which filesystem formats to generate.

- Examples: \`core-image-minimal\` (~8 MB), \`core-image-base\` (~60 MB), \`core-image-sato\` (GUI, ~400 MB)
- An image does NOT contain the kernel/bootloader — those are deployed separately
- Image recipes inherit the \`core-image\` class

### Class (.bbclass)

A class provides **reusable build logic** shared across multiple recipes. It's like a mixin or base class in OOP.

- Example: \`autotools.bbclass\` knows how to run ./configure && make && make install
- Recipes use \`inherit autotools\` to gain this behavior
- You can inherit multiple classes: \`inherit autotools pkgconfig\`

### Append (.bbappend)

A bbappend file **modifies an existing recipe without editing it**. This is how you customize third-party recipes in your own layer.

- Must match the recipe filename: \`dropbear_%.bbappend\` extends any version of dropbear
- Common uses: add patches, change config, add files, modify install steps

### Tasks

Tasks are the **individual build steps** that BitBake executes for each recipe, in order:

| Task | What It Does |
|------|-------------|
| \`do_fetch\` | Download source code from SRC_URI |
| \`do_unpack\` | Extract the source archive |
| \`do_patch\` | Apply patches listed in SRC_URI |
| \`do_configure\` | Run ./configure, cmake, meson setup, etc. |
| \`do_compile\` | Run make, ninja, etc. |
| \`do_install\` | Copy built files into a staging area (D = destination) |
| \`do_package\` | Split installed files into packages (main, -dev, -dbg, -doc) |
| \`do_package_write_*\` | Create rpm/deb/ipk package files |

### Metadata

**Metadata** is the collective term for all input to BitBake: recipes (.bb), configuration files (.conf), classes (.bbclass), include files (.inc), and append files (.bbappend). Everything that tells BitBake *what* and *how* to build is metadata.

## File Extensions

| Extension | Purpose | Example |
|-----------|---------|---------|
| \`.bb\` | Recipe file | \`bash_5.2.bb\` |
| \`.bbappend\` | Recipe extension | \`bash_%.bbappend\` |
| \`.bbclass\` | Class (reusable logic) | \`autotools.bbclass\` |
| \`.conf\` | Configuration file | \`local.conf\`, \`machine.conf\` |
| \`.inc\` | Include file (shared recipe content) | \`bash.inc\` |
| \`.wks\` | Disk image layout (used by wic) | \`sdimage-raspberrypi.wks\` |
| \`.scc\` | Kernel metadata feature | \`nunchuk.scc\` |
| \`.cfg\` | Kernel config fragment | \`enable-wifi.cfg\` |

## How These Concepts Relate

\`\`\`
Distro (software policy)  +  Machine (hardware)  +  Image (package selection)
                |                    |                        |
                v                    v                        v
         conf/distro/         conf/machine/           images/*.bb
         poky.conf            beaglebone.conf        core-image-minimal.bb
                \\                   |                      /
                 \\                  |                     /
                  +---------> [ BitBake ] <-----------+
                              processes
                             Recipes (.bb)
                             in Layers (meta-*)
                             using Classes (.bbclass)
                                    |
                                    v
                          Binary Packages + Root FS Image
\`\`\`

The key mental model: **Distro** says *what features*, **Machine** says *what hardware*, **Image** says *what packages*, and **Recipes in Layers** say *how to build each piece*.
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

**BitBake** is a task scheduler and execution engine written in Python. It is to Yocto what \`make\` is to C projects — but instead of compiling a single program, BitBake orchestrates the construction of an entire Linux distribution.

## How BitBake Works — The Big Picture

When you run \`bitbake core-image-minimal\`, BitBake performs these phases:

1. **Parse** — Reads all \`.conf\`, \`.bb\`, \`.bbappend\`, \`.bbclass\`, and \`.inc\` files to build an in-memory database of all recipes and their variables.
2. **Resolve dependencies** — Determines the full dependency tree. For an image, this can mean 2000+ recipes.
3. **Create task graph** — Each recipe has tasks (do_fetch, do_compile, etc.). BitBake builds a directed acyclic graph (DAG) of all tasks across all recipes.
4. **Execute tasks** — Runs tasks in dependency order, parallelizing independent tasks across available CPU cores.
5. **Check shared state** — Before running a task, BitBake checks if a cached result exists in the sstate-cache. If the inputs haven't changed, it reuses the cached output (massive time savings).

> **Key insight:** BitBake is not specific to Yocto. It's a general-purpose task executor. OpenEmbedded metadata (recipes, classes) is what makes it build Linux systems.

## Task Execution Order

For each recipe, tasks run in this order:

\`\`\`
do_fetch -> do_unpack -> do_patch -> do_populate_lic -> do_prepare_recipe_sysroot
    -> do_configure -> do_compile -> do_install -> do_populate_sysroot
    -> do_package -> do_package_write_rpm/deb/ipk -> do_package_qa
\`\`\`

You can visualize the full dependency graph with:

\`\`\`bash
bitbake -g core-image-minimal    # Generates task-depends.dot
\`\`\`

## Common Commands

| Command | Purpose |
|---------|---------|
| \`bitbake core-image-minimal\` | Build a minimal image |
| \`bitbake -c listtasks virtual/kernel\` | List all available tasks for the kernel |
| \`bitbake -c menuconfig virtual/kernel\` | Run interactive kernel menuconfig |
| \`bitbake -c devshell <recipe>\` | Open a shell with the build environment set up |
| \`bitbake -c cleansstate <recipe>\` | Clean sstate for a recipe (forces full rebuild) |
| \`bitbake -f <recipe>\` | Force rerun of do_compile and later tasks |
| \`bitbake -s\` | List all available recipes and their versions |
| \`bitbake -e <recipe>\` | Dump all variables for a recipe (very verbose!) |
| \`bitbake --runall=fetch core-image-minimal\` | Download ALL sources without building |
| \`bitbake -g -u taskexp core-image-minimal\` | Open graphical task explorer |

### Understanding -c (run task) vs -f (force)

- \`bitbake -c compile dropbear\` — Run do_compile and **stop** there. Does not package.
- \`bitbake -f dropbear\` — Forces do_compile to re-run, then continues with do_install, do_package, etc.
- \`bitbake -C compile dropbear\` — Invalidates the do_compile sstate and rebuilds everything from do_compile onward. Uppercase -C is more thorough than lowercase -c.

### Clean Commands Compared

| Command | What It Cleans |
|---------|---------------|
| \`bitbake -c clean <recipe>\` | Removes work directory (tmp/work/<arch>/<recipe>) |
| \`bitbake -c cleansstate <recipe>\` | Removes work directory AND sstate cache entries |
| \`bitbake -c cleanall <recipe>\` | Removes work, sstate, AND downloaded sources |

> **Tip:** Use \`cleansstate\` when you want a full rebuild. Use \`cleanall\` only if you suspect a corrupted download.

## bitbake-getvar — Debug Variable Values

One of the most useful debugging tools. Shows where a variable gets its final value:

\`\`\`bash
# Global variable
$ bitbake-getvar DEPLOY_DIR
# Shows: each config file that touches DEPLOY_DIR, pre-expansion value, and final value

# Per-recipe variable
$ bitbake-getvar -r dropbear SRC_URI
# Shows: SRC_URI as resolved for the dropbear recipe specifically
\`\`\`

This is invaluable when a variable has an unexpected value — you can trace which file set it.

## Shared State Cache (sstate-cache)

The sstate cache is Yocto's **incremental build** mechanism. After each task completes, BitBake saves its output in a content-addressed cache.

- **Location:** \`\\\${SSTATE_DIR}\` (defaults to \`build/sstate-cache/\`)
- **How it works:** BitBake computes a hash of all inputs (source code, configuration, dependencies). If the hash matches a cached entry, the task is skipped.
- **Sharing:** Teams can share a single sstate-cache on a network drive or HTTP server, so each developer doesn't rebuild from scratch.

\`\`\`bash
# Share sstate via HTTP mirror
SSTATE_MIRRORS = "file://.* http://sstate.mycompany.com/PATH;downloadfilename=PATH"

# Clean old entries (files not accessed in 30 days)
find sstate-cache/ -type f -atime +30 -delete
\`\`\`

> **Impact:** A first build of core-image-minimal takes ~1-2 hours. With a warm sstate cache, a rebuild (with no changes) takes seconds.

## Parallel Execution

BitBake runs multiple tasks in parallel:

- \`BB_NUMBER_THREADS\` — How many BitBake tasks run simultaneously (default: number of CPU cores)
- \`PARALLEL_MAKE\` — How many make processes per recipe (default: number of CPU cores)

For a machine with 8 cores, BitBake might be compiling 8 different recipes at once, each using 8 make threads — that's potentially 64 processes.

> **Tip:** If your machine runs out of memory during builds, reduce these values. A good rule of thumb: set BB_NUMBER_THREADS to your core count and PARALLEL_MAKE to "-j 4" on machines with less than 16 GB of RAM.

## Build Statistics

Stored in \`tmp/buildstats/\` — provides per-recipe timing data:

\`\`\`bash
# See which recipes took the longest to build
$ cat tmp/buildstats/*/do_compile | sort -n
# Or use the buildstats summary tool
$ scripts/buildstats-summary tmp/buildstats/
\`\`\`

This helps identify bottleneck recipes when optimizing build times.
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

Setting up a Yocto build correctly from the start saves hours of debugging later. This lesson covers the build environment, configuration files, and directory structure.

## Setting Up the Build Environment

\`\`\`bash
# First time — creates build directory with default configs
$ source oe-init-build-env

# Or specify a custom build directory name
$ source oe-init-build-env build-rpi

# Multiple build directories for different targets
$ source oe-init-build-env build-qemu     # For QEMU testing
$ source oe-init-build-env build-rpi      # For Raspberry Pi
\`\`\`

What \`oe-init-build-env\` does:

1. Creates the build directory (if it doesn't exist) with \`conf/\` subdirectory
2. Copies template config files (\`local.conf\`, \`bblayers.conf\`) from the template directory
3. Sets environment variables: \`BUILDDIR\`, adds \`scripts/\` and \`bitbake/bin/\` to \`PATH\`
4. Changes to the build directory

> **Important:** You must \`source oe-init-build-env\` in every new terminal session. It's not persistent.

## Configuration Files (conf/)

| File | Required? | Purpose |
|------|-----------|---------|
| \`bblayers.conf\` | **Mandatory** | Lists which layers are active (BBLAYERS variable) |
| \`local.conf\` | **Mandatory** | User-specific build settings (machine, distro, parallelism) |
| \`site.conf\` | Optional | Site-wide settings shared across builders (mirrors, resource limits) |

### bblayers.conf — Layer List

\`\`\`bash
# Which layers BitBake should use
BBLAYERS ?= " \\
  /home/user/poky/meta \\
  /home/user/poky/meta-poky \\
  /home/user/poky/meta-yocto-bsp \\
  /home/user/meta-custom \\
"
\`\`\`

> **Tip:** Use \`bitbake-layers add-layer /path/to/meta-foo\` instead of editing this file manually. It validates the layer first.

### local.conf — Build Settings

This is where you configure your build. Key variables:

| Variable | Purpose | Default | Example |
|----------|---------|---------|---------|
| \`MACHINE\` | Target hardware | qemux86-64 | raspberrypi4-64 |
| \`DISTRO\` | Distribution policy | poky | poky-tiny |
| \`PACKAGE_CLASSES\` | Package format | package_rpm | package_ipk |
| \`BB_NUMBER_THREADS\` | Parallel BitBake tasks | nproc | 8 |
| \`PARALLEL_MAKE\` | make -j value | nproc | -j 8 |
| \`DL_DIR\` | Download cache | build/downloads | /opt/yocto/downloads |
| \`SSTATE_DIR\` | Shared state cache | build/sstate-cache | /opt/yocto/sstate |
| \`TMPDIR\` | Build output directory | build/tmp | build/tmp |
| \`EXTRA_IMAGE_FEATURES\` | Image features | (none) | debug-tweaks |

### Sharing DL_DIR and SSTATE_DIR

A common optimization: set \`DL_DIR\` and \`SSTATE_DIR\` to shared directories outside the build tree. This way, multiple build directories (or team members) reuse downloads and cached builds:

\`\`\`bash
DL_DIR = "/opt/yocto/downloads"
SSTATE_DIR = "/opt/yocto/sstate-cache"
\`\`\`

### debug-tweaks

Adding \`EXTRA_IMAGE_FEATURES += "debug-tweaks"\` in local.conf enables:
- Root login without password (convenient for development)
- Allow empty root password
- Install debug packages

> **Warning:** Always remove \`debug-tweaks\` for production images! It's a security risk.

## Build Directory Structure After a Build

\`\`\`
build/
+-- conf/                      # Configuration files (your settings)
|   +-- local.conf
|   +-- bblayers.conf
+-- downloads/                 # Upstream source tarballs (DL_DIR)
|   +-- bash-5.2.tar.gz
|   +-- linux-6.6.tar.xz
|   +-- git2/                  # Git clones (bare repos)
+-- sstate-cache/              # Shared state (reusable build artifacts)
+-- tmp/                       # All build outputs (TMPDIR)
    +-- work/                  # Per-recipe working directories
    |   +-- cortexa7t2hf-.../  # Organized by architecture
    |       +-- dropbear/      # Each recipe has its own directory
    |           +-- 2024.86-r0/
    |               +-- temp/          # Task scripts and logs
    |               |   +-- run.do_compile
    |               |   +-- log.do_compile
    |               +-- image/         # Files staged by do_install
    |               +-- packages-split/# Files split into packages
    +-- deploy/
    |   +-- images/            # Final images (kernel, rootfs, dtb)
    |   |   +-- raspberrypi4-64/
    |   |       +-- core-image-minimal-raspberrypi4-64.wic.bz2
    |   |       +-- zImage
    |   |       +-- bcm2711-rpi-4-b.dtb
    |   +-- rpm/               # Built packages (or ipk/deb)
    |   +-- sdk/               # Generated SDKs
    |   +-- licenses/          # License manifests
    +-- sysroots-components/   # Shared libraries and headers for cross-compilation
    +-- buildstats/            # Timing data for build optimization
\`\`\`

### Finding Key Outputs

- **Flashable image:** \`tmp/deploy/images/\\\${MACHINE}/\`
- **All built packages:** \`tmp/deploy/rpm/\` (or \`ipk/\`, \`deb/\`)
- **Recipe work directory:** \`tmp/work/<arch>/<recipe>/<version>/\`
- **Task log:** \`tmp/work/<arch>/<recipe>/<version>/temp/log.do_compile\`

## First Build Walkthrough

\`\`\`bash
# 1. Clone Poky
$ git clone -b scarthgap git://git.yoctoproject.org/poky
$ cd poky

# 2. Set up build environment
$ source oe-init-build-env

# 3. (Optional) Edit conf/local.conf to set MACHINE, DL_DIR, etc.

# 4. Build a minimal image
$ bitbake core-image-minimal

# 5. Test in QEMU (if MACHINE is qemux86-64)
$ runqemu qemux86-64
\`\`\`

> **First build takes a long time** (1-4 hours depending on your machine and internet speed). This is normal — Yocto is building the entire toolchain (gcc, glibc), hundreds of packages, and the final image from source. Subsequent builds with sstate cache are much faster.

## Disk Space Requirements

A typical build requires **50-100 GB** of free disk space:
- Downloads: ~5 GB
- Sstate cache: ~10-30 GB
- tmp/work: ~30-50 GB
- Final images: ~100 MB - 1 GB

> **Tip:** Use \`INHERIT += "rm_work"\` in local.conf to automatically delete recipe work directories after packaging. This can save 30+ GB but makes debugging harder.
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

A recipe is the heart of Yocto. It tells BitBake everything needed to build one piece of software: where to get the source, how to configure and compile it, what files to install, and how to package them.

Format: \`<name>_<version>.bb\` — for example, \`myapp_1.0.bb\`. The output is one or more binary packages (rpm/deb/ipk).

## Anatomy of a Complete Recipe

\`\`\`bash
# myapp_1.0.bb — A complete, well-documented recipe

# --- Header (metadata about the software) ---
SUMMARY = "My example application"
DESCRIPTION = "A longer description of what myapp does and why it exists"
HOMEPAGE = "https://github.com/example/myapp"
SECTION = "utils"
LICENSE = "MIT"
LIC_FILES_CHKSUM = "file://LICENSE;md5=abc123..."

# --- Source ---
SRC_URI = "https://github.com/example/myapp/archive/v\\\${PV}.tar.gz"
SRC_URI[sha256sum] = "def456..."

# --- Dependencies ---
DEPENDS = "zlib openssl"                # Build-time (headers & libraries)
RDEPENDS:\\\${PN} = "libz openssl"       # Runtime (shared libraries)

# --- Build ---
inherit autotools                       # Use autotools class (./configure && make)
EXTRA_OECONF = "--enable-ssl"           # Extra flags for ./configure

# --- Install (only if autotools default is not sufficient) ---
do_install:append() {
    install -d \\\${D}\\\${sysconfdir}
    install -m 0644 \\\${S}/myapp.conf \\\${D}\\\${sysconfdir}/myapp.conf
}
\`\`\`

## Auto-Available Variables

BitBake automatically sets these from the recipe filename:

| Variable | Description | Example (\`bash_5.2.bb\`) |
|----------|-------------|-----------------------|
| \`BPN\` | Base recipe name (no prefix/suffix) | bash |
| \`PN\` | Package name (usually same as BPN) | bash |
| \`PV\` | Package version | 5.2 |
| \`PR\` | Package revision | r0 |
| \`BP\` | BPN-PV | bash-5.2 |
| \`P\` | PN-PV | bash-5.2 |

> **Tip:** Always use \`\\\${PV}\` in SRC_URI so version bumps only require renaming the .bb file and updating the checksum.

## SRC_URI — Where to Get Source Code

SRC_URI supports multiple protocols. You can combine multiple entries:

\`\`\`bash
# --- HTTP/FTP tarball ---
SRC_URI = "https://example.com/app-\\\${PV}.tar.gz"
SRC_URI[sha256sum] = "abc..."

# --- Git repository ---
SRC_URI = "git://github.com/example/app.git;protocol=https;branch=main"
SRCREV = "2d47b4eb..."        # Always use full commit hash, not tags!
S = "\\\${WORKDIR}/git"         # Git clones to "git/" subdirectory

# --- Local files and patches ---
SRC_URI += "file://my-config.cfg"       # Copied to WORKDIR
SRC_URI += "file://fix-build.patch"     # Auto-applied by do_patch

# --- Multiple sources ---
SRC_URI = "https://example.com/app-\\\${PV}.tar.gz \\
           file://0001-fix-cross-compile.patch \\
           file://default.conf \\
           "
\`\`\`

**Why SRCREV must be a commit hash:** Git tags can be moved or deleted. A commit hash guarantees you get the exact same source every time, which is critical for reproducible builds and auditing.

**Patches are auto-applied** in the order they appear in SRC_URI during \`do_patch\`. BitBake uses quilt to manage patches.

## FILESPATH — Where BitBake Looks for Local Files

When SRC_URI contains \`file://\` entries, BitBake searches these directories (in order):

1. \`\\\${FILE_DIRNAME}/\\\${BP}\` — e.g., \`myapp-1.0/\`
2. \`\\\${FILE_DIRNAME}/\\\${BPN}\` — e.g., \`myapp/\`
3. \`\\\${FILE_DIRNAME}/files\` — generic files directory

This allows **machine-specific overrides** without conditionals: place a file in \`myapp/beaglebone/\` and it takes priority over \`myapp/\` when MACHINE=beaglebone.

## License Tracking

Every recipe MUST declare its license and provide a checksum of the license file:

\`\`\`bash
LICENSE = "GPL-2.0-or-later"
LIC_FILES_CHKSUM = "file://COPYING;md5=abc..."

# You can checksum a portion of a file
LIC_FILES_CHKSUM = "file://main.c;beginline=1;endline=20;md5=def..."

# For common licenses, reference the shared directory
LIC_FILES_CHKSUM = "file://\\\${COMMON_LICENSE_DIR}/MIT;md5=..."
\`\`\`

If the upstream project changes its license file, the md5 no longer matches, and the build **fails**. This forces you to review the license change — critical for compliance.

## .inc Files — Sharing Common Recipe Content

When a recipe has multiple versions, extract shared content into a \`.inc\` file:

\`\`\`bash
# bash.inc — shared by all versions
SUMMARY = "GNU Bourne Again SHell"
HOMEPAGE = "https://www.gnu.org/software/bash/"
DEPENDS = "ncurses"
inherit autotools

# bash_5.1.bb — version-specific
require bash.inc
SRC_URI = "https://ftp.gnu.org/gnu/bash/bash-\\\${PV}.tar.gz"
SRC_URI[sha256sum] = "..."
LIC_FILES_CHKSUM = "file://COPYING;md5=..."

# bash_5.2.bb — another version
require bash.inc
SRC_URI = "https://ftp.gnu.org/gnu/bash/bash-\\\${PV}.tar.gz"
SRC_URI[sha256sum] = "..."   # different checksum
LIC_FILES_CHKSUM = "file://COPYING;md5=..."
\`\`\`

## Dependencies

| Variable | Type | Example | When Needed |
|----------|------|---------|-------------|
| \`DEPENDS\` | Build-time | \`DEPENDS = "zlib openssl"\` | Need headers/libs during compilation |
| \`RDEPENDS:\\\${PN}\` | Runtime | \`RDEPENDS:\\\${PN} = "python3"\` | Need packages present on the target |
| \`RRECOMMENDS:\\\${PN}\` | Runtime (soft) | \`RRECOMMENDS:\\\${PN} = "kernel-module-wifi"\` | Useful but not required on target |

> **Key difference:** \`DEPENDS\` packages are only in the build sysroot (for cross-compilation). \`RDEPENDS\` packages are installed on the target root filesystem.

## Task Variables — Important Directories

| Variable | Description | Typical Value |
|----------|-------------|---------------|
| \`WORKDIR\` | Recipe working directory | \`tmp/work/<arch>/<recipe>/<version>\` |
| \`S\` | Unpacked source code | \`\\\${WORKDIR}/<name>-<version>\` |
| \`B\` | Build directory (object files) | Usually same as S |
| \`D\` | Destination root for do_install | \`\\\${WORKDIR}/image\` |
| \`STAGING_DIR_HOST\` | Sysroot for target libraries | Used by configure scripts |

## Writing do_install

The \`do_install\` task copies built files into \`\\\${D}\` (the fake root directory). This is where you define what gets packaged:

\`\`\`bash
do_install() {
    # Install binary
    install -d \\\${D}\\\${bindir}
    install -m 0755 \\\${B}/myapp \\\${D}\\\${bindir}/myapp

    # Install config file
    install -d \\\${D}\\\${sysconfdir}
    install -m 0644 \\\${S}/myapp.conf \\\${D}\\\${sysconfdir}/myapp.conf

    # Install systemd service
    install -d \\\${D}\\\${systemd_system_unitdir}
    install -m 0644 \\\${S}/myapp.service \\\${D}\\\${systemd_system_unitdir}/myapp.service
}
\`\`\`

**Standard path variables** (never hardcode paths!):

| Variable | Path | Example Use |
|----------|------|-------------|
| \`\\\${bindir}\` | /usr/bin | Executables |
| \`\\\${sbindir}\` | /usr/sbin | System binaries |
| \`\\\${libdir}\` | /usr/lib | Libraries |
| \`\\\${sysconfdir}\` | /etc | Configuration files |
| \`\\\${datadir}\` | /usr/share | Architecture-independent data |
| \`\\\${systemd_system_unitdir}\` | /lib/systemd/system | Systemd service files |

## Automatic Package Splitting

After \`do_install\`, BitBake automatically splits installed files into sub-packages:

| Package | Contains |
|---------|----------|
| \`\\\${PN}\` | Main binaries, libs, config |
| \`\\\${PN}-dev\` | Headers, .a files, .la files, pkg-config |
| \`\\\${PN}-dbg\` | Debug symbols |
| \`\\\${PN}-doc\` | Man pages, documentation |
| \`\\\${PN}-staticdev\` | Static libraries |

You can customize splitting with the \`FILES\` variable:

\`\`\`bash
FILES:\\\${PN} += "\\\${datadir}/myapp/*"
\`\`\`
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

Layers are Yocto's mechanism for **modular organization**. They keep your custom code separate from upstream metadata, enable team collaboration, and make it possible to reuse work across projects. Every serious Yocto project should create at least one custom layer.

## Why Layers Matter

- **Separation of concerns:** BSP team maintains \`meta-mybsp\`, app team maintains \`meta-myapp\`
- **Upstream compatibility:** You never edit Poky or third-party layers directly, so updating them is a clean git merge
- **Reusability:** Your custom layer can be used in different products with different machines

## Creating a Layer

\`\`\`bash
# Create a layer with priority 6
$ bitbake-layers create-layer -p 6 meta-custom

# This creates:
# meta-custom/
# +-- conf/
# |   +-- layer.conf       # Layer configuration (mandatory)
# +-- recipes-example/
# |   +-- example/
# |       +-- example_0.1.bb  # Sample recipe
# +-- COPYING.MIT            # License file
# +-- README                 # Description
\`\`\`

### Understanding Layer Priority

Priority (1-99) determines which recipe **wins** when multiple layers provide the same recipe name and version.

- Higher number = higher priority
- OE-Core (\`meta/\`) has priority 5
- Your custom layer should typically be 6-10
- If your layer has \`dropbear_2024.86.bb\` and OE-Core also has it, the higher-priority layer wins

## layer.conf — The Layer Entry Point

BitBake reads \`conf/layer.conf\` to discover a layer. Let's understand what's inside:

\`\`\`bash
# meta-custom/conf/layer.conf

# Tell BitBake where to find recipes in this layer
BBPATH .= ":\\\${LAYERDIR}"
BBFILES += "\\\${LAYERDIR}/recipes-*/*/*.bb \\
            \\\${LAYERDIR}/recipes-*/*/*.bbappend"

# Collection name and priority
BBFILE_COLLECTIONS += "custom"
BBFILE_PATTERN_custom = "^\\\${LAYERDIR}/"
BBFILE_PRIORITY_custom = "6"

# Required: declare compatible Yocto release series
LAYERSERIES_COMPAT_custom = "scarthgap styhead"

# Optional: declare dependencies on other layers
LAYERDEPENDS_custom = "core"
\`\`\`

**What each variable does:**

| Variable | Purpose |
|----------|---------|
| \`BBPATH\` | Search path for .conf and .bbclass files |
| \`BBFILES\` | Glob patterns that find all recipes and appends in this layer |
| \`BBFILE_COLLECTIONS\` | Unique name for this layer's collection |
| \`BBFILE_PRIORITY_<name>\` | Layer priority (higher wins for duplicate recipes) |
| \`LAYERSERIES_COMPAT_<name>\` | Which Yocto release series this layer is tested with |
| \`LAYERDEPENDS_<name>\` | Other layers this one requires |

## Recommended Layer Structure

\`\`\`
meta-custom/
+-- conf/
|   +-- layer.conf            # Layer config
|   +-- machine/
|   |   +-- mymachine.conf    # (If this is also a BSP layer)
|   +-- distro/
|       +-- mydistro.conf     # (If this defines a distro)
+-- recipes-core/             # Modifications to core recipes
|   +-- images/
|   |   +-- my-image.bb       # Custom image recipe
|   +-- systemd/
|       +-- systemd_%.bbappend
+-- recipes-myapp/            # Your application recipes
|   +-- myapp/
|   |   +-- myapp_1.0.bb
|   |   +-- myapp/            # Files directory
|   |       +-- myapp.service
|   |       +-- 0001-fix.patch
+-- recipes-bsp/              # Hardware-specific recipes
|   +-- u-boot/
|       +-- u-boot_%.bbappend
+-- classes/                  # Custom classes
|   +-- myclass.bbclass
\`\`\`

> **Convention:** Group recipes under \`recipes-<category>/\` directories. Common categories: \`recipes-core\`, \`recipes-bsp\`, \`recipes-multimedia\`, \`recipes-connectivity\`, \`recipes-<yourapp>\`.

## Managing Layers

\`\`\`bash
# See which layers are active and their priorities
$ bitbake-layers show-layers

# Add a layer to bblayers.conf (validates it first)
$ bitbake-layers add-layer /path/to/meta-custom

# Remove a layer
$ bitbake-layers remove-layer meta-qt5

# Check if a layer has any issues
$ bitbake-layers show-recipes      # Shows all recipes and which layer provides them
$ bitbake-layers show-overlayed    # Shows recipes that exist in multiple layers
$ bitbake-layers show-appends      # Shows all bbappend files and what they modify
\`\`\`

## Third-Party Layer Ecosystem

Browse the official layer index at **layers.openembedded.org**. Popular layers:

| Layer | Purpose |
|-------|---------|
| \`meta-openembedded\` | Additional recipes (networking, Python, Perl, etc.) |
| \`meta-raspberrypi\` | Raspberry Pi BSP |
| \`meta-ti-bsp\` | Texas Instruments BSP (BeagleBone, etc.) |
| \`meta-freescale\` | NXP/Freescale BSP (i.MX, etc.) |
| \`meta-qt5\` / \`meta-qt6\` | Qt framework |
| \`meta-virtualization\` | Docker, Kubernetes, LXC |
| \`meta-security\` | Security hardening, SELinux |
| \`meta-swupdate\` | OTA update framework |

## Best Practices

1. **Never modify third-party layers** — always use .bbappend in your own layer
2. **Always set LAYERSERIES_COMPAT** — prevents silent breakage when upgrading Yocto releases
3. **Use LAYERDEPENDS** — documents and enforces layer dependencies
4. **One purpose per layer** — avoid mixing BSP, distro, and application layers
5. **Pin third-party layers to release branches** — don't use \`master\` in production
6. **Keep your layer in version control** — your custom layer is your project's primary deliverable
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

The \`.bbappend\` file is one of Yocto's most powerful features. It lets you **modify any recipe from any layer without editing the original**. This is how you customize third-party software, add patches, change configurations, and add files — all while keeping upstream layers untouched.

## Why bbappend Instead of Editing the Original?

If you directly edit a recipe in \`meta-oe\` or \`poky/meta\`:
- You can't easily update the upstream layer (merge conflicts)
- Your changes are mixed with upstream code (hard to track)
- Other projects using the same layer get your changes (unintended)

With bbappend:
- Your modifications live in **your layer** under version control
- Updating upstream is a clean \`git pull\`
- You can clearly see what you've customized

## Naming Rules

The bbappend filename must match the recipe it extends:

| bbappend File | Matches | Explanation |
|---------------|---------|-------------|
| \`dropbear_2024.86.bbappend\` | \`dropbear_2024.86.bb\` only | Exact version match |
| \`dropbear_%.bbappend\` | \`dropbear_2024.86.bb\`, \`dropbear_2022.83.bb\`, etc. | \`%\` = any version |
| \`linux-yocto_6.%.bbappend\` | \`linux-yocto_6.6.bb\`, \`linux-yocto_6.12.bb\` | Matches 6.x only |

> **Important:** The \`%\` wildcard only works immediately before \`.bbappend\`. You can't use \`%_1.0.bbappend\`.

> **Best practice:** Use \`%\` wildcards to survive version upgrades, but test after every upstream update.

## Directory Layout

Your bbappend must be in the same \`recipes-<category>/<recipe>/\` structure as the original:

\`\`\`
meta-custom/
+-- recipes-core/
|   +-- dropbear/
|   |   +-- dropbear_%.bbappend        # Extends dropbear recipe
|   |   +-- dropbear/                  # Files directory
|   |       +-- custom-banner.txt      # Custom file to add
|   |       +-- 0001-fix-timeout.patch # Patch to apply
+-- recipes-kernel/
    +-- linux/
        +-- linux-yocto_%.bbappend     # Extends kernel recipe
        +-- linux-yocto/               # Files directory
            +-- enable-can.cfg         # Kernel config fragment
\`\`\`

## Adding New Files

To make BitBake find files in your layer, prepend your directory to the search path:

\`\`\`bash
FILESEXTRAPATHS:prepend := "\\\${THISDIR}/files:"
# Or reference the recipe-name directory
FILESEXTRAPATHS:prepend := "\\\${THISDIR}/\\\${BPN}:"
\`\`\`

**Why :prepend?** BitBake searches directories in order. Prepending puts your directory **first**, so your files take priority over the original recipe's files. This lets you override a file (like defconfig) by providing your own version.

> **Critical:** Always use \`:=\` (immediate expansion) with FILESEXTRAPATHS, not \`=\` (deferred). The \`\\\${THISDIR}\` variable must be resolved at parse time.

## Common bbappend Use Cases

### 1. Add a Patch

\`\`\`bash
# dropbear_%.bbappend
FILESEXTRAPATHS:prepend := "\\\${THISDIR}/\\\${BPN}:"
SRC_URI += "file://0001-increase-timeout.patch"
\`\`\`

### 2. Add a Configuration File

\`\`\`bash
# dropbear_%.bbappend
FILESEXTRAPATHS:prepend := "\\\${THISDIR}/\\\${BPN}:"
SRC_URI += "file://dropbear.conf"

do_install:append() {
    install -d \\\${D}\\\${sysconfdir}/dropbear
    install -m 0644 \\\${WORKDIR}/dropbear.conf \\\${D}\\\${sysconfdir}/dropbear/
}
\`\`\`

### 3. Apply Kernel Config Fragments

\`\`\`bash
# linux-yocto_%.bbappend
FILESEXTRAPATHS:prepend := "\\\${THISDIR}/\\\${BPN}:"
SRC_URI += "file://enable-can.cfg file://enable-spi.cfg"
\`\`\`

### 4. Add Runtime Dependencies

\`\`\`bash
# myapp_%.bbappend
RDEPENDS:\\\${PN} += "python3 python3-json"
\`\`\`

### 5. Machine-Specific Customization

\`\`\`bash
# dropbear_%.bbappend
do_install:append:beaglebone() {
    # Only runs when MACHINE = beaglebone
    install -m 0644 fw.bin \\\${D}\\\${nonarch_base_libdir}/firmware/
}
\`\`\`

## Modifying Tasks

You can extend tasks with \`:append\` / \`:prepend\`, or completely override them:

\`\`\`bash
# Extend — adds code AFTER the original do_install
do_install:append() {
    install -d \\\${D}\\\${sysconfdir}
    install -m 0644 \\\${WORKDIR}/myconfig \\\${D}\\\${sysconfdir}/
}

# Prepend — adds code BEFORE the original do_configure
do_configure:prepend() {
    # Run a script before the real configure
    \\\${S}/generate-version.sh
}

# Complete override — replaces the original do_install entirely
do_install() {
    # Your implementation replaces the original
    install -d \\\${D}\\\${bindir}
    install -m 0755 \\\${B}/mybin \\\${D}\\\${bindir}/
}
\`\`\`

> **Warning:** Completely overriding a task (without :append/:prepend) is fragile — if the upstream recipe changes its do_install, you won't get those changes. Prefer \`:append\` and \`:prepend\` when possible.

## Debugging bbappend Files

\`\`\`bash
# See which bbappend files are active
$ bitbake-layers show-appends

# Check if your bbappend is being applied
$ bitbake -e dropbear | grep "^SRC_URI="

# See the full recipe with all appends merged
$ bitbake -e dropbear > dropbear-expanded.txt
\`\`\`

## Common Pitfalls

1. **Forgetting FILESEXTRAPATHS** — SRC_URI += "file://..." fails silently if BitBake can't find the file
2. **Using = instead of :=** for FILESEXTRAPATHS — \`\\\${THISDIR}\` resolves to the wrong directory
3. **Version mismatch** — \`dropbear_2022.83.bbappend\` is silently ignored if the recipe is now \`dropbear_2024.86.bb\` (use \`%\` to avoid this)
4. **Missing leading space** in \`:append\` — \`SRC_URI:append = "file://x"\` concatenates without space (need \`" file://x"\`)
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

Classes (\`.bbclass\` files) are Yocto's mechanism for **code reuse**. A class encapsulates build logic that can be shared across many recipes. Think of them like base classes or mixins in object-oriented programming — they define how to build a particular type of software.

## How to Use Classes

\`\`\`bash
# In a recipe (.bb) — applies to that recipe only
inherit autotools

# Inherit multiple classes
inherit autotools pkgconfig gettext

# In a config (.conf) — applies to ALL recipes globally
INHERIT += "buildhistory"
\`\`\`

> **Key difference:** \`inherit\` in a recipe only affects that recipe. \`INHERIT +=\` in \`local.conf\` or \`distro.conf\` affects every recipe in the build.

## How Classes Work Under the Hood

When you write \`inherit autotools\`, BitBake:

1. Searches BBPATH for \`classes/autotools.bbclass\`
2. "Includes" the class into the recipe — all variables, functions, and task definitions from the class become part of the recipe
3. The recipe can override class behaviors (recipe-specific code takes priority)

## Essential Classes Explained

### base.bbclass — The Foundation

**Automatically inherited by every recipe.** You never write \`inherit base\`.

Provides: default task implementations (do_fetch, do_unpack, do_patch, etc.), \`oe_runmake\` (wrapper around make with cross-compile flags), standard mirror definitions.

### autotools.bbclass — GNU Autotools Projects

For software that uses \`./configure && make && make install\`:

\`\`\`bash
inherit autotools
EXTRA_OECONF = "--enable-ssl --disable-static"   # Flags for ./configure
EXTRA_OEMAKE = "LDFLAGS='-lm'"                    # Flags for make
\`\`\`

What it does: runs autoreconf, then ./configure with cross-compilation flags (--host, --build, --prefix), then make, then make install DESTDIR=\\\${D}.

### cmake.bbclass — CMake Projects

\`\`\`bash
inherit cmake
EXTRA_OECMAKE = "-DENABLE_TESTS=OFF -DBUILD_SHARED_LIBS=ON"
\`\`\`

### meson.bbclass — Meson Build System

\`\`\`bash
inherit meson
EXTRA_OEMESON = "-Dfeature=enabled"
\`\`\`

### kernel.bbclass — Building Linux Kernels

\`\`\`bash
inherit kernel
KERNEL_IMAGETYPE = "zImage"
\`\`\`

Auto-applies defconfig, merges .cfg fragments, provides \`virtual/kernel\`, splits output into kernel-image/kernel-modules/kernel-dev packages.

### systemd.bbclass — Systemd Service Integration

\`\`\`bash
inherit systemd
SYSTEMD_SERVICE:\\\${PN} = "myapp.service"
SYSTEMD_AUTO_ENABLE = "enable"
\`\`\`

Automatically installs and enables systemd unit files.

### useradd.bbclass — Creating Users and Groups

\`\`\`bash
inherit useradd
USERADD_PACKAGES = "\\\${PN}"
USERADD_PARAM:\\\${PN} = "-u 1200 -d /var/lib/myapp -r -s /bin/false myuser"
GROUPADD_PARAM:\\\${PN} = "-g 1200 mygroup"
\`\`\`

Creates system users/groups at image creation time. Essential for services that should not run as root.

### bin_package.bbclass — Pre-built Binaries

For proprietary firmware or pre-compiled binaries:

\`\`\`bash
inherit bin_package
# Disables do_configure and do_compile
# do_install expects files in S to be in their final layout
\`\`\`

### pkgconfig.bbclass — pkg-config Support

\`\`\`bash
inherit pkgconfig
\`\`\`

Ensures pkg-config finds cross-compiled libraries. Often used alongside autotools or cmake.

## Complete Recipe Example

\`\`\`bash
# gnu-hello_2.12.bb
SUMMARY = "GNU Hello World"
HOMEPAGE = "https://www.gnu.org/software/hello/"
LICENSE = "GPL-3.0-or-later"
LIC_FILES_CHKSUM = "file://COPYING;md5=..."
SRC_URI = "\\\${GNU_MIRROR}/hello/hello-\\\${PV}.tar.gz"
SRC_URI[sha256sum] = "..."

# This single line gives us do_configure, do_compile, do_install
inherit autotools
\`\`\`

> **The beauty of classes:** This 7-line recipe is sufficient to cross-compile, install, and package GNU Hello for any target architecture.

## Writing Custom Classes

Create classes in your layer's \`classes/\` directory:

\`\`\`bash
# classes/myapp-common.bbclass
DEPENDS += "libmycommon"
RDEPENDS:\\\${PN} += "myapp-config"

do_install:append() {
    install -d \\\${D}\\\${datadir}/myapp
    echo "\\\${PV}" > \\\${D}\\\${datadir}/myapp/version
}
\`\`\`

Then any recipe can \`inherit myapp-common\` to get these shared behaviors.
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

An image recipe is the **top-level build target** in Yocto. It defines what goes into your final root filesystem — which packages to install, what filesystem format to generate, and any post-processing steps. Everything you've built with recipes and layers culminates in the image.

## Understanding Image Recipes

Image recipes are special:
- They are **architecture-agnostic** — the same image recipe works for ARM, x86, RISC-V
- They inherit \`core-image\` class (which inherits \`image\` class)
- They don't need a LICENSE variable (they don't produce copyrightable output)
- Their main job is to list packages and produce a root filesystem

## Standard Reference Images

Yocto provides several reference images with increasing functionality:

| Image | Size (~) | Contents |
|-------|----------|----------|
| \`core-image-minimal\` | 8 MB | Boot + shell only (busybox, init). Minimal viable system. |
| \`core-image-base\` | 60 MB | Minimal + full hardware support (kernel modules, firmware) |
| \`core-image-full-cmdline\` | 150 MB | Full command-line tools (coreutils, bash, apt/opkg) |
| \`core-image-x11\` | 300 MB | X11 display server with basic window manager |
| \`core-image-weston\` | 350 MB | Wayland compositor (modern graphics) |
| \`core-image-sato\` | 450 MB | Full GUI demo (Sato desktop, terminal, browser) |
| \`core-image-rt\` | 8 MB | Minimal with PREEMPT_RT kernel (real-time) |

> **Tip:** Start with \`core-image-minimal\` and add what you need. It's easier to add packages than to remove unwanted ones from a large image.

## Key Variables

| Variable | Purpose | Example |
|----------|---------|---------|
| \`IMAGE_INSTALL\` | Packages to install in rootfs | \`packagegroup-core-boot dropbear myapp\` |
| \`IMAGE_FEATURES\` | High-level features to enable | \`debug-tweaks package-management ssh-server-dropbear\` |
| \`IMAGE_FSTYPES\` | Output filesystem formats | \`ext4 wic.bz2 tar.gz\` |
| \`IMAGE_LINGUAS\` | Locales to include | \`en-us zh-cn\` (empty = no locales) |
| \`IMAGE_ROOTFS_SIZE\` | Minimum rootfs size (KB) | \`65536\` |
| \`IMAGE_ROOTFS_EXTRA_SPACE\` | Extra free space (KB) | \`1048576\` (1 GB) |
| \`IMAGE_POSTPROCESS_COMMAND\` | Shell commands after rootfs | Custom scripts |
| \`EXTRA_IMAGEDEPENDS\` | Build but don't install | \`u-boot\` (bootloader) |

### IMAGE_FEATURES Explained

| Feature | What It Enables |
|---------|----------------|
| \`debug-tweaks\` | Empty root password, allow root login (development only!) |
| \`package-management\` | Installs opkg/apt/dnf on target for runtime package updates |
| \`ssh-server-dropbear\` | Lightweight SSH server |
| \`ssh-server-openssh\` | Full OpenSSH server |
| \`tools-debug\` | gdb, strace, ltrace on target |
| \`tools-profile\` | Profiling tools (perf, oprofile) |
| \`read-only-rootfs\` | Mount rootfs as read-only (common for embedded) |
| \`allow-empty-password\` | Allow empty passwords (part of debug-tweaks) |
| \`allow-root-login\` | Allow root SSH login (part of debug-tweaks) |

## How Image Generation Works

When you run \`bitbake core-image-minimal\`, the image generation follows these steps:

1. **Dependency resolution** — BitBake determines all packages needed (IMAGE_INSTALL + their RDEPENDS, recursively)
2. **Package building** — All required recipes are built and packaged (rpm/deb/ipk)
3. **Rootfs creation** — An empty directory is created, then a real package manager (opkg/dnf/apt) installs all packages into it
4. **Post-processing** — IMAGE_POSTPROCESS_COMMAND scripts run (e.g., set root password, create symlinks)
5. **Image generation** — The populated rootfs directory is converted to filesystem images per IMAGE_FSTYPES

> **Important:** Because the rootfs is populated by a real package manager, dependency resolution works the same as on a running system. Missing dependencies cause build errors.

## Writing a Custom Image Recipe

\`\`\`bash
# my-image.bb
SUMMARY = "Custom embedded image for my product"

# Start with core boot packages (init, shell, base-files)
IMAGE_INSTALL = "packagegroup-core-boot"

# Add our application and its dependencies
IMAGE_INSTALL += "myapp myapp-config"

# Add connectivity
IMAGE_INSTALL += "dropbear wpa-supplicant"

# Add debugging tools (remove for production!)
IMAGE_INSTALL += "strace tcpdump"

# Enable SSH and package management
IMAGE_FEATURES += "ssh-server-dropbear package-management"

# No locales (save space)
IMAGE_LINGUAS = " "

# Output formats
IMAGE_FSTYPES = "ext4 wic.bz2"

# Leave 100 MB free on the rootfs
IMAGE_ROOTFS_EXTRA_SPACE = "102400"

inherit core-image
\`\`\`

## Package Groups

Package groups bundle related packages together. They use the \`packagegroup\` class:

\`\`\`bash
# packagegroup-my-connectivity.bb
SUMMARY = "Connectivity packages for my product"
inherit packagegroup

RDEPENDS:\\\${PN} = "\\
    wpa-supplicant \\
    bluez5 \\
    networkmanager \\
    openssh-sftp-server \\
"
\`\`\`

Then in your image: \`IMAGE_INSTALL += "packagegroup-my-connectivity"\`

Built-in package groups: \`packagegroup-core-boot\`, \`packagegroup-core-tools-debug\`, \`packagegroup-core-full-cmdline\`.

## wic — Creating Partitioned Disk Images

The \`wic\` tool creates **partitioned, flashable disk images** using \`.wks\` layout files. This is what you actually write to an SD card or eMMC.

\`\`\`bash
# A .wks file defines the partition layout
# Example: sdimage-raspberrypi.wks
part /boot --source bootimg-partition --fstype=vfat --label boot --active --size 64
part / --source rootfs --fstype=ext4 --label root

# Build a wic image
$ bitbake my-image    # IMAGE_FSTYPES must include "wic"
# Output: tmp/deploy/images/MACHINE/my-image-MACHINE.wic

# Or create manually
$ wic create sdimage-raspberrypi -e my-image
\`\`\`

### Flash to SD Card

\`\`\`bash
# Decompress and write to SD card
$ bzcat my-image-raspberrypi4.wic.bz2 | sudo dd of=/dev/sdX bs=4M status=progress
$ sync
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

The Linux kernel is the most critical component of your embedded system. Yocto provides sophisticated tools for selecting, configuring, patching, and building the kernel. Understanding kernel configuration is essential for any embedded Linux developer.

## Selecting a Kernel

Yocto uses the **virtual provider** mechanism to select which kernel recipe to build:

\`\`\`bash
# In machine config or local.conf
PREFERRED_PROVIDER_virtual/kernel = "linux-yocto"    # Yocto's reference kernel
PREFERRED_VERSION_linux-yocto = "6.6%"                # Pin to 6.6.x series
\`\`\`

Common kernel providers:

| Provider | Use Case |
|----------|----------|
| \`linux-yocto\` | Reference kernel with Yocto kernel metadata system |
| \`linux-yocto-rt\` | Real-time (PREEMPT_RT) variant |
| \`linux-yocto-tiny\` | Minimal kernel for size-constrained systems |
| \`linux-raspberrypi\` | Raspberry Pi Foundation kernel |
| \`linux-ti-staging\` | TI kernel for BeagleBone etc. |
| \`linux-custom\` | Your own custom kernel recipe |

## Kernel Configuration Approaches

There are three ways to configure the kernel in Yocto, from least to most flexible:

### 1. defconfig — Full Base Configuration

Provide a complete \`.config\` file as a defconfig:

\`\`\`bash
# In your bbappend or kernel recipe
SRC_URI += "file://defconfig"
\`\`\`

The defconfig file is a complete kernel configuration. Generate it from menuconfig or copy from a working system.

### 2. Configuration Fragments (.cfg) — Incremental Changes

Configuration fragments modify the base defconfig. This is the **recommended approach** for most customizations:

\`\`\`bash
SRC_URI += "file://defconfig \\
            file://enable-can.cfg \\
            file://enable-wifi.cfg \\
            file://disable-debug.cfg"
\`\`\`

Each \`.cfg\` file contains just the options you want to change:

\`\`\`bash
# enable-can.cfg
CONFIG_CAN=y
CONFIG_CAN_RAW=y
CONFIG_CAN_VCAN=y
CONFIG_CAN_MCP251X=m

# disable-debug.cfg
# CONFIG_DEBUG_INFO is not set
# CONFIG_DEBUG_FS is not set
\`\`\`

> **Why fragments?** They are small, self-documenting, and composable. You can mix and match fragments for different products: base + wifi + bluetooth for product A, base + can + ethernet for product B.

### 3. menuconfig — Interactive Configuration

\`\`\`bash
# Open the kernel menuconfig GUI
$ bitbake virtual/kernel -c menuconfig

# After saving, create a fragment from your changes
$ bitbake virtual/kernel -c diffconfig
# Creates a .cfg fragment in tmp/work/<arch>/linux-yocto/<version>/fragment.cfg
\`\`\`

The \`diffconfig\` task compares your menuconfig changes against the original and generates a minimal fragment. Copy this fragment to your layer and add it to SRC_URI.

> **Workflow:** menuconfig to experiment -> diffconfig to extract changes -> save .cfg to your layer -> add to SRC_URI in bbappend

## LINUX_KERNEL_TYPE

Kernel types define the baseline configuration policy:

| Type | Description | Use Case |
|------|-------------|----------|
| \`standard\` | Default generic kernel config | General-purpose embedded systems |
| \`tiny\` | Bare minimum configuration | Size-constrained devices (< 1 MB kernel) |
| \`preempt-rt\` | PREEMPT_RT real-time patch applied | Industrial control, robotics, audio |

\`\`\`bash
# In machine config
LINUX_KERNEL_TYPE = "standard"    # Default
LINUX_KERNEL_TYPE = "preempt-rt"  # For real-time requirements
\`\`\`

## KERNEL_FEATURES and .scc Files

The linux-yocto kernel metadata system uses \`.scc\` (Source Configuration Control) files to bundle kernel config fragments and patches into named features:

\`\`\`bash
# Enable a kernel feature
KERNEL_FEATURES += "features/nunchuk.scc"
\`\`\`

An \`.scc\` file describes a feature:

\`\`\`
define KFEATURE_DESCRIPTION "Nunchuk controller support"
kconf hardware nunchuk.cfg       # Apply this config fragment
patch nunchuk-driver.patch       # Apply this patch
\`\`\`

This system lets you bundle related config options and patches as a single "feature" that can be enabled or disabled cleanly.

## kernel.bbclass — What It Provides

The kernel class handles all the complexity of cross-compiling the Linux kernel:

- **Auto-applies defconfig** from SRC_URI
- **Merges .cfg fragments** on top of defconfig
- **Provides virtual/kernel** so machine configs can select the kernel
- **Splits output** into multiple packages:

| Package | Contents |
|---------|----------|
| \`kernel-image\` | The kernel binary (zImage, Image, etc.) |
| \`kernel-modules\` | All built-in kernel modules (\*.ko) |
| \`kernel-dev\` | Headers for out-of-tree module compilation |
| \`kernel-vmlinux\` | Uncompressed kernel (for debugging) |
| \`kernel-devicetree\` | Device tree blobs (.dtb) |

Key variables:

| Variable | Purpose | Example |
|----------|---------|---------|
| \`KERNEL_IMAGETYPE\` | Kernel binary format | zImage, Image, bzImage |
| \`KERNEL_DEVICETREE\` | Device tree files to build | am335x-boneblack.dtb |
| \`KERNEL_EXTRA_ARGS\` | Extra make arguments | LOADADDR=0x80008000 |
| \`INITRAMFS_IMAGE\` | Embed initramfs in kernel | core-image-minimal-initramfs |
| \`KERNEL_MODULE_AUTOLOAD\` | Modules to load at boot | i2c-dev spi-dev |

## Practical Example: Adding CAN Bus Support

\`\`\`bash
# meta-custom/recipes-kernel/linux/linux-yocto_%.bbappend
FILESEXTRAPATHS:prepend := "\\\${THISDIR}/\\\${BPN}:"
SRC_URI += "file://enable-can.cfg"
\`\`\`

\`\`\`bash
# meta-custom/recipes-kernel/linux/linux-yocto/enable-can.cfg
CONFIG_CAN=y
CONFIG_CAN_RAW=y
CONFIG_CAN_BCM=y
CONFIG_CAN_GW=y
CONFIG_CAN_VCAN=m
CONFIG_CAN_C_CAN=m
CONFIG_CAN_C_CAN_PLATFORM=m
\`\`\`

## Common Pitfalls

1. **Forgetting FILESEXTRAPATHS** when adding .cfg fragments in a bbappend
2. **Using menuconfig changes without saving** — menuconfig changes are lost on rebuild unless you extract them with diffconfig
3. **CONFIG conflicts** — Later .cfg fragments override earlier ones. Check with \`bitbake virtual/kernel -c kernel_configcheck\`
4. **Module vs built-in** — Use \`=m\` for modules (loaded on demand) and \`=y\` for built-in (always available). Modules save memory but require module loading infrastructure.
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

\`devtool\` is the **Swiss Army knife** of Yocto development. It provides a streamlined workflow for creating new recipes, modifying existing ones, and rapidly iterating on code without manually editing recipe files. If you're actively developing software for a Yocto-based system, devtool will save you hours.

## Why devtool?

Without devtool, the development cycle looks like:
1. Edit source code
2. Create a patch
3. Add patch to SRC_URI in recipe
4. \`bitbake myapp\` (rebuilds from scratch)
5. Flash new image to target
6. Test... find a bug... repeat from step 1

With devtool, the cycle becomes:
1. \`devtool modify myapp\` (checks out source)
2. Edit source code directly
3. \`devtool build myapp\` (incremental build)
4. \`devtool deploy-target myapp root@target\` (instant deploy via SSH)
5. Test... find a bug... edit and rebuild in seconds

## Three Starting Commands

| Command | Purpose | When to Use |
|---------|---------|-------------|
| \`devtool add <name> <uri>\` | Create a **new** recipe | Bringing new software into your Yocto build |
| \`devtool modify <recipe>\` | Check out source of an **existing** recipe | Need to modify/debug software that already has a recipe |
| \`devtool upgrade -V <ver> <recipe>\` | Upgrade recipe to new version | Upstream released a new version |

### devtool add — Creating New Recipes

\`\`\`bash
# From a git repository
$ devtool add myapp https://github.com/example/myapp.git

# From a tarball
$ devtool add myapp https://example.com/myapp-1.0.tar.gz

# From local source directory
$ devtool add myapp /home/user/myapp-source
\`\`\`

devtool analyzes the source (detects build system: autotools, cmake, meson, etc.) and **auto-generates a recipe** in the workspace. It's a great starting point — you can refine the recipe later.

### devtool modify — Modifying Existing Recipes

\`\`\`bash
$ devtool modify dropbear
# Source checked out to workspace/sources/dropbear/
# The source directory is a git repo — make changes and commit
\`\`\`

This extracts the source code with all patches applied and sets up the workspace so that builds use your local copy instead of fetching from upstream.

### devtool upgrade — Version Bumps

\`\`\`bash
$ devtool upgrade -V 2024.86 dropbear
# Downloads new version, re-applies existing patches, reports conflicts
\`\`\`

## Development Workflow

\`\`\`bash
# 1. Start modifying a recipe
$ devtool modify myapp

# 2. Edit the source code
$ cd workspace/sources/myapp
$ vim src/main.c
$ git add -A && git commit -m "Fix timeout bug"

# 3. Build incrementally (only recompiles changed files)
$ devtool build myapp

# 4. Deploy to a running target via SSH (instant!)
$ devtool deploy-target myapp root@192.168.1.100

# 5. Test on target... works! Now save your changes back to the recipe

# 6. Generate patches from your git commits
$ devtool update-recipe myapp
# Creates patch files and updates the recipe's SRC_URI

# 7. Clean up — remove from devtool control
$ devtool reset myapp

# 8. Verify the recipe builds normally
$ bitbake myapp
\`\`\`

## Other Useful Commands

\`\`\`bash
# Edit the recipe file directly
$ devtool edit-recipe myapp

# Build an image that includes your devtool packages
$ devtool build-image core-image-minimal

# List all recipes under devtool control
$ devtool status

# Undo deployment on target
$ devtool undeploy-target myapp root@192.168.1.100

# Search for existing recipes
$ devtool search "json parser"
\`\`\`

## The Workspace

The devtool workspace lives at \`\\\${BUILDDIR}/workspace/\`:

\`\`\`
workspace/
+-- appends/           # Auto-generated bbappend files
|   +-- myapp_%.bbappend
+-- recipes/           # Auto-generated recipes (from devtool add)
|   +-- myapp/
|       +-- myapp_1.0.bb
+-- sources/           # Checked-out source code
    +-- myapp/         # This is a git repo
\`\`\`

> **Critical:** The workspace source directory is managed by git. Always **commit your changes** before running \`devtool update-recipe\`. Uncommitted changes are ignored!

## Common Pitfalls

1. **Forgetting to commit** — devtool update-recipe only generates patches from git commits, not uncommitted changes
2. **Not running devtool reset** — Recipes stay in devtool control until you reset them. Other team members won't have your workspace.
3. **Workspace is local** — The workspace is not version-controlled. After \`devtool update-recipe\`, the patches are in your layer — that's what you commit to git.
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

An SDK (Software Development Kit) is a **self-contained cross-compilation environment** that developers can use without having the full Yocto build system installed. It's how you enable application developers to compile code for your target device from their regular workstation.

## Why SDKs?

- **Separation of roles:** BSP engineers maintain the Yocto build; application developers use the SDK
- **Speed:** Compiling a single application with the SDK takes seconds, not the hours of a full Yocto build
- **Portability:** The SDK is a self-extracting archive that installs anywhere
- **No Yocto knowledge required:** Application developers just \`source\` the environment script and use \`\\\$CC\`

## Two Types of SDKs

| Type | Command | Contents | Use Case |
|------|---------|----------|----------|
| **Generic SDK** | \`bitbake meta-toolchain\` | Cross-compiler + basic headers (glibc) | Bootloader/kernel development |
| **Image-based SDK** | \`bitbake -c populate_sdk <image>\` | Cross-compiler + ALL libraries from the image | Application development |

### Generic SDK

Contains only the cross-compiler toolchain and basic C library headers. Sufficient for:
- Compiling U-Boot
- Building the kernel
- Simple C programs with no library dependencies

### Image-based SDK

Contains the cross-compiler PLUS **every library** that's installed in the target image. This means if your image includes OpenSSL, Qt, and GStreamer, the SDK has their headers and libraries for cross-compilation.

\`\`\`bash
# Generate an SDK matching your custom image
$ bitbake -c populate_sdk my-image

# Output: a self-extracting shell script
# tmp/deploy/sdk/poky-glibc-x86_64-my-image-cortexa7t2hf-neon-vfpv4-raspberrypi4-toolchain-4.0.sh
\`\`\`

## Installing and Using the SDK

\`\`\`bash
# 1. Install (default location: /opt/poky/<version>)
$ ./poky-glibc-x86_64-my-image-cortexa7t2hf-...toolchain-4.0.sh

# 2. Source the environment setup script (in every new terminal)
$ source /opt/poky/4.0/environment-setup-cortexa7t2hf-neon-vfpv4-poky-linux-gnueabi

# 3. Cross-compile!
$ $CC -o myapp myapp.c           # Simple program
$ $CC -o myapp myapp.c -lssl     # With OpenSSL (if in SDK)

# 4. For autotools projects
$ ./configure $CONFIGURE_FLAGS
$ make

# 5. For CMake projects
$ cmake -DCMAKE_TOOLCHAIN_FILE=$OECORE_NATIVE_SYSROOT/usr/share/cmake/OEToolchainConfig.cmake .
$ make
\`\`\`

## Environment Variables Set by the SDK

After sourcing the setup script, these variables are configured:

| Variable | Purpose | Example Value |
|----------|---------|---------------|
| \`CC\` | C compiler | arm-poky-linux-gnueabi-gcc --sysroot=... |
| \`CXX\` | C++ compiler | arm-poky-linux-gnueabi-g++ --sysroot=... |
| \`LD\` | Linker | arm-poky-linux-gnueabi-ld --sysroot=... |
| \`CFLAGS\` | C compiler flags | -O2 -pipe -march=armv7-a -mfpu=neon ... |
| \`LDFLAGS\` | Linker flags | --sysroot=... |
| \`ARCH\` | Architecture (for kernel builds) | arm |
| \`CROSS_COMPILE\` | Prefix (for kernel builds) | arm-poky-linux-gnueabi- |
| \`CONFIGURE_FLAGS\` | Autotools configure flags | --host=arm-poky-linux-gnueabi ... |
| \`PKG_CONFIG_PATH\` | pkg-config search path | Points to target sysroot |

## Customizing the SDK

### Adding Target Libraries

\`\`\`bash
# In local.conf or image recipe — add target packages to SDK
TOOLCHAIN_TARGET_TASK:append = " libssl-dev libcurl-dev"
\`\`\`

### Adding Host Tools

\`\`\`bash
# Add tools that run on the build host (not the target)
TOOLCHAIN_HOST_TASK:append = " nativesdk-cmake nativesdk-python3"
\`\`\`

## Extensible SDK (eSDK)

The eSDK is an enhanced version that includes devtool and can install additional packages on-demand:

\`\`\`bash
# Generate eSDK
$ bitbake -c populate_sdk_ext my-image

# After installing, you get devtool inside the SDK
$ devtool sdk-install libgpiod    # Install additional library into SDK
$ devtool add myapp ./myapp-src   # Create recipe from SDK
\`\`\`

| Feature | Standard SDK | Extensible SDK |
|---------|-------------|----------------|
| Size | ~500 MB | ~1-3 GB |
| devtool | No | Yes |
| Install new packages | Rebuild SDK | \`devtool sdk-install\` |
| Build recipes | No | Yes |

> **Recommendation:** Use the standard SDK for stable projects where the library set is fixed. Use the eSDK during active development when you frequently need new libraries.
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

When something goes wrong in a Yocto build — and it will — knowing how to diagnose the issue quickly is essential. This lesson covers the tools and techniques for debugging build failures, variable issues, package problems, and image composition.

## Build Failure Diagnosis

When a build fails, BitBake tells you which task failed. The first step is always to **read the log file**:

\`\`\`bash
# BitBake error output will look like:
# ERROR: Task (path/to/recipe.bb:do_compile) failed
# ERROR: Logfile of failure stored in: tmp/work/<arch>/<recipe>/<ver>/temp/log.do_compile

# Read the log file
$ cat tmp/work/cortexa7t2hf-neon-vfpv4-poky-linux-gnueabi/myapp/1.0-r0/temp/log.do_compile
\`\`\`

### Log and Run Files

Every task generates two files in the recipe's \`temp/\` directory:

| File | Purpose | When to Use |
|------|---------|-------------|
| \`log.do_<task>\` | Complete output (stdout + stderr) | Read this first to find the error |
| \`run.do_<task>\` | The generated shell script that was executed | Understand what commands ran and reproduce the failure |

To reproduce a failure manually:

\`\`\`bash
# Open a shell with the exact build environment
$ bitbake -c devshell myapp

# Inside the devshell, you can run commands manually
$ cat ../temp/run.do_compile   # See what was supposed to run
$ make                         # Try compiling manually
\`\`\`

## Variable Debugging with bitbake-getvar

When a build behaves unexpectedly, the variable values might not be what you think. \`bitbake-getvar\` traces how a variable gets its final value:

\`\`\`bash
# Global variable — shows all config files that touch it
$ bitbake-getvar IMAGE_INSTALL

# Per-recipe variable — shows the value as seen by a specific recipe
$ bitbake-getvar -r ncurses SRC_URI
$ bitbake-getvar -r ncurses DEPENDS

# The output shows:
# 1. Each file that sets/modifies the variable
# 2. The pre-expansion value (with variable references)
# 3. The final expanded value
\`\`\`

For even more detail:

\`\`\`bash
# Dump ALL variables for a recipe (very verbose, pipe to a file)
$ bitbake -e myapp > myapp-env.txt
$ grep "^SRC_URI=" myapp-env.txt
$ grep "^DEPENDS=" myapp-env.txt
\`\`\`

## Package Investigation with oe-pkgdata-util

When you need to understand what's in your packages:

\`\`\`bash
# Which package provides a file?
$ oe-pkgdata-util find-path /usr/bin/busybox
# Output: busybox: /usr/bin/busybox

# What files does a package contain?
$ oe-pkgdata-util list-pkg-files dropbear
# Output: lists all files installed by dropbear

# Which recipe produces a package?
$ oe-pkgdata-util lookup-recipe busybox
# Output: busybox

# List all packages produced by a recipe
$ oe-pkgdata-util list-packages busybox
# Output: busybox, busybox-dbg, busybox-dev, busybox-doc

# Search for packages by name
$ oe-pkgdata-util glob '*ssl*'
\`\`\`

> **Common question:** "I installed dropbear but /usr/bin/ssh is missing!" Use \`oe-pkgdata-util list-pkg-files dropbear\` to see exactly what files dropbear installs.

## Build History — Tracking Changes Over Time

Build history records what changed between builds:

\`\`\`bash
# Enable in local.conf
INHERIT += "buildhistory"
BUILDHISTORY_COMMIT = "1"    # Auto-commit to git for easy diff
\`\`\`

This creates a \`buildhistory/\` directory (a git repo) that tracks:
- Package versions, sizes, and dependencies
- Image contents (every file in the rootfs)
- SDK contents

\`\`\`bash
# Compare two builds
$ buildhistory-diff buildhistory/

# Example output:
# packages/cortexa7t2hf-neon-vfpv4-poky-linux-gnueabi/dropbear:
#   PKGSIZE changed: 167936 -> 172032 (+2.4%)
# images/raspberrypi4-64/my-image:
#   Installed packages changed: +libcurl4 -wget
\`\`\`

## Source Fetching Order

Understanding how BitBake fetches source code helps debug download failures:

\`\`\`
DL_DIR (local cache)
   |--- found? -> use cached copy
   |--- not found? -> continue
   v
PREMIRRORS (corporate mirrors, checked first)
   |--- found? -> download and cache
   |--- not found? -> continue
   v
SRC_URI (upstream source, the original URL)
   |--- found? -> download and cache
   |--- not found? -> continue
   v
MIRRORS (fallback mirrors, Yocto project mirrors)
   |--- found? -> download and cache
   |--- not found? -> BUILD FAILS
\`\`\`

\`\`\`bash
# Set up a corporate mirror (avoid hitting upstream every build)
PREMIRRORS:prepend = "\\
    git://.*/.* http://mirror.mycompany.com/sources/ \\
    https://.*/.* http://mirror.mycompany.com/sources/ \\
"
\`\`\`

## Common Build Failures and Solutions

### 1. do_fetch Failure

\`\`\`
ERROR: Fetcher failure: Unable to find revision abc123
\`\`\`

**Cause:** SRCREV points to a non-existent commit, or the remote is unreachable.
**Fix:** Verify the SRCREV commit exists, check network connectivity, check PREMIRRORS.

### 2. do_compile Failure

\`\`\`
ERROR: oe_runmake failed
\`\`\`

**Cause:** Compilation error (missing header, wrong flag, cross-compile issue).
**Fix:** Read \`log.do_compile\`, use \`bitbake -c devshell\` to debug interactively.

### 3. do_package_qa Failure

\`\`\`
ERROR: QA Issue: File /usr/lib/libfoo.so in package foo, expected in foo-dev
\`\`\`

**Cause:** Files ended up in the wrong sub-package.
**Fix:** Add \`FILES:\\\${PN} += "/usr/lib/libfoo.so"\` in the recipe, or set \`INSANE_SKIP:\\\${PN} += "dev-so"\` (use sparingly).

### 4. "Nothing PROVIDES" Error

\`\`\`
ERROR: Nothing PROVIDES 'libfoo'
\`\`\`

**Cause:** A recipe depends on \`libfoo\` but no recipe in any active layer provides it.
**Fix:** Add the layer that contains \`libfoo\`, or check if the recipe name is different.

## Useful Debugging Commands Summary

| Command | Purpose |
|---------|---------|
| \`bitbake -e <recipe>\` | Dump all variables for a recipe |
| \`bitbake-getvar -r <recipe> <VAR>\` | Trace a variable's value |
| \`bitbake -c devshell <recipe>\` | Interactive shell in build environment |
| \`bitbake -c listtasks <recipe>\` | List all tasks for a recipe |
| \`bitbake -DDD <recipe>\` | Maximum debug output |
| \`bitbake-layers show-recipes\` | Which layer provides each recipe |
| \`bitbake-layers show-appends\` | Which bbappend files are active |
| \`oe-pkgdata-util find-path <file>\` | Find which package ships a file |
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

Understanding how BitBake variables work is fundamental to Yocto. Variables control everything — what to build, how to build it, and what goes into the final image. Getting variable assignment wrong is one of the most common sources of Yocto bugs.

## Variable Basics

- Variable names are **UPPERCASE** by convention (e.g., \`SRC_URI\`, \`IMAGE_INSTALL\`)
- Values are always **strings** (even numbers are stored as strings)
- **Scope:** Variables in \`.conf\` files are global; variables in \`.bb\`/\`.bbappend\`/\`.bbclass\` are local to that recipe

## All Assignment Operators

| Operator | Name | Behavior |
|----------|------|----------|
| \`=\` | Deferred assignment | Value expanded when the variable is **used** (lazy evaluation) |
| \`:=\` | Immediate assignment | Value expanded **now** at parse time (eager evaluation) |
| \`+=\` | Append with space | Adds to the end with a space separator |
| \`=+\` | Prepend with space | Adds to the beginning with a space separator |
| \`.=\` | Append without space | Concatenates directly (no separator) |
| \`=.\` | Prepend without space | Prepends directly (no separator) |
| \`?=\` | Default value | Sets value only if variable is **not already set** |
| \`??=\` | Weak default | Even lower priority than \`?=\` — last resort default |

## Deferred (=) vs Immediate (:=) — The Critical Difference

This is the most important concept to understand:

\`\`\`bash
# With = (deferred expansion):
COLOUR = "blue"
SKY = "\\\${COLOUR}"     # SKY stores the reference "\\\${COLOUR}", not "blue"
COLOUR = "grey"         # COLOUR changes
# When SKY is finally used -> "grey" (latest value of COLOUR)

# With := (immediate expansion):
COLOUR = "blue"
SKY := "\\\${COLOUR}"    # SKY immediately resolves to "blue"
COLOUR = "grey"         # COLOUR changes, but SKY is already set
# When SKY is finally used -> "blue" (captured at parse time)
\`\`\`

> **When to use :=** Use immediate assignment when you need to capture a variable's current value, like \`FILESEXTRAPATHS:prepend := "\\\${THISDIR}/files:"\` — \`\\\${THISDIR}\` must resolve to the current file's directory at parse time, not later.

## Append and Prepend in Detail

\`\`\`bash
# += appends WITH a space
IMAGE_INSTALL = "busybox"
IMAGE_INSTALL += "dropbear"
# Result: "busybox dropbear"

# .= appends WITHOUT a space
MY_PATH = "/usr/bin"
MY_PATH .= ":/usr/sbin"
# Result: "/usr/bin:/usr/sbin"

# =+ prepends WITH a space
CFLAGS =+ "-Wall"
# CFLAGS = "-Wall <original value>"

# =. prepends WITHOUT a space
PREFIX =. "/opt"
# PREFIX = "/opt<original value>"
\`\`\`

## Default Values (?= and ??=)

\`\`\`bash
# ?= sets value only if not already set
MACHINE ?= "qemux86-64"     # Default, can be overridden by user

# ??= is a weaker default
MACHINE ??= "qemux86-64"    # Only takes effect if nothing else sets MACHINE
\`\`\`

### Priority of Defaults

\`\`\`bash
# Recipe layer sets:
MACHINE ??= "genericx86-64"   # Weakest

# Distro layer sets:
MACHINE ?= "qemux86-64"       # Stronger

# User sets in local.conf:
MACHINE = "raspberrypi4-64"   # Strongest — always wins

# Final value: "raspberrypi4-64"
\`\`\`

> **Use case for ??=:** Layer authors use \`??=\` to provide ultimate fallback defaults. Recipe authors use \`?=\` for sensible defaults. Users use \`=\` to override everything.

## Parse Order Caveat

\`\`\`bash
# Scenario 1: ?= before +=
VAR ?= "a"
VAR += "b"
# Result: "a b" (VAR was set to "a" by ?=, then "b" appended)

# Scenario 2: += before ?=
VAR += "b"
VAR ?= "a"
# Result: " b" (VAR was already touched by +=, so ?= is ignored!)
\`\`\`

This is confusing because \`+=\` on an unset variable creates \`" b"\` (note the leading space), and since VAR is now "set", \`?=\` has no effect.

## Why Avoid +=, =+, .=, =. in Configuration Files

In \`.conf\` files (like \`local.conf\`), parse order between files is **hard to predict**. Using \`+=\` depends on what value the variable has at that exact point in parsing — which varies based on layer priority, include order, and other factors.

\`\`\`bash
# BAD — in local.conf:
IMAGE_INSTALL += "dropbear"     # Depends on parse order — fragile!

# GOOD — in local.conf:
IMAGE_INSTALL:append = " dropbear"  # Always works regardless of parse order
\`\`\`

> **Best practice:** In \`.conf\` files, use \`:append\`, \`:prepend\`, and \`:remove\` (covered in the Overrides lesson) instead of \`+=\`, \`=+\`, \`.=\`, \`=.\`. The override operators work at expansion time and are parse-order-independent.

> **In recipes** (\`.bb\` files), \`+=\` is fine because recipe parsing is self-contained.

## Summary: Choosing the Right Operator

| Situation | Use |
|-----------|-----|
| Set a variable to a fixed value | \`=\` |
| Capture a value at parse time | \`:=\` |
| Add to a variable in a recipe | \`+=\` or \`.=\` |
| Add to a variable in a config file | \`:append\` or \`:prepend\` |
| Provide a default in a recipe | \`?=\` |
| Provide a fallback default in a layer | \`??=\` |
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

The overrides system is Yocto's mechanism for **conditionally modifying variables**. Unlike parse-time operators (\`+=\`, \`?=\`), overrides work at **expansion time** — when the variable is actually read. This makes them predictable and parse-order-independent, which is why they're the recommended way to modify variables in configuration files.

## :append, :prepend, :remove

These three operators are the workhorses of the overrides system:

### :append — Add to the End

\`\`\`bash
IMAGE_INSTALL:append = " dropbear"
\`\`\`

> **Critical:** Note the **leading space** inside the quotes! \`:append\` concatenates directly — it does NOT add a space automatically. Forgetting the space is the #1 beginner mistake:

\`\`\`bash
# WRONG — results in "busyboxdropbear"
IMAGE_INSTALL:append = "dropbear"

# CORRECT — results in "busybox dropbear"
IMAGE_INSTALL:append = " dropbear"
\`\`\`

### :prepend — Add to the Beginning

\`\`\`bash
PATH:prepend = "/my/custom/bin:"
CFLAGS:prepend = "-I\\\${STAGING_INCDIR}/mylib "
\`\`\`

Note the trailing space (or separator) — same reason as :append.

### :remove — Remove Entries

\`\`\`bash
IMAGE_INSTALL:remove = "i2c-tools"      # Removes all occurrences
DISTRO_FEATURES:remove = "x11 wayland"  # Can remove multiple entries
\`\`\`

\`:remove\` filters out matching entries from the final value. It works regardless of when or where the entry was added.

## Why :append is Better Than += in Config Files

\`\`\`bash
# With += (parse-time, order-dependent):
# In layer A (parsed first):   IMAGE_INSTALL = "busybox"
# In layer B (parsed second):  IMAGE_INSTALL += "dropbear"
# In layer C (parsed third):   IMAGE_INSTALL = "coreutils"   # OOPS: wipes out everything!
# Result: "coreutils" — dropbear is lost!

# With :append (expansion-time, order-independent):
# In layer A: IMAGE_INSTALL = "busybox"
# In layer B: IMAGE_INSTALL:append = " dropbear"
# In layer C: IMAGE_INSTALL = "coreutils"
# Result: "coreutils dropbear" — :append always runs after = assignments
\`\`\`

> **Key insight:** \`:append\` is applied AFTER all regular \`=\` assignments are resolved. It cannot be "wiped out" by a later \`=\` assignment. This is what makes it safe for use in configuration files.

## Conditional Overrides

You can make a variable setting apply **only for a specific machine, distro, or architecture** by adding the condition as an override:

\`\`\`bash
# Set only for beaglebone machine
KERNEL_DEVICETREE:beaglebone = "am335x-boneblack.dtb"

# Set only for Raspberry Pi 4
KERNEL_IMAGETYPE:raspberrypi4-64 = "Image"

# Set only for ARM architecture
CFLAGS:arm = "-mthumb"

# Set only for a specific distro
DISTRO_FEATURES:poky = "systemd usrmerge"
\`\`\`

These only take effect when the condition (MACHINE, ARCH, DISTRO, etc.) matches. Otherwise, they are silently ignored.

### What Can Be Used as Conditions?

Conditions come from the \`OVERRIDES\` variable, which is automatically populated with:

| Override | Source | Example Values |
|----------|--------|----------------|
| Machine name | MACHINE | beaglebone, raspberrypi4-64 |
| Architecture | TARGET_ARCH | arm, aarch64, x86-64 |
| Distro name | DISTRO | poky, mydistro |
| SoC family | MACHINEOVERRIDES | ti-soc, rpi |
| Class overrides | Various | class-target, class-native |

## Combining Overrides

You can combine :append/:prepend with conditional overrides:

\`\`\`bash
# Append ONLY for beaglebone
IMAGE_INSTALL:append:beaglebone = " i2c-tools can-utils"

# Prepend ONLY for ARM
CFLAGS:prepend:arm = "-mfpu=neon "

# Remove ONLY for a tiny distro
DISTRO_FEATURES:remove:poky-tiny = "bluetooth wifi"
\`\`\`

The order reads right-to-left: "for beaglebone, append to IMAGE_INSTALL."

## Application Order

Understanding the order is essential for debugging:

1. **Regular operators** — \`=\`, \`:=\`, \`?=\`, \`??=\` (resolved during parsing)
2. **:append** — Applied after all regular assignments
3. **:prepend** — Applied after all regular assignments (before :append in the value)
4. **:remove** — Applied last, filters out matching entries

\`\`\`bash
# Example of full resolution:
VAR = "a b c"              # Step 1: regular assignment -> "a b c"
VAR:append = " d"           # Step 2: append -> "a b c d"
VAR:prepend = "z "          # Step 3: prepend -> "z a b c d"
VAR:remove = "b"            # Step 4: remove -> "z a c d"
\`\`\`

## Syntax Change (Honister 3.4+)

In Yocto 3.4 (Honister) and later, the override syntax changed from **underscores to colons**:

| Old Syntax (pre-3.4) | New Syntax (3.4+) |
|-----------------------|-------------------|
| \`IMAGE_INSTALL_append\` | \`IMAGE_INSTALL:append\` |
| \`IMAGE_INSTALL_append_beaglebone\` | \`IMAGE_INSTALL:append:beaglebone\` |
| \`KERNEL_DEVICETREE_beaglebone\` | \`KERNEL_DEVICETREE:beaglebone\` |
| \`do_install_append\` | \`do_install:append\` |
| \`RDEPENDS_\\\${PN}\` | \`RDEPENDS:\\\${PN}\` |

> **No backward compatibility!** Old underscore syntax silently fails (the override is treated as part of the variable name). If migrating from older Yocto, use \`scripts/contrib/convert-overrides.py\` to convert automatically.

## Practical Examples

\`\`\`bash
# In local.conf — add SSH server to image
IMAGE_INSTALL:append = " openssh-sftp-server openssh-sshd"

# In distro.conf — switch from sysvinit to systemd
DISTRO_FEATURES:append = " systemd"
DISTRO_FEATURES:remove = "sysvinit"
VIRTUAL-RUNTIME_init_manager = "systemd"

# In machine.conf — add machine-specific kernel module
KERNEL_MODULE_AUTOLOAD:append:mymachine = " spi-dev"

# In a bbappend — add debug flag only for development builds
CFLAGS:append = " -DDEBUG_MODE"
\`\`\`
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

A BSP (Board Support Package) layer contains everything needed to run Linux on a specific piece of hardware: machine configuration, kernel recipe, bootloader recipe, device drivers, and firmware blobs. It's the bridge between Yocto's generic build system and your actual hardware.

## What a BSP Layer Provides

| Component | Location in Layer | Purpose |
|-----------|-------------------|---------|
| Machine configs | \`conf/machine/*.conf\` | Define hardware: CPU, features, bootloader |
| Kernel recipe/bbappend | \`recipes-kernel/linux/\` | Custom kernel with hardware patches |
| Bootloader recipe | \`recipes-bsp/u-boot/\` | U-Boot with board-specific config |
| Device drivers | \`recipes-kernel/\` | Out-of-tree kernel modules |
| Firmware | \`recipes-bsp/firmware/\` | Wi-Fi, Bluetooth, GPU firmware blobs |
| Device trees | \`recipes-kernel/linux/\` | .dts/.dtb files for the hardware |

## BSP Layer Structure

\`\`\`
meta-mybsp/
+-- conf/
|   +-- layer.conf
|   +-- machine/
|       +-- mymachine.conf         # MACHINE = "mymachine" selects this
|       +-- mymachine-dev.conf     # Variant with debug features
+-- recipes-bsp/
|   +-- u-boot/
|   |   +-- u-boot_%.bbappend     # Board-specific U-Boot config
|   |   +-- u-boot/
|   |       +-- mymachine.cfg      # U-Boot defconfig
|   +-- firmware/
|       +-- wifi-firmware_1.0.bb   # Proprietary Wi-Fi firmware
+-- recipes-kernel/
|   +-- linux/
|       +-- linux-yocto_%.bbappend
|       +-- linux-yocto/
|           +-- mymachine.cfg      # Kernel config fragment
|           +-- 0001-add-driver.patch
+-- wic/
    +-- mymachine.wks              # Disk partition layout
\`\`\`

## Machine Configuration — The Core of a BSP

The machine configuration file defines your hardware. Its filename becomes the MACHINE value:

\`\`\`bash
# conf/machine/mymachine.conf

#@TYPE: Machine
#@NAME: My Custom Board
#@DESCRIPTION: Machine config for My Custom Board based on i.MX6

# CPU architecture and tuning
require conf/machine/include/arm/armv7a/tune-cortexa9.inc

# Kernel
PREFERRED_PROVIDER_virtual/kernel ?= "linux-yocto"
PREFERRED_VERSION_linux-yocto ?= "6.6%"
KERNEL_IMAGETYPE = "zImage"
KERNEL_DEVICETREE = "imx6dl-myboard.dtb"

# Bootloader
PREFERRED_PROVIDER_virtual/bootloader ?= "u-boot"
UBOOT_MACHINE = "myboard_defconfig"
UBOOT_SUFFIX = "img"
SPL_BINARY = "SPL"

# Serial console for getty
SERIAL_CONSOLES = "115200;ttymxc0"

# Hardware features this machine provides
MACHINE_FEATURES = "usbhost usbgadget vfat ext2 screen wifi bluetooth"

# Additional kernel modules to autoload
KERNEL_MODULE_AUTOLOAD += "i2c-dev spi-dev"

# Image: what filesystem types and max size
IMAGE_FSTYPES = "wic.bz2 ext4"
WKS_FILE = "mymachine.wks"

# Extra dependencies (built but not installed in rootfs)
EXTRA_IMAGEDEPENDS += "u-boot"
\`\`\`

## Key Machine Configuration Variables

| Variable | Purpose | Example |
|----------|---------|---------|
| \`TARGET_ARCH\` | CPU architecture | arm, aarch64, x86-64 |
| \`DEFAULTTUNE\` | CPU tuning (instruction set, FPU) | cortexa9hf-neon |
| \`PREFERRED_PROVIDER_virtual/kernel\` | Which kernel recipe to use | linux-yocto |
| \`KERNEL_IMAGETYPE\` | Kernel binary format | zImage, Image, bzImage |
| \`KERNEL_DEVICETREE\` | Device tree blobs to build | imx6dl-myboard.dtb |
| \`SERIAL_CONSOLES\` | Serial console for login prompt | 115200;ttymxc0 |
| \`MACHINE_FEATURES\` | Hardware capabilities | usbhost wifi bluetooth screen |
| \`IMAGE_FSTYPES\` | Default output image formats | wic.bz2 ext4 |
| \`KERNEL_MODULE_AUTOLOAD\` | Kernel modules to load at boot | i2c-dev spi-dev |
| \`MACHINE_EXTRA_RRECOMMENDS\` | Extra packages for this machine | kernel-modules firmware-wifi |

## MACHINE_FEATURES Explained

MACHINE_FEATURES declares what hardware capabilities exist. Other recipes react to these features automatically:

| Feature | Effect |
|---------|--------|
| \`usbhost\` | Installs USB host support packages |
| \`usbgadget\` | Enables USB device/gadget support |
| \`wifi\` | Installs wireless networking support |
| \`bluetooth\` | Installs Bluetooth support |
| \`screen\` | Includes display/graphics support |
| \`vfat\` | Includes VFAT filesystem support (for SD cards) |
| \`ext2\` | Includes ext2/ext3/ext4 support |
| \`rtc\` | Real-time clock available |
| \`keyboard\` | Keyboard available |
| \`alsa\` | Audio hardware present |

> **How it works:** If MACHINE_FEATURES includes "wifi" AND DISTRO_FEATURES includes "wifi", then packages like wpa-supplicant are automatically pulled into the image. This is the COMBINED_FEATURES mechanism.

## U-Boot Variables

For boards that use U-Boot as the bootloader:

| Variable | Purpose | Example |
|----------|---------|---------|
| \`UBOOT_MACHINE\` | U-Boot defconfig target | myboard_defconfig |
| \`UBOOT_SUFFIX\` | U-Boot binary extension | img, bin |
| \`SPL_BINARY\` | SPL (Secondary Program Loader) filename | SPL, MLO |
| \`UBOOT_ENTRYPOINT\` | Kernel entry point address | 0x80008000 |
| \`UBOOT_LOADADDRESS\` | Kernel load address | 0x80008000 |

## Tune Files — CPU Optimization

Tune files define compiler flags for specific CPU cores:

\`\`\`bash
# Include the appropriate tune file for your SoC
require conf/machine/include/arm/armv7a/tune-cortexa9.inc    # Cortex-A9
require conf/machine/include/arm/armv8a/tune-cortexa53.inc   # Cortex-A53
require conf/machine/include/arm/armv8a/tune-cortexa72.inc   # Cortex-A72
\`\`\`

This sets DEFAULTTUNE, which determines compiler flags like \`-march=armv7-a -mfpu=neon -mfloat-abi=hard\`.

## Finding and Using Existing BSPs

Before writing a BSP from scratch, check if one exists:

1. **layers.openembedded.org** — Search for your SoC vendor
2. **SoC vendor GitHub** — meta-ti, meta-freescale, meta-rockchip, meta-raspberrypi
3. **Community layers** — Often maintained by hardware enthusiasts

> **Tip:** Even if your exact board isn't supported, a BSP for the same SoC family gives you 90% of what you need. Fork it and customize.
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

A distribution (distro) configuration defines the **software policies** of your Linux system — independent of the hardware. It answers questions like: Should we use systemd or sysvinit? glibc or musl? X11 or Wayland? What security features should be enabled?

While a **machine** describes *what hardware* you're building for, a **distro** describes *what kind of system* you're building.

## Creating a Custom Distro

\`\`\`bash
# conf/distro/mydistro.conf

# Start by inheriting from Poky (the reference distro)
require conf/distro/poky.conf

# Override the distro identity
DISTRO = "mydistro"
DISTRO_NAME = "My Industrial Controller OS"
DISTRO_VERSION = "2.0"
DISTRO_CODENAME = "aurora"

# Maintainer info
MAINTAINER = "engineering@mycompany.com"
\`\`\`

Set it in local.conf: \`DISTRO = "mydistro"\`

## DISTRO_FEATURES — What Your System Supports

DISTRO_FEATURES lists the software-level features your distribution enables. Recipes check these features and adjust their behavior accordingly:

\`\`\`bash
DISTRO_FEATURES = "\\
    acl \\
    ipv4 ipv6 \\
    systemd usrmerge \\
    wifi bluetooth \\
    pam \\
    seccomp \\
"
\`\`\`

| Feature | Effect |
|---------|--------|
| \`systemd\` | Use systemd as init system and service manager |
| \`sysvinit\` | Use traditional SysV init (default in some distros) |
| \`usrmerge\` | Merge /bin, /sbin, /lib into /usr (modern standard) |
| \`wifi\` | Enable wireless networking support in packages |
| \`bluetooth\` | Enable Bluetooth support in packages |
| \`x11\` | Enable X11 display server support |
| \`wayland\` | Enable Wayland display protocol support |
| \`opengl\` | Enable OpenGL/GPU acceleration |
| \`pam\` | Enable PAM authentication modules |
| \`seccomp\` | Enable seccomp syscall filtering (security) |
| \`ipv6\` | Enable IPv6 networking |
| \`acl\` | Enable POSIX access control lists |
| \`largefile\` | Enable large file support (>2GB) |
| \`nfs\` | Enable NFS client support |
| \`ptest\` | Enable package testing framework |

### Adding and Removing Features

\`\`\`bash
# Add features to the Poky defaults
DISTRO_FEATURES:append = " systemd usrmerge"

# Remove features you don't need
DISTRO_FEATURES:remove = "x11 wayland 3g nfc"
\`\`\`

> **Tip:** Remove unused features to reduce image size and attack surface. A headless industrial controller doesn't need \`x11\` or \`wayland\`.

## MACHINE_FEATURES vs DISTRO_FEATURES vs COMBINED_FEATURES

This three-way relationship is important to understand:

- **MACHINE_FEATURES** — What the hardware provides (e.g., "wifi" = hardware has a Wi-Fi chip)
- **DISTRO_FEATURES** — What the software supports (e.g., "wifi" = build Wi-Fi packages)
- **COMBINED_FEATURES** — The **intersection** of both: only features where hardware AND software agree

\`\`\`bash
# Machine says: I have wifi and bluetooth hardware
MACHINE_FEATURES = "usbhost wifi bluetooth screen"

# Distro says: I support wifi and nfs software
DISTRO_FEATURES = "wifi nfs systemd"

# COMBINED_FEATURES = "wifi" (the only feature in both lists)
# Result: Wi-Fi packages are installed. Bluetooth packages are NOT
# (hardware exists but distro chose not to support it)
\`\`\`

## Switching Init Systems

One of the most common distro customizations:

### Systemd (modern, recommended for most use cases)

\`\`\`bash
DISTRO_FEATURES:append = " systemd usrmerge"
DISTRO_FEATURES:remove = "sysvinit"
VIRTUAL-RUNTIME_init_manager = "systemd"
VIRTUAL-RUNTIME_initscripts = "systemd-compat-units"
VIRTUAL-RUNTIME_login_manager = "shadow-base"
VIRTUAL-RUNTIME_dev_manager = "systemd"
\`\`\`

### SysVinit (traditional, smaller footprint)

\`\`\`bash
DISTRO_FEATURES:append = " sysvinit"
DISTRO_FEATURES:remove = "systemd"
VIRTUAL-RUNTIME_init_manager = "sysvinit"
VIRTUAL-RUNTIME_initscripts = "initscripts"
\`\`\`

### BusyBox init (minimal, for very constrained systems)

\`\`\`bash
VIRTUAL-RUNTIME_init_manager = "busybox"
\`\`\`

## Toolchain Configuration

\`\`\`bash
# Select the toolchain mode (rarely changed)
TCMODE = "default"           # Uses the internal GCC toolchain
TCLIBC = "glibc"             # C library: glibc (default), musl, or newlib

# For smaller systems, consider musl instead of glibc
TCLIBC = "musl"              # ~50% smaller libc, but less POSIX-compatible
\`\`\`

## Build Configuration Templates

Templates provide default \`local.conf\` and \`bblayers.conf\` for new build directories:

\`\`\`bash
# Location: meta-mydistro/conf/templates/default/
# Contains: local.conf.sample, bblayers.conf.sample

# Point to your templates
TEMPLATECONF = "meta-mydistro/conf/templates/default"

# Save your current config as a template
$ bitbake-layers save-build-conf meta-mydistro/conf/templates/default
\`\`\`

This ensures every developer who runs \`source oe-init-build-env\` gets your team's standard configuration.

## Complete Distro Example

\`\`\`bash
# conf/distro/industrial-os.conf
require conf/distro/poky.conf

DISTRO = "industrial-os"
DISTRO_NAME = "Industrial Controller OS"
DISTRO_VERSION = "2.0"
DISTRO_CODENAME = "ironbridge"

# Systemd with merged /usr
DISTRO_FEATURES:append = " systemd usrmerge seccomp"
DISTRO_FEATURES:remove = "x11 wayland 3g nfc sysvinit"
VIRTUAL-RUNTIME_init_manager = "systemd"

# Security hardening
DISTRO_FEATURES:append = " pam seccomp"

# Use IPK packages (smaller than RPM)
PACKAGE_CLASSES = "package_ipk"

# Default to release builds
DISTRO_FEATURES:remove = "ptest"
\`\`\`

## Best Practices

1. **Keep distro layer separate** from BSP and application layers — distro policy is independent of hardware
2. **Inherit from poky.conf** and override — don't start from scratch
3. **Minimize DISTRO_FEATURES** — only include what you need
4. **Use VIRTUAL-RUNTIME** variables to select between alternative implementations
5. **Provide templates** so team members get consistent build configurations
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

License compliance is not optional — it's a legal requirement. When you distribute an embedded Linux product, you must comply with the licenses of every piece of software in the image. Yocto has built-in tools to track, verify, and enforce license compliance throughout the build process.

## Why License Management Matters

- **GPL compliance:** If your image includes GPL-licensed software, you must provide source code to your customers
- **License conflicts:** Some licenses are incompatible (e.g., GPLv3 may conflict with your proprietary software strategy)
- **Legal liability:** Non-compliance can result in lawsuits, product recalls, or injunctions
- **Customer requirements:** Many enterprise customers and government agencies require a Software Bill of Materials (SBoM)

## The LICENSE Variable

Every recipe must declare its license using **SPDX identifiers** (standardized license names):

\`\`\`bash
# Single license
LICENSE = "MIT"
LICENSE = "GPL-2.0-only"
LICENSE = "Apache-2.0"

# Multiple licenses (AND = all apply)
LICENSE = "MIT & BSD-3-Clause"

# Dual licensing (OR = user chooses one)
LICENSE = "GPL-2.0-only | MIT"

# Different licenses for different packages from one recipe
LICENSE = "GPL-2.0-only & LGPL-2.1-only"
LICENSE:\\\${PN}-libs = "LGPL-2.1-only"

# Proprietary / closed source
LICENSE = "CLOSED"
\`\`\`

Common SPDX identifiers:

| SPDX ID | License |
|---------|---------|
| \`MIT\` | MIT License |
| \`BSD-2-Clause\` | BSD 2-Clause |
| \`BSD-3-Clause\` | BSD 3-Clause |
| \`GPL-2.0-only\` | GPLv2 (exactly) |
| \`GPL-2.0-or-later\` | GPLv2 or any later version |
| \`GPL-3.0-only\` | GPLv3 (exactly) |
| \`LGPL-2.1-only\` | LGPLv2.1 |
| \`Apache-2.0\` | Apache License 2.0 |
| \`MPL-2.0\` | Mozilla Public License 2.0 |
| \`CLOSED\` | Proprietary (Yocto-specific, not SPDX) |

## LIC_FILES_CHKSUM — License Integrity Tracking

This variable is **mandatory** (unless LICENSE = "CLOSED"). It checksums the license file in the source tree to detect license changes:

\`\`\`bash
# Checksum the entire COPYING file
LIC_FILES_CHKSUM = "file://COPYING;md5=abc123def456..."

# Checksum specific lines (e.g., license header in source code)
LIC_FILES_CHKSUM = "file://src/main.c;beginline=1;endline=20;md5=..."

# Reference a common license from Yocto's shared directory
LIC_FILES_CHKSUM = "file://\\\${COMMON_LICENSE_DIR}/MIT;md5=..."

# Multiple license files
LIC_FILES_CHKSUM = "file://COPYING.GPL;md5=... \\
                    file://COPYING.LGPL;md5=..."
\`\`\`

### What Happens When a Checksum Changes?

If upstream modifies their license file (even slightly), the md5 no longer matches and the **build fails**. This is intentional:

1. Build fails with a clear error message
2. Developer reviews the license change (is it still compatible?)
3. If acceptable, update the md5 checksum in the recipe
4. Build succeeds

> **This is a safety net:** It prevents accidental license changes from slipping into your product unnoticed.

## Excluding Incompatible Licenses

Some products cannot include certain licenses. For example, GPLv3 requires you to allow users to modify the software on the device — which conflicts with "locked-down" products (e.g., medical devices, automotive ECUs):

\`\`\`bash
# In local.conf or distro.conf — exclude GPLv3 and related licenses
INCOMPATIBLE_LICENSE = "GPL-3.0* LGPL-3.0* AGPL-3.0*"
\`\`\`

When this is set, any recipe with a matching license is **excluded from the build**. BitBake will try to find alternative recipes or fail with a clear error.

> **Example:** With GPLv3 excluded, BitBake will use busybox (GPLv2) instead of coreutils (GPLv3) for basic utilities like ls, cp, mv.

## Commercial and Flagged Licenses

Some recipes have license conditions that require explicit acceptance:

\`\`\`bash
# In the recipe (set by the recipe author):
LICENSE_FLAGS = "commercial"

# In local.conf (set by the user/integrator):
# Accept specific commercial packages
LICENSE_FLAGS_ACCEPTED = "commercial_gst-plugins-ugly commercial_ffmpeg"

# Or accept ALL commercial packages (use with caution)
LICENSE_FLAGS_ACCEPTED = "commercial"
\`\`\`

This mechanism ensures that commercially-licensed software (codecs, firmware) isn't accidentally included without explicit acknowledgment.

## License Manifest — What's in Your Image

After building an image, Yocto generates a complete license manifest:

\`\`\`bash
# Location:
$ cat tmp/deploy/licenses/core-image-minimal-*/license.manifest

# Content (one entry per package):
# PACKAGE NAME: busybox
# PACKAGE VERSION: 1.36.1
# RECIPE NAME: busybox
# LICENSE: GPL-2.0-only
#
# PACKAGE NAME: dropbear
# PACKAGE VERSION: 2024.86
# RECIPE NAME: dropbear
# LICENSE: MIT
\`\`\`

This file is what your legal team reviews. It lists every package in the image with its license.

## Source Archiver — GPL Compliance

If your image includes GPL-licensed software, you must provide the source code. Yocto can automatically archive all source code:

\`\`\`bash
# In local.conf — enable source archiving
INHERIT += "archiver"
ARCHIVER_MODE[src] = "original"       # Original upstream tarballs
ARCHIVER_MODE[src] = "configured"     # Source after configure (with patches applied)
ARCHIVER_MODE[src] = "patched"        # Source with patches applied

# Output location: tmp/deploy/sources/
\`\`\`

You can then ship this source archive alongside your product to satisfy GPL requirements.

## License Compliance Workflow

1. **During development:** Set LICENSE and LIC_FILES_CHKSUM in every recipe
2. **Before release:** Review \`license.manifest\` with your legal team
3. **Set INCOMPATIBLE_LICENSE** for licenses your product cannot include
4. **Enable archiver** to collect GPL source code
5. **Ship source archive** with your product (or offer it in writing for 3 years per GPLv2)
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

A Software Bill of Materials (SBoM) is a **complete inventory** of every software component in your product — its version, license, dependencies, source location, and known vulnerabilities. Think of it as a "nutrition label" for software.

## What an SBoM Contains

| Information | Purpose |
|-------------|---------|
| **Package name and version** | Identify exactly what software is included |
| **License** | Legal compliance assessment |
| **Source location** | Reproducibility and auditing |
| **Dependencies** | Understand the full supply chain |
| **Known vulnerabilities (CVEs)** | Security assessment |
| **Supplier information** | Accountability and contact |
| **Checksums/hashes** | Integrity verification |

## Why SBoMs Matter

### 1. Regulatory Requirements

Governments are increasingly **mandating** SBoMs for software products:
- **US Executive Order 14028 (2021)** — Requires SBoMs for software sold to the federal government
- **EU Cyber Resilience Act (2024)** — Requires vulnerability handling and SBoMs for products sold in the EU
- **FDA guidance** — Recommends SBoMs for medical device software

### 2. Security — Vulnerability Tracking

When a new vulnerability is discovered (like Log4Shell or OpenSSL Heartbleed), an SBoM instantly tells you:
- Is the affected component in our product?
- Which version do we have?
- Which products/images are affected?

Without an SBoM, answering these questions requires manual investigation across potentially hundreds of components.

### 3. License Compliance

The SBoM provides a complete, machine-readable license inventory that can be automatically checked against your license policy.

### 4. Supply Chain Transparency

Your customers (especially enterprise and government) increasingly demand to know what's inside the software they're purchasing.

## SPDX Format

**SPDX** (Software Package Data Exchange) is the **ISO standard** (ISO/IEC 5962:2021) format for SBoMs. It's the most widely used format in the embedded/industrial world. The other major format is CycloneDX.

## Enabling SPDX in Yocto

### SPDX 3.0 (recommended, latest standard)

\`\`\`bash
# In local.conf or distro.conf
INHERIT += "create-spdx-3.0"
INHERIT:remove = "create-spdx"     # Remove the default 2.2 generator
\`\`\`

### SPDX 2.2 (enabled by default in recent Yocto)

\`\`\`bash
# Usually already active — check with:
$ bitbake -e | grep create-spdx
\`\`\`

## Output Location and Format

\`\`\`bash
# SPDX documents are generated as JSON files:
tmp/deploy/images/\\\${MACHINE}/
    +-- core-image-minimal.spdx.json        # Image-level SBoM
    +-- core-image-minimal.spdx.index.json  # Index of all documents

# Each recipe also generates its own SPDX document:
tmp/deploy/spdx/
    +-- busybox.spdx.json
    +-- dropbear.spdx.json
    +-- ...
\`\`\`

## Configuration Variables

| Variable | Purpose | Default |
|----------|---------|---------|
| \`SPDX_PRETTY\` | Human-readable JSON formatting (indented) | Off |
| \`SPDX_ARCHIVE_PACKAGED\` | Include archives of packaged files | Off |
| \`SPDX_INCLUDE_SOURCES\` | Include descriptions of source files | Off |
| \`SPDX_ARCHIVE_SOURCES\` | Include source archives | Off |

\`\`\`bash
# For maximum detail (larger output):
SPDX_PRETTY = "1"
SPDX_INCLUDE_SOURCES = "1"
\`\`\`

## CVE Checking

Yocto can automatically check your packages against the **National Vulnerability Database (NVD)**:

\`\`\`bash
# Enable CVE checking
INHERIT += "cve-check"

# Output: a report of known CVEs affecting your packages
# tmp/deploy/cve/cve-summary.txt
# Shows: package name, CVE ID, severity, status (patched/unpatched)
\`\`\`

Example output:

\`\`\`
PACKAGE NAME: openssl
PACKAGE VERSION: 3.0.12
CVE: CVE-2024-0727
CVE STATUS: Patched     # Yocto recipe already includes the fix
CVE SUMMARY: PKCS12 vulnerability...

PACKAGE NAME: busybox
PACKAGE VERSION: 1.36.1
CVE: CVE-2023-42363
CVE STATUS: Unpatched   # Needs attention!
\`\`\`

> **Workflow:** Run CVE checks before every release. Address unpatched CVEs by upgrading recipes, applying patches, or documenting risk acceptance.

## Practical SBoM Workflow

1. **Enable SPDX generation** in your distro config
2. **Build your image** — SBoM is generated automatically
3. **Review the SBoM** — Check for unexpected licenses or components
4. **Run CVE checks** — Identify known vulnerabilities
5. **Archive the SBoM** alongside your release artifacts
6. **Provide to customers** — Especially for government and enterprise sales
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

One of Yocto's unique strengths over Buildroot is its ability to produce **binary packages** that can be installed, upgraded, and removed on a running device. This enables over-the-air (OTA) updates, field maintenance, and iterative development without reflashing the entire image.

## Package Formats

Yocto supports three package formats. You choose one (rarely need to change):

| Format | Manager | Set With | Pros | Cons |
|--------|---------|----------|------|------|
| **IPK** | opkg | \`package_ipk\` | Smallest packages, lightest manager | Fewer features |
| **RPM** | dnf | \`package_rpm\` | Full-featured, dependency resolution | Larger overhead |
| **DEB** | apt | \`package_deb\` | Familiar to Debian/Ubuntu users | Larger overhead |

\`\`\`bash
# In local.conf or distro.conf
PACKAGE_CLASSES = "package_ipk"    # Recommended for embedded
\`\`\`

> **Recommendation:** Use IPK for embedded systems (smallest footprint). Use RPM if you need advanced dependency resolution. Use DEB if your team is most familiar with Debian.

## Enabling Package Management on the Target

### Method 1: IMAGE_FEATURES (recommended)

\`\`\`bash
# In image recipe or local.conf
IMAGE_FEATURES += "package-management"
\`\`\`

This installs the appropriate package manager (opkg/dnf/apt) and configures package feeds on the target.

### Method 2: Manual

\`\`\`bash
# For IPK:
IMAGE_INSTALL:append = " opkg"
# For RPM:
IMAGE_INSTALL:append = " dnf"
\`\`\`

## Using opkg on the Target

Once your device is running with opkg installed:

\`\`\`bash
# Update the package database from the server
$ opkg update

# List all available packages
$ opkg list

# Search for a package
$ opkg list | grep ssh

# Install a package
$ opkg install dropbear

# Upgrade all installed packages
$ opkg upgrade

# Remove a package
$ opkg remove dropbear

# Show installed packages
$ opkg list-installed

# Show which package owns a file
$ opkg search /usr/bin/dropbear

# Show package info
$ opkg info dropbear
\`\`\`

## Setting Up a Package Server

To serve packages to your devices, you need an HTTP server hosting the package feed:

### Step 1: Build packages and generate index

\`\`\`bash
# Build your image (this also builds all packages)
$ bitbake my-image

# Generate the package index (CRITICAL: run alone, not with other targets!)
$ bitbake package-index
\`\`\`

### Step 2: Serve packages via HTTP

The packages are in \`tmp/deploy/ipk/\` (or \`rpm/\`, \`deb/\`):

\`\`\`bash
# Quick test server (Python)
$ cd tmp/deploy/ipk
$ python3 -m http.server 8080

# Production: use nginx, Apache, or any static file server
\`\`\`

### Step 3: Configure feeds on the target

\`\`\`bash
# In local.conf or distro.conf — tell the image where to find packages
PACKAGE_FEED_URIS = "http://192.168.1.100:8080"
PACKAGE_FEED_BASE_PATHS = "ipk"
PACKAGE_FEED_ARCHS = "all armv7a-neon mymachine"
\`\`\`

This generates \`/etc/opkg/\` config files on the target that point to your package server.

### Package Feed Architecture Directories

Packages are organized by architecture:

\`\`\`
tmp/deploy/ipk/
+-- all/               # Architecture-independent packages (configs, scripts)
+-- armv7at2hf-neon/   # ARM packages (shared across ARM machines)
+-- mymachine/         # Machine-specific packages
\`\`\`

The \`PACKAGE_FEED_ARCHS\` variable must list the architecture subdirectories your machine uses.

## Development Workflow with Package Management

A powerful development pattern:

1. **Build initial image** with \`package-management\` enabled and flash to target
2. **Modify a recipe** and rebuild: \`bitbake myapp\`
3. **Regenerate index:** \`bitbake package-index\`
4. **Update on target:** \`opkg update && opkg upgrade myapp\`
5. No reflashing needed!

> **Tip:** Combine this with devtool for the fastest iteration cycle: \`devtool deploy-target\` for development, package feeds for staging/QA.

## Important Caveats

1. **Always run \`bitbake package-index\` alone** — not combined with other targets (\`bitbake myimage package-index\` may cause race conditions)
2. **Package feeds are architecture-specific** — a package built for cortexa7 won't install on cortexa53
3. **No rollback by default** — if an upgrade breaks something, you need a recovery mechanism
4. **Consider security** — sign packages and use HTTPS for production feeds
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

A real Yocto project involves managing **multiple git repositories** (Poky, BSP layers, community layers, your custom layers) at specific versions. BitBake itself doesn't manage these repositories — it only processes the metadata. You need external tools to handle repo setup, version pinning, and build automation.

## The Problem

Without automation, setting up a Yocto build requires:

1. Clone Poky at the correct branch
2. Clone 5-10 other layers at their correct branches
3. Run \`source oe-init-build-env\`
4. Edit \`local.conf\` (set MACHINE, DISTRO, etc.)
5. Edit \`bblayers.conf\` (add all layer paths)
6. Run \`bitbake my-image\`

This is error-prone and hard to reproduce. New team members struggle to get started. CI/CD systems need scripting.

## Google repo — Multi-Repo Management

**repo** is a tool created by Google (for Android development) that manages multiple git repositories using an XML manifest:

### Setting Up

\`\`\`bash
# Initialize with a manifest repository
$ repo init -u https://git.mycompany.com/yocto-manifest.git -b main

# Download all repositories defined in the manifest
$ repo sync -j4
\`\`\`

### The Manifest File

\`\`\`xml
<?xml version="1.0" encoding="UTF-8"?>
<manifest>
  <!-- Default remote and branch -->
  <default remote="github" revision="scarthgap" sync-j="4"/>

  <!-- Git servers -->
  <remote name="github" fetch="https://github.com"/>
  <remote name="yocto" fetch="git://git.yoctoproject.org"/>

  <!-- Repositories to clone -->
  <project name="poky" remote="yocto" path="poky"/>
  <project name="openembedded/meta-openembedded" remote="github" path="meta-openembedded"/>
  <project name="mycompany/meta-myproduct" remote="github" path="meta-myproduct"/>
  <project name="agherzan/meta-raspberrypi" remote="github" path="meta-raspberrypi"/>
</manifest>
\`\`\`

### Creating a Reproducible Release

To create a release, pin every repository to an exact commit hash:

\`\`\`bash
# Generate a manifest with all revisions pinned to current commits
$ repo manifest -r -o release-manifest.xml

# Tag the manifest
$ cd .repo/manifests
$ git add release-manifest.xml
$ git commit -m "Release v2.0"
$ git tag v2.0
\`\`\`

Now anyone can reproduce the exact same source tree: \`repo init -m release-manifest.xml\`

> **repo only handles source code.** You still need to manually set up the build environment (oe-init-build-env, local.conf, bblayers.conf).

## kas — The Complete Build Automation Tool

**kas** (by Siemens) goes further than repo: it handles repo cloning, build environment setup, AND building — all from a single YAML configuration file.

### Installation

\`\`\`bash
$ pip install kas
# Or use the Docker container:
$ docker pull ghcr.io/siemens/kas/kas
\`\`\`

### kas Configuration File

\`\`\`yaml
# my-product.yml
header:
  version: 14          # kas config format version
  machine: mymachine
  distro: mydistro

# What to build
target:
  - my-image

# local.conf additions
local_conf_header:
  my-settings: |
    PACKAGE_CLASSES = "package_ipk"
    IMAGE_FEATURES += "package-management ssh-server-dropbear"
    EXTRA_IMAGE_FEATURES += "debug-tweaks"

# Repositories to clone and layers to activate
repos:
  # Your custom layer (current directory = kas config location)
  meta-myproduct:

  # Poky (bitbake + OE-Core + reference distro)
  poky:
    url: "https://git.yoctoproject.org/poky"
    branch: scarthgap
    layers:
      meta:
      meta-poky:

  # Community layers
  meta-openembedded:
    url: "https://github.com/openembedded/meta-openembedded.git"
    branch: scarthgap
    layers:
      meta-oe:
      meta-python:
      meta-networking:

  # BSP layer
  meta-raspberrypi:
    url: "https://github.com/agherzan/meta-raspberrypi.git"
    branch: scarthgap
\`\`\`

### Using kas

\`\`\`bash
# One command to clone, configure, and build everything
$ kas build my-product.yml

# Open a shell with the full build environment
$ kas shell my-product.yml
# Now you can run bitbake commands directly

# Build a specific recipe
$ kas shell my-product.yml -c 'bitbake dropbear'

# Use with Docker (no host dependencies needed!)
$ kas-container build my-product.yml
\`\`\`

### kas Configuration Inheritance

kas configs can include other configs, enabling product variants:

\`\`\`yaml
# product-base.yml — shared settings
header:
  version: 14
  includes:
    - base-layers.yml    # Common layer definitions

# product-dev.yml — development variant
header:
  version: 14
  includes:
    - product-base.yml
local_conf_header:
  debug: |
    EXTRA_IMAGE_FEATURES += "debug-tweaks tools-debug"

# product-release.yml — production variant
header:
  version: 14
  includes:
    - product-base.yml
local_conf_header:
  release: |
    EXTRA_IMAGE_FEATURES:remove = "debug-tweaks"
\`\`\`

### Pinning for Reproducibility

\`\`\`yaml
# For releases, pin to specific commits instead of branches
repos:
  poky:
    url: "https://git.yoctoproject.org/poky"
    commit: "abc123def456..."    # Exact commit, not a branch
\`\`\`

## Comparison: repo vs kas

| Feature | repo | kas |
|---------|------|-----|
| Config format | XML manifest | YAML/JSON |
| Clone repositories | Yes | Yes |
| Set up local.conf | No (manual) | Yes (from config) |
| Set up bblayers.conf | No (manual) | Yes (automatic) |
| Run builds | No (manual) | Yes (\`kas build\`) |
| Docker support | No | Yes (\`kas-container\`) |
| Config inheritance | Limited | Yes (includes) |
| Ecosystem | Large (Android, other projects) | Focused on Yocto/OE |
| CI/CD friendliness | Good | Excellent |

## Recommendation

- **Small team, simple project:** kas is the best choice — single file, everything automated
- **Large organization with existing repo infrastructure:** Use repo for source management, add kas or scripts for build automation
- **CI/CD pipelines:** kas excels here — \`kas-container build config.yml\` gives you reproducible builds in a clean Docker environment with zero host setup
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
