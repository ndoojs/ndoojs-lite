describe 'ndoo framework test >', !->
  describe 'storage test >', (x) ->
    _stor = undefined

    before !->
      ``_stor = ndoo.storage``

    # after !->
    #   ndoo.reset()

    it 'ndoo.storage should deinfe', !->
      expect(_stor).to.not.a \undefined
