const inspect = require('util').inspect

const writerFactory = (cfg) => {
	let cidx = 0
	cfg = Object.assign({ wrap: 80, writer(str) { process.stdout.write(str) } }, cfg || {})

	const f = (t = '', owrap) => {
		if (Array.isArray(t)) t = j.join(' ')
		owrap = owrap || cfg.wrap
		let wrap = owrap

		function fl(array) {
			var fla = [];
			!(function flat(array) {
				array.forEach(el => {
					if (Array.isArray(el)) flat(el);
					else fla.push(el);
				});
			})(array);
			return fla;
		}

		const ta = t.split(/\n/)
		let cl = cidx;
		return fl(ta.map(t => {
			const ts = t.split(' ');

			let out = ts.reduce((r, t, i) => {
				if (cl + t.length >= wrap) {
					cl = t.length;
					return r + `\n${t}`;
				} else {
					cl += t.length + (r ? 1 : 0);
					return r ? r + ` ${t}` : `${t}`;
				}
			}, '').split('\n');
			cl = 0
			return out
		}))
	}


	const o = (strs = null, w, p) => strs === null ? o.nl() : f(strs, (w || cfg.wrap) - (p || 0)).reduce((r, str) => o.pad((p || 0) - 1) && o.w(str || '')(), o)
	o.w = (str, noBr = false) => { let parts = f(noBr ? str.replace(/\n/g, ' ') : str); cidx = parts.length ? parts[parts.length - 1].length : 0; cfg.writer(parts.join('\n')); return o }
	o.title = (t = '', char, space = 1) => o.pad(t.length + 8, '#')().nl(space).pad(4)(t).nl(space).pad(t.length + 8, char || '#')()
	o.title.full = (t = '', char, space = 1) => o.pad(cfg.wrap, '#')().nl(space).center(t).nl(space).pad(cfg.wrap, char || '#')()
	o.center = (str, w) => f(str, w).reduce((r, str) => o.pad(Math.floor((cfg.wrap - str.length) / 2))(str), o)
	o.right = (str, w, p) => f(str, w).reduce((r, str) => o.pad(Math.floor(cfg.wrap - str.length - (p || 0)))(str), o)
	o.tab = (n = 1) => cfg.writer(Array(n).join('\t')) && (cidx += 4 * n) ? o : o
	o.pad = (n = 1, char = ' ') => cfg.writer(Array(n + 1).join(char || ' ')) ? o : o
	o.sep = (char = '-', n) => o.pad(n || cfg.wrap, char || '-')()
	o.space = (n) => o.pad(n, ' ')
	o.nl = (n = 1) => o.pad(n, '\n') && (cidx = 0) ? o : o
	o.h1 = (str = '') => o(str).pad(str.length, '=')()
	o.h2 = (str = '') => o(str).pad(str.length, '-')()()
	o.h3 = (str = '') => o.pad(5, '>').space()(str)()
	o.preformatted = (str = '') => { cfg.writer(str); return o }
	o.inspect = (obj, { showHidden = false, depth = 5, color = true }={}) => o.preformatted(inspect(obj, showHidden, depth, color))

	return o
}

writerFactory.string = function(config) {
	let output = ''
	const writer = str => {
		output += `${str}`
	}
	config.writer = writer
	o = writerFactory(config)
	o.toString = () => output
	return o
}

module.exports = writerFactory
