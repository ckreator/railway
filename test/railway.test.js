/* eslint max-lines-per-function: 0 */
const { expect } = require('chai')

const railway = require('..')

describe('railway', () => {
	context('given two normal single-track functions', () => {
		it('creates a new piped function that follows the happy path', async () => {
			const add5 = x => x + 5
			const mult10 = x => x * 10

			const piped = railway(
				add5,
				mult10,
			)

			const result = await piped(3)
			expect(result).to.equal(80)
		})
	})

	context('given multiple normal single-track functions', () => {
		it('creates a new piped function that follows the happy path', async () => {
			const add5 = x => x + 5
			const mult10 = x => x * 10
			const div2 = x => x / 2
			const stringify = x => `Number is: ${x}`

			const piped = railway(
				add5,
				mult10,
				div2,
				stringify
			)

			const result = await piped(3)
			expect(result).to.equal('Number is: 40')
		})
	})

	context('given one sync and one async single-track functions', () => {
		it('creates a new piped function that follows the happy path', async () => {
			const add5Delayed = x => new Promise(resolve => setTimeout(() => resolve(x + 5), 1000))
			const mult10 = x => x * 10

			const piped = railway(
				add5Delayed,
				mult10,
			)

			const result = await piped(5)
			expect(result).to.equal(100)
		})
	})

	context('given multiple normal single and dual-track functions', () => {
		it('creates a new piped function that follows the unhappy path', async () => {
			const add5 = x => x + 5
			const ZeroDivisionError = new Error('ZERODIVISION')
			const div10by = x => ((x === 0) ? Promise.reject(ZeroDivisionError) : 2 / x)
			// const handleZeroDivision = () => Promise.reject('Cannot divide by zero')
			const stringify = x => `Number is: ${x}`
			const formatError = err => `Failed to run pipeline due to ${err.message}`

			const piped = railway(
				add5,
				div10by,
				[stringify, formatError]
			)

			const error = await piped(-5)
			expect(error).to.equal('Failed to run pipeline due to ZERODIVISION')
		})
	})

	context('given multiple normal and async single and dual-track functions', () => {
		it('creates a new piped function that follows the unhappy path', async () => {
			const add5 = x => x + 5
			const timeout = x => new Promise(resolve => setTimeout(() => resolve(x), 1000))
			const ZeroDivisionError = new Error('ZERODIVISION')
			const div10by = x => ((x === 0) ? Promise.reject(ZeroDivisionError) : 2 / x)
			// const handleZeroDivision = () => Promise.reject('Cannot divide by zero')
			const stringify = x => `Number is: ${x}`
			const formatError = err => `Failed to run pipeline due to ${err.message}`

			const piped = railway(
				add5,
				timeout,
				div10by,
				[stringify, formatError]
			)

			const error = await piped(-5)
			expect(error).to.equal('Failed to run pipeline due to ZERODIVISION')
		})
	})

	context('given multiple normal and async single and dual-track functions', () => {
		it('is able to combine two track into one (positive) again', async () => {
			const add5 = x => x + 5
			const timeout = x => new Promise(resolve => setTimeout(() => resolve(x), 1000))
			const ZeroDivisionError = new Error('ZERODIVISION')
			const div10by = x => ((x === 0) ? Promise.reject(ZeroDivisionError) : 2 / x)
			// const handleZeroDivision = () => Promise.reject('Cannot divide by zero')
			const stringify = x => `Number is: ${x}`
			const formatError = err => `Failed to run pipeline due to ${err.message}`

			let success

			const piped = railway(
				add5,
				timeout,
				div10by,
				[stringify, formatError],
				[() => { success = true }, () => { success = false }]
			)

			await piped(-5)
			expect(success).to.equal(true)
		})
	})
})
