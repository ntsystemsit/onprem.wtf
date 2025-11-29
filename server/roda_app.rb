class RodaApp < Roda
  plugin :bridgetown_server

  # Some Roda configuration is handled in the `config/initializers.rb` file.
  # But you can also add additional Roda configuration here if needed.

  route do |r|
    # Load Roda routes in server/routes (and src/_routes via `bridgetown-routes`)
    r.bridgetown
  end
end