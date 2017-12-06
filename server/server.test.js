const axios = require('axios') 

describe('#getAssignments() using async/await', () => {
    it('should load assignments', async () => {
        let data = '';
      axios.get('http://localhost:3000/api/assignments/getall/29').then(response => {
          data = response.data
            console.log('hi')
        })
      expect(data).toBeDefined()
    })
  })