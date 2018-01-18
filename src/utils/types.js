import daggy from 'daggy'

const Remote = daggy.taggedSum('Remote', {
  NotAsked: [],
  Loading: [],
  Failed: ['RemoteError'],
  Succeded: ['RemoteSuccess']
})

Remote.prototype.map = function (fn) {
  return this.cata({
    NotAsked: () => this,
    Loading: () => this,
    Failed: error => Remote.Failed(error),
    Succeded: v => Remote.Succeded(fn(v))
  })
}

Remote.prototype.chain = function(fn) {
  return this.cata({
    NotAsked: () => [],
    Loading: () => [],
    Failed: error => error,
    Succeded: v => fn(v)
  })
}


export default { Remote }
