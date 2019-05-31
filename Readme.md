# @cthru/console-writer

A simple utility to make it easier and more visually appealing to produce
complex multiline console output in javascript. 

## Why

Multiline string output in JavaScript has traditionally been a pain in the
rear-end. It looks dismal. You have to manage wrapping yourself. You have to
make tons of edits if there is a change early on in the multiline to reformat
the stuff that goes below.

I wanted something that would give me more flexibility in producing large
multiline strings in a way that is visually appealing inside the script as well
as outside.

### Examples

There are a bunch of examples in the `examples` folder. Here is the skinny

**Old Style** 
```javascript
var multiStr = "This is the first line" + 
	"This is the second line" + 
	"This is more...";
// or
var multiStr = "This is the first line \ 
	This is the second line \
	This is more..."
```

**With console-writer**
```javascript
let o = require('@cthru/console-writer').string()
let multiStr = o
('This is the first line')
('This is the sedond line')
('This is more...')
.toString()
```

**Pre-fomatted text works even better**
```javascript
let o = require('@cthru/console-writer').string()
let multiStr = o(`
This is the first line
This is the second line
This is more...
`).toString()
```

You may say that we could just use template strings for this anyway, why wrap it
in a function.. here's why:

```javascript
//                                               wrap:50 -- this is why
let o = require('@cthru/console-writer').string({wrap:50})
let multiStr = o.w(`
Qui manu quisquam si caeca [Lavinia centum
contendere](http://confusaque.com/facta.php) asello, foret. Ferrum sereno
Sisyphio: squamosos utque. Molem morte, avertitur angustis nobis cornua meos,
non glande adgreditur fontes quod alas tua egere in.
`,true) // <- reflow breaks -- this is why
// predictable line-breaks -- this is why
('Some Heading')
('============')
(`
Qui manu quisquam si caeca [Lavinia centum
contendere](http://confusaque.com/facta.php) asello, foret. Ferrum sereno
Sisyphio: squamosos utque. Molem morte, avertitur angustis nobis cornua meos,
non glande adgreditur fontes quod alas tua egere in.
`)
.toString()
```

## Main Api

### Factory function
```javascript
const writerFactory = require('@cthru/console-writer')

const console80=writerFactory({wrap:80})
const console120=writerFactory({wrap:120})
```
In this snippet, `console80` will write directly to the console, wrapping at 80
characters. `console120` will write directly to the console, wrapping at 120
characters.

```javascript
console80('This is the same as `console.log()` except that it will wrap at 80 characters')
```
### Chained Functions
Whenever you execute the console writer, you get back the same console-writer
function. This means you can write using chained function calls: 

```javascript
console80('This will go on the first line')('This will go on the second line')

// For the purpose of code legibility you probably want to adopt this form:
console80
('This will go on the first line')
('This will go on the second line')
```
### Capturing the console
If you want to get a string back from the document rather than print it to the
console directly:
```javascript
const writerFactory = require('@cthru/console-writer')
const buffer=writerFactory.string({wrap:80})

buffer('do some stuff')

console.log(buffer.toString())
```

## Additional Functionality
It quickly became aparent that there is a lot more we could do with this. So to
avoid making a module with 10 lines of code, I added some candy.

---
### [writer].w(str, noBr=false)
*Joins successive calls as if there were no line-breaks.*

||||
|-----------|-----------|-|
|str	  	|			| the string to be printed.
|noBr	 	|[false] 	| if set, newlines in the call will also be ignored.


---  
### [writer].title = (t = '', char, space = 1) 
*Print a title.*

||||
|-----------|-----------|-|
|t		  	|			| the string to be printed.
|char	 	|[#]	 	| the character used to decorate the title.
|space	    |[1]        | number of spaces between the docoration line and the                            actual title.


---
### [writer].title.full = (t = '', char, space = 1)
*Print a full-width title, with centered text.*

||||
|-----------|-----------|-|
|t		  	|			| the string to be printed.
|char	 	|[#]	 	| the character used to decorate the title.
|space	    |[1]        | number of spaces between the docoration line and the                            actual title.


---
### [writer].center = (str, w) 
*Print a centerd line.*

||||
|-----------|-----------|-|
|str	  	|			| the string to be printed.
|w	        |[cfg.wrap] | the width at which to wrap. Defaults to configured                              wrap width.


---
### [writer].right = (str, w, p) 
*Print a right-aligned string.*

||||
|-----------|-----------|-|
|str	  	|			| the string to be printed.
|w	        |[cfg.wrap] | the width at which to wrap. Defaults to configured                              wrap width.
|p	  		|[0]		| indented padding from the right.


---
### [writer].tab = (n = 1) 
*Print any number of tab characters. This will not produce a new line.*

||||
|-----------|-----------|-|
|n		  	|[1]		| The number of tabs to enter


---
### [writer].pad = (n = 1, char = ' ') 
*Print any number of characters. This will not produce a new line.*

||||
|-----------|-----------|-|
|n		  	|[1]		| The number of tabs to enter
|char	 	|[:space:] 	| if set, newlines in the call will also be ignored

---
### [writer].sep = (char = '-', n) 
*Print a separator*

||||
|-----------|-----------|-|
|char	  	|[-]		| The character to use for the separator
|n	        |[cfg.wrap] | The width of the separator, defaulting to the                                   configured wrap width


---
### [writer].space = (n) 
*Print any number of spaces. This does not produce a newline.*

||||
|-----------|-----------|-|
|n		 	|[false] 	| The number of spaces to print


---
### [writer].nl = (n = 1) 
*Print any number of newlines*

||||
|-----------|-----------|-|
|n		 	|[1]	 	| The number of newlines to print


---
### [writer].h1 = (str = '') 
*Print an H1*

||||
|-----------|-----------|-|
|str	  	|			| the string to be printed  


---
### [writer].h2 = (str = '') 
*Print an H2*

||||
|-----------|-----------|-|
|str	  	|			| the string to be printed  


---
### [writer].h3 = (str = '') 
*Print an H3*

||||
|-----------|-----------|-|
|str	  	|			| the string to be printed  


## A final example
```javascript
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
```
Produces this output: 
```
################################################################################
                            This is a standard Title
################################################################################

                                                           This is right-aligned

                                                       This is right-aligned and
                                                        wrapped at 30 characters

                                          This is right-aligned and wrapped
                                          at 35 characters and right-padded
                                                            by 5 characters
--------------------------------------------------------------------------------


First Level Heading
===================
       This is center-aligned that will only wrap when hitting the edges

Second Level Heading
--------------------

                             This is center-aligned
                              with content with a
                           maximum width of 25 chars

>>>>> Third level Heading

    This is left-aligned text with a
maximum of 35 chars, and the first
line indented by 4

   This is left-aligned text with a maximum of 50
   chars, and the full string is indented by 4
```

