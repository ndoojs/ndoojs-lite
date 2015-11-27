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

      it 'rewrite abc add option, should be Truthy', ->
        expect(_stor 'abc', 456, _stor.REWRITE).to.be.ok

      it 'get abc after rewrite, should be 456', ->
        expect(_stor('abc')).to.equal 456
