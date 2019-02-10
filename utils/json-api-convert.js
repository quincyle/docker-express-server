const BASE_SINGLE_RESPONSE = {
  data: {
    type: null,
    id: null,
    attributes: {}
  }
}
const BASE_ARRAY_RESPONSE = {
  data: [

  ]
}

class JsonAPIConvert {
  constructor(data = {}, type) {
    if (Array.isArray(data)) {
      this.responseType = 'single'
    } else {
      this.responseType = 'array'
    }

    this.data = data
    this.type = type
    this.baseSingleResponse = BASE_SINGLE_RESPONSE
    this.baseArrayResponse = BASE_ARRAY_RESPONSE
  }

  arrayResponse() {
    const {data, type} = this

    const baseArray = {
      data: data.map(item => {
        return {
          type: type,
          id: item.id,
          attributes: item
        }
      })
    }

    return baseArray
  }

  singleResponse() {
    const {data, type} = this

    const baseObject = {
      data: {
        type: type,
        id: data.id,
        attributes: data
      }
    }
    
    return baseObject
  }
}

module.exports = JsonAPIConvert;
