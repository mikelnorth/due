module.exports = {
    finished: false,
    stepIndex: 0,
    dateTime: null,
    subject: '',
    options: [],
    selectedClass: '',
    assignments: [{ assignment_name: '', points_possible: '', due_date: '', category: null }],
    categoryOptions: [{ key: '1', value: '1', text: 'Essay' }, { key: '2', value: '2', text: 'Test' }],
    currentIndex: null,
    open: false,
    teacher: '',
    currentClassId: null,
    currentCalendarId: null,
    classes: [],
    cal_id: null,
    days: [],
    M: false,
    T: false,
    W: false,
    TH: false,
    F: false,
    ST: false,
    SU: false,
    background: '#1485CB',
    displayColorPicker: false,
    handleSelect(val) {
        this.selectedClass = val;
    },
    handleAddAssignment(){
        this.assignments = this.assignments.concat([{ assignment_name: '', points_possible: '', due_date: '', category: '' }])
    },
    handleCheckbox(val, prop){
        val ?
        this[prop] = prop
        :
        this[prop] = val
        //console.log(this.state)
    }
}