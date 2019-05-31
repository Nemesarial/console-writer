#!/usr/bin/env node
const out = require('../src/writer-factory')({ wrap: 80 })

out
.title.full('This is a standard Title','#',0)
()
.right('This is right-aligned')
()
.right('This is right-aligned and wrapped at 30 characters',30)
()
.right('This is right-aligned and wrapped at 35 characters and right-padded by 5 characters',35, 5)
.sep()
.nl(2)
.h1('First Level Heading')
.center('This is center-aligned that will only wrap when hitting the edges')
()
.h2('Second Level Heading')
.center('This is center-aligned with content with a maximum width of 25 chars',25)
()
.h3('Third level Heading')
.pad(4)('This is left-aligned text with a maximum of 35 chars, and the first line indented by 4',35)
()
('This is left-aligned text with a maximum of 50 chars, and the full string is indented by 4',50,4)



