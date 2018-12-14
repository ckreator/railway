const isArray = x => x instanceof Array

const fallThrough = err => Promise.reject(err)

const bind = track => (isArray(track) ? track : [track, fallThrough])

const chainPromises = (prev, [fn, err]) => prev.then(fn).catch(err)

const railway = (first, ...funcs) => {
	const rails = funcs.map(bind)
	return (...args) => rails.reduce(
		chainPromises,
		Promise.resolve(first(...args))
	)
}

module.exports = railway
