#!/usr/bin/env node
// ngx-ode-ui declares ngx-ode-core/ngx-ode-sijil as exact-version peerDependencies, but nothing
// keeps that in sync with their actual "version" field once it gets bumped (npm/CI's peer
// resolution then fails with ERESOLVE for consumers, e.g. entcore/admin build breakage on
// 2026-08-27/28). Run this before building ngx-ode-ui to realign it.
const fs = require('fs');
const path = require('path');

const projectsDir = path.join(__dirname, '..', 'projects');
const uiPkgPath = path.join(projectsDir, 'ngx-ode-ui', 'package.json');
const uiPkg = JSON.parse(fs.readFileSync(uiPkgPath, 'utf8'));

for (const dep of ['ngx-ode-core', 'ngx-ode-sijil']) {
  const depPkg = JSON.parse(fs.readFileSync(path.join(projectsDir, dep, 'package.json'), 'utf8'));
  uiPkg.peerDependencies[dep] = depPkg.version;
}

fs.writeFileSync(uiPkgPath, JSON.stringify(uiPkg, null, 2) + '\n');
console.log('[sync-ngx-ode-ui-peer-deps] peerDependencies aligned:', uiPkg.peerDependencies);
