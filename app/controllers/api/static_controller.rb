class Api::StaticController < ApplicationController

    def api_test
      render json: {dataHere: 'All systems operational c:'}
    end
end
