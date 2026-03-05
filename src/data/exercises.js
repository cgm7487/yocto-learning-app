const exercises = [
  {
    id: 'hello-world-recipe',
    title: 'Hello World Recipe',
    difficulty: 'beginner',
    description:
      'Write a basic BitBake recipe that fetches a local source file, compiles a simple C program, and installs the binary.',
    instructions: [
      'Set the SUMMARY variable to describe the recipe',
      'Set LICENSE to "MIT" and LIC_FILES_CHKSUM to point to a license file',
      'Set SRC_URI to fetch from a local file (use "file://hello.c")',
      'Write a do_compile task that uses $CC to compile hello.c into a "hello" binary',
      'Write a do_install task that installs the binary to $D$bindir',
    ],
    starterCode: `# Recipe: hello-world
# TODO: Fill in the recipe variables and tasks

SUMMARY = ""
LICENSE = ""
LIC_FILES_CHKSUM = ""

SRC_URI = ""

do_compile() {
    # TODO: compile hello.c
}

do_install() {
    # TODO: install the binary
}
`,
    validations: [
      {
        type: 'contains',
        pattern: 'SUMMARY',
        value: /.+SUMMARY\s*=\s*".+"/,
        message: 'SUMMARY should be set to a non-empty string describing the recipe.',
        hint: 'Example: SUMMARY = "Simple Hello World application"',
      },
      {
        type: 'regex',
        value: /LICENSE\s*=\s*"MIT"/,
        message: 'LICENSE should be set to "MIT".',
        hint: 'Set LICENSE = "MIT"',
      },
      {
        type: 'regex',
        value: /LIC_FILES_CHKSUM\s*=\s*"file:\/\/.+;md5=[a-f0-9]+"/,
        message: 'LIC_FILES_CHKSUM must point to a license file with an md5 checksum.',
        hint: 'Example: LIC_FILES_CHKSUM = "file://LICENSE;md5=abc123..."',
      },
      {
        type: 'regex',
        value: /SRC_URI\s*=\s*"file:\/\/hello\.c"/,
        message: 'SRC_URI should fetch the local hello.c file.',
        hint: 'Use SRC_URI = "file://hello.c"',
      },
      {
        type: 'regex',
        value: /do_compile\s*\(\)\s*\{[^}]*\$\{?CC\}?\s+.*hello\.c/,
        message: 'do_compile should use $CC (or ${CC}) to compile hello.c.',
        hint: 'Use: ${CC} hello.c -o hello ${LDFLAGS}',
      },
      {
        type: 'regex',
        value: /do_install\s*\(\)\s*\{[^}]*install\s/,
        message: 'do_install should use the "install" command to place the binary.',
        hint: 'Use: install -d ${D}${bindir} && install -m 0755 hello ${D}${bindir}/',
      },
    ],
    solutionCode: `SUMMARY = "Simple Hello World application"
LICENSE = "MIT"
LIC_FILES_CHKSUM = "file://LICENSE;md5=d41d8cd98f00b204e9800998ecf8427e"

SRC_URI = "file://hello.c"

do_compile() {
    \${CC} hello.c -o hello \${LDFLAGS}
}

do_install() {
    install -d \${D}\${bindir}
    install -m 0755 hello \${D}\${bindir}/
}
`,
  },
  {
    id: 'git-recipe',
    title: 'Fetching from Git',
    difficulty: 'beginner',
    description:
      'Write a recipe that fetches source code from a Git repository, builds it with Make, and installs the output.',
    instructions: [
      'Set SUMMARY, LICENSE, and LIC_FILES_CHKSUM',
      'Set SRC_URI to a git:// URL with protocol=https and branch=main',
      'Set SRCREV to a specific commit hash (use "abc123..." as placeholder)',
      'Set S (source directory) to "${WORKDIR}/git"',
      'Inherit the "autotools" or use do_compile/do_install with oe_runmake',
    ],
    starterCode: `SUMMARY = ""
LICENSE = ""
LIC_FILES_CHKSUM = ""

SRC_URI = ""
SRCREV = ""

S = ""

do_compile() {
    # TODO: build the project
}

do_install() {
    # TODO: install the output
}
`,
    validations: [
      {
        type: 'regex',
        value: /SUMMARY\s*=\s*".+"/,
        message: 'SUMMARY should be set to a non-empty string.',
        hint: 'Example: SUMMARY = "My Git project"',
      },
      {
        type: 'regex',
        value: /LICENSE\s*=\s*".+"/,
        message: 'LICENSE must be set.',
        hint: 'Example: LICENSE = "MIT" or LICENSE = "GPL-2.0-only"',
      },
      {
        type: 'regex',
        value: /SRC_URI\s*=\s*"git:\/\/.+;branch=.+;protocol=https"/,
        message: 'SRC_URI should use git:// with branch and protocol=https parameters.',
        hint: 'Example: SRC_URI = "git://github.com/user/repo.git;branch=main;protocol=https"',
      },
      {
        type: 'regex',
        value: /SRCREV\s*=\s*"[a-f0-9]+"/,
        message: 'SRCREV should be set to a commit hash.',
        hint: 'Example: SRCREV = "abc123def456..."',
      },
      {
        type: 'regex',
        value: /S\s*=\s*"\$\{WORKDIR\}\/git"/,
        message: 'S should be set to "${WORKDIR}/git" for git fetches.',
        hint: 'Set S = "${WORKDIR}/git"',
      },
      {
        type: 'regex',
        value: /oe_runmake|inherit\s+.*autotools/,
        message: 'Use oe_runmake for Make-based builds, or inherit autotools.',
        hint: 'Use oe_runmake in do_compile/do_install, or add: inherit autotools',
      },
    ],
    solutionCode: `SUMMARY = "Example project fetched from Git"
LICENSE = "GPL-2.0-only"
LIC_FILES_CHKSUM = "file://COPYING;md5=d41d8cd98f00b204e9800998ecf8427e"

SRC_URI = "git://github.com/example/myproject.git;branch=main;protocol=https"
SRCREV = "abc123def456789abc123def456789abc123def4"

S = "\${WORKDIR}/git"

do_compile() {
    oe_runmake
}

do_install() {
    oe_runmake install DESTDIR=\${D}
}
`,
  },
  {
    id: 'image-recipe',
    title: 'Custom Image Recipe',
    difficulty: 'intermediate',
    description:
      'Create a custom image recipe that extends core-image-minimal and adds your own packages.',
    instructions: [
      'Set SUMMARY to describe your custom image',
      'Inherit from "core-image"',
      'Set IMAGE_INSTALL:append to add packages (e.g., openssh, python3)',
      'Set IMAGE_FEATURES to include features like "ssh-server-dropbear"',
      'Optionally set IMAGE_ROOTFS_EXTRA_SPACE for additional space',
    ],
    starterCode: `# Custom image recipe
SUMMARY = ""

# TODO: inherit the correct class

# Base image packages
IMAGE_INSTALL:append = ""

# Image features
IMAGE_FEATURES += ""
`,
    validations: [
      {
        type: 'regex',
        value: /SUMMARY\s*=\s*".+"/,
        message: 'SUMMARY should describe your image.',
        hint: 'Example: SUMMARY = "My custom embedded Linux image"',
      },
      {
        type: 'regex',
        value: /inherit\s+.*core-image/,
        message: 'The recipe must inherit from "core-image".',
        hint: 'Add: inherit core-image',
      },
      {
        type: 'regex',
        value: /IMAGE_INSTALL:append\s*=\s*"\s+.+"/,
        message:
          'IMAGE_INSTALL:append should list packages to add (with leading space).',
        hint: 'Example: IMAGE_INSTALL:append = " openssh python3 htop"',
      },
      {
        type: 'regex',
        value: /IMAGE_FEATURES\s*\+=\s*".+"/,
        message: 'IMAGE_FEATURES should include at least one feature.',
        hint: 'Example: IMAGE_FEATURES += "ssh-server-dropbear debug-tweaks"',
      },
    ],
    solutionCode: `SUMMARY = "Custom embedded Linux image with networking tools"

inherit core-image

IMAGE_INSTALL:append = " openssh python3 htop curl"

IMAGE_FEATURES += "ssh-server-dropbear debug-tweaks"

IMAGE_ROOTFS_EXTRA_SPACE = "1048576"
`,
  },
  {
    id: 'bbappend-recipe',
    title: 'Writing a .bbappend',
    difficulty: 'intermediate',
    description:
      'Write a .bbappend file to modify an existing recipe. Add a patch, extra config flags, and an additional installed file.',
    instructions: [
      'Use FILESEXTRAPATHS:prepend to add your file search path',
      'Use SRC_URI:append to add a patch file',
      'Use EXTRA_OECONF:append to add a configure flag',
      'Add a do_install:append task to install an extra config file',
    ],
    starterCode: `# Append file for an existing recipe
# TODO: extend file search paths

# TODO: add a patch

# TODO: add configure flags

# TODO: install extra files
`,
    validations: [
      {
        type: 'regex',
        value: /FILESEXTRAPATHS:prepend\s*:=\s*"\$\{THISDIR\}\/\$\{PN\}:"/,
        message: 'FILESEXTRAPATHS:prepend must use := and point to ${THISDIR}/${PN}.',
        hint: 'Use: FILESEXTRAPATHS:prepend := "${THISDIR}/${PN}:"',
      },
      {
        type: 'regex',
        value: /SRC_URI:append\s*=\s*"\s+file:\/\/.+\.patch"/,
        message: 'SRC_URI:append should add a patch file (with leading space).',
        hint: 'Example: SRC_URI:append = " file://fix-build.patch"',
      },
      {
        type: 'regex',
        value: /EXTRA_OECONF:append\s*=\s*"\s+--/,
        message: 'EXTRA_OECONF:append should add a configure flag (with leading space).',
        hint: 'Example: EXTRA_OECONF:append = " --enable-feature"',
      },
      {
        type: 'regex',
        value: /do_install:append\s*\(\)\s*\{/,
        message: 'Use do_install:append() to add extra installation steps.',
        hint: 'do_install:append() { install -m 0644 ... ; }',
      },
    ],
    solutionCode: `FILESEXTRAPATHS:prepend := "\${THISDIR}/\${PN}:"

SRC_URI:append = " file://fix-build.patch"

EXTRA_OECONF:append = " --enable-custom-feature"

do_install:append() {
    install -d \${D}\${sysconfdir}
    install -m 0644 \${WORKDIR}/custom.conf \${D}\${sysconfdir}/
}
`,
  },
  {
    id: 'systemd-recipe',
    title: 'Recipe with systemd Service',
    difficulty: 'advanced',
    description:
      'Write a recipe that builds an application and includes a systemd service unit to start it automatically at boot.',
    instructions: [
      'Set standard recipe variables (SUMMARY, LICENSE, etc.)',
      'Inherit "systemd" class',
      'Set SYSTEMD_SERVICE:${PN} to your service file name',
      'Set SYSTEMD_AUTO_ENABLE to "enable"',
      'In SRC_URI, include both source code and the .service file',
      'In do_install, install both the binary and the service unit',
    ],
    starterCode: `SUMMARY = ""
LICENSE = ""
LIC_FILES_CHKSUM = ""

SRC_URI = ""

# TODO: inherit systemd

# TODO: set systemd variables

do_compile() {
}

do_install() {
}
`,
    validations: [
      {
        type: 'regex',
        value: /inherit\s+.*systemd/,
        message: 'The recipe must inherit the "systemd" class.',
        hint: 'Add: inherit systemd',
      },
      {
        type: 'regex',
        value: /SYSTEMD_SERVICE:\$\{PN\}\s*=\s*".+\.service"/,
        message: 'SYSTEMD_SERVICE:${PN} must specify the service file name.',
        hint: 'Example: SYSTEMD_SERVICE:${PN} = "myapp.service"',
      },
      {
        type: 'regex',
        value: /SYSTEMD_AUTO_ENABLE\s*=\s*"enable"/,
        message: 'SYSTEMD_AUTO_ENABLE should be set to "enable".',
        hint: 'Set: SYSTEMD_AUTO_ENABLE = "enable"',
      },
      {
        type: 'regex',
        value: /\.service/,
        message: 'SRC_URI should include the .service unit file.',
        hint: 'Add a file://myapp.service to SRC_URI',
      },
      {
        type: 'regex',
        value: /systemd_unitdir|systemd_system_unitdir/,
        message: 'do_install should install the service file to ${systemd_system_unitdir}.',
        hint: 'install -d ${D}${systemd_system_unitdir} && install -m 0644 ...',
      },
    ],
    solutionCode: `SUMMARY = "My daemon application with systemd support"
LICENSE = "MIT"
LIC_FILES_CHKSUM = "file://LICENSE;md5=d41d8cd98f00b204e9800998ecf8427e"

SRC_URI = "file://myapp.c \\
           file://myapp.service \\
          "

inherit systemd

SYSTEMD_SERVICE:\${PN} = "myapp.service"
SYSTEMD_AUTO_ENABLE = "enable"

do_compile() {
    \${CC} \${WORKDIR}/myapp.c -o myapp \${LDFLAGS}
}

do_install() {
    install -d \${D}\${bindir}
    install -m 0755 myapp \${D}\${bindir}/

    install -d \${D}\${systemd_system_unitdir}
    install -m 0644 \${WORKDIR}/myapp.service \${D}\${systemd_system_unitdir}/
}
`,
  },
  {
    id: 'device-tree',
    title: 'Device Tree Source (DTS)',
    difficulty: 'intermediate',
    description:
      'Write a Device Tree Source file for a simple ARM board with a UART, an I2C bus, an I2C temperature sensor, and an LED connected to a GPIO.',
    instructions: [
      'Start with the /dts-v1/; header and a root node',
      'Add a "compatible" property to the root node',
      'Define a "chosen" node with a stdout-path for the serial console',
      'Add a uart0 node at address 0x09000000 with reg and compatible properties',
      'Add an i2c0 bus node at address 0x0a000000 with a child temp sensor at address 0x48',
      'Add an LED node under a "leds" node using the "gpio-leds" compatible',
    ],
    starterCode: `/dts-v1/;

/ {
    compatible = "";
    #address-cells = <1>;
    #size-cells = <1>;

    chosen {
        // TODO: set stdout-path
    };

    // TODO: add uart0 node

    // TODO: add i2c0 bus with a temperature sensor child

    // TODO: add leds node with a GPIO LED
};
`,
    validations: [
      {
        type: 'regex',
        value: /\/dts-v1\/;/,
        message: 'File must start with /dts-v1/; header.',
        hint: 'First line should be: /dts-v1/;',
      },
      {
        type: 'regex',
        value: /compatible\s*=\s*".+"/,
        message: 'Root node must have a "compatible" property.',
        hint: 'Example: compatible = "myvendor,myboard";',
      },
      {
        type: 'regex',
        value: /stdout-path\s*=\s*".+"/,
        message: 'The "chosen" node should set stdout-path for serial console.',
        hint: 'Example: stdout-path = "serial0:115200n8";',
      },
      {
        type: 'regex',
        value: /uart.*@.*\{[\s\S]*?compatible\s*=[\s\S]*?reg\s*=/,
        message: 'UART node needs both "compatible" and "reg" properties.',
        hint: 'uart0@09000000 { compatible = "arm,pl011"; reg = <0x09000000 0x1000>; };',
      },
      {
        type: 'regex',
        value: /i2c.*@.*\{[\s\S]*?#address-cells[\s\S]*?#size-cells/,
        message: 'I2C bus node must define #address-cells and #size-cells.',
        hint: 'i2c0@0a000000 { #address-cells = <1>; #size-cells = <0>; ... };',
      },
      {
        type: 'regex',
        value: /temp.*@.*48|sensor.*@.*48/,
        message: 'Add a temperature sensor child node at I2C address 0x48.',
        hint: 'temp-sensor@48 { compatible = "ti,tmp102"; reg = <0x48>; };',
      },
      {
        type: 'regex',
        value: /gpio-leds/,
        message: 'LEDs node must use "gpio-leds" compatible string.',
        hint: 'leds { compatible = "gpio-leds"; led0 { gpios = <&gpio0 5 0>; }; };',
      },
    ],
    solutionCode: `/dts-v1/;

/ {
    compatible = "myvendor,myboard";
    #address-cells = <1>;
    #size-cells = <1>;

    chosen {
        stdout-path = "serial0:115200n8";
    };

    uart0@09000000 {
        compatible = "arm,pl011";
        reg = <0x09000000 0x1000>;
    };

    i2c0@0a000000 {
        compatible = "vendor,i2c-controller";
        reg = <0x0a000000 0x1000>;
        #address-cells = <1>;
        #size-cells = <0>;

        temp-sensor@48 {
            compatible = "ti,tmp102";
            reg = <0x48>;
        };
    };

    leds {
        compatible = "gpio-leds";

        led0 {
            label = "heartbeat";
            gpios = <&gpio0 5 0>;
            linux,default-trigger = "heartbeat";
        };
    };
};
`,
  },
  {
    id: 'layer-config',
    title: 'Layer Configuration',
    difficulty: 'beginner',
    description:
      'Write a layer.conf file for a custom Yocto layer. This file tells BitBake where to find recipes in your layer.',
    instructions: [
      'Set BBPATH to append the current layer directory',
      'Set BBFILES to include all .bb and .bbappend files in your recipes-* directories',
      'Add your layer\'s recipe directories to BBFILE_COLLECTIONS',
      'Set BBFILE_PATTERN for your collection',
      'Set BBFILE_PRIORITY for your layer',
      'Set LAYERDEPENDS for dependencies (at minimum, core)',
      'Set LAYERSERIES_COMPAT for compatible Yocto releases',
    ],
    starterCode: `# Layer configuration file

# TODO: add layer to BBPATH

# TODO: set BBFILES to find recipes

# TODO: set collection name

# TODO: set file pattern

# TODO: set layer priority

# TODO: set layer dependencies

# TODO: set compatible Yocto releases
`,
    validations: [
      {
        type: 'regex',
        value: /BBPATH\s*\.=\s*":\$\{LAYERDIR\}"/,
        message: 'BBPATH must append the layer directory using .= and ${LAYERDIR}.',
        hint: 'BBPATH .= ":${LAYERDIR}"',
      },
      {
        type: 'regex',
        value: /BBFILES\s*\+=\s*".*recipes-.*\*\.bb/,
        message: 'BBFILES must include .bb files from recipes-* directories.',
        hint: 'BBFILES += "${LAYERDIR}/recipes-*/*/*.bb"',
      },
      {
        type: 'regex',
        value: /\.bbappend/,
        message: 'BBFILES should also include .bbappend files.',
        hint: 'Add: BBFILES += "${LAYERDIR}/recipes-*/*/*.bbappend"',
      },
      {
        type: 'regex',
        value: /BBFILE_COLLECTIONS\s*\+=\s*".+"/,
        message: 'BBFILE_COLLECTIONS must register your layer name.',
        hint: 'Example: BBFILE_COLLECTIONS += "my-layer"',
      },
      {
        type: 'regex',
        value: /BBFILE_PATTERN_.+\s*=/,
        message: 'BBFILE_PATTERN must be set for your collection.',
        hint: 'Example: BBFILE_PATTERN_my-layer = "^${LAYERDIR}/"',
      },
      {
        type: 'regex',
        value: /BBFILE_PRIORITY_.+\s*=\s*"\d+"/,
        message: 'BBFILE_PRIORITY must be set (typically 6-10).',
        hint: 'Example: BBFILE_PRIORITY_my-layer = "6"',
      },
      {
        type: 'regex',
        value: /LAYERDEPENDS_.+\s*=\s*".*core/,
        message: 'LAYERDEPENDS should declare at least "core" as a dependency.',
        hint: 'Example: LAYERDEPENDS_my-layer = "core"',
      },
      {
        type: 'regex',
        value: /LAYERSERIES_COMPAT_.+\s*=\s*".+"/,
        message: 'LAYERSERIES_COMPAT must list compatible Yocto release names.',
        hint: 'Example: LAYERSERIES_COMPAT_my-layer = "kirkstone scarthgap"',
      },
    ],
    solutionCode: `# Layer configuration file

BBPATH .= ":\${LAYERDIR}"

BBFILES += "\${LAYERDIR}/recipes-*/*/*.bb \\
            \${LAYERDIR}/recipes-*/*/*.bbappend"

BBFILE_COLLECTIONS += "my-layer"
BBFILE_PATTERN_my-layer = "^\${LAYERDIR}/"
BBFILE_PRIORITY_my-layer = "6"

LAYERDEPENDS_my-layer = "core"
LAYERSERIES_COMPAT_my-layer = "kirkstone scarthgap"
`,
  },
  {
    id: 'machine-config',
    title: 'Machine Configuration',
    difficulty: 'advanced',
    description:
      'Write a machine configuration file (.conf) for a custom ARM-based board. This defines the hardware-specific settings for your target.',
    instructions: [
      'Set MACHINEOVERRIDES to include your machine name',
      'Set the TARGET_ARCH to "arm"',
      'Set PREFERRED_PROVIDER_virtual/kernel to a kernel recipe',
      'Define KERNEL_IMAGETYPE (e.g., "zImage")',
      'Set SERIAL_CONSOLES for debug output',
      'Set IMAGE_FSTYPES for the image output format(s)',
      'Set MACHINE_FEATURES for hardware capabilities',
    ],
    starterCode: `#@TYPE: Machine
#@NAME: My Custom Board
#@DESCRIPTION: Machine configuration for my custom ARM board

# TODO: set machine overrides

# TODO: set target architecture

# TODO: set kernel provider and image type

# TODO: set serial console

# TODO: set image format(s)

# TODO: set machine features
`,
    validations: [
      {
        type: 'regex',
        value: /MACHINEOVERRIDES\s*=.*:|require\s+conf\/machine/,
        message: 'Set MACHINEOVERRIDES or require a base machine config.',
        hint: 'Example: MACHINEOVERRIDES =. "my-board:" or require conf/machine/include/...',
      },
      {
        type: 'regex',
        value: /TARGET_ARCH\s*=\s*"arm"|DEFAULTTUNE\s*=\s*".+"|require.*tune-/,
        message: 'Set TARGET_ARCH, DEFAULTTUNE, or require a tune file for ARM.',
        hint: 'Example: DEFAULTTUNE = "cortexa7thf-neon-vfpv4"',
      },
      {
        type: 'regex',
        value: /PREFERRED_PROVIDER_virtual\/kernel\s*=\s*".+"/,
        message: 'PREFERRED_PROVIDER_virtual/kernel must select a kernel recipe.',
        hint: 'Example: PREFERRED_PROVIDER_virtual/kernel = "linux-yocto"',
      },
      {
        type: 'regex',
        value: /KERNEL_IMAGETYPE\s*=\s*".+"/,
        message: 'KERNEL_IMAGETYPE must be set (e.g., "zImage", "Image").',
        hint: 'Example: KERNEL_IMAGETYPE = "zImage"',
      },
      {
        type: 'regex',
        value: /SERIAL_CONSOLES\s*=\s*".+"/,
        message: 'SERIAL_CONSOLES must define the debug serial port.',
        hint: 'Example: SERIAL_CONSOLES = "115200;ttyS0"',
      },
      {
        type: 'regex',
        value: /IMAGE_FSTYPES\s*[+=]+\s*".+"/,
        message: 'IMAGE_FSTYPES must define output image format(s).',
        hint: 'Example: IMAGE_FSTYPES = "wic.gz ext4"',
      },
      {
        type: 'regex',
        value: /MACHINE_FEATURES\s*[+=]+\s*".+"/,
        message: 'MACHINE_FEATURES should list hardware capabilities.',
        hint: 'Example: MACHINE_FEATURES = "usbhost wifi bluetooth"',
      },
    ],
    solutionCode: `#@TYPE: Machine
#@NAME: My Custom Board
#@DESCRIPTION: Machine configuration for my custom ARM board

MACHINEOVERRIDES =. "my-custom-board:"

DEFAULTTUNE = "cortexa7thf-neon-vfpv4"
require conf/machine/include/arm/armv7a/tune-cortexa7.inc

PREFERRED_PROVIDER_virtual/kernel = "linux-yocto"
KERNEL_IMAGETYPE = "zImage"
KERNEL_DEVICETREE = "my-custom-board.dtb"

SERIAL_CONSOLES = "115200;ttyS0"

IMAGE_FSTYPES = "wic.gz ext4 tar.bz2"

MACHINE_FEATURES = "usbhost wifi bluetooth ext2 screen"
`,
  },
  {
    id: 'distro-config',
    title: 'Distribution Configuration',
    difficulty: 'advanced',
    description:
      'Write a distribution configuration file that defines the software-level policies for your custom Linux distribution.',
    instructions: [
      'Set DISTRO, DISTRO_NAME, and DISTRO_VERSION',
      'Choose an init system (systemd or sysvinit) via INIT_MANAGER',
      'Set DISTRO_FEATURES with the features your distro supports',
      'Set TCLIBC to choose the C library (e.g., "glibc")',
      'Optionally set DISTRO_FEATURES:remove to exclude unwanted features',
    ],
    starterCode: `# Distribution configuration

# TODO: set distro identifiers

# TODO: choose init system

# TODO: set distro features

# TODO: set C library

# TODO: remove unwanted features
`,
    validations: [
      {
        type: 'regex',
        value: /DISTRO\s*=\s*".+"/,
        message: 'DISTRO must be set to a unique identifier.',
        hint: 'Example: DISTRO = "my-distro"',
      },
      {
        type: 'regex',
        value: /DISTRO_NAME\s*=\s*".+"/,
        message: 'DISTRO_NAME should be set to a human-readable name.',
        hint: 'Example: DISTRO_NAME = "My Custom Distribution"',
      },
      {
        type: 'regex',
        value: /DISTRO_VERSION\s*=\s*".+"/,
        message: 'DISTRO_VERSION should be set.',
        hint: 'Example: DISTRO_VERSION = "1.0"',
      },
      {
        type: 'regex',
        value: /INIT_MANAGER\s*=\s*"(systemd|sysvinit)"|DISTRO_FEATURES.*systemd/,
        message: 'Choose an init system via INIT_MANAGER or DISTRO_FEATURES.',
        hint: 'Example: INIT_MANAGER = "systemd"',
      },
      {
        type: 'regex',
        value: /DISTRO_FEATURES\s*[+=]+\s*".+"/,
        message: 'DISTRO_FEATURES must list the software features for the distro.',
        hint: 'Example: DISTRO_FEATURES = "ipv4 ipv6 wifi systemd usrmerge"',
      },
      {
        type: 'regex',
        value: /TCLIBC\s*=\s*"(glibc|musl)"/,
        message: 'TCLIBC must select the C library (glibc or musl).',
        hint: 'Example: TCLIBC = "glibc"',
      },
    ],
    solutionCode: `DISTRO = "my-distro"
DISTRO_NAME = "My Custom Distribution"
DISTRO_VERSION = "1.0"

INIT_MANAGER = "systemd"

DISTRO_FEATURES = "ipv4 ipv6 wifi systemd usrmerge"
DISTRO_FEATURES:remove = "x11 wayland"

TCLIBC = "glibc"
`,
  },
];

export default exercises;
