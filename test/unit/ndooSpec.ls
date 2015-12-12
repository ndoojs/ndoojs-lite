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
        ``initPageId = _n.initPageId``
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

  describe 'event test >', (x) ->
    _n = null

    before ->
      ``_n = ndoo``
      _n.init 'home/index'

    after ->
      _n.reset()


    describe 'default event >', (x) ->
      defaultEvent1 = chai.spy()

      it 'defaultEvent1 not be call', ->
        _n.on 'defaultTest', defaultEvent1
        expect(defaultEvent1).not.to.have.been.called()

      it 'trigger event default event should be call', ->
        _n.trigger 'defaultTest'
        expect(defaultEvent1).to.have.been.called()

    describe 'off event>', (x) !->
      offEventSpy = chai.spy()

      it 'off event calld should be once', !->
        _n.on 'offEventTest', offEventSpy
        _n.trigger 'offEventTest'
        expect(offEventSpy).to.have.been.called.once

      it 'off event and again trigger event should be once', !->
        _n.off 'offEventTest'
        _n.trigger 'offEventTest'
        expect(offEventSpy).to.have.been.called.once

    describe 'hook test >', (x) ->
      defaultHook = chai.spy()

      it 'defaultHook not be call', ->
        expect(defaultHook).not.to.have.been.called()

      it 'call defaultHook should be call', ->
        _n.hook 'defaultHook', defaultHook
        _n.hook 'defaultHook'
        expect(defaultHook).to.have.been.called()

      it 'hook overwrite test', ->
        overwriteHook = chai.spy()
        _n.hook 'defaultHook', overwriteHook
        _n.hook 'defaultHook'
        expect(overwriteHook).not.to.have.been.called()

      it 'hook overwrite should be call', ->
        overwriteHook = chai.spy()
        _n.hook 'defaultHook', overwriteHook, true
        _n.hook 'defaultHook'
        expect(overwriteHook).to.have.been.called()

  describe 'ndoo app test >', (x) !->
    describe 'home/index action test >', (x) !->
      _n = null
      indexAction = null

      beforeEach !->
        ``_n = ndoo``
        ``indexAction = chai.spy()``
        _n.app 'home',
          indexAction: indexAction

      afterEach !->
        _n.reset()
        ``_n = null``
        ``indexAction = null``

      it 'has home app', !->
        expect(_n.app['home']).to.be.ok

      it 'indexAction should be call', !->
        _n.init 'home/index'
        expect(indexAction).to.have.been.called()

      it 'home.init should be call', !->
        initSpy = chai.spy()
        _n.app 'home',
          init: initSpy
          indexAction: indexAction
        _n.init 'home/index'
        expect(initSpy).to.have.been.called()

      it 'indexBefore should be call', !->
        indexBefore = chai.spy()
        _n.app 'home',
          indexBefore: indexBefore
          indexAction: indexAction
        _n.init 'home/index'
        expect(indexBefore).to.have.been.called()

      it 'indexAfter should be call', !->
        indexAfter = chai.spy()
        _n.app \home,
          indexAfter: indexAfter
          indexAction: indexAction
        _n.init 'home/index'
        expect(indexAfter).to.have.been.called()

      it 'testAction param shoue be ok', !->
        testAction = chai.spy()
        _n.app \home,
          testAction: testAction
        _n.init 'home/test?abc=1'
        expect(testAction).to.been.called.with('?abc=1')
