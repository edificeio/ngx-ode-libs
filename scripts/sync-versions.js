#!/usr/bin/env node

/**
 * Script pour synchroniser les versions des peerDependencies dans le monorepo ngx-ode-libs
 *
 * Ce script lit la version de chaque package et met à jour les peerDependencies
 * pour s'assurer que tous les packages internes référencent la même version.
 */

const fs = require("fs");
const path = require("path");

// Chemins vers les packages
const PACKAGES = [
  {
    name: "ngx-ode-core",
    path: path.join(__dirname, "../projects/ngx-ode-core/package.json"),
  },
  {
    name: "ngx-ode-sijil",
    path: path.join(__dirname, "../projects/ngx-ode-sijil/package.json"),
  },
  {
    name: "ngx-ode-ui",
    path: path.join(__dirname, "../projects/ngx-ode-ui/package.json"),
  },
];

// Fonction pour lire un package.json
function readPackageJson(filePath) {
  try {
    const content = fs.readFileSync(filePath, "utf8");
    return JSON.parse(content);
  } catch (error) {
    console.error(`Erreur lors de la lecture de ${filePath}:`, error.message);
    process.exit(1);
  }
}

// Fonction pour écrire un package.json
function writePackageJson(filePath, data) {
  try {
    const content = JSON.stringify(data, null, 2) + "\n";
    fs.writeFileSync(filePath, content, "utf8");
    console.log(`✓ Mis à jour: ${filePath}`);
  } catch (error) {
    console.error(`Erreur lors de l'écriture de ${filePath}:`, error.message);
    process.exit(1);
  }
}

// Fonction principale
function syncVersions() {
  console.log("🔄 Synchronisation des versions des peerDependencies...\n");

  // Étape 1: Lire toutes les versions
  const versions = {};
  PACKAGES.forEach((pkg) => {
    const packageJson = readPackageJson(pkg.path);
    versions[pkg.name] = packageJson.version;
    console.log(`📦 ${pkg.name}: ${packageJson.version}`);
  });

  console.log("\n🔧 Mise à jour des peerDependencies...\n");

  // Étape 2: Mettre à jour les peerDependencies
  let hasChanges = false;

  PACKAGES.forEach((pkg) => {
    const packageJson = readPackageJson(pkg.path);

    if (!packageJson.peerDependencies) {
      return;
    }

    let modified = false;

    // Vérifier chaque peerDependency
    Object.keys(packageJson.peerDependencies).forEach((depName) => {
      // Si c'est un package interne, synchroniser la version
      if (versions[depName]) {
        const currentVersion = packageJson.peerDependencies[depName];
        const newVersion = versions[depName];

        if (currentVersion !== newVersion) {
          console.log(
            `  ${pkg.name}: ${depName} ${currentVersion} → ${newVersion}`
          );
          packageJson.peerDependencies[depName] = newVersion;
          modified = true;
          hasChanges = true;
        }
      }
    });

    // Écrire le fichier seulement s'il y a eu des modifications
    if (modified) {
      writePackageJson(pkg.path, packageJson);
    }
  });

  if (!hasChanges) {
    console.log(
      "✨ Aucune modification nécessaire - toutes les versions sont déjà synchronisées."
    );
  } else {
    console.log("\n✨ Synchronisation terminée avec succès!");
  }
}

// Exécuter le script
syncVersions();
