#!/usr/bin/env node
const out = require('../src/writer-factory')({ wrap: 80 })

out
.h1('Testing the Inspect feature')
.inspect(require('../package.json'))
