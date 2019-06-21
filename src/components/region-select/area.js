export default () => {
  return [{
    id: '1',
    name: '北京',
    _child: [{
        id: '1-1',
        name: '密云区',
        _child: [{
            id: '1-1-1',
            name: '鼓楼街道'
        }]
    }]
  }, {
    id: '2',
    name: '上海',
    _child: [{
        id: '2-1',
        name: '静安区',
        _child: [{
            id: '2-1-1',
            name: '城区'
        }]
    }]
  }]
}
