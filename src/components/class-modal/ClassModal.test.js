const s = require("./ClassModalTestingExport.js")

describe('Testing Class Selection', () => {
    test("Selected Class Starts Empty", () => {
        console.log(s.selectedClass)
        expect(s.selectedClass).toEqual('')
    })
    test("Select works", () => {
        s.handleSelect("bob")
        expect(s.selectedClass).toEqual("bob")
    })
})

describe('Adding an assignment to wizard', () => {
    test("Assignments starts with 1 empty assignment", () => {
        expect(s.assignments.length).toEqual(1)
        expect(s.assignments[0].assignment_name).toEqual('')
    })
    test("Adding assignment function adds 1 to array length, and adds empty assignment.", () => {
        s.handleAddAssignment()
        expect(s.assignments.length).toEqual(2)
    })
})

describe('Checkboxes select and switch proper days', () => {
    test('Checkbox starts false', () => {
        expect(s.M).toEqual(false)        
    })
    test('Checkbox works', () => {
        s.handleCheckbox(true,'M')
        expect(s.M).toEqual('M')
    })
    test('1 + 1 = 2', () => {
        expect(1+1).toEqual(2)
    })
})