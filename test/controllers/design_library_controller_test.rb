require 'test_helper'

class DesignLibraryControllerTest < ActionController::TestCase
  test "should get index" do
    get :index
    assert_response :success
  end

end
