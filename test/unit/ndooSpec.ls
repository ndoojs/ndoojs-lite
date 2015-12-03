describe 'ndoo framework test >', !->
  describe 'storage test >', (x) ->
    _stor = undefined

    before !->
      ``_stor = ndoo.storage``

    after !->
      ndoo.reset()

    it 'ndoo.storage should deinfe', !->
      expect(_stor).to.not.a \undefined

    it 'get abc, should be undefined', !->
      expect(_stor('abc')).to.be.a \undefined

    describe 'set value >', (x) !->
      it 'set abc to 123, should be 123', !->
        # console.log _stor('abc', 123)
        expect(_stor('abc', 123)).to.equal 123

      it 'get abc after set, should be 123 ', !->
        expect(_stor('abc')).to.equal 123

    describe 'rewrite >', (x) !->
      it 'rewrite abc without option, should be false', !->
        expect(_stor('abc', 456)).to.equal false

      it 'get abc after rewrite, should be 123', !->
        expect(_stor('abc')).to.equal 123

      it 'rewrite abc add option, should be Truthy', !->
        expect(_stor 'abc', 456, _stor.REWRITE).to.be.ok

      it 'get abc after rewrite, should be 456', ->
        expect(_stor('abc')).to.equal 456

    describe 'destroy >', (x) !->
      it 'remove abc for storage, should be true', !->
        expect(_stor('abc', null, _stor.DESTROY)).to.equal true

      it 'get abc for storage, should be undefined', !->
        expect(_stor('abc')).to.be.a \undefined

  describe 'getPk test >', (x) !->
    _n = null

    before !->
      ``_n = ndoo``

    after !->
      _n.reset()

    it 'getPk should to ok', !->
      expect(_n.getPk()).to.be.ok

    it 'getPk should match num', ->
      expect(_n.getPk()).to.match /^\d+$/

    it 'getPk should prefix', ->
      expect(_n.getPk('test_')).to.match /^test_\d+$/

  describe 'page id test >', (x) !->
    _n = undefined

    before ->
      ``_n = ndoo``

    after ->
      _n.reset()

    it 'get page id should be empty', !->
      expect(_n.pageId).to.equal ''

    describe 'init call', (x) !->
      initPageId = undefined

      before ->
        initPageId = _n.initPageId
        chai.spy.on _n, 'initPageId'
        _n.init 'home/index'

      after ->
        _n.initPageId = initPageId

      it 'initPageId should be call', !->
        expect(_n.initPageId).to.have.been.called()

      it 'initPageId param should be home/index', !->
        expect(_n.initPageId).to.have.been.called.with 'home/index'
      it 'pageId should be home/index', !->
        expect(_n.pageId).to.equal 'home/index'

  describe 'event test >', ->
    _n = null

    before ->
      ``_n = ndoo``
      _n.init 'home/index'

    after ->
      _n.reset()
