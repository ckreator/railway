const isArray = x => x instanceof Array

const fallThrough = err => Promise.reject(err)

const bind = track => (isArray(track) ? track : [track, fallThrough])

const chainPromises = (prev, [fn, err]) => prev.then(fn).catch(err)

const applyFirst = async (fn, args) => {
	try {
		const result = await fn(...args)
		return result
	} catch (err) {
		return Promise.reject(err)
	}
}

const railway = (first, ...funcs) => {
	const rails = funcs.map(bind)
	return (...args) => rails.reduce(
		chainPromises,
		applyFirst(first, args)
		// Promise.resolve(first(...args))
	)
}

module.exports = railway
